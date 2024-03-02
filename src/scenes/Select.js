class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }

    init() {
        // scene transitioning flag
        this.isTransitioning = false
    }

    create() {
        this.cameras.main.fadeIn(450, 255, 255, 255)
        
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2 - 30, 'character-select', 0)

        this.add.bitmapText(200, 760, 'fight-font', '[SPACE] - Select', 24).setOrigin(0.5)
        this.add.bitmapText(1025, 760, 'fight-font', '[M] - Menu', 24).setOrigin(0.5)
    }

    update() {
        // check for transition back to menu
        if(Phaser.Input.Keyboard.JustDown(this.keys.keyM) && !this.isTransitioning) {
            this.scene.start("menuScene")
        }

        // handle character selection
        this.selectFSM.step()
    }
}