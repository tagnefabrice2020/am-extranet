import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/TableLoader";
import {
  fetchAppointments,
  setAppointmentPage,
  setAppointmentsPerPage,
  searchingAppointments,
  searchAppointments,
} from "../../../redux/Apppointment/AppointmentActionCreators";

const ListOfAppointments = ({
  fetchAppointments,
  appointments,
  setAppointmentPage,
  setAppointmentsPerPage,
  searchingAppointments,
  searchAppointments,
}) => {
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

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      searchAppointments(
        appointments.currentPage,
        parseInt(appointments.perPage)
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, [
    appointments.searchValue,
    appointments.currentPage,
    appointments.perPage,
    searchAppointments,
  ]);

  const getColor = (title) => {
    let style = {
      backgroundColor: "",
      color: "",
    };
    const lowerCaseTitle = title.toLowerCase();
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
                        placeholder="Recherche"
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
                    appointments.appointments.length > 0 && (
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Lieu</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Type d'intervention</th>
                            <th>Agent</th>
                            {/* <th>Bailleur</th> */}
                            {/* <th>Locataire</th> */}
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments?.appointments.map((a, i) => (
                            <tr key={i}>
                              <td>
                                {appointments?.currentPage * 10 - 10 + i + 1}
                              </td>
                              <td>
                                {a?.propriete?.adresse}, {a?.propriete?.codePostal} {" "}
                                {a?.propriete?.ville}
                              </td>
                              <td className="text-center">{new Date(a.date).toLocaleString()}</td>
                              <td className="text-center">
                                <span
                                  className="badge"
                                  style={getColor(a?.intervention?.type)}
                                >
                                  {a?.intervention?.type}
                                </span>
                              </td>
                              <td>
                                {a?.agent?.user?.prenom} {a?.agent?.user?.nom}
                              </td>
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
                    appointments.appointments.length === 0 &&
                    appointments.totalPages <= 0 && (
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
                appointments.appointments.length > 0 && (
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
