// Loading scene format courtesy of Nathan Altice

class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load images
        this.load.image('menu_background', './assets/menu_background.png')
        this.load.image('play_background', './assets/play_background.png')
        this.load.image('instructions_background', './assets/instructions_background.png')
        this.load.image('credits_background', './assets/credits_background.png')
        this.load.image('clouds', './assets/clouds.png')
        this.load.image('trench', './assets/trench.png')
        this.load.image('wall', './assets/wall.png')
        this.load.image('side-plane', './assets/plane_sideview.png')
        this.load.image('gameover', './assets/gameover.png')
        this.load.image('flames', './assets/explosion.png')

        // load spritesheets
        this.load.spritesheet('title', './assets/title.png', {
            frameWidth: 110,
            frameHeight: 40
        })

        this.load.spritesheet('train', './assets/train.png', {
            frameWidth: 150,
            frameHeight: 40
        })

        this.load.spritesheet('player', './assets/plane.png', {
            frameWidth: 80,
            frameHeight: 120
        })

        this.load.spritesheet('crash', './assets/crash.png', {
            frameWidth: 120,
            frameHeight: 30
        })

        this.load.spritesheet('warning', './assets/warning.png', {
            frameWidth: 140,
            frameHeight: 20
        })

        // load audio
        this.load.audio('music', './assets/music.wav')
        this.load.audio('western-standoff', './assets/western_standoff.wav')
        this.load.audio('explosion', './assets/explosion.wav')
        this.load.audio('enter', './assets/click.wav')
        this.load.audio('exit', './assets/exit.wav')
        this.load.audio('game-over', './assets/gameover.wav')
    }

    create() {
        // title animation config
        this.anims.create({
            key: 'gameTitle',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('title', {
                start: 0,
                end: 1
            })
        })

        // train animation config
        this.anims.create({
            key: 'choo-choo',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('train', {
                start: 0,
                end: 9
            })
        })

        // 'canyon ahead' animation config
        this.anims.create({
            key: 'canyon-ahead',
            frameRate: 4,
            repeat: 5,
            duration: 2000,
            hideOnComplete: true,
            frames: this.anims.generateFrameNumbers('warning', {
                start: 0,
                end: 1
            })
        })

        // game over animation config
        this.anims.create({
            key: 'you-crashed',
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('crash', {
                start: 0,
                end: 1
            })
        })

        // plane animation config
        this.anims.create({
            key: 'fly-straight',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            })
        })

        // tilt plane right animation config
        this.anims.create({
            key: 'fly-right',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 5
            })
        })

        // tilt plane right animation config
        this.anims.create({
            key: 'fly-left',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 7
            })
        })

        // text config
        let textConfig = {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            color: '#ffffff',
            align: 'center',
            fixedWidth: 0
        }

        // credits text
        this.add.text(width/2, height/2, 'Loading...', textConfig, textConfig).setOrigin(0.5)

        // proceed once loading completes
        this.scene.start('menuScene')
    }
}