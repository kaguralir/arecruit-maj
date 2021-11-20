import React from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import Header from '../../../../components/header/header'
import Link from 'next/link'
import DashboardIcon from '@material-ui/icons/Dashboard';

export default function index() {
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
                    <div class="progressionBar">
                        <div class="segment active"><div class="circle">1</div><div class="label">Lecture de la F.I.C</div><div class="line"></div></div>
                        <div class="segment active"><div class="circle">2</div><div class="label">Validation du contrat</div><div class="line"></div></div>
                        <div class="segment"><div class="circle">3</div><div class="label">Contrat validé</div><div class="line"></div></div>
                        <div class="segment"><div class="circle">4</div><div class="label">Mission en cours</div><div class="line"></div></div>
                        <div class="segment"><div class="circle">5</div><div class="label">Reception de la facturation</div><div class="line"></div></div>
                        <div class="segment"><div class="circle">6</div><div class="label">Facture réglée</div></div>
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
