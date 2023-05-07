<?php

    try{
        include_once('aluno.php');

        $perfil = json_decode(file_get_contents('php://input'), true);
        $aluno = getSelfByIdAluno($perfil['id']);

        updateAluno($perfil['id'],$perfil['nome'],$perfil['email'],$perfil['curso']);
        
        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Atualizado com sucesso']);
    }catch(PDOException $e){
        $e->getMessage();
    }