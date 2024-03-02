class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene")
    }

    create() {
        this.cameras.main.setBackgroundColor(0xabcabc)

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start("menuScene")
        }
    }
}