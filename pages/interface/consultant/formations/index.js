import React ,{useState,useEffect} from 'react'
import Head from 'next/head'
import Header from '../../../../components/header/header'
import Link from 'next/link'
import Image from 'next/image'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import DashboardIcon from '@material-ui/icons/Dashboard';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';


export default function index() {

    const [training,setOffers]=useState([])
    const [trainingsPerPage, setCurrentTrainingsPerPage] = useState([]);
    const [filter,setFilter]=useState("")
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [largeur,setLargeur]=useState(2000);
    const pages = [];
    
    let pageIncrementBtn = null;
    let pageDecrementBtn = null;
    
    const filterResults = (results, query) => {

        //console.log(results)
        if (!query) {
            return [];
        }
    
        return results.filter((result) => {
            const postName = (result.name+result.description).toLowerCase();
            return postName.includes(query.toLowerCase());
        });

    };

    for (let i = 1; i <= Math.ceil(training.length / itemsPerPage); i++) {
        pages.push(i);
    }
    
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const generateBackgroundColor=()=>{
        
        let rgb = []
        for (var i = 0; i < 3; i++) {
            let r = Math.floor(Math.random() * 256)
            rgb.push(r)
        }
        var styles = {
            backgroundColor: `rgb(${rgb})`,
        };
        return styles;
    }

    const renderPageData = training.slice(((currentPage-1)*(largeur/300)),((currentPage)*(largeur/300))).map((data,index)=>{
                            
        return (

            <div className="square center orientationV " style={generateBackgroundColor()} key={index}>
                <div>
                    <img className="img" src={data.image}></img>
                    <h1 className="title">{data.name}</h1>
                    <p className="description"> {data.description}</p>
                </div>
                <div className="w90 spaceBetween"><OndemandVideoIcon/><PictureAsPdfIcon/><MusicVideoIcon/></div>
            </div>    

        )
    });

    const renderPageNumbers = pages.map((number) => { 
        return (
          <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage == number ? "active" : null}
          >
            {number}
          </li>
        );
      
    });
    
    const handleNextbtn = () => {

      setcurrentPage((currentPage + 1));
  
      if (currentPage + 1 > maxPageNumberLimit) {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }

    };
  
    const handlePrevbtn = () => {

      setcurrentPage((currentPage - 1));
  
      if ((currentPage - 1) % pageNumberLimit == 0) {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
      
    };

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };
      
 

    useEffect(()=>{

        setOffers([
            {   
                id:1,
                name:"ANTS 1",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyNtCM2SBewRilvmRiBDM5uPsXV7jb6KeBw&usqp=CAU",
                description : "Sunset"
            },
            {
                id:2,
                name:"ANTS 2",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfz_jbmtzuug4-gUakzS8tvMlSyHT0Z6PgQ&usqp=CAU",
                description : "Night"
            },{   
                id:3,
                name:"ANTS 3",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfyNtCM2SBewRilvmRiBDM5uPsXV7jb6KeBw&usqp=CAU",
                description : "Sunset"
            },
            {
                id:4,
                name:"ANTS 4",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfz_jbmtzuug4-gUakzS8tvMlSyHT0Z6PgQ&usqp=CAU",
                description : "Night"
            }
        ])

        setLargeur(window.innerWidth);
        setitemsPerPage((window.innerWidth/300))

        const changeWidth =()=>{

            setLargeur(window.innerWidth);
            setitemsPerPage((window.innerWidth/300))
            setcurrentPage(1)
        }
        
        window.addEventListener('resize',changeWidth);
    
        //console.log(largeur)
        
        return()=>{
        
            window.removeEventListener('resize',changeWidth);
        
        }

    },[])


    const filteredResult = filterResults(training,filter);


    return (
        <div className="">
        <Head>
            <title>A recruit | Formations</title>
        </Head>

        <div className="consultant">
            <Header>
                <li>
                    <Link href="/interface/consultant">
                        <a className="locate">
                            <div className="center"><DashboardIcon/>&#160;Dashboard  </div>
                        </a>
                    </Link>
                </li>
            </Header>
            <div className="consultantBody">
                <div className="body formation-body">

                    <div className="search_bar w100">
                        <br></br>
                        <p className="recutor_title">FORMATIONS</p>
                        <form onSubmit={(e)=>{e.preventDefault();}} role="search" className="w100">
                            <input className="w100" id="search" type="search" placeholder="Rechercher une formation ..." autoFocus autoComplete="off" required onChange={(e)=>{setFilter(e.target.value)}}/>
                        </form>
                        <ul>
                            {filteredResult.map((result) => (
                                <li key={result.id} className="result">
                                    <Link href="/interface/consultant/boiteaoutils/gestionrecrutements/employeur">
                                        <a>
                                            <div className="url">
                                                {result.name+ " ( " + result.origin+" ) "}
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="Formations">
                        <div className="training">                      
                            {renderPageData}
                        </div>
                    </div>
                    <div className="pageNumbers">
                        <ul >
                            <li>
                                <button
                                    onClick={handlePrevbtn}
                                    disabled={currentPage == pages[0] ? true : false}
                                >
                                    Prev
                                </button>
                            </li>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            <li>
                                <button
                                    onClick={handleNextbtn}
                                    disabled={currentPage == pages[pages.length - 1] ? true : false}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div> 
    </div>
    )
}

export async function getServerSideProps({ req }) {
    
    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    
    if(user_cookie.me){
        
        let data=[]
        
        //console.log(data)

        return {
            props: {
                data
            }
        }
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth/login?dest=consultant/formations",
        },
        props:{message:"redirect"},
    }
}
