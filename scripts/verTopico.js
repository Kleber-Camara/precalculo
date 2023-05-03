'use strict'

window.onload = function(){
    carregaTopico();
}

document.getElementById("voltar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/telaTopicosProf.html");
    location.reload();
}

async function carregaTopico(){
    try{
        let topicoRead = localStorage.getItem('ver');

        const dados = await fetch('/php/getSingleTopico.php',{
            method: 'POST',
            body: topicoRead
        });

        if(dados.ok){
            const realDados = await dados.json();
            document.getElementById('texto').innerHTML = realDados['texto'];
            document.getElementById('autor').innerHTML ="Autor: " + realDados['autor'];
            document.getElementById('assunto').innerHTML = realDados['assunto'];
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText);
        }
    }catch(error){
        console.log(error);
    }
}