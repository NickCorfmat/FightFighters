
"use strict"

// define and configure game object
let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Instructions, Credits, Play ]
}

// define game
let game = new Phaser.Game(config)

// reserve keyboard bindings
let keySPACE
let keyLEFT
let keyRIGHT
let keyUP
let keyDOWN

// define globals
let { height, width } = game.config
let distance
let highscore