class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        distance = 0

        this.edges = []
        this.trenches = []
        this.degrees = 0
        this.playerSpeed = 5
        this.pathWidth = 200

        this.xoff = 0
        this.seconds;

        this.x = map(noise(this.xoff), 0, 1, 0, width)
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
        this.player.body.setSize(50, 50)
        this.player.body.setCollideWorldBounds(true)

    }

    update() {
        let elapsedTime = this.timedEvent.getElapsedSeconds();
        distance = Math.floor(elapsedTime) * 10
        console.log(distance)

        this.player.play('flying', true)

        /*** Scene Update ***/

        this.background.tilePositionY -= 5

        /*** Player Movement ***/

        // left/right
        if (keySPACE.isDown) {
            this.player.body.setAccelerationX(600)
        } else {
            this.player.body.setAccelerationX(-600)
        }

        /*** Path Generation ***/

        this.fluctuate()

        // for (var i = 0; i < this.edges.length; i++) {
        //     var e = this.edges[i]
        //     e.update()

        //     if (e.y > 960) {
        //         e.destroy()
        //         this.edges.splice(i, 1)
        //     } 
        // }

        for (var i = 0; i < this.trenches.length; i++) {
            var t = this.trenches[i]
            t.y += 10

            // if (this.player.body.onWall(t)) {
            //     this.handleCollision(this.player, t)
            //     console.log('true')
            // }

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

            //console.log(x)

            // var e1 = new Edge(this, this.x - this.pathWidth, -100, 'edge').setOrigin(0.5, 0.5).setScale(1, 0.25)
            // var e2 = new Edge(this, this.x + this.pathWidth, -100, 'edge').setOrigin(0.5, 0.5).setScale(1, 0.25)

            // e1.body.setSize(25, 50).setOffset(39, 7)
            // e2.body.setSize(25, 50).setOffset(39, 7)

            // e1.body.setImmovable(true)
            // e2.body.setImmovable(true)

            // this.physics.add.collider(this.player, e1, this.handleCollision, null, this)
            // this.physics.add.collider(this.player, e2, this.handleCollision, null, this)

            // this.edges.push(e1)
            // this.edges.push(e2)

            var t = this.physics.add.sprite(this.x, -100, 'trench').setOrigin(0.5).setScale(1.3, 0.25)
            t.body.setImmovable(true)
            t.body.checkCollision.down = false
            t.body.checkCollision.up = false

            this.physics.add.collider(this.player, t, this.handleCollision, null, this)

            this.trenches.push(t)
        }

        this.degrees++
        
    }

    handleCollision(player, edge) {
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