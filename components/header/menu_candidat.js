import React ,{ useState,useEffect,useContext} from 'react'
import Link from 'next/link'

export default function Menu() {


    //verifier la largeur de la vue
    const [largeur,setLargeur]=useState(0);
    const [toggleMenu,setToggleMenu]=useState(false);

    /*Derouler ou fermer le menu en mode petit écran*/
    const ShowHideMenu =() =>{
        setToggleMenu(!toggleMenu);
    };
    

    useEffect(()=>{

        setLargeur(window.innerWidth);

        const changeWidth =()=>{

            setLargeur(window.innerWidth);

            if(window.innerWidth > 500){
                setToggleMenu(false);
            }
        }
        window.addEventListener('resize',changeWidth);
        return()=>{
            window.removeEventListener('resize',changeWidth);
        }
    },[])

    return (
        <>
        <div className="Menu MenuLight orientationH">

         <div className="logo">LOGO</div>

            {/*-------------- 3  barres du Menu -------------*/}
            <div className="head center ">
               
                <div className="nav-btn" onClick={ShowHideMenu}>
                    <div className="nav-btn-span"></div>
                    <div className="nav-btn-span"></div>
                    <div className="nav-btn-span"></div>
                </div>
    
               
            </div>

           
            {/*-------------- Les options du menu -------------*/}
            <nav className="center-children">
                {(largeur>500 || toggleMenu)&&(

                    <div className="items-liste center-children">
                        <div className="item center-children">
                            <Link href="/">
                                <a>
                                    ACCEUIL
                                </a>
                            </Link>
                        </div>
                        <div className="item center-children">
                            <Link href="/">
                                <a>
                                    ACCEUIL
                                </a>
                            </Link>
                        </div>
                        <div className="item center-children">
                            <Link href="/">
                                <a>
                                    ACCEUIL
                                </a>
                            </Link>
                        </div>
                        
                    </div>
                )}

            </nav>


        </div>
        <style jsx>{`
            .Menu{
                width: 100%;   
            }
            .MenuLight{
                background-color: cornflowerblue;
            }
            nav{
                width: 100%;
                min-height: 50px;
               
            }
            .items-list{
               
                width: 100%;
                position: relative;
            
            }
            .item{
                margin-right: 10px;
                color: cornsilk;
                cursor: pointer;
            }
            .item a{
                color: #fff;
                text-decoration:none;
            }
            .center-children{
                display: flex;
                justify-content: center;
                align-items: center;
            }
                 
            .clickDark{
                margin-left: calc(99% - 40px);
            
            }
            .clickLight{
                margin-left: 5px;
            }
            
            @media screen and (max-width:500px){
                
                .head{
                    top: 0;
                    width: 100%;
                    height: 50px;
                    position: absolute;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .nav-btn{
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    top: 5px;
                    right: 10px;
                
                }
                .nav-btn-span{
                
                    width: 40px;
                    height: 5px;
                    background-color: white;
                    margin: 6px 0;
                
                }
                .item{
                    height: 50px;
                    width: 100%;
                    border-bottom: 1px solid #fff;
                    line-height: 50px;
                }
               
                .items-liste{
                    width: 100%;
                    flex-direction: column;
                    
                }
                .item:nth-child(1){
                    border-top: 1px solid #fff;
                    margin-top: 50px;
                }
                
            }
        `}</style>


        </>
        
    )
}
