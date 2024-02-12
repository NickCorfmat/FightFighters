/*
Name: Nick Corfmat
Endless Runner Title: Rogue Eagle
Project duration: 35 hours

Creative tilt:

Technical:
My game utilizes 1D Perlin noise to procedurally generate random terrain. This
was accomplished using the p5.js library's 'map()' and 'noise()' functions to
create what's known as "controlled randomness," a method that produces the
wave-like terrain observed in game. This also ensures that each run is
different from the last.

Visual style:
For visual style, I placed an emphasis on dynamic visuals to give my game
more 'life.' For example, when the player crashes, this triggers a
particle explosion in which the flames move in a random direction every time,
hence, simulating wind. In addition, the plane on the Menu screen uses
physics logic to produce pseudo-random motion, effectively simulating flight.
Even the train in the credits page contribute to making the game
feel more 'alive.'

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
    scene: [ Load, Menu, Instructions, Credits, Play ]
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
let backgroundMusic
let enterSFX
let exitSFX
let musicOn
let highscore = 0
let distance