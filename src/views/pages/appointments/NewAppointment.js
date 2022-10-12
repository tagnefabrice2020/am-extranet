import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { object, string, mixed, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { connect } from "react-redux";
import { storeAppointment } from "../../../redux/Apppointment/AppointmentActionCreators";
import axios from "axios";
import { API_URL } from "../../../config";
import { parseData } from "../../../utils/transformer";
import {
  ADMIN,
  CLIENT,
  CLIENT_PARTICULIER,
  CLIENT_PROFESSIONEL,
  CONSTAT_SORTANT,
} from "../../../utils/constant";

const newAppointementSchema = object({
  ref_lot: string().typeError("Veuillez des character alpha-numérique"),
  ref_edl: string().typeError("Veuillez des character alpha-numérique"),
  intervention: string().required("Veuillez choisir parmis les options."),
  type_propriete: string().required("Veuillez choisir parmis les options."),
  date: date().typeError("Veuillez choisir une date."),
  agent: string().nullable().typeError("Veuillez choisir parmis les options."),
  passeur: string(),

  telephone_locataire: number()
    .test(
      "len",
      "Le numéro de téléphone doit être 10 chiffres.",
      (value) => value.toString().length === 10
    )
    .typeError("Veuillez saisir des charactères numériques")
    .required("Le numéro de téléphone du locataire est obligatoire."),
  prenom_locataire: string()
    .typeError("Veuillez saisir des charactères alphabetic.")
    .required("Le Prénom du locataire est obligatoire."),
  nom_locataire: string()
    .typeError("Veuillez saisir des charactères alphabetic.")
    .required("Le Nom du locataire est obligatoire."),
  email_locataire: string()
    .email("Veuillez saisir un email valid.")
    .required("l'email du locataire est obligatoire."),
  client: string()
    .required("Veuillez choisir le client concernées.")
    .typeError("Veuillez choisir le client concernées."),
  adresse_ancien_locataire: string()
    .typeError("Veuillez saisir des characteres alpha-numériques.")
    .required("Veuillez saisir l'identité de l'ancien locataire"),

  surface_propriete: number()
    .positive("Veuillez saisir un nombre positive.")
    .required("Veuiller saisir le superficie du bien.")
    .typeError("Veuillez saisir des charactères numériques."),
  type: string().required("Veuillez choisir parmis les options proposer."),
  numero_sol_propriete: number()
    .required("Veuillez saisir l'étage du bien.")
    .typeError("Veuillez saisir des charactères numériques."),
  numero_parking_propriete: string()
    .typeError("Veuillez saisir des charactères alpha-numérique.")
    .required("Veuillez saisir le numéro de parking."),
  numero_propriete: string()
    .typeError("Veuillez saisir des charactères alpha-numérique.")
    .required("Veuillez saisir la superficie du bien."),
  numero_cave_propriete: string()
    .typeError("Veuillez saisir des charactères alpha-numérique.")
    .required("Veuillez saisir le numéro de la cave."),

  adresse_propriete: string()
    .required("L'adresse du bien est necessaire.")
    .typeError("Veuillez saisir des charactères alphabetics."),
  ville_propriete: string()
    .typeError("Veuillez saisir des charactères alpha-numérique.")
    .required("La ville ou est situé le bien en question est obligatoire."),
  code_postal_propriete: number()
    .test(
      "len",
      "Le postal doit etre de 5 chiffre.",
      (value) => value.toString().length === 5
    )
    .required("Le code postal est du bien est obligatoire")
    .typeError("Veuillez saisir des charactères numériques."),
  adresse_complementaire_propriete: string().typeError(
    "Veuillez saisir des charactères alpha-numérique."
  ),
  prenom_bailleur: string()
    .typeError("Veuillez saisir des charactères alphabetic.")
    .required("Le Prénom du propriétaire est obligatoire."),
  nom_bailleur: string()
    .typeError("Veuillez saisir des charactères alphabetic.")
    .required("Le Nom du propriétaire est obligatoire."),
  email_bailleur: string().email("Veuillez saisir un email valid."),
  reference_bailleur: string().typeError(
    "Veuillez inserer des characteres alpha-numerique"
  ),
  list_documents: string().typeError(
    "Veuillez saisir des charactères alpha-numérique."
  ),
  consignes_part: string().typeError(
    "Veuillez saisir des charactères alpha-numérique."
  ),
  info_diverses: string().typeError(
    "Veuillez saisir des charactères alpha-numérique."
  ),
  debut_du_bail_locataire: string()
    .typeError("Veuillez inserer une date.")
    .nullable(),
});

const NewAppointment = ({ storeAppointment, appointments, user }) => {
  const { register, handleSubmit, reset, formState, watch } = useForm({
    mode: "unTouched",
    resolver: yupResolver(newAppointementSchema),
  });
  const ServiceRef = useRef(null);
  const userInfo = parseData(user);
  const [agentLoading, setAgentsLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [interventionsLoading, setInterventionLoading] = useState(true);
  const [interventions, setInterventions] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTypesLoading, setPropertyTypesLoading] = useState(true);
  const [passeurs, setPasseurs] = useState([]);
  const [loadingPasseur, setLoadingPasseur] = useState(true);

  const { errors, isSubmitting } = formState;

  const client = watch("client");

  useEffect(() => {
    async function fetchInterventions() {
      await axios
        .get(API_URL + `/config_app/intervention/`)
        .then((response) => {
          setInterventions(response.data.results);
          setInterventionLoading(false);
        });
    }

    async function fetchPropertyTypes() {
      await axios.get(API_URL + `/config_app/propriete/`).then((response) => {
        setPropertyTypes(response.data.results);
        setPropertyTypesLoading(false);
      });
    }

    async function fetchAgents() {
      await axios
        .get(API_URL + `/agent_app/agent/?paginated=none`)
        .then((response) => {
          setAgents(response.data);
          setAgentsLoading(false);
        });
    }

    async function fetchClients() {
      if (
        userInfo.group.toLowerCase() !== CLIENT_PARTICULIER &&
        userInfo.group.toLowerCase() !== CLIENT_PROFESSIONEL
      ) {
        let url = userInfo.group.toLowerCase() === ADMIN ? `/client_app/client?paginated=none` : `/client_app/client`
        await axios
          .get(API_URL + url)
          .then((response) => {
            setClients(response?.data);
            setClientsLoading(false);
          });
      }
    }

    fetchInterventions();
    fetchPropertyTypes();
    fetchAgents();
    fetchClients();
  }, []);

  useEffect(() => {
    async function fetchPasseur() {
      if (
        userInfo.group.toLowerCase() === CLIENT_PARTICULIER ||
        userInfo.group.toLowerCase() === CLIENT_PROFESSIONEL
      ) {
        await axios
          .get(
            API_URL +
              `/salarie_app/salarie?paginated=none&client=${userInfo.client_id}`
          )
          .then((response) => {
            console.log(response.data);
            setPasseurs(response.data);
            console.log(response.data);
            setLoadingPasseur(false);
          });
      } else {
        setLoadingPasseur(true);
        await axios
          .get(
            API_URL +
              `/salarie_app/salarie?paginated=none&client=${client || 0}`
          )
          .then((response) => {
            setPasseurs(response.data);
            setLoadingPasseur(false);
          });
      }
    }
    fetchPasseur();
    return () => {};
  }, [client, userInfo.group, userInfo.client_id]);

  useEffect(() => {
    if (appointments.reset.form) {
      reset();
    }
  }, [appointments.reset.form, reset]);

  const newAppointment = (data) => {
    delete data.adresse_ancien_locataire;
    // if (userInfo.group.toLowerCase() === CLIENT_PARTICULIER || data.passeur === "") data = {...data, passeur: data.passeur};

    const date = new Date(data.date);
    const newData = {
      ...data,
      date: date.toISOString().slice(0, 19).replace("T", " "),
      longitude: "238.43",
      latitude: "238.43",
      passeur: parseInt(data.passeur),
      intervention: parseInt(data.intervention),
      client: parseInt(data.client),
      type_propriete: parseInt(data.type_propriete),
      // default agent
      statut: 0, // status
    };
    storeAppointment(newData);
    console.log(newData);
    if (appointments.reset.form) {
      reset();
    }
  };

  const service = watch("intervention");
  const [intervention, setIntervention] = useState(null);

  useLayoutEffect(() => {
    !interventionsLoading &&
      setIntervention(
        ServiceRef.current.nextElementSibling.selectedOptions[0].firstChild
          .textContent
      );
  }, [service, interventionsLoading]);

  return (
    <div className="content-wrapper">
      {/* Content Wrapper. Contains page content */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Ajouter un Rendez-vous</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Rendez-vous</li>
                <li className="breadcrumb-item active">
                  Ajouter un Rendez-vous
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
                  <h3 className="card-title">Ajouter un Rendez-vous</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={handleSubmit(newAppointment)}>
                  <div className="card-body">
                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>INFORMATION PRINCIPALES</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="ref lot">Ref Lot</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.ref_lot && ` is-border-red`)
                            }
                            placeholder="Entrer votre Ref Lot"
                            {...register("ref_lot")}
                          />
                          {errors.ref_lot && (
                            <small className="form-text is-red">
                              {errors.ref_lot.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="ref_edl">Ref RDV EDL</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.ref_edl && ` is-border-red`)
                            }
                            placeholder="Entrer votre Ref RDV EDL"
                            {...register("ref_edl")}
                          />
                          {errors.ref_edl && (
                            <small className="form-text is-red">
                              {errors.ref_edl.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="intervention" ref={ServiceRef}>
                            Type d'intervention *
                          </label>
                          <select
                            className={
                              "form-control " +
                              (errors.intervention && ` is-border-red`)
                            }
                            {...register("intervention")}
                          >
                            {!interventionsLoading &&
                              interventions.map((intervention, idx) => (
                                <option key={idx} value={intervention.id}>
                                  {intervention.type}
                                </option>
                              ))}
                          </select>
                          {errors.intervention && (
                            <small className="form-text is-red">
                              {errors.intervention.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="type de propriéte">
                            Nature du Bien
                          </label>
                          <select
                            className={
                              "form-control " +
                              (errors.type_propriete && ` is-border-red`)
                            }
                            {...register("type_propriete")}
                          >
                            {!propertyTypesLoading &&
                              propertyTypes.map((propertyType, idx) => (
                                <option key={idx} value={propertyType.id}>
                                  {propertyType.type}
                                </option>
                              ))}
                          </select>
                          {errors.type_propriete && (
                            <small className="form-text is-red">
                              {errors.type_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>INFORMATION DU RDV</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Client</label>

                          <select
                            className={
                              "form-control " +
                              (errors.client && ` is-border-red`)
                            }
                            {...register("client")}
                            defaultValue={
                              (userInfo.group.toLowerCase() ===
                                CLIENT_PROFESSIONEL ||
                                userInfo.group.toLowerCase() ===
                                  CLIENT_PARTICULIER) &&
                              userInfo?.client_id
                            }
                          >
                            {(userInfo.group.toLowerCase() ===
                              CLIENT_PROFESSIONEL ||
                              userInfo.group.toLowerCase() ===
                                CLIENT_PARTICULIER) && (
                              <option value={userInfo?.client_id}>
                                {userInfo.prenom.toUpperCase()}{" "}
                                {userInfo.nom.toUpperCase()}
                              </option>
                            )}
                            {!clientsLoading &&
                              userInfo.group.toLowerCase() !==
                                CLIENT_PROFESSIONEL &&
                              userInfo.group.toLowerCase() !==
                                CLIENT_PARTICULIER &&
                              clients?.map((client, idx) => (
                                <option key={idx} value={client.id}>
                                  {client.user.prenom} {client.user.nom}
                                </option>
                              ))}
                          </select>

                          {errors.client && (
                            <small className="form-text is-red">
                              {errors.client.message}
                            </small>
                          )}
                        </div>
                      </div>
                      {userInfo.group.toLowerCase() !== CLIENT && (
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Date</label>
                            <input
                              type="date"
                              min={new Date().toISOString()}
                              className={
                                "form-control " +
                                (errors.date && ` is-border-red`)
                              }
                              {...register("date")}
                            />
                            {errors.date && (
                              <small className="form-text is-red">
                                {errors.date.message}
                              </small>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      {userInfo.group.toLowerCase() !== CLIENT_PARTICULIER && [
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Passeur</label>
                            <select
                              className={
                                "form-control " +
                                (errors.passeur && ` is-border-red`)
                              }
                              {...register("passeur")}
                            >
                              {!loadingPasseur &&
                                passeurs.map((p, idx) => (
                                  <option value={p?.id} key={idx}>
                                    {p?.user?.prenom} {p?.user?.nom}
                                  </option>
                                ))}
                            </select>
                            {errors.passeur && (
                              <small className="form-text is-red">
                                {errors.passeur.message}
                              </small>
                            )}
                          </div>
                        </div>,
                      ]}
                      {userInfo.group.toLowerCase() !== CLIENT_PARTICULIER &&
                        userInfo.group.toLowerCase() !==
                          CLIENT_PROFESSIONEL && [
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Nom de l'agent Amexpert rattaché
                              </label>
                              <select
                                className={
                                  "form-control " +
                                  (errors.agent && ` is-border-red`)
                                }
                                {...register("agent")}
                              >
                                {!agentLoading &&
                                  agents.map((agent, idx) => (
                                    <option key={idx} value={agent.id}>
                                      {agent.user.prenom} {agent.user.nom}
                                    </option>
                                  ))}
                              </select>
                              {errors.agent && (
                                <small className="form-text is-red">
                                  {errors.agent.message}
                                </small>
                              )}
                            </div>
                          </div>,
                        ]}
                    </div>

                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>COORDONNEES DU LOCATAIRE</h5>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="nom du locataire">Nom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.nom_locataire && ` is-border-red`)
                            }
                            {...register("nom_locataire")}
                          />
                          {errors.nom_locataire && (
                            <small className="form-text is-red">
                              {errors.nom_locataire.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="prenom du locataire">Prénom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.prenom_locataire && ` is-border-red`)
                            }
                            {...register("prenom_locataire")}
                          />
                          {errors.prenom_locataire && (
                            <small className="form-text is-red">
                              {errors.prenom_locataire.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="contact du locataire">
                            Numéro de Téléphone
                          </label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.telephone_locataire && ` is-border-red`)
                            }
                            {...register("telephone_locataire")}
                          />
                          {errors.telephone_locataire && (
                            <small className="form-text is-red">
                              {errors.telephone_locataire.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="email du locataire">Email</label>
                          <input
                            type="email"
                            className={
                              "form-control " +
                              (errors.email_locataire && ` is-border-red`)
                            }
                            {...register("email_locataire")}
                          />
                          {errors.email_locataire && (
                            <small className="form-text is-red">
                              {errors.email_locataire.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="identité de l'ancien locataire">
                            Identité de l'ancien locataire
                          </label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.adresse_ancien_locataire &&
                                ` is-border-red`)
                            }
                            {...register("adresse_ancien_locataire")}
                          />
                          {errors.adresse_ancien_locataire && (
                            <small className="form-text is-red">
                              {errors.adresse_ancien_locataire.message}
                            </small>
                          )}
                        </div>
                      </div>
                      {!interventionsLoading &&
                        intervention?.toLowerCase() ===
                          CONSTAT_SORTANT.toLocaleLowerCase() && (
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="Date d’entrée du locataire">
                                Date d’entrée du locataire
                              </label>
                              <input
                                type="date"
                                className={
                                  "form-control " +
                                  (errors.debut_du_bail_locataire &&
                                    ` is-border-red`)
                                }
                                {...register("debut_du_bail_locataire")}
                              />
                              {errors.debut_du_bail_locataire && (
                                <small className="form-text is-red">
                                  {errors.debut_du_bail_locataire.message}
                                </small>
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>SPECIFICITES DU BIEN</h5>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="surface du bien">
                            Surface du bien - (m<sup>2</sup>)
                          </label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.surface_propriete && ` is-border-red`)
                            }
                            {...register("surface_propriete")}
                          />
                          {errors.surface_propriete && (
                            <small className="form-text is-red">
                              {errors.surface_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="Type">Type</label>
                          <select
                            className={
                              "form-control " +
                              (errors.type && ` is-border-red`)
                            }
                            {...register("type")}
                          >
                            <option value="studio">STUDIO</option>
                            <option value="studio meublé">STUDIO MEUBLE</option>
                            <option value="F1">F1</option>
                            <option value="F1 Bis">F1 Bis</option>
                            <option value="F1 Bis Meublé">F1 Bis Meublé</option>
                            <option value="F2">F2</option>
                            <option value="F2 meuble">F2 Meublé</option>
                            <option value="F3">F3</option>
                            <option value="F3 meuble">F3 Meublé</option>
                            <option value="F4">F4</option>
                            <option value="F4 meuble">F4 Meublé</option>
                            <option value="F5">F5</option>
                            <option value="F5 meuble">F5 Meublé</option>
                            <option value="F6">F6</option>
                            <option value="F6 meuble">F6 Meublé</option>
                            <option value="F7">F7</option>
                            <option value="F7 meuble">F7 Meublé</option>
                            <option value="F8">F8</option>
                            <option value="F8 meuble">F8 Meublé</option>
                            <option value="T1">T1</option>
                            <option value="T1 meuble">T1 Meublé</option>
                            <option value="T2">T2</option>
                            <option value="T2 meuble">T2 Meublé</option>
                            <option value="T3">T3</option>
                            <option value="T3 meuble">T3 Meublé</option>
                            <option value="T4">T4</option>
                            <option value="T4 meuble">T4 Meublé</option>
                            <option value="T5">T5</option>
                            <option value="T5 meuble">T5 Meublé</option>
                            <option value="T6">T6</option>
                            <option value="T6 meuble">T6 Meublé</option>
                            <option value="T7">T7</option>
                            <option value="T7 meuble">T7 Meublé</option>
                            <option value="T8">T8</option>
                            <option value="T8 meuble">T8 Meublé</option>
                            <option value="T9">T9</option>
                            <option value="T9 meuble">T9 Meublé</option>
                            <option value="T10">T10</option>
                            <option value="T10 meuble">T10 Meublé</option>
                          </select>
                          {errors.type && (
                            <small className="form-text is-red">
                              {errors.type.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="etage">Etage</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.numero_sol_propriete && ` is-border-red`)
                            }
                            {...register("numero_sol_propriete")}
                          />
                          {errors.numero_sol_propriete && (
                            <small className="form-text is-red">
                              {errors.numero_sol_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="N° du logement">N° Logement</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.numero_propriete && ` is-border-red`)
                            }
                            {...register("numero_propriete")}
                          />
                          {errors.numero_propriete && (
                            <small className="form-text is-red">
                              {errors.numero_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="numéro du parking">N° Parking</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.numero_parking_propriete &&
                                ` is-border-red`)
                            }
                            {...register("numero_parking_propriete")}
                          />
                          {errors.numero_parking_propriete && (
                            <small className="form-text is-red">
                              {errors.numero_parking_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="numéro de la cave">N° Cave</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.numero_cave_propriete && ` is-border-red`)
                            }
                            {...register("numero_cave_propriete")}
                          />
                          {errors.numero_cave_propriete && (
                            <small className="form-text is-red">
                              {errors.numero_cave_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>LOCALISATION DU BIEN</h5>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="adresse de la propriéte">
                            Adresse
                          </label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.adresse_propriete && ` is-border-red`)
                            }
                            {...register("adresse_propriete")}
                          />
                          {errors.adresse_propriete && (
                            <small className="form-text is-red">
                              {errors.adresse_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="adresse complementaire">
                            Complément d'adresse
                          </label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.adresse_complementaire_propriete &&
                                ` is-border-red`)
                            }
                            {...register("adresse_complementaire_propriete")}
                          />
                          {errors.adresse_complementaire_propriete && (
                            <small className="form-text is-red">
                              {errors.adresse_complementaire_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="code postal">Code Postal</label>
                          <input
                            type="number"
                            min="0"
                            className={
                              "form-control " +
                              (errors.code_postal_propriete && ` is-border-red`)
                            }
                            {...register("code_postal_propriete")}
                          />
                          {errors.code_postal_propriete && (
                            <small className="form-text is-red">
                              {errors.code_postal_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="Ville">Ville</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.ville_propriete && ` is-border-red`)
                            }
                            {...register("ville_propriete")}
                          />
                          {errors.ville_propriete && (
                            <small className="form-text is-red">
                              {errors.ville_propriete.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>COORDONNEES DU PROPRIETAIRE</h5>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="nom du bailleure">Nom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.nom_bailleur && ` is-border-red`)
                            }
                            {...register("nom_bailleur")}
                          />
                          {errors.nom_bailleur && (
                            <small className="form-text is-red">
                              {errors.nom_bailleur.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="prenom du bailleure">Prénom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.prenom_bailleur && ` is-border-red`)
                            }
                            {...register("prenom_bailleur")}
                          />
                          {errors.prenom_bailleur && (
                            <small className="form-text is-red">
                              {errors.prenom_bailleur.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="email du bailleure">Email</label>
                          <input
                            type="email"
                            className={
                              "form-control " +
                              (errors.email_bailleur && ` is-border-red`)
                            }
                            {...register("email_bailleur")}
                          />

                          {errors.email_bailleur && (
                            <small className="form-text is-red">
                              {errors.email_bailleur.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="reference">Reférence</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.reference_bailleur && ` is-border-red`)
                            }
                            {...register("reference_bailleur")}
                          />
                          {errors.reference_bailleur && (
                            <small className="form-text is-red">
                              {errors.reference_bailleur.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2 mb-3">
                      <div className="col">
                        <h5>INDICATION DIVERSE</h5>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Liste des documents
                          </label>
                          <textarea
                            className={
                              "form-control " +
                              (errors.list_documents && ` is-border-red`)
                            }
                            {...register("list_documents")}
                          ></textarea>
                        </div>
                        {errors.list_documents && (
                          <small className="form-text is-red">
                            {errors.list_documents.message}
                          </small>
                        )}
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Consignes particulière
                          </label>
                          <textarea
                            className={
                              "form-control " +
                              (errors.consignes_part && ` is-border-red`)
                            }
                            {...register("consignes_part")}
                          ></textarea>
                        </div>
                        {errors.consignes_part && (
                          <small className="form-text is-red">
                            {errors.consignes_part.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Informations diverses
                        </label>
                        <textarea
                          className={
                            "form-control " +
                            (errors.info_diverses && ` is-border-red`)
                          }
                          {...register("info_diverses")}
                        ></textarea>
                      </div>
                      {errors.info_diverses && (
                        <small className="form-text is-red">
                          {errors.info_diverses.message}
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
    appointments: state.appointments,
    user: state.auth.authUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeAppointment: (appointment) => dispatch(storeAppointment(appointment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);
