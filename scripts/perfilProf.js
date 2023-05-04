'use strict'

window.onload = function(){
    carregarDados();
}

document.getElementById("voltar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/mainProfessor.html");
    location.reload();
}

document.getElementById("edperfil").onclick = function paginaEditPerfil(){
    history.pushState({},null, "/html/editPerfilProf.html");
    location.reload();
}

document.getElementById("edSenha").onclick = function paginaEditPerfil(){
    history.pushState({},null, "/html/editSenha.html");
    location.reload();
}

async function carregarDados(){
    try{
        let id = localStorage.getItem("perfil");

        const dados = await fetch('/php/verPerfil.php',{
            method: 'POST',
            body: JSON.stringify(id)
        });

        if(dados.ok){
            const realDados = await dados.json();
            document.getElementById('nome').innerHTML = realDados['nome'];
            document.getElementById('email').innerHTML = realDados['email'];
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText)
        }
    }catch(Error){
        console.log(Error);
    }
}