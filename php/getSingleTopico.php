<?php

    try{
        include_once('topico.php');
        $assunto = file_get_contents('php://input');

        $topico = getTopicoFromAssunto($assunto);

        if($topico != null){
            header('Content-Type: application/json');
            echo json_encode($topico);
        }else{
            echo json_encode(['msg' => 'Nao encontrado!']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }