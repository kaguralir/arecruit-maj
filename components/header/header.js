import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ReactLocalStorage from 'reactjs-localstorage'
import jwt_decode from 'jwt-decode'
import { useCookies } from "react-cookie";
import cookie from 'cookie';

export default function Header(props) {

    const [user,setUser]=useState("");
    const [largeur,setLargeur]=useState(2000);
    const [toggleMenu,setToggleMenu]=useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["me"]);


    useEffect(() => {

        //Chargement des informations de l'utilisateur
            
        let data=cookies
        if(data.me){

            let decoded = jwt_decode(JSON.stringify(data))
            const random = Math.floor(((decoded.user_name.length+decoded.user_firstname.length)/(decoded.user_name.length*decoded.user_firstname.length))*16777215).toString(16);
            setUser({...decoded,color:'#' +random.toString(16)})
            
        }
        setLargeur(window.innerWidth);

        const changeWidth =()=>{

            setLargeur(window.innerWidth);
            
            if(window.innerWidth < 1075){

                setToggleMenu(false);
                
            }

        }
        
        window.addEventListener('resize',changeWidth);
    
        //console.log(window.location)
        
        return()=>{
            
            window.removeEventListener('resize',changeWidth);
        
        }


    }, [])


    const disconnect  = () =>{

        removeCookie('me ')
        window.location.reload(true)
    }   


    const nb_notif = 1;

    
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
                        {props.children}
                        {(largeur < 1075) &&
                            <>{user?
                                <>
                                    <li  >
                                        <Link href={"/profil/"+user.user_id+"@"+(user.user_name+"-"+user.user_firstname).replace(/\s+/g, '-').toLowerCase()}>
                                            <a>
                                                <div className="center"><PersonIcon/>&#160;Mon profile  </div>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="last" onClick={(e)=>{e.preventDefault();disconnect()}}>
                                        <Link href="/">
                                            <a>
                                                <div className="center"><PowerSettingsNewIcon/>&#160;Se deconnecter</div>          
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            :
                                <>
                                    <li  >
                                        <Link href="/">
                                            <a>
                                                <div className="center"><PersonIcon/>&#160;Se connecter  </div>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="last" onClick={(e)=>{e.preventDefault();disconnect()}}>
                                        <Link href="/">
                                            <a>
                                                <div className="center"><PowerSettingsNewIcon/>&#160;S'inscrire</div>          
                                            </a>
                                        </Link>
                                    </li>
                                </>
                            }                
                            </>

                        }
                    </>}
                </ul>
                
            </div>
            <div className="user-menu-info menu center orientationH">
                        
                <>{user&&
                    <div className="notification_z" onClick={()=>{props.callback && props.callback()}}>
                        <NotificationsIcon/>
                        <span>{nb_notif}</span>
                        
                    </div>
                }</>

                <ul>{(!user && (largeur > 1075)) &&
                    <>
                        <li >
                            <Link href="/">
                                <a>
                                    <div className="center">Se connecter  </div>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>
                                    <div className="center">S'inscrire</div>          
                                </a>
                            </Link>
                        </li>
                    </>
                }</ul>
                
                <div className="user orientationV">
                    <ul>
                        <li className="first">
                            <>{user&&
                                <a className="first">
                                    <div className="user_img" style={{backgroundColor:user.color}}>
                                        {user.img ?
                                            <img className="icon" src="/images/icon_def_usr.png" alt='noti_icon'/>
                                        :
                                            <div>{user.user_name && user.user_name.charAt(0)+ user.user_firstname.charAt(0)}</div>
                                        }
                                    </div>  
                                </a>
                            }</>
                            {(largeur > 1075) &&
                               <ul>{user?
                                    <>
                                        <li  >
                                            <Link href={"/profil/"+user.user_id+"@"+(user.user_name+"-"+user.user_firstname).replace(/\s+/g, '-').toLowerCase()}>
                                                <a>
                                                    <div className="center"><PersonIcon/>&#160;Mon profile  </div>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="last" onClick={(e)=>{e.preventDefault();disconnect()}}>
                                            <Link href="/">
                                                <a>
                                                    <div className="center"><PowerSettingsNewIcon/>&#160;Se deconnecter</div>          
                                                </a>
                                            </Link>
                                        </li>
                                    </>
                                :null
                                }                
                                </ul>
                            }
                        </li>
                    </ul>
                </div>

                {(largeur < 1075) &&
                    <div className="menu_btn" onClick={()=>{setToggleMenu(!toggleMenu)}}>&#9776;</div>
                }
            </div>
        </div>
       
    )
}
