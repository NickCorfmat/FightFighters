// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)            // add to existing, displayList, updateList
        scene.physics.add.existing(this)    // add physics
        
        this.depth = 2
        this.setOrigin(0.5)
        this.setScale(1.4)
        this.body.setCircle(25, 15, 40)
        this.body.setImmovable(true)
        this.body.setCollideWorldBounds(true)
        
    }

    update() {
        if (this.body.velocity.x >= 150) {
            this.anims.play('fly-right', true)
        } else if (this.body.velocity.x <= -150) {
            this.anims.play('fly-left', true)
        } else {
            this.anims.play('fly-straight', true)
        }

        // left/right
        if (keySPACE.isDown) {
            this.body.setAccelerationX(1200)
        } else {
            this.body.setAccelerationX(-600)
        }
    }
}