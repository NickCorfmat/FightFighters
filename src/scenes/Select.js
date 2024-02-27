class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }

    create() {
        this.cameras.main.fadeIn(450, 255, 255, 255)
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2, 'character-select', 0)
    }

    update() {
        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(this.keys.Enter)) {
            this.cameras.main.fadeOut(1000, 255, 255, 255)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playScene')
            })
        }

        this.selectFSM.step()
    }
}