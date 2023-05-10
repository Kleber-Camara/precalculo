'use strict'
import Questao from "./entity/questao.js";

var listQuest = Array(); 
var listaReal = Array();
var selecionado = '';
var corretas = 0;

window.onload = function(){
    carrgarQuestoes();
}

document.getElementById('voltar').onclick = function voltar(){
    history.pushState({},null, "/html/criaQuestionario.html");
    location.reload();
}

document.getElementById('alta').onclick = function altA(e){
    e.preventDefault();
    let alt = document.getElementById('alta').innerHTML;
    let enunciado = document.getElementById('Enunciado').innerHTML;
    verificaCorreta(alt, enunciado);
    
}

document.getElementById('altb').onclick = function altA(e){
    e.preventDefault()
    let alt = document.getElementById('altb').innerHTML;
    let enunciado = document.getElementById('Enunciado').innerHTML;
    verificaCorreta(alt, enunciado);
    
}

document.getElementById('altc').onclick = function altA(e){
    e.preventDefault()
    let alt = document.getElementById('altc').innerHTML;
    let enunciado = document.getElementById('Enunciado').innerHTML;
    verificaCorreta(alt, enunciado);
    
}

function verificaCorreta(alt, enunciado){
    var c;
    for(c = 0;c<listQuest.length;c++){
        if(listQuest[c].getEnunciado() == enunciado){
            if(listQuest[c].getCorreta() == alt){
                alert("Alternativa correta!");
                listaReal.shift();
                corretas+=1;
                selecionado = listaReal[0];
                atributionRealList();
            }else{
                alert("Alternativa incorreta!");
                listaReal.shift();
                selecionado = listaReal[0];
                atributionRealList();
            }
        }
    }
}

function atributionRealList(){
    if(listaReal.length>0){
        document.getElementById('Enunciado').innerHTML = selecionado.getEnunciado();
        document.getElementById('alta').innerHTML = selecionado.getALtA();
        document.getElementById('altb').innerHTML = selecionado.getALtB();
        document.getElementById('altc').innerHTML = selecionado.getALtC();
    }else{
        alert("Você acertou " + corretas + "/5!");
        history.pushState({},null, "/html/criaQuestionario.html");
        location.reload();
    }

}
async function carrgarQuestoes(){
    try{

        let assunto = localStorage.getItem('assunto');
        let dados = await fetch('/php/getQuestoes.php',{
            method: 'POST',
            body: JSON.stringify(assunto)
        });

        if(dados.ok){
            let realDados = await dados.json();
            if(realDados != null){
                for(var obj in realDados){
                    let quest = new Questao(realDados[obj]['assunto'],realDados[obj]['enunciado'],realDados[obj]['opa'],realDados[obj]['opb'],realDados[obj]['opc'],realDados[obj]['opcerta']);
                    listQuest.push(quest);
                }
            }

            let n = 0;
            let q = 0;

            while(q < 5){
                n = Math.floor(Math.random() * listQuest.length);
                if(listaReal.includes(listQuest[n]) == false){
                    listaReal.push(listQuest[n]);
                    q++;
                }
            }
            selecionado = listaReal[0];
            atributionRealList();
            
        }else{
            throw new Error(dados.statusText);
        }
    }catch(Error){
        console.error(Error);
    }
}