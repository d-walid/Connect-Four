class AudioGame {

    constructor(c) {
        this.c = c;
        this.audioStartingGame = new Audio('./audio/GameTheme.mp3');
        this.audioWinningGame = new Audio('./audio/VictoryTheme.mp3');
    }

    startingAudioGame() {
        $('#connect4').on('click',
            e => this.audioStartingGame.play());
            this.audioStartingGame.volume = 1;
    };

    stoppingAudioGame() {
            this.audioStartingGame.volume = 0;
    }

    winningAudioGame() {
        $('#connect4').on('click',
            e => this.audioWinningGame.play());
        this.audioWinningGame.volume = 1;
    }

    restartAudioGame() {
        $('#restart').on('click',
            this.audioWinningGame.volume = 0);
    }
}