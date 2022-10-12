import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/TableLoader";
import { API_URL } from "../../../config";
import {
  fetchAppointments,
  setAppointmentPage,
  setAppointmentsPerPage,
  searchingAppointments,
  searchAppointments,
} from "../../../redux/Apppointment/AppointmentActionCreators";
import { toast } from "react-toastify";
import { parseData } from "../../../utils/transformer";
import { ADMIN } from "../../../utils/constant";

const ListOfAppointments = ({
  fetchAppointments,
  appointments,
  setAppointmentPage,
  setAppointmentsPerPage,
  searchingAppointments,
  searchAppointments,
  user
}) => {
  const userInfo = parseData(user);

  useEffect(() => {
    if (appointments.searchValue.length > 0) {
      const timer = setTimeout(() => {
        searchAppointments(
          appointments.currentPage,
          parseInt(appointments.perPage)
        );
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      fetchAppointments(
        appointments.currentPage,
        parseInt(appointments.perPage)
      );
    }
    return () => {}
  }, [
    appointments.currentPage,
    appointments.perPage,
    appointments.searchValue,
    fetchAppointments,
    searchAppointments,
  ]);

  useEffect (() => {
    axios.get(`${API_URL}/rdv_app/rdv?page=1`).then((r) => console.log(r))
  }, [])

  const getColor = (title) => {
    let style = {
      backgroundColor: "",
      color: "",
    };
    const lowerCaseTitle = title?.toLowerCase();
    if (lowerCaseTitle === "constat sortant") {
      style.backgroundColor = "#9b30ff";
      style.color = "#fff";
    } else if (lowerCaseTitle === "constat entrant") {
      style.backgroundColor = "#0b86aa";
      style.color = "#fff";
    } else if (lowerCaseTitle === "constat avant travaux") {
      style.backgroundColor = "#6e6767";
      style.color = "#fff";
    } else if (lowerCaseTitle === "constat après travaux") {
      style.backgroundColor = "#0d9f3f";
      style.color = "#fff";
    } else if (lowerCaseTitle === "constat entrant meublé") {
      style.backgroundColor = "#fcafac";
      style.color = "#fff";
    } else if (lowerCaseTitle === "constat sortant meublé") {
      style.backgroundColor = "#8c1567";
      style.color = "#fff";
    } else if (lowerCaseTitle === "visite conseil") {
      style.backgroundColor = "#bf9053";
      style.color = "#fff";
    }
    return style;
  };

  const bgColor = (status) => {
    const lowerCaseTitle = status?.toLowerCase();
    let backgroundColor;
    if (lowerCaseTitle === "constat sortant") {
      backgroundColor = "9b30ff";
     
    } else if (lowerCaseTitle === "constat entrant") {
      backgroundColor = "0b86aa";
     
    } else if (lowerCaseTitle === "constat avant travaux") {
      backgroundColor = "6e6767";
    
    } else if (lowerCaseTitle === "constat après travaux") {
      backgroundColor = "0d9f3f";
     
    } else if (lowerCaseTitle === "constat entrant meublé") {
      backgroundColor = "fcafac";
    
    } else if (lowerCaseTitle === "constat sortant meublé") {
      backgroundColor = "8c1567";
     
    } else if (lowerCaseTitle === "visite conseil") {
      backgroundColor = "bf9053";
    
    } 
    return `#f5b7b1`;
  }

  const deleteAppointment = (id) => {
    if (window.confirm(`Voulez vous supprimer ce rendez-vous?`)) {
    try {
      axios.delete(`${API_URL}/rdv_app/rdv/${id}`)
        .then((r) => {
          if (r.status === 200) {
            toast.success('RDV supprimer avec succès')
            fetchAppointments(
              appointments.currentPage,
              parseInt(appointments.perPage)
            );
          }
        })
    } catch (e) {
      toast.error('Oops une erreur c\'est produit');
    }}
  } 

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Liste des rendez-vous</h1>
            </div>{" "}
            {/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/rendez-vous">Rendez-vous</Link>
                </li>
                <li className="breadcrumb-item active">Liste</li>
              </ol>
            </div>{" "}
            {/* /.col */}
          </div>{" "}
          {/* /.row */}
        </div>{" "}
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}

      {/* Main content*/}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <div className="card-tools">
                    <div className="input-group input-group-sm">
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Client, Agent"
                        onChange={async (event) => {
                          // searchingAppointments(event.target.value);
                          // setAppointmentPage(1);
                        }}
                      />

                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          {!appointments.searching && (
                            <i className="fas fa-search"></i>
                          )}
                          {appointments.searching && (
                            <div className="spinner-border" role="status">
                              <span className="sr-only"></span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body table-responsive p-0">
                  {appointments.loading && <TableLoader />}
                  {!appointments.loading &&
                    appointments?.appointments?.length > 0 && (
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th></th>
                            <th className="text-center">Date</th>
                            <th>Client</th>
                            <th className="text-center">Type de service</th>
                            <th className="text-center">Type de bien</th>
                            <th className="text-center">Etage</th>
                            <th>Lieu</th>
                            <th>Code postal</th>
                            <th>Ville</th>
                            {/* <th>Agent</th> */}
                            {/* <th>Bailleur</th> */}
                            {/* <th>Locataire</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments?.appointments.map((a, i) => (
                            <tr key={i} style={{background: bgColor(a?.intervention?.type)}}>
                              <td>
                                {appointments?.currentPage * 10 - 10 + i + 1}
                              </td>
                              <td className="text-center">{new Date(a.date).toLocaleString()}</td>
                              <td>{a.client.user.nom} {a.client.user.prenom}</td>
                              <td className="text-center">
                                <span
                                  className="badge"
                                  style={getColor(a?.intervention?.type)}
                                >
                                  {a?.intervention?.type}
                                </span>
                              </td>
                              <td className="text-center">{a.propriete.type}</td>
                              <td className="text-center">{a.propriete.numeroSol}</td>
                              <td>
                                {a?.propriete?.adresse}
                              </td>
                             <td> {a?.propriete?.codePostal} </td>
                             <td>{a?.propriete?.ville}</td>
                              {/* <td>
                                {a?.agent?.user?.prenom} {a?.agent?.user?.nom}
                              </td> */}
                              {/* <td style={{ position: `relative` }}>
                                  <Tooltip>
                                {a.propriete.bailleur.prenom} {a.propriete.bailleur.nom}
                                <Content>
                    <span>{a.propriete.bailleur.email}</span>
                </Content>
                                </Tooltip>
                              </td> */}
                              {/* <td>
                                {a.propriete.locataire.prenom} {a.propriete.locataire.nom}
                              </td> */}
                              <td>
                                <Link
                                  to={`/modifier/${a.id}/rendez-vous`}
                                >
                                  <i
                                    className="bi bi-pencil-square"
                                    style={{ color: `#000` }}
                                  />
                                </Link> &nbsp;
                                <Link
                                  to={`/voir/${a.id}/rendez-vous`}
                                >
                                  <i
                                    className="bi bi-eye"
                                    style={{ color: `#867` }}
                                  />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  {!appointments.loading &&
                    appointments?.appointments?.length === 0 &&
                    appointments?.totalPages <= 0 && (
                      <div
                        style={{
                          margin: `0 auto`,
                          maxWidth: `900px`,
                          padding: `20px`,
                        }}
                      >
                        <em
                          style={{
                            color: `red`,
                            textAlign: `center`,
                            fontSize: `30px`,
                          }}
                        >
                          Oops aucun utilisateur n'a été trouver dans la base de
                          donées!.
                        </em>
                      </div>
                    )}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
              {!appointments.loading &&
                appointments?.appointments?.length > 0 && (
                  <Pagination
                    currentPage={appointments.currentPage}
                    onPageChange={setAppointmentPage}
                    itemsPerPage={appointments.perPage}
                    length={appointments.totalPages}
                  />
                )}
            </div>
          </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

const Tooltip = styled.div`
  cursor: pointer;
  &:hover p {
    display: block;
  }
`;

const Content = styled.p`
  display: none;
  border-radius: 6px;
  padding: 4px;
  position: absolute;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.5);
  z-index: 111;
  &::after {
    content: "";
    position: absolute;
    height: 5px;
    width: 5px;
    background: #fff;
    transform: rotate(45deg);
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    top: -3px;
    left: 10px;
  }
`;

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    user: state.auth.authUser
  };
};

const mapDispatchToState = (dispatch) => {
  return {
    fetchAppointments: (currentPage, perPage) =>
      dispatch(fetchAppointments(currentPage, perPage)),
    setAppointmentPage: (page) => dispatch(setAppointmentPage(page)),
    setAppointmentsPerPage: (per_page) =>
      dispatch(setAppointmentsPerPage(per_page)),
    searchingAppointments: (value) => dispatch(searchingAppointments(value)),
    searchAppointments: (page, perPage) =>
      dispatch(searchAppointments(page, perPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToState)(ListOfAppointments);
