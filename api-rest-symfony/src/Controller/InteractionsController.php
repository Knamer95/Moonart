<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\Email;

use Knp\Component\Pager\PaginatorInterface;

use App\Entity\User;
use App\Entity\Image;
use App\Entity\UserInteractsWithImage;
use App\Services\JwtAuth;
use App\Services\ImageUploader;

class InteractionsController extends AbstractController
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

    public function check(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);

        if ($authCheck){

            $json = $request->get('json', null);
            $params = json_decode($json);

            if ($json != null){

                $user_id = (!empty($params->user_id)) ? $params->user_id : null;
                $image_id = (!empty($params->image_id)) ? $params->image_id : null;

                if (!empty($user_id) && !empty($image_id)){

                    $em = $this->getDoctrine()->getManager();

                    $isset_interactions = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findOneBy([
                        'user'   => $user_id,
                        'image'  => $image_id
                    ]);


                    if(!$isset_interactions){
                        $data = [
                            'found'   => FALSE
                        ];
                    }
                    else{
                        $data = [
                            'found'    => TRUE,
                            'liked'    => $isset_interactions->getLiked(),
                            'faved'    => $isset_interactions->getFaved(),
                            'shared'   => $isset_interactions->getShared()
                        ];                    
                    }
                }
            }
        }
        return $this->ajson($data);
    }

    public function interact(Request $request, JwtAuth $jwt_auth){

        // Array por defecto para devolver
        $data = [
            'status'    => 'error',
            'message'   => 'The interaction could not be added.'
        ];

        // Get authentication header 
        $token = $request->headers->get('Authorization');

        // Check token
        $authCheck = $jwt_auth->checkToken($token);        

        if ($authCheck){
            // Recoger datos por POST
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Recoger el objeto del usuario identificado
            $identity = $jwt_auth->checkToken($token, true);

            if ($json != null){
                
                $user_id = (!empty($params->user_id)) ? $params->user_id : null;
                $image_id = (!empty($params->image_id)) ? $params->image_id : null;
                $action = (!empty($params->action)) ? $params->action : null;

                if (!empty($user_id) && !empty($image_id) && !empty($action)){

                    $em = $this->getDoctrine()->getManager();
                    $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                        'id' => $user_id
                    ]);

                    $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy([
                        'id' => $image_id
                    ]);

                    if ($params->method == "POST"){
                        $interactions = new UserInteractsWithImage();
                        $interactions->setLiked(false);
                        $interactions->setFaved(false);
                        $interactions->setShared(false);
                        $interactions->setLikedAt(null);
                        $interactions->setFavedAt(null);
                        $interactions->setSharedAt(null);

                    }
                    else{
                        $interactions = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findOneby([
                            'user'   => $user_id,
                            'image'  => $image_id
                        ]);
                    }
                    $interactions->setUser($user);
                    $interactions->setImage($image);
                    $date = new \Datetime('now');

                    if ($action == "like"){
                        if($interactions->getLiked() != true){
                            $interactions->setLiked(true);
                            $interactions->setLikedAt($date);
                        }
                        else{
                            $interactions->setLiked(false);
                            $interactions->setLikedAt(null);
                        }
                    }
                    else if ($action == "fav"){
                        if($interactions->getFaved() != true){
                            $interactions->setFaved(true);
                            $interactions->setFavedAt($date); 
                        }
                        else{
                            $interactions->setFaved(false);
                            $interactions->setFavedAt(null); 
                        }
                    }
                    else if ($action == "share"){
                        if($interactions->getShared() != true){
                            $interactions->setShared(true);
                            $interactions->setSharedAt($date); 
                        }
                        else{
                            $interactions->setShared(false);
                            $interactions->setSharedAt(null); 
                        }
                    }

                    $em->persist($interactions);
                    $em->flush();

                    $data = [
                        'status'    => 'success',
                        'message'   => 'Data:',
                        'params'    => $interactions
                    ];
                }
            }
        }

        // Si nos devuelve bien los datos, respuesta HTTP
        return $this->ajson($data);
    }


    public function countInteractions(Request $request){

        // Default response

        $data = [
            'status'    => 'error',
            'messsage'  => 'The details could not be shown.'
        ];

        $em = $this->getDoctrine()->getManager();            
        $id = $request->query->get('id', null);
        $user = $request->query->get('user', null);

        if($id!=null){
            // Sacar el objeto de la imagen en base al id
            $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy([
                'id' => $id
            ]);

            // Comprobar si la imagen existe
            if ($image && is_object($image)){

                $interactions_likes = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'liked'         => 1
                ]);

                $interactions_favs = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'faved'         => 1
                ]);

                $interactions_shares = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'shared'         => 1
                ]);

                $user_like = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'user'          => $user,
                    'liked'         => 1
                ]);

                $user_fav = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'user'          => $user,
                    'faved'         => 1
                ]);

                $user_share = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'image'         => $image,
                    'user'          => $user,
                    'shared'         => 1
                ]);
                
                $likes = 0;
                $favs = 0;
                $shares = 0;

                for($i=0;$i<sizeof($interactions_likes); $i++){
                    $is_liked = $interactions_likes[$i]->getLiked();
                    if($is_liked == true){
                        $likes++;
                    }
                }

                for($i=0;$i<sizeof($interactions_favs); $i++){
                    $is_faved = $interactions_favs[$i]->getFaved();
                    if($is_faved == true){
                        $favs++;
                    }
                }

                for($i=0;$i<sizeof($interactions_shares); $i++){
                    $is_shared = $interactions_shares[$i]->getShared();
                    if($is_shared == true){
                        $shares++;
                    }
                }

                $data = [
                    'status'        => 'success',
                    'messsage'      => 'Image details',
                    // 'image'        => $image,
                    'likes'         => $likes,
                    'favs'          => $favs,
                    'shares'        => $shares,
                    'userLike'      => $user_like ? 1 : 0,
                    'userFav'      => $user_fav ? 1 : 0,
                    'userShare'      => $user_share ? 1 : 0,
                ];
                // sizeof($interactions_likes)
            }
        }
        return $this->ajson($data);
    }

}