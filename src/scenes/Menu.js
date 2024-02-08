class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    init() {

    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/road_background.png')
        this.load.image('cone', './assets/cone.png')
        this.load.image('player', './assets/player.png')

        // load audio

    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // menu background
        //this.add.image(0, 0, 'menuScreen').setOrigin(0)

        // add text
        this.add.text(width/2, height/2, 'Press SPACE to start', menuConfig).setOrigin(0.5)

        this.cameras.main.setBackgroundColor('#AAAAAA')
    }

    update() {

        // select Play scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // this.cameras.main.fadeOut(250, 255, 255, 255)
            // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            //     this.scene.start('playScene')
            // })

            this.scene.start('playScene')
        }

        // select Instructions scene
    }
}