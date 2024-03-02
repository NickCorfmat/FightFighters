// Character Select prefab
class CharacterSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(5.5))

        // initialize players
        this.player1 = null
        this.player2 = null

        // character selection properties
        this.currentPlayer = 1
        this.currentSide = 'left'
        this.currentState = 'rumble'
        this.iconX = 0
        
        // flashing UI player animation
        scene.playerSelectText = scene.add.sprite(width/2 + 5, 335, 'current-player')
        scene.playerSelectText.setOrigin(0.5)
        scene.playerSelectText.setScale(5)
        scene.playerSelectText.anims.play('player1-select')

        // initialize state machine managing fighter (initial state, possible states, state args[])
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

class JoeSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'joe'
        menu.anims.play('joe-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`joe-${menu.currentSide}`)
    }

    execute(scene) {
        const { right, up, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class LockedState extends State {
    enter(scene, menu) {
        scene.lock = scene.add.sprite(width/2, height/2, 'lock')
        scene.lock.setOrigin(0.5).setScale(8)
        scene.lock.play('locked').once('animationcomplete', () => {
            scene.icon.destroy()
            this.stateMachine.transition(menu.currentState)
        })
        return
    }
}

class BuffaloSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'buffalo'
        menu.anims.play('buffalo-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`buffalo-${menu.currentSide}`)
    }

    execute(scene) {
        const { left, right, up, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class AdmiralSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'admiral'
        menu.anims.play('admiral-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`admiral-${menu.currentSide}`)
    }

    execute(scene) {
        const { left, right, up, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('karate')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class ChunLiSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'chunLi'
        menu.anims.play('chun-li-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`chun-${menu.currentSide}`)
    }

    execute(scene) {
        const { left, right, down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class CzarSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'czar'
        menu.anims.play('czar-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`czar-${menu.currentSide}`)
    }

    execute(scene) {
        const { left, right, down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class BeastorSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'beast'
        menu.anims.play('beast-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`beast-${menu.currentSide}`)
    }

    execute(scene) {
        const { left, down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.icon.destroy()
            this.stateMachine.transition('karate')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class RumbleSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'rumble'
        menu.anims.play('rumble-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`rumble-${menu.currentSide}`)
    }

    execute(scene, menu) {
        const { right, down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(right) && !scene.isTransitioning) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down) && !scene.isTransitioning) {
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space) && !scene.isTransitioning) {
            if (menu.currentPlayer == 2) {
                menu.player2 = 'rumble'
                scene.isTransitioning = true
                scene.playerSelectText.anims.play('both-selected')
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    scene.scene.start('cutscene', { p1: menu.player1, p2: menu.player2 })
                })
            } else {
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

class KarateSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'karate'
        menu.anims.play('karate-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons')
        scene.icon.setOrigin(0, 0.5).setScale(5.5)
        scene.icon.play(`karate-${menu.currentSide}`)
    }

    execute(scene, menu) {
        const { left, up, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left) && !scene.isTransitioning) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up) && !scene.isTransitioning) {
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space) && !scene.isTransitioning) {
            if (menu.currentPlayer == 2) {
                menu.player2 = 'karate'
                scene.isTransitioning = true
                scene.playerSelectText.anims.play('both-selected')
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    scene.scene.start('cutscene', { p1: menu.player1, p2: menu.player2 })
                })
            } else {
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