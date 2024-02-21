class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('background', './assets/Background.png')
        this.load.image('KO', './assets/KO.png')
    }

    create() {
        // define global keyboard bindings
        // keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        // keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        // keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // proceed once loading completes
        this.scene.start('menuScene')
    }
}