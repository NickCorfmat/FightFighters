class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
 
    init(data) {
        // retrieve previous scene data
        this.p1 = 'rumble' //data.player1
        this.p2 = 'karate' //data.player2

        // initialize boolean flags
        this.gameStart = false

        // setting up player keyboard input
        this.p1Keys = { }
        this.p2Keys = { }
    }

    create() {
        // player 1 keyboard input
        this.p1Keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.p1Keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.p1Keys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.p1Keys.punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        this.p1Keys.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
 
        // player 2 keyboard input
        this.p2Keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.p2Keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.p2Keys.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.p2Keys.punch = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N)
        this.p2Keys.kick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // temp keys
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.keys.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)

        // add animated background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)
        this.background.play('fight-background')
 
        // set custom world bounds
        this.physics.world.setBounds(-50, 0, width + 100, 7*height/8)

        // audio
        this.playMusic = this.sound.add('play-sfx', { loop: true, volume: 0.8})
        this.fightSFX = this.sound.add('fight-sfx', { loop: false, volume: 1})
        this.knockoutSFX = this.sound.add('ko-sfx', { loop: false, volume: 2})
 
        // fighter object literal
        const character = {
            'rumble': Rumble,
            'karate': DrKarate
        }
 
        // add new fighters to scene (scene, x, y, texture, frame, facing direction, keyboard input, health, speed)
        this.player1 = new (character[this.p1])(this, 420, 600, `${this.p1}-right`, 0, 'right', this.p1Keys, 100, 500)
        this.player2 = new (character[this.p2])(this, 880, 600, `${this.p2}`, 0, 'left', this.p2Keys, 100, 500)
 
        // beginning 'FIGHT' sequence
        this.fightSFX.play()

        this.fightText = this.add.sprite(width/2, height/2, 'FIGHT').setOrigin(0.5).setScale(5)
        this.time.delayedCall(1000, () => {
            this.gameStart = true // start game
            this.fightText.destroy()
            this.playMusic.play()
        })
    }

    update() {
        // check if game over
        if (this.player1.HP <= 0 || Phaser.Input.Keyboard.JustDown(this.keys.key1)) {
            this.playMusic.stop()
            this.knockoutSFX.play()
            this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
            this.time.delayedCall(1800, () => {
                this.scene.start('rumbleWinnerScene')
            })
        } else if (this.player2.HP <= 0 || Phaser.Input.Keyboard.JustDown(this.keys.key2)) {
            this.playMusic.stop()
            this.knockoutSFX.play()
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
 
        // handle playing state
        if (this.gameStart) {
            this.player1.fsm.step()
            this.player2.fsm.step()
        }
    }
} 