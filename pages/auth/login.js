import { useState } from 'react';
import Axios from 'axios'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import {api} from '../api/api'
import {useCookies} from 'react-cookie';


export default function Connect({dest}) {

    let token = ""
    const [isConnecting,setIsConnecting]=useState(false)
    const [user_email,setUserEmail]=useState(false);
    const [user_password,setUserpassword]=useState(false);
    const [alert,setAlert]=useState(false);
    const [cookie, setCookie] = useCookies(["me"])

    const connexion = (e)=>{

        e.preventDefault()
        setIsConnecting(true)
        if(!user_email || !user_password){

            setAlert(" Veuillez remplir tous les champs pour vous inscrire")
        }else{

           Axios.post(`${api}/login`,{

                user_email:user_email,
                user_password:user_password,
               // right:dest

            },
            {
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer${token}` //Renvoi du token par l'api en cas d'authentification
            }
                
            }).then(result=>{

                if(!result.data.err){

                    setCookie("me", JSON.stringify(result.data), {
                        path: "/",
                        maxAge: 3600, // Expires after 1hr
                        sameSite: true,
                    })

                    window.location.href =`../interface/${dest}`;
               
                }else {
                    setAlert("Identifiants et / ou  mot de passe incorrects")
                }
            });
        }

       
        
    }
   
    return (
        <>
            <Head>
                <title>Connection a-recruit</title>
            </Head>

            <main className="login_signin_background center orientationV">


                    <div className="login-root">

                        <div className="box-root flex-flex flex-direction--column style1" >

                            <div className="box-root flex-flex flex-direction--column ">
                            
                                <div className="formbg-outer">
                                <div className="formbg">
                                    <div className="formbg-inner padding-horizontal--48">
                                        <h3 className="color-p padding-bottom--15">Connexion</h3>
                                        <div className="alert" className="alert">{alert && alert}</div>
                                        <form id="stripe-login">
                                            <div className="field padding-bottom--24">
                                                <label className="color-p">Email</label>
                                                <input type="email" name="email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                                            </div>
                                            <div className="field padding-bottom--24">
                                                <div className="grid--50-50">
                                                    <label className="color-p">Mot de passe</label>
                                                    <div className="reset-pass">
                                                        <a href="#">Mot de passe oublié ?</a>
                                                    </div>
                                                </div>
                                                <input type="password" name="password" onChange={(e)=>{setUserpassword(e.target.value)}}/>
                                            </div>
                                                <div className="field field-checkbox padding-bottom--24 flex-flex align-center">
                                                    <label className="color-p">
                                                        <input type="checkbox" name="checkbox"/> Rester connecter
                                                    </label>
                                                </div>
                                            <div className="field padding-bottom--24">
                                                <div className="button" >
                                                    <input type="submit" value={!isConnecting?"Continuer":"Connexion en cours ..." }onClick={(e)=>{connexion(e)}}/>
                                                </div>
                                            </div>
        
                                        </form>
                                    </div>
                                </div>
                                <div className="footer-link padding-top--24">
                                    <span>Pas encore de compte chez nous ?<Link href={{pathname :"/authentification/inscription",query:{dest:dest}}}><a> S'inscrire</a></Link></span>
                                    <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                    <span><Link href="/authentification/inscription"><a> © A recruite</a></Link></span>
                                    <span><Link href="/authentification/inscription"><a> Contacte</a></Link></span>
                                    <span><Link href="/authentification/inscription"><a> Politique de confidentialité</a></Link></span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </main>
           
        </>
    );
}

export const getServerSideProps = async ({query}) => {
    const dest = query.dest;
    return {
       props: { dest }
    }
}