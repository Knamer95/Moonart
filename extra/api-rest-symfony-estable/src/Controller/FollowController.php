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
use App\Entity\UserFollowsUser;
use App\Services\JwtAuth;
use App\Services\ImageUploader;

class FollowController extends AbstractController
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

    public function follow(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);
        $data = [
            'status'    => 'error',
            'message'   => 'La conexión ha fallado. Por favor, inténtalo más tarde.',
            'token'     => $token,
            'authCheck' => $authCheck
        ];

        if ($authCheck){

            $em = $this->getDoctrine()->getManager();
            $identity = $jwt_auth->checkToken($token, true);

            $user_id = ($identity->sub != null) ? $identity->sub : null;
            
            $user_to_follow = $request->get('nick', null);

       
            if(!empty($user_to_follow)){

                $user_repo = $this->getDoctrine()->getRepository(User::class);
                $user_1_instance = $user_repo->findOneBy([
                    'id' => $identity->sub
                ]);
    
                $user_2_instance = $user_repo->findOneBy([
                    'nick' => $user_to_follow
                ]);
    

                $is_following = $this->getDoctrine()->getRepository(UserFollowsUser::class)->findOneBy([
                    'follower' => $identity->sub,
                    'followed' => $user_2_instance->getId()
                ]);

                if (!($is_following && is_object($is_following))){

                    $is_following = new UserFollowsUser();
                    $is_following->setFollower($user_1_instance);
                    $is_following->setFollowed($user_2_instance);
                    $is_following->setFollowedAt(new \Datetime('now'));
                    $em->persist($is_following);
                    $em->flush();
                    
                    $data = [
                        'status'    => 'success',
                        'message'   => 'Ahora sigues al usuario.'
                    ];
                }
                else{

                    $em->remove($is_following);
                    $em->flush();

                    $data = [
                        'status'    => 'success',
                        'message'   => 'Ya no sigues al usuario.'
                    ];
                }
            }
        }
        return $this->ajson($data);
    }

    public function getIsFollowing(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);
        $data = [
            'status'    => 'error',
            'message'   => 'La conexión ha fallado. Por favor, inténtalo más tarde.',
            'token'     => $token,
            'authCheck' => $authCheck
        ];

        if ($authCheck){

            $em = $this->getDoctrine()->getManager();
            $identity = $jwt_auth->checkToken($token, true);

            $user_id = ($identity->sub != null) ? $identity->sub : null;
            
            $nick = $request->get('nick', null);

       
            if(!empty($nick)){

                $user_repo = $this->getDoctrine()->getRepository(User::class);
                $user_1_instance = $user_repo->findOneBy([
                    'id' => $identity->sub
                ]);
    
                $user_2_instance = $user_repo->findOneBy([
                    'nick' => $nick
                ]);
    

                $is_following = $this->getDoctrine()->getRepository(UserFollowsUser::class)->findOneBy([
                    'follower' => $identity->sub,
                    'followed' => $user_2_instance->getId()
                ]);

                if (!($is_following && is_object($is_following))){
                    
                    $data = [
                        'status'    => 'success',
                        'following' => false                    
                    ];
                }
                else{

                    $data = [
                        'status'    => 'success',
                        'following' => true                    
                    ];
                }
            }
        }
        return $this->ajson($data);
    }

    public function getFollowNumber(Request $request, JwtAuth $jwt_auth){

        $data = [
            'status'    => 'error',
            'message'   => 'Usuario no encontrado.'
        ];

        $em = $this->getDoctrine()->getManager();

        $id = $request->get('id', null);

        if($id){
            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                'id' => $id
            ]);

            $following = $this->getDoctrine()->getRepository(UserFollowsUser::class)->findBy([
                'follower'  => $user
            ]);

            $followers = $this->getDoctrine()->getRepository(UserFollowsUser::class)->findBy([
                'followed'  => $user
            ]);

            $data = [
                'status'        => 'success',
                'message'       => 'Usuario encontrado.',
                'followers'     => sizeof($followers),
                'following'     => sizeof($following),
            ];
    
        }
        return $this->ajson($data);
    }
}