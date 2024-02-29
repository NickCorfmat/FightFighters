class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }

    create() {
        this.isTransitioning = false
        this.cameras.main.fadeIn(450, 255, 255, 255)
        
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2, 'character-select', 0)
    }

    update() {
        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(this.keys.space) && !this.isTransitioning) {
            this.isTransitioning = true
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('cutscene')
            })
        }

        if(Phaser.Input.Keyboard.JustDown(this.keys.Esc)) {
            this.scene.start("menuScene")
        }

        this.selectFSM.step()
    }
}