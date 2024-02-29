class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene")
    }

    create() {
        this.cameras.main.setBackgroundColor(0xabcabc)

        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            this.scene.start("menuScene")
        }
    }
}