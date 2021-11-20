import React,{useState} from 'react'
import Notification from './notification'

export default function bigSizeScreenNotif(props) {
    
    return (
        <>
            {props.showHide &&
            
                <div className="bigSizeNotif">
                    <div>
                        <Notification
                            text=" Soyez les bienvenue !!! A-RECRUIT vous souhaite la bienvenue dans son vaste réseau . Nous nous engageons à faire de votre satisfaction notre pierre angulaire. "
                            date="Hier à 21:47"
                        />
                        <Notification
                            text=" Soyez les bienvenue !!! A-RECRUIT vous souhaite la bienvenue dans son vaste réseau . Nous nous engageons à faire de votre satisfaction notre pierre angulaire."
                            date="Hier à 21:47"
                        />
                        <div className="center font-small">© A-RECRUIT</div>
                    </div>
                    
                </div>
            }
            <style jsx>
                {`
                    .bigSizeNotif{

                        color: #3c4257;
                        width: 70vw;
                        max-width: 350px;
                        background-color: #fff;
                        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                        border-radius: 3px;
                        position:absolute;
                        right: 10px;
                        top: 40px;
                     
                    }

                    .notif_head{
                        padding: 2em;
                        padding-bottom: 0em;
                    }

                    .close{
                        cursor:pointer;
                    }

                    @keyframes slidein {
                        
                        from {
                          height: 10%;
                        }
                      
                        to {
                          height: 50vw;
                        }
                    }

                    @media screen and (max-width:500px){

                        .bigSizeNotif{
                            width: 100vw;
                        }

                        @keyframes slidein {
                            from {
                              width: 0%;
                            }
                          
                            to {
                              width: 100vw;
                            }
                        }
                    }

                  
                `}
            </style>
        </>
    )
}
