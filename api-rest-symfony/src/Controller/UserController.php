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

        // Serialize data with serializer service
        $json = $this->get('serializer')->serialize($data, 'json');

        // Response with httpfoundation
        $response = new Response();

        // Assign content to the response
        $response->setContent($json);

        // Specify response format
        $response->headers->set('Content-Type', 'application/json');

        // Return response
        return $response;
    }

    public function index() {

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

    public function newUser(Request $request) { // Hacer validación en Frontend y Backend

        // Recoger los datos por POST
        $json = $request->get('json', null);

        // Decodificar el JSON
        $params = json_decode($json); // Si el segundo parámetro es true, lo convierte a array asociativo. (Cuidado)

        // Default response
        $data = [
            'status'    => 'error',
            'messsage'  => 'The user was not created.',
        ];

        /* Example for postman PostMan {"name":"Marie","nick":"Marie99","password":"marieposa","email":"marieposa@gmail.com"} */

        // Check and validate data
        if ($json != null) {
            
            $name = (!empty($params->name)) ? $params->name : null; // If not empty, assign name. Otherwise, null
            $nick = (!empty($params->nick)) ? $params->nick : null;
            $password = (!empty($params->password)) ? $params->password : null;
            $email = (!empty($params->email)) ? $params->email : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email, [
                new Email()
            ]);

            if (!empty($name) && !empty($nick) && !empty($email) && count($validate_email) == 0 
                && !empty($password)) {

                // If validation is correct, create user object
                $user = new User();
                $user->setName($name);
                $user->setNick($nick);
                $user->setPassword($password);
                $user->setEmail($email);
                // $user->setRole('role_user'); // The database already does this, not needed to do it again
                $user->setCreatedAt(new \Datetime('now'));
          
                // Encode the password
                $pwd = hash('sha256', $password);
                $user->setPassword($pwd);

                // Check if the user exists (duplicates)
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();

                $user_repo = $doctrine->getRepository(User::class);
                $isset_email = $user_repo->findBy(array(
                    'email' => $email,
                ));

                $isset_nick = $user_repo->findBy(array(
                    'nick'  => $nick
                ));

                // If not, save it on DB
                if (count($isset_email) == 0 && count($isset_nick) == 0) {
                    $em->persist($user);
                    $em->flush();

                    $data = [
                        'status'    => 'success',
                        'messsage'  => 'User created successfully.',
                        'user'      => $user
                    ];
                }
                else{
                    if (count($isset_email) != 0){
                        $data = [
                            'status'        => 'error',
                            'messsage'      => 'The email is already in use.',
                            'messageError'  => 1
                        ];
                    }

                    if (count($isset_nick) != 0){
                        $data = [
                            'status'        => 'error',
                            'messsage'      => 'The nickname is already in use.',
                            'messageError'  => 2
                        ];
                    }

                    if (count($isset_email) != 0 && count($isset_nick) != 0){
                        $data = [
                            'status'        => 'error',
                            'messsage'      => 'The nick and email are already in use.',
                            'messageError'  => 3
                        ];
                    }
                }
            }
        }

        // JSON response
        return $this->ajson($data); // ajson is a function defined by us to serialize the data
        // return new JsonResponse($data);
    }

    public function login(Request $request, JwtAuth $jwt_auth){

        // Get POST data
        $json = $request->get('json', null);
        $params = json_decode($json);

        // Default array to return
        $data = [
            'status'    => 'error',
            'message'   => 'The user could not be identified.'
        ];

        // Check and validate data
        if ($json != null){

            $login = (!empty($params->login)) ? $params->login : null;
            $password = (!empty($params->password)) ? $params->password : null;
            $getToken = (!empty($params->getToken)) ? $params->getToken : null;

            if (!empty($login) && !empty($password)){

                // Encode pass
                $pwd = hash('sha256', $password);

                // If everything is valid, we call a service to identify the user (jwt, token, or objet)
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

        // If it returns correct data, HTTP response
        return $this->ajson($data);
    }

    public function update(Request $request, JwtAuth $jwt_auth){

        // The $user values are defined in Controller/User.php

        // Get authentication header
        $token = $request->headers->get('Authorization');

        // Create a method to check if the token is correct
        $authCheck = $jwt_auth->checkToken($token);

        // Default response
        $data = [
            'status'    => 'error',
            'message'   => 'The user could not be updated.',
            'token'     => $token,
            'authCheck' => $authCheck
        ];

        // If it's correct, update the user
        if ($authCheck){

            // Update user

            // Get entity manager
            $em = $this->getDoctrine()->getManager();

            // Get identified user data
            $identity = $jwt_auth->checkToken($token, true);

            // Get the completeuser to update
            $user_repo = $this->getDoctrine()->getRepository(User::class);
            $user = $user_repo->findOneBy([
                'id' => $identity->sub
            ]);

            // Get POST data
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Check and validate data
            if(!empty($json)){
                // $data = $params->imageToUpload->filename;
                // return $this->ajson($data); 
                $imageName;
                
                if(!empty($params->imageToUpload)){
                    $extension = $params->imageToUpload->filetype;
                    $image_name = $params->imageToUpload->filename;
                    $imageName = $image_name . "." . $extension;
                }

                $name = (!empty($params->name)) ? $params->name : null; // If not empty, assigns name. Otherwise, null
                $nick = (!empty($params->nick)) ? $params->nick : null;
                $email = (!empty($params->email)) ? $params->email : null;
                $password = (!empty($params->password)) ? $params->password : null;
                $description = (!empty($params->description)) ? $params->description : null;
                $user_image = (!empty($params->user_image)) ? $params->user_image : null;
                $image_to_upload = (!empty($params->imageToUpload)) ? $params->imageToUpload : null;

                /*  EMAIL CANNOT BE CHANGED
                $validator = Validation::createValidator();
                $validate_email = $validator->validate($email, [
                    new Email()
                ]);
                
                if ((!empty($email) && count($validate_email) == 0 )){}
                */

                if (!empty($name) || !empty($nick) || !empty($user_image) || !(empty($description))
                    || !empty($password) || !empty($image_to_upload)){
                        // This checks if there are changes.

                    // Assign new data to the user object
                    if (!empty($name)){
                        $user->setName($name);
                    }

                    $user_exists = false;

                    if (!empty($nick)){
                        $user->setNick($nick);

                        // Check duplicates
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

                        // Save changes in the database
                        $em->persist($user);
                        $em->flush();

                        $data = [
                            'status'    => 'success',
                            'message'   => 'The user has been updated successfully.',
                            'user'      => $user
                        ];
                    }
                    else{
                        $data = [
                            'status'    => 'error',
                            'message'   => 'The user could not be updated. Email or nick in use.',

                        ];
                    }
                }
            }
        }
        
        return $this->ajson($data); // The $user values are defined in Controller/User.php
    }

    public function setConfig(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);
        $data = [
            'status'    => 'error',
            'message'   => 'The config could not be saved.',
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


                if (!($config && is_object($config))){ // If config does not exist, it creates one.
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
                    'message'   => 'Config saved successfully.',
                    'config'    => $config,
                ];
            }
        }

        return $this->ajson($data);
    }

    public function getConfig(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);

        $data = [
            'status'    => 'error',
            'message'   => 'Config not found.'
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
            'message'   => 'User not found.'
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
            'message'   => 'Password not saved.'
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
                    'message'       => 'The passwords match.'
                ];
            }
            else{
                $data = [
                    'status'        => 'error',
                    'message'       => 'The current introduced password is incorrect.'
                ];
            }

            $share = (!empty($params->share)) ? $params->share : false;
            $feed = (!empty($params->feed)) ? $params->feed : 15;
        }
        else{
            $data = [
                'status'        => 'error',
                'message'       => 'User not found. Please, try again later.'
            ];
        }
        return $this->ajson($data);
    }
}        
