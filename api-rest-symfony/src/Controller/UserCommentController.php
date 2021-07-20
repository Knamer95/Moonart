<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
// use Symfony\Component\Validator\Validation;
// use Symfony\Component\Validator\Constraints\Email;

use Knp\Component\Pager\PaginatorInterface;

use App\Entity\User;
use App\Entity\UserComment;
use App\Services\JwtAuth;
use App\Services\CommonOperations;
// use App\Services\ImageUploader;

class UserCommentController extends AbstractController
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

    public function addProfileComment(Request $request, JwtAuth $jwt_auth){

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

            $json = $request->get('json', null);
            $params = json_decode($json);

            $data["message"] = $json;

            if(!empty($json)){

                $profile_user_id = (!empty($params->profileUserId)) ? $params->profileUserId : null;
                $user_id = (!empty($params->userId)) ? $params->userId : null;      //  --> $identity is already enough
                $parent = (!empty($params->parent)) ? $params->parent : false;
                $comment = (!empty($params->comment)) ? $params->comment : false;

                // $comment = str_replace("\"", "{qm}", $comment);
                $comment = json_encode($comment);
                // $comment = str_replace("\"", "", $comment);
                // $comment = str_replace("{qm}", "\"", $comment);

                // $data["message"] = $comment;
                // $comment = json_decode($comment);

                $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                    'id' => $identity->sub
                ]);

                $profile_user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                    'id' => $profile_user_id
                ]);

                if ($user && is_object($user) && $profile_user && is_object($profile_user) && $comment != null){

                    $addComment = new UserComment();
                    $addComment->setProfileUser($profile_user);
                    $addComment->setUser($user);
                    $addComment->setParent($parent);
                    $addComment->setComment($comment);
                    $addComment->setCreatedAt(new \Datetime('now'));
                    $em->persist($addComment);
                    $em->flush();
                    
                    $data = [
                        'status'    => 'success',
                        'message'   => 'Comment added successfully.'
                    ];
                }
            }
        }
        return $this->ajson($data);
    }

    public function getProfileComments(Request $request, JwtAuth $jwt_auth){

        $data = [
            'status'    => 'error',
            'message'   => 'Connection failed. Please try again later.',
        ];

        $em = $this->getDoctrine()->getManager();

        $profile_user_id = $request->get('profileUserId', null);
        $data = "Vaia vaia";

        if (!empty($profile_user_id)){
            $profileUser = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                'id' => $profile_user_id
            ]);

            // $data = var_dump($profileUser);
            // return $this->ajson($data);

            $comments = $this->getDoctrine()->getRepository(UserComment::class)->findBy([
                'profileUser' => $profileUser
            ]);

            $data = [
                'status'    => 'success',
                'comments' => $comments                    
            ];
        }
        return $this->ajson($data);
    }

    public function removeProfileComment(Request $request, JwtAuth $jwt_auth, $id = null){
        
        // Get authentication header 
        $token = $request->headers->get('Authorization');

        // Check token
        $authCheck = $jwt_auth->checkToken($token);    

        // Default response
        $data = [
            'status'    => 'error',
            'messsage'  => 'The comment could not be deleted.',
            'id'        => $id
        ];

        if ($authCheck){
            $identity = $jwt_auth->checkToken($token, true);

            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            
            // User doing the request
            $user = $doctrine->getRepository(User::class)->findOneBy([
                'id'    => $identity->sub
            ]);

            // Comment object
            $comment = $doctrine->getRepository(UserComment::class)->findOneBy([
                'id'    => $id
            ]);

            $user = ['id' => $user->getId(), 'nick' => $user->getNick(), 'role' => $user->getRole()];
            $owner = ['id' => $comment->getUser()->getId(), 'nick' => $comment->getUser()->getNick(), 'role' => $comment->getUser()->getRole()];
            $parent_owner = ['id' => $comment->getProfileUser()->getId(), 'nick' => $comment->getProfileUser()->getNick(), 'role' => $comment->getProfileUser()->getRole()];

            $CO = new CommonOperations();
            $is_allowed = $CO->checkHierarchyPermissions($user, $owner, $parent_owner, 3);

            if ($comment && is_object($comment) && $is_allowed){
                
                $comment->setStatus("deleted");
                // $em->remove($comment);
                $em->flush();

                $data = [
                    'status'    => 'success',
                    'messsage'  => 'Comment deleted successfully.',
                    'id'        => $id
                ];
            }
        }
        return $this->ajson($data);
    }
}