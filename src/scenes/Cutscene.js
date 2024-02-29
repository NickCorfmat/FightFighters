class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutscene")
    }

    create() {

        // background
        this.cameras.main.setBackgroundColor(0x000000)
        this.redBackground = this.add.tileSprite(0, 0, 158, 106, 'fire-background').setOrigin(0).setScale(7.6).setAlpha(0)
        this.pinkBackground = this.add.tileSprite(0, 0, 158, 106, 'pink-fire-background').setOrigin(0).setScale(7.6).setAlpha(0)

        // character sprites
        this.karate = this.add.sprite(width, height/2, 'karate-cutscene').setOrigin(1, 0.5).setScale(6.4).setAlpha(0)
        this.rumble = this.add.sprite(0, height/2, 'rumble_cutscene_start').setOrigin(0, 0.5).setScale(7.5).setAlpha(0)


        this.time.delayedCall((1500), () => {
            this.newSpeaker('rumble')
            this.rumble.anims.play('rumble-talk').once('animationcomplete', () => {                 // Rumble intro phrase
                this.rumble.anims.play('rumble-pause').once('animationcomplete', () => {
                    this.newSpeaker('karate')
                    this.karate.anims.play('karate-scream').once('animationcomplete', () => {       // Dr. Karate scream
                        this.newSpeaker('rumble')
                        this.rumble.anims.play('rumble-scream').once('animationcomplete', () => {   // Rumble ending phrase
                            this.scene.start('playScene')
                        })
                    })
                })
            })
        })

        // black borders
        this.add.rectangle(0, 0, width, 190, 0x000000).setOrigin(0)
        this.add.rectangle(0, 610, width, 190, 0x000000).setOrigin(0)
    }

    update() {
        this.redBackground.tilePositionX += 14
        this.pinkBackground.tilePositionX += 14
    }

    newSpeaker(speaker) {
        if (speaker == 'rumble') {
            this.redBackground.setAlpha(1)
            this.pinkBackground.setAlpha(0)
            this.rumble.setAlpha(1)
            this.karate.setAlpha(0)
        } else {
            this.redBackground.setAlpha(0)
            this.pinkBackground.setAlpha(1)
            this.rumble.setAlpha(0)
            this.karate.setAlpha(1)
        }
    }
}