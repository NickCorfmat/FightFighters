// Rumble McSkirmish prefab
class Rumble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, keys, health, speed, opponent) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this).setScale(3).setOrigin(0.5, 0)
        scene.physics.add.existing(this).setScale(3).setOrigin(0.5, 0)

        // set custom fighter properties
        this.keys = keys
        this.HP = health
        this.fighterVelocity = speed
        this.direction = direction
        this.opponent = opponent

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

        // Hitboxes
        this.punch1HB = new Hitbox(scene, this.x + (this.direction === 'left' ? -225 : 80), this.y + 340, 'punch1HB', 0, 180, 60)
        this.punch2HB = new Hitbox(scene, this.x + (this.direction === 'left' ? -250 : 80), this.y + 365, 'punch2HB', 0, 200, 60)
        this.kick1HB = new Hitbox(scene, this.x + (this.direction === 'left' ? -200 : 80), this.y + 375, 'kick1HB', 0, 150, 60)
        this.kick2HB = new Hitbox(scene, this.x + (this.direction === 'left' ? -225 : 80), this.y + 400, 'kick2HB', 0, 175, 60)

        // Rumble frame data
        this.currentFrame = 0
        this.attackStartTime = 0
        this.fps = 12
        this.punchFrames = 7
        this.punchEndlag = 3
        this.kickFrames = 8
        this.kickEndlag = 5
        this.fireballFrames = 10
        this.justHit = false

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
        } else if(right.isDown) {
            fighter.body.setVelocityX(fighter.MAX_VELOCITY_X)
            fighter.direction = 'right'
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
        fighter.justHit = false

        fighter.anims.play(`rumble-idle-${fighter.direction}`) // Ensures Rumble is facing the correct direction

        /*scene.time.delayedCall(fighter.punchCooldown, () => { //TODO
            this.stateMachine.transition('idle')
        })*/
    }

    execute(scene, fighter) {
        const { punch, kick, special } = fighter.keys

        if (fighter.currentFrame < fighter.punchFrames) {
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
            // TODO Punch 1 hit (5 damage)
            if (!fighter.justHit) {
                fighter.punch1HB.setPosition(fighter.x + (fighter.direction === 'left' ? -225 : 80), fighter.y + 340)
                scene.physics.add.collider(scene[`player${fighter.opponent}`], fighter.punch1HB, () => {
                    if (!fighter.justHit) {
                        scene[`player${fighter.opponent}`].HP -= 5
                        scene[`player${fighter.opponent}`].healthBar.decrease(5)
                        console.log('hit 1')
                        fighter.justHit = true
                    }
                    fighter.punch1HB.disableHit()
                }, null, scene)
            }
        }

        if (fighter.currentFrame == 2) {
            fighter.justHit = false
            fighter.punch1HB.disableHit()
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
            // TODO Punch 2 hit (10 damage)
            if (!fighter.justHit) {
                fighter.punch2HB.setPosition(fighter.x + (fighter.direction === 'left' ? -250 : 80), fighter.y + 365)
                scene.physics.add.collider(scene[`player${fighter.opponent}`], fighter.punch2HB, () => {
                    if (!fighter.justHit) {
                        scene[`player${fighter.opponent}`].HP -= 10
                        scene[`player${fighter.opponent}`].healthBar.decrease(10)
                        console.log('hit 2')
                        fighter.justHit = true
                    }
                    fighter.punch2HB.disableHit()
                }, null, scene)
            }
        }

        if (fighter.currentFrame == 5) {
            fighter.justHit = false
            fighter.punch2HB.disableHit()
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

        if (fighter.currentFrame >= fighter.punchFrames && fighter.currentFrame < fighter.punchFrames + fighter.punchEndlag) {
            fighter.setFrame(fighter.currentFrame);
        } else {
            fighter.setFrame(28 + fighter.currentFrame);
        }

        if (fighter.currentFrame == fighter.punchFrames + fighter.punchEndlag) {
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
        fighter.justHit = false

        fighter.anims.play(`rumble-idle-${fighter.direction}`) // Ensures Rumble is facing the correct direction
    }

    execute(scene, fighter) {
        const { punch, kick, special } = fighter.keys

        if (fighter.currentFrame < fighter.punchFrames) {
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

        if (fighter.currentFrame == 3) {
            // TODO Kick 1 hit (15 damage)
            if (!fighter.justHit) {
                fighter.kick1HB.setPosition(fighter.x + (fighter.direction === 'left' ? -200 : 80), fighter.y + 375)
                scene.physics.add.collider(scene[`player${fighter.opponent}`], fighter.kick1HB, () => {
                    if (!fighter.justHit) {
                        scene[`player${fighter.opponent}`].HP -= 15
                        scene[`player${fighter.opponent}`].healthBar.decrease(15)
                        console.log('hit 1')
                        fighter.justHit = true
                    }
                    fighter.kick1HB.disableHit()
                }, null, scene)
            }
        }

        if (fighter.currentFrame == 4) {
            fighter.justHit = false
            fighter.kick1HB.disableHit()
        }

        if (fighter.currentFrame == 4) { // TODO try 5
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
            if (!fighter.justHit) {
                fighter.kick2HB.setPosition(fighter.x + (fighter.direction === 'left' ? -225 : 80), fighter.y + 400)
                scene.physics.add.collider(scene[`player${fighter.opponent}`], fighter.kick2HB, () => {
                    if (!fighter.justHit) {
                        scene[`player${fighter.opponent}`].HP -= 20
                        scene[`player${fighter.opponent}`].healthBar.decrease(20)
                        console.log('hit 2')
                        fighter.justHit = true
                    }
                    fighter.kick2HB.disableHit()
                }, null, scene)
            }
        }

        if (fighter.currentFrame == 8) {
            fighter.justHit = false
            fighter.kick2HB.disableHit()
        }

        if (fighter.currentFrame >= fighter.kickFrames && fighter.currentFrame < fighter.kickFrames + fighter.kickEndlag) {
            fighter.setFrame(fighter.currentFrame);
        } else {
            fighter.setFrame(35 + fighter.currentFrame);
        }

        if (fighter.currentFrame == fighter.kickFrames + fighter.kickEndlag) {
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