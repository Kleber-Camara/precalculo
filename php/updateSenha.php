<?php

    try{
        include_once('professor.php');
        include_once('login.php');
        $id = json_decode(file_get_contents('php://input'),true);

        $logId = getIdLogin($id['id']);

        updateSenha($logId, $id['senha']);

        header('Content-Type: application/json');
        echo json_encode(['senha' => $senha, 'msg' => 'Senha atualizada com sucesso!']);
    }catch(PDOException $e){
        $e->getMessage();
    }