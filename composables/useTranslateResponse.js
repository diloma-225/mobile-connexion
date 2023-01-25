export const useTranslateResponse = (message)=>{
    const response = ref("");

    if (message == "AuthApiError: To signup, please provide your email") {
        response.value = "Pour vous inscrire, veuillez fournir votre email";
    }else if(message == "AuthApiError: Signup requires a valid password"){
        response.value = "L'inscription nécessite un mot de passe valide";
    } else if(message == "AuthApiError: Unable to validate email address: invalid format"){
        response.value = "Impossible de valider l'adresse e-mail : format invalide";
    }else if(message == "AuthApiError: User already registered"){
        response.value = "Utilisateur déjà enregistré";
    }else if(message == "AuthApiError: Invalid login credentials"){
        response.value = "Authentification invalide";
    }else if(message == "AuthApiError: Password should be at least 6 characters"){
        response.value = "Le mot de passe doit comporter au moins 6 caractères";
    }else if(message == "AuthApiError: Password recovery requires an email"){
        response.value =  "La récupération du mot de passe nécessite un e-mail";
    }
    else{
        response.value = "";
    }

    return {
        response
    }
}