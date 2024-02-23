// Fighter prefab
class Fighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(300, 500)
        this.body.setCollideWorldBounds(true)

        // set custom fighter properties
        this.direction = direction
        this.health = health
        this.fighterVelocity = speed

    }
}

class IdleState extends State {
    enter(scene, fighter) {

    }

    execute(scene, fighter) {
        const { left, right, up, down } = scene.keys

        // transitions: move, jump, punch, kick, fireball, hurt, death
    }
}

class MoveState extends State {
    execute(scene, fighter) {
        const { left, right, up, down } = scene.keys

        // transitions: idle, jump, punch, kick, fireball, hurt, death
        // handling: move left, right
    }
}

class JumpState extends State {
    enter(scene, fighter) {
        // transitions: idle, move, punch, kick, fireball, hurt, death
        // handling: move left, right
    }
}

class PunchState extends State {
    enter(scene, fighter) {

    }
}

class KickState extends State {
    enter(scene, fighter) {

    }
}

class SpecialState extends State {
    enter(scene, fighter) {

    }
}

class HurtState extends State {
    enter(scene, fighter) {

    }
}

class DeathState extends State {
    enter(scene, fighter) {

    }
}