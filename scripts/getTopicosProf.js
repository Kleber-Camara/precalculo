'use strict'

function deletaTopico(topico){
    localStorage.setItem(topico,topico);
    console.log(localStorage.getItem(topico))
    console.log("Excluindo "+topico);
}

async function updateTopico(topico){
    console.log("Editando "+topico);
}


async function getTopicos(){
    try{
    let user = JSON.parse(localStorage.getItem("user"));
    let u = { user };

    console.log(user);
    const dados = await fetch('/php/getTopicosProf.php',{
        method: 'POST',
        body: JSON.stringify(user)
    });
    console.log(dados)
    if(dados.ok){
        const realDados = await dados.json();

        for(var obj in realDados){
            let div = document.createElement('div');
            let label = document.createElement('label');
            const buttonEditar = document.createElement('button');
            buttonEditar.textContent = "Editar";
            buttonEditar.addEventListener('click',() =>{
                updateTopico(realDados[obj]);
            });
            const buttonDeletar = document.createElement('button');
            buttonDeletar.textContent = "Deletar";
            buttonDeletar.id ="deletar"+realDados[obj];
            console.log("deletar"+realDados[obj])
            /*buttonDeletar.addEventListener('click',() =>{
                deletaTopico(realDados[obj]);
            });*/
            const buttonVer = document.createElement('button');
            buttonVer.textContent = "Ver"
            label.textContent = realDados[obj];
            div.innerHTML = ' ';
            document.body.appendChild(div);
            document.body.appendChild(label);
            document.body.appendChild(buttonEditar);
            document.body.appendChild(buttonDeletar);
            console.log(realDados[obj]);
        }
        for(var obj in realDados){
            
            let temp = document.getElementById('deletar'+realDados[obj]);
            console.log(temp.id)
            let tempObj = realDados[obj];
            temp.addEventListener('click',() =>{
                console.log(realDados[obj])
                deletaTopico(tempObj);
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