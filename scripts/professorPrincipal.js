'use strict'

import Professor from "./entity/professor.js";

//Recupera os dados do usuario para logar
let dadosUser = JSON.parse(localStorage.getItem("user"));

//Cria uma entidade Professor com os dados do login
let prof = new Professor(dadosUser['_id'],dadosUser['_nome'],'-', '-',-1,dadosUser['email'])

document.getElementById("texto").innerHTML = "Bem vindo "+prof.getNome()+"!";

document.getElementById("sair").onclick = function sair(){
    history.pushState({},null, "/index.html");
    location.reload();
}

document.getElementById("topico").onclick = function paginaTopicos(){
    prof.cadastrarTopico();
}

document.getElementById("questao").onclick = function paginaQuestao(){
    prof.cadastrarQuestoes();
}

document.getElementById("perfil").onclick = function paginaPerfil(){
    history.pushState({},null, "/html/perfilProfessor.html");
    location.reload();
}