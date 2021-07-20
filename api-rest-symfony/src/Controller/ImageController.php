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
use App\Entity\UserFollowsUser;
use App\Services\JwtAuth;
use App\Services\ImageUploader;

class ImageController extends AbstractController
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

    public function index()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/ImagesController.php',
        ]);
    }

    function cmp($a, $b){
        $param_1 = $a->getSharedAt()->format('Y-m-d H:i:s');
        $param_2 = $b->getSharedAt()->format('Y-m-d H:i:s');

        return strcmp($param_1, $param_2);
    }

    public function upload(Request $request, JwtAuth $jwt_auth, $id = null){ // Creates or modifies a register (if $id is not null, it edits it)

        // Default response
        $data = [
            'status'    => 'error',
            'messsage'  => 'Image not uploaded.',
        ];

        // Get token
        $token = $request->headers->get('Authorization', null);

        // Check if it's correct
        $authCheck = $jwt_auth->checkToken($token);

        if ($authCheck){

            // Get POST data
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Get the identified user object
            $identity = $jwt_auth->checkToken($token, true);

            // Check and validate data
            if (!empty($json)){

                $extension = $params->imageToUpload->filetype;
                $image_name = $params->imageToUpload->filename;

                $user_id = ($identity->sub != null) ? $identity->sub : null;
                $url = $image_name . "." . $extension;
                $name = (!empty($params->name)) ? $params->name : null;
                $description = (!empty($params->description)) ? $params->description : null;
                $nsfw = (!empty($params->nsfw)) ? $params->nsfw : false;
                $epilepsy = (!empty($params->epilepsy)) ? $params->epilepsy : false;
                $image_to_upload = (!empty($params->imageToUpload)) ? $params->imageToUpload : null;
                $rights = (!empty($params->rights)) ? $params->rights : null;
                $tags = (!empty($params->tags)) ? $params->tags : null;

                if(!empty($user_id) && !empty($name) && !empty($image_to_upload)){

                    // Save new image on DB

                    $em = $this->getDoctrine()->getManager();
                    $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                        'id' => $user_id
                    ]);
                    
                    if ($id == null){

                        // Create and save objects
                        $image = new Image();
                        $image->setUser($user);
                        $image->setUrl($url);
                        $image->setName($name);
                        $image->setDescription($description);
                        $image->setStatus('published');
                        $image->setNsfw($nsfw);
                        $image->setEpilepsy($epilepsy);
                        $image->setRights($rights);
                        $image->setTags($tags);

                        $createdAt = new \Datetime('now');
                        $updatedAt = new \Datetime('now');
                        $image->setCreatedAt($createdAt);
                        $image->setUpdatedAt($updatedAt);
                        
                        /*
                        $upload_image = $this->forward('App\Services\ImageUploader::upload', [
                            'url'               => $url,
                            'image_to_upload'   => $image_to_upload
                        ]);
                        */
                        $uploader = new ImageUploader();
                        $path = './storage/images/';
                        $uploader->uploadImage($image_to_upload, $path);

                        // Insert on DB

                        $em->persist($image);
                        $em->flush();

                        $data = [
                            'status'    => 'success',
                            'messsage'  => 'Image uploaded successfully.',
                            'image'     => $image
                        ];
                    }
                    else{   // Update

                        $data = [
                            'status'    => 'error',
                            'messsage'  => 'Image not found. Update failed.',
                        ];

                        $image = $this->getDoctrine()->getRepository(Image::class)->findOneby([
                            'id'    => $id,
                            'user'  => $identity->sub
                        ]);

                        if ($image && is_object($image)){
                            // $image->setUrl($url);                |   -> It shouldn't be allowed
                            $image->setName($name);
                            $image->setDescription($description);
                            $image->setNsfw($nsfw);
                            $image->setEpilepsy($epilepsy);
                            $image->setTags($tags);

                            $updatedAt = new \Datetime('now');
                            $image->setUpdatedAt($updatedAt);

                            $em->persist($image);
                            $em->flush();

                            $data = [
                                'status'    => 'success',
                                'messsage'  => 'Image updated successfully.',
                                'image'     => $image
                            ];
                        }
                    }
                }
            }
        }

        // Return response

        return $this->ajson($data);
    }

    public function images(Request $request, JwtAuth $jwt_auth, PaginatorInterface $paginator){

        // Get authentication header 
        $token = $request->headers->get('Authorization');

        // Check token
        $authCheck = $jwt_auth->checkToken($token);

        // If valid:
        if ($authCheck){

            // Get user identity
            $identity = $jwt_auth->checkToken($token, true);

            $em = $this->getDoctrine()->getManager();            

            // Query to paginate
            $dql = "SELECT v FROM App\Entity\Image v WHERE v.user = {$identity->sub} ORDER BY v.id DESC";
            $query = $em->createQuery($dql);

            // Get page parameter from URL
            $page = $request->query->getInt('page', 1); // Por defecto, 1
            $items_per_page = 5;

            // Invoke pagination
            $pagination = $paginator->paginate($query, $page, $items_per_page);
            $total = $pagination->getTotalItemCount();

            // Prepare data array to return
            $data = [
                'status'            => 'success',
                'messsage'          => 'Images loaded successfully.',
                'total_items'       => $total,
                'page'              => $page,
                'items_per_page'    => $items_per_page,
                'total_pages'       => ceil($total / $items_per_page),
                'images'            => $pagination,
                'user_id'           => $identity->sub
            ];

        }
        else{

            // If something fails, it will return this:

            $data = [
                'status'    => 'error',
                'messsage'  => 'Images cannot be displayed currently.'
            ];
        }
        return $this->ajson($data);
    }

    public function details(Request $request){

        // Default response

        $data = [
            'status'    => 'error',
            'messsage'  => 'Details cannot be shown.'
        ];

        $em = $this->getDoctrine()->getManager();            
        $id = $request->query->get('id', null);

        if($id!=null){
            // Sacar el objeto de la imagen en base al id
            $image = $this->getDoctrine()->getRepository(Image::class)->findOneBy([
                'id' => $id
            ]);

            // Comprobar si la imagen existe
            if ($image && is_object($image)){
                $data = [
                    'status'    => 'success',
                    'messsage'  => 'Image details',
                    'image'        => $image
                ];
            }
        }
        return $this->ajson($data);
    }

    // Get every image. Can be for home (every user), show more (in image details), or profile images
    public function allImages(Request $request, PaginatorInterface $paginator){

        $data = [
            'status'    => 'error',
            'messsage'  => 'Error while loading the images'
        ];

        $em = $this->getDoctrine()->getManager();            

        // Query to paginate
        // $dql = "SELECT v FROM App\Entity\Image v ORDER BY v.id DESC";
        // $query = $em->createQuery($dql);

        $nsfw = $request->query->get('nsfw', "false");
        $epilepsy = $request->query->get('epilepsy', "false");        
        $user = $request->query->get('user', "null");        
        $is_profile_user = $request->query->get('isProfileUser', "false");

        $where = "";
        $and = "";

        if($nsfw == "true" && $epilepsy == "true"){
            $where = " WHERE i.id > 0 ";            // Condition that is always fulfilled
        }

        else if($nsfw == "true" && $epilepsy == "false"){
            $where = " WHERE i.epilepsy = 0 ";
        }

        else if($nsfw == "false" && $epilepsy == "true"){
            $where = " WHERE i.nsfw = 0 ";
        }

        else{
            $where = " WHERE i.nsfw = 0 AND i.epilepsy = 0 ";
        }

        if($nsfw == "true" && $epilepsy == "true" && $user != "null"){
            $and = " AND u.nick = '" . $user . "' ";
        }
        else if ($user != "null"){
            $and = " AND u.nick = '" . $user . "' ";
        }

        if ($is_profile_user == "true"){
            $and .= " AND (i.status = 'published' OR i.status = 'hidden') ";
        }
        else{
            $and .= " AND i.status = 'published' ";
        }

        $dql =  "SELECT i, u.nick AS username
        FROM 
        App\Entity\Image i 
        LEFT OUTER JOIN
        App\Entity\User u 
        WITH i.user = u.id"
        . $where . $and .
        " ORDER BY i.id DESC";

        $query = $em->createQuery($dql);

        // $dql =     "SELECT i, u
        //             FROM App\Entity\Image i
        //             JOIN App\Entity\User u
        //             WITH i.user=u.id
        //             ORDER BY i.id DESC";
        // $query = $em->createQuery($dql);

        // Get page parameter from URL
        $page = $request->query->getInt('page', 1); // By default, 1
        $items_per_page = 24;

        // Invoke pagination
        $pagination = $paginator->paginate($query, $page, $items_per_page);

        $total = $pagination->getTotalItemCount();

        // Prepare data array to return
        $data = [
            'status'            => 'success',
            'messsage'          => 'Images loaded successfully.',
            'total_items'       => $total,
            'page'              => $page,
            'items_per_page'    => $items_per_page,
            'total_pages'       => ceil($total / $items_per_page),
            'images'            => $pagination, // Here is where images go!!
            'paginator'         => $paginator,
            'is_profile_user'   => $is_profile_user,
            'query'             => $dql,
            'user'              => $user
        ];
    return $this->ajson($data);
    }

    // Get images that match the search
    public function searchImages(Request $request, PaginatorInterface $paginator){

        $data = [
            'status'    => 'error',
            'messsage'  => 'Error while loading the images'
        ];

        $em = $this->getDoctrine()->getManager();            

        $nsfw = $request->query->get('nsfw', "false");
        $epilepsy = $request->query->get('epilepsy', "false");        
        $query_selector = $request->query->get('querySelector', "all");        
        $search = $request->query->get('search', null);        

        $where = "";
        $and = "";

        if($nsfw == "true" && $epilepsy == "true"){
            $where = " WHERE i.id > -1 ";
        }

        else if($nsfw == "true" && $epilepsy == "false"){
            $where = " WHERE i.epilepsy = 0 ";
        }

        else if($nsfw == "false" && $epilepsy == "true"){
            $where = " WHERE i.nsfw = 0 ";
        }

        else{
            $where = " WHERE i.nsfw = 0 AND i.epilepsy = 0 ";
        }

        if($query_selector == "tag"){
            $where .= " AND i.tags LIKE '%$search%' ";
        }
        else  if($query_selector == "name"){
            $where .= " AND i.name LIKE '%$search%' ";

        }
        else{
            $where .= " AND (i.tags LIKE '%$search%' OR i.name LIKE '%$search%') ";
        }

        $and .= " AND i.status = 'published' ";

        $dql =  "SELECT i, u.nick AS username
        FROM 
        App\Entity\Image i 
        LEFT OUTER JOIN
        App\Entity\User u 
        WITH i.user = u.id"
        . $where . $and .
        " AND i.status = 'published' ORDER BY i.id DESC";

        $query = $em->createQuery($dql);

        $page = $request->query->getInt('page', 1); // By default, 1
        $items_per_page = 24;

        // Invoke pagination
        $pagination = $paginator->paginate($query, $page, $items_per_page);

        $total = $pagination->getTotalItemCount();

        // Prepare data array to return
        $data = [
            'status'            => 'success',
            'messsage'          => 'Correcto.',
            'total_items'       => $total,
            'page'              => $page,
            'items_per_page'    => $items_per_page,
            'total_pages'       => ceil($total / $items_per_page),
            'images'            => $pagination, // Here is where images go!!
            'paginator'         => $paginator
        ];
    return $this->ajson($data);
    }
    

    public function remove(Request $request, JwtAuth $jwt_auth, $id = null){
        
        // Get authentication header 
        $token = $request->headers->get('Authorization');

        // Check token
        $authCheck = $jwt_auth->checkToken($token);    

        // Default response
        $data = [
            'status'    => 'error',
            'messsage'  => 'Image could not be deleted.',
            'id'        => $id
        ];

        if ($authCheck){
            $identity = $jwt_auth->checkToken($token, true);

            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            $image = $doctrine->getRepository(Image::class)->findOneBy([
                'id'    => $id
            ]);

            if ($image && is_object($image) && ($identity->sub == $image->getUser()->getId()) || $identity->role == "role_admin"){

                $path = "../public/storage/images/" . $image->getUrl();

                $em->remove($image);
                $em->flush();
                $result = unlink($path);  // Delete image from the server (some webs don't delete them... comment if you don't want that)

                $data = [
                    'status'    => 'success',
                    'messsage'  => 'Image deleted successfully.',
                    'result'    => ($result ? true : false),
                    'id'        => $id
                ];
            }
        }
        return $this->ajson($data);
    }

    public function hide(Request $request, JwtAuth $jwt_auth, $id = null){  // Toggle

        $token = $request->headers->get('Authorization');

        $authCheck = $jwt_auth->checkToken($token);

        $data = [
            'status'    => 'error',
            'messsage'  => 'The hide operation failed.',
            'id'        => $id
        ];

        if ($authCheck){
            $action = $request->get('action', null);

            $identity = $jwt_auth->checkToken($token, true);
            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            $image = $doctrine->getRepository(Image::class)->findOneBy([
                'id'    => $id
            ]);

            if ($image && is_object($image) && ($identity->role == 'role_mod' || $identity->role == 'role_admin')){
                $image->setStatus($action);

                $em->persist($image);
                $em->flush();

                $data = [
                    'status'    => 'success',
                    'messsage'  => 'Image hidden successfully.',
                    'id'        => $id
                ];
            }
        }
        return $this->ajson($data);
    }

    function userByImage($id = null){
        // $dql = "SELECT v FROM App\Entity\User v WHERE v.id = {$image_id}";
        // $query = $em->createQuery($dql);

        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'id' => $id
        ]);

        if ($user && is_object($user)){
            $data = [
                'status'    => 'success',
                'user'        => $user
            ];
        }
        return $this->ajson($data);
    }

    // Get liked and faved images (For user profile view)
    public function interactedUser(Request $request, PaginatorInterface $paginator){

        $data = [
            'status'    => 'error',
            'messsage'  => 'Error al cargar las imágenes'
        ];

        $em = $this->getDoctrine()->getManager();            

        // Query to paginate

        $nsfw = $request->query->get('nsfw', "false");
        $epilepsy = $request->query->get('epilepsy', "false");        
        $user_id = $request->query->get('user_id', "null");        
        $interaction = $request->query->get('interaction', "null");   
        $user = $request->query->get('user', "null"); // The owner can see their own images, sensitive or not.     

        if ($interaction != "null"){

        $check_user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
            'id'    => $user_id,
            'nick'  => $user
        ]);

        $is_profile_user = false;

        if ($check_user && is_object($check_user)){
            $is_profile_user = true;
        }
        
        $where = "";
        $and = "";

        if($nsfw == "true" && $epilepsy == "true" || $is_profile_user == true){
            $where = " AND i.id > 0 ";
        }

        else if($nsfw == "true" && $epilepsy == "false"){
            $where = " AND i.epilepsy = 0 ";
        }

        else if($nsfw == "false" && $epilepsy == "true"){
            $where = " AND i.nsfw = 0 ";
        }

        else{
            $where = " AND i.nsfw = 0 AND i.epilepsy = 0 ";
        }
        $and = " AND i.status = 'published' ";

        $dql =  "SELECT i, u.nick AS username, w.faved
                FROM 
                App\Entity\Image i 
                INNER JOIN
                App\Entity\UserInteractsWithImage w 
                WITH i.id = w.image
                INNER JOIN
                App\Entity\User u
                WITH i.user = u.id
                WHERE w.user = " . $user_id . " 
                AND w." . $interaction . " = 1" . 
                $where . $and . "
                ORDER BY w." . $interaction . "At DESC";
        

        $query = $em->createQuery($dql);


        // Get page parameter from URL
        $page = $request->query->getInt('page', 1); // Por defecto, 1
        $items_per_page = 24;

        // Invoke pagination
        $pagination = $paginator->paginate($query, $page, $items_per_page);

        $total = $pagination->getTotalItemCount();

        // Prepare data array to return
        $data = [
            'status'            => 'success',
            'messsage'          => 'Images loaded successfully.',
            'settings'          => $where,
            'total_items'       => $total,
            'page'              => $page,
            'items_per_page'    => $items_per_page,
            'total_pages'       => ceil($total / $items_per_page),
            'images'            => $pagination, // Here is where images go!!
            'paginator'         => $paginator
        ];
    }
    return $this->ajson($data);
    }

    /*
     *
     * Gets all the images shared by users that the current user is following (token)
     * Checks that the image is not repeated in each scroll load. If it displays n each time, and finds repeated ones, it removes them, 
     * but they can reapear in the next scroll call. (This function is called on scroll, when the user reaches the bottom of the page)
     *
     */
    public function sharedImages(Request $request, JwtAuth $jwt_auth, PaginatorInterface $paginator){

        $data = [
            'status'            => 'error',
            'message'           => 'There was an error while trying to get the images.'
        ];

        // Get authentication header 
        $token = $request->headers->get('Authorization');

        // Check token
        $authCheck = $jwt_auth->checkToken($token);

        // If valid:
        if ($authCheck){

            // Get user identity
            $identity = $jwt_auth->checkToken($token, true);
            $id = $identity->sub;
            $index = $request->query->getInt('index', 0);
            $items_to_show = $request->query->getInt('qt', 5);
            $nsfw = $request->query->get('nsfw', null);
            $epilepsy = $request->query->get('epilepsy', null);

            $em = $this->getDoctrine()->getManager();            

            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy([
                'id' => $id
            ]);

            $followed_users = $this->getDoctrine()->getRepository(UserFollowsUser::class)->findBy([
                'follower'  => $user
            ]);

            $user_shared=[];
            $total = 0;
            $all = [];
            $deleted = false;
            $num_iterations = 0;
            $new_index = "";
            $duplicated = "";
            $merged = [];
            $is_last = false;
            $arr_return = [];

            // We include every shared image from each user
            for($i = 0; $i < sizeof($followed_users); $i++){
                $user_shared[$i] = $this->getDoctrine()->getRepository(UserInteractsWithImage::class)->findBy([
                    'user'          => $followed_users[$i]->getFollowed(),
                    'shared'        => 1
                ]);

                array_push($all, $user_shared[$i]);
                $total = $total + sizeof($user_shared[$i]);
            }

            if ($all){ // There might not be elements to show if the user is not following anyone, or the users they follow haven't shared anything!
                // We join them so they are at the same level. Arr[0][0] => Arr[0]; Arr[0][1] => Arr[1]
                $merged = call_user_func_array('array_merge', $all);

                usort($merged, array($this, "cmp"));
                $merged = array_reverse ($merged);

                $to_delete = [];

                // We filter if the user has active filters (nsfw == false => Don't show sensitive content = filter activated)
                for($i = 0; $i < sizeof($merged); $i++){

                    if($merged[$i]->getImage()->getStatus() != "published"){
                        array_push($to_delete, $i);
                        // unset($merged[$i]);  // Doesn't work properly like this
                    }

                    if($merged[$i]->getImage()->getNsfw() == true && $nsfw == "false"){
                        array_push($to_delete, $i);
                        // unset($merged[$i]);
                    }

                    if($merged[$i]->getImage()->getEpilepsy() == true && $epilepsy == "false"){

                        array_push($to_delete, $i);
                    }
                }


                for($i = 0; $i < sizeof($to_delete); $i++){
                    unset($merged[$to_delete[$i]]);
                }

                // $array = ['El-1', 'El-2', 'El-3', 'El-4']    -> Before unset
                // unset($array[2]);
                // $array = ['El-1', '    ', 'El-3', 'El-4']    -> After unset
                // echo $array[1] => unset deletes the index. This means there's no $array at 1, so it shows an error.

                $merged = array_values($merged);    // Reindexes emtpy spaces

                for($i = $index; $i < sizeof($merged); $i++){

                    $num_iterations++;
                    array_push($arr_return, $merged[$i]);
                    
                    if($i > 0){

                        $arr_return_length = 0;
                        if (sizeof($arr_return) > 1){
                            $arr_return_length = sizeof($arr_return) - 1;
                        }
                        else if (sizeof($arr_return) == 0){
                            $arr_return_length = sizeof($arr_return);
                        }

                        for($j = 0; $j < $arr_return_length; $j++){  // -1 porque no se tiene que comparar consigo mismo
                            
                            if($arr_return[$j]->getImage() == $merged[$i]->getImage()){
                                array_pop($arr_return);
                                $duplicated .= "Duplicated on: [" . $i . ", " . $j . "]. ";
                            }
                        }
                    }

                    if(sizeof($arr_return) == $items_to_show){
                        break;
                    }

                    if($i == (sizeof($merged) -1)){
                        $is_last = true;
                    }
                }

                $new_index = $num_iterations + $index;
        }

        $data = [
            'status'            => 'success',
            'messsage'          => 'Images loaded successfully.',
            'num_iterations'    => $num_iterations,
            'index'             => $new_index,
            'veces'             => $duplicated,
            'total_size'        => sizeof($merged),
            'isLast'            => $is_last,
            'element'           => $arr_return,
        ];

        }
        return $this->ajson($data);
    }
}