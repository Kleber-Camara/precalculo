'use strict'

import Topico from "./entity/topico.js"

window.onload = function(){
    getTopicosEditar();
}

document.getElementById("cancelar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/telaTopicosProf.html");
    location.reload();
}

document.getElementById("atualizar").onclick = async function atualizaTopico(){
    try{
        let dad = JSON.parse(localStorage.getItem('topico'));

        let dadosToString = {
            id: dad['id'],
            assunto: document.getElementById('assunto').value,
            autor: dad['autor'],
            texto: document.getElementById('texto').value
        }

        const dados = await fetch('/php/updateTopico.php',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(dadosToString)
        });
        if(dados.ok){
            const realDados = await dados.json();
            alert(realDados['msg']);
            history.pushState({},null, "/html/telaTopicosProf.html");
            location.reload();
        }else{
            return alert("Ocorreu um problema tente novamente mais tarde!");
        }
                
    }catch(error){
        console.log(error);
    }
}

async function getTopicosEditar(){
    try{
        let topicoEd = localStorage.getItem('editar');
        const dados = await fetch('/php/getSingleTopico.php',{
            method: 'POST',
            body: topicoEd
        });

        if(dados.ok){
            const realDados = await dados.json();


            document.getElementById('assunto').value = realDados['assunto'];
            document.getElementById('texto').value = realDados['texto'];

            let topc = new Topico(realDados['id'],realDados['assunto'],realDados['autor'],realDados['texto']);

            let tempTopico = {"id":topc.getId(),"assunto":topc.getAssunto(),"autor":topc.getAutor(),"texto":topc.getTexto()};
            localStorage.setItem('topico', JSON.stringify(tempTopico));
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText);
        }
    }catch(error){
        console.error(error);
    }
}


