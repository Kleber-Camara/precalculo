'use strict'

window.onload = function(){
    carregaAssuntos();
}

document.getElementById('sair').onclick = function getBackAluno(){
    history.pushState({},null,"/html/mainAluno.html");
    location.reload();
}

document.getElementById('questao').onclick = function resolverQuestoes(){
    const selected = document.querySelector('#assuntos');
    localStorage.setItem('assunto', selected.value);
    history.pushState({},null,"/html/questao.html");
    location.reload();
}

async function carregaAssuntos(){
    try{
        const dados = await fetch('/php/getAssunto.php',{
            method: 'POST'
        });

        if(dados.ok){
            const realDados = await dados.json();
            for(var obj in realDados){
                const op = document.createElement('option');
                op.value = realDados[obj];
                op.innerHTML = realDados[obj];
                document.getElementById('assuntos').appendChild(op);
            }
        }else{
            throw new Error(dados.status);
        }
    }catch(Error){

    }
}