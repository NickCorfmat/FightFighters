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
        this.bar.clear();

        // white border
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, this.width, this.height);

        // black border
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);

        // orange border
        this.bar.fillStyle(0xffe614);
        this.bar.fillRect(this.x + 6, this.y + 6, this.width - 12, this.height - 12);

        // red health bar
        var dynamicWidth = Math.floor(this.currentHealth/this.maxHealth * (this.width - 18));

        this.bar.fillStyle(0xff8214);
        this.bar.fillRect(this.x + 9, this.y + 9, dynamicWidth, this.height - 18);
    }
}