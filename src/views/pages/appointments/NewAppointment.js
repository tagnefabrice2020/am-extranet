import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, mixed, number, date } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from "react-redux";
import { storeAppointment } from "../../../redux/Apppointment/AppointmentActionCreators";
import axios from "axios";
import { API_URL } from "../../../config";

const newAppointementSchema = object({
  ref_lot: string().typeError('Veuillez des character alpha-numérique'),
  ref_rdv_edl: string().typeError('Veuillez des character alpha-numérique'),
  type_of_intervention: mixed().oneOf(['1', '2', '3', '4', '5'], 'Veuillez choisir parmis les options.').required('Veuillez choisir parmis les options.'),
  type_of_property: mixed().oneOf(['1', '2', '3', '4', '5'], 'Veuillez choisir parmis les options.').required('Veuillez choisir parmis les options.'),
  date_rdv: date().typeError('Veuillez choisir une date.'),
  agent_id: number().typeError('Veuillez choisir parmis les options.'),

  telephone_locataire: number().test('len', 'Le numéro de téléphone doit être 10 chiffres.', value => value.toString().length === 10).typeError('Veuillez saisir des charactères numériques').required('Le numéro de téléphone du locataire est obligatoire.'),
  prenom_locataire: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Prénom du locataire est obligatoire.'),
  nom_locataire: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Nom du locataire est obligatoire.'),
  email_locataire: string().email('Veuillez saisir un email valid.').required('l\'email du locataire est obligatoire.'),
  
  aceint_tenant_info: string().typeError('Veuillez saisir des characteres alpha-numériques.').required('Veuillez saisir l\'identité de l\'ancien locataire'),

  property_surface_area: number().positive('Veuillez saisir un nombre positive.').required('Veuiller saisir le superficie du bien.').typeError('Veuillez saisir des charactères numériques.'),
  property_type: mixed().oneOf(['T1', 'T2', 'T3', 'T4', 'T5'], 'Veuillez choisir parmis les options proposer.').required('Veuillez choisir parmis les options proposer.'),
  property_floor_number: number().required('Veuillez saisir l\'étage du bien.').typeError('Veuillez saisir des charactères numériques.'),
  property_parking_number: string().typeError('Veuillez saisir des charactères alpha-numérique.').required('Veuillez saisir le numéro de parking.'),
  property_housing_number: string().typeError('Veuillez saisir des charactères alpha-numérique.').required('Veuillez saisir la superficie du bien.'),
  property_cave_number: string().typeError('Veuillez saisir des charactères alpha-numérique.').required('Veuillez saisir le numéro de la cave.'),

  property_adresse: string().required('L\'adresse du bien est necessaire.').typeError('Veuillez saisir des charactères alphabetics.'),
  property_city: string().typeError('Veuillez saisir des charactères alpha-numérique.').required('La ville ou est situé le bien en question est obligatoire.'),
  property_postal_code: number().test('len', 'Le postal doit etre de 5 chiffre.', value => value.toString().length === 5).required('Le code postal est du bien est obligatoire').typeError('Veuillez saisir des charactères numériques.'),
  property_complementary_adresse: string().typeError('Veuillez saisir des charactères alpha-numérique.'),
  prenom_bailleur: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Prénom du propriétaire est obligatoire.'),
  nom_bailleur: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Nom du propriétaire est obligatoire.'),
  email_bailleur: string().email('Veuillez saisir un email valid.').required('l\'email du propriétaire est obligatoire.'),
  reference_bailleur: string(),

  list_of_documents: string().typeError('Veuillez saisir des charactères alpha-numérique.'),
  special_instructions: string().typeError('Veuillez saisir des charactères alpha-numérique.'),
  other_information: string().typeError('Veuillez saisir des charactères alpha-numérique.')
});

const NewAppointment = ({ storeAppointment, appointments }) => {
  const { register, handleSubmit, reset, formState } = useForm({
    mode: 'unTouched',
    resolver: yupResolver(newAppointementSchema)
  });
  const [agentLoading, setAgentsLoading] = useState(true);
  const [agents, setAgents] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [interventionsLoading, setInterventionLoading] = useState(true);
  const [interventions, setInterventions] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [propertyTypesLoading, setPropertyTypesLoading] = useState(true);

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    async function fetchInterventions() {
      await axios.get(API_URL + `/config_app/intervention/`)
        .then((response) => {
          setInterventions(response.data.results);
          setInterventionLoading(false);
        })
    }

    async function fetchPropertyTypes() {
      await axios.get(API_URL + `/config_app/propriete/`)
        .then((response) => {
          setPropertyTypes(response.data.results);
          setPropertyTypesLoading(false);
        })
    }

    async function fetchAgents() {
      await axios.get(API_URL + `/agent_app/agent/?paginated=none`)
        .then((response) => {
          console.log(response.data)
          setAgents(response.data);
          setAgentsLoading(false);
        })
    }

    async function fetchClients() {
      await axios.get(API_URL + `/client_app/client?paginated=none`)
        .then((response) => {
          console.log(response.data)
          setClients(response.data);
          setClientsLoading(false);
        })
    }

    fetchInterventions();
    fetchPropertyTypes();
    fetchAgents();
    fetchClients();
  }, []);

  useEffect(() => {
    if (appointments.reset.form) {
      reset();
    }
  }, [appointments.reset.form, reset]);

  const newAppointment = (data) => {
    console.log(data)
    const newData = {...data, date_rdv: data.date_rdv.toISOString().slice(0, 19).replace('T', ' ')};
    storeAppointment(newData);
    if (appointments.reset.form) {
      reset();
    }
  }

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
                <li className="breadcrumb-item active">Ajouter un Rendez-vous</li>
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
                            className={"form-control " + (errors.ref_lot && ` is-border-red`)}
                            placeholder="Entrer votre Ref Lot"
                            {...register('ref_lot')}
                          />
                          {errors.ref_lot && <small className="form-text is-red">{errors.ref_lot.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="ref_edl">Ref RDV EDL</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.ref_edl && ` is-border-red`)}
                            placeholder="Entrer votre Ref RDV EDL"
                            {...register('ref_edl')}
                          />
                          {errors.ref_edl && <small className="form-text is-red">{errors.ref_edl.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="intervention">Type d'intervention *</label>
                          <select className={"form-control " + (errors.intervention && ` is-border-red`)} {...register('intervention')}>
                            {!interventionsLoading && interventions.map((intervention, idx) => <option key={idx} value={intervention.id}>{intervention.type}</option>)}
                          </select>
                          {errors.intervention && <small className="form-text is-red">{errors.intervention.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="type de propriéte">Nature du Bien</label>
                          <select className={"form-control " + (errors.type_propriete && ` is-border-red`)} {...register('type_propriete')}>
                            {!propertyTypesLoading && propertyTypes.map((propertyType, idx) => <option key={idx} value={propertyType.id}>{propertyType.type}</option>)}
                          </select>
                          {errors.type_propriete && <small className="form-text is-red">{errors.type_propriete.message}</small>}
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
                          <select className={"form-control " + (errors.client_id && ` is-border-red`)} {...register('client_id')}>
                            {!clientsLoading && clients.map((client, idx) => <option key={idx} value={client.id}>{client.user.prenom} {client.user.nom}</option>)}
                          </select>
                          {errors.client_id && <small className="form-text is-red">{errors.client_id.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Date et Heure</label>
                          <input
                            type="datetime-local"
                            min={new Date().toISOString()}
                            className={"form-control " + (errors.date_rdv && ` is-border-red`)}
                            {...register('date_rdv')}
                          />
                          {errors.date_rdv && <small className="form-text is-red">{errors.date_rdv.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Nom du passeur</label>
                          <select className={"form-control " + (errors.nom_du_passeur && ` is-border-red`)}>
                            <option>Intervenant</option>
                          </select>
                          {errors.nom_du_passeur && <small className="form-text is-red">{errors.nom_du_passeur.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Nom de l'agent Amexpert rattaché</label>
                          <select className={"form-control " + (errors.agent_id && ` is-border-red`)} {...register('agent_id')}>
                            {!agentLoading && agents.map((agent, idx) => <option key={idx} value={agent.id}>{agent.user.prenom} {agent.user.nom}</option>)}
                          </select>
                          {errors.agent_id && <small className="form-text is-red">{errors.agent_id.message}</small>}
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
                            className={"form-control " + (errors.nom_locataire && ` is-border-red`)}
                            {...register('nom_locataire')}
                          />
                          {errors.nom_locataire && <small className="form-text is-red">{errors.nom_locataire.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="prenom du locataire">Prénom</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.prenom_locataire && ` is-border-red`)}
                            {...register('prenom_locataire')}
                          />
                          {errors.prenom_locataire && <small className="form-text is-red">{errors.prenom_locataire.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="contact du locataire">Numéro de Téléphone</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.telephone_locataire && ` is-border-red`)}
                            {...register('telephone_locataire')}
                          />
                          {errors.telephone_locataire && <small className="form-text is-red">{errors.telephone_locataire.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="email du locataire">Email</label>
                          <input
                            type="email"
                            className={"form-control " + (errors.email_locataire && ` is-border-red`)}
                            {...register('email_locataire')} />
                          {errors.email_locataire && <small className="form-text is-red">{errors.email_locataire.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="identité de l'ancien locataire">Identité de l'ancien locataire</label>
                          <input type="text"
                            className={"form-control " + (errors.aceint_tenant_info && ` is-border-red`)}
                            {...register('aceint_tenant_info')}
                          />
                          {errors.aceint_tenant_info && <small className="form-text is-red">{errors.aceint_tenant_info.message}</small>}
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
                          <label htmlFor="surface du bien">Surface du bien - (m<sup>2</sup>)</label>
                          <input type="number"
                            min="0"
                            className={"form-control " + (errors.surface_propriete && ` is-border-red`)}
                            {...register('surface_propriete')}
                          />
                          {errors.surface_propriete && <small className="form-text is-red">{errors.surface_propriete.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="Type">Type</label>
                          <select
                            className={"form-control " + (errors.property_type && ` is-border-red`)}
                            {...register('property_type')}>
                            <option value="T1">F1</option>
                            <option value="T2">F2</option>
                            <option value="T3">F3</option>
                            <option value="T4">F5</option>
                            <option value="T5">F5</option>
                          </select>
                          {errors.property_type && <small className="form-text is-red">{errors.property_type.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="etage">Etage</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.numero_sol_propriete && ` is-border-red`)}
                            {...register('numero_sol_propriete')}
                          />
                          {errors.numero_sol_propriete && <small className="form-text is-red">{errors.numero_sol_propriete.message}</small>}
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
                            className={"form-control " + (errors.numero_propriete && ` is-border-red`)}
                            {...register('numero_propriete')}
                          />
                          {errors.numero_propriete && <small className="form-text is-red">{errors.numero_propriete.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="numéro du parking">N° Parking</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.numero_parking_propriete && ` is-border-red`)}
                            {...register('numero_parking_propriete')}
                          />
                          {errors.numero_parking_propriete && <small className="form-text is-red">{errors.numero_parking_propriete.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="numéro de la cave">N° Cave</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.numero_cave_propriete && ` is-border-red`)}
                            {...register('numero_cave_propriete')}
                          />
                          {errors.numero_cave_propriete && <small className="form-text is-red">{errors.numero_cave_propriete.message}</small>}
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
                          <label htmlFor="adresse de la propriéte">Adresse</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.adresse_propriete && ` is-border-red`)}
                            {...register('adresse_propriete')}
                          />
                          {errors.adresse_propriete && <small className="form-text is-red">{errors.adresse_propriete.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="adresse complementaire">Complément d'adresse</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.adresse_complementaire_propriete && ` is-border-red`)}
                            {...register('adresse_complementaire_propriete')}
                          />
                          {errors.adresse_complementaire_propriete && <small className="form-text is-red">{errors.adresse_complementaire_propriete.message}</small>}
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
                            className={"form-control " + (errors.code_postal_propriete && ` is-border-red`)}
                            {...register('code_postal_propriete')}
                          />
                          {errors.code_postal_propriete && <small className="form-text is-red">{errors.code_postal_propriete.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="Ville">Ville</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.ville_propriete && ` is-border-red`)}
                            {...register('ville_propriete')}
                          />
                          {errors.ville_propriete && <small className="form-text is-red">{errors.ville_propriete.message}</small>}
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
                          <input type="text" className={"form-control " + (errors.nom_bailleur && ` is-border-red`)}  {...register('nom_bailleur')} />
                          {errors.nom_bailleur && <small className="form-text is-red">{errors.nom_bailleur.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="prenom du bailleure">Prénom</label>
                          <input type="text" className={"form-control " + (errors.prenom_bailleur && ` is-border-red`)}  {...register('prenom_bailleur')} />
                          {errors.prenom_bailleur && <small className="form-text is-red">{errors.prenom_bailleur.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="email du bailleure">Email</label>
                          <input
                            type="email"
                            className={"form-control " + (errors.email_bailleur && ` is-border-red`)}
                            {...register('email_bailleur')} />

                          {errors.email_bailleur && <small className="form-text is-red">{errors.email_bailleur.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="reference">Reférence</label>
                          <input type="text"
                            className={"form-control " + (errors.reference_bailleur && ` is-border-red`)}
                            {...register('reference_bailleur')}
                          />
                          {errors.reference_bailleur && <small className="form-text is-red">{errors.reference_bailleur.message}</small>}
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
                          <label htmlFor="exampleInputEmail1">Liste des documents</label>
                          <textarea
                            className={"form-control " + (errors.list_of_documents && ` is-border-red`)}
                            {...register('list_of_documents')}></textarea>
                        </div>
                        {errors.list_of_documents && <small className="form-text is-red">{errors.list_of_documents.message}</small>}
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Consignes particulière</label>
                          <textarea
                            className={"form-control " + (errors.special_instructions && ` is-border-red`)}
                            {...register('special_instructions')}></textarea>
                        </div>
                        {errors.special_instructions && <small className="form-text is-red">{errors.special_instructions.message}</small>}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Informations diverses</label>
                        <textarea
                          className={"form-control " + (errors.other_information && ` is-border-red`)}
                          {...register('other_information')}></textarea>
                      </div>
                      {errors.other_information && <small className="form-text is-red">{errors.other_information.message}</small>}
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
  )
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeAppointment: (appointment) => dispatch(storeAppointment(appointment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAppointment);