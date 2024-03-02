class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
 
 
    init(data) {
        this.gameStart = false
        this.p1 = 'rumble' //data.player1
        this.p2 = 'karate' //data.player2
 
 
        // setting up player keyboard input
        this.p1Keys = { }
        this.p2Keys = { }
    }
 
 
    create() {
        // add animated background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)
        this.background.play('fight-background')
 
 
        // set custom world bounds
        this.physics.world.setBounds(-50, 0, width + 100, 7*height/8)
       
        // player 1 keyboard input
        this.p1Keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.p1Keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.p1Keys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.p1Keys.punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.p1Keys.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
 
 
        // player 2 keyboard input
        this.p2Keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.p2Keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.p2Keys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.p2Keys.punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        this.p2Keys.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
 
 
        const character = {
            'rumble': Rumble,
            'karate': DrKarate
        }
 
 
        // add new fighters to scene (scene, x, y, key, frame, facing direction, input object, health, speed)
        this.player1 = new (character[this.p1])(this, 420, 600, `${this.p1}`, 0, 'right', this.p1Keys, 100, 500)
        this.player2 = new (character[this.p2])(this, 880, 600, `${this.p2}`, 0, 'left', this.p2Keys, 100, 500)
 
 
        // temp keys
       
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.keys.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
 
 
        // beginning 'FIGHT' sequence
        this.fightText = this.add.sprite(width/2, height/2, 'FIGHT').setOrigin(0.5).setScale(5)
        this.time.delayedCall(1500, () => {
            this.gameStart = true
            this.fightText.destroy()
        })
    }
 
 
    update() {
        // check if game over
        if (this.player1.HP <= 0 || Phaser.Input.Keyboard.JustDown(this.keys.key1)) {
            this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
            this.time.delayedCall(1800, () => {
                this.scene.start('rumbleWinnerScene')
            })
        } else if (this.player2.HP <= 0 || Phaser.Input.Keyboard.JustDown(this.keys.key2)) {
            this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
            this.time.delayedCall(1750, () => {
                this.scene.start('karateWinnerScene')
            })
        }
 
 
        // face players towards each other
        if (this.player1.x > this.player2.x) {
            this.player1.direction = 'left'
            this.player2.direction = 'right'
        } else {
            this.player2.direction = 'left'
            this.player1.direction = 'right'
        }
 
 
        if (this.gameStart) {
            this.player1.fsm.step()
            this.player2.fsm.step()
        }
    }
} 