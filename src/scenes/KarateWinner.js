class KarateWinner extends Phaser.Scene {
    constructor() {
        super('karateWinnerScene')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 158, 106, 'fire-background').setOrigin(0).setScale(8)

        this.karate = this.add.sprite(600, 450, 'Dr_Karate').setOrigin(0.5).setScale(1.25)
        this.karate.anims.play('karate-spin').once('animationcomplete', () => {
            this.karate.y = 410
            this.karate.anims.play('karate-speech').once('animationcomplete', () => {
                this.karate.anims.play('karate-speech-end')

                this.input.keyboard.on('keydown-M', function() {
                    this.scene.start('menuScene')
                }, this)
            })
        })

        this.add.rectangle(0, 0, width, 174, 0x000000).setOrigin(0)
        this.add.rectangle(0, 634, width, 170, 0x000000).setOrigin(0)
    }

    update() {
        this.background.tilePositionX += 7

    }
}