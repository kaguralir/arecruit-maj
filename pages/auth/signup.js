import {useState,useEffect} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Axios from 'axios'
import {useRouter} from 'next/router'
import {api} from '../api/api'
import {useCookies} from 'react-cookie';



export default function inscription({dest}) {
    
    const router=useRouter();//donne la personne qui veut s'inscrire 
    var token = ""

    const [user_name,setUserName]=useState(false);
    const [user_firstname,setUserFirstName]=useState(false);
    const [user_email,setUserEmail]=useState(false);
    const [user_password1,setUserpassword1]=useState(false);
    const [user_password2,setUserpassword2]=useState(false);
    const [user_right,setUserRight]=useState(dest);
    const [alert,setAlert]=useState(false);
    const [cookie, setCookie] = useCookies(["me"])

   

    const inscription = (e)=>{

        e.preventDefault()
        if(user_password1 !== user_password2){

            setAlert("Le mot de pass n'est pas identique")
            
        }else if(!user_name || !user_firstname || !user_email || !user_password1 || !user_password2){

            setAlert(" Veuillez remplir tous les champs pour vous inscrire")
        }else{

           Axios.post(`${api}/signup`,{
                
                user_name:user_name,
                user_firstname:user_firstname,
                user_email:user_email,
                user_password:user_password1,
                user_right:user_right

            },
            {
                headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer${token}` //Renvoi du token par l'api en cas d'authentification
            } 
            }).then((result)=>{

                console.log(result)
                
                if(!result.data.err){

                    //console.log(result.data)

                    if(router.query.dest==="recruteur"){

                        Axios.post(`${api}/createCompany`,{//creer une centreprise à son nom

                            user_id:result.data.user_info.user_id

                        });
                    }

                    //creer unser_info
                    Axios.post(`${api}/createUserInfo`,{//creer une centreprise à son nom

                            user_id:result.data.user_info.user_id

                    });


                    setCookie("me", JSON.stringify(result.data.jwt), {
                        path: "/",
                        maxAge: 3600, // Expires after 1hr
                        sameSite: true,
                    })

                    window.location.href = `${router.query.dest}`

                }else {
                     setAlert("Deja inscrit")
                }
            });
        }
        
    }

   
    
    return (

        <>
            <Head>
                <title>Inscription a-recruit</title>
            </Head>

            <main className="login_signin_background center orientationV">

                <div className="login-root">

                    <div className="box-root flex-flex flex-direction--column style1" >

                        <div className="box-root flex-flex flex-direction--column style14">
                            <div className="left"></div>
                            <div className="formbg-outer">
                            <div className="formbg">
                                <div className="formbg-inner padding-horizontal--48">
                                    <h3 className="padding-bottom--15 color-p">Inscription</h3>
                                    <div className="alert" className="alert">{alert && alert}</div>
                                    <form id="stripe-login">
                                    <div className="row">
                                            <div className="mb-3 col">
                                                <label  className="form-label color-p">Nom</label>
                                                <input id="inputName" type="text" className="form-control inputs" name="nom" placeholder="Nom"  required onChange={(e)=>{setUserName(e.target.value)}}/>
                                                <div id="dangerAlert"className="form-text"></div>
                                            </div>
                                            <div className="mb-3 col">
                                                <label  className="form-label color-p">Prénom</label>
                                                <input type="text" className="form-control inputs" name="nom" placeholder="Prénom"  required onChange={(e)=>{setUserFirstName(e.target.value)}}/>
                                                <div className="form-text"></div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col">
                                                <label  className="form-label color-p">e-mail</label>
                                                <input type="email" className="form-control inputs" name="email" placeholder="e-mail"  required onChange={(e)=>{setUserEmail(e.target.value)}}/>
                                                <div className="form-text"></div>
                                            </div>
                                            </div>
                                            <div className="row">
                                            <div className="col mb-3">
                                                <label className="col-form-label color-p">Mot de passe</label>
                                                <div className="col">
                                                    <input type="password" name="password" className="form-control" placeholder="Mot de passe"  onChange={(e)=>{setUserpassword1(e.target.value)}}/>
                                                </div>
                                            </div>
                                            <div className="col mb-3">
                                                <label className="col-form-label color-p">Confirmation</label>
                                                <div className="col">
                                                    <input type="password" name="passwordConfirm" className="form-control" placeholder="Confirmez mot de passe"  onChange={(e)=>{setUserpassword2(e.target.value)}}/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="field padding-bottom--24">
                                            <div className="button"   onClick={(e)=>{inscription(e)}}>S'inscrire</div>
                                        </div>
        
                                    </form>
                                </div>
                            </div>
                            <div className="footer-link padding-top--24">
                                <span>Vous avez déja un compte ?<Link href={{pathname :"/authentification/connexion",query:{dest:dest}}}><a> Se connecter</a></Link></span>
                                <div className="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                                <span><Link href="/inscription"><a> © A recruite</a></Link></span>
                                <span><Link href="/inscription"><a> Contacte</a></Link></span>
                                <span><Link href="/inscription"><a> Politique de confidentialité</a></Link></span>
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