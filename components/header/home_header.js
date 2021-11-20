import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import ReactLocalStorage from 'reactjs-localstorage'
import jwt_decode from 'jwt-decode'



export default function Home_header(props) {


    return (
        <>
            <div className="header">
                <div>
                    <Link href="/">
                        <a>
                            <img className="h_logo" src="/images/logo.png" alt="LOGO"/>
                        </a>
                    </Link>
                </div>
               
            </div>
            <style jsx>{`

                .header{
                    background-color: transparent;
                    width: 100%;
                    height : 40px;
                    align-items: center;
                    color: #fff;
                    z-index: 3;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                }
                
                
            `}</style>
        </>
    )
}
