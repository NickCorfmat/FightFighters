class Select extends Phaser.Scene {
    constructor() {
        super("selectScene")
    }
 
 
    create() {
        this.player1
        this.player2
 
 
        this.isTransitioning = false
        this.cameras.main.fadeIn(450, 255, 255, 255)
       
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
 
 
        this.cameras.main.setBackgroundColor(0x19198A)
        this.characterSelect = new CharacterSelect(this, width/2, height/2, 'character-select', 0)
    }
 
 
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keys.Esc)) {
            this.scene.start("menuScene")
        }
 
 
        this.selectFSM.step()
    }
} 