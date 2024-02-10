// Edge prefab
class Edge extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)            // add to existing, displayList, updateList
        scene.physics.add.existing(this)    // add physics
    }

    update() {
        this.y += 10
    }
}