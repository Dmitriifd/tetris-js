import { SIZE_BLOCK, COLUMNS, ROWS } from '../index.js';

export class View {
	constructor(container) {
		this.container = container;

		this.preview();
	}

	colors = {
		J: 'cornflowerblue',
		I: 'purple',
		O: 'teal',
		L: 'orange',
		2: 'red',
		T: 'yellow',
		S: 'lime',
	};

	canvas = document.createElement('canvas');
	context = this.canvas.getContext('2d');

	preview() {
		this.container.innerHTML = '';
		const preview = document.createElement('div');
		preview.classList.add('out-glass');
		preview.innerHTML = '<p>Нажмите "ENTER" <br> чтобы начать игру</p>';
		preview.style.cssText = `
            border: 3px solid black;
            font-size: 18px;
            text-align: center;
            padding: 50px;
            grid-column: 1 / 3;
        `;

		this.container.append(preview);
	}

	gameOver() {
		this.container.textContent = '';
		const gameOver = document.createElement('div');
		gameOver.classList.add('out-glass');
		gameOver.innerHTML =
			'<h2>Game Over</h2><br><p>Нажми "ENTER" <br> чтобы заново начать игру</p>';
		gameOver.style.cssText = `
            margin-top: 10%;
            font-size: 18px;
            text-align: center;
            padding: 50px;
            grid-column: 1 / 3;
        `;

		this.container.append(gameOver);
	}

	init() {
		this.container.textContent = '';
		this.canvas.style.gridArea = 'game';
		this.canvas.classList.add('game-area');
		this.canvas.classList.add('out-glass');
		this.container.append(this.canvas);
		this.canvas.width = SIZE_BLOCK * COLUMNS;
		this.canvas.height = SIZE_BLOCK * ROWS;
	}

	createBlockScore() {
		const scoreBlock = document.createElement('div');
		scoreBlock.classList.add('out-glass');
		scoreBlock.style.cssText = `
            font-size: 18px;
            text-align: center;
            padding: 20px;
            grid-area: score;
            margin-top: 47%;
        `;

		const linesElem = document.createElement('p');
		const scoreElem = document.createElement('p');
		const levelElem = document.createElement('p');
		const recordElem = document.createElement('p');

		scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

		this.container.append(scoreBlock);

		return (lines, score, level, record) => {
			linesElem.textContent = `линия: ${lines}`;
			scoreElem.textContent = `очки: ${score}`;
			levelElem.textContent = `уровень: ${level}`;
			recordElem.textContent = `рекорд: ${record}`;
		};
	}

	createBlockNextTetromino() {
		const tetrominoBlock = document.createElement('div');
		tetrominoBlock.classList.add('out-glass');
		tetrominoBlock.style.cssText = `
            width: ${SIZE_BLOCK * 4}px;
            height: ${SIZE_BLOCK * 4}px;
            padding: 20px;
            grid-area: next;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		tetrominoBlock.append(canvas);

		this.container.append(tetrominoBlock);

		return (tetromino) => {
			canvas.width = SIZE_BLOCK * tetromino.length;
			canvas.height = SIZE_BLOCK * tetromino.length;
			context.clearRect(0, 0, canvas.width, canvas.height);

			for (let y = 0; y < tetromino.length; y++) {
				const line = tetromino[y];

				for (let x = 0; x < line.length; x++) {
					const block = line[x];
					if (block !== 'o') {
						context.fillStyle = this.colors[block];
						 context.strokeStyle = 'white';
							context.fillRect(
								x * SIZE_BLOCK,
								y * SIZE_BLOCK,
								SIZE_BLOCK,
								SIZE_BLOCK
							);
							context.strokeRect(
								x * SIZE_BLOCK,
								y * SIZE_BLOCK,
								SIZE_BLOCK,
								SIZE_BLOCK
							);
					}
				}
			}
		};
	}

	showArea(area) {
		const context = this.canvas.getContext('2d');

		context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let y = 0; y < area.length; y++) {
			const line = area[y];

			for (let x = 0; x < line.length; x++) {
				const block = line[x];
				if (block !== 'o') {
					context.fillStyle = this.colors[block];
                    context.strokeStyle = 'white';
                    context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
                    context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
				}
			}
		}
	}
}

