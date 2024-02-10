class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        distance = 0

        this.walls = []
        this.trenches = []
        this.degrees = 0
        this.pathWidth = 300

        this.xoff = 0
        this.seconds;

        this.x = map(noise(this.xoff), 0, 1, 0, width)
        this.prevX = this.x
    }

    create() {

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        /*** World Setup ***/

        this.background = this.add.tileSprite(0, 0, 600, 400, 'play_background').setOrigin(0).setScale(2)

        // this.clock = this.time.addEvent({
        //     delay: 1000,
        //     repeat: -1,
        //     callback: () => {
        //       let elapsedTime = new Date();
        //       this.seconds = elapsedTime.getSeconds()
        //       this.distance = this.seconds * 5
        //       console.log(this.distance)

        //     }
        //   });

        this.timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 })

        /*** Player Setup ***/

        this.anims.create({
            key: 'flying',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            })
        })

        this.player = new Player(this, this.x, height-120, 'player').setOrigin(0.5, 0.5)
        this.player.setScale(1.4)
        this.player.body.setCircle(25, 15, 40)
        this.player.body.setCollideWorldBounds(true)

    }

    update() {
        let elapsedTime = this.timedEvent.getElapsedSeconds();
        distance = Math.floor(elapsedTime) * 10
        //console.log(distance)

        this.player.play('flying', true)

        /*** Scene Update ***/

        this.background.tilePositionY -= 2.5

        /*** Player Movement ***/

        // left/right
        if (keySPACE.isDown) {
            this.player.body.setAccelerationX(1200)
        } else {
            this.player.body.setAccelerationX(-600)
        }

        /*** Path Generation ***/

        this.fluctuate()

        for (var i = 0; i < this.walls.length; i++) {
            var w = this.walls[i]
            w.update()

            if (w.y > 960) {
                w.destroy()
                this.walls.splice(i, 1)
            } 
        }

        for (var i = 0; i < this.trenches.length; i++) {
            var t = this.trenches[i]
            t.y += 5

            if (t.y > 960) {
                t.destroy()
                this.trenches.splice(i, 1)
            } 
        }

    }

    fluctuate() {
        if (this.degrees > 360) {
            this.degrees = 0
        }

        if (this.degrees % 4 == 0) {
            this.xoff += 0.02
        }

        if (this.degrees % 2 == 0) {
            this.x = map(noise(this.xoff), 0, 1, 0, width)

            //console.log(this.prevX)

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

            // if (Math.abs(this.x - this.prevX) >= 10) {
            //     console.log('hi')
            //     let direction = this.x > this.prevX ? 1 : -1
            //     let stepSize = Math.abs(this.x - this.prevX)/5

            //     for (let stepX = this.prevX; direction == 1 ? stepX <= this.x : stepX >= this.x; stepX += stepSize) {
            //         var t = this.physics.add.sprite(this.x, -100, 'trench').setOrigin(0.5).setScale(1.3, 0.25)
            //         t.body.setImmovable(true)
            //         t.body.checkCollision.down = false
            //         t.body.checkCollision.up = false

            //         this.physics.add.collider(this.player, t, this.handleCollision, null, this)

            //         this.trenches.push(t)
            //     }
            // } else {
            let t = this.add.sprite(this.x, -100, 'trench').setOrigin(0.5)
            t.displayWidth = this.pathWidth*2
            t.displayHeight = t.height/4
            this.trenches.push(t)

            //}

            this.prevX = this.x
        }

        this.degrees++
        
    }

    handleCollision(player, edge) {
        console.log('collision')
        this.shipExplode(player)
    }

    shipExplode(player) {
        // // temporarily hide plane
        // player.alpha = 0

        // // create explosion sprite at plane's position
        // let boom = this.add.sprite(player.x, player.y, 'explosion').setOrigin(0, 0);
        // boom.anims.play('explode')              // play explode animation
        // boom.on('animationcomplete', () => {    // callback after anim completes
        //     boom.destroy()                      // remove explosion sprite 
        // })

        // // check/update high score
        // highscore = Math.max(highscore, distance)
        
        // this.sound.play('sfx-explosion')
    }
}

function setup() {
    createCanvas(0, 0)
    frameRate(1)
}