// Hitbox prefab
class Hitbox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, width, height, opponent) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)          // add to existing, displayList, updateList
        scene.physics.add.existing(this)  // add physics

        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.damage = 0
        this.opponent = opponent
        this.enabled = false

        this.body.setSize(this.width, this.height)
        this.body.setImmovable(true)
        this.alpha = 0

        scene.physics.add.collider(this.opponent, this, () => {
            if (this.enabled) {
                this.opponent.HP -= this.damage
                this.opponent.healthBar.decrease(this.damage)
                console.log('hit')
                fighter.justHit = true
            }
            // fighter.punch1HB.destroy()
            this.setPosition(-100, -100)
        }, null, scene)
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setBoxSize(width, height) {
        this.width = width
        this.height = height
        this.body.setSize(this.width, this.height)
    }

    setDamage(damage) {
        this.damage = damage
    }

    enable() {
        this.enable = true
    }

    disable() {
        this.enable = false
    }
}