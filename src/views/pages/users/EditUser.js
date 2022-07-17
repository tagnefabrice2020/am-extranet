import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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
import styled from "styled-components";

const EditUser = ({ users, fetchOneUser, updateUser }) => {
  const { uuid, type } = useParams();
  const [userId, setUserId] = useState(null);

  const userSchema = object({
    prenom: string()
      .required("Veuillez saisir votre Prénom")
      .typeError("Veuillez saisir des characters alphabetic."),
    nom: string()
      .required("Veuillez saisir votre Nom")
      .typeError("Veuillez saisir des characters alphabetic."),
    login: string()
      .required("Veuillez saisir ce champs")
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
          let result
          if (userId) {
            result = await axios.get(
              API_URL + `/manager_app/checker?email=${value}&id=${userId}`
            );
            if (result.data.status === "good" ) return true;
          } else {
            return true
          }
        }
      ),
    role: mixed().oneOf(
      ["1", "2", "3", "4"],
      "Veuillez choisir parmis les roles proposer."
    ),
    fonction: string().when("role", {
      is: (type) => type === "salarie",
      then: string()
        .required("Veuillez choisir parmis les roles proposer.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    titre: string().when("role", {
      is: (type) => type === "salarie",
      then: string()
        .required("Veuillez choisir parmis les roles proposer.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    trigramme: string().when("role", {
      is: (type) => type === "agent",
      then: string()
        .required("Veuillez saisir le trigramme.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    mobile: string().when("role", {
      is: (type) => type === "salarie",
      then: string()
        .required("Veuillez choisir parmis les roles proposer.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    agent: string().when("role", {
      is: (type) => type === "salarie",
      then: string()
        .required("Veuillez choisir parmis les roles proposer.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    telephone: string().when("role", {
      is: (type) => type === "administrateur",
      then: string()
        .required("Veuillez saisir le numéro de téléphone.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
    adresse: string().when("role", {
      is: (type) => type !== "salarie",
      then: string()
        .required("Veuillez entrer l'adresse.")
        .typeError("Veuillez entrer les chaine de charactères"),
    }),
  });

  const { register, formState, handleSubmit } = useForm({
    mode: "onTouched",
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    fetchOneUser(uuid, type);
  }, [uuid, type, fetchOneUser]);

  useEffect(() => {
    if (!users.oneUserLoading) {
      setUserId(users?.oneUser?.user?.id);
    }
  });

  const { isSubmitting, errors, isValid } = formState;

  const editUser = (data) => {
    console.log(data);
    updateUser(data, uuid);
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
                  <h3 className="card-title">Modifier l'utilisateur</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                {users.oneUserLoading && (
                  <>
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
                                {...register("login")}
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
                              {errors.firstname && (
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
                              {errors.lastname && (
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
                        </div>

                        <div className="row">
                          {type !== "salarie" && (
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
                          )}
                           {type === "agent" && (
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="trigramme">Trigramme</label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.trigramme && `is-border-red`)
                                  }
                                  {...register("trigramme")}
                                  defaultValue={users.oneUser.trigramme}
                                  placeholder="Entre le trigramme"
                                />
                                {errors.trigramme && (
                                  <small className="form-text is-red">
                                    {errors.trigramme.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          )}
                          {type === "administrateur" && (
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
                          )}

                          {type === "salarie" && (
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="Mobile">Mobile</label>
                                <input
                                  defaultValue={users.oneUser?.mobile}
                                  className={
                                    "form-control " +
                                    (errors.mobile && `is-border-red`)
                                  }
                                  {...register("mobile")}
                                />
                                {errors.mobile && (
                                  <small className="form-text is-red">
                                    {errors.mobile.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {type === "salarie" && (
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="Titre">Titre</label>
                                <input
                                  defaultValue={users.oneUser?.titre}
                                  className={
                                    "form-control " +
                                    (errors.titre && `is-border-red`)
                                  }
                                  {...register("titre")}
                                />
                                {errors.titre && (
                                  <small className="form-text is-red">
                                    {errors.titre.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="fonction">Fonction</label>
                                <input
                                  defaultValue={users.oneUser?.fonction}
                                  className={
                                    "form-control " +
                                    (errors.fonction && `is-border-red`)
                                  }
                                  {...register("fonction")}
                                />
                                {errors.fonction && (
                                  <small className="form-text is-red">
                                    {errors.fonction.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="Agent">Agent</label>
                                <input
                                  defaultValue={1}
                                  className={
                                    "form-control " +
                                    (errors.agent && `is-border-red`)
                                  }
                                  {...register("agent")}
                                />
                                {errors.agent && (
                                  <small className="form-text is-red">
                                    {errors.agent.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="form-group">
                          <label htmlFor="role">Role</label>
                          <select
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

const FormBlockAnimation = styled.div`
  display: flex;
  padding: 1px 4px;
  flex-wrap: wrap;

  & > div {
    flex-grow: 1;
    height: 70px;
    display: flex;
    flex-direction: column;
    padding: 6px;
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
        background-color: hsl(200, 20%, 95%);
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
        background-color: hsl(200, 20%, 95%);
      }
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
