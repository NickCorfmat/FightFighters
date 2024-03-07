// Hitbox prefab
class Hitbox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)          // add to existing, displayList, updateList
        scene.physics.add.existing(this)  // add physics

        this.body.setSize(40, 60)
        this.body.setImmovable(true)
        this.alpha = 0
    }
}