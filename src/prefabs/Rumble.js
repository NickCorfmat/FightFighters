// Rumble McSkirmish prefab
class Rumble extends Fighter {
    constructor(scene, x, y, texture, frame, direction, health, speed) {
        super(scene, x, y, texture, frame, direction, health, speed)

        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500
        this.hurtCooldown = 250
        
        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.rumbleFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            punch: new PunchState(),
            kick: new KickState(),
            fireball: new SpecialState(),
            hurt: new HurtState(),
            death: new DeathState()
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
    }

    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: none

        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const DKey = scene.keys.DKey

        const CKey = scene.keys.CKey
        const VKey = scene.keys.VKey
        const BKey = scene.keys.BKey

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

class MoveState extends State {
    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: left/right movement

        const WKey = scene.keys.WKey
        const AKey = scene.keys.AKey
        const DKey = scene.keys.DKey

        const CKey = scene.keys.CKey
        const VKey = scene.keys.VKey
        const BKey = scene.keys.BKey

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
        fighter.anims.play(`walk-${fighter.direction}`, true)
    }
}

class JumpState extends State {
    enter(scene, fighter) {
        // transitions: idle, move, punch, kick, fireball, hurt, death
        // handling: vertical jump

        const AKey = scene.keys.AKey
        const DKey = scene.keys.DKey

        const CKey = scene.keys.CKey
        const VKey = scene.keys.VKey
        const BKey = scene.keys.BKey

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

        // update fighter position and play proper animation
        fighter.setVelocityY(500)
        fighter.anims.play('jump', true)
    }
}

class PunchState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: punch attack

        fighter.setVelocity(0)
        fighter.anims.play(`punch-${fighter.direction}`)
        switch(fighter.direction) {
            case 'left':
                break
            case 'right':
                break
        }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.punchCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class KickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack

        fighter.setVelocity(0)
        fighter.anims.play(`kick-${fighter.direction}`)
        switch(fighter.direction) {
            case 'left':
                break
            case 'right':
                break
        }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.kickCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class SpecialState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: special fireball attack

        fighter.setVelocity(0)
        fighter.anims.play(`fireball-${fighter.direction}`)
        switch(fighter.direction) {
            case 'left':
                break
            case 'right':
                break
        }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(fighter.specialCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}

class HurtState extends State {
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

class DeathState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`die-${fighter.direction}`)
        fighter.anims.stop()
    }
}