import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import CA_vs_CA from './can_vs_can-1'
import CA_vs_poste from './ca_vs_poste'
import CA_vs_activite from './ca_vs_activite'
import CA_vs_collaborateurs from './ca_vs_collaborateurs'
import CA_vs_masseSalarial from './ca_vs_masseSalarial'
import TauxReussite from './tauxReussite'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'

export default function statistiques() {

    const [chart,setChart]=useState("ca_vs_ca")
    const [largeur,setLargeur]=useState(2000);
    useEffect(()=>{

        setLargeur(window.innerWidth);

        const changeWidth =()=>{

            setLargeur(window.innerWidth);
            
        }
        
        window.addEventListener('resize',changeWidth);
    
        //console.log(largeur)
        
        return()=>{
        
            window.removeEventListener('resize',changeWidth);
        
        }
    })
    
    return (
        <>
            <Head>
                <title>A recruit | Statistiques</title>
            </Head>

            <Consultant_layout
                position="statistiques"
            >
                <>
                            
                    <div className="chart">
                    <p className="consultant_title">ESPACE STATISTIQUES</p>
                        <>
                            <div className="select">
                            <select onChange={(e)=>{setChart(e.target.value)}}>
                                <option value="ca_vs_ca">CA N VS CA N-1</option>
                                <option value="ca_vs_collaborateur">CA/Collaborateur</option>
                                <option value="taux_reussite">Taux de réussite</option>
                                <option value="ca_poste">CA/Poste</option>
                                <option value="ca_vs_activite">CA/Activité</option>
                                <option value="ca_vs_masse_salariale">CA/Masse salariale client</option>
                            </select>
                            </div>
                            <>
                            {    chart==="ca_vs_ca"?
                                    <CA_vs_CA/>
                                :chart==="ca_vs_collaborateur"?
                                    <CA_vs_collaborateurs/>
                                :chart==="taux_reussite"?
                                    <TauxReussite/>
                                :chart==="ca_poste"?
                                    <CA_vs_poste/>
                                :chart==="ca_vs_activite"?
                                    <CA_vs_activite/>
                                :chart==="ca_vs_masse_salariale"?
                                    <CA_vs_masseSalarial/>
                                :null}
                            </>
                        
                        </>
                       
                    </div>
                </> 
            </Consultant_layout>
            
        </>
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
            destination: "/auth/login?dest=consultant/boiteaoutils",
        },
        props:{message:"redirect"},
    }
}

