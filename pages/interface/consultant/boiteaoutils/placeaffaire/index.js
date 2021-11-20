import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../../../../../components/header/header'
import Footer from '../../../../../components/footer/footer'
import Link from 'next/link'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'

export default function index() {

    const [offers,setOffers]=useState([])
    const [largeur,setLargeur]=useState(2000);
    useEffect(()=>{
        setOffers([{reference:"21-127565",intitule: "Attaché commercial (H/F)",contact : "M.PIRO "}])

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
                <title>A recruit | Place Affaire</title>
            </Head>

            <Consultant_layout
                position="placeaffaire"
            >
                <>
                    <p className="recutor_title">PLACE AFFAIRE</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Intitule</th>
                                <th>Contact</th>
                                <th colSpan="3"></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {
                                offers.map((data,index)=>{
                            
                                    return (
                                        <tr key={index}>
                                            <td >{data.reference}</td>
                                            <td >{data.intitule}</td>
                                            <td >{data.contact}</td>
                                            <td className="td">
                                                <Link href="">
                                                    <a>
                                                        <div className="view"></div>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="td">
                                                <Link href="">
                                                    <a>
                                                        <div className="print"></div>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="td">
                                                <Link href="">
                                                    <a>
                                                        <div  className="edit"></div>
                                                    </a>
                                                </Link>
                                            </td>    
                                        </tr>
                                    )
                                })
                            }
                        
                        </tbody>
                    </table>
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
