class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

        this.isTransitioning = false
    }

    preload() {
        // load images/spritesheets/tile sprites
        this.load.image('menu_background', './assets/menu_background.png')
        this.load.image('play_background', './assets/play_background.png')
        this.load.image('trench', './assets/trench.png')
        this.load.image('edge', './assets/line.png')
        this.load.image('side-plane', './assets/plane_sideview.png')

        this.load.spritesheet('title', './assets/title.png', {
            frameWidth: 110,
            frameHeight: 40
        })

        this.load.spritesheet('player', './assets/plane.png', {
            frameWidth: 80,
            frameHeight: 120
        })
        
    }

    create() {

        // text config
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
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        
        // menu background
        this.background = this.add.tileSprite(0, 0, 300, 200, 'menu_background').setOrigin(0).setScale(4)

        // add text
        this.add.text(width/2, height/2, 'Press SPACE to start', menuConfig).setOrigin(0.5)
        
        // title animation configuration
        this.anims.create({
            key: 'gameTitle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('title', {
                start: 0,
                end: 1
            })
        })

        // plane sprite
        this.plane = this.physics.add.sprite(width/4, 2*height/3, 'side-plane').setOrigin(0).setScale(3)

        // title sprite
        this.title = this.add.sprite(width/2, height/4).setScale(6).setOrigin(0.5)
        this.title.play('gameTitle')
    }

    update() {
        // scroll background
        this.background.tilePositionX += 1

        // automatic plane movement
        const accelerationX = this.plane.x < width/2 ? 20 : -50
        const accelerationY = this.plane.y >= 3*height/5 ? -10 : 15

        this.plane.body.setAccelerationY(accelerationY)
        this.plane.body.setAccelerationX(accelerationX)

        // select Play scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isTransitioning) {
            this.isTransitioning = true
            this.cameras.main.fadeOut(0, 255, 255, 255)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playScene')
            })
        }

        if (Phaser.Input.Keyboard.JustDown(keyI)) {
            this.scene.start('instructionScene')
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditScene')
        }
    }
}