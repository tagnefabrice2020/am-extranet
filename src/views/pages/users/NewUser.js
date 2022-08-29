import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { storeUser } from "../../../redux/User/UserActionCreators";
import { connect } from "react-redux";
import { userAdminSchema } from "../../../validationRules/userSchema";

const NewUser = ({ storeUser, users, auth }) => {
  const { register, formState, reset, handleSubmit } = useForm({
    mode: "unTouched",
    resolver: yupResolver(userAdminSchema),
  });
  const authUser = typeof auth.authUser === 'string' ? JSON.parse(auth.authUser) : auth.authUser;
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (users.reset.form) {
      reset();
    }
  }, [users.reset.form, reset]);

  const newUser = (data) => {
    if (data.role === "2")
      data = {
        ...data,
        trigramme:
          data.prenom.substr(0, 1).toUpperCase() +
          data.nom.substr(0, 1).toUpperCase(),
      };
    storeUser(data);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Ajouter un Utilisateur</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Utilisateur</li>
                <li className="breadcrumb-item active">
                  Ajouter un Utilisateur
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Ajouter un Utilisateur</h3>
                </div>
                <form onSubmit={handleSubmit(newUser)}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Login</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.login && ` is-border-red`)
                            }
                            placeholder="Le login"
                            {...register("login")}
                          />
                          {errors.login && (
                            <small className="form-text is-red">
                              {errors.login.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Prénom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.firstname && ` is-border-red`)
                            }
                            placeholder="Prénom de l'utilisateur"
                            {...register("prenom")}
                          />
                          {errors.firstname && (
                            <small className="form-text is-red">
                              {errors.firstname.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Nom</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.lastname && `is-border-red`)
                            }
                            placeholder="Nom de l'utilisateur"
                            {...register("nom")}
                          />
                          {errors.lastname && (
                            <small className="form-text is-red">
                              {errors.lastname.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            className={
                              "form-control " +
                              (errors.email && `is-border-red`)
                            }
                            placeholder="Entre votre email"
                            {...register("email")}
                          />
                          {errors.email && (
                            <small className="form-text is-red">
                              {errors.email.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Adresse</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.adresse && `is-border-red`)
                            }
                            placeholder="Entre votre adresse"
                            {...register("adresse")}
                          />
                          {errors.adresse && (
                            <small className="form-text is-red">
                              {errors.adresse.message}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        {" "}
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Téléphone</label>
                          <input
                            type="text"
                            className={
                              "form-control " +
                              (errors.telephone && `is-border-red`)
                            }
                            placeholder="Entre le numéro de telephone"
                            {...register("telephone")}
                          />
                          {errors.telephone && (
                            <small className="form-text is-red">
                              {errors.telephone.message}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Mot de passe</label>
                      <input
                        type="password"
                        className={
                          "form-control " + (errors.mdp && `is-border-red`)
                        }
                        placeholder="Entre le mdp"
                        {...register("mdp")}
                      />
                      {errors.mdp && (
                        <small className="form-text is-red">
                          {errors.mdp.message}
                        </small>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Role</label>
                      <select
                        className={
                          "form-control " + (errors.role && `is-border-red`)
                        }
                        {...register("role")}
                      >
                        <option value="1" disabled={authUser.group.toLowerCase() !== 'administrateur'}>Administrateur</option>
                        <option value="2">Agent</option>
                        <option value="3">Client</option>
                        {/* <option value="4">Salarié</option> */}
                      </select>
                      {errors.role && (
                        <small className="form-text text-muted is-danger">
                          {errors.role.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sauvegarde en cours..." : "Enregistrer"}
                    </button>
                  </div>
                </form>
              </div>
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
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => dispatch(storeUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
