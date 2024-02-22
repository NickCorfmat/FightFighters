// Dr. Karate prefab
class DrKarate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, health) {
        super(scene, x, y, texture, frame, direction, health)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(300, 500)
        this.body.setCollideWorldBounds(true)

        // set custom fighter properties
        this.direction = direction
        this.health = health
        this.fighterVelocity = 50

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.drKarateFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new MoveState(),
            jump: new JumpState(),
            punch: new PunchState(),
            kick: new KickState(),
            special: new SpecialState(),
            hurt: new HurtState(),
            death: new DeathState()
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, fighter) {

    }

    execute(scene, fighter) {
        const { left, right, up, down } = scene.keys

        // transitions: move, jump, punch, kick, special, hurt, death
    }
}

class MoveState extends State {
    execute(scene, fighter) {
        const { left, right, up, down } = scene.keys

        // transitions: idle, jump, punch, kick, special, hurt, death
        // handling: move left, right
    }
}

class JumpState extends State {
    enter(scene, fighter) {
        // transitions: idle, move, punch, kick, special, hurt, death
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