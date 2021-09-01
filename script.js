let cellules = document.getElementsByClassName("case");
let joueur = document.getElementById("joueur");
let plateau = document.getElementById("plateau");
let croix = '<img src="images/croix.svg" alt="croix" width="195">';
let rond = '<img src="images/rond.svg" alt="rond" width="150">';
let winner = document.getElementById("winner");
let declarationWinner = document.getElementById("declarationWinner");
let tourJoueur = document.getElementById("tourJoueur");
let nomsJoueurs = document.getElementById("nomsJoueurs");
let joueur1 = 'Joueur 1';
let joueur2 = 'Joueur 2';
let player = joueur1;
let btnRecommencer = document.getElementById("recommencer");
let formNoms = document.getElementById("formNoms");

formNoms.classList.add('d-none');
declarationWinner.classList.add('d-none');
tourJoueur.classList.remove('d-none');
joueur.innerHTML = player; //affiche le tour du joueur dont c'est le tour

nomsJoueurs.addEventListener("click", function() {
    formNoms.classList.remove('d-none');
    formNoms.addEventListener("submit", function(e) {
        e.preventDefault();
        let ancienNom1 = joueur1;
        // let ancienNom2 = joueur2;
        joueur1 = document.getElementById("joueur1").value;
        joueur2 = document.getElementById("joueur2").value;

        ///si champ vide, remettre ancien nom

        if (player == ancienNom1) {
            player = joueur1;
        } else {
            player = joueur2;
        }
        joueur.innerHTML = player;
        console.log(joueur1)
        console.log(player)
    })
    // player = player;
    
})

for (let cellule of cellules) {
        cellule.addEventListener("click", function(){
        if (declarationWinner.classList.contains("d-none")) {
            if (player === joueur1) {
                cellule.innerHTML = croix;
                player = joueur2;
            } else {
                cellule.innerHTML = rond;
                player = joueur1;
            }
            joueur.innerHTML = player;
        }
    }, {once : true})
}

btnRecommencer.addEventListener("click", function() {
    window.location.reload();
})

plateau.addEventListener("click", function() {
    let case0 = cellules[0].innerHTML
    let case1 = cellules[1].innerHTML
    let case2 = cellules[2].innerHTML
    let case3 = cellules[3].innerHTML
    let case4 = cellules[4].innerHTML
    let case5 = cellules[5].innerHTML
    let case6 = cellules[6].innerHTML
    let case7 = cellules[7].innerHTML
    let case8 = cellules[8].innerHTML
    
    if (
        (case0 == croix && case1 == croix && case2 == croix) ||
        (case3 == croix && case4 == croix && case5 == croix) ||
        (case6 == croix && case7 == croix && case8 == croix) ||
        (case0 == croix && case3 == croix && case6 == croix) ||
        (case1 == croix && case4 == croix && case7 == croix) ||
        (case2 == croix && case5 == croix && case8 == croix) ||
        (case0 == croix && case4 == croix && case8 == croix) ||
        (case2 == croix && case4 == croix && case6 == croix) 
    ) {
        tourJoueur.classList.add('d-none');
        declarationWinner.classList.remove('d-none');
        winner.innerHTML = joueur1;
    }

    if (
        (case0 == rond && case1 == rond && case2 == rond) ||
        (case3 == rond && case4 == rond && case5 == rond) ||
        (case6 == rond && case7 == rond && case8 == rond) ||
        (case0 == rond && case3 == rond && case6 == rond) ||
        (case1 == rond && case4 == rond && case7 == rond) ||
        (case2 == rond && case5 == rond && case8 == rond) ||
        (case0 == rond && case4 == rond && case8 == rond) ||
        (case2 == rond && case4 == rond && case6 == rond) 
    ) {
        tourJoueur.classList.add('d-none');
        declarationWinner.classList.remove('d-none');
        winner.innerHTML = joueur2;
    }

    if (case0 != '' && case1 != '' && case2 != '' && case3 != '' && case4 != '' && case5 != '' && case6 != '' && case7 != '' && case8 != '') {
        tourJoueur.classList.add('d-none');
        declarationWinner.classList.remove('d-none');
        winner.innerHTML = "Personne n'";
    }
})