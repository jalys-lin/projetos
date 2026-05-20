const playButton = document.querySelector("#playTicTacToe");
const spaces = document.getElementsByClassName("celulaTicTacToe");
const roundDisplay = document.querySelector("#round");
const statusDisplay = document.querySelector("#status");
let rodada = 1;
let ultimaJogada = [];
let ocupado = [0,0,0,
               0,0,0,
               0,0,0];


// função para iniciar o jogo da velha
function playTicTacToe(play) {

    play.innerHTML = "Reiniciar Jogo";
    play.addEventListener("click", function(){
        location.reload();
    });

    //opção de voltar uma rodada do jogo - em andamento
    /*play.innerHTML = "voltar Rodada";
    play.addEventListener("click", function() {

        //se ultima jogada = 1 então estão na rodada inicial não sendo possivel voltar mais rodadas
        if (ultimaJogada.pop() <= 1){
            alert ("Não é possível voltar mais rodadas")
        }
        else{
            rodada = rodada - 1;
            roundDisplay.innerHTML = rodada;


            //limpar registros da ultima rodada
            spaces[ultimaJogada.pop()].innerHTML = "";
            ocupado.splice(ultimaJogada.pop(),1,0)

            statusDisplay.innerHTML = `voltou uma rodada, vez do jogador ${ultimaJogada[0]}`;
        }
    });*/

    statusDisplay.innerHTML = "Jogo iniciado! <br> Vez do jogador X";
    
    //esperar o click dos campos do tabuleiro
    for (let space = 0; space < 9; space++){
        spaces[space].addEventListener("click", function(){
            marcador(space);
        });
    }
}


// função para marcar o tabuleiro e o número de jogadas
function marcador(i) {
    
    //verificação se a casa ja está marcada
    if (ocupado[i] === 1 ){
        statusDisplay.innerHTML = "casa ja está marcada escolha outra casa";
        return;
    }
    //marcando espaco como ocupado
    ocupado.splice(i,1,1)

    //contagem de rodadas
    rodada++;
    roundDisplay.innerHTML = rodada;

    //marcação do tabuleiro
    let vez = rodada % 2;
    switch (vez) {
        case 0: //vez do jogador X
            spaces[i].innerHTML = "X";
            statusDisplay.innerHTML = "Vez do jogador O";
            ultimaJogada.push(i);
            break;
        case 1: //vez do jogador O
            spaces[i].innerHTML = "O";
            statusDisplay.innerHTML = "Vez do jogador X";
            ultimaJogada.push(i);
            break;
    }
    
}


//incia oo jogo quando clicado o play
playButton.addEventListener("click", function() {
    playTicTacToe(playButton);
});









