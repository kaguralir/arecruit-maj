import React,{useState} from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import Header from '../../../../../components/header/header'
import Link from 'next/link'
import DashboardIcon from '@material-ui/icons/Dashboard';


import Fic from '../../../../../components/contrat/fic'
import MissionAgility from '../../../../../components/contrat/mission-agility'

export default function index() {

    const [progress,setProgress]=useState(1)

    return (
        <div>
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
                    <div className="contrat-view">
                        <div className="contrat-view-slides">
                            <div class="progressionBar">
                                <div class={"segment "+(progress>=1 && "active")}><div class="circle">1</div><div class="label">F.I.C</div><div class="line"></div></div>
                                <div class={"segment "+(progress>=2 && "active")}><div class="circle">2</div><div class="label">Type de Contrat</div><div class="line"></div></div>
                                <div class={"segment "+(progress>=3 && "active")}><div class="circle">3</div><div class="label">Contrat</div><div class="line"></div></div>
                                <div class={"segment "+(progress>=4 && "active")}><div class="circle">4</div><div class="label">Signature</div><div class="line"></div></div>
                                <div class={"segment "+(progress>=5 && "active")}><div class="circle">5</div><div class="label">Fiche navette</div><div class="line"></div></div>
                                <div class={"segment "+(progress>=6 && "active")}><div class="circle">6</div><div class="label">Facture réglée</div></div>
                            </div>
                            <div className="contrat-step">
                                {progress===1?
                                    <Fic/>
                                :progress===2?
                                    <MissionAgility/>
                                :null}
                            </div>

                        </div>

                        <div className="contrat-action">
                            {progress == 2 &&
                                <select>
                                    <option>Agility</option>
                                    <option>Simplicity</option>
                                    <option>Exclusivity</option>
                                </select>
                             
                            }
                            <div className="button" onClick={(e)=>{(progress > 1 )? setProgress(progress-1):null}}>Retour</div>
                            <div className="button" onClick={(e)=>setProgress(progress+1)}>Envoyer et Suivant</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export async function getServerSideProps({ req }) {
    
    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    
    if(user_cookie.me){
        
        let data=[]
        
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
            destination: "/auth/login?dest=consultant/contrat",
        },
        props:{message:"redirect"},
    }
}
