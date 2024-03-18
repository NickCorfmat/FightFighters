class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

        musicOn = false
    }
 
    init() {
        // boolean flags
        this.isTransitioning = false
    }
 
    create() {
        // define keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
 
        // background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)
        this.background.play('fight-background')

        // audio
        if (!musicOn) {
            backgroundMusic = this.sound.add('menu-music', { loop: true , volume: 0.8})
            backgroundMusic.play()
            musicOn = true
        }

        this.selectSFX_1 = this.sound.add('select-sfx-1')
        this.selectSFX_2 = this.sound.add('select-sfx-2')

        // title animation
        this.title = this.add.sprite(-100, height/3, 'title').setOrigin(0.44, 0.5).setScale(9)

        this.tweens.add({
            targets: this.title,
            x: width/2,
            duration: 250,
            ease: 'Linear'
        })

        // menu select options
        this.add.sprite(width/2, 600, 'menu-selection').setOrigin(0.5).setScale(2)
 
        // Menu select state machine
        this.menuOptions = new OptionSelect(this, width/2, height/2, 'new-game', 0)

        // bottom right help text
        this.add.bitmapText(940, 740, 'fight-font', '[SPACE] - Select', 18).setOrigin(0)
    }
 
    update() {
        // handle menu selection
        this.selectFSM.step()
    }
}

// Menu options state machine
class OptionSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setScale(0))
 
        // initialize state machine managing options
        scene.selectFSM = new StateMachine('start', {
            start: new NewGameSelect(),
            tutorial: new HowToPlaySelect(),
            credits: new CreditsSelect(),
        }, [scene])
    }
}
 
class NewGameSelect extends State {
    enter(scene) {
        scene.arrow = scene.add.sprite(765, 535, 'arrow')
        scene.arrow.setOrigin(0.5).setScale(2.5)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { down, space } = scene.keys
 
        // transition to tutorial option if down arrow is pressed
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.selectSFX_1.play()
            scene.arrow.destroy()
            this.stateMachine.transition('tutorial')
            return
        }

        // start game if space is pressed
        if(Phaser.Input.Keyboard.JustDown(space) && !this.isTransitioning) {
            scene.selectSFX_2.play()
            scene.arrow.destroy()
            this.isTransitioning = true
            backgroundMusic.stop()
            musicOn = false
            scene.cameras.main.fadeOut(750, 255, 255, 255)
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene.scene.start('selectScene')
            })
        }
    }
}
 
class HowToPlaySelect extends State {
    enter(scene) {
        scene.arrow = scene.add.sprite(798, 597, 'arrow')
        scene.arrow.setOrigin(0.5).setScale(2.5)
    }
 
    execute(scene) {
        // create local copy keyboard object
        const { up, down, space } = scene.keys
 
        // transition to new game option if up arrow is pressed
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.selectSFX_1.play()
            scene.arrow.destroy()
            this.stateMachine.transition('start')
            return
        }
 
        // transition to credits option if down arrow is pressed
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.selectSFX_1.play()
            scene.arrow.destroy()
            this.stateMachine.transition('credits')
            return
        }
 
        // transition to tutorial scene if space is pressed
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_2.play()
            scene.arrow.destroy()
            scene.scene.start('tutorialScene')
        }
    }
}
 
class CreditsSelect extends State {
    enter(scene) {
        scene.arrow = scene.add.sprite(735, 663, 'arrow')
        scene.arrow.setOrigin(0.5).setScale(2.5)
    }

    execute(scene) {
        // create local copy keyboard object
        const { up, space } = scene.keys
 
        // transition to tutorial option if up arrow is pressed
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.selectSFX_1.play()
            scene.arrow.destroy()
            this.stateMachine.transition('tutorial')
            return
        }
 
        // transition to credits scene if space is pressed
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.selectSFX_2.play()
            scene.arrow.destroy()
            scene.scene.start('creditScene')
        }
    }
} 