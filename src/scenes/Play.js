class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {

    }

    create() {
        // add animated background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)
        this.background.play('fight-background')

        this.physics.world.setBounds(-50, 0, width + 100, 7*height/8)

        // add new fighters to scene (scene, x, y, key, frame, direction, health, speed)
        // this.player = this.physics.add.sprite(0,0,'sticky').setOrigin(0)
        // this.player.body.setGravityY(2500)
        // this.player.body.setCollideWorldBounds(true)
        this.player1 = new Rumble(this, 200, 400, 'sticky', 0, 'right', 100, 500)
        this.player2 = new DrKarate(this, 900, 400, 'sticky', 0, 'left', 100, 500)
        //this.player2 = new DrKarate(this, 200, 150, 'karate', 0, 'left', 100)

        // player 2 keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        
        // player 1 keyboard input
        this.keys.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keys.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keys.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        this.keys.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.keys.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
        this.keys.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)

        this.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.keys.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        //this.add.line(0, 0, 600, 0, 600, 1600, 0x000000);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.keyR)) {
            this.scene.restart()
        }

        // check if game over
        if (this.player1.HP <= 0) {
            this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
            this.time.delayedCall(1800, () => {
                this.scene.start('rumbleWinnerScene')
            })
        } else if (this.player2.HP <= 0) {
            this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
            this.time.delayedCall(1800, () => {
                this.scene.start('karateWinnerScene')
            })
        }

        // face players towards each other
        if (this.player1.x > this.player2.x) {
            this.player1.direction = 'left'
            this.player2.direction = 'right'
        }
        if (this.player2.x > this.player1.x) {
            this.player2.direction = 'left'
            this.player1.direction = 'right'
        }

        //this.player1.decreaseHP(1)

        this.rumbleFSM.step()
        this.karateFSM.step()

    }
}