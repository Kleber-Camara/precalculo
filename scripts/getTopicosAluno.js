'use strict'

function verTopico(topico){
    localStorage.setItem(topico,topico);

    localStorage.setItem('ver', topico);
    history.pushState({},null,"/html/telaTopicoAluno.html");
    location.reload();
}

document.getElementById("sair").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/mainAluno.html");
    location.reload();
}

async function getTopicos(){
    try{
        let user = JSON.parse(localStorage.getItem("user"));

        const dados = await fetch('/php/getTopicosAluno.php',{
            method: 'POST',
        });

        if(dados.ok){
            const realDados = await dados.json();
            if(realDados['msg'] == null){
                for(var obj in realDados){
                    let div = document.createElement('div');
                    let label = document.createElement('label');
                    
                    const buttonVer = document.createElement('button');
                    buttonVer.textContent = "Ver";
                    buttonVer.id = "ver"+realDados[obj];
                    buttonVer.className = "botoesTopico";

                    label.textContent = realDados[obj];
                    label.className = "tituloTopico";

                    div.innerHTML = ' ';
                    div.id = "div"+realDados[obj];
                    document.getElementById("formTopico").appendChild(div);
                    document.getElementById("div"+realDados[obj]).appendChild(label);
                    document.getElementById("div"+realDados[obj]).appendChild(buttonVer);
                    
                }
                for(var obj in realDados){                    
                    let temp = document.getElementById('ver'+realDados[obj]);
                    let tempObj = realDados[obj];
                    temp.addEventListener('click', ()=>{
                        verTopico(tempObj);
                    });
                }
            }
        }else{

            throw new Error(dados.status);
        }

    }catch(error){
        console.error(error);
    }

}

const teste = getTopicos();