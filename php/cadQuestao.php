<?php

    try{
        include_once('questao.php');
        $q = json_decode(file_get_contents('php://input'), true);
        
        createQuestao($q['assunto'],$q['enun'],$q['opa'],$q['opb'],$q['opc'],$q['resp']);

    }catch(PDOException $e){
        echo json_encode(['msg' => $e->getMessage()]);
    }