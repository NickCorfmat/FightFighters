class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        distance = 0

        this.walls = []
        this.trenches = []
        this.degrees = 0
        this.pathWidth

        this.xoff = 0
        this.seconds;

        this.x = map(noise(this.xoff), 0, 1, 0, width)
        this.prevX = this.x
    }

    create() {
        // GAME OVER flag
        this.gameOver = false

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        /*** World Setup ***/

        // text config
        let textConfig = {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            backgroundColor: '#9ab6bf',
            color: '#000000',
            align: 'center',
            padding: {
                top: 15,
                bottom: 15,
                left: 15,
                right: 15
            },
            lineSpacing: 10,
            fixedWidth: 0
        }

        this.background = this.add.tileSprite(0, 0, 600, 400, 'play_background').setOrigin(0).setScale(2)

        this.score = this.add.text(40, 40, distance + 'm', textConfig)
        this.score.setDepth(3)

        textConfig.fontSize = '30px'
        textConfig.padding = {top: 5, bottom: 5, left: 5, right: 5}
        this.record = this.add.text(40, 120, 'Record: ' + highscore + 'm', textConfig)
        this.record.setDepth(3)

        textConfig.fontSize = '20px'
        this.pathText = this.add.text(40, 170, 'Canyon Width: 500ft', textConfig)
        this.pathText.setDepth(3)

        /*** Player Setup ***/

        // plane animation config
        this.anims.create({
            key: 'fly-straight',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            })
        })

        this.anims.create({
            key: 'fly-right',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 5
            })
        })

        this.anims.create({
            key: 'fly-left',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 7
            })
        })

        // player character initialization
        this.player = new Player(this, this.x, height-120, 'player').setOrigin(0.5, 0.5)
        this.player.setScale(1.4)
        this.player.body.setCircle(25, 15, 40)
        this.player.body.setImmovable(true)
        this.player.body.setCollideWorldBounds(true)

        /*** Game Over Setup ***/

        // game over animation
        this.anims.create({
            key: 'you-crashed',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('crash', {
                start: 0,
                end: 1
            })
        })

        // game over text
        this.gameOverCard = this.add.sprite(width/2, height/2, 'gameover').setOrigin(0.5)
        this.gameOverCard.setScale(4)
        this.gameOverCard.setDepth(5)
        this.gameOverCard.setAlpha(0)

        this.crashText = this.add.sprite(width/2, height/3 + 50, 'crash').setOrigin(0.5)
        this.crashText.setScale(4.5)
        this.crashText.setDepth(6)
        this.crashText.setAlpha(0)

        this.gameOverOptions = this.add.text(width/2, height/2 + 100, 'Restart (R)\nMenu (M)', textConfig).setOrigin(0.5).setDepth(7)
        this.gameOverOptions.setAlpha(0)

        textConfig.fontSize = '40px'
        this.gameOverScore = this.add.text(width/2, height/2, 'Score: ' + distance + 'm', textConfig).setOrigin(0.5).setDepth(7)
        this.gameOverScore.setAlpha(0)

    }

    update() {
        this.score.text = distance + 'm'
        this.gameOverScore.text = 'Score: ' + distance + 'm'

        if (this.gameOver) {

            this.crashText.play('you-crashed', true)
            this.gameOverCard.setAlpha(1)
            this.crashText.setAlpha(1)
            this.gameOverScore.setAlpha(1)
            this.gameOverOptions.setAlpha(1)

            if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
                this.scene.restart()
            }

            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.scene.start("menuScene")
            }
        } else {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene")
        }

        /*** Scene Update ***/

        this.background.tilePositionY -= 2.5

        /*** Player Movement ***/

        if (this.player.body.velocity.x >= 150) {
            this.player.play('fly-right', true)
        } else if (this.player.body.velocity.x <= -150) {
            this.player.play('fly-left', true)
        } else {
            this.player.play('fly-straight', true)
        }

        // left/right
        if (keySPACE.isDown) {
            this.player.body.setAccelerationX(1200)
        } else {
            this.player.body.setAccelerationX(-600)
        }

        /*** Path Generation ***/

        // generate random terrain using perlin noise
        this.generateTerrain()

        // update borders
        for (var i = 0; i < this.walls.length; i++) {
            var w = this.walls[i]
            w.update()
            if (w.y > 960) {
                w.destroy()
                this.walls.splice(i, 1)
            } 
        }

        // update trench sprite and update score
        for (var i = 0; i < this.trenches.length; i++) {
            var t = this.trenches[i]
            t.y += 5

            if (t.y == this.player.y) {
                distance += 1
            }

            if (t.y > 960) {
                t.destroy()
                this.trenches.splice(i, 1)
            } 
        }
    }
    }

    generateTerrain() {
        if (this.degrees >= 360) {
            this.degrees = 0
        }

        if (this.degrees % 4 == 0) {
            this.xoff += 0.02
        }

        if (this.degrees % 3 == 0) {

            // game difficulty function
            this.pathWidth = 500000/(distance + 1000)
            console.log(this.pathWidth)
            this.pathText.text = 'Canyon Width: ' + Math.floor(this.pathWidth) + 'ft'

            // Perlin noise generation, courtesy of p5.js library
            this.x = map(noise(this.xoff), 0, 1, 0, width)

            var leftWall = new Wall(this, this.x - this.pathWidth, -100, 'wall').setOrigin(0.5)
            var rightWall = new Wall(this, this.x + this.pathWidth, -100, 'wall').setOrigin(0.5)

            leftWall.alpha = 0
            rightWall.alpha = 0

            leftWall.body.setSize(5, 20)
            rightWall.body.setSize(5, 20)

            leftWall.body.setOffset(-20, 0)
            rightWall.body.setOffset(20, 0)

            leftWall.body.setImmovable(true)
            rightWall.body.setImmovable(true)

            this.physics.add.collider(this.player, leftWall, this.handleCollision, null, this)
            this.physics.add.collider(this.player, rightWall, this.handleCollision, null, this)

            this.walls.push(leftWall)
            this.walls.push(rightWall)

            let t = this.add.sprite(this.x, -100, 'trench').setOrigin(0.5)
            t.displayWidth = this.pathWidth*2
            t.flipX = this.x >= this.prevX ? false : true
            this.trenches.push(t)

            this.prevX = this.x
        }

        this.degrees++
    }

    handleCollision(player, edge) {
        //console.log('collision')
        this.player.body.setAccelerationX(0)
        this.player.body.setVelocityX(0)

        this.shipExplode(player)
        this.gameOver = true

        if (distance > highscore) {
            highscore = distance
        }
    }

    shipExplode(player) {

    }
}

function setup() {
    createCanvas(0, 0)
    frameRate(1)
}