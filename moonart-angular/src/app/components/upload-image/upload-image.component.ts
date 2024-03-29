import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Image } from '../../models/image';
import { ImageService } from '../../services/image.service';
import { CommonService } from '../../services/common.service';
import { emitterTypes } from '../../models/struct';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css'],
    providers: [UserService, ImageService, CommonService]
})
export class UploadImageComponent implements OnInit {
    public _rights = "totales"; // Select default value
    public _imageURL: any = "assets/img/preview-icon.png";
    // public _file; // Uploaded file
    public pageTitle: string = "Upload image";
    public identity: any;
    public token: string;
    public image: Image;
    public status: string;
    fileToUpload: File = null;
    public config: any;

    public imagePath: string;
    public message: string;
    public nightMode: boolean;
    public language: Object;
    public lang: number;
    public currentLang: any;
    public emitType: number;

    @Output() emitter = new EventEmitter();

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _imageService: ImageService,
        private _commonService: CommonService,
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
    }

    ngOnInit() {
        document.title = this.pageTitle;

        this.loadUser();
        this.image = new Image(1, this.identity.sub, '', '', '', '', 0, 0, null, null, '', '', '');

        this.config = JSON.parse(localStorage.getItem("config"));
        // if (localStorage.getItem("config") != null && localStorage.getItem("config") != "undefined") {
        this.nightMode = JSON.parse(localStorage.getItem("config")).nightMode;
        this._commonService.changeNightModeAttr(this.nightMode);
        // }

        this.lang = JSON.parse(localStorage.getItem("config")).lang;
        this.currentLang = this.getLang(this.lang);
        this._commonService.changeLangAttr(this.lang);
    }

    /*
    handleFileInput(files: FileList) { // To see the object files attributes
        this.fileToUpload = files.item(0);
        console.log(this.fileToUpload);
    }
    */

    fileHandler(files) {
        if (files.length === 0)
            return;

        // console.log("size:" + files[0].size); // *Change* -> Add limitations, deactivate button if they are not fullfilled
        // https://stackoverflow.com/questions/29280473/how-can-i-use-angluarjs-to-disable-a-button-if-a-value-is-bigger-than-255

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            console.log("Only images allowed"); // Change to display in a proper message
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this._imageURL = reader.result;
            this.image.imageToUpload = {
                filename: this.nameGen(),
                filetype: files[0].type.replace('image/', ''),
                value: (<string>reader.result).split(',')[1],
                base64: this._imageURL
            }
        }
    }

    onSubmit(form) {

        this.image.name = this._commonService.noscript(this.image.name);

        var nsfw: boolean = Boolean(this.image.nsfw);
        if (nsfw == true) {
            this.image.nsfw = 1;
        }
        else {
            this.image.nsfw = 0;
        }
        let description = this.image.description;

        if (this.image.description != null) {
            for (let i = 0; i < description.length; i++) {
                if (description.charCodeAt(i) == 10) {
                    description = description.substr(0, i) + '\\n' + description.substr(i + 1);
                }
            }
            description = this._commonService.noscript(description);
        }

        this.image.description = description;

        if (this.image.tags != null) {
            // this.image.tags = this.image.tags.replace(/ /g, "");
            this.image.tags = this.image.tags.toLowerCase();
            this.image.tags = this.image.tags.trim();
            this.image.tags = this._commonService.noscript(this.image.tags);
        }

        var epilepsy: boolean = Boolean(this.image.epilepsy);
        if (epilepsy == true) { // epilepsyFriendy true == may contain elements that cause epilepsy
            this.image.epilepsy = 1;
        }
        else {
            this.image.epilepsy = 0;
        }

        this.image.rights = this._rights; // Assign the _rights value. If in the html model we assign it to the field image.rights, it loads with nothing selected

        // console.log(this._rights);
        // console.log(this._file);
        // console.log(this.image);

        this._imageService.upload(this.token, this.image).subscribe(
            response => {
                if (!response.status || response.status != 'error') {
                    this.status = "success";

                    if (this.config.share == true) {
                        let estado = false;
                        let data = {
                            user_id: response.image.user.id,
                            image_id: response.image.id,
                            action: "share",
                            method: "POST"
                        }
                        this._imageService.interact(this.token, data, estado).subscribe(
                            response => {
                                if (response.status == "success") {
                                    this._router.navigate(['home']);
                                }
                                console.log(response);
                            },
                            error => {
                                console.log(error);
                            }
                        );
                    }
                    form.reset();
                }
                else {
                    this.status = "error";
                }

                let message = this.status = "success" ? this.currentLang.attributes.uploadSuccess : this.currentLang.attributes.uploadError;

                this.emitter.emit({
                    type: emitterTypes.alert,
                    status: response.status,
                    notificationType: response.status,
                    message: message,
                    timer: 3000
                });
            },
            error => {
                this.status = "error";

                this.emitter.emit({
                    type: emitterTypes.alert,
                    status: "error",
                    notificationType: "error",
                    message: this.currentLang.attributes.uploadError,
                    timer: 3000
                });
            }
        );
    }

    nameGen() {
        let randomName = "";
        for (let i = 0; i < 10; i++) {
            let letter = Math.random() * 25 + 65;
            randomName += String.fromCharCode(letter);
        }
        randomName += "-";
        for (let i = 0; i < 6; i++) {
            let number = Math.random() * 9 + 48;
            randomName += String.fromCharCode(number);
        }
        return randomName;
    }

    loadUser() {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        // console.log(this.token);
    }

    getLang(lang) {
        this.language = [
            {
                lang: "english",
                attributes: {
                    title: "Upload image",
                    uploadSuccess: "Image uploaded successfully.",
                    uploadError: "There was an error while uploading the image. Please try again later.",
                    maxSize: "Max 2Mb.",
                    minResolution: "The resolution must be higher than 400x400.",
                    imageTitle: "Image title:",
                    invalidTitle: "Please introduce a title for the image.",
                    description: "Description",
                    nsfwContent: "Explicit content (+18)",
                    epilepsyContent: "May contain elements that cause epilepsy",
                    rights: "Rights:",
                    total: "All",
                    partial: "Partial",
                    none: "None",
                    tags: "Tags:",
                    tagsExample: "Example: Nebby, pokemon, moon",
                    uploadImage: "Upload image",
                    tagsPlaceholder: "Tags (separated by commas)",
                    max30CharsPlaceholder: "Max 30 characters",
                    max300CharsPlaceholder: "Max 300 characters"
                }
            },

            {
                lang: "spanish",
                attributes: {
                    title: "Subir imagen",
                    uploadSuccess: "Imagen subida correctamente.",
                    uploadError: "Error al subir la imagen. Inténtalo de nuevo más tarde.",
                    maxSize: "Máximo 2Mb.",
                    minResolution: "Debe ser una resolución superior a 400x400.",
                    imageTitle: "Título de la imagen:",
                    invalidTitle: "Por favor, introduce un título para la imagen.",
                    description: "Descripción",
                    nsfwContent: "Contenido explícito (+18)",
                    epilepsyContent: "Puede contener elementos que causen epilepsia",
                    rights: "Tipos de derechos:",
                    total: "Totales",
                    partial: "Parciales",
                    none: "Ninguno",
                    tags: "Tags:",
                    tagsExample: "Ejemplo: Nebulilla, pokemon, moon",
                    uploadImage: "Subir imagen",
                    tagsPlaceholder: "Tags (separadas por comas)",
                    max30CharsPlaceholder: "Máx 30 caracteres",
                    max300CharsPlaceholder: "Máx 300 caracteres"
                }
            }
        ];
        return this.language[(lang - 1)];
    }
}
