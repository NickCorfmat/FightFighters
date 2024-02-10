class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionScene")
    }

    preload() {
      
    }

    create() {
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.cameras.main.setBackgroundColor('#FACADE')
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }
}