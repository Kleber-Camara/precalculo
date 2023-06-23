<?php
    include_once('aluno.php');
    include_once('professor.php');

    $email = file_get_contents('php://input');

    if((emailExistsAluno($email)) or (emailExistsProf($email))){
        echo json_encode(['msg' => 'Email ja cadastrado!']);
    }else{
        echo json_encode(['msg' => 'not']);
    }