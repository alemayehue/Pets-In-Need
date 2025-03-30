export class Player {
    constructor (game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height;
        this.image = document.getElementById('player');
    }

    update() {
        this.x = this.x + 3;
        if (this.x > this.width) this.x = -this.width;
    }

    draw(context) {
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

    }
}