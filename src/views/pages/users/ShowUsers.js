import React, { useEffect, useState } from "react";
import { fetchOneUser } from "../../../redux/User/UserActionCreators";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import AppLoader from "../../../components/AppLoader";

const ShowUser = ({ fetchOneUser, users }) => {
  const { uuid, role } = useParams();

  const [visibleSection, setVisibleSection] = useState("ci");

  useEffect(() => {
    fetchOneUser(uuid, role);
  }, [uuid, fetchOneUser, role]);

  const liStyle = {
    cursor: "pointer",
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Visualiser l'utilisateur</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Utilisateur</li>
                <li className="breadcrumb-item active">
                  Visualiser l'utilisateur
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      {users.oneUserLoading && <AppLoader />}
      {!users.oneUserLoading &&
        users.oneUserLoadingError === false &&
        users.oneUser.hasOwnProperty("id") && (
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
                        {role === "salarie" &&
                          `${users.oneUser.titre.toUpperCase()}.`}{" "}
                        {`${users.oneUser.user.prenom.toUpperCase()} ${users.oneUser.user.nom.toUpperCase()}`}
                      </span>
                    </h5>
                    <h6>
                      L'utilisateur{" "}
                      {role === "salarie" &&
                        `${users.oneUser.titre.toUpperCase()}.`}{" "}
                      {` ${users.oneUser.user.prenom.toUpperCase()}  ${users.oneUser.user.nom.toUpperCase()}`}{" "}
                      est un{" "}
                      <span
                        style={{
                          background: "#000",
                          color: "#fff",
                          padding: "0px 4px",
                          borderRadius: "4px",
                        }}
                      >
                        {users.oneUser.user.group.toLowerCase() === "salarie"
                          ? "Salarié"
                          : `${users.oneUser.user.group}`}
                      </span>
                    </h6>
                    <p className="proile-rating">
                      Email : <span>{`${users.oneUser.user.email}`}</span>
                    </p>
                    <p className="proile-rating">
                      Téléphone : <span>{users.oneUser.telephone}</span>
                    </p>

                    <br />
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      {role.toLowerCase() === "salarie" && (
                        <li className="nav-item" style={liStyle}>
                          <span
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Agent Rattachée
                          </span>
                        </li>
                      )}
                      {(role.toLowerCase() === "administrateur" ||
                        role.toLowerCase() === "agent") && (
                        <li className="nav-item" style={liStyle}>
                          <span
                            className="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Information
                          </span>
                        </li>
                      )}
                      {role.toLowerCase() === "client" && (
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
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row p-2">
                {role.toLowerCase() === "salarie" && (
                  <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <label>Email</label>
                          </div>
                          <div className="col-md-6">
                            <p>{`${users.oneUser.agent_rattache.user.email}`}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Nom</label>
                          </div>
                          <div className="col-md-6">
                            <p>{`${users.oneUser.agent_rattache.user.prenom} ${users.oneUser.agent_rattache.user.nom}`}</p>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label>Login</label>
                          </div>
                          <div className="col-md-6">
                            <p>{`${users.oneUser.agent_rattache.user.login} ${users.oneUser.agent_rattache.user.login}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {
                  <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        {role.toLowerCase() === "administrateur" && (
                          <>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Téléphone</label>
                              </div>
                              <div className="col-md-6">
                                <p>{`${users.oneUser.telephone}`}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label>Adresse</label>
                              </div>
                              <div className="col-md-6">
                                <p>{`${users.oneUser.adresse}`}</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <label>Login</label>
                              </div>
                              <div className="col-md-6">
                                <p>{`${users.oneUser.user.login}`}</p>
                              </div>
                            </div>
                          </>
                        )}

                        {role.toLowerCase() === "client" && (
                          <>
                            {visibleSection === "ci" && (
                              <>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Société</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.societe}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Ref Société</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_societe}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>SIRET</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.siret}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>TVA Intercommunautaire</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.tva_intercommunautaire}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Email de l'agence</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.email_agence}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Téléphone</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.telephone}`}</p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Code postal</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.code_postal}`}</p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Adresse </label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.adresse}`}</p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Ville</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ville}`}</p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Login</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.user.login}`}</p>
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
                                    <p>{`${users.oneUser.code_client}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Nom</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_comptable.nom}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Email pour envoi des factures</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_comptable.email_envoi_facture}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Téléphone</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_comptable.telephone}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Mobile</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_comptable.mobile}`}</p>
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
                                    <p>{`${users.oneUser.ref_service_gestion.nom_complet}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Email</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_service_gestion.email}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Téléphone</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_service_gestion.telephone}`}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label>Mobile</label>
                                  </div>
                                  <div className="col-md-6">
                                    <p>{`${users.oneUser.ref_service_gestion.mobile}`}</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowUser);
