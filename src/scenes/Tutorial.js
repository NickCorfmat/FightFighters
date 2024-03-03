class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene")
    }

    create() {
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.cameras.main.setBackgroundColor(0x00237a)
        this.add.sprite(width/2, height/2, 'tutorial-background').setOrigin(0.5).setScale(4)
        this.add.bitmapText(930, 705, 'fight-font', 'Menu - [M]', 24).setOrigin(0)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start("menuScene")
        }
    }
}