import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  fetchOneAppointment,
  updateAppointment,
} from "../../../redux/Apppointment/AppointmentActionCreators";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL, getISOStringWithoutSecsAndMillisecs } from "../../../config";
import { date, mixed, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const updateAppointementSchema = object({
  ref_lot: string().typeError("Veuillez des character alpha-numérique"),
  ref_edl: string().typeError("Veuillez des character alpha-numérique"),
  intervention: mixed()
    .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9"], "Veuillez choisir parmis les options.")
    .required("Veuillez choisir parmis les options."),
  type_propriete: mixed()
    .oneOf(["1", "2", "3", "4", "5", "6", "7", "8", "9"], "Veuillez choisir parmis les options.")
    .required("Veuillez choisir parmis les options."),
  date: date().typeError("Veuillez choisir une date."),
  agent: number().typeError("Veuillez choisir parmis les options."),
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
  aceint_tenant_info: string()
    .typeError("Veuillez saisir des characteres alpha-numériques.")
    .required("Veuillez saisir l'identité de l'ancien locataire"),

  surface_propriete: number()
    .positive("Veuillez saisir un nombre positive.")
    .required("Veuiller saisir le superficie du bien.")
    .typeError("Veuillez saisir des charactères numériques."),
  type: mixed()
    .oneOf(
      ["T1", "T2", "T3", "T4", "T5"],
      "Veuillez choisir parmis les options proposer."
    )
    .required("Veuillez choisir parmis les options proposer."),
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
  email_bailleur: string()
    .email("Veuillez saisir un email valid.")
    .required("l'email du propriétaire est obligatoire."),
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
});

function EditAppointment({
  fetchOneAppointment,
  appointments,
  updateAppointment,
}) {
  const { uuid } = useParams();
  const [agentLoading, setAgentsLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [interventionsLoading, setInterventionLoading] = useState(true);
  const [interventions, setInterventions] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTypesLoading, setPropertyTypesLoading] = useState(true);

  const { register, handleSubmit, formState } = useForm({
    mode: "unChange",
    resolver: yupResolver(updateAppointementSchema),
  });

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
      await axios
        .get(API_URL + `/client_app/client?paginated=none`)
        .then((response) => {
          setClients(response.data);
          setClientsLoading(false);
        });
    }

    fetchInterventions();
    fetchPropertyTypes();
    fetchClients();
    fetchAgents();
  }, []);

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    // fetch single appointment with the corresponding uuid
    fetchOneAppointment(uuid);
  }, [uuid, fetchOneAppointment]);

  const editAppointment = (data) => {
    const newData = {
        ...data,
        date: data.date.toISOString().slice(0, 19).replace("T", " "),
        longitude: "238.43",
        latitude: "238.43",
        passeur: 1,
        intervention: parseInt(data.intervention),
        client: parseInt(data.client),
      };
    // console.log(newData)
    updateAppointment(newData, uuid);
  };

  return (
    <div className="content-wrapper">
      {/* Content Wrapper. Contains page content */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Modifier un Rendez-vous</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Rendez-vous</li>
                <li className="breadcrumb-item active">
                  Modifier un rendez-vous
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
                  <h3 className="card-title">Modifier le rendez-vous</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                {appointments.oneAppointmentLoading && (
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
                {!appointments.oneAppointmentLoading &&
                  appointments.oneAppointmentLoadingError === false &&
                  appointments.oneAppointment.hasOwnProperty("id") && (
                    <form onSubmit={handleSubmit(editAppointment)}>
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
                                defaultValue={appointments.oneAppointment.ref_lot}
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.ref_edl && ` is-border-red`)
                                }
                                placeholder="Entrer votre Ref RDV EDL"
                                {...register("ref_edl")}
                                defaultValue={appointments.oneAppointment.ref_rdv_edl}
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
                              <label htmlFor="intervention">
                                Type d'intervention *
                              </label>
                              <select
                                className={
                                  "form-control " +
                                  (errors.intervention && ` is-border-red`)
                                }
                                {...register("intervention")}
                                defaultValue={appointments.oneAppointment.intervention.id}
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
                                defaultValue={appointments.oneAppointment.propriete.type_propriete.id}
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
                                defaultValue={appointments.oneAppointment.client.id}
                              >
                                  {!clientsLoading && clients.map((client, idx) => (
                                      <option value={client.id} key={idx}>{client.user.prenom} {client.user.nom}</option>
                                  ))}
                              </select>
                              {errors.client && (
                                <small className="form-text is-red">
                                  {errors.client.message}
                                </small>
                              )}
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Date et Heure
                              </label>
                              <input
                                type="datetime-local"
                                min={new Date().toISOString()}
                                className={
                                  "form-control " +
                                  (errors.date && ` is-border-red`)
                                }
                                {...register("date")}
                                defaultValue={getISOStringWithoutSecsAndMillisecs(appointments.oneAppointment.date)}
                              />
                              {errors.date && (
                                <small className="form-text is-red">
                                  {errors.date.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">
                                Passeur
                              </label>
                              <select
                                className={
                                  "form-control " +
                                  (errors.passeur && ` is-border-red`)
                                }
                                defaultValue={appointments.oneAppointment.passeur}
                              >
                                <option>Intervenant</option>
                              </select>
                              {errors.passeur && (
                                <small className="form-text is-red">
                                  {errors.passeur.message}
                                </small>
                              )}
                            </div>
                          </div>
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
                                defaultValue={appointments.oneAppointment.agent.id}
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
                          </div>
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
                                defaultValue={appointments.oneAppointment.propriete.locataire.nom}
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
                              <label htmlFor="prenom du locataire">
                                Prénom
                              </label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.prenom_locataire && ` is-border-red`)
                                }
                                {...register("prenom_locataire")}
                                defaultValue={appointments.oneAppointment.propriete.locataire.prenom}
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.telephone_locataire &&
                                    ` is-border-red`)
                                }
                                {...register("telephone_locataire")}
                                defaultValue={appointments.oneAppointment.propriete.locataire.telephone}
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
                                  (errors.aceint_tenant_info &&
                                    ` is-border-red`)
                                }
                                {...register("aceint_tenant_info")}
                              />
                              {errors.aceint_tenant_info && (
                                <small className="form-text is-red">
                                  {errors.aceint_tenant_info.message}
                                </small>
                              )}
                            </div>
                          </div>
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.surface_propriete && ` is-border-red`)
                                }
                                {...register("surface_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.surface}
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
                                defaultValue={appointments.oneAppointment.propriete.type}
                              >
                                <option value="T1">F1</option>
                                <option value="T2">F2</option>
                                <option value="T3">F3</option>
                                <option value="T4">F5</option>
                                <option value="T5">F5</option>
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.numero_sol_propriete &&
                                    ` is-border-red`)
                                }
                                {...register("numero_sol_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.numeroSol}
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
                              <label htmlFor="N° du logement">
                                N° Logement
                              </label>
                              <input
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.numero_propriete && ` is-border-red`)
                                }
                                {...register("numero_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.numero}
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
                              <label htmlFor="numéro du parking">
                                N° Parking
                              </label>
                              <input
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.numero_parking_propriete &&
                                    ` is-border-red`)
                                }
                                {...register("numero_parking_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.numeroParking}
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.numero_cave_propriete &&
                                    ` is-border-red`)
                                }
                                {...register("numero_cave_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.numeroCave}
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
                                defaultValue={appointments.oneAppointment.propriete.adresse}
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
                                {...register(
                                  "adresse_complementaire_propriete"
                                )}
                                defaultValue={appointments.oneAppointment.propriete.adresseComplementaire}
                              />
                              {errors.adresse_complementaire_propriete && (
                                <small className="form-text is-red">
                                  {
                                    errors.adresse_complementaire_propriete
                                      .message
                                  }
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
                                type="text"
                                min="0"
                                className={
                                  "form-control " +
                                  (errors.code_postal_propriete &&
                                    ` is-border-red`)
                                }
                                {...register("code_postal_propriete")}
                                defaultValue={appointments.oneAppointment.propriete.codePostal}
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
                                defaultValue={appointments.oneAppointment.propriete.ville}
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
                                defaultValue={appointments.oneAppointment.propriete.bailleur.nom}
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
                              <label htmlFor="prenom du bailleure">
                                Prénom
                              </label>
                              <input
                                type="text"
                                className={
                                  "form-control " +
                                  (errors.prenom_bailleur && ` is-border-red`)
                                }
                                {...register("prenom_bailleur")}
                                defaultValue={appointments.oneAppointment.propriete.bailleur.prenom}
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
                                  (errors.reference_bailleur &&
                                    ` is-border-red`)
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
                                defaultValue={appointments.oneAppointment.liste_document_recuperer}
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
                                defaultValue={appointments.oneAppointment.consignes_particuliere}
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
                              defaultValue={appointments.oneAppointment.info_diverses}
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
}

const mapPropsToState = (state) => {
  return {
    appointments: state.appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneAppointment: (uuid) => dispatch(fetchOneAppointment(uuid)),
    updateAppointment: (data, uuid) => dispatch(updateAppointment(data, uuid)),
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

export default connect(mapPropsToState, mapDispatchToProps)(EditAppointment);
