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

function getAllFromAssunto($assunto){
    try{
        include_once('connection.php');

        $conn = getConn();

        $sql = "SELECT * FROM questao WHERE assunto=:assunto";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':assunto',$assunto);
        $stmt->execute();
        $listQuest = array();
        if(($stmt) and ($stmt->rowCount() != 0)){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $obj = ['assunto' => $row['assunto'],'enunciado' => $row['enunciado'],'opa' => $row['opa'],'opb' => $row['opb'],'opc' => $row['opc'],'opcerta' => $row['opcerta']];
                array_push($listQuest, $obj);
            }
            return $listQuest;
        }
        return null;
    }catch(PDOException $e){
        $e->getMessage();
    }
} 

function deletaByEnun($enun){
    try{
        include_once("connection.php");

        $conn = getConn();

        $sql = 'DELETE FROM questao WHERE enunciado=:enun';

        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':enun',$enun);

        $stmt->execute();

        $conn = null;
        $stmt = null;
    }catch(PDOException $e){
        $e->getMessage();
    }
}

function getAllEnunByAssunto($assunto){
    try{
        include_once('connection.php');
        
        $conn = getConn();

        $sql = 'SELECT * FROM questao WHERE assunto=:assunto';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':assunto', $assunto);
        $stmt->execute();

        $listQuestoes = array();
        
        if(($stmt) and ($stmt->rowCount() != 0)){
            
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                array_push($listQuestoes, $row['enunciado']);
            }

            $conn = null;
            $stmt = null;
            return $listQuestoes;
        }
    }catch(PDOException $e){
        $e->getMessage();
    }
}

function updateQuestao($oldEnum, $assunto, $enum, $a, $b, $c, $r){
    try{
        include_once('connection.php');

        $conn = getConn();

        $sql = 'UPDATE questao SET assunto=:ass, enunciado=:enun, opa=:opa, opb=:opb, opc=:opc, opcerta=:resp WHERE enunciado=:oldEnun';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':ass',$assunto);
        $stmt->bindParam(':enun',$enum);
        $stmt->bindParam(':opa',$a);
        $stmt->bindParam(':opb',$b);
        $stmt->bindParam(':opc',$c);
        $stmt->bindParam(':resp',$r);
        $stmt->bindParam(':oldEnun',$oldEnum);

        $stmt->execute();

        $conn = null;
        $stmt = null;

    }catch(PDOException $e){
        $e->getMessage();
    }
}

function getSingleQuestByEnun($enum){
    try{
        include_once('connection.php');

        $conn = getConn();

        $sql = 'SELECT * FROM questao WHERE enunciado=:enun';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':enun', $enum);
        $stmt->execute();

        if(($stmt) and ($stmt->rowCount() != 0)){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                $result = ['assunto' => $row['assunto'],'enunciado' => $row['enunciado'], 'opa' => $row['opa'], 'opb' => $row['opb'], 'opc' => $row['opc'], 'opcerta' => $row['opcerta']];
            }
        }else{
            $result = null;
        }
        return $result;
    }catch(PDOException $e){
        $e->getMessage();
    }
}
