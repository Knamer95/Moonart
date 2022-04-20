import { Languages, LanguageStruct } from "../types/config";

export const languagePackage: LanguageStruct = {
    english: {
        common: {},
        app: {
            title: null,
            gallery: "Gallery",
            feed: "Feed",
            uploadImage: "Upload image",
            searchImage: "Search images",
            login: "Login",
            register: "Register",
            welcomeMsg: "Hi",
            profile: "Profile",
            editProfile: "Edit profile",
            config: "Configuration",
            exit: "Log out",
        },
        error: {
            title: "Error",
            wrongLinkTitle: "The page you are trying to access does not exist",
            wrongLinkBody:
                "If you think this is an error, please contact us at sistemas@moonart.com",
            goBack: "Back to home",
        },
        feed: {
            title: "Feed",
            suchEmpty: "Such empty!",
            followTip:
                "You don't follow any user, or the users you follow haven't shared anything yet...",
            noDescription: "User didn't add a description.",
            sharedBy: "Shared by",
            by: "by",
            the: "",
            ago: " ago",
        },
        home: {
            title: "Latest",
            suchEmpty: "Such empty!",
            tip: "There are no pictures yet. Why not be the first one?",
            by: "By",
            previous: "Previous",
            next: "Next",
        },
        image: {
            title: "Image",
            hiddenImage:
                "This image has been disabled due to infringement of rules. If you think this is a mistake, please contact with a moderator.",
            unbannedImage: "Image unbanned successfully.",
            deletedImage: "Image deleted successfully.",
            deletedImageError:
                "There was an error while trying to delete the image. Please try again later.",
            commentAdded: "Comment added successfully.",
            description: "Description",
            noDescription: "User didn't add a description.",
            rights: "Rights",
            total: "All",
            partial: "Partial",
            none: "None",
            tags: "Tags",
            by: "by",
            moreBy: "More by",
            uploaded: "Upload date",
            comments: "Comments",
            addComment: "COMMENT",
            show: "Show",
            reply: "Reply",
            delete: "Delete",
            remove: "Delete",
            hide: "Hide",
            unban: "Unban",
            report: "Report",
            edit: "Edit",
            cancel: "Cancel",
            the: "",
            ago: " ago",
            newComment: "Add a new comment...",
            deletedComment: "Comment deleted.",
            deletedComment2: "Comment deleted successfully.",
            deleteModalTitle: "Delete image?",
            deleteModalBody: "The image will be deleted permanently.",
            hideModalTitle: "Hide image?",
            hideModalBody: "The image won't show up again.",
            showModalTitle: "Unban image?",
            showModalBody: "The image will be shown again.",
            deleteCommentModalTitle: "Delete comment?",
            deleteCommentModalBody: "The comment will be deleted permanently.",
            imageAlert1: "This image may contain",
            imageAlert2: " sensitive elements",
            imageAlert3: " | ",
            imageAlert4: " elements that cause epilepsy",
            imageAlert5: ".",
        },
        login: {
            title: "Login",
            messageSuccess: "Logged in succesfully.",
            messageError: "Error while trying to log in. Please try again.",
            invalidUser:
                "Invalid user. Please, introduce your nick or email here.",
            invalidPassword:
                "Invalid password. Minimum 8 characters. It must contain a capital letter and a number at least.",
            rememberMe: "Remember me",
            login: "Log in",
            placeholderUser: "Nick / Email",
            placeholderPassword: "Password",
            forgotPassword: "Forgot password",
        },
        profile: {
            title: "Profile",
            edit: "Edit",
            followers: "Followers",
            following: "Following",
            noDescription: "User didn't add a description.",
            comments: "Comments",
            gallery: "Gallery",
            likes: "Likes",
            favs: "Favs",
            wrongUserTitle: "User does not exist or has been deleted",
            wrongUserBody:
                "If you think this is an error, please contact us at sistemas@moonart.com",
            goBack: "Back to home",
        },
        register: {
            title: "Register",
            messageSuccess1: "You were registered successfully.",
            messageSuccess2: "",
            messageError:
                "There was an error while trying to register the user. If this error persists, please contact an administrator.",
            messageError1:
                "The email is already in use, please choose another one",
            messageError2:
                "The nick is already in use, please choose another one",
            messageError3:
                "The nick and email are already in use, please choose different ones",
            passwordsDontMatch: "The passwords don't match",
            invalidName: "Invalid name (admits letters, lowerdash)",
            invalidUser:
                "Nick must be between 4 and 10 characters (admits letters, numbers, dash, and lowerdash)",
            invalidEmail: "Invalid email structure",
            invalidPassword:
                "Password must be at least 8 characters, and contain a capital letter and a number at least",
            register: "Register",
            placeholderName: "Name",
            placeholderUser: "Nick",
            placeholderEmail: "Email",
            placeholderPassword: "Password",
            placeholderConfirmPassword: "Confirm password",
        },
        search: {
            title: "Results:",
            by: "by",
            filter: "filter",
            previous: "Previous",
            next: "Next",
        },
        settings: {
            title: "Settings",
            nightMode: "Mode [Day | Night]",
            showNsfw: "Show sensitive content",
            showEpilepsy: "Show flashy elements",
            shareImages: "Share images",
            feedElements: "Feed elements",
            paginationType: "Gallery display [By page | Scroll]",
            language: "Language",
            themes: "Themes",
        },
        uploadImage: {
            title: "Upload image",
            uploadSuccess: "Image uploaded successfully.",
            uploadError:
                "There was an error while uploading the image. Please try again later.",
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
            max300CharsPlaceholder: "Max 300 characters",
        },
        userEdit: {
            title: "Edit profile",
            shortDescription: "Tell the world who you are!",
            profileUpdateSuccess: "You have updated your profile successfully.",
            profileUpdateError:
                "There was an error while updating the profile.",
            passwordsDontMatch: "The passwords don't match.",
            imageError:
                "Error, image is too big. Only images smaller than 1Mb.",
            basic: "Basic",
            advanced: "Advanced",
            name: "Name",
            invalidName: "Invalid name.",
            user: "Nick",
            invalidUser: "Invalid nick.",
            currentPass: "Current password",
            password: "Password",
            currentPassNotMatching:
                "The introduced password doesn't match with the current password.",
            newPassword: "New password",
            invalidPassword:
                "Invalid password. Minimum 8 characters. It must contain a capital letter and a number at least.",
            passwordsNotMatching: "The passwords don't match.",
            repeatPassword: "Repeat password",
            saveChanges: "Save changes",
            cancel: "Cancel",
        },
    },
    spanish: {
        common: {},
        app: {
            title: null,
            gallery: "Galería",
            feed: "Feed",
            uploadImage: "Subir imagen",
            searchImage: "Buscar imágenes",
            login: "Entrar",
            register: "Registrarse",
            welcomeMsg: "Hola",
            profile: "Perfil",
            editProfile: "Editar perfil",
            config: "Configuración",
            exit: "Salir",
        },
        error: {
            title: "Error",
            wrongLinkTitle: "La página a la que intentas acceder no existe",
            wrongLinkBody:
                "Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com",
            goBack: "Volver al inicio",
        },
        feed: {
            title: "Feed",
            suchEmpty: "¡Qué vacío!",
            followTip:
                "No sigues a ningún usuario, o éstos no han compartido nada todavía...",
            noDescription: "El usuario no ha agregado ninguna descripción.",
            sharedBy: "Compartido por",
            by: "por",
            the: "El ",
            ago: "",
        },
        home: {
            title: "Novedades",
            suchEmpty: "¡Qué vacío!",
            tip: "No hay imágenes todavía. ¿Por qué no ser el primero?",
            by: "Por",
            previous: "Anterior",
            next: "Siguiente",
        },
        image: {
            title: "Imagen",
            hiddenImage:
                "La imagen ha sido deshabilitada porque inflingía las normas. Si crees que esto es un error, por favor contacta con un moderador.",
            unbannedImage: "Imagen desocultada correctamente.",
            deletedImage: "La imagen se ha borrado correctamente.",
            deletedImageError:
                "Ocurrió un error al intentar borrar la imagen. Por favor, inténtelo más tarde.",
            commentAdded: "Comentario añadido correctamente.",
            description: "Descripción",
            noDescription: "El usuario no ha agregado ninguna descripción.",
            rights: "Derechos",
            total: "Totales",
            partial: "Parciales",
            none: "Ninguno",
            tags: "Tags",
            by: "por",
            moreBy: "Más de",
            uploaded: "Fecha de subida",
            comments: "Comentarios",
            addComment: "COMENTAR",
            show: "Mostrar",
            reply: "Responder",
            delete: "Eliminar",
            remove: "Borrar",
            hide: "Ocultar",
            unban: "Desbanear",
            report: "Reportar",
            edit: "Editar",
            cancel: "Cancelar",
            the: "",
            ago: " ago",
            newComment: "Añadir nuevo comentario...",
            deletedComment: "Comentario borrado.",
            deletedComment2: "Comentario borrado correctamente.",
            deleteModalTitle: "¿Borrar imagen?",
            deleteModalBody: "La imagen se borrará permanentemente.",
            hideModalTitle: "¿Ocultar imagen?",
            hideModalBody: "La imagen ya no se mostrará.",
            showModalTitle: "¿Desbanear imagen?",
            showModalBody: "La imagen se mostrará de nuevo.",
            deleteCommentModalTitle: "¿Borrar comentario?",
            deleteCommentModalBody: "El comentario se borrará permanentemente.",
            imageAlert1: "Esta imagen puede contener elementos",
            imageAlert2: " sensibles",
            imageAlert3: " | ",
            imageAlert4: " que causen epilepsia",
            imageAlert5: ".",
        },
        login: {
            title: "Acceso",
            messageSuccess: "Te has identificado correctamente.",
            messageError: "Error al identificarse. Inténtalo de nuevo.",
            invalidUser:
                "Usuario no válido. Por favor, introduce tu nick o tu email aquí.",
            invalidPassword:
                "Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula y un número.",
            rememberMe: "Recordarme",
            login: "Iniciar sesión",
            placeholderUser: "Nick / Email",
            placeholderPassword: "Contraseña",
            forgotPassword: "Olvidé mi contraseña",
        },
        profile: {
            title: "Perfil",
            edit: "Editar",
            followers: "Seguidores",
            following: "Siguiendo",
            noDescription: "El usuario no ha agregado ninguna descripción.",
            comments: "Comentarios",
            gallery: "Galería",
            likes: "Likes",
            favs: "Favs",
            wrongUserTitle: "El usuario no existe o ha borrado su cuenta",
            wrongUserBody:
                "Si crees que es un error de la página, por favor contáctanos en sistemas@moonart.com.",
            goBack: "Volver al inicio",
        },
        register: {
            title: "Registro",
            messageSuccess1: "Te has registrado correctamente",
            messageSuccess2: "",
            messageError:
                "Ocurrió un error al intentar registrar el usuario. Si el error persiste, por favor contacta a un administrador.",
            messageError1: "El email ya está en uso, por favor, escoge otro",
            messageError2: "El nick ya está en uso, por favor, escoge otro",
            messageError3:
                "El nick y email ya están en uso, por favor, escoge otros",
            passwordsDontMatch: "Las contraseñas no coinciden",
            invalidName: "Nombre no válido (admite letras y guión bajo)",
            invalidUser:
                "El nick debe tener entre 4 y 10 caracteres (admite letras, números, guión, y guión bajo)",
            invalidEmail: "Estructura de email no válida",
            invalidPassword:
                "La contraseña debe tener mínimo 8 caracteres, y al menos una letra mayúscula y un número",
            register: "Registrarse",
            placeholderName: "Nombre",
            placeholderUser: "Nick",
            placeholderEmail: "Email",
            placeholderPassword: "Contraseña",
            placeholderConfirmPassword: "Confirmar contraseña",
        },
        search: {
            title: "Resultados de:",
            by: "por",
            filter: "filtro",
            previous: "Anterior",
            next: "Siguiente",
        },
        settings: {
            title: "Ajustes",
            nightMode: "Modo [Día | Noche]",
            showNsfw: "Mostrar contenido sensible",
            showEpilepsy: "Mostrar elementos llamativos",
            shareImages: "Compartir imágenes",
            feedElements: "Elementos de feed",
            paginationType: "Desplegar galeria [Por página | Scroll]",
            language: "Idioma",
            themes: "Temas",
        },
        uploadImage: {
            title: "Subir imagen",
            uploadSuccess: "Imagen subida correctamente.",
            uploadError:
                "Error al subir la imagen. Inténtalo de nuevo más tarde.",
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
            max300CharsPlaceholder: "Máx 300 caracteres",
        },
        userEdit: {
            title: "Editar perfil",
            shortDescription: "¡Dile al mundo quién eres!",
            profileUpdateSuccess: "Has actualizado tu perfil correctamente.",
            profileUpdateError: "Error al actualizar la información.",
            passwordsDontMatch: "Las contraseñas no coinciden.",
            imageError:
                "Error, imagen demasiado grande. Sólo imágenes menores de 1Mb.",
            basic: "Básico",
            advanced: "Avanzado",
            name: "Nombre",
            invalidName: "Nombre no válido.",
            user: "Nick",
            invalidUser: "Nick no válido.",
            currentPass: "Contraseña actual",
            password: "Contraseña",
            currentPassNotMatching:
                "La contraseña introducida no corresponde con la actual.",
            newPassword: "Nueva contraseña",
            invalidPassword:
                "Contraseña no válida. Mínimo 8 caracteres. Debe contener al menos una letra mayúscula, un número.",
            passwordsNotMatching: "Las contraseñas no coinciden.",
            repeatPassword: "Repite la contraseña",
            saveChanges: "Guardar cambios",
            cancel: "Cancelar",
        },
    },
};

export const defaultLanguage: Languages = "english";

export const admittedLanguages = Object.keys(languagePackage);

export const getCurrentLanguage = (language) =>
    admittedLanguages.includes(language) ? language : defaultLanguage;