<?php

    try{
        include_once('professor.php');
        include_once('topico.php');

        $perfil = json_decode(file_get_contents('php://input'), true);
        $prof = getBySelfIdProf($perfil['id']);
        updateProf($perfil['id'],$perfil['nome'],$perfil['email']);
        updateTopicoNome($prof['nome'], $perfil['nome']);
        
        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Atualizado com sucesso']);
    }catch(PDOException $e){
        $e->getMessage();
    }