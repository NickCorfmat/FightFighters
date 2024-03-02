class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene")
    }

    create() {
        this.cameras.main.setBackgroundColor(0xabcabc)

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.add.bitmapText(970, 735, 'fight-font', 'Menu - [M]', 24).setOrigin(0)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start("menuScene")
        }
    }
}