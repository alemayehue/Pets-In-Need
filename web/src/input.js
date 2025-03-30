
export class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', event => {
            if (((event.key === "a") || (event.key === "d")) && this.game.keys.indexOf(event.key) === -1) {
                this.game.keys.push(event.key);
            }
            console.log(event.key);
        });
        window.addEventListener('keyup', event => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
            }
            console.log(this.game.keys);
        });
    }
}