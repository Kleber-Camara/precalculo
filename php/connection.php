<?php
    
    //Cria a conexao com o banco
    function getConn(){
        $host = "localhost:3306";  
        $user = "root";
        $password = "root123@";
        $conn = new PDO('mysql:host='.$host.';dbname=precalculo', $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;
    }
    