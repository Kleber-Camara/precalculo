 <?php

    try{

        //Inclui as funcoes de login e aluno
        include_once('aluno.php');
        include_once('login.php');
        
        //Pega os dados do formulario
        $user = json_decode(file_get_contents('php://input'), true);
        
        //Verifica se o login existe e faz o cadastro dos dados se existir, 
        //envia uma menssagem informando o status da operação
        if(userExists($user['login']) == false){
            createLogin($user['login'],$user['senha']);
            $idLogin = getID($user['login'], $user['senha']);
            createAluno($user['nome'], $user['curso'], $user['email'], $idLogin);
            echo json_encode(['msg' => 'Cadastro realizado com sucesso!', 'status' => true]);
        }else{
            echo json_encode(['msg' => 'Login existente!', 'status' => false]);
        }

    }catch (PDOException $e){
        $e->getMessage();
    }
    