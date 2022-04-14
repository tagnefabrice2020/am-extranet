import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import styled from "styled-components";
import { API_URL } from "../../../config";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { updateProfileSuccess } from "../../../redux/Auth/AuthActionCreators";
import { useTitle } from "../../../config/useTitle";


const Profile = ({ authUser, updateProfileSuccess }) => {

    let auth = JSON.parse(authUser.authUser);
    let uuid = auth.uuid;
    

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
    });

    const [loading, setLoading] = useState(true);

    const [user, setAuthUser] = useState(true);

    const {register, handleSubmit, formState} = useForm({
        mode: 'unTouched',
        resolver: yupResolver(userSchema)
    });

    useTitle('Profil');

    useEffect(() => {

    });

    useEffect(() => {
        async function fetchAuthUser () {
            let response = await axios.get(API_URL + `/profile/${uuid}`);
            
            setAuthUser(response.data.user);
           
            setLoading(false);
        }
        fetchAuthUser();
        return () => {}
    }, [uuid]);

    const editProfile = async (profile) => {
        console.log(profile)
        let response = await axios.patch(API_URL + `/profile/${uuid}/update`, profile)
        if (response.status === 200) {
            console.log(response.data.user)
            updateProfileSuccess(response.data.user);
            toast.success('Vos information ont été modifier.');
        } else {
            toast.error('Une erreur ces produit pendant la modification.');
        }
    }

    const {errors, isSubmitting} = formState;

    //console.log(auth);
    return (
        <section className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Profil</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Profil</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">

                            <div className="box box-primary">
                                <div className="box-body box-profile">
                                    <i className="bi bi-person-circle" style={{ fontSize: `35px` }}></i>
                                    <h3 className="profile-username text-center">{auth.first_name} {auth.last_name}</h3>
                                    <p className="text-muted text-center">{auth.role.toUpperCase()}</p>
                                    {/* <ul className="list-group list-group-unbordered">
                                <li className="list-group-item">
                                    <b>Followers</b> <a className="pull-right">1,322</a>
                                </li>
                            </ul>
                            <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a> */}
                                </div>

                            </div>
                        </div>

                        <div className="col-md-9">
                            {/* Main content */}
                            <section className="content">
                                <div className="container-fluid">
                                    <div className="row">
                                        {/* left column */}
                                        <div className="col-md-12">
                                            {/* general form elements */}
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Informations sur mon profil</h3>
                                                </div>
                                                {/* /.card-header */}
                                                {/* form start */}
                                                {loading && <>
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
                                                {!loading && Object.keys(user).length > 0 &&
                                                    <form onSubmit={handleSubmit(editProfile)}>
                                                        <div className="card-body">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Prénom</label>
                                                                <input
                                                                    type="firstname"
                                                                    className={"form-control " + (errors.firstname && ` is-border-red`)}
                                                                    defaultValue={user.first_name}
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
                                                                    defaultValue={user.last_name}
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
                                                                    defaultValue={user.email}
                                                                    {...register('email')}
                                                                />
                                                                {errors.email && <small className="form-text is-red">{errors.email.message}</small>}
                                                            </div>
                                                        </div>
                                                       
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

                    </div>
                </div>
            </section>
        </section>)
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

const mapStateToProps = (state) => {
    return {
        authUser: state.auth
    }
}

const mapDispatchPropsToState = (dispatch) => {
    return {
        updateProfileSuccess: (user) => dispatch(updateProfileSuccess(user)),
    }
}


export default connect(mapStateToProps, mapDispatchPropsToState)(Profile);