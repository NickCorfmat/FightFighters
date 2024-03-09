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
    scene: [ Load, Tutorial, Credits, Menu, Cutscene, Select, Play, RumbleWinner, KarateWinner ]
}

// define game\
let game = new Phaser.Game(config)

// define globals
let { height, width } = game.config