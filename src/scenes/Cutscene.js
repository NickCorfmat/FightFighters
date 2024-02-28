class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutscene")
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 158, 106, 'pink-fire-background').setOrigin(0).setScale(7.6)

        this.karate = this.add.sprite(width, height/2, 'karate-cutscene').setOrigin(1, 0.5).setScale(6.4)
        this.karate.anims.play('karate-scream').once('animationcomplete', () => {
            this.scene.start('playScene')
        })

        // black borders
        this.add.rectangle(0, 0, width, 190, 0x000000).setOrigin(0)
        this.add.rectangle(0, 610, width, 190, 0x000000).setOrigin(0)

    }

    update() {
        this.background.tilePositionX += 14
    }
}