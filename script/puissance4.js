class ConnectFour {
    constructor(selector, row, col) {
        this.rows = row;
        this.cols = col;
        this.player = 'red';
        this.selector = selector;
        this.gameOver = false;
        this.audio = new AudioGame(this);
        this.onPlayerMove = function () {
        };
        this.gridCreation();
        this.setupEventListeners();
    }

    gridCreation() {
        this.audio.startingAudioGame();
        const $board = $(this.selector);
        $board.empty();
        this.gameOver = false;
        this.player = 'red';
        for (let row = 0; row < this.rows; row++) {
            const $row = $('<div>')
                .addClass('row');
            for (let col = 0; col < this.cols; col++) {
                const $col = $('<div>')
                    .addClass('col empty')
                    .attr('data-col', col)
                    .attr('data-row', row);
                $row.append($col);
            }
            $board.append($row);
        }
    }

    setupEventListeners() {
        const $board = $(this.selector);
        const that = this;

        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`);
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null;
        }

        $board.on('mouseenter', '.col.empty', function () {
            if (that.gameOver)
                return;
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);
        });
        $board.on('mouseleave', '.col', function () {
            $('.col').removeClass(`next-${that.player}`);
        });
        $board.on('click', '.col.empty', function () {
            if (that.gameOver)
                return;
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player', that.player);

            const winner = that.checkingTheWinner($lastEmptyCell.data('row'),
                $lastEmptyCell.data('col'));
            if (winner) {
                that.gameOver = true;
                that.audio.stoppingAudioGame();
                alert(`Game Oveeeeer! Player ${that.player} rekt you!`);
                that.audio.winningAudioGame();
                $('.col.empty').removeClass('empty');
                return;
            }
            that.player = (that.player === 'red') ? 'yellow' : 'red';
            that.onPlayerMove();
            $(this).trigger('mouseenter');
        });
    }

    checkingTheWinner(row, col) {
        const that = this;

        function $getTheCell(a, b) {
            return $(`.col[data-row='${a}'][data-col='${b}']`);
        }

        function checkDir(dir) {
            let total = 0;
            let a = row + dir.a;
            let b = col + dir.b;
            let $next = $getTheCell(a, b);
            while (a >= 0 &&
            a < that.rows &&
            b >= 0 &&
            b < that.cols &&
            $next.data('player') === that.player) {
                total++;
                a += dir.a;
                b += dir.b;
                $next = $getTheCell(a, b)
            }
            return total;
        }

        function checkWinner(dirUP, dirDOWN) {
            const total = 1 + checkDir(dirUP) + checkDir(dirDOWN);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkingVerticals() {
            return checkWinner({a: -1, b: 0}, {a: 1, b: 0});
        }

        function checkingHonrizonzals() {
            return checkWinner({a: 0, b: -1}, {a: 0, b: 1});
        }

        function checkingDiagBottomLeftToTopRight() {
            return checkWinner({a: 1, b: -1}, {a: 1, b: 1});
        }

        function checkingDiagTopLeftToBottomRight() {
            return checkWinner({a: 1, b: 1}, {a: -1, b: -1});
        }

        return checkingVerticals() ||
            checkingHonrizonzals() ||
            checkingDiagBottomLeftToTopRight() ||
            checkingDiagTopLeftToBottomRight();
    }

    drawGame() {

    }

    restartTheGame() {
        this.audio.startingAudioGame();
        this.audio.restartAudioGame();
        this.gridCreation();
        this.onPlayerMove();
    }
}