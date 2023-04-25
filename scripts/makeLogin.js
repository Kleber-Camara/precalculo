'use strict'

import Aluno from "./entity/aluno.js";
import Professor from "./entity/professor.js";

const form = document.getElementById("loginform");
form.addEventListener('submit', logar);

async function logar(e){
    e.preventDefault();               ///LINHA COMENTADA REMOVER DEPOIS!!!!!!!
    const formData = new FormData(this);
    const searchParams =  new  URLSearchParams();

    for(const par of formData){
        searchParams.append(par[0],par[1]);
    }

    const dados = await fetch('/php/makeLogin.php',{
        method: 'POST',
        body: formData
    });

    const realDados = await dados.json();
    console.log(realDados);
    if(realDados['status'] == false){
        return alert(realDados['msg']);
    }else{
        //console.log(realDados);
        if(realDados['type'] == 'aluno'){
            let aluno = new Aluno(realDados['id'],realDados['nome'], realDados['login'], realDados['senha'],realDados['idLogin'],realDados['email'],realDados['curso']);
            //criar json para dados do aluno antes de ir para a proxima pagina
            let dados = JSON.stringify(aluno);
            localStorage.setItem("user",dados);
            history.pushState({},null, "/html/mainAluno.html");
            location.reload();
        }else{
            let prof = new Professor(realDados['id'],realDados['nome'], realDados['login'], realDados['senha'],realDados['idLogin'],realDados['email']);
            let dados = JSON.stringify(prof);
            localStorage.setItem("user",dados);
            history.pushState({},null,"/html/mainProfessor.html");
            location.reload();
        }
    }
}