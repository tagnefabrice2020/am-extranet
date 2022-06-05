import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AppLogo from "../../../components/AppLogo";
import { object, string } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from "react-redux";
import { authenticate } from "../../../redux/Auth/AuthActionCreators";
import { useTitle } from "../../../config/useTitle";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

const loginSchema = object({
    username: string().required('L\'email est obligatoire.').typeError('Veuillez saisir un adresse mail correct.'),
    password: string().required('Le mot de passe est obligation.').min(6, 'Le mot de passe doit être de six charactères minimum.')
});

const Login = ({ loginData, authenticate }) => {

    useTitle('Authentifier vous!')

    const [verified, setVerified] = useState(false);

    useEffect(() => {
    }, [])

    /*const onChange = (value) => {
        console.log(value)
    }*/

    const { register, handleSubmit, formState } = useForm({
        mode: 'unTouched',
        resolver: yupResolver(loginSchema)
    })

    const { errors, isSubmitting, isDirty, isValid } = formState;

    const loginAction = (data) => {
        if (verified) {
            authenticate(data)
        } else {
            toast.error('L\'operation ne peut pas continuer, car vous n\'avez pas été verifier par le recaptha.');
        }
        //window.location.reload();
        //console.log(loginData.authUser)
    }

    const verifyRecaptchaCallback = (response) => {
        if(response) setVerified(true)
    } 

    return (
        <div className="login-box mx-auto mt-5" style={{ transform: `translate(0%,18%)` }}>
            <div className="mx-auto mb-3" style={{ width: 'fit-content' }}>
                <AppLogo />
            </div>
            <div className="login-logo">
                <Link to="/login"><b>AMEXPERT-EXTRANET TEST</b></Link>
            </div>
            {/* /.login-logo */}
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Connectez-vous</p>

                    <form onSubmit={handleSubmit(loginAction)}>
                        <div className="input-group mb-1">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email ou identifiant"
                                {...register('username')}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        {errors.username && <small className="form-text is-red">{errors.username.message}</small>}
                        <div className="input-group mb-1 mt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mot de passe"
                                {...register('password')}
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        {errors.password && <small className="form-text is-red">{errors.password.message}</small>}
                        <div className="row">
                            <p className="mb-1 col">
                                <Link to="/lost-password" style={{ fontSize: `.8rem`, color: `#bf7b0c` }}>Mot de passe oublié ?</Link>
                            </p>
                        </div>
                        <div className="row">
                            <div className="col">
                                <ReCAPTCHA
                                    sitekey="6LeEYXMfAAAAAFVUq4HuvOqXMeJIByLScI0v4wfe"
                                    onChange={verifyRecaptchaCallback}
                                    type="image"
                                    // https://www.google.com/recaptcha/admin/site/527655300/setup
                                    // https://www.google.com/recaptcha/admin/site/527664127/setup
                                />
                            </div>
                        </div>
                        <div className="row mt-2 mb-3">
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block g-recaptcha"
                                    disabled={isSubmitting || (!isValid && !isDirty) || !verified}>
                                    {loginData.loading && `Connexion en cours...`} {!loginData.loading && `Connexion`}

                                </button>
                            </div>
                            {/* /.col */}
                        </div>
                    </form>
                </div>
                {/* /.login-card-body */}
            </div>

            {/* /.login-box */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loginData: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (data) => dispatch(authenticate(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
