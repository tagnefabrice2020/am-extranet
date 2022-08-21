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

const NatureDuBien = () => {
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

  const { errors, isSubmitting } = formState;
  const { errors: errors1, isSubmitting: isSubmitting1 } = formState1;

  const [visibleSection, setVisibleSection] = useState("add");
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [openEditBox, setOpenEditBox] = useState(false);
  const [loadingSelectedProperty, setLoadingSelectedProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState({});

  useEffect(() => {
    async function fetchTypeOfProperties() {
      if (visibleSection === "list") {
        setPropertiesLoading(true);
        await axios
          .get(API_URL + '/config_app/propriete?paginated="dfsqf"')
          .then((r) => {
            setProperties(r.data);
          })
          .catch((e) => {
            toast.error(
              "Une erreur c'est produit lors du chargement des type de bien. Veuillez contacter l'equipe de maintenance."
            );
          });
        setPropertiesLoading(false);
      }
    }
    fetchTypeOfProperties();
  }, [visibleSection, openEditBox]);

  const newPropertyType = async (formData) => {
    const data = { ...formData, statut: parseInt(formData.statut) };
    await axios
      .post(API_URL + "/config_app/propriete/", data)
      .then((r) => {
        toast.success("Type de propriété ajouter avec succèss.");
        reset({
          type: "",
          statut: "",
        });
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit pendant l'ajouter du type de bien."
        );
        toast.error("Veuillez contacter le service de maintenance.");
      });
  };

  const getSingleProperty = async (id) => {
    setOpenEditBox(true);
    setLoadingSelectedProperty(true);
    await axios
      .get(API_URL + `/config_app/propriete/${id}`)
      .then((r) => {
        setSelectedProperty(r.data[0]);
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit lors du chargement du type de bien. Veuillez contacter l'equipe de maintenance."
        );
      });
    setLoadingSelectedProperty(false);
  };

  const updatePropertyType = async (formData) => {
    const data = { ...formData, statut: parseInt(formData.statut) };
    await axios
      .put(
        API_URL + `/config_app/propriete/${selectedProperty.id}`,
        data
      )
      .then((r) => {
        toast.success("Type de bien modifier avec succèss.");
      })
      .catch((e) => {
        toast.error(
          "Une erreur c'est produit pendant l'ajoute du type de bien."
        );
        toast.error("Veuillez contacter le service de maintenance.");
      });
  };

  return (
    <div className="content-wrapper">
      {/* Content Wrapper. Contains page content */}
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Biens</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Biens</li>
                <li className="breadcrumb-item active">
                  Gerer vos type biens
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
                        Biens
                      </span>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                {/* form start */}
                {visibleSection === "add" && (
                  <form onSubmit={handleSubmit(newPropertyType)}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="type de bien">
                            Type de bien
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
                          <label htmlFor="status">Status*</label>
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
                {propertiesLoading && visibleSection === "list" && (
                  <TableLoader />
                )}
                {visibleSection === "list" && !propertiesLoading && (
                  <div className="card-body table-responsive p-0">
                    <table className="table table-head-fixed text-nowrap">
                      <thead>
                        <tr>
                          {/* <th></th> */}
                          <th></th>
                          <th>
                            <em>Type</em>
                          </th>
                          <th className="text-center">Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {!propertiesLoading &&
                          properties.map((p, key) => (
                            <tr key={key}>
                              {/* <td className="checkmark-box"><div className={users.selectedUsers.includes(user.uuid) ? "checkmark checked": "checkmark"} onClick={() => switchSelected(user.uuid)}></div></td> */}
                              <td>{key + 1}</td>
                              <td>{p.type}</td>

                              <td className="text-center">
                                {p.statut === 0 && (
                                  <span className={`badge badge-danger`}>
                                    {`inactive`}
                                  </span>
                                )}
                                {p.statut === 1 && (
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
                                  onClick={() => getSingleProperty(p.id)}
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
                      Modifier type de bien
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setOpenEditBox(false);
                        setSelectedProperty({});
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    {loadingSelectedProperty && <AppFormLoader />}
                    {!loadingSelectedProperty && (
                      <>
                        <form onSubmit={handleSubmit1(updatePropertyType)}>
                          <div
                            className="card-body"
                            style={{ padding: "0 0 10px 0" }}
                          >
                            <div className="row">
                              <div className="col">
                                <label
                                  htmlFor="type de propriété"
                                  style={{ marginBottom: "2px" }}
                                >
                                  Type de bien
                                </label>
                                <input
                                  className={
                                    "form-control " +
                                    (errors1.type && ` is-border-red`)
                                  }
                                  {...register1("type")}
                                  defaultValue={selectedProperty.type}
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
                                  htmlFor="statut"
                                  style={{ marginBottom: "2px" }}
                                >
                                  Status*
                                </label>
                                <select
                                  className={
                                    "form-control " +
                                    (errors1.statut && ` is-border-red`)
                                  }
                                  {...register1("statut")}
                                  defaultValue={selectedProperty.statut}
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
                        setSelectedProperty({});
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

export default NatureDuBien;
