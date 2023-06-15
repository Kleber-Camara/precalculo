<?php

    try{
        include_once('questao.php');
        $assunto = json_decode(file_get_contents('php://input'));
        $listQuestao = getAllEnunByAssunto($assunto);

        if($listQuestao != null){
            header('Content-Type: application/json');
            echo json_encode($listQuestao);
        }else{
            echo json_encode(['msg' => 'nao foi encontrado']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }