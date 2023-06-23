<?php

    //Função que insere no banco de dados um novo login
    function createLogin($login, $senha){
        try{
            include_once('connection.php');
            
            $conn = getConn();

            $sql = 'INSERT INTO login(id, login, senha) VALUES (default, :login, :senha);';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':login',$login);
            $stmt->bindParam(':senha',$senha);
            $stmt->execute();
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    //Função que procura o identificador de um login especifico e o retorna
    function getID($login, $senha){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM login';

            $stmt = $conn->prepare($sql);
            
            $stmt->execute();
            
            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row_id = $stmt->fetch(PDO::FETCH_ASSOC)){
                    
                    if ($row_id['login'] == $login and $row_id['senha'] == $senha ){
                        $conn = null;
                        return $row_id['id'];
                    }
                }
                $conn = null;
                return (-1);
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    //Função que verifica a existencia de um login e retorna um boolean informando o resultado
    function userExists($login){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM login WHERE login=:login';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':login',$login);
            $stmt->execute();

            if(($stmt) and ($stmt->fetch(PDO::FETCH_ASSOC))){
                $conn = null;
                return true;
            }else{
                $conn = null;
                return false;
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getLoginById($id){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT * FROM login WHERE id=:id';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',$id);
            $stmt->execute();

            if(($stmt) and $stmt->rowCount()!=0){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $login = $row['login'];
                }

                $stmt = null;
                $conn = null;

                return $login;
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getSenhaById($id){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'SELECT senha FROM login WHERE id=:id';

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',$id);
            $stmt->execute();

            if(($stmt) and $stmt->rowCount()!=0){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $senha = $row['senha'];
                }

                $stmt = null;
                $conn = null;

                return $senha;
            }
        }catch(PDOException $e){
            $e->getMessage();
        }
    }


    function updateSenha($id, $senha){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'UPDATE login SET senha=:senha WHERE id=:id';

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':senha',$senha);
            $stmt->bindParam(':id',$id);

            $stmt->execute();

            $stmt = null;
            $conn = null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }