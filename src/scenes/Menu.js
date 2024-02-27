class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

    }

    create() {
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        //this.background = this.add.sprite(width/2, height/2, 'menu_background').setOrigin(0.5).setScale(0.55)
        this.cameras.main.setBackgroundColor('0x000000')
        this.add.rectangle(width/2, height/3, width, 200, 0xad79db).setOrigin(0.5)
        this.add.sprite(width/2, height/3, 'title').setOrigin(0.44, 0.5).setScale(9)

       // this.add.line(0, 0, 600, 0, 600, 1600, 0xffffff)

    }

    update() {
        // check for transition to play scene
        if (Phaser.Input.Keyboard.JustDown(this.keys.Enter)) {
            this.cameras.main.fadeOut(250, 255, 255, 255)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('selectScene')
            })
        }

    }
}