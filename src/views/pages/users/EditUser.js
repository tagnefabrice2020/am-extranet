import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, mixed } from "yup";
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { fetchOneUser, updateUser } from "../../../redux/User/UserActionCreators";
import { connect } from "react-redux";
import styled from "styled-components";


const EditUser = ({ users, fetchOneUser, updateUser }) => {

    const { uuid } = useParams();

    const userSchema = object({
        firstname: string().required('Veuillez saisir votre Prénom').typeError('Veuillez saisir des characters alphabetic.'),
        lastname: string().required('Veuillez saisir votre Nom').typeError('Veuillez saisir des characters alphabetic.'),
        email: string()
            .email('Veuillez entrer une adresse email valid.')
            .required('Veuillez entre votre email.')
            .typeError('Veuillez entrer une adresse email valid.')
            .test('check-if-user-exist', 'Il exist déjà un client avec cette email.', async value => {
                value = value.length === 0 ? 'empty' : value
                const result = await axios.get(API_URL + `/check-if-email-exist/${value}/oneUser/${uuid}`)
                return result.data !== 1
            }),
        role: mixed().oneOf(['1', '3', '2', '4'], 'Vous devez choisir parmis les options prescrit.').required('Veuillez choisir une option.').typeError('Vous devez choisir parmis les options prescrit.')
    });

    const { register, formState, handleSubmit } = useForm({
        mode: 'unTouched',
        resolver: yupResolver(userSchema)
    });

    useEffect(() => {
        fetchOneUser(uuid);
    }, [uuid, fetchOneUser]);

    const { isSubmitting, errors } = formState;

    const editUser = (data) => {
        updateUser(data, uuid);
    }

    return (
        <div className="content-wrapper">
            {/* Content Wrapper. Contains page content */}
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Modifier un Utilisateur</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Utilisateur</li>
                                <li className="breadcrumb-item active">Modifier un Utilisateur</li>
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
                                    <h3 className="card-title">Modifier l'utilisateur</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                {users.oneUserLoading && <>
                                    <FormBlockAnimation>
                                        <div>
                                            <p></p>
                                            <div></div>
                                        </div>
                                        <div>
                                            <p></p>
                                            <div></div>
                                        </div>
                                    </FormBlockAnimation>
                                    <FormBlockAnimation>
                                        <div>
                                            <p></p>
                                            <div></div>
                                        </div>
                                        <div>
                                            <p></p>
                                            <div></div>
                                        </div>
                                    </FormBlockAnimation>
                                </>}
                                {!users.oneUserLoading && users.oneUserLoadingError === false && users.oneUser.hasOwnProperty('uuid') &&
                                    <form onSubmit={handleSubmit(editUser)}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Prénom</label>
                                                <input
                                                    type="firstname"
                                                    className={"form-control " + (errors.firstname && ` is-border-red`)}
                                                    defaultValue={users.oneUser.first_name}
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
                                                    defaultValue={users.oneUser.last_name}
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
                                                    defaultValue={users.oneUser.email}
                                                    {...register('email')}
                                                />
                                                {errors.email && <small className="form-text is-red">{errors.email.message}</small>}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Role</label>
                                                <select
                                                    className={"form-control " + (errors.role && `is-border-red`)}
                                                    {...register('role')}
                                                    defaultValue={users.oneUser.role_id}
                                                >
                                                    <option value="1">Administrateur</option>
                                                    <option value="2">Client</option>
                                                    <option value="3">Agent</option>
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
                                }
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

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOneUser: (uuid) => dispatch(fetchOneUser(uuid)),
        updateUser: (user, uuid) => dispatch(updateUser(user, uuid)),
    }
}


const FormBlockAnimation = styled.div`
    display: flex;
    padding: 1px 4px;
    flex-wrap: wrap;

    & > div {
        flex-grow: 1;
        height: 70px;
        display: flex;
        flex-direction: column;
        padding:6px;
    }

    & > div > p {
        height: 20px;
        width: 30%;
        animation: skeleton-loading 1s linear infinite alternate;
        border-radius: 4px;
        margin: 8px 0px;
        @keyframes skeleton-loading {
            0% {
                background-color: hsl(200, 10%, 80%);
            }
    
            100% {
                background-color:  hsl(200, 20%, 95%);
            }
        }
    }

    & > div > div {
        max-height: 35px;
        border-radius: 4px;
        height: 35px;
        width: 100%;
        animation: skeleton-loading 1s linear infinite alternate;
        @keyframes skeleton-loading {
            0% {
                background-color: hsl(200, 10%, 80%);
            }
    
            100% {
                background-color:  hsl(200, 20%, 95%);
            }
        }
    }
`

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);