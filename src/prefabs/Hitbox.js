// Hitbox prefab
class Hitbox extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, width, height) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)          // add to existing, displayList, updateList
        scene.physics.add.existing(this)  // add physics

        this.setOrigin(0)

        this.x = x
        this.y = y

        this.width = width
        this.height = height

        this.body.setSize(this.width, this.height)
        this.body.setImmovable(true)
        this.alpha = 0
    }

    overlaps(x1, y1, wid, hig) {
        let x2 = x1 + wid
        let y2 = y1 + hig
        console.log(`Hitbox: (${this.x}, ${this.y}), (${this.x + this.width}, ${this.y + this.height})`)
        console.log(`Hurtbox: (${x1}, ${y1}), (${x2}, ${y2})`)
        // this.scene.add.rectangle(this.body.x, this.body.y, this.body.width, this.body.height, 0x0000ff)
        console.log(`check 1: ${this.x >= x1 && this.x <= x2 && this.y >= y1 && this.y <= y2}`)
        console.log(`check 2: ${this.x + this.body.width >= x1 && this.x + this.body.width <= x2 && this.y + this.body.height >= y1 && this.y + this.body.height <= y2}`)
        console.log(`check 3: ${x1 >= this.x && x1 <= this.x + this.body.width && y1 >= this.y && y1 <= this.y + this.body.height}`)
        console.log(`check 4: ${x2 >= this.x && x2 <= this.x + this.body.width && y2 >= this.y && y2 <= this.y + this.body.height}`)
        // if (this.x + 75 >= x1 && this.x <= x2 && this.y >= y1 && this.y <= y2) {
        //     return true
        // }
        // if (this.x + this.body.width >= x1 && this.x + this.body.width <= x2 && this.y + this.body.height >= y1 && this.y + this.body.height <= y2) {
        //     return true
        // }
        // if (x1 >= this.x && x1 <= this.x + this.body.width && y1 >= this.y && y1 <= this.y + this.body.height) {
        //     return true
        // }
        // if (x2 >= this.x && x2 <= this.x + this.body.width && y2 >= this.y && y2 <= this.y + this.body.height) {
        //     return true
        // }
        // return false
     
        // If one rectangle is on left side of other
        if (this.x > x2 || x1 > this.x + this.body.width) {
            console.log('shit 1')
            return false;
        }
 
        // If one rectangle is above other
        if (this.y + this.body.height > y1 || y2 > this.y) {
            console.log('shit 2')
            console.log(`welp hitb: (${this.x}, ${this.y}) (${this.x + this.body.width}, ${this.y + this.body.height})`)
            return false;
        }
 
        return true;
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setBoxSize(width, height) {
        this.width = width
        this.height = height
        this.body.setSize(this.width, this.height)
    }

    disableHit() {
        this.setPosition(-100, -100)
    }
}