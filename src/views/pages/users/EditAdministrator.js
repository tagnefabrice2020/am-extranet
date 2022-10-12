import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string, mixed } from "yup";
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";
import {
  fetchOneUser,
  updateUser,
} from "../../../redux/User/UserActionCreators";
import { connect } from "react-redux";
import AppFormLoader from "../../../components/AppFormLoader";

const EditUser = ({ users, fetchOneUser, updateUser }) => {
  const { uuid } = useParams();
  const [userId, setUserId] = useState(null);

  const userSchema = object({
    prenom: string()
      .required("Veuillez saisir le Prénom")
      .typeError("Veuillez saisir des characters alphabetic."),
    nom: string()
      .required("Veuillez saisir le Nom")
      .typeError("Veuillez saisir des characters alphabetic."),
    login: string()
      .typeError("Veuillez saisir des characters alphabetic."),
    email: string()
      .email("Veuillez entrer une adresse email valid.")
      .required("Veuillez entre votre email.")
      .typeError("Veuillez entrer une adresse email valid.")
      .test(
        "check-if-user-exist",
        "Il exist déjà un client avec cette email.",
        async (value) => {
          value = value?.length === 0 ? "empty" : value;
          let result;
          if (userId) {
            result = await axios.get(
              API_URL + `/manager_app/checker?email=${value}&id=${userId}`
            );
            if (result.data.status === "good") return true;
          } else {
            return true;
          }
        }
      ),
    adresse: string()
      .required("Veuillez saisir l'adresse")
      .typeError("Veuillez saisir des characters alphabetic."),
    telephone: string()
      .required("Veuillez saisir numéro de téléphone")
      .typeError("Veuillez saisir des characters alphabetic."),
    is_active: mixed()
      .oneOf(["1", "0"], "Veuillez choisir parmis les options")
      .required("Veuillez choisir parmis les options"),
  });

  const { register, formState, handleSubmit, watch } = useForm({
    mode: "onTouched",
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    fetchOneUser(uuid, "administrateur");
  }, [uuid, fetchOneUser]);

  useEffect(() => {
    if (!users.oneUserLoading) {
      setUserId(users?.oneUser?.user?.id);
    }
  }, [users.oneUserLoading, users?.oneUser?.user?.id]);

  const { isSubmitting, errors } = formState;

  const editUser = (data) => {
    const { nom, prenom, is_active } = data;
    const newData = {
      ...data,
      login: users?.oneUser?.user?.login,
      is_active: is_active === "1" ? true : false
    };
    console.log(newData);
    updateUser(
      newData,
      uuid
    );
  };

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
                <li className="breadcrumb-item active">
                  Modifier un Utilisateur
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
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
                  <h3 className="card-title">
                    {!users?.oneUser?.errorCode && !users.oneUserLoading && (
                      <>Modifier l'utilisateur</>
                    )}{" "}
                    {!users.oneUserLoading &&
                      users.oneUserLoadingError &&
                      users?.oneUser?.errorCode === 401 && (
                        <span style={{ color: "red" }}>
                          Vous n'êtes pas autorisé à visualiser ou modifier
                          cette utilisateur
                        </span>
                      )}
                  </h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                {users.oneUserLoading && (
                  <>
                    <AppFormLoader />
                    <AppFormLoader />
                  </>
                )}
                {!users.oneUserLoading &&
                  users.oneUserLoadingError === false &&
                  users.oneUser.hasOwnProperty("id") && (
                    <form onSubmit={handleSubmit(editUser)}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="login">Login</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.login && ` is-border-red`)
                                }
                                defaultValue={users.oneUser.user.login}
                                placeholder="Le login"
                                disabled
                              />
                              {errors.login && (
                                <small className="form-text is-red">
                                  {errors.login.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="prenom">Prénom</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.prenom && ` is-border-red`)
                                }
                                defaultValue={users.oneUser.user.prenom}
                                placeholder="Prénom de l'utilisateur"
                                {...register("prenom")}
                              />
                              {errors.prenom && (
                                <small className="form-text is-red">
                                  {errors.prenom.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="nom">Nom</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.nom && `is-border-red`)
                                }
                                defaultValue={users.oneUser.user.nom}
                                placeholder="Nom de l'utilisateur"
                                {...register("nom")}
                              />
                              {errors.nom && (
                                <small className="form-text is-red">
                                  {errors.nom.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                className={
                                  "form-control " +
                                  (errors.email && `is-border-red`)
                                }
                                defaultValue={users.oneUser.user.email}
                                placeholder="Entre votre email"
                                {...register("email")}
                              />
                              {errors.email && (
                                <small className="form-text is-red">
                                  {errors.email.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Téléphone
                              </label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.telephone && `is-border-red`)
                                }
                                defaultValue={users.oneUser.telephone}
                                placeholder="Entre le numéro de telephone"
                                {...register("telephone")}
                              />
                              {errors.telephone && (
                                <small className="form-text is-red">
                                  {errors.telephone.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="adresse">Adresse</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.adresse && `is-border-red`)
                                }
                                {...register("adresse")}
                                defaultValue={users.oneUser.adresse}
                                placeholder="Entre votre adresse"
                              />
                              {errors.adresse && (
                                <small className="form-text is-red">
                                  {errors.adresse.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="adresse">Statut</label>
                              <select
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.is_active && `is-border-red`)
                                }
                                {...register("is_active")}
                                defaultValue={users.oneUser.user.is_active & 1}
                              >
                                <option value="1">active</option>
                                <option value="0">inactive</option>
                              </select>
                              {errors.adresse && (
                                <small className="form-text is-red">
                                  {errors.is_active.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          {/* <label htmlFor="role">Role</label> */}
                          <select
                            hidden
                            className={
                              "form-control " + (errors.role && `is-border-red`)
                            }
                            defaultValue={
                              users.oneUser.user.group.toLowerCase() ===
                              "administrateur"
                                ? 1
                                : users.oneUser.user.group.toLowerCase() ===
                                  "agent"
                                ? 2
                                : users.oneUser.user.group.toLowerCase() ===
                                  "client"
                                ? 3
                                : users.oneUser.user.group.toLowerCase() ===
                                  "salarie"
                                ? 4
                                : null
                            }
                            {...register("role")}
                          >
                            <option value="1">Administrateur</option>
                            <option value="2">Agent</option>
                            <option value="3">Client</option>
                            <option value="4">Salarié</option>
                          </select>
                          {errors.role && (
                            <small className="form-text text-muted is-danger">
                              {errors.role.message}
                            </small>
                          )}
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting
                            ? "Sauvegarde en cours..."
                            : "Enregistrer"}
                        </button>
                      </div>
                    </form>
                  )}
                {!users.oneUserLoading &&
                  users.oneUserLoadingError &&
                  users?.oneUser?.errorCode === 401 && (
                    <>
                      <img
                        src={require("../../../assets/dist/img/404.png")}
                        alt="non-authorizer"
                        style={{ width: "fit-content", margin: "10px auto" }}
                      />
                    </>
                  )}
              </div>
              {/* /.card */}
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneUser: (uuid, type) => dispatch(fetchOneUser(uuid, type)),
    updateUser: (user, uuid) => dispatch(updateUser(user, uuid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
