// Dr. Karate McSkirmish prefab
class DrKarate extends Fighter {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame, direction, health, speed)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.add.sprite(x, y, 'Rumble').setOrigin(0, 1).setScale(0.9)

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.karateFSM = new StateMachine('idle', {
            idle: new IdleState(),
            walk: new MoveState(),
            jump: new JumpState(),
            punch: new PunchState(),
            kick: new KickState(),
            drill: new SpecialState(),
            hurt: new HurtState(),
            death: new DeathState()
        }, [scene, this])
    }

}