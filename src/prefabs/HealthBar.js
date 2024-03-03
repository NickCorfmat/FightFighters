class HealthBar extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, width, height, health) {
        super(scene, x, y)

        this.bar = new Phaser.GameObjects.Graphics(scene)
        this.bar.setDepth(10)

        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.maxHealth = health
        this.currentHealth = this.maxHealth
        
        this.draw()
        scene.add.existing(this.bar)
    }

    decrease (amount) {
        this.value -= amount

        if (this.value < 0) {
            this.value = 0
        }

        this.draw()

        return (this.value === 0)
    }

    draw () {
        this.bar.clear()

        // white border
        this.bar.fillStyle(0xffffff, 0.7)
        this.bar.fillRect(this.x, this.y, this.width, this.height)

        // // black border
        this.bar.lineStyle(6, 0x000000, 1)
        this.bar.strokeRect(this.x + 7, this.y + 7, this.width - 14, this.height - 14)

        // yelow border
        this.bar.lineStyle(4, 0xffe614, 1)
        this.bar.strokeRect(this.x + 9, this.y + 9, this.width - 18, this.height - 18)

        // orange health bar
        let dynamicWidth = Math.floor(this.currentHealth/this.maxHealth * (this.width - 20))

        this.bar.fillStyle(0xff8214)
        this.bar.fillRect(this.x + 10, this.y + 10, dynamicWidth, this.height - 20)
    }
}