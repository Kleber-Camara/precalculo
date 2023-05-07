'use strict'
import Aluno from "./entity/aluno.js";

//Recupera os dados do usuario para logar
let dadosUser = JSON.parse(localStorage.getItem("user"));
//Cria uma entidade Aluno com os dados do login

let aluno = new Aluno(dadosUser['_id'],dadosUser['_nome'],'-', '-',-1,dadosUser['email'],dadosUser['curso'])

document.getElementById("texto").innerHTML = "Bem vindo "+aluno.getNome()+"!";

document.getElementById("sair").onclick = function paginaTopicos(){
    history.pushState({},null, "/index.html");
    location.reload();
}

document.getElementById('perfil').onclick = function paginaPerfil(){
    localStorage.setItem('perfil', aluno.getId());
    history.pushState({},null, "/html/perfilAluno.html");
    location.reload();
}

document.getElementById('topicos').onclick = function paginaTopico(){
    localStorage.setItem('perfil', aluno.getId());
    history.pushState({},null, "/html/telaTopicosAluno.html");
    location.reload();
}