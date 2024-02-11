
"use strict"

// define and configure game object
let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    render: {
        pixelArt: true
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Menu, Instructions, Credits, Play ]
}

// define game
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keySPACE
let keyRESET
let keyI
let keyC
let keyM

// define globals
let { height, width } = game.config
let highscore = 0
let distance