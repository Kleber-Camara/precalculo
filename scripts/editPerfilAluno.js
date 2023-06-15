'use strict'

import Aluno from "./entity/aluno.js";

window.onload = function (){
    preencheEdit();
}

document.getElementById("cancelar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/perfilAluno.html");
    location.reload();
}

document.getElementById("atualizar").onclick = async function atualizarDados(){

    try{
        let dad = localStorage.getItem("perfil");
        let dadosToString = {
            id: dad,
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            curso: document.getElementById('curso').value 
        }
        const dados = await fetch('/php/updatePerfilAluno.php',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(dadosToString)
        });
        if(dados.ok){
            const realDados = await dados.json();
            alert(realDados['msg']);
            let aluno = new Aluno(dad,document.getElementById('nome').value, '-', '-', '-', document.getElementById('email').value, document.getElementById('curso').value);
            let nDados = JSON.stringify(aluno);
            localStorage.setItem("user",nDados);
            history.pushState({},null, "/html/perfilAluno.html");
            location.reload();
        }else{
            return alert("Ocorreu um problema tente novamente mais tarde!");
        }
                
    }catch(error){
        console.log(error);
    }
}

async function preencheEdit(){
    try{
        let id = localStorage.getItem("perfil");

        const dados = await fetch('/php/verPerfilAluno.php',{
            method: 'POST',
            body: JSON.stringify(id)
        });

        if(dados.ok){
            const realDados = await dados.json();
            //console.log(realDados);
            document.getElementById('nome').value = realDados['nome'];
            document.getElementById('email').value = realDados['email'];
            document.getElementById('curso').value = realDados['curso'];
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText)
        }
    }catch(Error){
        console.log(Error);
    }
}