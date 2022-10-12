import { object, string, mixed } from "yup";

export const userAdminSchema = object({
    prenom: string()
        .required('Veuillez saisir votre Prénom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    nom: string()
        .required('Veuillez saisir votre Nom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    adresse: string()
        .required('Veuillez saisir votre adresse')
        .typeError('Veuillez saisir des characters alphabetic.'),
    telephone: string()
        .required('Veuillez saisir le numero de téléphone.'),
    email: string()
        .email('Veuillez entrer une adresse email valid.')
        .required('Veuillez entre votre email.')
        .typeError('Veuillez entrer une adresse email valid.'),
    login: string()
        .required('Veuillez entre le login.')
        .typeError('Veuillez entrer un login valid.'),
    mdp: string()
        .required('Veuillez entre le mot de passe')
        .typeError('Veuillez entrer un mot de passe valid.'),
    role: mixed().oneOf(['1', '2', '3', '4', '5', '6'], 'Veuillez choisir parmis les roles proposer.')
        .required('Veuillez choisir parmis les roles proposer.')
});

export const userAgentSchema =  object({
    firstname: string()
        .required('Veuillez saisir votre Prénom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    lastname: string()
        .required('Veuillez saisir votre Nom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    adresse: string()
        .required('Veuillez saisir votre adresse')
        .typeError('Veuillez saisir des characters alphabetic.'),
    telephone: string()
        .required('Veuillez saisir le numero de téléphone.'),
    email: string()
        .email('Veuillez entrer une adresse email valid.')
        .required('Veuillez entre votre email.')
        .typeError('Veuillez entrer une adresse email valid.'),
    login: string()
        .required('Veuillez entre le login.')
        .typeError('Veuillez entrer un login valid.'),
    mdp: string()
        .required('Veuillez entre le mot de passe')
        .typeError('Veuillez entrer un mot de passe valid.')
});

export const userClientSchema = object({
    firstname: string()
        .required('Veuillez saisir votre Prénom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    lastname: string()
        .required('Veuillez saisir votre Nom')
        .typeError('Veuillez saisir des characters alphabetic.'),
    adresse: string()
        .required('Veuillez saisir votre adresse')
        .typeError('Veuillez saisir des characters alphabetic.'),
    telephone: string()
        .required('Veuillez saisir le numero de téléphone.'),
    email: string()
        .email('Veuillez entrer une adresse email valid.')
        .required('Veuillez entre votre email.')
        .typeError('Veuillez entrer une adresse email valid.'),
    login: string()
        .required('Veuillez entre le login.')
        .typeError('Veuillez entrer un login valid.'),
    mdp: string()
        .required('Veuillez entre le mot de passe')
        .typeError('Veuillez entrer un mot de passe valid.')
});