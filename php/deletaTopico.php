<?php

    try{
        include_once('topico.php');
        $nome = json_decode(file_get_contents('php://input'),true);

        deletaByName($nome);

        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Topico deletado com sucesso!']);
    }catch(PDOException $e){
        $e->getMessage();
    }