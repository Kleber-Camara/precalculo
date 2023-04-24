<?php

    try{

        //Inclui as funcoes de login e aluno
        include_once('aluno.php');
        include_once('login.php');

        //Pega os dados do formulario
        $nomeAluno = $_POST['nome_aluno'];
        $curso = $_POST['curso'];
        $email = $_POST['email'];

        $login = $_POST['login'];
        $senha = $_POST['senha'];
       
        //Verifica se o login existe e faz o cadastro dos dados se existir, 
        //envia uma menssagem informando o status da operação
        if(userExists($login) == false){
            createLogin($login,$senha);
            $idLogin = getID($login, $senha);
            createAluno($nomeAluno, $curso, $email, $idLogin);
            echo json_encode(['msg' => 'Cadastro realizado com sucesso!', 'status' => true]);
        }else{
            echo json_encode(['msg' => 'Login existente!', 'status' => false]);
        }

    }catch (PDOException $e){
        $e->getMessage();
    }
    