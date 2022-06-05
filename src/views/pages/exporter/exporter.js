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
                </div>
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
                                                            disabled={toMinDate === 'undefined' || toMinDate === null ? true : false }
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