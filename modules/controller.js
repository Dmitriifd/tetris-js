export class Controller {
    pressed = 0;

    constructor (game, view) {
        this.game = game;
        this.view = view;
    }

    init(codeKey) {
        window.addEventListener('keydown', event => {
            if (event.code === codeKey && this.pressed === 0) {
                this.pressed = 1;
                this.view.init();
                this.start();
            } else if (event.code === codeKey && this.pressed === 2) {
                this.pressed = 1;
                this.view.init();
                this.game.restart();

                this.view.showArea(this.game.viewArea);
                const showScore = this.view.createBlockScore();
                const showNextTetromino = this.view.createBlockNextTetromino();
                this.game.createUpdatePanels(showScore, showNextTetromino);
            }
        })
    }

    start () {
        this.view.showArea(this.game.viewArea);
        const showScore = this.view.createBlockScore();
        const showNextTetromino = this.view.createBlockNextTetromino();
        this.game.createUpdatePanels(showScore, showNextTetromino);

        const tick = () => {
            const time = (1100 - 100 * this.game.lvl);
            if (this.game.gameOver) {
                this.view.gameOver();
                this.pressed = 2;
            }
            setTimeout(() => {
                this.game.moveDown();
                this.view.showArea(this.game.viewArea);
                tick();
            }, time >= 100 ? time : (100 - 2 * this.game.lvl));
        };

        tick();

        window.addEventListener('keydown', event => {
            const key = event.code;
            
            switch(key) {
                case 'ArrowLeft':
                    this.game.moveLeft();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowRight':
                    this.game.moveRight();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowDown':
                    this.game.moveDown();
                    this.view.showArea(this.game.viewArea);
                break;
                case 'ArrowUp':
                    this.game.rotateTetromino();
                    this.view.showArea(this.game.viewArea);
                break;
            }
        });
    }
}