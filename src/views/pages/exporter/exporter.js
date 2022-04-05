import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { date, object } from "yup";
import { API_URL } from "../../../config";
//import ReactExport from 'react-export-excel';
import { yupResolver } from "@hookform/resolvers/yup";
import ExportCSV from "../../../exportToCSV";

//const ExcelFile = ReactExport.ExcelFile;
//const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const Export = () => {
    const [dateType, setDateType] = useState('');
    const [exportData, setExportDate] = useState([]);
    const [loading, setLoading] = useState(false);

    const exportInfo = dateType === 'interval' ? object({
        from: date().required('La date est information requise!').typeError('Veuillez inserer une date!').max(new Date()),
        to: date().required('La date est information requise!').typeError('Veuillez inserer une date!'),
    }) : object({
        date: date().required('La date est information requise!').typeError('Veuillez inserer une date!').max(new Date()),
    });

    const { register, formState, handleSubmit, watch } = useForm({
        mode: 'unTouched',
        resolver: yupResolver(exportInfo),
    });

    const DataSet = [
        {
            column: [
                {title: 'Ref Lot'}, {title: 'Ref RDV EDL'}, {title: 'Type d\'intervention'}, {title: 'Nature du bien'}, {title: 'Date et heure'}, {title: 'Client'}, 
                {title: 'Nom du passeur'}, {title: 'Nom de L\'agent ratacheé'}, {title: 'Nom du Locataire'}, {title: 'Prenom du Locataire'}, {title: 'Numéro de téléphone'}, 
                {title: 'Email'}, {title: 'Identité de l\'ancien Locataire'}, {title: 'Surface du bien mettre carré'}, {title: 'Type'}, {title: 'Etage'}, {title: 'N° Logement'}, {title: 'N° Cave'}, 
                {title: 'Adresse'}, {title: 'Complément d\'adresse'}, {title: 'Code postal'}, {title: 'ville'}, {title: 'Nom du propriétaire'}, {title: 'Prénom du propriétaire'}, {title: 'Email du propriétaire'}, 
                {title: 'Référence'}, {title: 'Liste des doculents a récuérer'}, {title: 'Consignes particulères'}, {title: 'Informations diverses'}
            ],
            data: exportData.map((data) => [
                {value: data.ref_lot},
                {value: data.ref_rdv_edl},
                {value: data.type},
                {value: data.property_category},
                {value: data.date_rdv},
                {value: data.first_name},
                {value: data.nom_du_passeur},
                {value: data.agent},
                {value: data.tenant_last_name},
                {value: data.tenant_first_name},
                {value: data.tenant_contact},
                {value: data.tenant_email},
                {value: data.aceint_tenant_info},
                {value: data.property_surface_area},
                {value: data.property_type},
                {value: data.property_floor_number},
                {value: data.property_housing_number},
                {value: data.property_cave_number},
                {value: data.property_addresse},
                {value: data.property_postal_code},
                {value: data.property_city},
                {value: data.date},
                {value: data.lanlord_last_name},
                {value: data.lanlord_first_name},
            ])
        }
    ];

    const { errors, isSubmitting } = formState;

    const toMinDate = watch('from');


    const exportAppointment = async (data) => {
        setLoading(true);
        setExportDate([]);
        await axios.post(API_URL + '/export/appointments', data)
            .then((response) => {
                console.log(response);
                setExportDate(response.data);
                setLoading(false);
            })

    }

    return (
        <div className="content-wrapper">
            {/* Content Wrapper. Contains page content */}
            {/* Content Header (Page header) */}

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Exporter</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item active">Exporter</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Exporter</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit(exportAppointment)}>

                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Date Type</label>
                                            <select
                                                className={"form-control " + (errors.date_type && `is-border-red`)}
                                                onChange={(event) => {setDateType(event.target.value); setExportDate([])}}
                                            >
                                                <option>-- Selectioner le type date d'export</option>
                                                <option value="interval">Interval</option>
                                                {/*<option value="daily">Journalier</option>*/}
                                            </select>
                                        </div>



                                        {dateType === 'interval' &&
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">De</label>
                                                        <input
                                                            type="date"
                                                            className={"form-control " + (errors.from && `is-border-red`)}
                                                            {...register('from')}
                                                        />
                                                        {errors.from && <small className="form-text is-red">{errors.from.message}</small>}
                                                    </div>

                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">A</label>
                                                        <input
                                                            type="date"
                                                            min={toMinDate}
                                                            disabled={toMinDate == 'undefined' || toMinDate == null ? true : false }
                                                            className={"form-control " + (errors.to && `is-border-red`)}
                                                            {...register('to')}
                                                        />
                                                        {errors.to && <small className="form-text is-red">{errors.to.message}</small>}
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                        {dateType === 'daily' &&
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Date</label>
                                                <input
                                                    type="date"
                                                    className={"form-control " + (errors.date && `is-border-red`)}
                                                    {...register('date')}
                                                />
                                                {errors.date && <small className="form-text is-red">{errors.date.message}</small>}
                                            </div>

                                        }
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Chargement en cours...' : 'Charger'}</button>
                                        {!loading && exportData.length > 0 && <ExportCSV csvData={exportData} fileName={new Date()} />}
                                        {/**!loading && exportData.length > 0 && <ExcelFile 
                                            filename={new Date()} 
                                            element={<button type="button">Télécharger</button>}>
                                                <ExcelSheet dataSet={DataSet} name='rdv' />
                                        </ExcelFile>**/}
                                    </div>
                                </form>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    );
}

export default Export;