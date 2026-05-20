

//exercício 1 - gerar um número aleátório de 1 ao que o usuário quiser
const inputNumLimite = document.querySelector("#maxRoll");
const inputNumMinimo = document.querySelector("#minRoll");
const botaoNumRandom = document.querySelector("#gerarNum");
const numeroElement = document.querySelector("#numAleatorio");

function GeradorNum(Min,Max) {
    let extensao = Number(Max - Min);
    let ranNum = parseInt(Math.random() * extensao) + Min;

    botaoNumRandom.innerHTML = "Rolar Novamente";
    numeroElement.innerHTML = ranNum;
}

botaoNumRandom.addEventListener("click", function() {
    GeradorNum(parseInt(inputNumLimite.value));
});

//exercício 2 - abrir link por um botão
const botaoAbrirLink = document.querySelector("#abrirLink");

function abridorLink (link){
    window.open(link);
}
botaoAbrirLink.addEventListener("click",function() {
    abridorLink("https://www.google.com.br");
});

//exercício 3 - calcular média de notas


const notas = [0,0,0,0];//notas por array

    document.querySelector("#nota1").addEventListener("input", function() {
        notas[0] = parseFloat(document.querySelector("#nota1").value);
    });
    document.querySelector("#nota2").addEventListener("input", function() {
        notas[1] = parseFloat(document.querySelector("#nota2").value);
    });
    document.querySelector("#nota3").addEventListener("input", function() {
        notas[2] = parseFloat(document.querySelector("#nota3").value);
    });
    document.querySelector("#nota4").addEventListener("input", function() {
        notas[3] = parseFloat(document.querySelector("#nota4").value);
    });


var notaMaxima = document.querySelector("#notaMax");

    notaMaxima.addEventListener("input", function() {
    notaMaxima = parseFloat(document.querySelector("#notaMax").value);
    });

const getValue = document.querySelector("#valorArray");
const valorDisplay = document.querySelector("#valorDisplay");

const recuperacao = parseFloat(document.querySelector("#recuperacao"));
const botaoCalcularMedia = document.querySelector("#calcularMedia");
const mediaFinal = document.querySelector("#mediaFinal");

function mostrarValorArray(lista,Display){
    Display.innerHTML = lista 
}
getValue.addEventListener("click", function(){
    mostrarValorArray(notas,valorDisplay)
});

function calcularMedia (listaNotas,mediaDisplay,notaMax){
    let aprovacao = "";
    let media = 0;
    for (let i = 0; i < listaNotas.length; i++){

        switch(listaNotas[i]){
            case isNaN(listaNotas[i]):
                alert("Nota " + i + "° Bimestre inválido, por favor insira um valor válido");
                break;
            case listaNotas[i] < 0:
                alert("Nota " + i + "° Bimestre não pode ser menor que 0");
                break;
            case listaNotas[i] > notaMax:
                alert("Nota " + i + "° Bimestre não pode ser maior que a nota máxima de " + notaMaxima);
                break;
        }
        media += listaNotas[i];
    }
    media = Number((media / listaNotas.length).toFixed(1));
   

        if (media < (60/100 * notaMax)){
            document.querySelector("#recuperacao").disabled = false;
            botaoCalcularMedia.innerHTML
            aprovacao = "Reprovado";
        }
        else{aprovacao = "Aprovado";}
    mediaDisplay.innerHTML = ("Nota Máxima: " + notaMaxima);
    mediaDisplay.innerHTML += ("<br>Média do aluno: " + media + "<br>" + "Situação: " + aprovacao);
}

document.getElementById("calcular").addEventListener("click", function(){
    calcularMedia(notas,mediaFinal,notaMaxima)
});

//exercício 4 - calculadora simples
const num1 = parseInt(document.querySelector("#num1").value);
const num2 = parseInt(document.querySelector("#num2").value);
const botaoCalcular = document.querySelector("#calcular");
let operacao = document.querySelector('input[name="operacao"]:checked').value;
let resultado = 0;


botaoCalcular.addEventListener("click", function(){
switch (operacao) {
    case "soma":
        resultado = num1 + num2;
        break;
    case "subtracao":
        resultado = num1 - num2;
        break;
    case "multiplicacao":
        resultado = num1 * num2;
        break;
    case "divisao":
        resultado = num1 / num2;
        break;

}
document.querySelector("#resultado").innerHTML = "Resultado: " + resultado;
});