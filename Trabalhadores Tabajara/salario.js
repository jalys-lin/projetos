
// DOM HTML
const salarioAtualDisplay = document.getElementById("salarioAntigo");
const PercentualReajusteDisplay = document.getElementById("reajustePercentual");
const aumentoDisplay = document.getElementById("reajusteValor");
const salarioNovoDisplay = document.getElementById("salarioNovo");
const reajustarBotao = document.getElementById("reajustar>");


reajustarBotao.addEventListener("click", () => {
    //salario atual
    const salarioAtual = parseFloat(document.getElementById("salarioAtual").value);

    //atualizar display
    salarioAtualDisplay.innerHTML = salarioAtual;


    //atualizar salario
    reajustarSalario(salarioAtual,salarioNovoDisplay,aumentoDisplay);

})

function reajustarSalario(salario,salarioDisplay,reajusteDisplay){
    let reajuste
    let salarioNovo

    if (salario <= 280){
        reajuste = (salario * (20/100));
        salarioNovo = reajuste + salario;
        PercentualReajusteDisplay.innerHTML = "20%"
    } else if(salario <= 700 ){
        reajuste = (salario * (15/100));
        salarioNovo = reajuste + salario;
        PercentualReajusteDisplay.innerHTML = "15%"

    } else if(salario <= 1500){
        reajuste = (salario * (10/100));
        salarioNovo = reajuste + salario;
        PercentualReajusteDisplay.innerHTML = "10%"

    } else {
        reajuste = (salario * (5/100));
        salarioNovo = reajuste + salario;
        PercentualReajusteDisplay.innerHTML = "5%"
    }
    reajusteDisplay.innerHTML = "R$ " + reajuste;
    salarioDisplay.innerHTML = "R$ " + salarioNovo;
};




