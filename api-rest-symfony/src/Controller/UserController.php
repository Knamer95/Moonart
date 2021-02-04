<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;

use App\Entity\User;
use App\Entity\Image;
use App\Entity\Config;
use App\Services\JwtAuth;
use App\Services\ImageUploader;

class UserController extends AbstractController
{   

    private function ajson($data){

        // Serializar datos con servicio serializer
        $json = $this->get('serializer')->serialize($data, 'json');

        // Response con httpfoundation
        $response = new Response();

        // Asignar contenido a la respuesta
        $response->setContent($json);

        // Indicar formato de respuesta
        $response->headers->set('Content-Type', 'application/json');

        //Devolver la respuesta
        return $response;
    }



    public function index()
    {

        $user_repo = $this->getDoctrine()->getRepository(User::class);
        $image_repo = $this->getDoctrine()->getRepository(Image::class);

        $users = $user_repo->findAll();

        $user = $user_repo->find(1);

        $data = [
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ];

        /*
        foreach($users as $user){
            echo "<h1>{$user->getName()} {$user->getPassword()}</h1>";

            foreach($user->getImages() as $image){
                echo "<p>{$image->getName()} - {$user->getEmail()}</p>";
            }
        }
        */
        // var_dump($user);
        // die;
        return $this->ajson($user);
    }



    public function newUser(Request $request){ // Hacer validación en Frontend y Backend

        // Recoger los datos por POST
        $json = $request->get('json', null);

        // Decodificar el JSON
        $params = json_decode($json); // Si el segundo parámetro es true, lo convierte a array asociativo. (Cuidado)

        // Respuesta por defecto
        $data = [
            'status'    => 'error',
            'messsage'  => 'El usuario no se ha creado.',
        ];

        /* Ejemplo para pasar a PostMan {"name":"Marie","nick":"Marie99","password":"marieposa","email":"marieposa@gmail.com"} */

        // Comprobar y validar datos
        if ($json != null){
            
            $name = (!empty($params->name)) ? $params->name : null; // Si no está vacía, le asignamos name, y si no, null
            $nick = (!empty($params->nick)) ? $params->nick : null;
            $password = (!empty($params->password)) ? $params->password : null;
            $email = (!empty($params->email)) ? $params->email : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email, [
                new Email()
            ]);

            if (!empty($name) && !empty($nick) && !empty($email) && count($validate_email) == 0 
                && !empty($password)){

                // Si la validación es correcta, crear el objeto del usuario
                $user = new User();
                $user->setName($name);
                $user->setNick($nick);
                $user->setPassword($password);
                $user->setEmail($email);
                // $user->setRole('role_user');                 // Ya lo hace la base de datos, no hace falta
                $user->setCreatedAt(new \Datetime('now'));   // hacerlo de nuevo.
          
                // Cifrar la contraseña
                $pwd = hash('sha256', $password);
                $user->setPassword($pwd);

                // Comprobar si el usuario existe (duplicados)
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();

                $user_repo = $doctrine->getRepository(User::class);
                $isset_email = $user_repo->findBy(array(
                    'email' => $email,
                ));

                $isset_nick = $user_repo->findBy(array(
                    'nick'  => $nick
                ));

                // Si no existe, guardarlo en la db
                if (count($isset_email) == 0 && count($isset_nick) == 0){
                    $em->persist($user);
                    $em->flush();

                    $data = [
                        'status'    => 'success',
                        'messsage'  => 'El usuario se ha creado correctamente.',
                        'user'      => $user
                    ];
                }
                else{
                    if (count($isset_email) != 0){
                        $data = [
                            'status'    => 'error',
                            'messsage'  => 'El email ya existe.',
                        ];
                    }

                    if (count($isset_nick) != 0){
                        $data = [
                            'status'    => 'error',
                            'messsage'  => 'El nick ya existe.',
                        ];
                    }

                    if (count($isset_email) != 0 && count($isset_nick) != 0){
                        $data = [
                            'status'    => 'error',
                            'messsage'  => 'El nick y el email ya existen.',
                        ];
                    }
                }
            }
        }

        // Hacer respuesta en JSON
        return $this->ajson($data); // ajson es una función definida por nosotros para serializar.
        // return new JsonResponse($data);
    }



    public function login(Request $request, JwtAuth $jwt_auth){

        // Recibir los datos por POST
        $json = $request->get('json', null);
        $params = json_decode($json);

        // Array por defecto para devolver
        $data = [
            'status'    => 'error',
            'message'   => 'El usuario no se ha podido identificar.'
        ];

        // Comprobar y validar datos
        if ($json != null){

            $login = (!empty($params->login)) ? $params->login : null;
            $password = (!empty($params->password)) ? $params->password : null;
            $getToken = (!empty($params->getToken)) ? $params->getToken : null;

            if (!empty($login) && !empty($password)){

                // Cifrar la contraseña
                $pwd = hash('sha256',$password);

                // Si todo es válido, llamaremos a un servicion para identificar al usuario (jwt, token, o objeto)
                if($getToken){
                    $signup = $jwt_auth->signup($login, $pwd, $getToken);
                }
                else{
                    $signup = $jwt_auth->signup($login, $pwd);
                    $data = $signup;
                }

                return new JsonResponse($signup);

            }
        }

        // Si nos devuelve bien los datos, respuesta HTTP
        return $this->ajson($data);
    }



    public function update(Request $request, JwtAuth $jwt_auth){

        // Los valores de $user se definen en Controller/User.php

        // Recoger la cabecera de autentificación
        $token = $request->headers->get('Authorization');

        // Crear un método para comprobar si el token es correcto
        $authCheck = $jwt_auth->checkToken($token);

        // Respuesta por defecto
        $data = [
            'status'    => 'error',
            'message'   => 'El usuario no se ha podido actualizar.',
            'token'     => $token,
            'authCheck' => $authCheck
        ];

        // Si es correcto, hacer la actualización del usuario
        if ($authCheck){

            // Actualizar al usuario

            // Conseguir entity manager
            $em = $this->getDoctrine()->getManager();

            // Conseguir los datos del usuario identificado
            $identity = $jwt_auth->checkToken($token, true);

            // Conseguir el usuario a actualizar completo
            $user_repo = $this->getDoctrine()->getRepository(User::class);
            $user = $user_repo->findOneBy([
                'id' => $identity->sub
            ]);

            // Recoger datos por POST
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Comprobar y validar los datos
            if(!empty($json)){
                // $data = $params->imageToUpload->filename;
                // return $this->ajson($data); 
                $imageName;
                
                if(!empty($params->imageToUpload)){
                    $extension = $params->imageToUpload->filetype;
                    $image_name = $params->imageToUpload->filename;
                    $imageName = $image_name . "." . $extension;
                }

                $name = (!empty($params->name)) ? $params->name : null; // Si no está vacía, le asignamos name, y si no, null
                $nick = (!empty($params->nick)) ? $params->nick : null;
                $email = (!empty($params->email)) ? $params->email : null;
                $password = (!empty($params->password)) ? $params->password : null;
                $description = (!empty($params->description)) ? $params->description : null;
                $user_image = (!empty($params->user_image)) ? $params->user_image : null;
                $image_to_upload = (!empty($params->imageToUpload)) ? $params->imageToUpload : null;

                /*  NO SE PUEDE CAMBIAR EL EMAIL
                $validator = Validation::createValidator();
                $validate_email = $validator->validate($email, [
                    new Email()
                ]);
                
                if ((!empty($email) && count($validate_email) == 0 )){}
                */

                if (!empty($name) || !empty($nick) || !empty($user_image) || !(empty($description))
                    || !empty($password) || !empty($image_to_upload)){
                        // Esto comprueba que hayan cambios.

                    // Asignar nuevos datos al objeto del usuario
                    if (!empty($name)){
                        $user->setName($name);
                    }

                    $user_exists = false;

                    if (!empty($nick)){
                        $user->setNick($nick);

                        // Comprobar duplicados
                        $isset_user = $user_repo->findOneBy([
                            'nick'  => $nick
                        ]);

                        if($isset_user != null){
                            if($isset_user->getId() != $user->getId()){
                                $user_exists = true;
                            }
                        }
                    }

                        $user->setDescription($description);

                    if (!empty($email)){
                        $user->setEmail($email);
                    }

                    if (!empty($password)){
                        $password_hash = hash('sha256', $password);
 
                        $user->setPassword($password_hash);
                    }


                    if($user_exists == false){

                        if($image_to_upload != null){
                            $user->setUserImage($imageName);
                            $uploader = new ImageUploader();
                            $path = './storage/profile-pictures/';
                            $uploader->uploadImage($image_to_upload, $path);

                        }

                        // Guardar cambios en la base de datos
                        $em->persist($user);
                        $em->flush();

                        $data = [
                            'status'    => 'success',
                            'message'   => 'El usuario se ha actualizado.',
                            'user'      => $user
                        ];
                    }
                    else{
                        $data = [
                            'status'    => 'error',
                            'message'   => 'El usuario no se ha podido actualizar. Email o nick en uso.',

                        ];
                    }
                }
            }
        }
        
        return $this->ajson($data); // Los valores de $user se definen en Controller/User.php
    }



    public function setConfig(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);
        $data = [
            'status'    => 'error',
            'message'   => 'La configuración no se ha podido guardar.',
            'token'     => $token,
            'authCheck' => $authCheck
        ];

        if ($authCheck){

            $em = $this->getDoctrine()->getManager();
            $identity = $jwt_auth->checkToken($token, true);

            $user_repo = $this->getDoctrine()->getRepository(User::class);
            $user = $user_repo->findOneBy([
                'id' => $identity->sub
            ]);

            $json = $request->get('json', null);
            $params = json_decode($json);

            $user_id = ($identity->sub != null) ? $identity->sub : null;
            $night_mode = (!empty($params->nightMode)) ? $params->nightMode : false;
            $scroll = (!empty($params->scroll)) ? $params->scroll : false;
            $nsfw = (!empty($params->nsfw)) ? $params->nsfw : false;
            $epilepsy = (!empty($params->epilepsy)) ? $params->epilepsy : false;
            $lang = (!empty($params->lang)) ? $params->lang : 1;
            $color = (!empty($params->color)) ? $params->color : "zoe";
            $share = (!empty($params->share)) ? $params->share : false;
            $feed = (!empty($params->feed)) ? $params->feed : 15;

            if(!empty($json)){
                
                $config = $this->getDoctrine()->getRepository(Config::class)->findOneBy([
                    'user' => $identity->sub
                ]);


                if (!($config && is_object($config))){ // Si no existe una config, la crea.
                    $config = new Config();
                }

                $config->setUser($user);
                $config->setNightMode($night_mode);
                $config->setScroll($scroll);
                $config->setNsfw($nsfw);
                $config->setEpilepsy($epilepsy);
                $config->setLang($lang);
                $config->setColor($color);
                $config->setShare($share);
                $config->setFeed($feed);

                $em->persist($config);
                $em->flush();

                $data = [
                    'status'    => 'success',
                    'message'   => 'La configuración se ha guardado.',
                    'config'      => $config
                ];
            }
        }

        return $this->ajson($data); // Los valores de $user se definen en Controller/User.php
    }


        
    public function getConfig(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);

        $data = [
            'status'    => 'error',
            'message'   => 'Configuración no encontrada'
        ];

        if ($authCheck){

            $identity = $jwt_auth->checkToken($token, true);
            $user_id = ($identity->sub != null) ? $identity->sub : null;
            $em = $this->getDoctrine()->getManager();            

            $config = $this->getDoctrine()->getRepository(Config::class)->findOneBy([
                'user' => $user_id
            ]);
    
            if ($config && is_object($config)){
                $data = [
                    'status'    => 'success',
                    'config'    => $config
                ];
            }
        }
            return $this->ajson($data);
    }




    public function getUserByNick(Request $request, JwtAuth $jwt_auth){
   
        $data = [
            'status'    => 'error',
            'message'   => 'Usuario no encontrado'
        ];

        $params = $request->get('nick', null);

        $nick = (!empty($params)) ? $params : null;

        if(!empty($nick)){

            $em = $this->getDoctrine()->getManager();            
            $info = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                'nick' => $nick
            ]);

            if ($info && is_object($info)){
                $data = [
                    'status'        => 'success',
                    'user_info'     => $info
                ];
            }
        } 
        return $this->ajson($data);
    }

    public function comparePwd(Request $request, JwtAuth $jwt_auth){
        
        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);

        $data = [
            'status'    => 'error',
            'message'   => 'Contraseña no guardada'
        ];

        $json = $request->get('json', null);
        $params = json_decode($json);
        $identity = $jwt_auth->checkToken($token, true);
        $user_id = ($identity->sub != null) ? $identity->sub : null;
                
        $user_repo = $this->getDoctrine()->getRepository(User::class);
        $user = $user_repo->findOneBy([
            'id' => $identity->sub
        ]);

        if ($user && is_object($user)){
                    
            $old_pass = (!empty($params->oldPass)) ? $params->oldPass : null;
            $old_pass_hash = hash('sha256', $old_pass);

            if($user->getPassword() == $old_pass_hash){
                $data = [
                    'status'        => 'success',
                    'message'       => 'Las contraseñas coinciden'
                ];
            }
            else{
                $data = [
                    'status'        => 'error',
                    'message'       => 'La contraseña actual introducida es incorrecta'
                ];
            }

            $share = (!empty($params->share)) ? $params->share : false;
            $feed = (!empty($params->feed)) ? $params->feed : 15;
        }
        else{
            $data = [
                'status'        => 'error',
                'message'       => 'Usuario no encontrado. Por favor, inténtelo más tarde'
            ];
        }
        return $this->ajson($data);
    }
}        
