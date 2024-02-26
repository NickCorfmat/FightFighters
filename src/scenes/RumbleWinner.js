class RumbleWinner extends Phaser.Scene {
    constructor() {
        super('rumbleWinnerScene')
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 184, 102, 'fire-background').setOrigin(0).setScale(8)
        this.rumbleName = this.add.sprite(width/2, 225, 'rumble-name').setOrigin(0.5).setScale(3)

        this.speech = this.sound.add('rumble-winner', { loop: false })
        this.speech.play()

        this.rumble = this.add.sprite(600, 450, 'Rumble_McSkirmish').setOrigin(0.5).setScale(1.25)
        this.rumble.anims.play('rumble-spin').once('animationcomplete', () => {
            this.rumble.y = 410
            this.rumbleName.destroy()
            this.rumble.anims.play('rumble-speech').once('animationcomplete', () => {
                this.rumble.anims.play('rumble-speech-end')

                this.input.keyboard.on('keydown-M', function() {
                    this.scene.start('menuScene')
                }, this)
            })
        })

        this.add.rectangle(0, 0, width, 174, 0x000000).setOrigin(0)
        this.add.rectangle(0, 634, width, 170, 0x000000).setOrigin(0)

    }

    update() {
        this.background.tilePositionX += 8

    }
}