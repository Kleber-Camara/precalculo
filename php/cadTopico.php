<?php

    try{
        include_once('topico.php');

       
        $dados = json_decode(file_get_contents('php://input'), true);

        if(topicoExists($dados['assunto']) == false){
            createTopico($dados['assunto'],$dados['texto'],$dados['autor']);
            echo json_encode(['staus' => true, 'msg' => 'Topico cadastrado com sucesso!']);
        }else{
            echo json_encode(['staus' => false, 'msg' => 'Um assunto com este tema ja foi cadastrado!']);
        }
    }catch(PDOException $e){
        $e->getMessage();
    }