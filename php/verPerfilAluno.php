<?php 
    try{
        include_once('aluno.php');

        $id = json_decode(file_get_contents('php://input'));

        
        $user = getSelfByIdAluno($id);
        if($user != null){
            header('Content-Type: application/json');
            echo json_encode($user);
        }else{
            header('Content-Type: application/json');
            echo json_encode(['msg' => 'Não Encontrado.']);
        }

    }catch(PDOException $e){
        $e->getMessage();
    }
    
