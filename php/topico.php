<?php

    //Função que insere no banco de dados um novo topico
    function createTopico($assunto, $texto, $autor){
        try{
            require_once('connection.php');

            $conn = getConn();

            $sql = 'INSERT INTO topico (id,assunto, autor, texto) VALUES (default,:assunto,:autor,:texto)';

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
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM topico WHERE assunto=:assunto';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':assunto',$assunto);
            $stmt->execute();
            
            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $result = ['id' => $row['id'],'autor' => $row['autor'],'assunto' => $row['assunto'],'texto' => $row['texto']];
                }
            }else{
                $result = null;
            }
            return $result;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getTopicos(){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM topico';

            $stmt = $conn->prepare($sql);
            
            $stmt->execute();
            
            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $result = ['id' => $row['id'],'autor' => $row['autor'],'assunto' => $row['assunto'],'texto' => $row['texto']];
                }
            }else{
                $result = null;
            }
            return $result;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function updateTopico($id,$assunto,$autor,$texto){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'UPDATE topico SET assunto=:assunto, autor=:autor, texto=:texto WHERE id=:id';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':assunto',$assunto);
            $stmt->bindParam(':autor',$autor);
            $stmt->bindParam(':texto',$texto);
            $stmt->bindParam(':id',$id);

            $stmt->execute();

            $conn = null;
            $stmt = null;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function updateTopicoNome($autor,$novoAutor){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'UPDATE topico SET autor=:novoAutor WHERE autor=:autor';

            $stmt = $conn->prepare($sql);
            
            $stmt->bindParam(':novoAutor',$novoAutor);
            $stmt->bindParam(':autor',$autor);

            $stmt->execute();

            $conn = null;
            $stmt = null;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function deletaByName($assunto){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'DELETE FROM topico WHERE assunto=:assunto';

            $stmt = $conn->prepare($sql);
            
            $stmt->bindParam(':assunto',$assunto);

            $stmt->execute();

            $conn = null;
            $stmt = null;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
