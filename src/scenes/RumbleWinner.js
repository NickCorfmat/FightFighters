class RumbleWinner extends Phaser.Scene {
    constructor() {
        super('rumbleWinnerScene')
    }
 
 
    create() {
        this.dialog = this.cache.json.get('dialog')
 
 
        // background
        this.background = this.add.tileSprite(0, 0, 184, 102, 'fire-background').setOrigin(0).setScale(8)
 
 
        // winner name text
        this.rumbleName = this.add.sprite(width/2, 225, 'rumble-name').setOrigin(0.5).setScale(3)
 
 
        // play audio
        this.speech = this.sound.add('rumble-winner')
        this.speech.play()
 
 
        // winner sprite animation
        this.rumble = this.add.sprite(600, 450, 'Rumble_McSkirmish').setOrigin(0.5).setScale(7.5)
        this.rumble.anims.play('rumble-spin').once('animationcomplete', () => {
            this.typeText() // trigger dialog
            this.rumble.y = 410
            this.rumbleName.destroy()
            this.rumble.anims.play('rumble-speech').once('animationcomplete', () => {
                this.rumble.anims.play('rumble-speech-end')
                this.input.keyboard.on('keydown-M', function() {
                    this.scene.start('menuScene')
                }, this)
            })
        })
 
 
        // black borders
        this.add.rectangle(0, 0, width, 174, 0x000000).setOrigin(0)
        this.add.rectangle(0, 634, width, 170, 0x000000).setOrigin(0)
 
 
        this.dialogText = this.add.bitmapText(260, 685, 'fight-font', '', 38)
    }
 
 
    update() {
        this.background.tilePositionX += 8
    }
 
 
    typeText() {
        this.words = this.dialog[1][0]['dialog'].split('-')
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
                // check if timer has exhausted its repeats
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