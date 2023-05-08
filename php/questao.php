<?php

function createQuestao($assunto, $enun, $opa, $opb, $opc, $opcerta){
    try{
        include_once('connection.php');

        $conn = getConn();

        $sql = 'INSERT INTO questao (assunto, enunciado, opa, opb, opc, opcerta) VALUES (:ass,:enun,:opa,:opb,:opc,:opcer)';

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':ass',$assunto);
        $stmt->bindParam(':enun',$enun);
        $stmt->bindParam(':opa',$opa);
        $stmt->bindParam(':opb',$opb);
        $stmt->bindParam(':opc',$opc);
        $stmt->bindParam(':opcer',$opcerta);
        $stmt->execute();
        
        $conn = null;
        $stmt = null;
    }catch(PDOException $e){
        $e->getMessage();
    }
}

function getAllAssuntos(){
    try{
        include_once('connection.php');

        $conn = getConn();
        $sql = "SELECT * FROM questao";
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        $listAssunto = array();

        if(($stmt) and ($stmt->rowCount() != 0)){

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                if(($listAssunto != null)){
                    if(in_array($row['assunto'], $listAssunto) == false){
                        array_push($listAssunto, $row['assunto']);
                    }
                }else{
                    array_push($listAssunto, $row['assunto']);
                }
            }
            return $listAssunto;
        }
        return null;

    }catch(PDOException $e){
        $e->getMessage();
    }
}
