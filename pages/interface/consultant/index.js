import React, { Component } from 'react'
import Head from 'next/head'
import Header from '../../../components/header/header'
import Footer from '../../../components/footer/footer'
import Domaines from '../../../components/etiquettes/etiquette'
import Link from 'next/link'
import Image from 'next/image'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode';
import axios from 'axios'
import DashboardIcon from '@material-ui/icons/Dashboard';
import {api} from '../../api/api'


export default function Consultant({data}) {

        var state = {
            
            company:{
                
                stats:{
                    lastCa:18250,
                    in_progress:2,
                    closed:24,
                    all:26,
                    prospect:14,
                    cvs:25987
                }
            }

        }
          
        const customImgLoader = ({ src }) => {
            return `${src}`
        }


        return (
            <>
                <Head>
                    <title>A recruit | Consultant</title>
                </Head>

                <div className="consultant ">
                <Header
                >
                    <li>
                        <Link href="/interface/consultant">
                            <a className="locate">
                                <div className="center"><DashboardIcon/>&#160;Dashboard  </div>
                            </a>
                        </Link>
                    </li>
                </Header>
                    <div className="consultantBody body contentF">
                        <div className="top consultanttop">
                            
                            <div className="previewXL2 orientationH infos">
                                <div className="orientationH ">

                                    {!data.company_logo ?
                                        <div className="defaultLogo"><div>{data.company_name && data.company_name.charAt(0)}</div></div>
                                        :
                                        <Image alt="logo" loader={customImgLoader} src={data.company_logo} width={200} height={200}/>
                                    }                                
                                    <div style={{marginLeft:'1em'}}>
                                        <div><span>{data.company_name || "Nom : Non renseigné"}</span></div>
                                        <div><span>{(data.user.user_name+ " "+data.user.user_firstname)|| "Représentant : Non renseigné"}</span></div>
                                        <div>{data.company_rcs || "RCS : Non renseigné"}</div>
                                        <div>{"SIRET : "+(data.company_siret || "Non renseigné")}</div>
                                        <div>{"APE : "+(data.company_ape || "Non renseigné")}</div>
                                        <div>{" Siège social : "+(data.company_headquarters || "Non renseigné")}</div>
                                        <div>{"Adresse :" +(data.company_address || "Non renseigné")}</div>
                                        <div>{"Ville : "+(data.company_city || "Non renseigné")}</div>
                                        <div>{"Adresse : " +(data.company_zip_code || "Non renseigné")}</div>
                                        <div>{"Departement : " +(data.company_department || "Non renseigné")}</div>
                                        <div>Tel :&#160; {data.company_phone_number || "Non renseigné"}</div> 

                                    </div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>a </td>
                                            <td>b </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="light">
                                            <td>CA N-1</td>
                                            <td className="right">{state.company.stats.lastCa}€</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Dossier en cours</td>
                                            <td className="right">{state.company.stats.in_progress}</td>
                                            
                                        </tr>
                                        <tr className="light">
                                            <td>Dossiers clos</td>
                                            <td className="right">{state.company.stats.closed}</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Total dossier</td>
                                            <td className="right">{state.company.stats.all}</td>
                                            
                                        </tr>
                                        <tr className="light">
                                            <td>Prospect</td>
                                            <td className="right">{state.company.stats.prospect}</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>CV tèque</td>
                                            <td className="right">{state.company.stats.cvs}</td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                              
                            
                            </div>
                        </div>
                        <br></br>
                        <div className="title center orientationV consultant_bottom">
                            <span className="bold">{data.user.user_name+ " " + data.user.user_firstname}</span>
                            <div>Bienvenu sur votre compte collaborateur</div>
                        </div>

                        {data.mode==='demo'&&
                            <div className="demoSignal center">
                                <div>Vous êtes en mode démo et certaines fonctionnalités sont innacessibles.</div>
                            </div>
                        }
                        <div className="etiquettes">
                            <Link href="/interface/consultant/boiteaoutils">
                                <a className={data.mode}>
                                    <Domaines
                                        src="/images/tools.png"
                                        title1="Boite à outils"
                                        style={{
                                            color:'#5AAAE7'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href="/interface/consultant/formations">
                                <a className={data.mode}>
                                    <Domaines
                                        src="/images/formation.png"
                                        title1="Formations"
                                        style={{
                                            color:'#F948B4'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href="/interface/consultant/blog">
                                <a className={data.mode}>
                                    <Domaines
                                        src="/images/blog.png"
                                        title1="Blog A recruit"
                                        style={{
                                            color:'#615DF9'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href="/interface/consultant/offrespartenaires">
                                <a className={data.mode}>
                                    <Domaines
                                        src="/images/partenaires.png"
                                        title1="Offres partenaires"
                                        style={{
                                            color:'#615DF9'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href={{pathname:"/partenaire/"+(data.company_name).replace(/\s+/g, '-').toLowerCase()}}>
                                <a>
                                    <Domaines
                                        src="/images/web_app.svg"
                                        title1="Infos consultant"
                                        style={{
                                            color:'#615DF9'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href={{pathname:"/interface/consultant/cahierdescharges"}}>
                                <a>
                                    <Domaines
                                        src="/images/cahier-des-charges.png"
                                        title1="Cahier des charges"
                                        style={{
                                            color:'green'
                                        }}
                                    />
                                </a>
                            </Link>
                            <Link href={{pathname:"/interface/consultant/contrat"}}>
                                <a>
                                    <Domaines
                                        src="/images/law.png"
                                        title1="Mon contrat"
                                        style={{
                                            color:'orange'
                                        }}
                                    />
                                </a>
                            </Link>
                        </div>
                     <Footer/>
                    </div>
                </div>
            </>
        )    
}

export async function getServerSideProps({ req }) {
    
    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    
    if(user_cookie.me){

        const user = jwt_decode(JSON.stringify(user_cookie))
        let data=[]
        let mode="";

        await axios.post(`${api}/getUserAccoundFormula`,{
            id:user.user_id,
        }).then((reponse)=>{
            mode= reponse.data.account
        })  

        await axios.post(`${api}/getCompanyInfo`,{
            user_id:user.user_id,
        }).then((reponse)=>{
            data= reponse.data
        })  
        data={...data,user,mode}
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
            destination: "/auth/login?dest=consultant",
        },
        props:{message:"redirect"},
    }
}