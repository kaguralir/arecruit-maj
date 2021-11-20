import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../../../../components/header/header'
import Footer from '../../../../../components/footer/footer'
import Link from 'next/link'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { api } from '../../../../api/api'
import { useRouter } from 'next/router'




export default function index() {

    const [company_fillededJobs, setCompanyFilledJobs] = useState([]);
    const [company_unFilledJobs, setCompanyUnFilledJobs] = useState([]);
    const [company_info, setCompanyInfo] = useState([]);

    const router = useRouter()
    const customImgLoader = ({ src }) => {
        return `${src}`
    }
    //console.log(data)
    useEffect(async () => {

        await axios.post(`${api}/getCompanyInfoById`, {
            id: router.query.id
        }).then((reponse) => {
            setCompanyInfo(reponse.data);
            console.log(reponse.data);
        })

        await axios.get(`${api}/getAllJobs`,
            {
                company_id: router.query.id
            }).then((reponse) => {

                console.log("all job is", reponse);

            })
        await axios.post(`${api}/getUnFillededJob`,
            {
                company_id: router.query.id
            }).then((reponse) => {
                console.log("router is", router.query.id, "router by is", router.query.id);
                setCompanyUnFilledJobs(reponse.data)
                console.log(reponse);

            })

        await axios.post(`${api}/getFillededJob`,
            {
                company_id: router.query.id
            }).then((reponse) => {
                setCompanyFilledJobs(reponse.data)
            })

    }, [])

    return (
        <>
            <Head>
                <title>A recruit | CV Thèque</title>
            </Head>

            <Consultant_layout
                position="gestion.recrutement"
            >
                <div>
                    <div className="consultant-company-info orientationH spaceBetween">
                        <div>
                            <div><span>{company_info.company_name || "Nom : Non renseigné"}</span></div>
                            <div><span>{(company_info.company_consultant_name + " " + company_info.company_consultant_firstname) || "Représentant : Non renseigné"}</span></div>
                        </div>
                        <div className="image">
                            {!company_info.company_logo ?
                                <div className="defaultLogo"><div>{company_info.company_name && company_info.company_name.charAt(0)}</div></div>
                                :
                                <Image alt="logo" loader={customImgLoader} src={company_info.company_logo} width={50} height={50} />
                            }
                        </div>
                    </div>
                    <div className="Table">
                        <div className="title2">En cours</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Intitulé</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {company_unFilledJobs.length !== 0 ? company_unFilledJobs.map((element, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{element.job_id}</td>
                                            <td>{element.job_title}</td>
                                            <td>{element.created_at}</td>
                                            <td>
                                                <Link href={{ pathname: "/interface/consultant/boiteaoutils/gestionrecrutements/gerer", query: { id: element.job_id, by: router.query.id, type: router.query.type } }}>
                                                    <a>Gérer</a>
                                                </Link>
                                            </td>

                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan="4" className="empty_table">Aucune donnée disponible</td>
                                    </tr>}
                            </tbody>
                        </table>

                        <div className="title2">Terminée</div>
                        <table>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Intitulé</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {company_fillededJobs.length !== 0 ? company_fillededJobs.map((element, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{element.job_id}</td>
                                            <td>{element.job_title}</td>
                                            <td>{element.created_at}</td>
                                            <td>
                                                <Link href={{ pathname: "/interface/consultant/boiteaoutils/gestionrecrutements/gerer", query: { id: element.job_id, by: router.query.id } }}>
                                                    <a>Gérer</a>
                                                </Link>
                                            </td>

                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td colSpan="4" className="empty_table">Aucune donnée disponible</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </Consultant_layout>


        </>
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
            destination: "/auth/login?dest=consultant/boiteaoutils/gestionrecrutements/recrutementEmployeur",
        },
        props: { message: "redirect" },
    }
}
