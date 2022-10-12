import axios from "axios";
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/TableLoader";
import { API_URL } from "../../../config";
import { parseData } from "../../../utils/transformer";

const ListOfSalarie = ({ user }) => {
  const [page, setPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState (true);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState (1);
  const [totalPages, setTotalPages] = useState (1);

  const userInfo = parseData(user);

    useEffect(() => {
        function getEmployees () {
            axios.get(`${API_URL}/salarie_app/salarie?client=${userInfo.client_id}`)
                .then((r) => {
                    setEmployees(r.data.results);
                    setLoading(false);
                })
        }
        getEmployees();
    }, [userInfo.client_id]);

  const search = () => {};

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Liste de Salarié</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Salarié</li>
                <li className="breadcrumb-item active">Liste</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Salarié</h3>

                  <div className="card-tools">
                    <div
                      className="input-group input-group-sm"
                      style={{ width: `150px` }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Recherche"
                        onChange={async (event) => {
                          search(event.target.value);
                          setPage(1);
                        }}
                      />

                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          {!searching && (
                            <i className="fas fa-search"></i>
                          )}
                          {searching && (
                            <div className="spinner-border" role="status">
                              <span className="sr-only"></span>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  {loading && <TableLoader />}
                  {!loading && employees.length > 0 && (
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          <th></th>
                          <th>
                            <em>Nom</em>
                          </th>
                          <th>Email</th>
                          <th className="text-center">Fonction</th>
                          <th></th>
                          {/* <th></th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((user, key) => (
                          <tr key={key}>
                            <td>{currentPage * 10 - 10 + key + 1}</td>
                            <td>
                              {user?.user?.prenom} {user?.user?.nom}
                            </td>
                            <td>{user?.user?.email}</td>
                            <td className="text-center">
                             {user?.fonction}
                            </td>
                            <td>
                              <Link
                                to={`/modifier/${user.id}/salarie/`}
                              >
                                <i
                                  className="bi bi-pencil-square"
                                  style={{ color: `#000` }}
                                ></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {!loading &&
                    employees.length === 0 &&
                    totalPages <= 0 && (
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
              </div>
              {!loading && employees.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setPage}
                  itemsPerPage={10}
                  length={totalPages}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.auth.authUser,
  };
};

export default connect(mapStateToProps, null)(ListOfSalarie);
