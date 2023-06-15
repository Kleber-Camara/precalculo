<?php

    try{
        include_once('questao.php');
        $enum = file_get_contents('php://input');

        deletaByEnun($enum);

        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Questão deletada com sucesso!']);
    }catch(PDOException $e){
        $e->getMessage();
    }