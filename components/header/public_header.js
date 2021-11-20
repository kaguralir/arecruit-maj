import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import ReactLocalStorage from 'reactjs-localstorage'
import jwt_decode from 'jwt-decode'



export default function Header(props) {

    const [user,setUser]=useState("");
    const [largeur,setLargeur]=useState(2000);
    const [toggleMenu,setToggleMenu]=useState(false);


    useEffect(() => {

            //Verification de la taille de l'écran
            setLargeur(window.innerWidth);

            const changeWidth =()=>{

                setLargeur(window.innerWidth);
                
                if(window.innerWidth < 1075){
                    setToggleMenu(false);
                }
            }
            window.addEventListener('resize',changeWidth);
        //console.log(largeur)
        return()=>{
            window.removeEventListener('resize',changeWidth);
        }


    }, [])

    
    return (
           <div role="navigation" className=" header ">
                <div className="menu">

                    <ul>
                        <li className="a_logo first">
                            <Link href="/" className="first">
                                <a className="first">
                                    <img className="h_logo" src="/images/A_Recruit.jpg" alt="LOGO"/>
                                </a>
                            </Link>
                        </li>
                        { (toggleMenu || largeur > 1075) && <>
                        
                            {(largeur < 1075) &&
                                <>                  
                                    <li  >
                                        <Link href="/auth/signup">
                                            <a>
                                            S'inscrire
                                            </a>
                                        </Link>
                                    </li>
                                    <li onClick={(e)=>{e.preventDefault();disconnect()}}>
                                        <Link href="/auth/login">
                                            <a>
                                                Se connecter
                                            </a>
                                        </Link>
                                    </li>
                                </>

                            }
                        </>}
                    </ul>
                    
                </div>

                <div className="user-menu-info menu center orientationH">
                    {(largeur > 1075) &&
                        <ul>
                            
                                <li  >
                                    <Link href="/auth/signup">
                                        <a>
                                        S'inscrire
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={(e)=>{e.preventDefault();disconnect()}}>
                                    <Link href="/auth/login">
                                        <a>
                                            Se connecter
                                        </a>
                                    </Link>
                                </li>
                            
                        </ul>
                    }
                    {(largeur < 1075) &&
                        <div className="menu_btn" onClick={()=>{setToggleMenu(!toggleMenu)}}>&#9776;</div>
                    }
                </div>
            </div>
       
    )
}
