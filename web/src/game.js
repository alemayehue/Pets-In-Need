class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', event => {
            if (((event.key === 'a') || (event.key === 'd')) && (this.game.keys.indexOf(event.key) === -1)) {
                this.game.keys.push(event.key);
            }
            console.log(this.game.keys)
        });
        window.addEventListener('keyup', event => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
            }
            console.log(this.game.keys);
        });
    }
}

class Player {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 50;
        this.x = canvas.width / 2 + this.width / 2;
        this.y = canvas.height - this.height;
        this.speedX = 0;
        this.max_speed = 2;
    }

    update() {
        if (this.game.keys.includes('a')) this.speedX = -this.max_speed;
        else if (this.game.keys.includes('d')) this.speedX = this.max_speed;
        else this.speedX = 0;
        this.x += this.speedX;
        if (this.x > canvas.width) this.x = -this.width;
        if (this.x < -this.width) this.x = canvas.width;
    }

    draw(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Layer {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = 512;
        this.height = 512;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x <= this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }
}

class Background {
    constructor(game) {
        this.game = game;
        this.background = document.getElementById('house');
        this.layer = new Layer(this.game, this.background, 1);
        this.layers = [this.layer];
    }

    update() {
        this.layers.forEach(layer => layer.update());
    }

    draw(context) {
        this.layers.forEach(layer => layer.draw(context));
    }
}

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.keys = [];
        this.timer = 0;
        this.gameOver = false;
        this.gameTime = 0;
        this.speed = 1;
    }

    update(deltaTime) {
        this.background.update();
        this.player.update();
        this.timer += deltaTime;
        if (this.timer / 1000 % 1 < 0.004) {
            console.log('Hit %d Seconds', (this.timer / 1000));
        }
    }

    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
    }
}

const game = new Game(canvas.width, canvas.height);
let lastTime = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime; // About 4ms (240 FPS)
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
}

animate(0);
