'use strict'

window.onload = function(){
    preencheQuest();
}

async function preencheQuest(){
    try{
        let enun = localStorage.getItem('enun');

        const dados = await fetch('/php/getSingleQuest.php',{
            method: 'POST',
            body: enun
        });

        if(dados.ok){
            const realDados = await dados.json();

            document.getElementById('assunto').value = realDados['assunto'];
            document.getElementById('enun').value = realDados['enunciado'];
            document.getElementById('opa').value = realDados['opa'];
            document.getElementById('opb').value = realDados['opb'];
            document.getElementById('opc').value = realDados['opc'];
            document.getElementById('resp').value = realDados['opcerta'];

        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText);
        }
    }catch(Error){
        console.log(Error);
    }
}

document.getElementById("cancelar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/mainProfessor.html");
    location.reload();
}

document.getElementById("cadastrar").onclick = async function atualizarQuest(e){
    e.preventDefault();
    try{

        let oldEnun = localStorage.getItem('enun');

        let opa = document.getElementById('opa').value;
        let opb = document.getElementById('opb').value;
        let opc = document.getElementById('opc').value;
        let opcerta = document.getElementById('resp').value;

        let dadosToString = {
            oldEnun: oldEnun,
            assunto: document.getElementById('assunto').value,
            enun: document.getElementById('enun').value,
            opa: document.getElementById('opa').value,
            opb: document.getElementById('opb').value,
            opc: document.getElementById('opc').value,
            resp: document.getElementById('resp').value
        }

        if(opa == opcerta || opb == opcerta || opc == opcerta  ){
            const dados = await fetch('/php/updateQuestao.php',{
                method: 'POST',
                body: JSON.stringify(dadosToString)
            });
            if(dados.ok){
                alert("Questão Atualizada com sucesso!");
                history.pushState({},null, "/html/listaQuestoes.html");
                location.reload();
            }else{
                alert("Falha ao atualizar a questão!");
            }
        }else{
            alert("Alternativas não correspondem a resposta!");
        }
    }catch(Error){
        console.log(Error);
    }
}