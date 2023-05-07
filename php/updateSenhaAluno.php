<?php

    try{
        include_once('aluno.php');
        include_once('login.php');

        $id = json_decode(file_get_contents('php://input'),true);

        $logId = getIdLoginAluno($id['id']);
        if($logId != null){
            updateSenha($logId, $id['senha']);

            header('Content-Type: application/json');
            echo json_encode(['senha' => $senha, 'msg' => 'Senha atualizada com sucesso!']);
        }else{
            header('Content-Type: application/json');
            echo json_encode(['msg' => 'Senha atualizada com sucesso!']);
        }
        
    }catch(PDOException $e){
        $e->getMessage();
    }