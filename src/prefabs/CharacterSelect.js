// Character Select prefab
class CharacterSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(5.5))
 
 
        this.player1
        this.player2
 
 
        this.currentPlayer = 1  // Current player who's selecting
        this.currentSide = 'left'
        this.iconX = 0
       
        scene.playerSelectText = scene.add.sprite(width/2 + 5, 350, 'current-player').setOrigin(0.5).setScale(5)
        scene.playerSelectText.anims.play('player1-select')
 
 
        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.selectFSM = new StateMachine('joe', {
            joe: new JoeSelect(),
            buffalo: new BuffaloSelect(),
            rumble: new RumbleSelect(),
            admiral: new AdmiralSelect(),
            beast: new BeastorSelect(),
            czar: new CzarSelect(),
            chunLi: new ChunLiSelect(),
            karate: new KarateSelect()
        }, [scene, this])
    }
 
 
 }
 
 
 class JoeSelect extends State {
    enter(scene, menu) {
        menu.anims.play('joe-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`joe-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { right, up } = scene.keys
 
 
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
    }
 }
 
 
 class BuffaloSelect extends State {
    enter(scene, menu) {
        menu.anims.play('buffalo-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`buffalo-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { left, right, up } = scene.keys
 
 
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
    }
 }
 
 
 class AdmiralSelect extends State {
    enter(scene, menu) {
        menu.anims.play('admiral-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`admiral-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { left, right, up } = scene.keys
 
 
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
    }
 }
 
 
 class ChunLiSelect extends State {
    enter(scene, menu) {
        menu.anims.play('chun-li-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`chun-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { left, right, down } = scene.keys
 
 
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
    }
 }
 
 
 class CzarSelect extends State {
    enter(scene, menu) {
        menu.anims.play('czar-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`czar-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { left, right, down } = scene.keys
 
 
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
    }
 }
 
 
 class BeastorSelect extends State {
    enter(scene, menu) {
        menu.anims.play('beast-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`beast-${menu.currentSide}`)
    }
 
 
    execute(scene) {
        const { left, down } = scene.keys
 
 
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
    }
 }
 
 
 class RumbleSelect extends State {
    enter(scene, menu) {
        menu.anims.play('rumble-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`rumble-${menu.currentSide}`)
    }
 
 
    execute(scene, menu) {
        const { right, down, space } = scene.keys
 
 
        if(Phaser.Input.Keyboard.JustDown(right) && menu.currentPlayer < 3) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(down) && menu.currentPlayer < 3) {
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(space) && menu.currentPlayer < 3) {
            if (menu.currentPlayer == 2) {
                menu.player2 = 'rumble'
                menu.currentPlayer = 3
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.playerSelectText.anims.play('both-selected')
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene.scene.start('cutscene', { player1: menu.player1, player2: menu.player2 })
            })
            } else {
                menu.player1 = 'rumble'
                menu.currentPlayer = 2
                menu.currentSide = 'right'
                menu.iconX = 600
                scene.playerSelectText.anims.play('player2-select')
                this.stateMachine.transition('joe')
                return
            }
        }
    }
 }
 
 
 class KarateSelect extends State {
    enter(scene, menu) {
        menu.anims.play('karate-select')
        scene.icon = scene.add.sprite(menu.iconX, height/2, 'icons').setOrigin(0, 0.5).setScale(5.5).play(`karate-${menu.currentSide}`)
    }
 
 
    execute(scene, menu) {
        const { left, up, space } = scene.keys
 
 
        if(Phaser.Input.Keyboard.JustDown(left) && menu.currentPlayer < 3) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(up) && menu.currentPlayer < 3) {
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(space) && menu.currentPlayer < 3) {
            if (menu.currentPlayer == 2) {
                menu.player2 = 'karate'
                menu.currentPlayer = 3
                scene.playerSelectText.anims.play('both-selected')
                scene.cameras.main.fadeOut(2000, 0, 0, 0)
                scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene.scene.start('cutscene', { player1: menu.player1, player2: menu.player2 })
            })
            } else {
                menu.player1 = 'karate'
                menu.currentPlayer = 2
                menu.currentSide = 'right'
                menu.iconX = 600
                scene.playerSelectText.anims.play('player2-select')
                this.stateMachine.transition('joe')
                return
            }
        }
    }
 }
 