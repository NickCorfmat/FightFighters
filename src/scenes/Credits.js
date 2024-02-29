class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        this.cameras.main.setBackgroundColor(0xfacade)

        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            this.scene.start("menuScene")
        }
    }
}