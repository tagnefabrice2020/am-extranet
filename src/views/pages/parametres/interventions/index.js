import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, mixed } from "yup";
import axios from "axios";
import { API_URL } from "../../../../config";
import TableLoader from "../../../../components/TableLoader";
import { toast } from "react-toastify";

import AppFormLoader from "../../../../components/AppFormLoader";

const schema = object({
  statut: mixed()
    .oneOf(["0", "1"], "Veuillez choisir parmis les options")
    .typeError("Veuillez choisir parmis les options"),
  type: string()
    .typeError("Veuillez choisir parmis les options")
    .required("Veuillez saisir des charactères alphabetic."),
});

const updateSchema = object({
  statut: mixed()
    .oneOf(["0", "1"], "Veuillez choisir parmis les options")
    .typeError("Veuillez choisir parmis les options"),
  type: string()
    .typeError("Veuillez choisir parmis les options")
    .required("Veuillez saisir des charactères alphabetic."),
});

const Intervention = () => {
  const { register, handleSubmit, reset, formState } = useForm({
    mode: "unTouched",
    resolver: yupResolver(schema),
  });

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: formState1,
  } = useForm({
    mode: "unTouched",
    resolver: yupResolver(updateSchema),
  });

  const [visibleSection, setVisibleSection] = useState("add");
  const [interventionsLoading, setInterventionLoading] = useState(true);
  const [interventions, setInterventions] = useState([]);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [loadingSelectedIntervention, setLoadingSelectedIntervention] =
    useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState({});

  const [selectedInterventionType, setSelectedInterventionType] = useState (null); 
  const [selectedInterventionStatus, setSelectedInterventionStatus] = useState (null); 

  useEffect(() => {
    async function fetchTypeOfInterventions() {
      if (visibleSection === "list") {
        setInterventionLoading(true);

        await axios
          .get(API_URL + '/config_app/intervention?paginated="dfsqf"')
          .then((r) => {
            setInterventions(r.data);
          })
          .catch((e) => {
            toast.error(
              "Une erreur c'est produit lors du chargement des interventions. Veuillez contacter l'equipe de maintenance."
            );
          });
        setInterventionLoading(false);
      }
    }
    fetchTypeOfInterventions();
  }, [visibleSection, openEditBox]);

  const { errors, isSubmitting } = formState;
  const { errors: errors1, isSubmitting: isSubmitting1 } = formState1;

  const newInterventionType = async (formData) => {
    const data = { ...formData, statut: parseInt(formData.statut) };
    await axios
      .post(API_URL + "/config_app/intervention/", data)
      .then((r) => {
        toast.success("Type d'intervention ajouter avec succèss.");
        reset({
          type: "",
          statut: "",
        });
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit pendant l'ajouter de l'intervention."
        );
        toast.error("Veuillez contacter le service de maintenance.");
      });
  };

  useEffect(() => {
    if (selectedIntervention?.hasOwnProperty('type')) {
      setSelectedInterventionType(selectedIntervention?.type);
      setSelectedInterventionStatus(selectedIntervention?.statut);
    } else {
      setSelectedInterventionType(null);
      setSelectedInterventionStatus(null);
    }
  }, [loadingSelectedIntervention, selectedIntervention]);

  const updateInterventionType = async (formData) => {
    const data = { ...formData, statut: parseInt(formData.statut) };
    await axios
      .put(
        API_URL + `/config_app/intervention/${selectedIntervention.id}`,
        data
      )
      .then((r) => {
        toast.success("Rendez-vous ajouter avec succèss.");
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit pendant l'ajoute de l'intervention."
        );
        toast.error("Veuillez contacter le service de maintenance.");
      });
  };

  const getSingleInterventions = async (id) => {
    setOpenEditBox(true);
    setLoadingSelectedIntervention(true);
    await axios
      .get(API_URL + `/config_app/intervention/${id}`)
      .then((r) => {
        setSelectedIntervention(r.data[0]);
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit lors du chargement de intervention. Veuillez contacter l'equipe de maintenance."
        );
      });
    setLoadingSelectedIntervention(false);
  };

  return (
    <div className="content-wrapper">
      {/* Content Wrapper. Contains page content */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Interventions</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Interventions</li>
                <li className="breadcrumb-item active">
                  Gerer vos type interventions
                </li>
              </ol>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div className="col-md-12">
              {/* general form elements */}
              <div className="card">
                <div className="card-header" style={{ paddingBottom: 0 }}>
                  <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => setVisibleSection("add")}
                    >
                      <span
                        className={`nav-link ${
                          visibleSection === "add" && "active"
                        }`}
                      >
                        Ajouter
                      </span>
                    </li>
                    <li
                      className="nav-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => setVisibleSection("list")}
                    >
                      <span
                        className={`nav-link ${
                          visibleSection === "list" && "active"
                        }`}
                      >
                        Interventions
                      </span>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                {/* form start */}
                {visibleSection === "add" && (
                  <form onSubmit={handleSubmit(newInterventionType)}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="type_d'intervention">
                            Type d'intervention
                          </label>
                          <input
                            className={
                              "form-control " +
                              (errors.type && ` is-border-red`)
                            }
                            {...register("type")}
                          />

                          {errors.type && (
                            <small className="form-text is-red">
                              {errors.type.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col">
                          <label htmlFor="intervention">Statut*</label>
                          <select
                            className={
                              "form-control " +
                              (errors.statut && ` is-border-red`)
                            }
                            {...register("statut")}
                            defaultValue="s"
                          >
                            <option value="s">--choisissez--</option>
                            <option value="1">active</option>
                            <option value="0">inactive</option>
                          </select>
                          {errors.statut && (
                            <small className="form-text is-red">
                              {errors.statut.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Sauvegarde en cours..."
                          : "Enregistrer"}
                      </button>
                    </div>
                  </form>
                )}
                {interventionsLoading && visibleSection === "list" && (
                  <TableLoader />
                )}
                {visibleSection === "list" && !interventionsLoading && (
                  <div className="card-body table-responsive p-0">
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th></th>
                          <th>
                            <em>Type</em>
                          </th>
                          <th className="text-center">Statut</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!interventionsLoading &&
                          interventions.map((intervention, key) => (
                            <tr key={key}>
                              {/* <td className="checkmark-box"><div className={users.selectedUsers.includes(user.uuid) ? "checkmark checked": "checkmark"} onClick={() => switchSelected(user.uuid)}></div></td> */}
                              <td>{key + 1}</td>
                              <td>{intervention.type}</td>

                              <td className="text-center">
                                {intervention.statut === 0 && (
                                  <span className={`badge badge-danger`}>
                                    {`inactive`}
                                  </span>
                                )}
                                {intervention.statut === 1 && (
                                  <span className={`badge badge-info`}>
                                    {`active`}
                                  </span>
                                )}
                              </td>
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  onClick={() =>
                                    getSingleInterventions(intervention.id)
                                  }
                                  className="btn btn-sm btn-primary"
                                >
                                  <i
                                    className="bi bi-pencil-square"
                                    style={{ color: `#000` }}
                                  ></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {/* /.card */}
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
        {openEditBox && (
          <>
            <div
              className="modal fade"
              style={{
                opacity: openEditBox ? 1 : 0,
                display: openEditBox ? "block" : "none",
                background: openEditBox ? "rgba(0,0,0, .5)" : null,
              }}
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog"
                role="document"
                style={{ margin: "20% auto" }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Modifier type d'intervention
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setOpenEditBox(false);
                        setSelectedIntervention({});
                        setSelectedInterventionType(null);
                        setSelectedInterventionStatus(null);
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {loadingSelectedIntervention && <AppFormLoader />}
                    {!loadingSelectedIntervention && (
                      <>
                        <form onSubmit={handleSubmit1(updateInterventionType)}>
                          <div
                            className="card-body"
                            style={{ padding: "0 0 10px 0" }}
                          >
                            <div className="row">
                              <div className="col">
                                <label
                                  htmlFor="type_d'intervention"
                                  style={{ marginBottom: "2px" }}
                                >
                                  Type d'intervention
                                </label>
                                <input
                                  className={
                                    "form-control " +
                                    (errors1.type && ` is-border-red`)
                                  }
                                  {...register1("type")}
                                  value={selectedInterventionType}
                                  onChange={(e) => setSelectedInterventionType(e.target.value)}
                                />

                                {errors1.type && (
                                  <small className="form-text is-red">
                                    {errors1.type.message}
                                  </small>
                                )}
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col">
                                <label
                                  htmlFor="intervention"
                                  style={{ marginBottom: "2px" }}
                                >
                                  Statut*
                                </label>
                                <select
                                  className={
                                    "form-control " +
                                    (errors1.statut && ` is-border-red`)
                                  }
                                  {...register1("statut")}
                                  value={selectedInterventionStatus}
                                  onChange={(e) => setSelectedInterventionType(e.target.value)}
                                >
                                  <option value="1">active</option>
                                  <option value="0">inactive</option>
                                </select>
                                {errors1.statut && (
                                  <small className="form-text is-red">
                                    {errors1.statut.message}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* /.card-body */}

                          <div
                            className="card-footer"
                            style={{
                              padding: "0rem 1.25rem",
                              background: "none",
                              padding: "0 0 10px 0",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting1}
                            >
                              {isSubmitting1
                                ? "Sauvegarde en cours..."
                                : "Enregistrer"}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => {
                        setOpenEditBox(false);
                        setSelectedIntervention({});
                        setSelectedInterventionType(null);
                        setSelectedInterventionStatus(null);
                      }}
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      {/* /.content */}
    </div>
  );
};

export default Intervention;
