<?php

    try{
        include_once('questao.php');
        $enun = file_get_contents('php://input');

        $quest = getSingleQuestByEnun($enun);

        if($quest != null){
            header('Content-Type: application/json');
            echo json_encode($quest);
        }else{
            echo json_encode(['msg' => 'Nao encontrado!']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }