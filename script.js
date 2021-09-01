
let formNames = document.getElementById("formNames");
let board = document.getElementById("board");
let cels = document.getElementsByClassName("cel");
let cross = '<img src="images/cross.svg" alt="cross" width="195">';
let circle = '<img src="images/circle.svg" alt="circle" width="150">';
let playerName = document.getElementById("playerName");
let playerPlaying = document.getElementById("playerPlaying");
let playerNamesChange = document.getElementById("playerNamesChange");
let player1 = sessionStorage.getItem('player1') || 'Joueur 1';
let player2 = sessionStorage.getItem('player2') || 'Joueur 2';
let player = player1; //initialization player who must play (player 1 at the beginning of the game)
let resultWinner = document.getElementById("resultWinner");
let winner = document.getElementById("winner");
let btnRestart = document.getElementById("restart");

formNames.classList.add('d-none'); //displays only for changing names
resultWinner.classList.add('d-none');//displays only when the game is finished (with or without a winner)
playerPlaying.classList.remove('d-none');//displays only when the game is playing
playerName.innerHTML = player; //displays the name of the player who must play

//CHANGING NAMES (can be done at every moment)
playerNamesChange.addEventListener("click", function() {
    formNames.classList.remove('d-none');
    formNames.addEventListener("submit", function(e) {
        e.preventDefault();
        let storedPlayer1Name = player1;
        if (document.getElementById("player1").value != '') {
            sessionStorage.setItem('player1', document.getElementById("player1").value); //storage players's names to give them back on restart
            player1 = document.getElementById("player1").value;
        }
        if (document.getElementById("player2").value != '') {
            sessionStorage.setItem('player2', document.getElementById("player2").value);
            player2 = document.getElementById("player2").value;
        }

        //update "player" variable
        if (player == storedPlayer1Name) {
            player = player1;
        } else {
            player = player2;
        }
        playerName.innerHTML = player;
        formNames.classList.add('d-none');
    })
})

//PLAYING
//eventListener on each cell, removed after being played (prevent for re-write a cell)
//write a cross for player 1 and a circle for player 2
//toggles "player" variable : player1 / player2
for (let cel of cels) {
    cel.addEventListener("click", function(){

        //this first if prevents from go on playing if there is a winner (when a winner -> resultWinner doesn't contain class "d-none" so nothing happens onClick)
        if (resultWinner.classList.contains("d-none")) {
            if (player === player1) {
                cel.innerHTML = cross;
                player = player2;
            } else {
                cel.innerHTML = circle;
                player = player1;
            }
            playerName.innerHTML = player;
        }
    }, {once : true})
}

//WINNER? or nobody
board.addEventListener("click", function() {
    let cel0 = cels[0].innerHTML
    let cel1 = cels[1].innerHTML
    let cel2 = cels[2].innerHTML
    let cel3 = cels[3].innerHTML
    let cel4 = cels[4].innerHTML
    let cel5 = cels[5].innerHTML
    let cel6 = cels[6].innerHTML
    let cel7 = cels[7].innerHTML
    let cel8 = cels[8].innerHTML
    
    //winner = player1
    if (
        (cel0 == cross && cel1 == cross && cel2 == cross) ||
        (cel3 == cross && cel4 == cross && cel5 == cross) ||
        (cel6 == cross && cel7 == cross && cel8 == cross) ||
        (cel0 == cross && cel3 == cross && cel6 == cross) ||
        (cel1 == cross && cel4 == cross && cel7 == cross) ||
        (cel2 == cross && cel5 == cross && cel8 == cross) ||
        (cel0 == cross && cel4 == cross && cel8 == cross) ||
        (cel2 == cross && cel4 == cross && cel6 == cross) 
    ) {
        playerPlaying.classList.add('d-none');
        resultWinner.classList.remove('d-none');
        winner.innerHTML = player1;
    }

    //winner = player2
    if (
        (cel0 == circle && cel1 == circle && cel2 == circle) ||
        (cel3 == circle && cel4 == circle && cel5 == circle) ||
        (cel6 == circle && cel7 == circle && cel8 == circle) ||
        (cel0 == circle && cel3 == circle && cel6 == circle) ||
        (cel1 == circle && cel4 == circle && cel7 == circle) ||
        (cel2 == circle && cel5 == circle && cel8 == circle) ||
        (cel0 == circle && cel4 == circle && cel8 == circle) ||
        (cel2 == circle && cel4 == circle && cel6 == circle) 
    ) {
        playerPlaying.classList.add('d-none');
        resultWinner.classList.remove('d-none');
        winner.innerHTML = player2;
    }

    //nobody wins
    if (cel0 != '' && cel1 != '' && cel2 != '' && cel3 != '' && cel4 != '' && cel5 != '' && cel6 != '' && cel7 != '' && cel8 != '') {
        playerPlaying.classList.add('d-none');
        resultWinner.classList.remove('d-none');
        winner.innerHTML = "Personne n'";
    }
})

//btn restart -> reload page
btnRestart.addEventListener("click", function() {
    window.location.reload();
})