<?php

    try{
        include_once('topico.php');

        $listTopicos = getAllTopicos();

        if($listTopicos != null){
            header('Content-Type: application/json');
            echo json_encode($listTopicos);
        }else{
            echo json_encode(['msg' => 'nao foi encontrado']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }