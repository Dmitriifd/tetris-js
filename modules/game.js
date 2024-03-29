import { tetrominoes } from './tetrominoes.js';
import { ROWS, COLUMNS } from '../index.js';

export class Game {
	score = 0;
	lines = 0;
	lvl = 1;
	record = localStorage.getItem('tetris-record') || 0;

	points = [0, 100, 300, 700, 1500];

	gameOver = false;

	area = [
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
	];

	activeTetromino = this.createTetromino();

	nextTetromino = this.createTetromino();

	createTetromino() {
		const keys = Object.keys(tetrominoes);
		const letterTetromino = keys[Math.floor(Math.random() * keys.length)];
		const rotation = tetrominoes[letterTetromino];
		const rotationIndex = Math.floor(Math.random() * rotation.length);
		const block = rotation[rotationIndex];

		return {
			block,
			rotationIndex,
			rotation,
			x: 3,
			y: 0,
		};
	}

	changeTetromino() {
		this.activeTetromino = this.nextTetromino;
		this.nextTetromino = this.createTetromino();
	}

	moveLeft() {
		if (
			this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)
		) {
			this.activeTetromino.x -= 1;
		}
	}

	moveRight() {
		if (
			this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)
		) {
			this.activeTetromino.x += 1;
		}
	}

	moveDown() {
		if (this.gameOver) return;
		if (
			this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)
		) {
			this.activeTetromino.y += 1;
		} else {
			this.stopMove();
		}
	}

	rotateTetromino() {
		this.activeTetromino.rotationIndex =
			this.activeTetromino.rotationIndex < 3
				? this.activeTetromino.rotationIndex + 1
				: 0;

		this.activeTetromino.block =
			this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

		if (
			!this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)
		) {
			this.activeTetromino.rotationIndex =
				this.activeTetromino.rotationIndex > 0
					? this.activeTetromino.rotationIndex - 1
					: 3;

			this.activeTetromino.block =
				this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
		}
	}

	get viewArea() {
		const area = JSON.parse(JSON.stringify(this.area));
		const { x, y, block: tetromino } = this.activeTetromino;

		for (let i = 0; i < tetromino.length; i++) {
			const row = tetromino[i];
			for (let j = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					area[y + i][x + j] = tetromino[i][j];
				}
			}
		}

		return area;
	}

	checkOutPosition(x, y) {
		const tetromino = this.activeTetromino.block;
		for (let i = 0; i < tetromino.length; i++) {
			for (let j = 0; j < tetromino[i].length; j++) {
				if (tetromino[i][j] === 'o') continue;
				if (
					!this.area[y + i] ||
					!this.area[y + i][x + j] ||
					this.area[y + i][x + j] !== 'o'
				) {
					return false;
				}
			}
		}
		return true;
	}

	stopMove() {
		const { x, y, block: tetromino } = this.activeTetromino;

		for (let i = 0; i < tetromino.length; i++) {
			const row = tetromino[i];
			for (let j = 0; j < row.length; j++) {
				if (row[j] !== 'o') {
					this.area[y + i][x + j] = tetromino[i][j];
				}
			}
		}

		this.changeTetromino();
		const countRow = this.clearRow();
		this.calcScore(countRow);
		this.updatePanels();
		this.gameOver = !this.checkOutPosition(
			this.activeTetromino.x,
			this.activeTetromino.y
		);
	}

	clearRow() {
		const rows = [];

		for (let i = ROWS - 1; i >= 0; i--) {
			let countBlock = 0;

			for (let j = 0; j < COLUMNS; j++) {
				if (this.area[i][j] !== 'o') {
					countBlock++;
				}
			}

			if (!countBlock) break;

			if (countBlock === COLUMNS) {
				rows.unshift(i);
			}
		}

		rows.forEach((i) => {
			this.area.splice(i, 1);
			this.area.unshift(Array(COLUMNS).fill('o'));
		});

		return rows.length;
	}

	calcScore(lines) {
		this.score += this.points[lines];
		this.lines += lines;
		this.lvl = Math.floor(this.lines / 10) + 1;

		if (this.score > this.record) {
			this.record = this.score;
			localStorage.setItem('tetris-record', this.score);
		}
	}

	createUpdatePanels(showScore, showNextTetromino) {
		showScore(this.lines, this.score, this.lvl, this.record);
		showNextTetromino(this.nextTetromino.block);

		this.updatePanels = () => {
			showScore(this.lines, this.score, this.lvl, this.record);
			showNextTetromino(this.nextTetromino.block);
		};
	}

	restart() {
		this.score = 0;
		this.lines = 0;
		this.lvl = 1;
		this.record = localStorage.getItem('tetris-record') || 0;

		this.gameOver = false;

		this.area = [
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
			['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
		];

		this.activeTetromino = this.createTetromino();

		this.nextTetromino = this.createTetromino();
	}
}
