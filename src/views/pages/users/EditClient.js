import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed, number } from "yup";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";
import axios from "axios";
import {
  fetchOneUser,
  updateUser,
} from "../../../redux/User/UserActionCreators";
import AppFormLoader from "../../../components/AppFormLoader";

const EditClient = ({ users, fetchOneUser, updateUser }) => {
  const { uuid } = useParams();
  const [userId, setUserId] = useState(null);
  const simpleValidation = string()
    .required("Veuillez remplir ce champs")
    .typeError("Veuillez saisir des characters alphabetic.");
  const simpleEmailValidation = string()
    .email("Veuillez saisir une email correct")
    .required("Veuillez remplir ce champs")
    .typeError("Veuillez saisir des characters alphabetic.");
  const phoneNumberValidation = number()
    .min(10, "Veuillez saisir 10 chiffres")
    .required("Veuillez remplir ce champs")
    .typeError("Veuillez saisir des characters numérique.");

  const userSchema = object({
    nom: simpleValidation,
    prenom: simpleValidation,
    email_reponsable: string()
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
    adresse: simpleValidation,
    code_client: simpleValidation,
    nom_complet_comptable: simpleValidation,
    email_envoi_facture: simpleEmailValidation,
    telephone_comptable: phoneNumberValidation,
    mobile_comptable: phoneNumberValidation,
    nom_complet_contact: simpleValidation,
    email_service_gestion: simpleEmailValidation,
    telephone_service_gestion: phoneNumberValidation,
    mobile_service_gestion: phoneNumberValidation,
    agent_rattache: string().typeError(
      "Veuillez saisir des charatères numériques."
    ),
    agence_secteur_rattachement: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    nom_concessionnaire: simpleValidation,
    numero_proposition_prestation: number().typeError(
      "Veuillez saisir des charatères numériques."
    ),
    as_client: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    origine_client: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    suivie_technique_client: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    statut_client: mixed().oneOf(
      ["1", "0"],
      "Veuillez choisir parmis les options proposer."
    ),
    titre: mixed().oneOf(
      ["M", "Mme"],
      "Veuillez choisir parmis les options proposer."
    ),
    fonction: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    societe: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    ref_societe: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    email_agence: simpleEmailValidation,
    siret: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    tva_intercommunautaire: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    complement_adresse: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    code_postal: number(),
    ville: string().typeError(
      "Veuillez saisir des charatères alpha-numériques."
    ),
    telephone: phoneNumberValidation,
    mobile: phoneNumberValidation,
    telephone_agence: phoneNumberValidation,
  });

  const [agents, setAgents] = useState([]);
  const [agentLoading, setAgentsLoading] = useState(true);

  useEffect(() => {
    fetchOneUser(uuid, "client");
  }, [uuid, fetchOneUser]);
  const { register, handleSubmit, formState, setValue } = useForm({
    mode: "Onchange",
    resolver: yupResolver(userSchema),
  });

  const { errors, isSubmitting } = formState;

  // console.log(errors)

  useEffect(() => {
    async function fetchAgents() {
      await axios
        .get(API_URL + `/agent_app/agent/?paginated=none`)
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

  const editUser = (formData) => {
    console.log(uuid);
    const data = { ...formData, is_active: true, role: "3" };
    updateUser(data, uuid);
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Wrapper. Contains page content */}
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Modifier le client </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Client</li>
                  <li className="breadcrumb-item active">Modifier le client</li>
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
                    <h3 className="card-title">Modifier le client <b>{!users.oneUserLoading &&
                      users.oneUserLoadingError === false &&
                      users.oneUser.hasOwnProperty("id") &&
                      `${users.oneUser.user.prenom.toUpperCase()}  ${users.oneUser.user.nom.toUpperCase()}`}</b> </h3>
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
                          <div className="row mt-2 mb-3">
                            <div className="col">
                              <h5>INFORMATION PRINCIPALES DU CLIENT</h5>
                            </div>
                          </div>
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
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className={
                                    "form-control " +
                                    (errors.email_reponsable && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.user.email}
                                  placeholder="Email"
                                  {...register("email_reponsable")}
                                />
                                {errors.email_reponsable && (
                                  <small className="form-text is-red">
                                    {errors.email_reponsable.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Code client</label>

                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.code_client && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.code_client}
                                  placeholder="Code client"
                                  {...register("code_client")}
                                />
                                {errors.code_client && (
                                  <small className="form-text is-red">
                                    {errors.code_client.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Fonction
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.fonction && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.fonction}
                                  placeholder="Fonction"
                                  {...register("fonction")}
                                />
                                {errors.fonction && (
                                  <small className="form-text is-red">
                                    {errors.fonction.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Titre
                                </label>
                                <select
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.titre && `is-border-red`)
                                  }
                                  key={users.oneUser.titre}
                                  defaultValue={users.oneUser.titre}
                                  placeholder="Titre"
                                  {...register("titre")}
                                >
                                  <option value="M">M</option>
                                  <option value="Mme">Me</option>
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
                                <label htmlFor="exampleInputEmail1">
                                  Status
                                </label>
                                <select
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.statut_client && `is-border-red`)
                                  }
                                  key={users.oneUser.statut_client}
                                  defaultValue={users.oneUser.statut}
                                  {...register("statut_client")}
                                >
                                  <option value="1">active</option>
                                  <option value="0">inactive</option>
                                </select>
                                {errors.statut_client && (
                                  <small className="form-text is-red">
                                    {errors.statut_client.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Société
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.societe && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.societe}
                                  placeholder="Société"
                                  {...register("societe")}
                                />
                                {errors.societe && (
                                  <small className="form-text is-red">
                                    {errors.societe.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Société Ref
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.ref_societe && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.ref_societe}
                                  placeholder="Ref Société"
                                  {...register("ref_societe")}
                                />
                                {errors.ref_societe && (
                                  <small className="form-text is-red">
                                    {errors.ref_societe.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  TVA Intercommunautaire
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.tva_intercommunautaire &&
                                      `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.tva_intercommunautaire
                                  }
                                  placeholder="TVA intercommunautaire"
                                  {...register("tva_intercommunautaire")}
                                />
                                {errors.tva_intercommunautaire && (
                                  <small className="form-text is-red">
                                    {errors.tva_intercommunautaire.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Siret
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.siret && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.siret}
                                  placeholder="Siret"
                                  {...register("siret")}
                                />
                                {errors.siret && (
                                  <small className="form-text is-red">
                                    {errors.siret.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Téléphone </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.telephone && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.telephone}
                                  placeholder="telephone"
                                  {...register("telephone")}
                                />
                                {errors.telephone && (
                                  <small className="form-text is-red">
                                    {errors.telephone.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Mobile </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.mobile && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.mobile}
                                  placeholder="mobile"
                                  {...register("mobile")}
                                />
                                {errors.telephone && (
                                  <small className="form-text is-red">
                                    {errors.telephone.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Téléphone agence </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.telephone_agence && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.telephone_agence}
                                  placeholder="telephone agence"
                                  {...register("telephone_agence")}
                                />
                                {errors.telephone_agence && (
                                  <small className="form-text is-red">
                                    {errors.telephone_agence.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Ville </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.ville && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.ville}
                                  placeholder="Ville"
                                  {...register("ville")}
                                />
                                {errors.ville && (
                                  <small className="form-text is-red">
                                    {errors.ville.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email">Email Agence</label>
                                <input
                                  type="email"
                                  className={
                                    "form-control " +
                                    (errors.email_agence && `is-border-red`)
                                  }
                                  defaultValue={users.oneUser.email_agence}
                                  placeholder="Entre votre email"
                                  {...register("email_agence")}
                                />
                                {errors.email_agence && (
                                  <small className="form-text is-red">
                                    {errors.email_agence.message}
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
                                <label htmlFor="adresse">
                                  Adresse complémentaire
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.complement_adresse &&
                                      `is-border-red`)
                                  }
                                  {...register("complement_adresse")}
                                  defaultValue={
                                    users.oneUser.complement_adresse
                                  }
                                  placeholder="Complement adresse"
                                />
                                {errors.complement_adresse && (
                                  <small className="form-text is-red">
                                    {errors.complement_adresse.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="adresse">Code Postal</label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.code_postal && `is-border-red`)
                                  }
                                  {...register("code_postal")}
                                  defaultValue={users.oneUser.code_postal}
                                  placeholder="Complement adresse"
                                />
                                {errors.code_postal && (
                                  <small className="form-text is-red">
                                    {errors.code_postal.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row mt-2 mb-3">
                            <div className="col">
                              <h5>INFORMATION PRINCIPALES DE L'AGENT</h5>
                            </div>
                          </div>
                          <div className="row">
                            {!agentLoading && agents.length > 0 && (
                              <div className="col">
                                <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">
                                    Agent rattaché
                                  </label>
                                  <select
                                    className={
                                      "form-control " +
                                      (errors.agent_rattache && `is-border-red`)
                                    }
                                    defaultValue={users.oneUser.info_concession.agent_rattache.id.toString()}
                                    placeholder="Agent rattache"
                                    {...register("agent_rattache")}
                                  >
                                    {console.log(
                                      typeof users.oneUser.info_concession.agent_rattache.id.toString()
                                    )}
                                    {!agentLoading &&
                                      agents.map((agent, idx) => (
                                        <option key={idx} value={agent.id}>
                                          {agent.user.prenom} {agent.user.nom}
                                        </option>
                                      ))}
                                  </select>
                                  {errors.agent_rattache && (
                                    <small className="form-text is-red">
                                      {errors.agent_rattache.message}
                                    </small>
                                  )}
                                </div>
                              </div>
                            )}
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Agence secteur de rattachement
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.agence_secteur_rattachement &&
                                      `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession
                                      .agence_secteur_rattachement
                                  }
                                  placeholder="Agence secteur def rattachement"
                                  {...register("agence_secteur_rattachement")}
                                />
                                {errors.agence_secteur_rattachement && (
                                  <small className="form-text is-red">
                                    {errors.agence_secteur_rattachement.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Nom concessionnaire
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.nom_concessionnaire &&
                                      `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession
                                      .nom_concessionnaire
                                  }
                                  placeholder="Nom du concessionnaire"
                                  {...register("nom_concessionnaire")}
                                />
                                {errors.nom_concessionnaire && (
                                  <small className="form-text is-red">
                                    {errors.nom_concessionnaire.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Suivie Technique Client
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.suivie_technique_client &&
                                      `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession
                                      .suivie_technique_client
                                  }
                                  placeholder="Suivie technique"
                                  {...register("suivie_technique_client")}
                                />
                                {errors.suivie_technique_client && (
                                  <small className="form-text is-red">
                                    {errors.suivie_technique_client.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Origine client
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.origine_client && `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession.origine_client
                                  }
                                  placeholder="Origine du client"
                                  {...register("origine_client")}
                                />
                                {errors.origine_client && (
                                  <small className="form-text is-red">
                                    {errors.origine_client.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Numero de proposition de prestation
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.numero_proposition_prestation &&
                                      `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession
                                      .numero_proposition_prestation
                                  }
                                  placeholder="Numero de proposition de prestation"
                                  {...register("numero_proposition_prestation")}
                                />
                                {errors.numero_proposition_prestation && (
                                  <small className="form-text is-red">
                                    {
                                      errors.numero_proposition_prestation
                                        .message
                                    }
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  AS Client
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.as_client && `is-border-red`)
                                  }
                                  defaultValue={
                                    users.oneUser.info_concession.as_client
                                  }
                                  placeholder="AS client"
                                  {...register("as_client")}
                                />
                                {errors.as_client && (
                                  <small className="form-text is-red">
                                    {errors.as_client.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2 mb-3">
                            <div className="col">
                              <h5>INFORMATION PRINCIPALES DU COMPTABLE</h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="nom_complet_comptable">
                                  Nom complèt
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.nom_complet_comptable &&
                                      `is-border-red`)
                                  }
                                  {...register("nom_complet_comptable")}
                                  defaultValue={users.oneUser.ref_comptable.nom}
                                  placeholder="nom du comptable"
                                />
                                {errors.adresse && (
                                  <small className="form-text is-red">
                                    {errors.nom_complet_comptable.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email_envoi_facture">
                                  Email envoi acture
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.email_envoi_facture &&
                                      `is-border-red`)
                                  }
                                  {...register("email_envoi_facture")}
                                  defaultValue={
                                    users.oneUser.ref_comptable
                                      .email_envoi_facture
                                  }
                                  placeholder="Email envoi facture"
                                />
                                {errors.email_envoi_facture && (
                                  <small className="form-text is-red">
                                    {errors.email_envoi_facture.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="telephone_comptable">
                                  Téléphone comptable
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.telephone_comptable &&
                                      `is-border-red`)
                                  }
                                  {...register("telephone_comptable")}
                                  defaultValue={
                                    users.oneUser.ref_comptable.telephone
                                  }
                                  placeholder="téléphone comptable"
                                />
                                {errors.telephone_comptable && (
                                  <small className="form-text is-red">
                                    {errors.telephone_comptable.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="mobile_comptable">
                                  Mobile comptable
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.mobile_comptable && `is-border-red`)
                                  }
                                  {...register("mobile_comptable")}
                                  defaultValue={
                                    users.oneUser.ref_comptable.mobile
                                  }
                                />
                                {errors.mobile_comptable && (
                                  <small className="form-text is-red">
                                    {errors.mobile_comptable.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="row mt-2 mb-3">
                            <div className="col">
                              <h5>
                                INFORMATION PRINCIPALES DU GESTIONNAIRE DE
                                SERVICE
                              </h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="nom_complet_contact">
                                  Nom complèt
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.nom_complet_contact &&
                                      `is-border-red`)
                                  }
                                  {...register("nom_complet_contact")}
                                  defaultValue={
                                    users.oneUser.ref_service_gestion
                                      .nom_complet
                                  }
                                  placeholder="Email"
                                />
                                {errors.nom_complet_contact && (
                                  <small className="form-text is-red">
                                    {errors.nom_complet_contact.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="email_service_gestion">
                                  Email
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.email_service_gestion &&
                                      `is-border-red`)
                                  }
                                  {...register("email_service_gestion")}
                                  defaultValue={
                                    users.oneUser.ref_service_gestion.email
                                  }
                                  placeholder="Email"
                                />
                                {errors.email_service_gestion && (
                                  <small className="form-text is-red">
                                    {errors.email_service_gestion.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="telephone_service_gestion">
                                  Téléphone comptable
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.telephone_service_gestion &&
                                      `is-border-red`)
                                  }
                                  {...register("telephone_service_gestion")}
                                  defaultValue={
                                    users.oneUser.ref_service_gestion.telephone
                                  }
                                  placeholder="téléphone comptable"
                                />
                                {errors.telephone_service_gestion && (
                                  <small className="form-text is-red">
                                    {errors.telephone_service_gestion.message}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div className="col">
                              <div className="form-group">
                                <label htmlFor="mobile_service_gestion">
                                  Mobile comptable
                                </label>
                                <input
                                  type="text"
                                  className={
                                    "form-control " +
                                    (errors.mobile_service_gestion &&
                                      `is-border-red`)
                                  }
                                  {...register("mobile_service_gestion")}
                                  defaultValue={
                                    users.oneUser.ref_service_gestion.mobile
                                  }
                                />
                                {errors.mobile_service_gestion && (
                                  <small className="form-text is-red">
                                    {errors.mobile_service_gestion.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            {/* <label htmlFor="role">Role</label> */}
                            {/* <select
                              hidden
                              className={
                                "form-control " +
                                (errors.role && `is-border-red`)
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
                            )} */}
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
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);
