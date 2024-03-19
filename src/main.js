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

Sources:
1. Main menu music by Panda Beats, https://www.youtube.com/watch?v=pAZLAYVoCcY&list=LL&index=14
2. All other music by Brad Breeck, https://www.youtube.com/watch?v=hQSAoOKF71E&list=LL&index=25
3. Character spritesheets/typeface/character select screen by Paul Robertson, https://probertson.tumblr.com/post/31637353328/gravity-falls-animations
    Note: Menu/play background, cutscene animations, and Rumble's winning animation recreated from original Paul Robertson artwork
4. SFX/dialogue from original Gravity Falls episode, a license of The Walt Disney Company
5. 'Iambic Heavy Italic' font by OPTIFONT, https://fontmeme.com/fonts/iambic-heavy-italic-font/
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