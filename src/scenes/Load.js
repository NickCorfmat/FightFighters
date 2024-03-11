class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load assets
        this.load.path = "./assets/"

        // UI
        this.load.image('title', 'logo.png')
        this.load.image('new-game', 'ui_new_game.png')
        this.load.image('how-to-play', 'ui_how_to_play.png')
        this.load.image('credits', 'ui_credits.png')
        this.load.image('arrow', 'arrow.png')
        this.load.image('KO', 'KO.png')
        this.load.image('FIGHT', 'fight.png')
        this.load.image('rumble-play-text', 'rumble_play_text.png')
        this.load.image('karate-play-text', 'karate_play_text.png')
        this.load.image('rumble-name', 'rumble_mcskirmish_text.png')
        this.load.image('karate-name', 'karate_name_text.png')
        this.load.image('hitbox', 'hitbox.png')

        this.load.atlas('icons', 'character_icons.png', 'icons.json')
        this.load.spritesheet('lock', 'lock.png', { frameWidth: 30, frameHeight: 30 })
        this.load.spritesheet('current-player', 'ui_player_select.png', { frameWidth: 220, frameHeight: 123 })

        // Backgrounds
        this.load.image('fire-background', 'fire_tilesprite.png')
        this.load.image('pink-fire-background', 'pink_fire_tilesprite.png')
        this.load.spritesheet('character-select', 'character_menu_background.png', { frameWidth: 220, frameHeight: 123 })
        this.load.image('tutorial-background', 'tutorial_background.png')
        this.load.spritesheet('background', 'Background.png', { frameWidth: 600, frameHeight: 400 })

        // Custom font
        this.load.json('dialog', 'dialog/dialog.json')
        this.load.bitmapFont('fight-font', 'fonts/fight.png', 'fonts/fight.xml')

        // Rumble McSkirmish
        this.load.spritesheet('rumble-left', 'RumbleSpritesheetLeft.png', { frameWidth: 200, frameHeight: 200 })
        this.load.spritesheet('rumble-right', 'RumbleSpritesheetRight.png', { frameWidth: 200, frameHeight: 200 })
        this.load.spritesheet('rumble_winning_spin', 'Rumble_Winning_Spin.png', { frameWidth: 101, frameHeight: 55 })
        this.load.spritesheet('rumble_cutscene_end', 'rumble_cutscene_end.png', { frameWidth: 133, frameHeight: 56 })
        this.load.spritesheet('rumble_cutscene_start', 'rumble_cutscene_start.png', { frameWidth: 133, frameHeight: 56 })
        this.load.spritesheet('rumble_catchphrase', 'rumble_catchphrase.png', { frameWidth: 125, frameHeight: 70 })
        this.load.spritesheet('rumble_catchphrase_end', 'rumble_catchphrase_end.png', { frameWidth: 125, frameHeight: 70 })

        // Dr. Karate
        this.load.spritesheet('karate-cutscene', 'dr_karate_cutscene.png', { frameWidth: 174, frameHeight: 66 })
        this.load.spritesheet('karate-left', 'KarateSpritesheetLeft.png', { frameWidth: 250, frameHeight: 152 })
        this.load.spritesheet('karate-right', 'KarateSpritesheetRight.png', { frameWidth: 250, frameHeight: 152 })
        this.load.spritesheet('dr-karate-win', 'dr_karate_win.png', { frameWidth: 136, frameHeight: 144 })
        this.load.spritesheet('dr-karate-win-end', 'dr_karate_win_end.png', { frameWidth: 136, frameHeight: 144 })

        // Audio
        this.load.audio('rumble-winner', 'RumbleWinner.wav')
        this.load.audio('cutscene-sfx', 'cutscene.wav')
        this.load.audio('fight-sfx', 'fight.wav')
        this.load.audio('karate-win-sfx', 'karate_win.wav')
        this.load.audio('menu-select-sfx', 'select_menu.wav')
        this.load.audio('select-sfx-1', 'select_1.wav')
        this.load.audio('select-sfx-2', 'select_2.wav')
        this.load.audio('locked-sfx', 'locked.wav')
        this.load.audio('play-sfx', 'play.wav')
        this.load.audio('ko-sfx', 'knockout.wav')
    }

    create() {
        // Environment animations
        this.anims.create({ key: 'joe-left', frames: this.anims.generateFrameNames('icons', { prefix: 'joe', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'joe-right', frames: this.anims.generateFrameNames('icons', { prefix: 'joe', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'buffalo-left', frames: this.anims.generateFrameNames('icons', { prefix: 'buffalo', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'buffalo-right', frames: this.anims.generateFrameNames('icons', { prefix: 'buffalo', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'admiral-left', frames: this.anims.generateFrameNames('icons', { prefix: 'admiral', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'admiral-right', frames: this.anims.generateFrameNames('icons', { prefix: 'admiral', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'karate-left', frames: this.anims.generateFrameNames('icons', { prefix: 'karate', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'karate-right', frames: this.anims.generateFrameNames('icons', { prefix: 'karate', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'rumble-left', frames: this.anims.generateFrameNames('icons', { prefix: 'rumble', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'rumble-right', frames: this.anims.generateFrameNames('icons', { prefix: 'rumble', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'chun-left', frames: this.anims.generateFrameNames('icons', { prefix: 'chun', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'chun-right', frames: this.anims.generateFrameNames('icons', { prefix: 'chun', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'czar-left', frames: this.anims.generateFrameNames('icons', { prefix: 'czar', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'czar-right', frames: this.anims.generateFrameNames('icons', { prefix: 'czar', start: 1, end: 1 }), repeat: -1 })
        this.anims.create({ key: 'beast-left', frames: this.anims.generateFrameNames('icons', { prefix: 'beast', start: 0, end: 0 }), repeat: -1 })
        this.anims.create({ key: 'beast-right', frames: this.anims.generateFrameNames('icons', { prefix: 'beast', start: 1, end: 1 }), repeat: -1 })

        this.anims.create({ key: 'locked', frameRate: 15, repeat: 3, hideOnComplete: true, frames: this.anims.generateFrameNumbers('lock', { start: 0, end: 1 }) })
        this.anims.create({ key: 'player1-select', frameRate: 2, repeat: -1, frames: this.anims.generateFrameNumbers('current-player', { start: 0, end: 1 }) })
        this.anims.create({ key: 'player2-select', frameRate: 2, repeat: -1, frames: this.anims.generateFrameNumbers('current-player', { start: 2, end: 3 }) })
        this.anims.create({ key: 'both-selected', frameRate: 1, repeat: -1, frames: this.anims.generateFrameNumbers('current-player', { start: 2, end: 2 }) })

        this.anims.create({ key: 'rumble-talk', frameRate: 12, repeat: 2, frames: this.anims.generateFrameNumbers('rumble_cutscene_start', { start: 0, end: 9 }) })
        this.anims.create({ key: 'rumble-pause', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('rumble_cutscene_start', { frames: [7, 8, 9] }) })
        this.anims.create({ key: 'rumble-scream', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('rumble_cutscene_end', { start: 0, end: 21 }) })
        this.anims.create({ key: 'karate-scream', frameRate: 10, repeat: 6, frames: this.anims.generateFrameNumbers('karate-cutscene', { start: 0, end: 1 }) })

        this.anims.create({ key: 'joe-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 0, end: 1 }) })
        this.anims.create({ key: 'rumble-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 2, end: 3 }) })
        this.anims.create({ key: 'buffalo-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 4, end: 5 }) })
        this.anims.create({ key: 'chun-li-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 6, end: 7 }) })
        this.anims.create({ key: 'admiral-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 8, end: 9 }) })
        this.anims.create({ key: 'czar-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 10, end: 11 }) })
        this.anims.create({ key: 'beast-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 12, end: 13 }) })
        this.anims.create({ key: 'karate-select', frameRate: 5, repeat: -1, frames: this.anims.generateFrameNumbers('character-select', { start: 14, end: 15 }) })

        this.anims.create({ key: 'fight-background', frameRate: 2.5, repeat: -1, frames: this.anims.generateFrameNumbers('background', { start: 0, end: 1 }) })

        // Rumble animations
        this.anims.create({ key: 'rumble-idle-left', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-left', { start: 0, end: 13 }) })
        this.anims.create({ key: 'rumble-idle-right', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-right', { start: 0, end: 13 }) })
        this.anims.create({ key: 'rumble-walk-left', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-left', { start: 14, end: 20 }) })
        this.anims.create({ key: 'rumble-walk-right', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-right', { start: 14, end: 20 }) })
        this.anims.create({ key: 'rumble-jump-left', frameRate: 8, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-left', { start: 21, end: 28 }) })
        this.anims.create({ key: 'rumble-jump-right', frameRate: 8, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-right', { start: 21, end: 28 }) })
        this.anims.create({ key: 'rumble-punch-left', frameRate: 10, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-left', { start: 29, end: 35 }) })
        this.anims.create({ key: 'rumble-punch-right', frameRate: 10, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-right', { start: 29, end: 35 }) })
        this.anims.create({ key: 'rumble-kick-left', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-left', { start: 36, end: 43 }) })
        this.anims.create({ key: 'rumble-kick-right', frameRate: 14, repeat: 0,frames: this.anims.generateFrameNumbers('rumble-right', { start: 36, end: 43 }) })
        this.anims.create({ key: 'rumble-death-left', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-left', { start: 54, end: 61 }) })
        this.anims.create({ key: 'rumble-dead-left', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-left', { start: 61, end: 61 }) })
        this.anims.create({ key: 'rumble-death-right', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('rumble-right', { start: 54, end: 61 }) })
        this.anims.create({ key: 'rumble-dead-right', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('rumble-right', { start: 61, end: 61 }) })

        this.anims.create({ key: 'rumble-spin', frameRate: 7, repeat: 1, frames: this.anims.generateFrameNumbers('rumble_winning_spin', { start: 0, end: 7 }) })
        this.anims.create({ key: 'rumble-speech', frameRate: 10, repeat: 0, frames: this.anims.generateFrameNumbers('rumble_catchphrase', { start: 0, end: 12 }) })
        this.anims.create({ key: 'rumble-speech-end', frameRate: 10, repeat: -1, frames: this.anims.generateFrameNumbers('rumble_catchphrase_end', { start: 0, end: 2 }) })

        // Dr. Karate animations
        this.anims.create({ key: 'karate-idle-left', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('karate-left', { start: 0, end: 5 }) })
        this.anims.create({ key: 'karate-idle-right', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('karate-right', { start: 0, end: 5 }) })
        this.anims.create({ key: 'karate-walk-left', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('karate-left', { start: 6, end: 11 }) })
        this.anims.create({ key: 'karate-walk-right', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('karate-right', { start: 6, end: 11 }) })
        this.anims.create({ key: 'karate-punch-left', frameRate: 18, repeat: 0, frames: this.anims.generateFrameNumbers('karate-left', { start: 12, end: 21 })})
        this.anims.create({ key: 'karate-punch-right', frameRate: 18, repeat: 0, frames: this.anims.generateFrameNumbers('karate-right', { start: 12, end: 21 })})
        this.anims.create({ key: 'karate-kick-left', frameRate: 16, repeat: 0, frames: this.anims.generateFrameNumbers('karate-left', { start: 22, end: 29 }) })
        this.anims.create({ key: 'karate-kick-right', frameRate: 16, repeat: 0, frames: this.anims.generateFrameNumbers('karate-right', { start: 22, end: 29 }) })

        this.anims.create({ key: 'karate-pose', frameRate: 12, repeat: 0, frames: this.anims.generateFrameNumbers('dr-karate-win', { start: 0, end: 5 }) })
        this.anims.create({ key: 'karate-pose-end', frameRate: 12, repeat: -1, frames: this.anims.generateFrameNumbers('dr-karate-win-end', { start: 0, end: 1 }) })

        // proceed once loading completes
        // this.scene.start('menuScene') //TODO
        this.scene.start('playScene')
    }
}