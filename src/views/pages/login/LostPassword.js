import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { Link } from "react-router-dom";
import AppLogo from "../../../components/AppLogo";

const loginSchema = object({
    email: string().email('Veuillez saisir un adresse mail correct.').required('L\'email est obligatoire.').typeError('Veuillez saisir un adresse mail correct.'),
});

const LostPassword = () => {
    
    const {register, handleSubmit, formState} = useForm({
        mode: 'unTouched',
        resolver: yupResolver(loginSchema)
    });

    const {errors, isSubmitting} = formState;

    const lostPasswordAction = async (data) => {
        console.log(data)
    }

    return (<div className="login-box mx-auto mt-5" style={{ transform: `translate(0%,18%)` }}>
        <div className="mx-auto mb-3" style={{ width: 'fit-content' }}>
            <AppLogo />
        </div>
        <div className="login-logo">
            <Link to="/login"><b>AMEXPERT</b></Link>
        </div>
        {/* /.login-logo */}
        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">Mot de passe oublié</p>
                <p className="login-box-msg"><small>Entrez l'adresse e-mail associée à votre compte</small></p>

                <form onSubmit={handleSubmit(lostPasswordAction)}>
                    <div className="input-group mb-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email ou identifiant"
                            {...register('email')}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    {errors.email && <small className="form-text is-red">{errors.email.message}</small>}
                    
                    
                    <div className="row mt-4">
                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block g-recaptcha"
                                disabled={isSubmitting}>
                                {isSubmitting && `Connexion en cours...`} {!isSubmitting && `Connexion`}

                            </button>
                        </div>
                        {/* /.col */}
                    </div>
                </form>
            </div>
            {/* /.login-card-body */}
        </div> 

        {/* /.login-box */}
    </div>)
}

export default LostPassword;