
let formNoms = document.getElementById("formNoms");
let plateau = document.getElementById("plateau");
let cellules = document.getElementsByClassName("case");
let croix = '<img src="images/croix.svg" alt="croix" width="195">';
let rond = '<img src="images/rond.svg" alt="rond" width="150">';
let joueur = document.getElementById("joueur");
let tourJoueur = document.getElementById("tourJoueur");
let nomsJoueurs = document.getElementById("nomsJoueurs");
let joueur1 = sessionStorage.getItem('joueur1') || 'Joueur 1';
let joueur2 = sessionStorage.getItem('joueur2') || 'Joueur 2';
let player = joueur1; //initialisation du joueur dont c'est le tour (joueur 1 en début de partie)
let declarationWinner = document.getElementById("declarationWinner");
let winner = document.getElementById("winner");
let btnRecommencer = document.getElementById("recommencer");

formNoms.classList.add('d-none'); //ne s'affiche que pour changer de noms
declarationWinner.classList.add('d-none');//ne s'affiche que quand la partie est finie (gagnant ou null)
tourJoueur.classList.remove('d-none');//ne s'affiche que quand la partie est en cours
joueur.innerHTML = player; //affichage nom joueur en cours

//changement de noms (peut se faire à tout moment)
nomsJoueurs.addEventListener("click", function() {
    formNoms.classList.remove('d-none');
    formNoms.addEventListener("submit", function(e) {
        e.preventDefault();
        let ancienNom1 = joueur1;
        if (document.getElementById("joueur1").value != '') {
            sessionStorage.setItem('joueur1', document.getElementById("joueur1").value); //stckage dans variable session pour garder valeur au reload (d'une partie à l'autre)
            joueur1 = document.getElementById("joueur1").value;
        }
        if (document.getElementById("joueur2").value != '') {
            sessionStorage.setItem('joueur2', document.getElementById("joueur2").value);
            joueur2 = document.getElementById("joueur2").value;
        }

        //mise à jour variable player
        if (player == ancienNom1) {
            player = joueur1;
        } else {
            player = joueur2;
        }
        joueur.innerHTML = player;
        formNoms.classList.add('d-none');
    })
})

//récup case choisie par joueur et insère rond ou croix selon joueur puis désactive la case (pour pas réecrire dessus)
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

//vérif si y'a un winner
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

    //si toutes les cases sont remplies sans gagnant, c'est perdu!
    if (case0 != '' && case1 != '' && case2 != '' && case3 != '' && case4 != '' && case5 != '' && case6 != '' && case7 != '' && case8 != '') {
        tourJoueur.classList.add('d-none');
        declarationWinner.classList.remove('d-none');
        winner.innerHTML = "Personne n'";
    }
})

//btn recommencer -> reload page
btnRecommencer.addEventListener("click", function() {
    window.location.reload();
})