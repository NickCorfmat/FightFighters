class RumbleWinner extends Phaser.Scene {
    constructor() {
        super('rumbleWinnerScene')
    }
 
    create() {
        // retieve character dialog text
        this.dialog = this.cache.json.get('dialog')
 
        // background
        this.background = this.add.tileSprite(0, 0, 184, 102, 'fire-background').setOrigin(0).setScale(8)
 
        // audio
        this.selectSFX_2 = this.sound.add('select-sfx-2')
        this.speech = this.sound.add('rumble-winner', { volume: 3 })
        this.speech.play()

        // winner name text
        this.rumbleName = this.add.sprite(width/2, 225, 'rumble-name').setOrigin(0.5).setScale(3)
 
        // winner animation
        this.rumble = this.add.sprite(600, 450, 'Rumble_McSkirmish').setOrigin(0.5).setScale(7.5)

        this.rumble.anims.play('rumble-spin').once('animationcomplete', () => {
            this.typeText() // trigger dialog
            this.rumble.y = 410
            this.rumbleName.destroy()

            // infinite ending pose animation
            this.rumble.anims.play('rumble-speech').once('animationcomplete', () => {
                this.rumble.anims.play('rumble-speech-end')

                // check for transition back to main menu
                this.input.keyboard.on('keydown-M', function() {
                    this.selectSFX_2.play()
                    this.scene.start('menuScene')
                }, this)
            })
        })
 
        // cinematic black borders
        this.add.rectangle(0, 0, width, 174, 0x000000).setOrigin(0)
        this.add.rectangle(0, 634, width, 170, 0x000000).setOrigin(0)

        // initialize empty text
        this.dialogText = this.add.bitmapText(260, 685, 'fight-font', '', 38)
    }
 
    update() {
        // scroll background
        this.background.tilePositionX += 8
    }

    // display dialog text
    typeText() {
        // create array of words from dialog.json
        this.words = this.dialog[1][0]['dialog'].split('-')

        // display words individually
        let currentWord = 0
        this.textTimer = this.time.addEvent({
            startAt: 330,
            delay: 450,
            repeat: this.words.length - 1,
            callback: () => {
                // concatenate next word from dialog text
                this.dialogText.text += this.words[currentWord] + '   '
                // advance word position
                currentWord++
                
                // display bottom right screen text
                if(this.textTimer.getRepeatCount() == 0) {
                    this.time.delayedCall((1500), () => {
                        this.add.bitmapText(985, 735, 'fight-font', 'Menu [M]', 24).setOrigin(0)
                        this.textTimer.destroy()
                    })
                }
            },
            callbackScope: this
        })
    }
} 