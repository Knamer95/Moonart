<?php

namespace App\Services;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use App\Entity\User;
use App\Entity\Image;
use App\Entity\UserInteractsWithImage;
use App\Entity\UserComment;
use App\Entity\ImageComment;
use Doctrine\ORM\EntityManagerInterface;

class CommonOperations extends AbstractController {
    public $em;

    public function __construct(EntityManagerInterface $em) {
        $this->em = $em;
    }

    /* 
     * Function to check if the user is allowed to do an operation
     * params
     *       $user           -> User trying to do the request
     *       $owner          -> Owner of the element to be deleted
     *       $parent_owner   -> Owner of the main image/profile/etc...
     *       $type   -> Operation: {1: user, 2: image, 3: user_comment, 4: image_comment}
     *
     *       Since an owner from an image/profile has full rights over everything (except if it comes from an admin/mod), it's important to differentiate element owner, and "container/parent" owner. 
     *      
     *       Normal can:          none, delete image comments, delete profile comments => From self                                  -- Level 0
     *          Mods can:   Hide images, delete image comments, delete profile comments => From everyone, except admins/other mods    -- Level 1
     *        Owners can: Delete images, delete image comments, delete profile comments => From everyone, except admins/mods          -- Level 2
     *       Admins can: Delete images, delete image comments, delete profile comments => From everyone, except other admins         -- Level 2
     *      
     */

    function checkHierarchyPermissions($user, $owner, $parent_owner, $type) {

        /*
        var_dump($user);
        var_dump($owner);
        var_dump($parent_owner);
        die();
        */

        $is_self_owner = intval($user['id']) === intval($owner['id']) ? true : false; // Owner 

        // If operation == Delete user profile comment -> Works for comments on an image as well
        if ($type === 3) {

            // If the user trying to delete the comment is the one that posted it -> Full rights
            if ($user['id'] == $owner['id']) {
                return true;
            }

            // If the user trying to delete the comment is the profile owner (but not the comment owner, since it didn't get in the previous if)
            if ($user['id'] == $parent_owner['id']) {

                // If the comment owner is not an admin/mod, or the one deleting it is an admin, and the one posting it a mod
                if ($owner['role'] !== "role_admin" && ($owner['role'] !== "role_mod" || $user['role'] === "role_admin")) {
                    return true;
                }
                else {
                    return false;
                }
            }

            // If the user trying to delete the comment is an admin, and the owner is not an admin
            if ($user['role'] === "role_admin" && $owner['role'] !== "role_admin") {
                return true;
            }

            // If the user trying to delete the comment is a mod, and the owner is not an admin/mod
            if ($user['role'] === "role_mod" && ($owner['role'] !== "role_admin" && $owner['role'] !== "role_mod")) {
                return true;
            }
        }

        return false;
        // if ($user->role !== "role_mod" && $user->role !== "role_admin") {}
    }

    public function getImageInteractions($image) {
        $interactions_likes = $this->em->getRepository(UserInteractsWithImage::class)->findBy([
            'image'         => $image,
            'liked'         => 1
        ]);

        $interactions_favs = $this->em->getRepository(UserInteractsWithImage::class)->findBy([
            'image'         => $image,
            'faved'         => 1
        ]);

        $interactions_shares = $this->em->getRepository(UserInteractsWithImage::class)->findBy([
            'image'         => $image,
            'shared'         => 1
        ]);

        return [
            'likes' => sizeof($interactions_likes),
            'favs' => sizeof($interactions_favs),
            'shares' => sizeof($interactions_shares),
        ];
    }
}