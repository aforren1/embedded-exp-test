const config = {
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create,
        update: update
    }
};

let text1;
let text2;
let data = [];
let counter = 0;

const game = new Phaser.Game(config);

function create() {
    text1 = this.add.text(10, 10, '', { fill: '#00ff00' })
    text2 = this.add.text(500, 10, `Cross origin isolation: ${window.crossOriginIsolated}\nClick 3x to send data`, { fill: '#ffff00' })
    this.input.on('pointerdown', (ptr) => {
        this.scale.startFullscreen()
    })
    this.input.on('pointermove', (ptr) => {
        if (this.scale.isFullscreen) {
            data.push(ptr.event.timeStamp)
        }
    })

    this.input.on('pointerdown', (ptr) => {
        counter++
        if (counter == 3) {
            console.log(data)
            window.parent.postMessage(JSON.stringify(data), '*')
        }
    })
}

function update() {
    text1.text = `t: ${performance.now()}`
}
