class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.cameras.main.setBackgroundColor('#aac6cc')
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene')
        }
    }
}