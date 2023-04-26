'use strict'
let dadosUser = JSON.parse(localStorage.getItem("user"));
document.getElementById('autor').value = dadosUser['_nome'];

const myForm = document.getElementById("formTopico");

myForm.addEventListener('submit', criarTopico);

document.getElementById('cancelar').onclick = function cancelar(){
    history.pushState({},null, '/html/mainProfessor.html');
    location.reload();
};


async function criarTopico(e){
    e.preventDefault();

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const par of formData){
        searchParams.append(par[0],par[1],par[2]);
    }


    const dados = await fetch('/php/cadTopico.php',{
        method: 'POST',
        body: formData
    });

    const realDados = await dados.json();

    if(realDados['status'] == true){
        document.getElementById("assunto").value = " ";
        document.getElementById("autor").value = " ";
        document.getElementById("texto").value = " ";
    }

    return alert(realDados['msg']);
}