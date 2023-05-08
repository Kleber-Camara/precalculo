
'use strict';

document.getElementById('cancelar').onclick = function cancelar(){
    history.pushState({},null, "/index.html");
    location.reload();
};


//Função que ira enviar os dados do formulario para o banco de dados e atualiza no html o resultado
//Estipula a função que ira ser executada ao clicar no botao no formulario
document.getElementById('criar').onclick = async function criar(e){
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let curso = document.getElementById('curso').value;
    let email = document.getElementById('email').value;
    let login = document.getElementById('login').value;
    let senha = document.getElementById('senha').value;

    if(senha < 8){
        alert("Senha muito curta!");
    }else{
        let form = {
            nome: nome,
            curso: curso,
            email: email,
            login: login,
            senha: senha
        }

        //Preenche a variavel dados com um json com as informações vindas da conexão com o banco de dados
        const dados = await fetch('/php/cadAluno.php',{
            method: 'POST',
            body: JSON.stringify(form)
        });

        const realDados = await dados.json();

        if(realDados['status'] == true){
            document.getElementById('nome').value = " ";
            document.getElementById('curso').value = " ";
            document.getElementById('email').value = " ";
            document.getElementById('login').value = " ";
            document.getElementById('senha').value = " ";
        }

        return alert(realDados['msg']);
    }
}
