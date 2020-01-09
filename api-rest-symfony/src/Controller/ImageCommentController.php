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
use App\Entity\Image;
use App\Entity\ImageComment;
use App\Services\JwtAuth;
// use App\Services\ImageUploader;

class ImageCommentController extends AbstractController
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

    public function addComment(Request $request, JwtAuth $jwt_auth){

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

            $json = $request->get('json', null);
            $params = json_decode($json);

            $data["message"] = $json;

            if(!empty($json)){

                $user_id = (!empty($params->userId)) ? $params->userId : null;      //  --> Ya sirve con $identity
                $image_id = (!empty($params->imageId)) ? $params->imageId : null;
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
    
                $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy([
                    'id' => $image_id
                ]);

                if ($user && is_object($user) && $image && is_object($image) && $comment != null){

                    $addComment = new ImageComment();
                    $addComment->setUser($user);
                    $addComment->setImage($image);
                    $addComment->setParent($parent);
                    $addComment->setComment($comment);
                    $addComment->setCreatedAt(new \Datetime('now'));
                    $em->persist($addComment);
                    $em->flush();
                    
                    $data = [
                        'status'    => 'success',
                        'message'   => 'Comentario subido correctamente.'
                    ];
                }
            }
        }
        return $this->ajson($data);
    }

    public function getComments(Request $request, JwtAuth $jwt_auth){

        $data = [
            'status'    => 'error',
            'message'   => 'La conexión ha fallado. Por favor, inténtalo más tarde.',
        ];

        $em = $this->getDoctrine()->getManager();

        $image_id = $request->get('imageId', null);
        $data = "Vaia vaia";

        if (!empty($image_id)){
            $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy([
                'id' => $image_id
            ]);

            $comments = $this->getDoctrine()->getRepository(ImageComment::class)->findBy([
                'image' => $image
            ]);

            $data = [
                'status'    => 'success',
                'comments' => $comments                    
            ];
        }
        return $this->ajson($data);
    }

    public function removeComment(Request $request, JwtAuth $jwt_auth, $id = null){
        
        // Recoger cabecera de autentificación
        $token = $request->headers->get('Authorization');

        // Comprobar el token
        $authCheck = $jwt_auth->checkToken($token);    

        // Respuesta por defecto
        $data = [
            'status'    => 'error',
            'messsage'  => 'No se ha podido borrar el comentario.',
            'id'        => $id
        ];

        if ($authCheck){
            $identity = $jwt_auth->checkToken($token, true);

            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            $comment = $doctrine->getRepository(ImageComment::class)->findOneBy([
                'id'    => $id
            ]);

            if ($comment && is_object($comment) && ($identity->sub == $comment->getUser()->getId()) || $identity->role == "role_admin"){
                
                $comment->setStatus("deleted");
                // $em->remove($comment);
                $em->flush();

                $data = [
                    'status'    => 'success',
                    'messsage'  => 'Comentario eliminado correctamente.',
                    'id'        => $id
                ];
            }
        }
        return $this->ajson($data);
    }
}