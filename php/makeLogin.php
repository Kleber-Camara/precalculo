<?php

    try{
        include_once('aluno.php');
        include_once('login.php');
        include_once('professor.php');

        $login = $_POST['login'];
        $senha = $_POST['senha'];

        $idLogin = getID($login,$senha);

        if($idLogin == -1){
            echo json_encode(['status' => false, 'msg' => 'Usuario ou senha inexistentes!']);
        }else{
            $obj = getAlunoByLoginId($idLogin);
            if($obj == null){
                $obj = getProfById($idLogin);
                
                if($obj == null){
                    echo json_encode(['status' => false, 'msg' => 'Não encontrado!']);
                }else{
                    $newObj = ['login' => $login,'senha' => $senha, 'type' => 'professor', 'status' => $obj['status'],'id' => $obj['id'],'nome' => $obj['nome'], 'email' => $obj['email'], 'idLogin' => $obj['idLogin']];
                    echo json_encode($newObj);
                }
            }else{
                $newObj = ['login' => $login,'senha' => $senha, 'type' => 'aluno', 'status' => $obj['status'],'id' => $obj['id'],'nome' => $obj['nome'], 'email' => $obj['email'], 'curso' => $obj['curso'], 'idLogin' => $obj['idLogin']];
                echo json_encode($newObj);
            }
        }
    }catch(PDOException $e){
        $e->getMessage();
    }