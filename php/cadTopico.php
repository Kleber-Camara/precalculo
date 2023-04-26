<?php

    try{
        include_once('topico.php');

        $assunto = $_POST['assunto'];
        $texto = $_POST['texto'];
        $autor = $_POST['autor'];

        if(topicoExists($assunto) == false){
            createTopico($assunto,$texto,$autor);
            echo json_encode(['staus' => true, 'msg' => 'Topico cadastrado com sucesso!']);
        }else{
            echo json_encode(['staus' => false, 'msg' => 'Um assunto com este tema ja foi cadastrado!']);
        }
    }catch(PDOException $e){
        $e->getMessage();
    }