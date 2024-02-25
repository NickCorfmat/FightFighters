// Rumble McSkirmish prefab
class Rumble extends Fighter {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame, direction, health, speed)

        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500

        this.jumpTimer = 600
        this.crouchTimer = 100
        this.hurtTimer = 250

        console.log('rumble created')
        
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
}

class RumbleIdleState extends IdleState {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play('sticky-idle')
        fighter.anims.stop()
    }

    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: none

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
    }
}

class RumbleMoveState extends MoveState {
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
            fighter.direction = 'left'
        } else if(DKey.isDown) {
            moveDirectionX = 1
            fighter.direction = 'right'
        }
        
        // update fighter position and play proper animation
        fighter.setVelocityX(fighter.fighterVelocity * moveDirectionX)
        fighter.anims.play('sticky-walk', true)
    }
}

class RumbleCrouchState extends CrouchState {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play('sticky-crouch')
        scene.time.delayedCall(fighter.crouchTimer, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class RumbleJumpState extends JumpState {
    enter(scene, fighter) {
        // update fighter position and play proper animation
        fighter.setVelocityY(-800)
        fighter.anims.play('sticky-jump', true)

        scene.time.delayedCall(fighter.jumpTimer, () => {
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

class RumblePunchState extends PunchState {
    enter(scene, fighter) {
        // transitions: idle
        // handling: punch attack

        fighter.setVelocity(0)
        fighter.anims.play('sticky-punch')
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

class RumbleKickState extends KickState {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack

        fighter.setVelocity(0)
        fighter.anims.play('sticky-kick')
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

class RumbleSpecialState extends SpecialState {
    enter(scene, fighter) {
        // transitions: idle
        // handling: special fireball attack

        fighter.setVelocity(0)
        fighter.anims.play('sticky-special')
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

class RumbleHurtState extends HurtState {
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

class RumbleDeathState extends DeathState {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`die-${fighter.direction}`)
        fighter.anims.stop()
    }
}