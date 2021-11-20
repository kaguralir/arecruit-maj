import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Link from 'next/link'
import DashboardIcon from '@material-ui/icons/Dashboard';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import EuroIcon from '@material-ui/icons/Euro';
import BusinessIcon from '@material-ui/icons/Business';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function index(props) {

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
            <title>A recruit | Place Affaire</title>
        </Head>

        <div className="consultant placeaffaire">
            <Header>
                {largeur<585 &&
                    <>
                        <li>
                            <Link href="/interface/consultant">
                                <a >
                                    <div className="center"><DashboardIcon/>&#160;Dashboard  </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/interface/consultant/boiteaoutils/gestionrecrutements">
                                <a>
                                    <div className="center"><HowToRegIcon/>&#160; Gestion recrutements  </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/interface/consultant/boiteaoutils/cvtheque">
                                <a >
                                    <div className="center"><FolderSharedIcon/>&#160; CVthèque </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/interface/consultant/boiteaoutils/statistiques">
                                <a >
                                    <div className="center"><EqualizerIcon/>&#160; Statistiques </div>
                                </a>
                            </Link>
                        </li>
                        <li className="menu-menu"><a><div className="center"><EuroIcon/>&#160;Gestion Comptable</div></a>
                            <ul>
                                <li><Link href="/interface/consultant/boiteaoutils/gestioncomptable/factures"><a > <div className="center"><ReceiptIcon/>&#160; Factures </div></a></Link> </li>
                                <li><Link href="/interface/consultant/boiteaoutils/gestioncomptable/compteresultat"><a > <div className="center"><EuroIcon/>&#160; Compte Résultat </div></a></Link> </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/interface/consultant/boiteaoutils/placeaffaire">
                                <a > <div className="center"><BusinessIcon/>&#160; Place affaire </div></a>
                            </Link>
                        </li>
                    </>
                }
            </Header>
            <div className="consultantBody orientationH">
                {largeur>585 &&
                    <div className="menu">

                        <ul>
                            <li>
                                <Link href="/interface/consultant">
                                    <a className={props.position==="dashboard" ? "locate" : ""}>
                                        <div><DashboardIcon/>&#160;Dashboard  </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/interface/consultant/boiteaoutils">
                                    <a  className={props.position==="gestion.recrutement" ? "locate" : ""}>
                                        <div><HowToRegIcon/>&#160; Gestion recrutements  </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/interface/consultant/boiteaoutils/cvtheque">
                                    <a className={props.position==="cvtheque" ? "locate" : ""}>
                                        <div><FolderSharedIcon/>&#160; CVthèque </div>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/interface/consultant/boiteaoutils/statistiques">
                                    <a className={props.position==="statistiques" ? "locate" : ""}>
                                        <div><EqualizerIcon/>&#160; Statistiques </div>
                                    </a>
                                </Link>
                            </li>
                            <br></br>
                            <li><div className="menu_text"><ExpandMoreIcon/>Gestion Comptable</div></li>
                            <div className="menu-menu">
                                <li><Link href="/interface/consultant/boiteaoutils/gestioncomptable/factures"><a className={props.position==="factures" ? "locate" : ""}> <div><ReceiptIcon/>&#160; Factures </div></a></Link> </li>
                                <li><Link href="/interface/consultant/boiteaoutils/gestioncomptable/compteresultat"><a className={props.position==="compte.resultat" ? "locate" : ""}> <div><EuroIcon/>&#160; Compte Résultat </div></a></Link> </li>
                            </div>
                            <br></br>
                            <li>
                                <Link href="/interface/consultant/boiteaoutils/placeaffaire">
                                    <a className={props.position==="placeaffaire" ? "locate" : ""}> <div><BusinessIcon/>&#160; Place affaire </div></a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                }

                <div className="content body w100">
                   {props.children}
                </div>
            </div>
        </div>
        
    </>
    )
}
