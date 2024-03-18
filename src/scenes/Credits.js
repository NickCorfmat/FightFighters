class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }

    create() {
        // define keyboard input
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // audio
        this.selectSFX_1 = this.sound.add('select-sfx-1')

        // background
        this.cameras.main.setBackgroundColor(0xae3339)
        this.add.sprite(width/2, height/2, 'credits-background').setOrigin(0.5).setScale(4)

        this.add.bitmapText(930, 705, 'fight-font', 'Menu - [M]', 24).setOrigin(0)

        // credits
        this.add.bitmapText(100, 175, 'fight-font', '\"Fight Fighters\" Adapted from Disney\'s\nGravity Falls Season 1 Episode 10 \"Fight Fighters\"', 28).setOrigin(0)
        this.add.bitmapText(100, 275, 'fight-font', 'Code: Nick Corfmat and Rayan Hirech', 28).setOrigin(0)
        this.add.bitmapText(100, 350, 'fight-font', 'Original Pixel Art: Paul Robertson', 28).setOrigin(0)
        this.add.bitmapText(100, 425, 'fight-font', 'Main Menu Music: \"Shoryuken\" by Panda Beats', 28).setOrigin(0)
        this.add.bitmapText(100, 500, 'fight-font', 'All Other Music: Brad Breeck', 28).setOrigin(0)
        this.add.bitmapText(100, 575, 'fight-font', 'SFX: From original \"Fight Fighters\" episode', 28).setOrigin(0)
        this.add.bitmapText(100, 650, 'fight-font', 'Font by OPTIFONT', 28).setOrigin(0)
    }

    update() {
        // check for transition back to main menu
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.selectSFX_1.play()
            this.scene.start("menuScene")
        }
    }
}