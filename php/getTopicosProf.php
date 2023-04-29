<?php

    try{
        include_once('topico.php');

        //$autor = $_POST['_nome'];
        $user = json_decode(file_get_contents('php://input'), true);
        $autor = $user['_nome'];

        $listTopicos = getAllFromAutor($autor);
       // $_SESSION['resposta'] = echo $_POST;

        if($listTopicos != null){
            header('Content-Type: application/json');
            echo json_encode($listTopicos);
        }else{
            echo json_encode(['msg' => 'nao foi encontrado']);
        }
    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }