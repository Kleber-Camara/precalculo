
'use strict';

//Recebe os dados do formulario
const myform = document.getElementById("formularioAluno");

//Estipula a função que ira ser executada ao clicar no botao no formulario
myform.addEventListener('submit', criar);

document.getElementById('cancelar').onclick = function cancelar(){
    history.pushState({},null, "/index.html");
    location.reload();
};


//Função que ira enviar os dados do formulario para o banco de dados e atualiza no html o resultado
async function criar(e){
    e.preventDefault();

    const formData = new FormData(this);
    const searchParams = new  URLSearchParams();

    for(const par of formData){
        searchParams.append(par[0],par[1],par[2],par[3],par[4]);
    }

    //Preenche a variavel dados com um json com as informações vindas da conexão com o banco de dados
    const dados = await fetch('/php/cadAluno.php',{
        method: 'POST',
        body: formData
    });

    const realDados = await dados.json();

    if(realDados['status'] == true){
        document.getElementById('nome_aluno').value = " ";
        document.getElementById('curso').value = " ";
        document.getElementById('email').value = " ";
        document.getElementById('login').value = " ";
        document.getElementById('senha').value = " ";
    }

    return alert(realDados['msg']);
}
