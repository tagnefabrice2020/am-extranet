import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import styled from "styled-components";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/TableLoader";
import { fetchAppointments, setAppointmentPage, setAppointmentsPerPage, searchingAppointments, searchAppointments } from "../../../redux/Apppointment/AppointmentActionCreators";

const ListOfAppointments = ({ fetchAppointments, appointments, setAppointmentPage, setAppointmentsPerPage, searchingAppointments, searchAppointments }) => {

    useEffect(() => {
        if (appointments.searchValue.length > 0) {
            const timer = setTimeout(() => {
                searchAppointments(appointments.currentPage, parseInt(appointments.perPage));
            }, 1500);
            return () => clearTimeout(timer);
        }
        else { fetchAppointments(appointments.currentPage, parseInt(appointments.perPage)); }

    }, [appointments.currentPage, appointments.perPage, appointments.searchValue, fetchAppointments, searchAppointments]);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchAppointments(appointments.currentPage, parseInt(appointments.perPage));
        }, 1500);
        return () => clearTimeout(timer);
    }, [appointments.searchValue, appointments.currentPage, appointments.perPage, searchAppointments]);

    const getColor = (title) => {
        let style = {
            backgroundColor: '',
            color: ''
        };
        
        if (title === 'constat sortant') {
            style.backgroundColor = '#9b30ff';
            style.color = '#fff';
        } else if (title === 'constat entrant') {
            style.backgroundColor = '#0b86aa';
            style.color = '#fff';
        } else if (title === 'constat avant travaux') {
            style.backgroundColor = '#6e6767';
            style.color = '#fff';
        } else if (title === 'constat après travaux') {
            style.backgroundColor = '#0d9f3f';
            style.color = '#fff';
        } else if (title === 'constat entrant meublé') {
            style.backgroundColor = '#fcafac';
            style.color = '#fff';
        } else if (title === 'constat sortant meublé') {
            style.backgroundColor = '#8c1567';
            style.color = '#fff';
        } else if (title === 'visite conseil') {
            style.backgroundColor = '#bf9053';
            style.color = '#fff';
        }
        return style;
    }

    return (

        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Listes des rendez-vous</h1>
                        </div> {/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to="/">Rendez-vous</Link></li>
                                <li className="breadcrumb-item active">List</li>
                            </ol>
                        </div> {/* /.col */}
                    </div> {/* /.row */}
                </div> {/* /.container-fluid */}
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
                                    <h3 className="card-title">
                                        <select className="form-control"
                                            style={{
                                                padding: `0.175rem`,
                                                height: `calc(1.8125rem + 2px)`,
                                            }}
                                            onChange={(event) => {
                                                setAppointmentsPerPage(event.target.value);
                                                setAppointmentPage(1);
                                            }}
                                        >
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='15'>15</option>
                                        </select>
                                    </h3>

                                    <div className="card-tools">
                                        <div className="input-group input-group-sm">
                                            <input
                                                type="text"
                                                name="table_search"
                                                className="form-control float-right"
                                                placeholder="Recherche"
                                                onChange={async (event) => {
                                                    searchingAppointments(event.target.value);
                                                    setAppointmentPage(1)
                                                }}
                                            />

                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    {!appointments.searching &&
                                                        <i className="fas fa-search"></i>
                                                    }
                                                    {appointments.searching &&
                                                        <div className="spinner-border" role="status">
                                                            <span className="sr-only"></span>
                                                        </div>
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    {appointments.loading &&
                                        <TableLoader />
                                    }
                                    {!appointments.loading && appointments.appointments.length > 0 &&
                                        <table className="table table-head-fixed text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Lieu</th>
                                                    <th>Type d'intervention</th>
                                                    <th>Agent</th>
                                                    <th>Bailleure</th>
                                                    <th>Locataire</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.appointments.map((appointment, key) =>
                                                    <tr key={key}>
                                                        <td>{((appointments.currentPage * appointments.perPage) - appointments.perPage) + key + 1}</td>
                                                        <td>{appointment.property_adresse}, {appointment.property_postal_code} {appointment.property_city}</td>
                                                        <td className="text-center"><span className="badge" style={getColor(appointment.intervention)}>{appointment.intervention}</span></td>
                                                        <td>{appointment.a_first_name} {appointment.a_first_name}</td>
                                                        <td style={{ position: `relative` }}>
                                                            <Tooltip>
                                                                {appointment.lanlord_first_name} {appointment.lanlord_last_name}
                                                                <Content>
                                                                    <span>{appointment.lanlord_email}</span>
                                                                </Content>
                                                            </Tooltip>
                                                        </td>
                                                        <td style={{ position: `relative` }}>
                                                            <Tooltip>
                                                                {appointment.tenant_first_name} {appointment.tenant_last_name}
                                                                <Content>
                                                                    <span>{appointment.tenant_email}</span>
                                                                </Content>
                                                            </Tooltip>
                                                        </td>
                                                        <td><Link to={`/modifier/${appointment.uuid}/rendez-vous`}><i className="bi bi-pencil-square" style={{ color: `#000` }}></i></Link></td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>
                                    }
                                    {!appointments.loading && appointments.appointments.length === 0 && appointments.totalPages <= 0 &&
                                        <div style={{ margin: `0 auto`, maxWidth: `900px`, padding: `20px` }}>
                                            <em style={{ color: `red`, textAlign: `center`, fontSize: `30px` }}>Oops aucun utilisateur n'a été trouver dans la base de donées!.</em>
                                        </div>
                                    }
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {!appointments.loading && appointments.appointments.length > 0 &&
                                <Pagination
                                    currentPage={appointments.currentPage}
                                    onPageChange={setAppointmentPage}
                                    itemsPerPage={appointments.perPage}
                                    length={appointments.totalPages}
                                />
                            }
                        </div>
                    </div>
                    {/* /.row (main row) */}

                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

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
    border: 1px solid rgba(0,0,0,.5);
    z-index: 111;
    &::after {
        content: "";
        position: absolute;
        height: 5px;
        width: 5px;
        background: #fff;
        transform: rotate(45deg);
        border-top: 1px solid rgba(0,0,0,.5);
        border-left: 1px solid rgba(0,0,0,.5);
        top: -3px;
        left: 10px;
    }
`;

const mapStateToProps = (state) => {
    return {
        appointments: state.appointments
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        fetchAppointments: (currentPage, perPage) => dispatch(fetchAppointments(currentPage, perPage)),
        setAppointmentPage: (page) => dispatch(setAppointmentPage(page)),
        setAppointmentsPerPage: (per_page) => dispatch(setAppointmentsPerPage(per_page)),
        searchingAppointments: (value) => dispatch(searchingAppointments(value)),
        searchAppointments: (page, perPage) => dispatch(searchAppointments(page, perPage)),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ListOfAppointments);