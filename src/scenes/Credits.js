class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        // define keyboard input
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // audio
        this.selectSFX_1 = this.sound.add('select-sfx-1')

        this.cameras.main.setBackgroundColor(0xfacade)

        this.add.bitmapText(970, 735, 'fight-font', 'Menu - [M]', 24).setOrigin(0)
    }

    update() {
        // check for transition back to main menu
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.selectSFX_1.play()
            this.scene.start("menuScene")
        }
    }
}