$(document).ready(function () {
    let verif_row = prompt('Choose the numbers of rows');
    while (verif_row < 6 || verif_row > 30 || verif_row == '') {
        alert
        ('Take it seriously with some legal values please (min = 7, max = 30)');
        verif_row = prompt('Choose the numbers of rows');
    }

    let verif_col = prompt('Choose the numbers of columns');
    while (verif_col < 7 || verif_col > 30 || verif_col == '') {
        alert
        ('Take it seriously with some legal values please (min, 6, max = 30)');
        verif_col = prompt('Choose the numbers of columns');
    }

    const Connect4 = new ConnectFour(
        '#connect4', verif_row, verif_col);

    Connect4.onPlayerMove = function () {
        $('#player').text(Connect4.player);
    };
    $('#restart').click(function () {
        Connect4.restartTheGame();
    });
});