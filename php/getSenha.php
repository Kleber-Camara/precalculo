<?php

    try{
        include_once('professor.php');
        include_once('login.php');
        $id = json_decode(file_get_contents('php://input'));

        $logId = getIdLogin($id);

        $senha = getSenhaById($logId);

        header('Content-Type: application/json');
        echo json_encode($senha);
    }catch(PDOException $e){
        $e->getMessage();
    }