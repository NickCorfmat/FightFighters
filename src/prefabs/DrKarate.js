// Dr. Karate McSkirmish prefab
class DrKarate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, keys, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5))
        scene.physics.add.existing(this.setOrigin(0.5))
<<<<<<< HEAD
        
=======
       
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // sprite configs
        this.body.setOffset(200, 100)
        this.body.setSize(200, 350)
        this.body.setGravityY(2000)
        this.body.setCollideWorldBounds(true)
 
 
        // set custom fighter properties
        this.keys = keys
        this.HP = health
        this.fighterVelocity = speed
<<<<<<< HEAD
        this.direction = direction

=======
        this.direction = direction >= 0 ? 'right' : 'left'
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        this.jumpHeight = -1000
        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500
        this.jumpTimer = 500
        this.crouchTimer = 200
        this.hurtTimer = 250
<<<<<<< HEAD

        this.healthBarX = direction == 'left' ? 725 : 150
        this.nameCardX = direction == 'left' ? 785 : 148

        scene.add.sprite(this.nameCardX, 165, 'karate-play-text').setOrigin(0).setScale(1.75)

        // set up health bar
        this.healthBar = new HealthBar(scene, this.healthBarX, 115, 325, 50, health)

=======
 
 
        // set up health bar
        this.healthBar = new HealthBar(scene, 725, 115, 325, 50, health)
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // initialize state machine managing fighter (initial state, possible states, state args[])
        this.fsm = new StateMachine('idle', {
            idle: new KarateIdleState(),
            walk: new KarateMoveState(),
            jump: new KarateJumpState(),
            punch: new KaratePunchState(),
            kick: new KarateKickState(),
            drill: new KarateSpecialState(),
            hurt: new KarateHurtState(),
            death: new KarateDeathState()
        }, [scene, this])
    }
 }
 
 
class KarateIdleState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play('karate-idle')
    }
 
 
    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: none
<<<<<<< HEAD

        const { left, right, jump, punch, kick } = fighter.keys

=======
 
 
        const { left, right, jump, punch, kick } = fighter.keys
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(jump)) {
            this.stateMachine.transition('jump')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to punch
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('punch')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to kick
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            this.stateMachine.transition('kick')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
 }
 
 
class KarateMoveState extends State {
    execute(scene, fighter) {
        // transitions: idle, jump, punch, kick, fireball, hurt, death
        // handling: move left, right
<<<<<<< HEAD

        const { left, right, jump, punch, kick } = fighter.keys

=======
 
 
        const { left, right, jump, punch, kick } = fighter.keys
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(jump)) {
            this.stateMachine.transition('jump')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to punch
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('punch')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to kick
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            this.stateMachine.transition('kick')
            return
        }
<<<<<<< HEAD

=======
 
 
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        // transition to move if pressing a movement key
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
 
 
        // handle movement
        let moveDirectionX
        if(left.isDown) {
            moveDirectionX = -1
            fighter.direction = 'left'
        } else if(right.isDown) {
            moveDirectionX = 1
            fighter.direction = 'right'
        }
       
        // update fighter position and play proper animation
        fighter.setVelocityX(fighter.fighterVelocity * moveDirectionX)
        fighter.anims.play('karate-walk', true)
    }
 }
 
 
class KarateJumpState extends State {
    enter(scene, fighter) {
        fighter.setVelocityY(fighter.jumpHeight)
        fighter.anims.play('karate-walk')
        scene.time.delayedCall(fighter.jumpTimer, () => {
            this.stateMachine.transition('idle')
        })
    }
 }
 
 
class KaratePunchState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack
 
 
        fighter.setVelocity(0)
        fighter.anims.play('karate-punch')
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }
<<<<<<< HEAD

=======
 
 
        // set a short cooldown delay before going back to idle
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        fighter.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}
 
 
class KarateKickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack
 
 
        fighter.setVelocity(0)
        fighter.anims.play('karate-kick')
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }
<<<<<<< HEAD

=======
 
 
        // set a short cooldown delay before going back to idle
>>>>>>> 94eacc5c77489abb101f797bcc2833194c84617e
        fighter.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}
 
 
class KarateSpecialState extends State {
    enter(scene, fighter) {
 
 
    }
}
 
 
class KarateHurtState extends State {
    enter(scene, fighter) {
 
 
    }
}
 
 
class KarateDeathState extends State {
    enter(scene, fighter) {
 
 
    }
} 