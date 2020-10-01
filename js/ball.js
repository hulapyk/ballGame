import {collision} from "./collision.js";

export default class Ball{

    constructor(game){
        this.image = document.getElementById("ball");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;
        this.size = 16;
        this.reset();
    }

    reset(){
        this.position = { x: 10, y: 400 };
        this.speed = { x: 4, y: -4 };
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // side collisions
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        // top collision
        if (this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        // bottom collision
        if (this.position.y + this.size > this.gameHeight){
            this.game.lives--;
            this.reset();
        }

        if (collision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }



}