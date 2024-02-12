// Wall prefab
class Wall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)            // add to existing, displayList, updateList
        scene.physics.add.existing(this)    // add physics
        
        this.setOrigin(0.5)
        this.body.setSize(5, 20)
        this.body.setImmovable(true)
        this.alpha = 0
    }

    update() {
        this.y += 5
    }
}