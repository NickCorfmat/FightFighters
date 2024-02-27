// Character Select prefab
class CharacterSelect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this.setOrigin(0.5).setScale(5.5))

        // initialize state machine managing fighter (initial state, possible states, state args[])
        scene.selectFSM = new StateMachine('joe', {
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
        menu.anims.play('joe-select')
    }

    execute(scene) {
        const { right, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('rumble')
            return
        }
    }
}

class BuffaloSelect extends State {
    enter(scene, menu) {
        menu.anims.play('buffalo-select')
    }

    execute(scene) {
        const { left, right, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('joe')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('admiral')
            return
        }
    }
}

class AdmiralSelect extends State {
    enter(scene, menu) {
        menu.anims.play('admiral-select')
    }

    execute(scene) {
        const { left, up } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
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
        menu.anims.play('chun-li-select')
    }

    execute(scene) {
        const { left, right, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('rumble')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('buffalo')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('czar')
            return
        }
    }
}

class CzarSelect extends State {
    enter(scene, menu) {
        menu.anims.play('czar-select')
    }

    execute(scene) {
        const { left, right, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('chunLi')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('admiral')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(right)) {
            this.stateMachine.transition('beast')
            return
        }
    }
}

class BeastorSelect extends State {
    enter(scene, menu) {
        menu.anims.play('beast-select')
    }

    execute(scene) {
        const { left } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(left)) {
            this.stateMachine.transition('czar')
            return
        }
    }
}