import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { object, string, mixed } from "yup";
import { API_URL } from "../../../config";
import { reset } from "../../../redux/User/UserActionCreators";
import { parseData } from "../../../utils/transformer";

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
    .typeError("Veuillez entrer une adresse email valid."),
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
});

const NewSalarie = ({ user }) => {
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "unTouched",
    resolver: yupResolver(userSchema),
  });
  const { errors, isSubmitting } = formState;

  const userInfo = parseData(user);

  const ajouterSalarie = async (formData) => {
    const data = { ...formData, agent: 1, client: userInfo.client_id, mdp: `00000` };
    await axios.post(`${API_URL}/salarie_app/salarie/`, data)
        .then((r) => {
            if (r.status === 200) {
                toast.success(`Le salarié à été modifier avec succès`);
                reset();
            }
        })
        .catch((e) => {
            toast.error(`toast.error('Une erreur c'est produit pendant la modification du salaries.`);
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
              <h1>Modifier un Utilisateur</h1>
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
                  <h3 className="card-title">Ajouter un salarié</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={handleSubmit(ajouterSalarie)}>
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
                              "form-control " + (errors.nom && `is-border-red`)
                            }
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
                          <label htmlFor="exampleInputEmail1">Téléphone</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.telephone && `is-border-red`)
                            }
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
                            placeholder="Fonction"
                          />
                          {errors.fonction && (
                            <small className="form-text is-red">
                              {errors.fonction.message}
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
                      {isSubmitting ? "Sauvegarde en cours..." : "Enregistrer"}
                    </button>
                  </div>
                </form>
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
      user: state.auth.authUser,
    };
  };
  

export default connect(mapStateToProps, null)(NewSalarie);
