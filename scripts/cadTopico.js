'use strict'

document.getElementById('cancelar').onclick = function cancelar(){
    history.pushState({},null, '/html/mainProfessor.html');
    location.reload();
};


document.getElementById('cadastrar').onclick = async function criarTopico(e){
    e.preventDefault();
    let autor = JSON.parse(localStorage.getItem("user"))
    
    let dadosToSend = {
        assunto: document.getElementById('assunto').value,
        autor: autor['_nome'],
        texto: document.getElementById('textoArea').value
    }

    const dados = await fetch('/php/cadTopico.php',{
        method: 'POST',
        body: JSON.stringify(dadosToSend)
    });

    const realDados = await dados.json();

    if(realDados['status'] == true){
        document.getElementById("assunto").value = " ";
        document.getElementById("texto").value = " ";
    }

    alert(realDados['msg']);
    history.pushState({},null, '/html/mainProfessor.html');
    location.reload();
}