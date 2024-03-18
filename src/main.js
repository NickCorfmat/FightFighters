/*
Group Members: Nick Corfmat and Rayan Hirech
Adapted Game: "Fight Fighters" from Gravity Falls, Season 1, Episode 10 (2012)

Phaser components utilized:
    1. physics
    2. animations
    3. tweens
    4. timers
    5. cameras (for scene transitions)
    6. bitmap text
*/

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

// define game
let game = new Phaser.Game(config)

// define globals
let musicOn, backgroundMusic
let { height, width } = game.config