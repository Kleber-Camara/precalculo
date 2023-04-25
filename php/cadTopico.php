<?php

    try{
        include_once("topico.php");

        
    }catch(PDOException $e){
        $e->getMessage();
    }