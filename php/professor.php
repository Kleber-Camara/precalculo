<?php

    function createProfessor($nome,$email,$idLogin){

    }

    function getProfById($idProf){
        try{
            include_once('connection.php');
            $conn = getConn();
            $sql = 'SELECT * FROM professor WHERE idLogin=:loginId';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':loginId',$idProf);
            $stmt->execute();

            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $obj = ['status' => true,'type' => 'professor', 'id' => $row['id'],'nome' => $row['nome'], 'email' => $row['email'],'idLogin' => $row['idLogin']];
                }
                $conn = null;
                return $obj;
            }
            return null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getBySelfIdProf($idProf){
        try{
            include_once('connection.php');
            $conn = getConn();
            $sql = 'SELECT * FROM professor WHERE id=:loginId';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':loginId',$idProf);
            $stmt->execute();

            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $obj = ['status' => true,'type' => 'professor', 'id' => $row['id'],'nome' => $row['nome'], 'email' => $row['email'],'idLogin' => $row['idLogin']];
                }
                $conn = null;
                return $obj;
            }
            return null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function updateProf($id, $nome, $email){
        try{
            include_once('connection.php');

            $conn = getConn();

            $sql = 'UPDATE professor SET nome=:nome, email=:email WHERE id=:id';

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':nome',$nome);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':id',$id);

            $stmt->execute();

            $stmt = null;
            $conn = null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getIdLogin($id){
        try{
            include_once('connection.php');
            $conn = getConn();
            $sql = 'SELECT * FROM professor WHERE id=:id';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id',$id);
            $stmt->execute();

            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $obj = $row['idLogin'];
                }
                $stmt = null;
                $conn = null;
                return $obj;
            }
            return null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }