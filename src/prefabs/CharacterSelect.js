// Character Select prefab
class CharacterSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(5.5))

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.selectFSM = new StateMachine(this.currentState, {
            joe: new JoeSelect(),
            buffalo: new BuffaloSelect(),
            rumble: new RumbleSelect(),
            admiral: new AdmiralSelect(),
            beast: new BeastorSelect(),
            czar: new CzarSelect(),
            chunLi: new ChunLiSelect()
        }, [scene, this])
    }

}
 
 
class JoeSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'joe'
        menu.anims.play('joe-select')
    }
 
 
    execute(scene) {
        const { right, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}

class LockedState extends State {
    enter(scene, menu) {
        scene.lock = scene.add.sprite(width/2, height/2, 'lock')
        scene.lock.setOrigin(0.5).setScale(8)
        scene.lock.play('locked').once('animationcomplete', () => {
            scene.icon.destroy()
            this.stateMachine.transition(menu.currentState)
        })
        return
    }
}
 
 
class BuffaloSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'buffalo'
        menu.anims.play('buffalo-select')
    }
 
 
    execute(scene) {
        const { left, right, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('joe')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(up)) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}
 
 
class AdmiralSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'admiral'
        menu.anims.play('admiral-select')
    }
 
 
    execute(scene) {
        const { left, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('czar')
            return
        }
    }
}

class RumbleSelect extends State {
    enter(scene, menu) {
        menu.anims.play('rumble-select')
    }

    execute(scene) {
        const { right, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('joe')
            return
        }
    }
}
 
 
class ChunLiSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'chunLi'
        menu.anims.play('chun-li-select')
    }
 
 
    execute(scene) {
        const { left, right, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('rumble')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.icon.destroy()
            this.stateMachine.transition('buffalo')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}
 
 
class CzarSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'czar'
        menu.anims.play('czar-select')
    }
 
 
    execute(scene) {
        const { left, right, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('chunLi')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(down)) {
            scene.icon.destroy()
            this.stateMachine.transition('admiral')
            return
        }
 
 
        if(Phaser.Input.Keyboard.JustDown(right)) {
            scene.icon.destroy()
            this.stateMachine.transition('beast')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('locked')
            return
        }
    }
}
 
 
class BeastorSelect extends State {
    enter(scene, menu) {
        menu.currentState = 'beast'
        menu.anims.play('beast-select')
    }
 
 
    execute(scene) {
        const { left } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            scene.icon.destroy()
            this.stateMachine.transition('czar')
            return
        }
    }
} 