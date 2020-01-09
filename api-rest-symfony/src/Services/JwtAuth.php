<?php
namespace App\Services;

use Firebase\JWT\JWT;
use App\Entity\User;

class JwtAuth{

    public $manager;
    public $key;

    public function __construct($manager){
        $this->manager = $manager;
        $this->key = "Password_backend_innaccesible_para_nadie_menos_el_programador_149131420";
    }



    public function signup($login, $password, $getToken = null){
        // Comprobar si el usuario existe
        $signup = false;

        $user = $this->manager->getRepository(User::class)->findOneBy([
            'email'     => $login,
            'password'  => $password
        ]);

        if (is_object($user)){
            $signup = true;
        }
        else{ // Se puede hacer login con el nick o con el email
            $user = $this->manager->getRepository(User::class)->findOneBy([
                'nick'     => $login,
                'password'  => $password
            ]);

            if (is_object($user)){
                $signup = true;
            }
        }


        // Si existe, generar el token de jwt
        if ($signup){
            $token = [
                'sub'           => $user->getId(),
                'name'          => $user->getName(),
                'nick'          => $user->getNick(),
                'email'         => $user->getEmail(),
                'role'          => $user->getRole(),
                'description'   => $user->getDescription(),
                'image'         => $user->getUserImage(),
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60), // Caduca a la semana
            ];

            // Comprobar el flag getToken. Condicional si nos llega
            $jwt = JWT::encode($token, $this->key, 'HS256');

            if ($getToken){
                $data = $jwt;
            }
            else{
                $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                $data = $decoded;
            }
        }
        else{
            $data = [
                'status'    => 'error',
                'message'   => 'Login incorrecto.'
            ];
        }

        // Devolver los datos
        return $data;
    }



    public function checkToken($jwt, $identity = false){
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        }
        catch(\UnexpectedValueException $e){
            $auth = false;
        }
        catch(\DomainException $e){
            $auth = false;
        }

        if(isset($decoded) && !empty($decoded) && is_object($decoded) && isset($decoded->sub)){
            $auth = true;
        }

        if ($identity != false){
            return $decoded;
        }
        else{
            return $auth;
        }
    }
}