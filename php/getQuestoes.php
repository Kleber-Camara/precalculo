<?php

    try{
        include_once('questao.php');
        $assunto = json_decode(file_get_contents('php://input'));

        $questoes = getAllFromAssunto($assunto);

        if($questoes != null){
            header('Content-Type: application/json');
            echo json_encode($questoes);
        }else{
            echo json_encode(['msg' => 'Nao encontrado!']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }