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
        this.grounded = true
        this.knockback = 0
        this.hitstunFrames = 0
        this.inHitstun = false
        this.justComboed = false
        this.onePunch = true

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
        this.fps = 16
        this.punchFrames = 7
        this.punchEndlag = 3
        this.kickFrames = 8
        this.kickEndlag = 4
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
            death: new RumbleDeathState(),
            hurt: new RumbleHurtState()
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
        fighter.grounded = true
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

        if (fighter.HP <= 0) {
            this.stateMachine.transition('death')
            return
        }

        if (fighter.hitstunFrames > 0) {
            this.stateMachine.transition('hurt')
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

        if (fighter.hitstunFrames > 0) {
            this.stateMachine.transition('hurt')
            return
        }
 
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
        fighter.grounded = false
    }
 
    execute(scene, fighter) {
        // transitions: idle, move, punch, kick, fireball, hurt, death
        // handling: vertical jump

        // create local copy keyboard object
        const { left, right, punch, kick } = fighter.keys

        if (fighter.hitstunFrames > 0) {
            this.stateMachine.transition('hurt')
            return
        }

        // check if fighter is grounded
        if (fighter.body.touching.down || fighter.body.blocked.down) {
            this.stateMachine.transition('idle')
            return
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
        
        if (fighter.grounded) {
            fighter.body.setVelocityX(0)
        }

        fighter.currentFrame = 0;
        fighter.attackStartTime = Date.now()
        fighter.justHit = false

        fighter.anims.play(`rumble-idle-${fighter.direction}`) // Ensures Rumble is facing the correct direction

        fighter.onePunch = true
    }

    execute(scene, fighter) {
        const { punch, kick, special, left, right } = fighter.keys

        if (fighter.hitstunFrames > 0) {
            this.stateMachine.transition('hurt')
            return
        }

        if (fighter.y >= 100) {
            fighter.grounded = true
            fighter.body.setVelocityX(0)
        }

        if (fighter.currentFrame < fighter.punchFrames + fighter.punchEndlag) {
            // Buffer moves
            if(Phaser.Input.Keyboard.JustDown(punch)) {
                fighter.buffer = 'punch'
                fighter.onePunch = false
            }
            if(Phaser.Input.Keyboard.JustDown(kick)) {
                fighter.buffer = 'kick'
            }
            if(Phaser.Input.Keyboard.JustDown(special)) {
                fighter.buffer = 'special'
            }
            if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)) {
                fighter.buffer = 'move'
            }
        }

        if (fighter.currentFrame == 1) {
            // Punch 1 hit (5 damage)
            if (!fighter.justHit) {
                fighter.punch1HB.setPosition(fighter.x + (fighter.direction === 'left' ? -250 : 75), fighter.y + 325)
                if (hbOverlap(fighter.x + (fighter.direction === 'left' ? -250 : 75), fighter.y + 325, fighter.x + (fighter.direction === 'left' ? -250 : 75) + fighter.punch1HB.body.width, fighter.y + 325 + fighter.punch1HB.body.height, scene[`player${fighter.opponent}`].body.x, scene[`player${fighter.opponent}`].body.y, scene[`player${fighter.opponent}`].body.x + scene[`player${fighter.opponent}`].body.width, scene[`player${fighter.opponent}`].body.y + scene[`player${fighter.opponent}`].body.height)) {
                    scene[`player${fighter.opponent}`].knockback = 250
                    scene[`player${fighter.opponent}`].hitstunFrames = 4
                    if (scene[`player${fighter.opponent}`].inHitstun) {
                        scene[`player${fighter.opponent}`].justComboed = true
                    }
                    scene[`player${fighter.opponent}`].HP -= 5
                    scene[`player${fighter.opponent}`].healthBar.decrease(5)
                    fighter.justHit = true
                }
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
                this.stateMachine.transition('kick')
                return
            } else if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                this.stateMachine.transition('idle')
                return
            } else if (fighter.buffer === 'punch') {
                fighter.buffer = 'empty'
                fighter.onePunch = false
            }
        }

        if (fighter.onePunch && fighter.currentFrame > 3 && fighter.currentFrame < 3 + fighter.punchEndlag) {
            fighter.setFrame(fighter.currentFrame/* - fighter.punchFrames*/);
        }

        if (fighter.onePunch && fighter.currentFrame >= 3 + fighter.punchEndlag) {
            if (fighter.buffer === 'kick') {
                this.stateMachine.transition('kick')
            } else if (fighter.buffer === 'special') {
                this.stateMachine.transition('idle')
            } else if (fighter.buffer === 'punch') {
                this.stateMachine.transition('punch')
            } else if (fighter.buffer === 'move') {
                this.stateMachine.transition('walk')
            } else {
                this.stateMachine.transition('idle');
            }
            fighter.buffer = 'empty'
            return
        }

        if (!fighter.onePunch && fighter.currentFrame == 4) {
            // Punch 2 hit (10 damage)
            if (!fighter.justHit) {
                fighter.punch2HB.setPosition(fighter.x + (fighter.direction === 'left' ? -275 : 80), fighter.y + 360)
                if (hbOverlap(fighter.x + (fighter.direction === 'left' ? -275 : 80), fighter.y + 360, fighter.x + (fighter.direction === 'left' ? -275 : 80) + fighter.punch1HB.body.width, fighter.y + 360 + fighter.punch1HB.body.height, scene[`player${fighter.opponent}`].body.x, scene[`player${fighter.opponent}`].body.y, scene[`player${fighter.opponent}`].body.x + scene[`player${fighter.opponent}`].body.width, scene[`player${fighter.opponent}`].body.y + scene[`player${fighter.opponent}`].body.height)) {
                    scene[`player${fighter.opponent}`].knockback = 400
                    scene[`player${fighter.opponent}`].hitstunFrames = 4
                    if (scene[`player${fighter.opponent}`].inHitstun) {
                        scene[`player${fighter.opponent}`].justComboed = true
                    }
                    scene[`player${fighter.opponent}`].HP -= 10
                    scene[`player${fighter.opponent}`].healthBar.decrease(10)
                    fighter.justHit = true
                }
            }
        }

        if (!fighter.onePunch && fighter.currentFrame == 5) {
            fighter.justHit = false
            fighter.punch2HB.disableHit()
        }

        if (!fighter.onePunch && fighter.currentFrame > 4 && fighter.currentFrame < fighter.punchFrames) {
            // Cancellable into fireball
            if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                this.stateMachine.transition('idle')
                return
            }
        }

        if (!fighter.onePunch && fighter.currentFrame >= fighter.punchFrames && fighter.currentFrame < fighter.punchFrames + fighter.punchEndlag) {
            fighter.setFrame(fighter.currentFrame/* - fighter.punchFrames*/)
        } else if (!(fighter.onePunch && fighter.currentFrame >= 3) && fighter.currentFrame < fighter.punchFrames) {
            fighter.setFrame(28 + fighter.currentFrame);
        }

        if (!fighter.onePunch && fighter.currentFrame == fighter.punchFrames + fighter.punchEndlag) {
            if (fighter.buffer === 'kick') {
                this.stateMachine.transition('kick')
            } else if (fighter.buffer === 'special') {
                this.stateMachine.transition('idle')
            } else if (fighter.buffer === 'punch') {
                this.stateMachine.transition('punch')
            } else if (fighter.buffer === 'move') {
                this.stateMachine.transition('walk')
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
 
        // fighter.grounded = true

        fighter.currentFrame = 0;
        fighter.attackStartTime = Date.now()
        fighter.justHit = false

        fighter.anims.play(`rumble-idle-${fighter.direction}`) // Ensures Rumble is facing the correct direction
    }

    execute(scene, fighter) {
        const { punch, kick, special, left, right } = fighter.keys

        if (fighter.hitstunFrames > 0) {
            this.stateMachine.transition('hurt')
            return
        }

        if (fighter.currentFrame < fighter.kickFrames + fighter.kickEndlag) {
            // Buffer moves
            if(Phaser.Input.Keyboard.JustDown(punch)) {
                fighter.buffer = 'punch'
            }
            if(Phaser.Input.Keyboard.JustDown(kick)) {
                fighter.buffer = 'kick'
            }
            if(Phaser.Input.Keyboard.JustDown(special)) {
                fighter.buffer = 'special'
            }
            if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)) {
                fighter.buffer = 'move'
            }
        }

        if (fighter.currentFrame == 3) {
            // Kick 1 hit (10 damage)
            if (!fighter.justHit) {
                fighter.kick1HB.setPosition(fighter.x + (fighter.direction === 'left' ? -220 : 70), fighter.y + 360)
                if (hbOverlap(fighter.x + (fighter.direction === 'left' ? -220 : 70), fighter.y + 360, fighter.x + (fighter.direction === 'left' ? -220 : 70) + fighter.punch1HB.body.width, fighter.y + 360 + fighter.punch1HB.body.height, scene[`player${fighter.opponent}`].body.x, scene[`player${fighter.opponent}`].body.y, scene[`player${fighter.opponent}`].body.x + scene[`player${fighter.opponent}`].body.width, scene[`player${fighter.opponent}`].body.y + scene[`player${fighter.opponent}`].body.height)) {
                    scene[`player${fighter.opponent}`].knockback = 300
                    scene[`player${fighter.opponent}`].hitstunFrames = 4
                    if (scene[`player${fighter.opponent}`].inHitstun) {
                        scene[`player${fighter.opponent}`].justComboed = true
                    }
                    scene[`player${fighter.opponent}`].HP -= 10
                    scene[`player${fighter.opponent}`].healthBar.decrease(10)
                    fighter.justHit = true
                }
            }
        }

        if (fighter.currentFrame == 4) {
            fighter.justHit = false
            fighter.kick1HB.disableHit()
        }

        if (fighter.currentFrame == 4) {
            // Cancellable into fireball
            if (fighter.buffer === 'special') {
                fighter.buffer = 'empty'
                this.stateMachine.transition('idle');
                return
            }
        }

        if (fighter.currentFrame == 7) {
            // Kick 2 hit (15 damage)
            if (!fighter.justHit) {
                fighter.kick2HB.setPosition(fighter.x + (fighter.direction === 'left' ? -250 : 75), fighter.y + 385)
                if (hbOverlap(fighter.x + (fighter.direction === 'left' ? -250 : 75), fighter.y + 385, fighter.x + (fighter.direction === 'left' ? -250 : 75) + fighter.punch1HB.body.width, fighter.y + 385 + fighter.punch1HB.body.height, scene[`player${fighter.opponent}`].body.x, scene[`player${fighter.opponent}`].body.y, scene[`player${fighter.opponent}`].body.x + scene[`player${fighter.opponent}`].body.width, scene[`player${fighter.opponent}`].body.y + scene[`player${fighter.opponent}`].body.height)) {
                    scene[`player${fighter.opponent}`].knockback = 750
                    scene[`player${fighter.opponent}`].hitstunFrames = 6
                    if (scene[`player${fighter.opponent}`].inHitstun) {
                        scene[`player${fighter.opponent}`].justComboed = true
                    }
                    scene[`player${fighter.opponent}`].HP -= 15
                    scene[`player${fighter.opponent}`].healthBar.decrease(15)
                    fighter.justHit = true
                }
            }
        }

        if (fighter.currentFrame == 8) {
            fighter.justHit = false
            fighter.kick2HB.disableHit()
        }

        if (fighter.currentFrame >= fighter.kickFrames && fighter.currentFrame < fighter.kickFrames + fighter.kickEndlag) {
            if (fighter.grounded) {
                fighter.setVelocity(0)
            }
            fighter.setFrame(fighter.currentFrame/* - fighter.kickFrames*/);
        } else if (fighter.currentFrame < fighter.kickFrames) {
            fighter.setFrame(35 + fighter.currentFrame);
        }

        if (fighter.currentFrame == fighter.kickFrames + fighter.kickEndlag) {
            if (fighter.buffer === 'kick') {
                this.stateMachine.transition('kick');
            } else if (fighter.buffer === 'special') {
                this.stateMachine.transition('idle');
            } else if (fighter.buffer === 'punch') {
                this.stateMachine.transition('punch');
            } else if (fighter.buffer === 'move') {
                this.stateMachine.transition('walk');
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
        fighter.anims.play(`rumble-death-${fighter.direction}`)
        fighter.once('animationcomplete', () => {
            fighter.anims.play(`rumble-dead-${fighter.direction}`)
        })
    }
}

class RumbleHurtState extends State {
    enter(scene, fighter) {
        fighter.inHitstun = true
        if (fighter.grounded) {
            fighter.body.setVelocity(fighter.knockback * (scene[`player${fighter.opponent}`].direction === 'left' ? -1 : 1), 0)
        } else {
            fighter.body.setVelocity(fighter.knockback * (scene[`player${fighter.opponent}`].direction === 'left' ? -1 : 1), -500)
        }
        fighter.anims.play(`rumble-hurt-${fighter.direction}`)
        fighter.currentFrame = 0
        fighter.attackStartTime = Date.now()
    }

    execute(scene, fighter) {
        if (fighter.justComboed) {
            fighter.justComboed = false
            this.stateMachine.transition('hurt');
            return
        }

        fighter.currentFrame = Math.floor((Date.now() - fighter.attackStartTime) * fighter.fps / 1000)
        if (fighter.currentFrame >= fighter.hitstunFrames) {
            fighter.body.setVelocity(0)
            fighter.inHitstun = false
            fighter.hitstunFrames = 0
            fighter.justComboed = false
            this.stateMachine.transition('idle');
            return
        }
    }
}

function hbOverlap(hb1x1, hb1y1, hb1x2, hb1y2, hb2x1, hb2y1, hb2x2, hb2y2) {
    if (hb1x1 > hb2x2 || hb2x1 > hb1x2) {
        return false;
    }

    if (hb1y2 < hb2y1 || hb2y2 < hb1y1) {
        return false;
    }

    return true;
}