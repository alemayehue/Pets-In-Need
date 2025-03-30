import { Player } from './player.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    console.log(window.width);
    canvas.width = 600;
    canvas.height = 400;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.keys = [];
        }

        update() {
            this,this.player.update();
        }

        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate() {
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});