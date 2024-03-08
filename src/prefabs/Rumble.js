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
        this.attackStartTime = 0
        this.fps = 12
        this.punchFrames = 7
        this.kickFrames = 8
        this.fireballFrames = 10

        // Attack buffer
        this.buffer = 'empty'
 
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
        //fighter.anims.play(`rumble-punch-${fighter.direction}`) //TODO

        fighter.currentFrame = 0;
        fighter.attackStartTime = Date.now()

        /*scene.time.delayedCall(fighter.punchCooldown, () => { //TODO
            this.stateMachine.transition('idle')
        })*/
    }

    execute(scene, fighter) {
        const { punch, kick, special } = fighter.keys

        if (fighter.currentFrame == 0) {
            fighter.buffer = 'empty'
        }else if (fighter.currentFrame < fighter.punchFrames) {
            // TODO buffer moves
            if(Phaser.Input.Keyboard.JustDown(punch)) {
                fighter.buffer = 'punch'
            }
            if(Phaser.Input.Keyboard.JustDown(kick)) {
                fighter.buffer = 'kick'
            }
            if(Phaser.Input.Keyboard.JustDown(special)) {
                fighter.buffer = 'special'
            }
        }

        if (fighter.currentFrame == 1) {
            // TODO Punch 1 hit (10 damage)
        }

        if (fighter.currentFrame == 3) {
            // Cancellable into kick or fireball
            if (fighter.buffer === 'kick') {
                fighter.buffer = 'empty'
                this.stateMachine.transition('kick');
                return
            } else if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                console.log('fireballing rn') //TODO
                this.stateMachine.transition('idle');
                return
            }
        }

        if (fighter.currentFrame == 4) {
            // TODO Punch 2 hit (15 damage)
        }

        if (fighter.currentFrame > 4 && fighter.currentFrame < fighter.punchFrames) {
            // Cancellable into fireball
            if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                console.log('fireballing rn') //TODO
                this.stateMachine.transition('idle');
                return
            }
        }

        if (fighter.currentFrame == fighter.punchFrames) {
            if (fighter.buffer === 'kick') {
                this.stateMachine.transition('kick');
            } else if (fighter.buffer === 'special') {
                console.log('fireballing rn') //TODO
                this.stateMachine.transition('idle');
            } else if (fighter.buffer === 'punch') {
                this.stateMachine.transition('punch');
            } else {
                this.stateMachine.transition('idle');
            }
            fighter.buffer = 'empty'
            return
        }

        fighter.setFrame(28 + fighter.currentFrame);
        fighter.currentFrame = Math.floor((Date.now() - fighter.attackStartTime) * fighter.fps / 1000)
    }
}
 
class RumbleKickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack
 
        fighter.body.setVelocity(0)
        // fighter.anims.play(`rumble-kick-${fighter.direction}`) //TODO
        // switch(fighter.direction) {
        //     case 'left':
        //         break
        //     case 'right':
        //         break
        // }
        // scene.time.delayedCall(fighter.kickCooldown, () => { //TODO
        //     this.stateMachine.transition('idle')
        // })

        fighter.currentFrame = 0;
        fighter.attackStartTime = Date.now()
    }

    execute(scene, fighter) {
        const { special } = fighter.keys

        if (fighter.currentFrame == 0) {
            fighter.buffer = 'empty'
        }else if (fighter.currentFrame < fighter.kickFrames) {
            // TODO buffer moves
            if(Phaser.Input.Keyboard.JustDown(special)) {
                fighter.buffer = 'special'
            }
        }

        if (fighter.currentFrame == 3) {
            // TODO Kick 1 hit (15 damage)
        }

        if (fighter.currentFrame == 4) { //TODO try 5?
            // Cancellable into fireball
            if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                console.log('fireballing rn') //TODO
                this.stateMachine.transition('idle');
                return
            }
        }

        if (fighter.currentFrame == 7) {
            // TODO Kick 2 hit (20 damage)
        }

        if (fighter.currentFrame == fighter.kickFrames) {
            this.stateMachine.transition('idle');
            return
        }

        fighter.setFrame(35 + fighter.currentFrame);
        fighter.currentFrame = Math.floor((Date.now() - fighter.attackStartTime) * fighter.fps / 1000)
    }
}
 
class RumbleDeathState extends State {
    enter(scene, fighter) {
        fighter.body.setVelocity(0)
        fighter.anims.play(`die-${fighter.direction}`)
        fighter.anims.stop()
    }
} 