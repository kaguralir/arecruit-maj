import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../../../../../../components/header/header'
import Footer from '../../../../../../components/footer/footer'
import Link from 'next/link'
import Consultant_layout from '../../../../../../components/layouts/consultant_layout'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'

export default function index() {

    const [factures,setOffers]=useState([])

    useEffect(()=>{

        setOffers([{id:1,entreprise:"GCD Conseil",poste: "Attaché commercial (H/F)"},{id:2,entreprise:"GCD Conseil",poste: "Attaché commercial (H/F)"}])

    },[])
   
    
    return (
        <>
            <Head>
                <title>A recruit | Factures</title>
            </Head>

            <Consultant_layout
                position="factures"
            >
                <div className="Table">
                    <table>
                        <thead>
                            <tr>
                                <th>Entreprise</th>
                                <th>Poste</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factures.length!==0 ? factures.map((element,index)=>{
                                return(

                                    <tr key={index}>
                                        <td>{element.entreprise}</td>
                                        <td>{element.poste}</td>
                                        <td>
                                            <Link href={{pathname:"/interface/consultant/boiteaoutils/gestioncomptable/factures/facture",query:{id:element.id}}}>
                                                <a>Gérer</a>
                                            </Link>
                                        </td>
                                    
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="3" className="empty_table">Aucune donnée disponible</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
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
