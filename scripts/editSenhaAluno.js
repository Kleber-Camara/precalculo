'use strict'


window.onload = function(){
    getSenha();
}

document.getElementById("cancelar").onclick = function cancelar(){
    history.pushState({},null, "/html/perfilAluno.html");
    location.reload();
}

document.getElementById("atualizar").onclick = async function atualizarSenha(){
    let senha = document.getElementById('senha').value;
    let novaSenha = document.getElementById('novaSenha').value;
    let novaSenha2 = document.getElementById('novaSenha2').value;
    let ns = localStorage.getItem('ns');
    if(novaSenha.length >= 8){
        if(senha == ns){
            if(novaSenha == novaSenha2){
                try{
                    let id = localStorage.getItem("perfil");
                    let dadosToString = {
                        id: id,
                        senha: novaSenha
                    }
                    console.log(dadosToString);
                    const dados = await fetch('/php/updateSenhaAluno.php',{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify(dadosToString)
                    });

                    if(dados.ok){
                        alert("Atualização Efetuada com sucesso");
                        history.pushState({},null, "/html/perfilAluno.html");
                        location.reload();
                    }else{
                        throw new Error(' : ' + dados.status + ' : ' + dados.statusText)
                    }
                }catch(Error){
                    console.log(Error);
                }

            }else{
                alert("As novas senhas estão incorretas");
            }
        }else{
            alert("Senha anterior esta incorreta!");
        }
    }else{
        alert("Senha não atingiu o tamanho minimo, por favor escreva uma senha mais longa!");
    }
}

async function getSenha(){
    try{
        let id = localStorage.getItem("perfil");

        const dados = await fetch('/php/getSenhaAluno.php',{
            method: 'POST',
            body: JSON.stringify(id)
        });

        if(dados.ok){
            const realDados = await dados.json();
            console.log(realDados)
            localStorage.setItem('ns', realDados);
            
        }else{
            throw new Error(' : ' + dados.status + ' : ' + dados.statusText)
        }
    }catch(Error){
        console.log(Error);
    }
}