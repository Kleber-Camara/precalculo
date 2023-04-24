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
        }catch(PDOException $e){
            $e->getMessage();
        }
    }