import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, mixed } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { storeUser } from "../../../redux/User/UserActionCreators";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../../../config";

const userSchema = object({
    firstname: string().required('Veuillez saisir votre Prénom').typeError('Veuillez saisir des characters alphabetic.'),
    lastname: string().required('Veuillez saisir votre Nom').typeError('Veuillez saisir des characters alphabetic.'),
    email: string()
            .email('Veuillez entrer une adresse email valid.')
            .required('Veuillez entre votre email.')
            .typeError('Veuillez entrer une adresse email valid.')
            .test('check-if-user-exist', 'Il exist déjà un client avec cette email.', async value => {
                value = value.length === 0 ? 'empty' : value
                const result = await axios.get(API_URL + `/check-if-email-exist/${value}`)
                return result.data !== 1
              }),
    role: mixed().oneOf(['1', '3', '2', '4'], 'Vous devez choisir parmis les options prescrit.').required('Veuillez choisir une option.').typeError('Vous devez choisir parmis les options prescrit.')
});

const NewUser = ({storeUser, users}) => {
    const {register, formState, reset, handleSubmit} = useForm({
        mode: 'unTouched',
        resolver: yupResolver(userSchema)
    });


    const {errors, isSubmitting} = formState;

    useEffect(() => {
        if(users.reset.form) {
            reset();
        }
    }, [users.reset.form, reset]);

    const newUser = (data) => {
        storeUser(data);
    }

    return (
        <div className="content-wrapper">
            {/* Content Wrapper. Contains page content */}
            {/* Content Header (Page header) */}
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Ajouter un Utilisateur</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item active">Utilisateur</li>
                    <li className="breadcrumb-item active">Ajouter un Utilisateur</li>
                    </ol>
                </div>
                </div>
            </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                    {/* left column */}
                    <div className="col-md-12">
                        {/* general form elements */}
                        <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Ajouter un Utilisateur</h3>
                        </div>
                        {/* /.card-header */}
                        {/* form start */}
                        <form onSubmit={handleSubmit(newUser)}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Prénom</label>
                                    <input 
                                        type="firstname" 
                                        className={"form-control " + (errors.firstname && ` is-border-red`) }
                                        placeholder="Prénom de l'utilisateur"
                                        {...register('firstname')}
                                    />
                                    {errors.firstname && <small className="form-text is-red">{errors.firstname.message}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nom</label>
                                    <input 
                                        type="lastname" 
                                        className={"form-control " + (errors.lastname && `is-border-red`)}
                                        placeholder="Nom de l'utilisateur" 
                                        {...register('lastname')}
                                    />
                                    {errors.lastname && <small className="form-text is-red">{errors.lastname.message}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input 
                                        type="email" 
                                        className={"form-control " + (errors.email && `is-border-red`)}
                                        placeholder="Entre votre email"
                                        {...register('email')} 
                                    />
                                    {errors.email && <small className="form-text is-red">{errors.email.message}</small>}
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Role</label>
                                    <select 
                                        className={"form-control " + (errors.role && `is-border-red`)}
                                        {...register('role')}
                                    >
                                        <option value="1">Administrateur</option>
                                        <option value="2">Agent</option>
                                        <option value="3">Client</option>
                                        <option value="4">Salarié</option>
                                    </select>
                                    {errors.role && <small className="form-text text-muted is-danger">{errors.role.message}</small>}
                                </div>
                            </div>
                            {/* /.card-body */}
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Sauvegarde en cours...' : 'Enregistrer'}</button>
                            </div>
                        </form>
                        </div>
                        {/* /.card */}
                        </div>
                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeUser: (user) => dispatch(storeUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewUser);