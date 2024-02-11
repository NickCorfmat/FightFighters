class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene")
    }

    create() {
        // define keys
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // text config
        let textConfig = {
            fontFamily: '"Press Start 2P"',
            fontSize: '30px',
            color: '#843605',
            align: 'left',
            lineSpacing: 15,
            fixedWidth: 0
        }

        // background
        this.add.sprite(0, 0, 'instructions_background').setOrigin(0).setScale(4)

        // scrolling clouds
        this.clouds = this.add.tileSprite(0, 80, 300, 50, 'clouds').setOrigin(0)
        this.clouds.setScale(4)
        this.clouds.setAlpha(0.6)

        // instructions text
        this.add.text(width/4 + 100, height/2 - 50, 'Your mission, Captain:\nManeuver through increasingly\nchallenging terrain while\nstaying within the canyon\'s walls.', textConfig).setOrigin(0.5)
        this.add.text(3*width/4, height/2 - 50, 'Controls:\nPress SPACE to accelerate right\nRELEASE to accelerate left\nReturn to Menu (M)', textConfig).setOrigin(0.5)
    }

    update() {
        // scroll clouds
        this.clouds.tilePositionX -= 0.1

        // check for transition to menu scene
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }
}