<?php

    try{
        include_once('questao.php');

        $q = json_decode(file_get_contents('php://input'), true);
        
        updateQuestao($q['oldEnun'],$q['assunto'],$q['enun'],$q['opa'],$q['opb'],$q['opc'],$q['resp'],);
        
        header('Content-Type: application/json');
        echo json_encode(['msg' => 'Atualizado com sucesso']);
    }catch(PDOException $e){
        $e->getMessage();
    }