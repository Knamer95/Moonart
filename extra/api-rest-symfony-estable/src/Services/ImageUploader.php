<?php

namespace App\Services;

class ImageUploader{

    function uploadImage($image_to_upload, $path){
        $imageB64 = $image_to_upload->base64;

        $imageB64 = substr(explode(";",$imageB64)[1], 7);
        // $imageB64 = str_replace('data:image/png;base64,', '', $imageB64);
        $imageB64 = str_replace(' ', '+', $imageB64);

        $upload_url = $path . $image_to_upload->filename . '.' . $image_to_upload->filetype;
        file_put_contents($upload_url, base64_decode($imageB64));
    }
}