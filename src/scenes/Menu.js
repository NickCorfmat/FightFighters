class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

    }

    create() {
        this.cameras.main.setBackgroundColor('#FACADE')
        
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update() {
        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('playScene')
        }

    }
}