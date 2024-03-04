// Character Select prefab
class CharacterSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(5.5)) // add character select background to select scene
 
        // initialize player selection
        this.player1 = null
        this.player2 = null
 
        // character selection properties
        this.currentPlayer = 1
        this.currentSide = 'left'
        this.currentState = 'rumble'

        // misc. variables
        this.iconX = 0
       
        // flashing UI player animation
        scene.playerSelectText = scene.add.sprite(width/2 + 5, 335, 'current-player')
        scene.playerSelectText.setOrigin(0.5).setScale(5)
        scene.playerSelectText.anims.play('player1-select')
 
        // initialize state machine managing fighter selection (initial state, possible states, state args[])
        scene.selectFSM = new StateMachine(this.currentState, {
            joe: new JoeSelect(),
            buffalo: new BuffaloSelect(),
            rumble: new RumbleSelect(),
            admiral: new AdmiralSelect(),
            beast: new BeastorSelect(),
            czar: new CzarSelect(),
            chunLi: new ChunLiSelect(),
            karate: new KarateSelect(),
            locked: new LockedState()
        }, [scene, this])
    }
}

// Rumble McSkirmish fighter select state
class RumbleSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'rumble'
        menu.anims.play('rumble-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`rumble-${menu.currentSide}`)
    }
 
 
    execute(scene, menu) {
        // create local copy keyboard object
        const { right, down, space } = scene.keys
 
        // transition to Suggessica select
        if(Phaser.Input.Keyboard.JustDown(right) && !scene.isTransitioning) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
        // transition to Joe Zambique select
        if(Phaser.Input.Keyboard.JustDown(down) && !scene.isTransitioning) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }
 
        // Select fighter and start new scene
        if(Phaser.Input.Keyboard.JustDown(space) && !scene.isTransitioning) {
            scene.selectSFX_2.play()

            if (menu.currentPlayer == 2) {
                // update properties
                menu.player2 = 'rumble'
                scene.isTransitioning = true

                // update interface
                scene.playerSelectText.anims.play('both-selected')
                scene.menuSelectMusic.stop()

                // fade out transition
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    // start next scene and pass player selection args
                    scene.scene.start('cutscene', { p1: menu.player1, p2: menu.player2 })
                })
            } else {
                // switch to player 2 select
                menu.player1 = 'rumble'
                menu.currentPlayer = 2
                menu.currentSide = 'right'
                menu.iconX = 600

                scene.playerSelectText.anims.play('player2-select')
                this.stateMachine.transition('rumble')
                return
            }
        }
    }
}

// Dr. Karate fighter select state
class KarateSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'karate'
        menu.anims.play('karate-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`karate-${menu.currentSide}`)
    }
 
 
    execute(scene, menu) {
        // create local copy keyboard object
        const { left, up, space } = scene.keys
 
        // transition to Admiral Big-Calves select
        if(Phaser.Input.Keyboard.JustDown(left) && !scene.isTransitioning) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }
 
        // transition to Beastor select
        if(Phaser.Input.Keyboard.JustDown(up) && !scene.isTransitioning) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }

        // Select fighter and start new scene
        if(Phaser.Input.Keyboard.JustDown(space) && !scene.isTransitioning) {
            scene.selectSFX_2.play()

            if (menu.currentPlayer == 2) {
                // update properties
                menu.player2 = 'karate'
                scene.isTransitioning = true

                // update interface
                scene.playerSelectText.anims.play('both-selected')
                scene.menuSelectMusic.stop()

                // fade out transition
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    // start next scene and pass player selection args
                    scene.scene.start('cutscene', { p1: menu.player1, p2: menu.player2 })
                })
            } else {
                // switch to player 2 select
                menu.player1 = 'karate'
                menu.currentPlayer = 2
                menu.currentSide = 'right'
                menu.iconX = 600

                scene.playerSelectText.anims.play('player2-select')
                this.stateMachine.transition('rumble')
                return
            }
        }
    }
}

// Joe Zambique fighter select state
class JoeSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'joe'
        menu.anims.play('joe-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`joe-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { right, up, space } = scene.keys
 
        // transition to N-Buffalo select
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }
 
        // transition to Rumble McSkirmish select
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }
 
        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// N-Buffalo fighter select state
class BuffaloSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'buffalo'
        menu.anims.play('buffalo-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`buffalo-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { left, right, up, space } = scene.keys
 
        // transition to Joe Zambique select
        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }
 
        // transition to Suggessica select
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
        // transition to Admiral Big-Calves select
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }
 
        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// Admiral Big-Calves fighter select state
class AdmiralSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'admiral'
        menu.anims.play('admiral-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`admiral-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { left, right, up, space } = scene.keys
 
        // transition to N-Buffalo select
        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }
 
        // transition to Dr. Karate select
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('karate')
            return
        }
 
        // transition to Czar-Barian select
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }
 
        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// Suggessica fighter select state
class ChunLiSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'chunLi'
        menu.anims.play('chun-li-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`chun-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { left, right, down, space } = scene.keys
 
        // transition to Rumble McSkirmish select
        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }
 
        // transition to N-Buffalo select
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }
 
        // transition to Czar-Barian select
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }
 
        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// Czar-Barian fighter select state
class CzarSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'czar'
        menu.anims.play('czar-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`czar-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { left, right, down, space } = scene.keys
 
        // transition to Suggessica select
        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
        // transition to Admiral Big-Calves select
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }
 
        // transition to Beastor select
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }
 
        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// Beastor fighter select state
class BeastorSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'beast'
        menu.anims.play('beast-select')

        // display fighter icon
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`beast-${menu.currentSide}`)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { left, down, space } = scene.keys

        // transition to Czar-Barian select
        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }

        // transition to Dr. Karate select
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.selectSFX_1.play()
            scene.icon.destroy()
            this.stateMachine.transition('karate')
            scene.selectSFX_1.play()
            return
        }

        // transition to Locked state
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_1.play()
            this.stateMachine.transition('locked')
            return
        }
    }
}

// Locked fighter state
class LockedState extends State {
    enter(scene, menu) {
        scene.lockedSFX.play()
        scene.lock = scene.add.sprite(width/2, height/2, 'lock') // display locked animation
        scene.lock.setOrigin(0.5).setScale(8)
        scene.lock.play('locked').once('animationcomplete', () => {
            scene.icon.destroy()
            this.stateMachine.transition(menu.currentState) // transition back to previous fighter state
        })
        return
    }
}