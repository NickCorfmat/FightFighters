// Fighter prefab
class Fighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.body.setGravityY(2500)
        this.body.setCollideWorldBounds(true)

        // set custom fighter properties
        this.direction = direction >= 0 ? 'right' : 'left'
        this.health = health
        this.fighterVelocity = speed

    }
}

class IdleState extends State { }

class MoveState extends State { }

class CrouchState extends State { }

class JumpState extends State { }

class PunchState extends State { }

class KickState extends State { }

class SpecialState extends State { }

class HurtState extends State { }

class DeathState extends State { }