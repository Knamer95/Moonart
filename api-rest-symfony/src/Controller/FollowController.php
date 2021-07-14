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

    public function follow(Request $request, JwtAuth $jwt_auth){

        $token = $request->headers->get('Authorization');
        $authCheck = $jwt_auth->checkToken($token);
        $data = [
            'status'    => 'error',
            'message'   => 'Connection failed. Please try again later.',
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
                        'message'   => 'User followed.'
                    ];
                }
                else{

                    $em->remove($is_following);
                    $em->flush();

                    $data = [
                        'status'    => 'success',
                        'message'   => 'User unfollowed.'
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
            'message'   => 'Connection error. Please try again later.',
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

    public function getFollowInfo(Request $request, JwtAuth $jwt_auth){

        $data = [
            'status'    => 'error',
            'message'   => 'User not found.'
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
                'message'       => 'User found.',
                'followers'     => $followers,
                'following'     => $following,
                'nFollowers'     => sizeof($followers),
                'nFollowing'     => sizeof($following),
            ];
    
        }
        return $this->ajson($data);
    }
}