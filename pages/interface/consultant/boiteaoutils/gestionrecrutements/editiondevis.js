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
    const [company_info, setCompanyInfo] = useState([])
    const [job, setJob] = useState([])
    const [consultant, setConsultant] = useState([])
    const [facture, setFacture] = useState([])


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
        })


        // axios.put(`http://localhost:3080/updatejob`, {
        //   id: router.query.id
        // }).then((reponse) => {
        //   setJob(reponse.data)
        // })



    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        dob: Yup.string()
            .required('Date of Birth is required')
            .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
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
            .oneOf([true], 'Accept Ts & Cs is required')
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
                                        <label> A l'attention de l'entreprise</label>
                                        <p></p>
                                        <div className="invalid-feedback">{errors.title?.message}</div>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Candidat attribué par le consultant :</label>
                                        <p></p>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Numéro de l'entreprise : </label>
                                        <p></p>
                                    </div>
                                    <div className="form-group col">
                                        <label>Email de l'entreprise : </label>
                                        <p></p>
                                    </div>
                                    <div className="form-group col-5">
                                        <label>Addresse de l'entreprise : </label>
                                        <p></p>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Date de début :</label>
                                        <input name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.dob?.message}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label>Date de fin :</label>
                                        <input name="dob" type="date" {...register('dob')} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.dob?.message}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label>Heures/jour :</label>
                                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.email?.message}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Taux:</label>
                                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.password?.message}</div>
                                    </div>
                                    <div className="form-group col">
                                        <label>Total :</label>
                                        <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                                    <label htmlFor="acceptTerms" className="form-check-label">Accepter  les conditions</label>
                                    <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary mr-1">Envoyer</button>
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
