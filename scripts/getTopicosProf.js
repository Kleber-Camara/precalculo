'use strict'

async function deletaTopico(topico){
    localStorage.setItem(topico,topico);
    
    localStorage.setItem('deletar',topico);
    let con = confirm("Deseja deletar o topico "+topico+"?");
    if(con == true){
        try{
            let nomeTop = localStorage.getItem('deletar');

            const dados = await fetch('/php/deletaTopico.php',{
                method: 'POST',
                body: JSON.stringify(nomeTop)
            });

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

function updateTopico(topico){
    localStorage.setItem(topico,topico);

    localStorage.setItem('editar', topico);
    history.pushState({},null,"/html/editTopico.html");
    location.reload();
}

function verTopico(topico){
    localStorage.setItem(topico,topico);

    localStorage.setItem('ver', topico);
    history.pushState({},null,"/html/telaTopico.html");
    location.reload();
}

document.getElementById("sair").onclick = function paginaTopicos(){
    history.pushState({},null, "/html/mainProfessor.html");
    location.reload();
}

async function getTopicos(){
    try{
        let user = JSON.parse(localStorage.getItem("user"));

        const dados = await fetch('/php/getTopicosProf.php',{
            method: 'POST',
            body: JSON.stringify(user)
        });

        if(dados.ok){
            const realDados = await dados.json();
            if(realDados['msg'] == null){
                for(var obj in realDados){
                    let div = document.createElement('div');
                    let label = document.createElement('label');

                    const buttonEditar = document.createElement('button');
                    buttonEditar.textContent = "Editar";
                    buttonEditar.id = "editar"+realDados[obj];
                    buttonEditar.className = "botoesTopico";
                    
                    const buttonDeletar = document.createElement('button');
                    buttonDeletar.textContent = "Deletar";
                    buttonDeletar.id ="deletar"+realDados[obj];
                    buttonDeletar.className = "botoesTopico";
                    
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
                    document.getElementById("div"+realDados[obj]).appendChild(buttonEditar);
                    document.getElementById("div"+realDados[obj]).appendChild(buttonDeletar);
                    document.getElementById("div"+realDados[obj]).appendChild(buttonVer);
                    
                }
                for(var obj in realDados){
                    
                    let temp = document.getElementById('deletar'+realDados[obj]);
                    let tempObj = realDados[obj];
                    temp.addEventListener('click',() =>{
                        deletaTopico(tempObj);
                    });

                    temp = document.getElementById('editar'+realDados[obj]);
                    tempObj = realDados[obj];
                    temp.addEventListener('click', () =>{
                        updateTopico(tempObj);
                    });
                    
                    temp = document.getElementById('ver'+realDados[obj]);
                    tempObj = realDados[obj];
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