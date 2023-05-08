<?php

    try{
        include_once('questao.php');

        $assunto = getAllAssuntos();

        if($assunto != null){
            header('Content-Type: application/json');
            echo json_encode($assunto);
        }else{
            echo json_encode(['msg' => 'Nao encontrado!']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }