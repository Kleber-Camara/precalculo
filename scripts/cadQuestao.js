'use strict'

const myform = document.getElementById("formQuest");

document.getElementById("cancelar").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/mainProfessor.html");
    location.reload();
}

document.getElementById("cadastrar").onclick = async function cadastrarQuest(e){
    e.preventDefault();
    try{
        let opa = document.getElementById('opa').value;
        let opb = document.getElementById('opb').value;
        let opc = document.getElementById('opc').value;
        let opcerta = document.getElementById('resp').value;

        let dadosToString = {
            assunto: document.getElementById('assunto').value,
            enun: document.getElementById('enun').value,
            opa: document.getElementById('opa').value,
            opb: document.getElementById('opb').value,
            opc: document.getElementById('opc').value,
            resp: document.getElementById('resp').value
        }

        if(opa == opcerta || opb == opcerta || opc == opcerta  ){
            const dados = await fetch('/php/cadQuestao.php',{
                method: 'POST',
                body: JSON.stringify(dadosToString)
            });
            if(dados.ok){
                alert("Questão cadastrada com sucesso!");
                history.pushState({},null, "/html/mainProfessor.html");
                location.reload();
            }else{
                alert("Falha ao cadastrar a questão!");
            }
        }else{
            alert("Alternativas não correspondem a resposta!");
        }
    }catch(Error){
        console.log(error);
    }
}