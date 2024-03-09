// Hitbox prefab
class Hitbox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, width, height) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)          // add to existing, displayList, updateList
        scene.physics.add.existing(this)  // add physics

        this.width = width;
        this.height = height;

        this.body.setSize(this.width, this.height)
        this.body.setImmovable(true)
        this.alpha = 0
    }
}