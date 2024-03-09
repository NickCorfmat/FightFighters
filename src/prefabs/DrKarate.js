// Dr. Karate McSkirmish prefab
class DrKarate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, direction, keys, health, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this).setScale(2.85).setOrigin(0.5, 0)
        scene.physics.add.existing(this).setScale(2.85).setOrigin(0.5, 0)

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
        this.body.setSize(60, 115)
        this.body.setOffset(70, 20)
        this.body.setGravityY(2000)
        this.body.setCollideWorldBounds(true)

        this.jumpHeight = -1000
        this.punchCooldown = 150
        this.kickCooldown = 500
        this.specialCooldown = 1500
        this.jumpTimer = 500
        this.crouchTimer = 200
        this.hurtTimer = 250

        // create health bar
        this.healthBarX = direction == 'left' ? 725 : 150
        this.healthBar = new HealthBar(scene, this.healthBarX, 115, 325, 50, health)

        // display name card
        this.nameCardX = direction == 'left' ? 785 : 148
        scene.add.sprite(this.nameCardX, 166, 'karate-play-text').setOrigin(0).setScale(1.75)

        // initialize state machine managing fighter (initial state, possible states, state args[])
        this.fsm = new StateMachine('idle', {
            idle: new KarateIdleState(),
            walk: new KarateMoveState(),
            jump: new KarateJumpState(),
            punch: new KaratePunchState(),
            kick: new KarateKickState(),
            death: new KarateDeathState()
        }, [scene, this])
    }
}

class KarateIdleState extends State {
    enter(scene, fighter) {
        fighter.setVelocity(0)
        fighter.anims.play(`karate-idle-${fighter.direction}`)
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
 
class KarateMoveState extends State {
    execute(scene, fighter) {
        // transitions: idle, jump, punch, kick, fireball, hurt, death
        // handling: move left, right

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
        } else if(right.isDown) {
            fighter.body.setVelocityX(fighter.MAX_VELOCITY_X)
        }

        fighter.anims.play(`karate-walk-${fighter.direction}`, true)
    }
}
 
class KarateJumpState extends State {
    enter(scene, fighter) {
        fighter.setVelocityY(fighter.jumpHeight)
        fighter.anims.play(`karate-walk-${fighter.direction}`)
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
        fighter.anims.play(`karate-punch-${fighter.direction}`)
 
        fighter.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })

        // attack collision detection
        /*let hitbox = new Hitbox(scene, fighter.x + (fighter.direction == 'left' ? -180 : 180), fighter.y + 150, 'hitbox') //TODO
        scene.physics.add.collider(scene.player1, hitbox, () => {
            scene.player1.HP -= 5
            scene.player1.healthBar.decrease(5)
            hitbox.destroy()
        }, null, scene)*/
    }
}

class KarateKickState extends State {
    enter(scene, fighter) {
        // transitions: idle
        // handling: kick attack
        
        fighter.setVelocity(0)
        fighter.anims.play(`karate-kick-${fighter.direction}`)

        fighter.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })

        // attack collision detection
        /*let hitbox = new Hitbox(scene, fighter.x + (fighter.direction == 'left' ? -180 : 180), fighter.y + 150, 'hitbox') //TODO
        scene.physics.add.collider(scene.player1, hitbox, () => {
            scene.player1.HP -= 10
            scene.player1.healthBar.decrease(10)
            hitbox.destroy()
        }, null, scene)*/
    }
}
 
class KarateDeathState extends State {
    enter(scene, fighter) {
 
    }
} 