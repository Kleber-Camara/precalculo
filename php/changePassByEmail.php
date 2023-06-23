<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require '../vendor/autoload.php';

    try{
        include_once('login.php');
        include_once('aluno.php');
        include_once('professor.php');

        $dados = json_decode(file_get_contents('php://input'), true);

        if((emailExistsAluno($dados['email'])) or (emailExistsProf($dados['email']))){
            $idAluno = getLoginByEmailAluno($dados['email']);
            $idProf = getLoginByEmailProf($dados['email']);

            if($idAluno != null){
                updateSenha($idAluno, $dados['senha']);
                $usuario = getLoginById($idAluno);

                $mail = new PHPMailer(true);
                try{
                    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'ufersaprecalculopdf@gmail.com';
                    $mail->Password = 'widfrntzxcunshti';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port = 465;

                    $mail->setFrom('ufersaprecalculopdf@gmail.com','UFERSA PRE-CALCULO');
                    $mail->addAddress($dados['email'],'Usuario');
                    $mail->addReplyTo('ufersaprecalculopdf@gmail.com','UFERSA PRE-CALCULO');
                    $mail->isHTML(true);
                    $mail->Subject = 'Recuperacao de senha';
                    $mail->Body = 'Ola '.$usuario.' a sua senha temporaria é '.$dados['senha'].' use-a para alterar sua senha apos o login';
                    $mail->AltBody = 'A sua senha temporaria é '.$dados['senha'].' use-a para alterar sua senha apos o login';
                    $mail->send();

                    echo 'Nova senha temporaria enviada para o email informado!';
                
                }catch(Exception $e){
                    echo 'Ocorreu um erro ao tentar enviar o e-mail tente novamente mais tarde.';
                }

                
            }else if($idProf != null){
                updateSenha($idProf, $dados['senha']);
                $usuario = getLoginById($idProf);
                $mail = new PHPMailer(true);
                try{
                    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'ufersaprecalculopdf@gmail.com';
                    $mail->Password = 'widfrntzxcunshti';
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                    $mail->Port = 465;

                    $mail->setFrom('ufersaprecalculopdf@gmail.com','UFERSA PRE-CALCULO');
                    $mail->addAddress($dados['email'],'Usuario');
                    $mail->addReplyTo('ufersaprecalculopdf@gmail.com','UFERSA PRE-CALCULO');
                    $mail->isHTML(true);
                    $mail->Subject = 'Recuperacao de senha';
                    $mail->Body = 'Ola '.$usuario.' a sua senha temporaria é '. $dados['senha'].' use-a para alterar sua senha apos o login';
                    $mail->AltBody = 'A sua senha temporaria é '. $dados['senha'].' use-a para alterar sua senha apos o login';
                    $mail->send();

                    echo 'Nova senha temporaria enviada para o email informado!';
                }catch(Exception $e){
                    echo 'Ocorreu um erro ao tentar enviar o e-mail tente novamente mais tarde.';
                }

            }else{
                echo 'Ocorreu um Erro tente novamente mais tarde!';
            }
            
        }else{

            echo 'Email não cadastrado!';
        }
    }catch(PDOException $e){
        $e->getMessage();
    }
    