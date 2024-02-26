// Dr. Karate McSkirmish prefab
class DrKarate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        
        this.body.setOffset(200, 100)
        this.body.setGravityY(2000)
        this.body.setCollideWorldBounds(true)

        // set custom fighter properties
        this.direction = direction >= 0 ? 'right' : 'left'
        this.HP = health
        this.fighterVelocity = speed

        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500

        this.jumpTimer = 500
        this.crouchTimer = 200
        this.hurtTimer = 250

        this.healthBar = new HealthBar(scene, 720, 110)

        console.log('dr. karate created')

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.karateFSM = new StateMachine('idle', {
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

        const { left, right, up, down, space, shift } = scene.keys

        // transition to crouch if pressing S key
        // if(Phaser.Input.Keyboard.JustDown(SKey)) {
        //     this.stateMachine.transition('crouch')
        //     return
        // }

        // transition to jump if pressing W key
        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to punch if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('punch')
            return
        }

        // transition to kick if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('kick')
            return
        }

        // // transition to fireball if pressing B key
        // if(Phaser.Input.Keyboard.JustDown(BKey)) {
        //     this.stateMachine.transition('fireball')
        //     return
        // }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
}

class KarateMoveState extends State {
    execute(scene, fighter) {
        const { left, right, up, down, space, shift } = scene.keys

        // transitions: idle, jump, punch, kick, fireball, hurt, death
        // handling: move left, right

        // transition to jump if pressing W key
        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to punch if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('punch')
            return
        }

        // transition to kick if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('kick')
            return
        }

        // // transition to fireball if pressing B key
        // if(Phaser.Input.Keyboard.JustDown(BKey)) {
        //     this.stateMachine.transition('fireball')
        //     return
        //}

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
        fighter.setVelocityY(-800)
        fighter.anims.play('karate-walk')
        // fighter.once('animationcomplete', () => {
        //     this.stateMachine.transition('idle')
        // })
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

        // set a short cooldown delay before going back to idle
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

        // set a short cooldown delay before going back to idle
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