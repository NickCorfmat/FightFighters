class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
 
 
    init(data) {
        this.gameStart = false
        this.p1 = data.player1
        this.p2 = data.player2
    }
 
 
    create() {
        //this.cameras.main.fadeIn(50, 255, 255, 255)
 
 
        // add animated background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)
        this.background.play('fight-background')
 
 
        // set custom world bounds
        this.physics.world.setBounds(-50, 0, width + 100, 7*height/8)
 
 
        const character = {
            'rumble': Rumble,
            'karate': DrKarate
        }
 
 
        // add new fighters to scene (scene, x, y, key, frame, direction, health, speed)
        this.player1 = new (character[this.p1])(this, 375, 600, `${this.p1}`, 0, 'right', 100, 500)
        this.player2 = new (character[this.p2])(this, 825, 600, `${this.p2}`, 0, 'left', 100, 500)
 
 
        // add name cards under health bar
        this.add.sprite(148, 165, `${this.p1}-play-text`).setOrigin(0).setScale(1.75)
        this.add.sprite(790, 165, `${this.p2}-play-text`).setOrigin(0).setScale(1.75)
 
 
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
 
 
        this.keys.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.keys.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
 
 
        // beginning 'FIGHT' sequence
        this.fight = this.add.sprite(width/2, height/2, 'FIGHT').setOrigin(0.5).setScale(5)
 
 
        this.time.delayedCall(1500, () => {
            this.gameStart = true
            this.fight.destroy()
        })
       
        //this.add.line(0, 0, 600, 0, 600, 1600, 0x000000)
    }
 
 
    update() {
        // temporary scene restart function
        if (Phaser.Input.Keyboard.JustDown(this.keys.keyR)) {
            this.scene.restart()
        }
 
 
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
 
 
        //this.player1.decreaseHP(1)
 
 
        if (this.gameStart) {
            this.player1.fsm.step()
            this.player2.fsm.step()
        }
 
 
    }
} 