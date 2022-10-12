import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import AppCalendar from "../../../components/AppCalendar";
import { parseData } from "../../../utils/transformer";
import { ADMIN, AUDIT_PLANNEUR, CLIENT_PARTICULIER, CLIENT_PROFESSIONEL } from "../../../utils/constant.js";

const Dashboard = ({ stats, auth }) => {
  const [statistics, setStatistics] = useState({});
  const [loadStatistics, setLoadStats] = useState(true);
  const userInfo = parseData(auth.authUser);

  useEffect(() => {
    const stats = JSON.parse(localStorage.getItem("stats"));
    setStatistics(stats);
    setLoadStats(false);
  }, []);

  return (
    <div className="content-wrapper" style={{ minHeight: 375 + "px" }}>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Tableau de bord</h1>
            </div>

            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">
                  <Link to="/" className="text-decoration-underline text-dark">
                    Tableau de bord
                  </Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      {/* Main content*/}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
             {(userInfo.group.toLowerCase() !== CLIENT_PROFESSIONEL && userInfo.group.toLowerCase() !== CLIENT_PARTICULIER && userInfo.group.toLowerCase() !== AUDIT_PLANNEUR) &&
            <div className="col">
              <div className="small-box bg-1" style={{ position: "relative" }}>
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.utilisateurs}</h3>
                  <p><Link to="/utilisateurs" style={{color: `black`}}>NOMBRE D’UTILISATEURS</Link></p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <span
                  className="small-box-footer cursor"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>}
            {userInfo.group.toLowerCase() === ADMIN && 
            <div className="col">
              <div className="small-box bg-3" style={{ position: "relative" }}>
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.admin}</h3>
                  <p><Link to="/utilisateurs" style={{color: `white`}}>NOMBRE D'ADMINISTRATEURS</Link></p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <span
                  className="small-box-footer cursor"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>}

            {/* ./col */}
            { (userInfo.group.toLowerCase() !== CLIENT_PROFESSIONEL && userInfo.group.toLowerCase() !== CLIENT_PARTICULIER && userInfo.group.toLowerCase() !== AUDIT_PLANNEUR) &&
            [<div className="col">
              <div className="small-box bg-4" style={{ position: "relative" }}>
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.agent}</h3>
                  <p><Link to="/utilisateurs" style={{color: `white`}}>NOMBRE D'AGENT</Link></p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <span
                  className="small-box-footer cursor"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>,
            ]}
            { (userInfo.group.toLowerCase() !== CLIENT_PROFESSIONEL && userInfo.group.toLowerCase() !== CLIENT_PARTICULIER) && [
              <div className="col">
              <div className="small-box bg-5" style={{ position: "relative" }}>
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.client}</h3>
                  <p><Link to="/utilisateurs" style={{color: `white`}}>NOMBRE DE CLIENT</Link></p>
                </div>
                <div className="icon">
                  <i className="fas fa-users"></i>
                </div>
                <span
                  className="small-box-footer cursor"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>
            ]}
            { (userInfo.group.toLowerCase() === CLIENT_PROFESSIONEL) && 
            <div className="col">
              <div className="small-box bg-3">
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.salarie}</h3>
                  <p><Link to="/utilisateurs" style={{color: `white`}}>NOMBRE DE SALARIE</Link></p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <span className="small-box-footer cursor">
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>}
            { (userInfo.group.toLowerCase() !== AUDIT_PLANNEUR) &&
            <div className="col">
              <div className="small-box bg-2">
                <div className="inner">
                  <h3>{!loadStatistics && statistics?.rdv}</h3>
                  <p><Link to="/rendez-vous" style={{color: `white`}}>NOMBRE DE RENDEZ-VOUS</Link></p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars"></i>
                </div>
                <span className="small-box-footer cursor">
                  {/* Plus d'info <i className="fas fa-arrow-circle-right"></i> */}
                </span>
              </div>
            </div>}
            {/* ./col */}
          </div>

          {/* /.row */}

          <div className="row">
            <div className="col">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-calendar-alt"></i> &nbsp; Rendez-vous
                  </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
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
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

// const DashboardCardLoaderBox = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     margin-right: -7.5px;
//     margin-left: -7.5px;
//     height: 165px;
//     &>div {
//         @media (min-width: 992px) {
//             flex: 0 0 25%;
//             max-width: 25%;
//         }
//         padding: 0px 7.5px;
//     }
//     &>div:nth-child(1) > div {
//         animation: skeleton-loading 1s linear infinite alternate;
//         animation-delay: 50ms;
//     }
//     &>div:nth-child(2) > div {
//         animation: skeleton-loading 1s linear infinite alternate;
//         animation-delay: 150ms;
//     }
//     &>div:nth-child(3) > div {
//         animation: skeleton-loading 1s linear infinite alternate;
//         animation-delay: 200ms;
//     }
//     &>div:nth-child(4) > div {
//         animation: skeleton-loading 1s linear infinite alternate;
//         animation-delay: 250ms;
//     }
// `

// const DashboardCardLoader = styled.div`
//     height: 145px;
//     padding: 0px 7.5px;
//     border-radius: 30px;
//     bordr-radius: 30px;
//     margin-bottom: 20px;

//     @keyframes skeleton-loading {
//         0% {
//             background-color: hsl(200, 10%, 80%);
//         }
//         100% {
//             background-color:  hsl(200, 20%, 95%);
//         }
//     }
// `
const mapStateToProps = (state) => {
  return {
    stats: state.stats,
    loginData: state.auth,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loadStats: () => dispatch(loadStats()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
