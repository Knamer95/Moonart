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
use App\Services\CommonOperations;

// use App\Services\ImageUploader;

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

    public function checkUserInteractions(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);

        $data = [
            'found' => false,
            'liked' => false,
            'faved' => false,
            'shared' => false,
        ];

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
                            'found'   => false
                        ];
                    }
                    else{
                        $data = [
                            'found'    => true,
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

    public function addUserInteraction(Request $request, JwtAuth $jwt_auth) {
        sleep(2);

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
            $data['json'] = $json;
            $params = json_decode($json);

            // Recoger el objeto del usuario identificado
            $identity = $jwt_auth->checkToken($token, true);

            if ($json !== null){
                
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

                    if ($params->method === "POST"){
                        $user_interactions = new UserInteractsWithImage();
                        $user_interactions->setLiked(false);
                        $user_interactions->setFaved(false);
                        $user_interactions->setShared(false);
                        $user_interactions->setLikedAt(null);
                        $user_interactions->setFavedAt(null);
                        $user_interactions->setSharedAt(null);
                    }
                    else{
                        $user_interactions = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findOneby([
                            'user'   => $user_id,
                            'image'  => $image_id
                        ]);
                    }
                    $user_interactions->setUser($user);
                    $user_interactions->setImage($image);

                    $date = new \Datetime('now');

                    $liked = $user_interactions->getLiked();
                    $faved = $user_interactions->getFaved();
                    $shared = $user_interactions->getShared();

                    if ($action === "like"){
                        $user_interactions->setLiked(!$liked);
                        $user_interactions->setLikedAt($liked ? $date : null);
                    }
                    else if ($action === "fav"){
                        $user_interactions->setFaved(!$faved);
                        $user_interactions->setFavedAt($faved ? $date : null);
                    }
                    else if ($action === "share"){
                        $user_interactions->setShared(!$shared);
                        $user_interactions->setSharedAt($shared ? $date : null);
                    }

                    $em->persist($user_interactions);
                    $em->flush();

                    // After updating the data, so we get the newest values
                    $CO = new CommonOperations($this->getDoctrine()->getManager());
                    $image_interactions = $CO->getImageInteractions($image);
                    $user_interactions->getImage()->setInteractions($image_interactions);


                    $data = [
                        'status'    => 'success',
                        'message'   => 'Returned the image interactions data',
                        'data'    => $user_interactions
                    ];
                }
            }
        }

        // Si nos devuelve bien los datos, respuesta HTTP
        return $this->ajson($data);
    }

    public function countImageInteractions(Request $request){

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
                    'interactions'  => [
                        'likes'         => $likes,
                        'favs'          => $favs,
                        'shares'        => $shares,
                    ],
                    'userInteractions' => [
                        'liked'      => $user_like ? 1 : 0,
                        'faved'       => $user_fav ? 1 : 0,
                        'shared'     => $user_share ? 1 : 0,
                    ],
                ];
                // sizeof($interactions_likes)
            }
        }
        return $this->ajson($data);
    }

}