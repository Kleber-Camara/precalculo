<?php

    //Função que insere no banco de dados um novo aluno
    function createAluno($nome, $curso, $email, $idLogin){
        try{
            include_once('connection.php');
            $conn = getConn();
            $sql = 'INSERT INTO aluno(id,nome,email,curso,idLogin) VALUES (default, :nomeAluno, :email, :curso, :idLogin);';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':nomeAluno',$nome);
            $stmt->bindParam(':email',$email);
            $stmt->bindParam(':curso',$curso);
            $stmt->bindParam(':idLogin',$idLogin);
            $stmt->execute();
            $conn = null;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    function getAlunoByLoginId($loginId){
        try{
            include_once('connection.php');
            $conn = getConn();
            $sql = 'SELECT * FROM aluno WHERE idLogin=:loginId';
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':loginId',$loginId);
            $stmt->execute();

            if(($stmt) and ($stmt->rowCount() != 0)){
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $obj = ['status' => true,'type' => 'aluno', 'id' => $row['id'],'nome' => $row['nome'], 'email' => $row['email'], 'curso' => $row['curso'], 'idLogin' => $row['idLogin']];
                }
                $conn = null;
                return $obj;
            }
            return null;

        }catch(PDOException $e){
            $e->getMessage();
        }
    }