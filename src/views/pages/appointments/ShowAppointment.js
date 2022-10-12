import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import AppLoader from "../../../components/AppLoader";
import { fetchOneAppointment } from "../../../redux/Apppointment/AppointmentActionCreators";

const ShowAppointment = ({ fetchOneAppointment, appointments }) => {
  const { uuid } = useParams();

  const [visibleSection, setVisibleSection] = useState("ci");
  const liStyle = {
    cursor: "pointer",
  };

  useEffect(() => {
    // fetch single appointment with the corresponding uuid
    fetchOneAppointment(uuid);
  }, [uuid, fetchOneAppointment]);

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Visualisation d'un RDV</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">RDV</li>
                <li className="breadcrumb-item active">
                  Visualiser les information d'un RDV
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      {appointments.oneAppointmentLoading && <AppLoader />}
      {!appointments.oneAppointmentLoading &&
        appointments.oneAppointmentLoadingError === false &&
        appointments.oneAppointment.hasOwnProperty("id") && (
          <div className="content">
            <div
              className="container-fluid"
              style={{
                background: "#fff",
                boxSizing: "border-box",
                borderRadius: "6px",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}
            >
              <div className="row p-2">
                <div className="col-md-12">
                  <div className="profile-head">
                    <h5>
                      <span
                        style={{ textDecoration: "underline" }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {`${appointments.oneAppointment.client.user.prenom.toUpperCase()} ${appointments.oneAppointment.client.user.nom.toUpperCase()}`}
                      </span>
                    </h5>
                    <p>Date et heure du RDV:  {new Date(appointments?.oneAppointment?.date).toLocaleString()}</p>
                    <h6>
                     <b> {`${appointments.oneAppointment.client.user.prenom.toUpperCase()} ${appointments.oneAppointment.client.user.nom.toUpperCase()}`}{" "}</b>
                      à un  
                      <span style={{padding: '0px 5px', background: "#847", color: "#fff", borderRadius: "6px"}}>{appointments.oneAppointment.intervention.type}</span>{" "}
                      avec {"  L'agent "} <b>{appointments.oneAppointment?.agent?.user?.prenom} {" "}
                      {appointments.oneAppointment?.agent?.user.nom}</b>
                    </h6>
                    <p className="proile-rating">
                      Email :{" "}
                      <span>{`${appointments.oneAppointment.client.user.email}`}</span>
                    </p>
                    <p className="proile-rating">
                      Téléphone :{" "}
                      <span>
                        {appointments.oneAppointment.client.telephone}
                      </span>
                    </p>

                    <br />
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {
                        <>
                          <li className="nav-item" style={liStyle}>
                            <span
                              className={`nav-link ${
                                visibleSection === "ci" && "active"
                              }`}
                              id="home-tab"
                              onClick={() => {
                                setVisibleSection("ci");
                              }}
                            >
                              Information du client
                            </span>
                          </li>
                          <li className="nav-item" style={liStyle}>
                            <span
                              className={`nav-link ${
                                visibleSection === "cc" && "active"
                              }`}
                              id="home-tab"
                              onClick={() => {
                                setVisibleSection("cc");
                              }}
                            >
                              Information du Comptable
                            </span>
                          </li>
                          <li className="nav-item" style={liStyle}>
                            <span
                              className={`nav-link ${
                                visibleSection === "rsg" && "active"
                              }`}
                              id="home-tab"
                              onClick={() => {
                                setVisibleSection("rsg");
                              }}
                            >
                              Références service gestion
                            </span>
                          </li>
                          <li className="nav-item" style={liStyle}>
                            <span
                              className={`nav-link ${
                                visibleSection === "a" && "active"
                              }`}
                              id="home-tab"
                              onClick={() => {
                                setVisibleSection("a");
                              }}
                            >
                              Agent
                            </span>
                          </li>
                          <li className="nav-item" style={liStyle}>
                            <span
                              className={`nav-link ${
                                visibleSection === "b" && "active"
                              }`}
                              id="home-tab"
                              onClick={() => {
                                setVisibleSection("b");
                              }}
                            >
                              Bien
                            </span>
                          </li>
                        </>
                      }
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row p-2">
                <div className="col-md-8">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      {visibleSection === "ci" && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Société</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.societe || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Ref Société</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_societe || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>SIRET</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.siret || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>TVA Intercommunautaire</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.tva_intercommunautaire || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Email de l'agence</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.email_agence || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Téléphone</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.telephone || ''}`}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Code postal</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.code_postal || ''}`}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Adresse </label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.adresse || ''}`}</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <label>Ville</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ville || ''}`}</p>
                            </div>
                          </div>
                        </>
                      )}
                      {visibleSection === "cc" && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Code client</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.client.code_client || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Nom</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_comptable?.nom || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Email pour envoi des factures</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_comptable?.email_envoi_facture || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Téléphone</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_comptable?.telephone || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Mobile</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_comptable?.mobile || ''}`}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {visibleSection === "rsg" && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Nom</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_service_gestion?.nom_complet || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Email</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_service_gestion?.email || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Téléphone</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_service_gestion?.telephone || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Mobile</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.client?.ref_service_gestion?.mobile || '' }`}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {visibleSection === "a" && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Nom</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.agent?.user?.prenom || '' } ${appointments.oneAppointment?.agent?.user?.nom || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Email</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment?.agent?.user?.email || '' }`}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {visibleSection === "b" && (
                        <>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Type</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments?.oneAppointment?.propriete?.type_propriete?.type || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Code postal</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments?.oneAppointment?.propriete?.codePostal || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Adresse</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.adresse || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Adresse complementaire</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.adresseComplementaire || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Code postal</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.ville || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Etage</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.numeroSol || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>N° Parking</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.numeroParking || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>N° Cave</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.numeroCave || '' }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Bailleur</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.bailleur.prenom || ''} ${appointments.oneAppointment.propriete.bailleur.nom || ''}`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <label>Locataire</label>
                            </div>
                            <div className="col-md-6">
                              <p>{`${appointments.oneAppointment.propriete.locataire.prenom || ''} ${appointments.oneAppointment.propriete.locataire.nom || ''}`}</p>
                            </div>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const mapPropsToState = (state) => {
  return {
    appointments: state.appointments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOneAppointment: (uuid) => dispatch(fetchOneAppointment(uuid)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(ShowAppointment);
