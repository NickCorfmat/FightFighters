// Dr. Karate prefab
class DrKarate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.drKarateFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            punch: new PunchState(),
            kick: new KickState(),
            special: new SpecialState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

class IdleState extends State {

}

class MoveState extends State {

}

class PunchState extends State {

}

class KickState extends State {
    
}

class SpecialState extends State {

}