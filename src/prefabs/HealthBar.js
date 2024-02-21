class HealthBar extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y)

        this.bar = new Phaser.GameObjects.Graphics(scene)

        this.x = x
        this.y = y
        this.value = 330
        this.p =   99/100
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

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 330, 44);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 326, 40);

        this.bar.fillStyle(0xff8000);

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 40);
    }
}