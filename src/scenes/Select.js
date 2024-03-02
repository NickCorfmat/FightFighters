class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }
<<<<<<< HEAD

    init() {
        // scene transitioning flag
=======
 
 
    create() {
        this.player1
        this.player2
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        this.isTransitioning = false
    }

    create() {
        this.cameras.main.fadeIn(450, 255, 255, 255)
       
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
<<<<<<< HEAD
        this.keys.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

=======
        this.keys.Esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2 - 30, 'character-select', 0)

        this.add.bitmapText(200, 760, 'fight-font', '[SPACE] - Select', 24).setOrigin(0.5)
        this.add.bitmapText(1025, 760, 'fight-font', '[M] - Menu', 24).setOrigin(0.5)
    }
 
 
    update() {
<<<<<<< HEAD
        // check for transition back to menu
        if(Phaser.Input.Keyboard.JustDown(this.keys.keyM) && !this.isTransitioning) {
            this.scene.start("menuScene")
        }

        // handle character selection
=======
        if(Phaser.Input.Keyboard.JustDown(this.keys.Esc)) {
            this.scene.start("menuScene")
        }
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        this.selectFSM.step()
    }
} 