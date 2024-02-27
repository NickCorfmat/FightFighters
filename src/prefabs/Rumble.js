// Rumble McSkirmish prefab
class Rumble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5))
        scene.physics.add.existing(this.setOrigin(0.5))

        this.body.setGravityY(2000)
        this.body.setCollideWorldBounds(true)

        // set custom fighter properties
        this.direction = direction >= 0 ? 'right' : 'left'
        this.HP = health
        this.fighterVelocity = speed

        this.jumpHeight = -1000

        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500

        this.jumpTimer = 1000
        this.crouchTimer = 200
        this.hurtTimer = 250

        this.healthBar = new HealthBar(scene, 150, 115, 325, 50, health)

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.rumbleFSM = new StateMachine('idle', {
            idle: new RumbleIdleState(),
            move: new RumbleMoveState(),
            crouch: new RumbleCrouchState(),
            jump: new RumbleJumpState(),
            punch: new RumblePunchState(),
            kick: new RumbleKickState(),
            fireball: new RumbleSpecialState(),
            hurt: new RumbleHurtState(),
            death: new RumbleDeathState()
        }, [scene, this])
    }

    decreaseHP(amount) {
        this.healthBar.decrease(amount)
        this.HP -= amount
    }
}

class RumbleIdleState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`sticky-idle-${fighter.direction}`)
        fighter.anims.stop()
    }

    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: none

        //console.log(this.y)

        const WKey = scene.keys.keyW
        const AKey = scene.keys.keyA
        const SKey = scene.keys.keyS
        const DKey = scene.keys.keyD

        const CKey = scene.keys.keyC
        const VKey = scene.keys.keyV
        const BKey = scene.keys.keyB

        // transition to crouch if pressing S key
        if(Phaser.Input.Keyboard.JustDown(SKey)) {
            this.stateMachine.transition('crouch')
            return
        }

        // transition to jump if pressing W key
        if(Phaser.Input.Keyboard.JustDown(WKey)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to punch if pressing C key
        if(Phaser.Input.Keyboard.JustDown(CKey)) {
            this.stateMachine.transition('punch')
            return
        }

        // transition to kick if pressing V key
        if(Phaser.Input.Keyboard.JustDown(VKey)) {
            this.stateMachine.transition('kick')
            return
        }

        // transition to fireball if pressing B key
        if(Phaser.Input.Keyboard.JustDown(BKey)) {
            this.stateMachine.transition('fireball')
            return
        }

        // transition to move if pressing a movement key
        if(AKey.isDown || DKey.isDown) {
            this.stateMachine.transition('move')
            return
        }

        fighter.healthBar.decrease(5)
    }
}

class RumbleMoveState extends State {
    enter() {

    }
    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: left/right movement

        const WKey = scene.keys.keyW
        const AKey = scene.keys.keyA
        const SKey = scene.keys.keyS
        const DKey = scene.keys.keyD

        const CKey = scene.keys.keyC
        const VKey = scene.keys.keyV
        const BKey = scene.keys.keyB

        // transition to jump if pressing W key
        if(Phaser.Input.Keyboard.JustDown(WKey)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to punch if pressing C key
        if(Phaser.Input.Keyboard.JustDown(CKey)) {
            this.stateMachine.transition('punch')
            return
        }

        // transition to kick if pressing V key
        if(Phaser.Input.Keyboard.JustDown(VKey)) {
            this.stateMachine.transition('kick')
            return
        }

        // transition to fireball if pressing B key
        if(Phaser.Input.Keyboard.JustDown(BKey)) {
            this.stateMachine.transition('fireball')
            return
        }

        // transition to move if pressing a movement key
        if(!(AKey.isDown || DKey.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirectionX
        if(AKey.isDown) {
            moveDirectionX = -1
        } else if(DKey.isDown) {
            moveDirectionX = 1
        }
        
        // update fighter position and play proper animation
        fighter.setVelocityX(fighter.fighterVelocity * moveDirectionX)
        fighter.anims.play(`sticky-walk-${fighter.direction}`, true)
    }
}

class RumbleCrouchState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`sticky-crouch-${fighter.direction}`)
        scene.time.delayedCall(fighter.crouchTimer, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleJumpState extends State {
    enter(scene, fighter) {
        // update fighter position and play proper animation
        fighter.setVelocityY(fighter.jumpHeight)
        fighter.anims.play(`sticky-jump-${fighter.direction}`, true)
        fighter.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, fighter) {
        // transitions: idle, move, punch, kick, fireball, hurt, death
        // handling: vertical jump

        const WKey = scene.keys.keyW
        const AKey = scene.keys.keyA
        const SKey = scene.keys.keyS
        const DKey = scene.keys.keyD

        const CKey = scene.keys.keyC
        const VKey = scene.keys.keyV
        const BKey = scene.keys.keyB

        // transition to move if pressing a movement key
        if(AKey.isDown || DKey.isDown) {
            this.stateMachine.transition('move')
            return
        }

        // transition to punch if pressing C key
        if(Phaser.Input.Keyboard.JustDown(CKey)) {
            this.stateMachine.transition('punch')
            return
        }

        // transition to kick if pressing V key
        if(Phaser.Input.Keyboard.JustDown(VKey)) {
            this.stateMachine.transition('kick')
            return
        }

        // transition to fireball if pressing B key
        if(Phaser.Input.Keyboard.JustDown(BKey)) {
            this.stateMachine.transition('fireball')
            return
        }
    }
}

class RumblePunchState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: punch attack

        fighter.setVelocity(0)
        fighter.anims.play(`sticky-punch-${fighter.direction}`)
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.punchCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleKickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack

        fighter.setVelocity(0)
        fighter.anims.play(`sticky-kick-${fighter.direction}`)
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.kickCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleSpecialState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: special fireball attack

        fighter.setVelocity(0)
        fighter.anims.play(`sticky-special-${fighter.direction}`)
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.specialCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleHurtState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`walk-${fighter.direction}`)
        fighter.anims.stop()
        fighter.setTint(0xFF0000)     // turn red
        // create knockback by sending body in direction opposite facing direction
        switch(fighter.direction) {
            case 'left':
                fighter.setVelocityX(fighter.fighterVelocity/2)
                break
            case 'right':
                fighter.setVelocityX(-fighter.fighterVelocity/2)
                break
        }

        // set recovery timer
        scene.time.delayedCall(fighter.hurtCooldown, () => {
            fighter.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleDeathState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`die-${fighter.direction}`)
        fighter.anims.stop()
    }
}