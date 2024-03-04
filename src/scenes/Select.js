class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }
 
    init() {
        // boolean flags
        this.isTransitioning = false
    }
 
    create() {
        // define keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // beginning scene fade in
        this.cameras.main.fadeIn(450, 255, 255, 255)

        // audio
        this.selectSFX_1 = this.sound.add('select-sfx-1', { volume: 1 })
        this.selectSFX_2 = this.sound.add('select-sfx-2', { volume: 1 })
        this.lockedSFX = this.sound.add('locked-sfx', { volume: 2 })

        this.menuSelectMusic = this.sound.add('menu-select-sfx', { loop: true, volume: 1})
        this.menuSelectMusic.play() // play music
 
        // add background and character selecr state machine
        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2 - 30, 'character-select', 0)
 
        // bottom screen help text
        this.add.bitmapText(200, 760, 'fight-font', '[SPACE] - Select', 24).setOrigin(0.5)
        this.add.bitmapText(1025, 760, 'fight-font', '[M] - Menu', 24).setOrigin(0.5)
    }
 
    update() {
        // check for transition back to main menu
        if(Phaser.Input.Keyboard.JustDown(this.keys.keyM) && !this.isTransitioning) {
            this.selectSFX_1.play()
            this.menuSelectMusic.stop() // stop music
            this.scene.start("menuScene")
        }
 
        // handle character selection
        this.selectFSM.step()
    }
} 