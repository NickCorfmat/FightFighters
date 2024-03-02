class KarateWinner extends Phaser.Scene {
    constructor() {
        super('karateWinnerScene')
    }

    create() {
        // background
        this.background = this.add.tileSprite(0, 0, 158, 106, 'pink-fire-background').setOrigin(0).setScale(8)

        // winner name text
        this.karateName = this.add.sprite(width/2, 225, 'karate-name').setOrigin(0.5).setScale(3)

        // winner sprite animation
        this.karate = this.add.sprite(600, 500, 'Dr_Karate').setOrigin(0.5).setScale(4)

        this.karate.anims.play('karate-pose').once('animationcomplete', () => {
            this.karate.anims.play('karate-pose-end')
        })

        this.time.delayedCall((1600), () => {
            this.add.bitmapText(985, 735, 'fight-font', 'Menu [M]', 24).setOrigin(0)
            this.input.keyboard.on('keydown-M', function() {
                this.scene.start('menuScene')
            }, this)
        })

        // black borders
        this.add.rectangle(0, 0, width, 174, 0x000000).setOrigin(0)
        this.add.rectangle(0, 634, width, 170, 0x000000).setOrigin(0)
    }

    update() {
        this.background.tilePositionX += 8
    }
}