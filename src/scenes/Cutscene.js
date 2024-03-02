class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutscene")
    }
 
 
    init(data) {
        this.player1 = data.p1
        this.player2 = data.p2
    }
 
 
    create() {
        this.dialog = this.cache.json.get('dialog')
       
        // background
        this.cameras.main.setBackgroundColor(0x000000)
        this.redBackground = this.add.tileSprite(0, 0, 158, 106, 'fire-background').setOrigin(0).setScale(7.6).setAlpha(0)
        this.pinkBackground = this.add.tileSprite(0, 0, 158, 106, 'pink-fire-background').setOrigin(0).setScale(7.6).setAlpha(0)
 
 
        // character sprites
        this.karate = this.add.sprite(width, height/2, 'karate-cutscene').setOrigin(1, 0.5).setScale(6.4).setAlpha(0)
        this.rumble = this.add.sprite(0, height/2, 'rumble_cutscene_start').setOrigin(0, 0.5).setScale(7.5).setAlpha(0)
 
 
        this.dialogText = this.add.bitmapText(80, 675, 'fight-font', '', 32).setDepth(2)
 
 
        this.time.delayedCall((1500), () => {
            this.newSpeaker('rumble')
            this.rumble.anims.play('rumble-talk')
            this.typeText(0, 70, 300)
            this.rumble.once('animationcomplete', () => {                                   // Rumble intro phrase
                this.rumble.anims.play('rumble-pause').once('animationcomplete', () => {
                    this.newSpeaker('karate')
                    this.karate.anims.play('karate-scream')
                    this.typeText(1, 380, 300)
                    this.karate.once('animationcomplete', () => {                           // Dr. Karate scream
                        this.newSpeaker('rumble')
                        this.rumble.anims.play('rumble-scream')
                        this.typeText(2, 140, 225)
                        this.rumble.once('animationcomplete', () => {                       // Rumble ending phrase
                            this.scene.start('playScene', { player1: this.player1, player2: this.player2 })
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
 
 
    typeText(line, x, delay) {
        this.dialogText.text = ' '
        this.dialogText.setX(x)
        this.words = this.dialog[0][line]['dialog'].split('-')
        let currentWord = 0
        this.textTimer = this.time.addEvent({
            startAt: 320,
            delay: delay,
            repeat: this.words.length - 1,
            callback: () => {
                // concatenate next word from dialog text
                this.dialogText.text += this.words[currentWord] + '   '
                   
                // advance word position
                currentWord++
                // check if timer has exhausted its repeats
                if(this.textTimer.getRepeatCount() == 0) {
                    this.textTimer.destroy()
                }
            },
            callbackScope: this
        })
    }
} 