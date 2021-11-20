import React from 'react'
import Link from 'next/link'

export default function Footer() {
    return (
        <>
        <div className="footer orientationV spaceBetween">
        <svg xmlns="http://www.w3.org/2000/svg" className="wave2" version="1.1"  width="100%" height="50" preserveAspectRatio="none" viewBox="0 0 1440 50">
            <g mask="url(&quot;#SvgjsMask1022&quot;)" fill="none">
                <path d="M 0,8 C 36,16.4 108,48.2 180,50 C 252,51.8 288,21 360,17 C 432,13 468,32.6 540,30 C 612,27.4 648,4.2 720,4 C 792,3.8 828,26.4 900,29 C 972,31.6 1008,17 1080,17 C 1152,17 1188,28 1260,29 C 1332,30 1404,23.4 1440,22L1440 50L0 50z" fill="#fff"></path>
            </g>
            <defs>
                <mask id="SvgjsMask1022">
                    <rect width="1440" height="50" fill="#ffffff"></rect>
                </mask>
            </defs>
        </svg>
            <div className="footer_links_container  orientationH spaceBetween">
                <div className="footer_link orientationV">
                    <Link href="/interface/consultant">
                        <a>Je suis consultant</a>
                    </Link>
                    <Link href="/">
                        <a>Lien 1</a>
                    </Link>
                    <Link href="/">
                        <a>Lien 1</a>
                    </Link>
                    
                </div>
                <div className="footer_link orientationV">
                    <Link href="/">
                        <a>Lien 1</a>
                    </Link>
                    <Link href="/">
                        <a>Lien 1</a>
                    </Link>
                    <Link href="/">
                        <a>Lien 1</a>
                    </Link>
                    
                </div>
                <div className="footer_sociaux">
                    <div>Nous suivre sur les réseaux siciaux ? 👇👇👇</div>
                    <div className=" orientationH">
                                <Link href="/">
                                    <a>
                                        <div className="instagrame"></div>
                                    </a>
                                </Link>

                                <Link href="/">
                                    <a>
                                        <div className="twitter"></div>
                                    </a>
                                </Link>

                                <Link href="/">
                                    <a>
                                        <div className="facebook"></div>
                                    </a>
                                </Link>

                                <Link href="/">
                                    <a>
                                        <div className="linkedin"></div>
                                    </a>
                                </Link>
                    </div>
                </div>
            </div>

            <p className="center">© 2021 A-Recruit / Tous droits réservés</p>

            <style jsx>{`
            
                    .footer{
                        
                        width:100%;
                        height: max-content;
                        min-height: 150px;
                        background-color: var(--color-primary-light);
                        color: #fff;
                       
                    }

                    .footer_links_container{
                        padding: 1em;
                    }
                    .footer_link a{
                        color: #fff;

                    }

                    .footer_sociaux{
                        width:200px;
                    }

                    .instagrame,.twitter,.facebook,.linkedin{
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 30px;
                        margin-top: 1em;
                        width: 40px;
                        height: 40px;
                    }

                    .instagrame{
                        
                        background-image: url("/images/instagrame.png");
                    }
                    .twitter{
                        
                        background-image: url("/images/twitter.png");
                    }
                    .facebook{
                        
                        background-image: url("/images/facebook.png");
                    }
                    .linkedin{
                        
                        background-image: url("/images/linkedin.png");
                    }

                    .copyrigght{
                        margin: 0.5em;
                        width: 100%;
                    }
                    @media screen and (max-width:500px){

                        .footer_links_container{
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                        }
                    }
            `}</style>

        </div>
        </>
    )
}
