'use strict'

const myForm = document.getElementById("formTopico");

myForm.addEventListener('submit', criarTopico);

document.getElementById('cancelar').onclick = function cancelar(){
    history.pushState({},null, "/index.html");
    location.reload();
};


async function criarTopico(e){
    e.preventDefault();

    userData = localStorage.getItem("user");

    const formData = new FormData(this);
    const searchParams = new URLSearchParams();

    for(const par of formData){
        searchParams.append(par[0],par[1],userData['nome']);
    }


    const dados = await fetch('')
}