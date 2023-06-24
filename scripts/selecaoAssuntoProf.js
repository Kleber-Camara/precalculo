'use strict'

window.onload = function(){
    carregaAssuntos();
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

async function deletaQuestao(questao){

    localStorage.setItem('deletar', questao);

    let con = confirm("Deseja deletar a questão '"+questao+"'?");
    if(con == true){
        try{

            let nomeQuest = localStorage.getItem('deletar');
            const dados = await fetch('/php/deleteQuestao.php',{
                method: 'POST',
                body: nomeQuest
            });
            alert(dados);
            if(dados.ok){
                const realDados = await dados.json();
                alert(realDados['msg']);
            }else{
                throw new Error(dados.status);
            }

        }catch(Error){
            console.log(Error);
        }
    }
}

async function toUpdateScreen(questao){

    localStorage.setItem('enun', questao);

    history.pushState({},null, "/html/editQuest.html");
    location.reload();
}

document.getElementById("sair").onclick = function voltar(){
    history.pushState({},null, "/html/mainProfessor.html");
    location.reload();
}

document.getElementById("questao").onclick = async function pesqQuest(e){
    e.preventDefault();
    const selected = document.querySelector('#assuntos');
    try {
        const dados = await fetch('/php/getQuestoesByAss.php',{
            method: 'POST',
            body: JSON.stringify(selected.value)
        });

        if(dados.ok){
            const realDados = await dados.json();
            document.getElementById("questoes").innerHTML = " ";
            for(var obj in realDados){
                let label = document.createElement('label');
                let div = document.createElement('div');
                let br = document.createElement('br');
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Deletar";
                deleteButton.id = "deletar"+realDados[obj];
                deleteButton.className = "botoesQuestoes";

                const editButton = document.createElement('button');
                editButton.textContent = "Editar";
                editButton.id = "editar"+realDados[obj];
                editButton.className = "botoesQuestoes";

                label.textContent = realDados[obj];
                label.className = "enunciado";

                div.innerHTML = ' ';
                div.id = "div"+realDados[obj];

                document.getElementById("questoes").appendChild(div);
                document.getElementById("div"+realDados[obj]).appendChild(label);
                document.getElementById("div"+realDados[obj]).appendChild(br);
                document.getElementById("div"+realDados[obj]).appendChild(deleteButton);
                document.getElementById("div"+realDados[obj]).appendChild(editButton);
            }

            for(var obj in realDados){
                let temp = document.getElementById("deletar"+realDados[obj]);
                let tempObj = realDados[obj];

                temp.addEventListener('click', () =>{
                    deletaQuestao(tempObj);
                });

                temp = document.getElementById("editar"+realDados[obj]);
                temp.addEventListener('click', () =>{
                    toUpdateScreen(tempObj);
                })
            }
        }
        
    }catch(error){
        console.error(error);
    }
}