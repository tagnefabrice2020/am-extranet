import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AppCalendar from "../../../components/AppCalendar";
import { loadStats } from "../../../redux/DashBoardCard/DashboardCardActionCreators";

const Dashboard = ({ stats, loadStats, loginData }) => {
    useEffect(() => {
        loadStats();
    }, [loadStats]);
    return (
        <div className="content-wrapper" style={{ minHeight: 375 + 'px' }}>
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Tableau de bord</h1>
                        </div> {/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active"><Link to="/" className="text-decoration-underline text-dark">Tableau de bord</Link></li>
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
                    {stats && !stats.loading &&
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-1">
                                    <div className="inner">
                                        <h3>{stats.totalUsers}</h3>

                                        <p>NOMBRE D’UTILISATEURS</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-users"></i>
                                    </div>
                                    {/*<Link to="/" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right"></i></Link>*/}
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-2">
                                    <div className="inner">
                                        <h3>{stats.totalAppointments}</h3>

                                        <p>NOMBRE DE RENDEZ-VOUS</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars"></i>
                                    </div>
                                    {/*<Link to="/" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right"></i></Link>*/}
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-3">
                                    <div className="inner">
                                        <h3>{stats.totalCanceledAppointments}</h3>

                                        <p>RENDEZ-VOUS ANNULÉ</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add"></i>
                                    </div>
                                    {/*<Link to="/" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right"></i></Link>*/}
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-4">
                                    <div className="inner">
                                        <h3>0</h3>

                                        <p>MOYENNE DE RDV REALISES/(JOURS)</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph"></i>
                                    </div>
                                    {/*<Link to="/" className="small-box-footer">Plus d'info <i className="fas fa-arrow-circle-right"></i></Link>*/}
                                </div>
                            </div>
                            {/* ./col */}
                        </div>
                    }
                    {/* /.row */}
                    {stats.loading &&
                        <div className="container-fluid">
                            <DashboardCardLoaderBox>
                                <div>
                                    <DashboardCardLoader />
                                </div>
                                <div>
                                    <DashboardCardLoader />
                                </div>
                                <div>
                                    <DashboardCardLoader />
                                </div>
                                <div>
                                    <DashboardCardLoader />
                                </div>
                            </DashboardCardLoaderBox>
                        </div>
                    }

                    <div className="row">
                        <div className="col">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        <i className="fas fa-calendar-alt"></i> &nbsp;
                                        Rendez-vous
                                    </h3>

                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <AppCalendar />
                                </div>
                                {/* /.card */}
                            </div>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

const DashboardCardLoaderBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -7.5px;
    margin-left: -7.5px;
    height: 165px;
    &>div {
        @media (min-width: 992px) {
            flex: 0 0 25%;
            max-width: 25%;
        }
        padding: 0px 7.5px;
    }
    &>div:nth-child(1) > div {
        animation: skeleton-loading 1s linear infinite alternate;
        animation-delay: 50ms;
    }
    &>div:nth-child(2) > div {
        animation: skeleton-loading 1s linear infinite alternate;
        animation-delay: 150ms;
    }
    &>div:nth-child(3) > div {
        animation: skeleton-loading 1s linear infinite alternate;
        animation-delay: 200ms;
    }
    &>div:nth-child(4) > div {
        animation: skeleton-loading 1s linear infinite alternate;
        animation-delay: 250ms;
    }
`

const DashboardCardLoader = styled.div`
    height: 145px;
    padding: 0px 7.5px;
    border-radius: 30px;
    bordr-radius: 30px;
    margin-bottom: 20px;
    
    @keyframes skeleton-loading {
        0% {
            background-color: hsl(200, 10%, 80%);
        }
        100% {
            background-color:  hsl(200, 20%, 95%);
        }
    }
`
const mapStateToProps = (state) => {
    return {
        stats: state.stats,
        loginData: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStats: () => dispatch(loadStats()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);