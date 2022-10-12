import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, mixed, boolean } from "yup";
import axios from "axios";
import { API_URL } from "../../../config";
import { useParams } from "react-router-dom";
import {
  fetchOneUser,
  updateUser,
} from "../../../redux/User/UserActionCreators";
import { connect } from "react-redux";
import styled from "styled-components";
import { parseData } from "../../../utils/transformer";
import { toast } from "react-toastify";

const EditSalarie = ({ users, fetchOneUser, updateUser, user }) => {
  const { uuid } = useParams();
  const [userId, setUserId] = useState(null);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const userInfo = parseData(user);

  const userSchema = object({
    prenom: string()
      .required("Veuillez saisir votre Prénom")
      .typeError("Veuillez saisir des characters alphabetic."),
    nom: string()
      .required("Veuillez saisir votre Nom")
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
    telephone: string()
      .required("Veuillez saisir le numéro de téléphone")
      .typeError("Veuillez saisir des characters alphabetic."),
    mobile: string()
      .required("Veuillez saisir le numéro mobile")
      .typeError("Veuillez saisir des characters alphabetic."),
    fonction: string()
      .required("Veuillez saisir la fonction")
      .typeError("Veuillez saisir des characters alphabetic."),
    titre: string()
      .required("Veuillez choisir un titre")
      .typeError("Veuillez saisir des characters alphabetic."),
    is_active: boolean()
  });

  const { register, formState, handleSubmit } = useForm({
    mode: "onTouched",
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    fetchOneUser(uuid, "salarie");
  }, [uuid, fetchOneUser]);

  useEffect(() => {
    async function fetchAgents() {
      await axios
        .get(API_URL + `/agent_app/agent?paginated=no`)
        .then((response) => {
          setAgents(response.data);
          setAgentsLoading(false);
        });
    }
    fetchAgents();
    return () => {};
  }, []);

  useEffect(() => {
    if (!users.oneUserLoading) {
      setUserId(users?.oneUser?.user?.id);
    }
  }, [users.oneUserLoading, users?.oneUser?.user?.id]);

  const { isSubmitting, errors } = formState;

  const editUser = async (formData) => {
    const data = {...formData, login: users?.oneUser?.user?.login, client: userInfo.client_id};
    console.log(data);
    await axios.put(`${API_URL}/salarie_app/salarie/${uuid}`, data)
        .then((r) => {
            if (r.status === 200) {
                toast.success(`Le salarié à été modifier avec succès`);
            }
        })
        .catch((e) => {
            toast.error(`toast.error('Une erreur c\'est produit pendant la modification du salaries.`);
            toast.error('Veuillez contacter le service de maintenance.');
        });
  };

  return (
    <div className="content-wrapper">
      {/* Content Wrapper. Contains page content */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Modifier un Salarié</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Salarié</li>
                <li className="breadcrumb-item active">Modifier un Salarié</li>
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
                    Modifier les information du salarié{" "} <b>
                    {!users.oneUserLoading &&
                      users.oneUserLoadingError === false &&
                      users.oneUser.hasOwnProperty("id") &&
                      `${users.oneUser.user.prenom.toUpperCase()}  ${users.oneUser.user.nom.toUpperCase()}`}</b>
                  </h3>
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
                                disabled
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
                              {errors.prenom && (
                                <small className="form-text is-red">
                                  {errors.prenom.message}
                                </small>
                              )}
                            </div>
                          </div>
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
                        </div>

                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="nom">Titre</label>
                              <select
                                className={
                                  "form-control " +
                                  (errors.titre && ` is-border-red`)
                                }
                                {...register("titre")}
                                defaultValue={users.oneUser.user.titre}
                              >
                                <option value={"Mr"}>M.</option>
                                <option value={"Mme"}>Mme.</option>
                              </select>
                              {errors.titre && (
                                <small className="form-text is-red">
                                  {errors.titre.message}
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
                                placeholder="Entre le numéro de téléphone"
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
                              <label htmlFor="exampleInputEmail1">Mobile</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.mobile && `is-border-red`)
                                }
                                defaultValue={users.oneUser.mobile}
                                placeholder="Entre le numéro de téléphone"
                                {...register("mobile")}
                              />
                              {errors.mobile && (
                                <small className="form-text is-red">
                                  {errors.mobile.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="adresse">Fonction</label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.fonction && `is-border-red`)
                                }
                                {...register("fonction")}
                                defaultValue={users.oneUser.fonction}
                                placeholder="Fonction"
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
                              <label htmlFor="adresse">Statut</label>
                              <select
                                className={
                                  "form-control " +
                                  (errors.is_active && ` is-border-red`)
                                }
                                {...register("is_active")}
                                defaultValue={1}
                              >
                                <option value={1}>active</option>
                                <option value={0}>inactive</option>
                              </select>
                              {errors.is_active && (
                                <small className="form-text is-red">
                                  {errors.is_active.message}
                                </small>
                              )}
                            </div>
                          </div>

                          
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
    user: state.auth.authUser
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

export default connect(mapStateToProps, mapDispatchToProps)(EditSalarie);
