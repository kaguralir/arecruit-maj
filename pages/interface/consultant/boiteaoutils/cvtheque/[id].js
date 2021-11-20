import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Header from "../../../../../components/header/header";
import { api } from "../../../../api/api";
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'



const details = ({ cv }) => {
    return (
        <div>
            <Head>
                <title>A recruit | CV Thèque</title>
            </Head>

            <Consultant_layout
                position="cvtheque"
            >
                <div className="cvdetail-container ">



                    <h1>Profil</h1>
                    {cv.map((val, key) => {
                        return (
                            <div id="card">
                                <div id="content2">
                                    <h1 id="title"> Ceci est le profil du candidat n°: {val.candidat_id}</h1>
                                    <p id="desc">
                                        Poste recherché :   {val.searched_job1}
                                    </p>

                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Autres postes recherchés : </h2>
                                            <p id="sub-title">{val.searched_job2}</p>
                                            <p id="sub-title">{val.searched_job3}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>

                                        <div id="info-desc">
                                            <h2 id="plan-title">Mobilité:</h2>
                                            <p id="sub-title">{val.job_location1}</p>
                                            <p id="sub-title">{val.job_location2}</p>
                                            <p id="sub-title">{val.job_location3}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Secteurs:</h2>
                                            <p id="sub-title">{val.job_field1}</p>
                                            <p id="sub-title">{val.job_field2}</p>
                                            <p id="sub-title">{val.job_field3}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Expériences:</h2>
                                            <p id="sub-title">{val.experience1}</p>
                                            <p id="sub-title">{val.experience2}</p>
                                            <p id="sub-title">{val.experience3}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Niveau d'étude:</h2>
                                            <p id="sub-title">{val.studies_level}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Dernier diplôme:</h2>
                                            <p id="sub-title">{val.last_graduation}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Disponibilité:</h2>
                                            <p id="sub-title">{val.availability_job}</p>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">CV sous forme PDF:</h2>
                                            <button className="btn--pay2">Voir</button>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Vidéo de présentation:</h2>
                                            <button className="btn--pay2">Regarder</button>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Lettre de motivation:</h2>
                                            <button className="btn--pay2">Voir</button>
                                        </div>
                                    </div>
                                    <div id="info-box">
                                        <i id="note" className="fas fa-user-alt"></i>
                                        <div id="info-desc">
                                            <h2 id="plan-title">Vidéo de motivation:</h2>
                                            <button className="btn--pay2">Voir</button>
                                        </div>
                                    </div>
                                    <button className="btn--pay">Contacter ce candidat</button>
                                </div>
                            </div>
                        );
                    })}




                </div>

            </Consultant_layout>

        </div>
    );
}

export default details;

export const getStaticPaths = async () => {
    /*     const res = await fetch(`${api}/getCVUser`);
     */
    const res = await fetch(`${api}/getCVUser`);
    const data = await res.json();

    // map data to an array of path objects with params (id)
    const paths = data.map(cv => {
        /* console.log("candidat id is ", cv.candidat_id.toString()) */
        return {
            params: { id: cv.candidat_id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}


export const getStaticProps = async (id) => {
    try {
        // console.log("params id is", context.params?.id); OK
        //console.log("id is", id.params.id); OK
        console.log("id is", id.params.id);


        const response = await axios.get(`${api}/getCVbyId/${id.params.id}`);
        /*  const response = await axios.get(`${api}/getCVbyId/${context.params?.id}`); */
        /* console.log("get static props data re", response.data); */
        console.log("data is", response.data);
        return {
            props: {
                cv: response.data
            }
        }
    } catch (e) {
        console.log(e)
        return {

            notFound: true
        }
    }
}


export async function getInitialProps({ query }) {
    return { query }
}


