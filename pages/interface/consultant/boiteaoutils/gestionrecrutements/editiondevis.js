import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import Header from '../../../../../components/header/header'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import axios from 'axios'
import { api } from '../../../../api/api'
import router from 'next/router'


export default function index() {
    const [company_info, setCompanyInfo] = useState([]);
    const [job, setJob] = useState([]);
    const [facture, setFacture] = useState([]);

    const [description, setDescription] = useState("");
    const [description_service, setDescriptionService] = useState("");
    const [date_debut, setDateDbt] = useState("")
    const [date_fin, setDateFin] = useState("");
    const [heures, setHeures] = useState(0);
    const [taux, setTaux] = useState(0);
    const [total, setTotal] = useState(0);


    useEffect(() => {

        axios.post(`${api}/getCompanyInfoById`, {
            id: router.query.by
        }).then((reponse) => {
            setCompanyInfo(reponse.data);
            console.log("date on edition devis is", reponse.data);

        })

        axios.post(`${api}/getJobById`, {
            id: router.query.id
        }).then((reponse) => {
            setJob(reponse.data)
            console.log("job data is", reponse.data);
        })

    }, [])


    const addFacture = () => {
        try {
            axios.post(`${api}/createFacture`, {

                date_debut: date_debut,
                date_fin: date_fin,
                taux: taux,
                heures: heures,
                total: total,
                description: description,
                description_service: job.job_title,
                facture_company_id: company_info.company_id,
                facture_consultant_id: company_info.consultant_id
            }).then(() => {
                setFacture([
                    ...facture,
                    {
                        date_debut: date_debut,
                        date_fin: date_fin,
                        taux: taux,
                        heures: heures,
                        total: total,
                        description: description,
                        description_service: description_service
                    },
                ]);
            });
        }
        catch (err) {
            console.log("err is", err);
        }
    };
    const validationSchema = Yup.object().shape({

        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob: Yup.string()
            .required('Veuillez indiquer la date de début.'),
        dob2: Yup.string()
            .required('Veuillez indiquer la date de fin.'),
        // .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Veuillez accepter les conditions.')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    const submitForm = (data) => {
        console.log(data);
    };
    return (
        <div>
            <Head>
                <title>A recruit | CV Thèque</title>
            </Head>

            <Consultant_layout
                position="gestionrecrutements"
            >
                <div >
                    <div>
                        <h1>Edition de facture</h1>
                    </div>


                    <div className="card m-3">
                        <h5 className="card-header">Création d'un devis</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-row">
                                    <div className="form-group col">
                                        <label> A l'attention de l'entreprise :</label>
                                        <p>{company_info.company_name}</p>
                                        <div className="invalid-feedback">{errors.title?.message}</div>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Nom du consultant :</label>
                                        <p>{company_info.user_firstname}</p>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Numéro de contact de l'entreprise : </label>
                                        <p>{company_info.company_phone_number}</p>
                                    </div>
                                    <div className="form-group col">
                                        <label>Addresse de l'entreprise : </label>
                                        <p> {company_info.company_address}</p>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Code postal : </label>
                                        <p>{company_info.company_zip_code}</p>
                                    </div>
                                </div>
                                <div className="form-group col">
                                    <label>Description du service :</label>
                                    <p onChange={(event) => {
                                        setDescriptionService(event.target.value);
                                    }}>{job.job_title}</p>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Date de début :</label>
                                        <input name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} onChange={(event) => {
                                            setDateDbt(event.target.value);
                                        }} />
                                        <div className="invalid-feedback">{errors.dob?.message}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label>Date de fin :</label>
                                        <input name="dob" type="date" {...register('dob2')} className={`form-control ${errors.dob2 ? 'is-invalid' : ''}`} onChange={(event) => {
                                            setDateFin(event.target.value);
                                        }} />
                                        <div className="invalid-feedback">{errors.dob2?.message}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label>Description :</label>
                                        <input name="text" type="text" onChange={(event) => {
                                            setDescription(event.target.value);
                                        }} />

                                    </div>

                                    <div className="form-group col">
                                        <label>Heures/jour :</label>
                                        <input name="heures" type="number"
                                            onChange={(event) => {
                                                setHeures(event.target.value);
                                            }} />

                                    </div>
                                    <div className="form-group col">
                                        <label>Taux:</label>
                                        <input name="heures" type="number"
                                            onChange={(event) => {
                                                setTaux(event.target.value);
                                            }} />

                                    </div>
                                </div>
                                <div className="form-row">

                                    <div className="form-group col">
                                        <label>Total :</label>
                                        <input name="text" type="number" step="0.01" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} onChange={(event) => {
                                            setTotal(event.target.value);
                                        }} />
                                        <div className="invalid-feedback">{errors.nombre?.message}</div>
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                                    <label htmlFor="acceptTerms" className="form-check-label">Accepter  les conditions</label>
                                    <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" onClick={addFacture} className="btn btn-primary mr-1">Envoyer</button>
                                    <button type="button" onClick={() => reset()} className="btn btn-secondary">Recommencer</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </Consultant_layout>
        </div >
    )
}


export async function getServerSideProps({ req }) {

    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

    if (user_cookie.me) {

        let data = []

        //console.log(data)

        return {
            props: {
                data
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth/login?dest=consultant/",
        },
        props: { message: "redirect" },
    }
}
