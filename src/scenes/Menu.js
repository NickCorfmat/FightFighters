class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        this.isTransitioning = false
        this.currentOption = 'new-game'

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.menuOptions = new OptionSelect(this, width/2, height/2, 'new-game', 0)

        this.cameras.main.setBackgroundColor('0x000000')
        this.add.rectangle(width/2, height/3, width, 200, 0xad79db).setOrigin(0.5)
        this.add.sprite(width/2, height/3, 'title').setOrigin(0.44, 0.5).setScale(9)
        this.add.sprite(width/2, 540, 'new-game').setOrigin(0.5).setScale(2)
        this.add.sprite(width/2, 600, 'how-to-play').setOrigin(0.5).setScale(2)
        this.add.sprite(width/2, 660, 'credits').setOrigin(0.5).setScale(2)

       // this.add.line(0, 0, 600, 0, 600, 1600, 0xffffff)

    }

    update() {
        this.selectFSM.step()
    }
}

// Menu options select

class OptionSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(0))

        // initialize state machine managing options (initial state, possible states, state args[])
        scene.selectFSM = new StateMachine('newGame', {
            newGame: new NewGameSelect(),
            howToPlay: new HowToPlaySelect(),
            credits: new CreditsSelect(),
        }, [scene, this])
    }
}

class NewGameSelect extends State {
    enter(scene, menu) {
        scene.arrow = scene.add.sprite(775, 537, 'arrow').setOrigin(0.5)
    }

    execute(scene) {
        const { down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.arrow.destroy()
            this.stateMachine.transition('howToPlay')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(space) && !this.isTransitioning) {
            scene.arrow.destroy()
            this.isTransitioning = true
            scene.cameras.main.fadeOut(750, 255, 255, 255)
            scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                scene.scene.start('selectScene')
            })
        }
    }
}

class HowToPlaySelect extends State {
    enter(scene, menu) {
        scene.arrow = scene.add.sprite(803, 596, 'arrow').setOrigin(0.5)
    }

    execute(scene) {
        const { up, down, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.arrow.destroy()
            this.stateMachine.transition('newGame')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.arrow.destroy()
            this.stateMachine.transition('credits')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.arrow.destroy()
            scene.scene.start('tutorialScene')
        }
    }
}

class CreditsSelect extends State {
    enter(scene, menu) {
        scene.arrow = scene.add.sprite(747, 658, 'arrow').setOrigin(0.5)
    }

    execute(scene) {
        const { up, space } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.arrow.destroy()
            this.stateMachine.transition('howToPlay')
            return
        }
        if(Phaser.Input.Keyboard.JustDown(space)) {
            scene.arrow.destroy()
            scene.scene.start('creditScene')
        }
    }
}