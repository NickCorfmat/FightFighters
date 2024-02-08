class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {
        this.edges = []
        this.degrees = 0
        this.playerSpeed = 5
    }

    create() {

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        /*** World Setup ***/

        this.cameras.main.setBackgroundColor('#AAAAAA')

        /*** Player Setup ***/

        const spawnX = 200 + Phaser.Math.Between(0, 4)
        this.player = new Player(this, spawnX, height-120, 'cone').setOrigin(0.5, 0.5)
        this.player.body.setCollideWorldBounds(true)

        // this.player.body.setVelocity(100, 0)

        // this.physics.add.collider(this.player, this.car, this.handleCollision, null, this)
    }

    update() {

        /*** Scene Update ***/

        //this.background.tilePositionY -= this.speed

        /*** Player Movement ***/

        // left/right
        if (keySPACE.isDown) {
            this.player.x = this.player.x + this.playerSpeed > width - 100 ? width - 100 : this.player.x + this.playerSpeed;
        } else {
            this.player.x = this.player.x - this.playerSpeed < 100 ? 100 : this.player.x - this.playerSpeed;
        }

        /*** Edges ***/

          //this.fluctuate()

        //this.player.update()

        // for (var i = 0; i < this.edges.length; i++) {
        //     var e = this.edges[i]
        //     e.update()

        //     if (e.y > 960) {
        //         e.destroy()
        //         this.edges.splice(i, 1)
        //     } 
        // }

        // console.log(this.edges.length)
        
    }

    fluctuate() {
        if (this.degrees > 360) {
            this.degrees = 0
        }

        if (this.degrees % 20 == 0) {
            let radians = this.degrees * Math.PI/180;
            let x = 150*Math.sin(radians) + 320
            //console.log(x)

            var e1 = new Edge(this, x + 100, -100, 'cone').setOrigin(0, 0)
            var e2 = new Edge(this, x -100, -100, 'cone').setOrigin(0, 0)

            e1.body.setSize(40, 40).setOffset(5, 5)
            e2.body.setSize(40, 40).setOffset(5, 5)

            this.edges.push(e1)
            this.edges.push(e2)
        }

        this.degrees++
    }

    handleCollision(player, cone) {
        
    }
}