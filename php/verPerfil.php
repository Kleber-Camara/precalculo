<?php 
    try{
        include_once('professor.php');
        $id = json_decode(file_get_contents('php://input'));

        $prof = getBySelfIdProf($id);

        if($prof != null){
            header('Content-Type: application/json');
            echo json_encode($prof);
        }else{
            header('Content-Type: application/json');
            echo json_encode(['msg' => 'Não Encontrado.']);
        }

    }catch(PDOException $e){
        $e->getMessage();
    }
    
