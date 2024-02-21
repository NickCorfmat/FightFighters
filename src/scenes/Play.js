class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    init() {

    }

    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0).setScale(2)

        this.ko = this.add.sprite(600, 400, 'KO').setOrigin(0.45, 0.5).setScale(12)
        this.ko.setAlpha(0)

        this.hp = new HealthBar(this, 175, 110)

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart()
        }

        this.hp.decrease(5)

        if (this.hp.value <= 0) {
            this.ko.setAlpha(1)
        }

    }
}