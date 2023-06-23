'use strict'

import Professor from "./entity/professor.js";

window.onload = function (){
    preencheEdit();
}

document.getElementById("cancelar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/perfilProfessor.html");
    location.reload();
}

document.getElementById("atualizar").onclick = async function atualizarDados(e){
    e.preventDefault();

    try{
        let dad = localStorage.getItem("perfil");

        if(validacaoEmail(document.getElementById('email').value)){

            const d = await fetch('/php/verificaEmailExist.php',{
                method: 'POST',
                body: document.getElementById('email').value
            });
    
            if(d.ok){
    
                const dd = await d.json();
    
                if(dd['msg'] !='not'){
                    alert(dd['msg']);
                }else{
                    let dadosToString = {
                        id: dad,
                        nome: document.getElementById('nome').value,
                        email: document.getElementById('email').value
                    }
                    const dados = await fetch('/php/updatePerfilProf.php',{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify(dadosToString)
                    });
                    if(dados.ok){
                        const realDados = await dados.json();
                        alert(realDados['msg']);
                        let prof = new Professor(dad,document.getElementById('nome').value, '-', '-', '-', document.getElementById('email').value);
                        let nDados = JSON.stringify(prof);
                        localStorage.setItem("user", nDados);
                        history.pushState({},null, "/html/perfilProfessor.html");
                        location.reload();
                    }else{
                        return alert("Ocorreu um problema tente novamente mais tarde!");
                    }
                }
            }
        }else{
            alert("O e-mail informado esta incorreto, corrija-o e tente novamente")
        }
                
    }catch(error){
        console.log(error);
    }
}

async function preencheEdit(){
    try{
        let id = localStorage.getItem("perfil");

        const dados = await fetch('/php/verPerfil.php',{
            method: 'POST',
            body: JSON.stringify(id)
        });

        if(dados.ok){
            const realDados = await dados.json();
            document.getElementById('nome').value = realDados['nome'];
            document.getElementById('email').value = realDados['email'];
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText)
        }
    }catch(Error){
        console.log(Error);
    }
}

function validacaoEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);          
  
}