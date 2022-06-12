import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import TableLoader from "../../../components/TableLoader";
import {
  fetchUsers,
  searching,
  searchUsers,
  selectUsers,
  setPage,
  setUsersPerPage,
  switchUserStatus,
  changeBulkStatus,
} from "../../../redux/User/UserActionCreators";

const ListOfUsers = ({
  fetchUsers,
  users,
  searchUsers,
  setUsersPerPage,
  setPage,
  searching,
  switchUserStatus,
  selectUsers,
  changeBulkStatus,
}) => {
  useEffect(() => {
    if (users.searchValue.length > 0) {
      const timer = setTimeout(() => {
        searchUsers(users.currentPage, parseInt(users.perPage));
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      fetchUsers(users.currentPage, parseInt(users.perPage));
    }
  }, [
    users.perPage,
    users.currentPage,
    fetchUsers,
    searchUsers,
    users.searchValue,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers(users.currentPage, parseInt(users.perPage));
    }, 1500);
    return () => clearTimeout(timer);
  }, [users.searchValue, users.currentPage, searchUsers, users.perPage]);

  useEffect(() => {
    // console.log(users)
  });

  const setStatus = (uuid) => {
    switchUserStatus(uuid);
  };

  const switchSelected = (uuid) => {
    let selectedUsers = users.selectedUsers;
    let userIdx = selectedUsers.findIndex((user) => {
      return user === uuid;
    });
    if (userIdx === -1) {
      selectedUsers.push(uuid);
      selectUsers(selectedUsers);
    } else {
      selectedUsers.splice(userIdx, 1);
      selectUsers(selectedUsers);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Liste d'utilisateurs</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Utilisateurs</li>
                <li className="breadcrumb-item active">Liste</li>
              </ol>
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <button
                className="btn btn-sm btn-info"
                onClick={() => changeBulkStatus(true)}
              >
                {users.changeBulkStatusLoading
                  ? "Changement en cours..."
                  : "Changer leurs status"}
              </button>
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
                  <h3 className="card-title">
                    <select
                      className="form-control"
                      style={{
                        padding: `0.175rem`,
                        height: `calc(1.8125rem + 2px)`,
                      }}
                      onChange={(event) => {
                        setUsersPerPage(event.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                    </select>
                  </h3>

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
                          searching(event.target.value);
                          setPage(1);
                        }}
                      />

                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          {!users.searching && (
                            <i className="fas fa-search"></i>
                          )}
                          {users.searching && (
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
                  {users.loading && <TableLoader />}
                  {!users.loading && users.users.length > 0 && (
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th></th>
                          <th>
                            <em>Nom</em>
                          </th>
                          <th>Email</th>
                          <th>Role</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.users.map((user, key) => (
                          <tr key={key}>
                            {/* <td className="checkmark-box"><div className={users.selectedUsers.includes(user.uuid) ? "checkmark checked": "checkmark"} onClick={() => switchSelected(user.uuid)}></div></td> */}
                            <td>
                              {users.currentPage * users.perPage -
                                users.perPage +
                                key +
                                1}
                            </td>
                            <td>
                              {user.first_name} {user.last_name}
                            </td>
                            <td>{user.email}</td>
                            <td>
                              {user.groups.map((group, idx) => {
                                let role = group.group.toLowerCase();
                                if (role === "administrateur") {
                                  return (
                                    <span
                                      key={`${idx}-role`}
                                      className={`badge badge-primary`}
                                    >
                                      {group.group.toLowerCase()}
                                    </span>
                                  );
                                }
                                if (role === "agent") {
                                  return (
                                    <span
                                      key={`${idx}-role`}
                                      className={`badge badge-info`}
                                    >
                                      {group.group.toLowerCase()}
                                    </span>
                                  );
                                }
                                if (role === "client") {
                                  return (
                                    <span
                                      key={`${idx}-role`}
                                      className={`badge badge-success`}
                                    >
                                      {group.group.toLowerCase()}
                                    </span>
                                  );
                                }
                                if (role === "salarie") {
                                  return (
                                    <span
                                      key={`${idx}-role`}
                                      className={`badge badge-dark`}
                                    >
                                      {group.group.toLowerCase()}
                                    </span>
                                  );
                                }
                                return null;
                              })}
                            </td>
                            <td>
                              <Link
                                to={`/modifier/${
                                  user.groups[0].group.toLowerCase() ===
                                  "administrateur"
                                    ? user.administrateur
                                    : user.groups[0].group.toLowerCase() ===
                                      "agent"
                                    ? user.agent
                                    : user.groups[0].group.toLowerCase() ===
                                      "client"
                                    ? user.client
                                    : user.groups[0].group.toLowerCase() ===
                                      "salarie"
                                    ? user.salarie
                                    : null
                                }/${user.groups[0].group.toLowerCase()}/utilisateur`}
                              >
                                <i
                                  className="bi bi-pencil-square"
                                  style={{ color: `#000` }}
                                ></i>
                              </Link>
                            </td>
                            <td>
                              {user.active ? (
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => setStatus(user.id)}
                                >
                                  desactiver
                                </button>
                              ) : (
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => setStatus(user.id)}
                                >
                                  activer
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {!users.loading &&
                    users.users.length === 0 &&
                    users.totalPages <= 0 && (
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
              {!users.loading && users.users.length > 0 && (
                <Pagination
                  currentPage={users.currentPage}
                  onPageChange={setPage}
                  itemsPerPage={users.perPage}
                  length={users.totalPages}
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
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (currentPage, perPage) =>
      dispatch(fetchUsers(currentPage, perPage)),
    setUsersPerPage: (perPage) => dispatch(setUsersPerPage(perPage)),
    setPage: (page) => dispatch(setPage(page)),
    searching: (value) => dispatch(searching(value)),
    searchUsers: (currentPage, perPage) =>
      dispatch(searchUsers(currentPage, perPage)),
    switchUserStatus: (uuid) => dispatch(switchUserStatus(uuid)),
    selectUsers: (uuid) => dispatch(selectUsers(uuid)),
    changeBulkStatus: (status) => dispatch(changeBulkStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfUsers);
