class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

        musicOn = false
    }

    create() {
        this.isTransitioning = false

        // background music
        if (!musicOn) {
            backgroundMusic = this.sound.add('music', { loop: true , volume: 0.5})
            backgroundMusic.play()
            musicOn = true
        }

        // initialize button select SFX
        enterSFX = this.sound.add('enter', { loop: false, volume: 0.5 })
        exitSFX = this.sound.add('exit', { loop: false, volume: 2 })

        // text config
        let textConfig = {
            fontFamily: '"Press Start 2P"',
            fontSize: '28px',
            color: '#843605',
            align: 'center',
            lineSpacing: 10,
            fixedWidth: 0
        }

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
        // resume music if paused
        if (backgroundMusic.isPaused) {
            backgroundMusic.resume()
        }
        // scroll background
        this.background.tilePositionX += 1

        // automatic plane movement
        const accelerationX = this.plane.x < width/2 ? 20 : -50
        const accelerationY = this.plane.y >= 3*height/5 ? -10 : 15

        this.plane.body.setAccelerationY(accelerationY)
        this.plane.body.setAccelerationX(accelerationX)

        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isTransitioning) {
            enterSFX.play()
            this.isTransitioning = true
            this.cameras.main.fadeOut(1000, 255, 255, 255)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playScene')
            })
        }

        // check for transition to instructions scene
        if (Phaser.Input.Keyboard.JustDown(keyI)) {
            enterSFX.play()
            backgroundMusic.pause()
            this.scene.start('instructionScene')
        }

        // check for transition to credits scene
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            enterSFX.play()
            backgroundMusic.pause()
            this.scene.start('creditScene')
        }
    }
}