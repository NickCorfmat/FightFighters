class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

        musicOn = true
    }

    preload() {
        // load images
        this.load.image('menu_background', './assets/menu_background.png')
        this.load.image('play_background', './assets/play_background.png')
        this.load.image('instructions_background', './assets/instructions_background.png')
        this.load.image('clouds', './assets/clouds.png')
        this.load.image('trench', './assets/trench.png')
        this.load.image('wall', './assets/wall.png')
        this.load.image('side-plane', './assets/plane_sideview.png')
        this.load.image('gameover', './assets/gameover.png')

        // load spritesheets
        this.load.spritesheet('title', './assets/title.png', {
            frameWidth: 110,
            frameHeight: 40
        })

        this.load.spritesheet('player', './assets/plane.png', {
            frameWidth: 80,
            frameHeight: 120
        })

        this.load.spritesheet('crash', './assets/crash.png', {
            frameWidth: 120,
            frameHeight: 30
        })

        // load audio
        this.load.audio('music', './assets/music.wav')
        
    }

    create() {
        this.isTransitioning = false

        // background music
        if (!musicOn) {
            this.backgroundMusic = this.sound.add('music', { loop: true })
            this.backgroundMusic.play()
            musicOn = true
        }

        // text config
        let textConfig = {
            fontFamily: '"Press Start 2P"',
            fontSize: '28px',
            color: '#843605',
            align: 'center',
            lineSpacing: 10,
            fixedWidth: 0
        }

        // title animation config
        this.anims.create({
            key: 'gameTitle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('title', {
                start: 0,
                end: 1
            })
        })

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I)
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        
        // menu background
        this.background = this.add.tileSprite(0, 0, 300, 200, 'menu_background').setOrigin(0).setScale(4)

        // menu text
        this.add.text(width/2, height/4 + 190, 'Press SPACE to start\nInstructions (I)\nCredits (C)', textConfig).setOrigin(0.5)

        // plane sprite
        this.plane = this.physics.add.sprite(width/4, 2*height/3, 'side-plane').setOrigin(0).setScale(3)

        // title animation
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

        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isTransitioning) {
            this.isTransitioning = true
            this.cameras.main.fadeOut(1000, 255, 255, 255)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playScene')
            })
        }

        // check for transition to instructions scene
        if (Phaser.Input.Keyboard.JustDown(keyI)) {
            this.scene.start('instructionScene')
        }

        // check for transition to credits scene
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('creditScene')
        }
    }
}