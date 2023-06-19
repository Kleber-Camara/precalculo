    'use strict'

    document.getElementById('enviar').onclick = async function enviarEmail(){
        let random = Math.random().toString(36).slice(-10);
        let email = document.getElementById('email').value;
        let dadosBD = {
            email: email,
            senha: random
        }

        try{
            const dados = await fetch('/php/changePassByEmail.php',{
                method: 'POST',
                body: JSON.stringify(dadosBD)
            });

            if(dados.ok){
                const realDados = await dados.json();
            }   
        }catch(error){
            console.log(error);
        }
        alert('Verifique o e-mail informado!');
    }

    document.getElementById('cancelar').onclick = function cancelar(){
        history.pushState({},null, "/index.html");
        location.reload();
    }