import React from 'react'
import Link from 'next/link'

export default function animated_button(props) {
    return (
        <div>
            <Link href={props.link}>
                <a>
                    <button>
                    {props.text}
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    </button>
                </a>
            </Link>
            <style jsx>{`
                
                button{
                    width:90%;
                    height:40px;
                    background: linear-gradient(to left top, #106cdd 50%, #106ccc 50%);
                    border-style: none;
                    color:#fff;
                    font-size: 0.7em;
                    padding-left:2em;
                    padding-right:2em;
                    font-weight: 600;
                    outline: none;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all .5s;
                    box-shadow: 0px 1px 2px rgba(0,0,0,.2);
                    transform: skewX(-15deg);
                    margin:1em;
                }
                button span{
                    position: absolute;
                    display: block;
                }
                button span:nth-child(1){
                    height: 3px;
                    width:200px;
                    top:0px;
                    left:-200px;
                    background: linear-gradient(to right, rgba(0,0,0,0), #fff);
                    border-top-right-radius: 1px;
                    border-bottom-right-radius: 1px;
                    animation: span1 2s linear infinite;
                    animation-delay: 1s;
                }

                @keyframes span1{
                    0%{
                        left:-200px
                    }
                    100%{
                        left:200px;
                    }
                }
                button span:nth-child(2){
                    height: 70px;
                    width: 3px;
                    top:-70px;
                    right:0px;
                    background: linear-gradient(to bottom, rgba(0,0,0,0), #fff);
                    border-bottom-left-radius: 1px;
                    border-bottom-right-radius: 1px;
                    animation: span2 2s linear infinite;
                    animation-delay: 2s;
                }
                @keyframes span2{
                    0%{
                        top:-70px;
                    }
                    100%{
                        top:70px;
                    }
                }
                button span:nth-child(3){
                    height:3px;
                    width:200px;
                    right:-200px;
                    bottom: 0px;
                    background: linear-gradient(to left, rgba(0,0,0,0), #fff);
                    border-top-left-radius: 1px;
                    border-bottom-left-radius: 1px;
                    animation: span3 2s linear infinite;
                    animation-delay: 3s;
                }
                @keyframes span3{
                    0%{
                        right:-200px;
                    }
                    100%{
                        right: 200px;
                    }
                }

                button span:nth-child(4){
                    height:70px;
                    width:3px;
                    bottom:-70px;
                    left:0px;
                    background: linear-gradient(to top, rgba(0,0,0,0), #fff);
                    border-top-right-radius: 1px;
                    border-top-left-radius: 1px;
                    animation: span4 2s linear infinite;
                    animation-delay: 4s;
                }
                @keyframes span4{
                    0%{
                        bottom: -70px;
                    }
                    100%{
                        bottom:70px;
                    }
                }

                button:hover{
                    background: linear-gradient(to left, rgba(0,0,0,0), #fff);
                    color:#106cdd;
                    -webkit-text-stroke: 0.1px #fff;
                }
                button:hover span{
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}

