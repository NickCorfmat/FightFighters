class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        // initializing variables
        distance = 0
        this.walls = []
        this.trenches = []
        this.degrees = 0
        this.pathWidth
        this.xoff = Math.random(0, 1)
        this.seconds;
        this.x = map(noise(this.xoff), 0, 1, 0, width)
        this.prevX = this.x
        this.collisionDetected = false
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

        // scrolling background
        this.background = this.add.tileSprite(0, 0, 600, 400, 'play_background').setOrigin(0).setScale(2)

        // score text
        this.score = this.add.text(40, 40, distance + 'm', textConfig)
        this.score.setDepth(3)

        // high score text
        textConfig.fontSize = '30px'
        textConfig.padding = {top: 5, bottom: 5, left: 5, right: 5}
        this.record = this.add.text(40, 120, 'Record: ' + highscore + 'm', textConfig)
        this.record.setDepth(3)

        // canyon width text
        textConfig.fontSize = '20px'
        this.pathText = this.add.text(40, 170, 'Canyon Width: 500ft', textConfig)
        this.pathText.setDepth(3)

        // 'Canyon Ahead' animation setup
        this.canyonAhead = this.add.sprite(width/2 + 30, 2*height/5, 'warning').setOrigin(0.5).setScale(5).setDepth(5)
        this.canyonAhead.play('canyon-ahead', true)

        // game over sfx
        this.gameOverSFX = this.sound.add('game-over', { loop: false , volume: 1.5})

        /*** Player Setup ***/

        // player character initialization
        this.player = new Player(this, this.x, height-120, 'player')

        /*** Game Over Setup ***/

        // game over text
        this.gameOverCard = this.add.sprite(width/2, height/2, 'gameover').setOrigin(0.5)
        this.gameOverCard.setScale(4)
        this.gameOverCard.setDepth(5)
        this.gameOverCard.setAlpha(0)

        this.crashText = this.add.sprite(width/2, height/3 + 50, 'crash').setOrigin(0.5)
        this.crashText.setScale(4.5)
        this.crashText.setDepth(6)
        this.crashText.setAlpha(0)

        textConfig.backgroundColor = '#e3a46a'
        textConfig.fontSize = '30px'
        this.gameOverOptions = this.add.text(width/2, height/2 + 100, 'Restart (R)\nMenu (M)', textConfig).setOrigin(0.5).setDepth(7)
        this.gameOverOptions.setAlpha(0)

        textConfig.fontSize = '40px'
        this.gameOverScore = this.add.text(width/2, height/2, 'Score: ' + distance + 'm', textConfig).setOrigin(0.5).setDepth(7)
        this.gameOverScore.setAlpha(0)

        // explosion sound
        this.explosionSFX = this.sound.add('explosion', { loop: false, volume: 0.45})
    }

    update() {
        // update score text
        this.score.text = distance + 'm'
        this.gameOverScore.text = 'Score: ' + distance + 'm'

        if (this.gameOver) {
            // game over screen
            this.crashText.play('you-crashed', true)
            this.gameOverCard.setAlpha(1)
            this.crashText.setAlpha(1)
            this.gameOverScore.setAlpha(1)
            this.gameOverOptions.setAlpha(1)

            // restart round
            if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
                this.gameOverSFX.stop()
                enterSFX.play()
                backgroundMusic.resume()
                this.scene.restart()
            }

            // check for transition to menu scene
            if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.gameOverSFX.stop()
                exitSFX.play()
                backgroundMusic.resume()
                this.scene.start("menuScene")
            }
        } else {
            // scroll background
            this.background.tilePositionY -= 2.5

            this.player.update()    // update player
            this.generateTerrain()  // generate random terrain using perlin noise
            this.updateTerrain()    // update border locations
        }
    }

    generateTerrain() {
        if (this.degrees >= 360) {
            this.degrees = 0
        }

        if (this.degrees % 4 == 0) {
            this.xoff += 0.02
        }

        // generate terrain
        if (this.degrees % 3 == 0) {

            // game difficulty function
            this.pathWidth = 200000/(2*distance + 350) + 110
            this.pathText.text = 'Canyon Width: ' + Math.floor(this.pathWidth) + 'ft'

            // Perlin noise generation, courtesy of p5.js library
            this.x = map(noise(this.xoff), 0, 1, 0, width)

            // generate invisible left and right border
            var leftWall = new Wall(this, this.x - this.pathWidth, -100, 'wall')
            var rightWall = new Wall(this, this.x + this.pathWidth, -100, 'wall')

            this.physics.add.collider(this.player, leftWall, this.handleCollision, null, this)
            this.physics.add.collider(this.player, rightWall, this.handleCollision, null, this)

            this.walls.push(leftWall)
            this.walls.push(rightWall)

            // generate trench sprite
            let t = this.add.sprite(this.x, -100, 'trench').setOrigin(0.5)
            t.displayWidth = this.pathWidth*2
            t.flipX = this.x >= this.prevX ? false : true // flip sprite according to pos/neg x shift
            this.trenches.push(t)

            this.prevX = this.x
        }

        this.degrees++
    }

    handleCollision(player, wall) {
        if (!this.collisionDetected) {
            // stop player
            this.player.body.setAccelerationX(0)
            this.player.body.setVelocityX(0)

            this.shipExplode(player)
            this.gameOver = true
            backgroundMusic.pause()
            this.gameOverSFX.play()

            // update high score
            if (distance > highscore) {
                highscore = distance
            }

            this.collisionDetected = true
        }
    }

    shipExplode(player) {
        // hide plane
        player.setAlpha(0)

        // create explosion particles at player's position
        this.explosion = this.add.particles(player.x, player.y, 'flames', {
            speed: 100,
            accelerationX: Phaser.Math.Between(-500, 500),
            accelerationY: Phaser.Math.Between(-500, 500),
            alpha: 0.2,
            lifespan: 1200,
            blendMode: 'ADD',
            scale: { start: 2, end: 0 },
            duration: 1000,
        });

        this.explosion.setDepth(4)

        // play explosion SFX
        this.explosionSFX.play()
    }

    updateTerrain() {
        // update border positions
        for (var i = 0; i < this.walls.length; i++) {
            var w = this.walls[i]
            w.update()

            // destroy out of world sprites
            if (w.y > 960) {
                w.destroy()
                this.walls.splice(i, 1)
            } 
        }

        // update trench sprite and update score
        for (var i = 0; i < this.trenches.length; i++) {
            var t = this.trenches[i]
            t.y += 5

            // update distance score
            if (t.y == this.player.y) {
                distance += 1
            }

            // destroy out of world sprites
            if (t.y > 960) {
                t.destroy()
                this.trenches.splice(i, 1)
            } 
        }
    }
}

// p5.js support for perlin noise functions
function setup() {
    createCanvas(0, 0)
    frameRate(1)
}