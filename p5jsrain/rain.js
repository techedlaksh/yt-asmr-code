let x1, y1, x2, y2
let rain = []
let noOfRainDrops = 1000
let colorPurple = [200, 50, 50, 1]

// Create objects
class RainDrop {

    constructor() {
        this.start()
    }

    start() {
        // this pointer refers to current object
        this.lengthOfRain = random(height*0.05)
        // Since all drops start at the same value, we can add
        // delay to each rain drop randomly
        this.timeDelay = random(height)
        this.x1 = map(random(width), 0, width, -(width*0.20), width)
        this.y1 = 0 - this.timeDelay
        this.x2 = this.x1
        this.y2 = this.y1 + this.lengthOfRain
        this.angle = -5
        this.rainDropThickness = this.lengthOfRain * 0.01
        this.speed = this.lengthOfRain * 0.5
    }

    restart() {
        this.start()
    }

    drawRain() {
        // By Default the color Mode is RGB values
        // You can find more on P5JS colorMode
        colorMode(HSB, 360, 100, 100, 1)
        strokeWeight(this.rainDropThickness)
        stroke(colorPurple)
        push()
        rotate(this.angle)
        line(this.x1, this.y1, this.x2, this.y2)
        pop()
    }

    fallRain() {
        this.y1 += this.speed
        this.y2 += this.speed
    }

    reachedGround() {
        this.hasFallen = false
        // P5JS has inbuilt value height and width as the value of
        // cavnas height and widht
        if (this.y1 > height+(height*.1)) {
            this.hasFallen = true
        }
        return this.hasFallen
    }
}

// Inbuilt function of P5JS runs once
function setup() {
    // By Default angle rotation is set on RADIAN values
    angleMode(DEGREES)
    // Initiate Canvas
    createCanvas(windowWidth, windowHeight)
    for (let i=0; i < noOfRainDrops; i++) {
        rain[i] = new RainDrop()
    }
}

// Inbuilt function runs ideally 60 times per second
function draw() {
    // background color for canvas
    // reset the color mode to RGB
    colorMode(RGB)
    background(205)
    for (let drop of rain) {
        drop.drawRain()
        drop.fallRain()
        // If drop has reached the end of the canvas, put
        // that drop at start again
        if (drop.reachedGround()) {
            drop.restart()
        }
    }
}
