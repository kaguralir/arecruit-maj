import React, { useState, useEffect, Component } from 'react'
import cookie from 'cookie'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import WrapListLayout from '../../../components/layouts/wrap_list_layout'
import Axios from 'axios'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import BigSizeScreenNotif from '../../../components/notification/bigSizeScreenNotif'
import Image from 'next/image'
import { api } from '../../api/api'


export default class index extends Component {

    state = {

        //Initial state
        api: api,
        user: [],
        company_info: [],
        company_fillededJobs: [],
        company_unFilledJobs: [],
        europe_country: [],
        departments: [],
        consultants: [],

    }



    customImgLoader = ({ src }) => {
        return `${src}`
    }

    loadDepartment = (coutry) => {
        if (coutry === "France") {
            Axios.get("https://geo.api.gouv.fr/departements")
                .then((reponse) => {
                    setDepartments(reponse.data)
                });
        }
    }

    loadCity = (code) => {
        Axios.get(`https://geo.api.gouv.fr/departements/${code}/communes`)
            .then((reponse) => {
                villes = reponse.data
            })
    }


    deletejob = (id) => {


        if (confirm("Voulez-vous vraiment supprimer cette offre ?")) {
            if (confirm("Cette oppération est irréversible "))

                Axios.post(`${api}/deleteJob`, {

                    job_id: id

                }).then((result) => {

                    if (!result.err) {
                        window.location.reload(true)
                    } else {
                        alert("Une erreur s'est produite pendant la suppression")
                    }
                });
        }
    }





    render() {




        console.log("data of company is", this.props.data)

        return (
            <div className="recruteur">

                <div className="interface-layout">
                    <Head>
                        <title>A recruit | Recruteur</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    {/*---------------*/}
                    <Header
                    />
                    {/*---------------*/}

                    <main className="body">

                        <div className="top mbXl">
                            <div className="previewXL w100">

                                <div className=" orientationH">
                                    {!this.props.data.company_info.company_logo ?
                                        <div className="defaultLogo"><div>{this.props.data.company_info.company_name && this.props.data.company_info.company_name.charAt(0)}</div></div>
                                        :
                                        <Image alt="logo" loader={this.customImgLoader} src={this.props.data.company_info.company_logo} width={200} height={200} />
                                    }
                                    <div style={{ marginLeft: '1em' }}>
                                        <div><span>{this.props.data.company_info.company_name}</span></div>
                                        <div>{this.props.data.company_info.company_siret}</div>
                                        <div>{this.props.data.company_info.company_ape}</div>
                                        <div>{this.props.data.company_info.company_rcs}</div>
                                        <div>{this.props.data.company_info.company_headquarters}</div>
                                        <div>{this.props.data.company_info.company_address}</div>
                                        <div>{this.props.data.company_info.company_zip_code}</div>
                                        <div>{this.props.data.company_info.company_city}</div>
                                        <div>{this.props.data.company_info.company_department}</div>
                                        <div>Tel :{this.props.data.company_info.company_phone_number}</div>

                                    </div>

                                </div>
                                <br></br>
                                <div className="recrutor-consultant center">
                                    <div>
                                        <span>Mon conseiller A RECRUIT</span>
                                        <p>{this.props.data.company_info.company_consultant_name + " " + this.props.data.company_info.company_consultant_firstname}</p>

                                        <br></br>
                                        <Link href="/">
                                            <a className="center">
                                                Vers page A RECRUIT &#8594;
                                            </a>
                                        </Link>

                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* ZONE FAIRE MA DEMANDE */}
                        <div className="show_hide_layout orientationH  center demandes_link">
                            <Link href={{ pathname: "/interface/recruteur/edit", query: { companyInfo: this.props.data.company_info.company_representative_id } }}>
                                <a > <div className="button full">{"MA SOCIÉTÉ"}</div></a>
                            </Link>
                            <Link href={{ pathname: "/interface/recruteur/newjobposting", query: { by: this.props.data.company_info.company_representative_id } }}>
                                <a> <div className="button full">DEMANDE EN LIGNE</div></a>
                            </Link>
                            <Link href="/">
                                <a> <div className="button full">PRENDRE RENDEZ-VOUS AVEC UN CONSEILLER</div></a>
                            </Link>
                            <Link href={{ pathname: "/utils/fileExplorer" }}>
                                <a> <div className="button full">MES DOCUMENTS</div></a>
                            </Link>
                            {/* <Link href={{pathname:"/utils/pdf",query:{url:this.props.data.company_info.company_contrat,tobesigned:true,by: this.props.data.company_info.company_id}}}>
                                <a> <div className="button full">MES DOCUMENTS</div></a>
                            </Link> */}
                        </div>
                        <div className="bottom ">

                            {/* DEMANDE EN COURS */}
                            <WrapListLayout
                                title="DEMANDES EN COURS ..............."
                                linkForMore=""
                            >
                                {this.props.data.company_unFilledJobs.length !== 0 ? this.props.data.company_unFilledJobs.map((job, index) => {
                                    return (
                                        <div className="demande" key={index}>
                                            <div className="w100 orientationH">
                                                <div className="demande_left w100">
                                                    <label>{job.job_title}</label>
                                                    <div className="w100"><label>Crée le :</label><label>{job.created_at}</label></div>
                                                    <div className="w100"><label>Retenue  : </label>{job.job_hire}</div>
                                                </div>
                                                <div className="demande_right orientationV spaceBetween">
                                                    <img title="Modifier" src="/images/icon_edit_white.png" className="smallIcon" />
                                                    <img title="Supprimer" src="/images/icon_delete_white.png" className="smallIcon" onClick={() => { this.deletejob(job.job_id) }} />
                                                </div>

                                            </div>
                                        </div>


                                    );
                                })
                                    : <div>AUCUNE DEMANDE EN COURS</div>}
                                {this.props.data.company_unFilledJobs.length === 4 && <Link href={{ pathname: "/interface/recruteur/allJobs", query: { dest: "unfilled", company_id: this.props.data.company_info.company_representative_id } }}>
                                    <a>
                                        <div className="show_more">voir plus {">>"}</div>
                                    </a>
                                </Link>}


                            </WrapListLayout>


                            {/*MES DEMANDE*/}
                            <WrapListLayout
                                title="DERNIÈRES DEMANDES "
                                linkForMore=""
                            >
                                {this.props.data.company_fillededJobs.length !== 0 ? company_fillededJobs.map((job, index) => {
                                    return (
                                        <div className="demande" key={index}>
                                            <label>{job.job_title}</label>
                                            <div><label>Crée le :</label> {job.created_at}</div>
                                            <div><label>Retenue  : </label>{" " + job.job_hire}</div>
                                        </div>
                                    );
                                })
                                    : <div></div>}

                                <div className="demande more orientationV center">
                                    <Link href={{ pathname: "/interface/recruteur/newjobposting", query: { by: this.props.data.company_info.company_id } }}>
                                        <a className="center orientationV" >
                                            <div className="more_btn center">+</div>
                                            Ajouter un poste
                                        </a>
                                    </Link>
                                </div>
                                {this.props.data.company_fillededJobs.length === 4 && <Link href={{ pathname: "/interface/recruteur/allJobs", query: { dest: "filled", company_id: this.props.data.company_info.company_id } }}>
                                    <a>
                                        <div className="show_more">voir plus {">>"}</div>
                                    </a>
                                </Link>}
                            </WrapListLayout>

                            <BigSizeScreenNotif
                                showHide={this.props.data.show_hide3}
                                callback={() => { setShow_hide3(!show_hide3) }}
                            />
                            <div className="show_hide_layout orientationH   conseils w100">

                                <span>Conseils pratiques</span>
                                <div className="orientationH">

                                    <div className=" orientationV mr2">

                                        <Image className="" src="/images/creer_offre.jpg" width={100} height={100} />
                                        <Link href="/">
                                            <a className="a">
                                                {"Créer l'offre d'emploie"}
                                            </a>
                                        </Link>
                                    </div>

                                    <div className=" orientationV">

                                        <Image className="" src="/images/creer_presentation.jpg" width={100} height={100} />
                                        <Link href="/">
                                            <a className="a">
                                                {"Créer une présentation"}
                                            </a>
                                        </Link>
                                    </div>




                                </div>
                            </div>
                        </div>
                    </main>

                    {/*---------------*/}
                    <Footer />

                </div>
            </div>
        )
    }
}

export async function getServerSideProps({ req }) {


    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

    if (user_cookie.me) {

        const user = jwt_decode(JSON.stringify(user_cookie))

        let data = []
        let company_info = []
        let company_unFilledJobs = []
        let company_fillededJobs = []
        let company_department = []
        let europe_country = ["Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre (partie grecque)", "Croatie", "Danemark", "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas", "Pologne", "Portugal", "République tchèque", "Roumanie", "Royaume-Uni", "Slovaquie", "Slovénie", "Suède"]



        await axios.post(`${api}/getCompanyInfo`, {
            user_id: user.user_id,

        }).then((reponse) => {
            company_info = reponse.data

        })

        await axios.post(`${api}/getUnFillededJobLimit4`,
            {
                company_id: company_info.company_id
            }).then((reponse) => {
                company_unFilledJobs = reponse.data
            })

        await axios.post(`${api}/getFillededJobLimit4`,
            {
                company_id: company_info.company_id
            }).then((reponse) => {
                company_fillededJobs = reponse.data
            })

        await axios.get("https://geo.api.gouv.fr/departements")
            .then((reponse) => {
                company_department = reponse.data
            });

        ///Chargement des données régionnaux pour les formulaires

        // await axios.get("https://restcountries.eu/rest/v2/region/europe?fields=name", {
        //     europe : europe_country
        // }).then( (reponse)=>{ 
        //     europe_country=reponse.data
        // })

        data = await { ...data, company_info: company_info, company_unFilledJobs: company_unFilledJobs, company_fillededJobs: company_fillededJobs, company_department: company_department, europe_country: europe_country }

        // console.log(data)
        return {
            props: {
                data
            }
        }
    }
    return {
        redirect: {
            permanent: false,
            destination: "/auth/login?dest=recruteur",
        },
        props: { message: "redirect" },
    }


}


