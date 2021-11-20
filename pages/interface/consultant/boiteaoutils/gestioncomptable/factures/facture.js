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
                <Link href="/interface/consultant/boiteaoutils/gestioncomptable/factures">
                    <a>
                        <div>Retour</div>
                    </a>
                </Link>
                <div className="facture">
                    <header>
                        <h1>FACTURE</h1>
                        <h2>José Roux − Interactive Design</h2>
                    </header>
                    <section>
                        <dl>
                            <dt>Facture #</dt>
                            <dd>20140603</dd>
                            <dt> Date de facturation</dt>
                            <dd>03.06.2014</dd>
                        </dl>
                    </section>
                    <section>
                        <dl>
                            <dt>Facturé à:</dt>
                            <dd>
                                Company X &amp; Son Inc.<br></br>
                                2789 Some street,<br></br>
                                Big City, Québec, J3X 1J1
                            </dd>
                            <dl>
                                <dt>Attn</dt>
                                <dd>Le Big Boss</dd>
                                <dt>Téléphone</dt>
                                <dd>(450) 555-2663</dd>
                                <dt>Courriel</dt>
                                <dd>bigboss@bigcompanylonglongemail.com</dd>
                            </dl>
                        </dl>
                        <dl>
                            <dt>Description de service:</dt>
                            <dd>Développement AIR</dd>
                            <dt>Période totale:</dt>
                            <dd>24 Mai au 2 Juin 2014</dd>
                        </dl>
                    </section>
                    <table>
                        <thead>
                            <tr>
                                <th>Période</th>
                                <th>Description</th>
                                <th>Heures</th>
                                <th>Taux</th>
                                <th>Montant</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>24 Mai au 2 Juin</td>
                                <td>Dévelopement du jeu Tomatina</td>
                                <td>24&#8202;h</td>
                                <td>20&#8202;$/h</td>
                                <td>480&#8202;$</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3">− Faire les chèques payable au nom de moi −</td>
                                <td>Total</td>
                                <td>480&#8202;$</td>
                            </tr>
                        </tfoot>
                    </table>
                    <footer>
                        <p>Moi – Informatique − Développement WEB | <a href="http://joseroux.com">joseroux.com</a></p>
                        <p>1777 some street in the woods, Wentworth-Nord, Qc, J0T 1Y0 | Tél. 450-555-1000 | <a href="mailto:mail@me.com">mail@me.com</a></p>
                    </footer>

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
