import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../../../../components/header/header'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function index() {

    const [offers,setOffers]=useState([])
    useEffect(()=>{
        setOffers([{nom:"ANTS",intitule: "Attaché commercial (H/F)",periode : "Du 14/07/21 au 15/08/21 "}])
    },[])

     
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    const partner =[
        {id:1,logo:"/images/partner/partner_boursorama.png"},
        {id:2,logo:"/images/partner/partner_algeco.png"},
        {id:3,logo:"/images/partner/partner_audi.svg"},
        {id:4,logo:"/images/partner/partner_ferrari.jpeg"},
        {id:5,logo:"/images/partner/partner_carrefour.png"},
        {id:6,logo:"/images/partner/partner_parions.png"}
    ]

    return (
        <>
        <Head>
            <title>A recruit | Ofres partenaires</title>
        </Head>

        <div className="placeaffaire">
            <Header>
                <li>
                    <Link href="/interface/consultant">
                        <a className="locate">
                            Dashboard
                        </a>
                    </Link>
                </li>
            </Header>
            <div className="body">

                <p className="recutor_title">OFFRES PARTENAIRE</p>
               
                <Carousel 
                    responsive={responsive} 
                    autoPlay={true}
                    itemClass="partenaires"
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                >
                    {
                        partner.map((data,index)=>{
                            
                            return (
                                <Link href="#">
                                    <a>
                                        <Image key={index} src={data.logo} layout="fill"/>
                                    </a>
                                </Link>
                            )
                        })   
                    }
                </Carousel>
 
                <div className="w100">      
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Intitule</th>
                                <th>Periode</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {
                                offers.map((data,index)=>{
                            
                                    return (
                                        <tr key={index}>
                                            <td >{data.nom}</td>
                                            <td >{data.intitule}</td>
                                            <td >{data.periode}</td>
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
                                            
                                        </tr>
                                    )
                                })
                            }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </>
    )
}
