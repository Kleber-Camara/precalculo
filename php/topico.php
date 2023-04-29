<?php

    //Função que insere no banco de dados um novo topico
    function createTopico($assunto, $texto, $autor){
        try{
            require_once('connection.php');

            $conn = getConn();

            $sql = 'INSERT INTO topico (assunto, autor, texto) VALUES (:assunto,:autor,:texto)';

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':assunto',$assunto);
            $stmt->bindParam(':autor',$autor);
            $stmt->bindParam(':texto',$texto);
            $stmt->execute();
            $conn = null;
            $stmt = null;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function topicoExists($assunto){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM topico WHERE assunto=:assunto';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':assunto',$assunto);
            $stmt->execute();

            if(($stmt) and ($stmt->fetch(PDO::FETCH_ASSOC))){
                $conn = null;
                $stmt = null;
                return true;
            }else{
                $conn = null;
                $stmt = null;
                return false;
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getAllFromAutor($autor){

        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM topico WHERE autor=:autor';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':autor',$autor);
            $stmt->execute();

            $listTopico = array();
            
            if(($stmt) and ($stmt->rowCount() != 0)){
                
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    array_push($listTopico, $row['assunto']);
                }

                $conn = null;
                $stmt = null;
                return $listTopico;
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getTopicoFromAssunto($assunto){
        echo 'topico';
    }