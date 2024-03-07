// Rumble McSkirmish prefab
class Rumble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, keys, health, speed) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this).setScale(3).setOrigin(0.5, 0)
        scene.physics.add.existing(this).setScale(3).setOrigin(0.5, 0)

        // set custom fighter properties
        this.keys = keys
        this.HP = health
        this.fighterVelocity = speed
        this.direction = direction

        this.MAX_VELOCITY = 500
        this.MAX_VELOCITY_X = 600
        this.MAX_VELOCITY_Y = 1200
        this.ACCELERATION = 250
        this.JUMP_VELOCITY = -1500
        this.DRAG = 350

        // sprite configs
        this.body.setSize(60, 110)
        this.body.setOffset(75, 90)
        this.body.setGravityY(2000)
        this.body.setCollideWorldBounds(true)
        this.body.setMaxVelocity(this.MAX_VELOCITY_X, this.MAX_VELOCITY_Y)
        this.body.setDragX(this.DRAG)
 
        // Fighter properties
        this.jumpHeight = -1000
        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500
        this.jumpTimer = 1000
        this.crouchTimer = 200
        this.hurtTimer = 250

        // Rumble frame data
        this.currentFrame = 0
        this.punchFrames = 7
        this.kickFrames = 8
        this.fireballFrames = 10
 
        // create health bar
        this.healthBarX = direction == 'left' ? 725 : 150
        this.healthBar = new HealthBar(scene, this.healthBarX, 115, 325, 50, health)

        // display name card
        this.nameCardX = direction == 'left' ? 855 : 148
        scene.add.sprite(this.nameCardX, 166, 'rumble-play-text').setOrigin(0).setScale(1.75)
 
        // initialize state machine managing fighter (initial state, possible states, state args[])
        this.fsm = new StateMachine('idle', {
            idle: new RumbleIdleState(),
            walk: new RumbleMoveState(),
            jump: new RumbleJumpState(),
            punch: new RumblePunchState(),
            kick: new RumbleKickState(),
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
        fighter.body.setVelocity(0)
        console.log(`idle: ${fighter.direction}`) //TODO
        fighter.anims.play(`rumble-idle-${fighter.direction}`)
    }
 
    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: none
 
        // create local copy keyboard object
        const { left, right, jump, punch, kick } = fighter.keys
 
        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(jump)) {
            this.stateMachine.transition('jump')
            return
        }
 
        // transition to punch
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('punch')
            return
        }
 
        // transition to kick
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            this.stateMachine.transition('kick')
            return
        }
 
        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('walk')
            return
        }
    }
}
 
 
class RumbleMoveState extends State {
    execute(scene, fighter) {
        // transitions: move, jump, punch, kick, fireball, hurt, death
        // handling: left/right movement
 
        // create local copy keyboard object
        const { left, right, jump, punch, kick } = fighter.keys
 
        // transition to jump
        if(Phaser.Input.Keyboard.JustDown(jump)) {
            this.stateMachine.transition('jump')
            return
        }
 
        // transition to punch
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('punch')
            return
        }
 
        // transition to kick
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            this.stateMachine.transition('kick')
            return
        }
 
        // transition to move if pressing a movement key
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
 
        // handle movement
        if(left.isDown) {
            fighter.body.setVelocityX(-fighter.MAX_VELOCITY_X)
            fighter.direction = 'left'
            console.log(`walk: ${fighter.direction}`) //TODO
        } else if(right.isDown) {
            fighter.body.setVelocityX(fighter.MAX_VELOCITY_X)
            fighter.direction = 'right'
            console.log(`walk: ${fighter.direction}`) //TODO
        }

        fighter.anims.play(`rumble-walk-${fighter.direction}`, true)
    }
}
 
class RumbleJumpState extends State {
    enter(scene, fighter) {
        // update fighter position and play proper animation
        fighter.body.setVelocityY(fighter.jumpHeight)
        fighter.anims.play(`rumble-jump-${fighter.direction}`)
    }
 
    execute(scene, fighter) {
        // transitions: idle, move, punch, kick, fireball, hurt, death
        // handling: vertical jump

        // create local copy keyboard object
        const { left, right, punch, kick } = fighter.keys

        // check if fighter is grounded
        if (fighter.body.touching.down || fighter.body.blocked.down) {
            this.stateMachine.transition('idle')
        }

        // handle movement
        if(left.isDown) {
            fighter.body.setVelocityX(-fighter.MAX_VELOCITY_X)
        } else if(right.isDown) {
            fighter.body.setVelocityX(fighter.MAX_VELOCITY_X)
        }
 
        // transition to punch
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('punch')
            return
        }
 
        // transition to kick
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            this.stateMachine.transition('kick')
            return
        }
    }
}
 
class RumblePunchState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: punch attack
        
        fighter.body.setVelocityX(0)
        //fighter.anims.play(`rumble-punch-${fighter.direction}`)

        fighter.currentFrame = 0;

        /*scene.time.delayedCall(fighter.punchCooldown, () => {
            this.stateMachine.transition('idle')
        })*/
    }

    execute(scene, fighter) {
        fighter.setFrame(30 + fighter.currentFrame);
        console.log(`Frame: ${fighter.currentFrame}`) // TODO

        if (fighter.currentFrame == 1) {
            // TODO Punch 1 hit (10 damage)
        }

        if (fighter.currentFrame == 3) {
            // TODO Cancellable into kick or fireball
        }

        if (fighter.currentFrame == 4) {
            // TODO Punch 2 hit (15 damage)
        }

        if (fighter.currentFrame == fighter.punchFrames) {
            this.stateMachine.transition('idle');
        }

        fighter.currentFrame++ //= fighter.currentFrame + 1
    }
}
 
class RumbleKickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack
 
        fighter.body.setVelocity(0)
        fighter.anims.play(`rumble-kick-${fighter.direction}`)
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }
        scene.time.delayedCall(fighter.kickCooldown, () => {
            this.stateMachine.transition('idle')
        })
    }
}
 
class RumbleDeathState extends State {
    enter(scene, fighter) {
        fighter.body.setVelocity(0)
        fighter.anims.play(`die-${fighter.direction}`)
        fighter.anims.stop()
    }
} 