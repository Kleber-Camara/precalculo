'use strict'

function deletaTopico(topico){
    localStorage.setItem(topico,topico);
    console.log(localStorage.getItem(topico))
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
                document.body.appendChild(div);
                document.body.appendChild(label);
                document.body.appendChild(buttonEditar);
                document.body.appendChild(buttonDeletar);
                document.body.appendChild(buttonVer);
            }
            for(var obj in realDados){
                
                let temp = document.getElementById('deletar'+realDados[obj]);
                console.log(temp.id)
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
        }else{

            throw new Error(dados.status);
        }

    }catch(error){
        console.error(error);
    }

}

const teste = getTopicos();