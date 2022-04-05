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

  tenant_contact: number().test('len', 'Le numéro de téléphone doit être 10 chiffres.', value => value.toString().length === 10).typeError('Veuillez saisir des charactères numériques').required('Le numéro de téléphone du locataire est obligatoire.'),
  tenant_first_name: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Prénom du locataire est obligatoire.'),
  tenant_last_name: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Nom du locataire est obligatoire.'),
  tenant_email: string().email('Veuillez saisir un email valid.').required('l\'email du locataire est obligatoire.'),
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
  lanlord_first_name: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Prénom du propriétaire est obligatoire.'),
  lanlord_last_name: string().typeError('Veuillez saisir des charactères alphabetic.').required('Le Nom du propriétaire est obligatoire.'),
  lanlord_email: string().email('Veuillez saisir un email valid.').required('l\'email du propriétaire est obligatoire.'),
  reference: string(),

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
      await axios.get(API_URL + `/interventions`)
        .then((response) => {
          setInterventions(response.data);
          setInterventionLoading(false);
        })
    }

    async function fetchPropertyTypes() {
      await axios.get(API_URL + `/property_types`)
        .then((response) => {
          setPropertyTypes(response.data);
          setPropertyTypesLoading(false);
        })
    }

    async function fetchAgents() {
      await axios.get(API_URL + `/user_types/agent`)
        .then((response) => {
          setAgents(response.data);
          setAgentsLoading(false);
        })
    }

    async function fetchClients() {
      await axios.get(API_URL + `/user_types/client`)
        .then((response) => {
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
                          <label htmlFor="exampleInputEmail1">Ref Lot</label>
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
                          <label htmlFor="exampleInputEmail1">Ref RDV EDL</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.ref_rdv_edl && ` is-border-red`)}
                            placeholder="Entrer votre Ref RDV EDL"
                            {...register('ref_rdv_edl')}
                          />
                          {errors.ref_rdv_edl && <small className="form-text is-red">{errors.ref_rdv_edl.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Type d'intervention *</label>
                          <select className={"form-control " + (errors.type_of_intervention && ` is-border-red`)} {...register('type_of_intervention')}>
                            {!interventionsLoading && interventions.map((intervention, idx) => <option key={idx} value={intervention.id}>{intervention.type}</option>)}
                          </select>
                          {errors.type_of_intervention && <small className="form-text is-red">{errors.type_of_intervention.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Nature du Bien</label>
                          <select className={"form-control " + (errors.type_of_property && ` is-border-red`)} {...register('type_of_property')}>
                            {!propertyTypesLoading && propertyTypes.map((propertyType, idx) => <option key={idx} value={propertyType.id}>{propertyType.type}</option>)}
                          </select>
                          {errors.type_of_property && <small className="form-text is-red">{errors.type_of_property.message}</small>}
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
                            {!clientsLoading && clients.map((client, idx) => <option key={idx} value={client.id}>{client.first_name} {client.last_name}</option>)}
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
                            {!agentLoading && agents.map((agent, idx) => <option key={idx} value={agent.id}>{agent.first_name} {agent.last_name}</option>)}
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
                          <label htmlFor="exampleInputEmail1">Nom</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.tenant_last_name && ` is-border-red`)}
                            {...register('tenant_last_name')}
                          />
                          {errors.tenant_last_name && <small className="form-text is-red">{errors.tenant_last_name.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Prénom</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.tenant_first_name && ` is-border-red`)}
                            {...register('tenant_first_name')}
                          />
                          {errors.tenant_first_name && <small className="form-text is-red">{errors.tenant_first_name.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Numéro de Téléphone</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.tenant_contact && ` is-border-red`)}
                            {...register('tenant_contact')}
                          />
                          {errors.tenant_contact && <small className="form-text is-red">{errors.tenant_contact.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            className={"form-control " + (errors.tenant_email && ` is-border-red`)}
                            {...register('tenant_email')} />
                          {errors.tenant_email && <small className="form-text is-red">{errors.tenant_email.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Identité de l'ancien locataire</label>
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
                          <label htmlFor="exampleInputEmail1">Surface du bien - (m<sup>2</sup>)</label>
                          <input type="number"
                            min="0"
                            className={"form-control " + (errors.property_surface_area && ` is-border-red`)}
                            {...register('property_surface_area')}
                          />
                          {errors.property_surface_area && <small className="form-text is-red">{errors.property_surface_area.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Type</label>
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
                          <label htmlFor="exampleInputEmail1">Etage</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.property_floor_number && ` is-border-red`)}
                            {...register('property_floor_number')}
                          />
                          {errors.property_floor_number && <small className="form-text is-red">{errors.property_floor_number.message}</small>}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">N° Logement</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.property_housing_number && ` is-border-red`)}
                            {...register('property_housing_number')}
                          />
                          {errors.property_housing_number && <small className="form-text is-red">{errors.property_housing_number.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">N° Parking</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.property_parking_number && ` is-border-red`)}
                            {...register('property_parking_number')}
                          />
                          {errors.property_parking_number && <small className="form-text is-red">{errors.property_parking_number.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">N° Cave</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.property_cave_number && ` is-border-red`)}
                            {...register('property_cave_number')}
                          />
                          {errors.property_cave_number && <small className="form-text is-red">{errors.property_cave_number.message}</small>}
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
                          <label htmlFor="exampleInputEmail1">Adresse</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.property_adresse && ` is-border-red`)}
                            {...register('property_adresse')}
                          />
                          {errors.property_adresse && <small className="form-text is-red">{errors.property_adresse.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Complément d'adresse</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.property_complementary_adresse && ` is-border-red`)}
                            {...register('property_complementary_adresse')}
                          />
                          {errors.property_complementary_adresse && <small className="form-text is-red">{errors.property_complementary_adresse.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Code Postal</label>
                          <input
                            type="number"
                            min="0"
                            className={"form-control " + (errors.property_postal_code && ` is-border-red`)}
                            {...register('property_postal_code')}
                          />
                          {errors.property_postal_code && <small className="form-text is-red">{errors.property_postal_code.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Ville</label>
                          <input
                            type="text"
                            className={"form-control " + (errors.property_city && ` is-border-red`)}
                            {...register('property_city')}
                          />
                          {errors.property_city && <small className="form-text is-red">{errors.property_city.message}</small>}
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
                          <label htmlFor="exampleInputEmail1">Nom</label>
                          <input type="text" className={"form-control " + (errors.lanlord_last_name && ` is-border-red`)}  {...register('lanlord_last_name')} />
                          {errors.lanlord_last_name && <small className="form-text is-red">{errors.lanlord_last_name.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Prénom</label>
                          <input type="text" className={"form-control " + (errors.lanlord_first_name && ` is-border-red`)}  {...register('lanlord_first_name')} />
                          {errors.lanlord_first_name && <small className="form-text is-red">{errors.lanlord_first_name.message}</small>}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            className={"form-control " + (errors.lanlord_email && ` is-border-red`)}
                            {...register('lanlord_email')} />

                          {errors.lanlord_email && <small className="form-text is-red">{errors.lanlord_email.message}</small>}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Reférence</label>
                          <input type="text"
                            className={"form-control " + (errors.reference && ` is-border-red`)}
                            {...register('reference')}
                          />
                          {errors.reference && <small className="form-text is-red">{errors.reference.message}</small>}
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