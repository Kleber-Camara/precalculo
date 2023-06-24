<?php

    try{
        include_once('topico.php');
        $top = json_decode(file_get_contents('php://input'), true);
        $id = $top['id'];
        $assunto = $top['assunto'];
        $autor = $top['autor'];
        $texto = nl2br($top['texto']);

        updateTopico($id,$assunto,$autor,$texto);
        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Atualizado com sucesso']);
    }catch(PDOException $e){
        echo Json_encode($e->getMessage());
    }