import React, { useState, useEffect, Component } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import Image from 'next/image'
import { getProfilesName, getCompanyData } from '../../lib/partenaire'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { useCookies } from "react-cookie";
import jwt_decode from 'jwt-decode';
import BusinessIcon from '@material-ui/icons/Business';
import { api } from '../api/api'
import { googleapikey } from '../api/api'


const index = (props) => {

    const [cookies, setCookie, removeCookie] = useCookies(["me"]);
    //console.log(cookies)
    const state = {

        mapStyles: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative'
        },
        location: props.data.profile.company_location && JSON.parse(`${props.data.profile.company_location}`),
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {},
        admin: cookies.me && jwt_decode(JSON.stringify(cookies)).user_id === props.data.profile.company_representative_id,
        location: window.location.host.split('.')[0],
    }


    //DECLARATION
    const [company_name, setCompanyName] = useState(props.data.profile.company_name);
    const [company_history, setCompanyHistory] = useState(props.data.profile.company_history);
    const [company_logo, setCompanyLogo] = useState(props.data.profile.company_logo);
    const [company_rcs, setCompanyRcs] = useState(props.data.profile.company_rcs);
    const [company_headquarters, setCompanyHeadquarters] = useState(props.data.profile.company_headquarters);
    const [company_zip_code, setCompanyZipCode] = useState(props.data.profile.company_zip_code);
    const [company_address, setCompanyAddress] = useState(props.data.profile.company_address);
    const [company_department, setCompanyDepartment] = useState(props.data.profile.company_department);
    const [company_phone_number, setCompanyPhoneNumber] = useState(props.data.profile.company_phone_number);
    const [company_city, setCompanyCity] = useState(props.data.profile.company_city);
    const [company_country, setCompanyCountry] = useState(props.data.profile.company_country);
    const [company_SIRET, setCompanySIRET] = useState(props.data.profile.company_siret);
    const [company_APE, setCompanyAPE] = useState(props.data.profile.company_ape);
    const [company_activity, setCompanyActivity] = useState(props.data.profile.company_activity);

    const upDateCompanyInfo = (e) => {

        e.preventDefault()

        if (confirm("Ces modification seront directement visible sur votre profil . Vulez-vous continuer ?")) {


            axios.post(`${api}/updateConsultantCompanyInfo`, {
                company_id: props.data.profile.company_id,
                company_name: company_name,
                company_nationality: company_country,
                company_address: company_address,
                company_department: company_department,
                company_activity: company_activity,
                company_phone_number: company_phone_number,
                company_headquarters: company_headquarters,
                company_city: company_city,
                company_rcs: company_rcs,
                company_zip_code: company_zip_code,
                company_country: company_country,
                company_ape: company_APE,
                company_siret: company_SIRET,
                company_history: company_history,

            }).then((resutlt) => {

                if (resutlt.data) {
                    console.log(resutlt.data)
                    window.location.reload(true)
                } else {
                    alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
                }
            });
        } else {
            alert("Aucune modification éffectuée.")
        }
    }

    const loaded_file = (e) => {

        const file = e.target.files[0];

        return new Promise((resolve, reject) => {

            const reader = new FileReader();

            reader.onload = (e) => {

                let data = e.target.result

                resolve({ fileName: file.name, buffer: data });// retourne le nom du fichier chargé et le contenu sous format text base64
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);

        });
    }

    const setLogo = (e) => {
        const maxAllowedSize = 1024 * 1024;
        if (e.target.files[0].size > maxAllowedSize) {
            alert("La taille du fichier ne doit pas dépasser 1Mo")
        } else {
            setCompanyLogo(e)
        }
    }

    const changerLogo = async (e) => {

        e.preventDefault();
        if (!company_logo.target) {
            alert("Veuillez spécifier d'abord un fichier")

        } else {
            const fichier = await loaded_file(company_logo)

            axios.post(`${api}/uploadCompanyLogo`, {

                file: fichier,
                id: props.data.profile.company_id

            }).then((result) => {

                if (result.data) {
                    window.location.reload(true)

                } else {
                    alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
                }
            });
        }
    }


    const onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    const onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    const customImgLoader = ({ src }) => {
        return `${src}`
    }

    //console.log(state.admin)

    return (
        <div className="recruteur">

            <div className="interface-layout">
                <Head>
                    <title>A recruit | {props.data.profile.company_name}</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/*---------------*/}
                <Header
                />
                {/*---------------*/}

                <main className="body">

                    <div className="top">

                        <div className="title white">
                            <div>
                                {!state.admin ?
                                    <span>{props.data.profile.company_activity}</span>
                                    : <input className="profil-input white" type="texte" placeholder={props.data.profile.company_activity} onChange={(e) => { setCompanyActivity(e.target.value) }} />}
                            </div>
                            <div>
                                <br></br>
                                {!state.admin ?
                                    <span>{props.data.profile.company_name}</span>
                                    : <input className="profil-input white" type="texte" placeholder={props.data.profile.company_name} onChange={(e) => { setCompanyName(e.target.value) }} />}

                            </div>
                        </div>

                        <div className={state.admin ? " previewadmin" : "preview center orientationV"}>
                            <div><span>{props.data.profile.company_name}</span></div>
                            <br></br>
                            <div className="company_logo">
                                <label className={state.admin ? "custom-file-upload" : ""}>
                                    {state.admin &&
                                        <input type="file" onChange={(e) => { setLogo(e) }} />
                                    }
                                    {props.data.profile.company_logo ?
                                        <Image alt="company logo" loader={customImgLoader} src={props.data.profile.company_logo} width={70} height={50} />
                                        : <BusinessIcon />}
                                </label>
                                {state.admin &&
                                    <div className="button" onClick={(e) => { changerLogo(e) }}>Modifier</div>
                                }

                            </div>
                            <div className="ovale fill button">Contacter</div>
                        </div>
                    </div>
                    <div className="bottom p2em color-primary">
                        {!state.admin ?
                            <div className=" company_desc auto border">
                                {props.data.profile.company_history}
                            </div>
                            : <textarea className="profil-textarea " defaultValue={props.data.profile.company_history} onChange={(e) => { setCompanyHistory(e.target.value) }}></textarea>
                        }

                        <div className="overflowH center orientationV">
                            <div className="maps">
                                <Map
                                    google={props.google}
                                    zoom={14}
                                    style={state.mapStyles}
                                    initialCenter={state.location.pos}
                                >
                                    <Marker
                                        onClick={onMarkerClick}
                                        name={'Kenyatta International Convention Centre'}
                                    />
                                    <InfoWindow
                                        marker={state.activeMarker}
                                        visible={state.showingInfoWindow}
                                        onClose={onClose}
                                    >
                                        <div>
                                            <h4>{state.selectedPlace.name}</h4>
                                        </div>
                                    </InfoWindow>
                                </Map>
                            </div>
                            <br></br>
                            <div className="company_data ">
                                {!state.admin ?
                                    <div><span> {props.data.profile.company_name}</span></div>
                                    : <input className="profil-input-2-long" type="texte" placeholder={"Nom : " + props.data.profile.company_name} onChange={(e) => { setCompanyName(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp; {props.data.profile.company_rcs}</div>
                                    : <input className="profil-input-2-long" type="texte" placeholder={"RCS : " + props.data.profile.company_rcs} onChange={(e) => { setCompanyRcs(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_siret}</div>
                                    : <input className="profil-input-2-long" type="texte" placeholder={"SIRET : " + props.data.profile.company_siret} onChange={(e) => { setCompanySIRET(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_ape}</div>
                                    : <input className="profil-input-2-long" type="texte" placeholder={"APE : " + props.data.profile.company_ape} onChange={(e) => { setCompanyAPE(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_headquarters}</div>
                                    : <input className="profil-input-2-long" type="texte" placeholder={"Siège social : " + props.data.profile.company_headquarters} onChange={(e) => { setCompanyHeadquarters(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_country}</div>
                                    : <>
                                        <input className="profil-input-2" type="texte" list="country" placeholder={"Pays : " + props.data.profile.company_country} onChange={(e) => { setCompanyCountry(e.target.value) }} />
                                        <datalist id="country">
                                            {props.data.country.map((element, index) => {
                                                return <option key={index}>{element.name}</option>
                                            })}
                                        </datalist>
                                    </>
                                }
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_department}</div>
                                    :
                                    <>
                                        <input className="profil-input-2" type="texte" list="department" placeholder={"Departement : " + props.data.profile.company_department} onChange={(e) => { setCompanyDepartment(e.target.value) }} />
                                        <datalist id="department">
                                            {props.data.departements.map((element, index) => {
                                                return <option key={index}>{element.codeRegion + "-" + element.nom}</option>
                                            })}
                                        </datalist>
                                    </>
                                }
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_address}</div>
                                    : <input className="profil-input-2" type="texte" placeholder={"Adresse : " + props.data.profile.company_address} onChange={(e) => { setCompanyAddress(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_zip_code}</div>
                                    : <input className="profil-input-2" type="texte" placeholder={"Code postal : " + props.data.profile.company_zip_code} onChange={(e) => { setCompanyZipCode(e.target.value) }} />}
                                {!state.admin ?
                                    <div>&nbsp;{props.data.profile.company_city}</div>
                                    : <>
                                        <input className="profil-input-2" type="texte" list="ville" placeholder={"Ville : " + props.data.profile.company_city} onChange={(e) => { setCompanyCity(e.target.value) }} />
                                        <datalist id="ville">
                                            {props.data.city.map((element, index) => {
                                                return <option key={index}>{element.user_city}</option>
                                            })}
                                        </datalist>
                                    </>
                                }
                                {!state.admin ?
                                    <div>&nbsp;Tel :{props.data.profile.company_phone_number}</div>
                                    : <input className="profil-input-2" type="texte" placeholder={"Tel : " + props.data.profile.company_phone_number} onChange={(e) => { setCompanyPhoneNumber(e.target.value) }} />}

                                <br></br>
                            </div>
                        </div>
                    </div>
                </main>
                {state.admin &&
                    <>
                        <div className="profil-public-url">{state.location + "/partenaire/" + (props.data.profile.company_name).replace(/\s+/g, '-').toLowerCase()} </div>
                        <div className="pofil-publier" onClick={(e) => { upDateCompanyInfo(e) }}>Publier le profil</div>
                    </>
                }
                <Footer />


            </div>
        </div>
    )
}



export default GoogleApiWrapper({
    apiKey: googleapikey
})(index);

export async function getStaticPaths() {

    const paths = await getProfilesName()
    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {

    let data = await getCompanyData(params.id)
    //console.log(data)
    let departements = []
    let country = []
    let city = []
    await axios.get("https://geo.api.gouv.fr/departements")
        .then((reponse) => {
            departements = reponse.data
        });

    ///Chargement des données régionnaux pour les formulaires

    await axios.get("https://restcountries.eu/rest/v2/region/europe?fields=name", {
        europe: country
    }).then((reponse) => {
        country = reponse.data
    })

    await axios.post(`${api}/getCity`)
        .then((reponse) => {
            city = reponse.data
        });

    data = { ...data, departements: departements, country: country, city: city }
    //console.log(data)
    return {
        props: {
            data
        }
    }
}

export async function getInitialProps({ query }) {
    return { query }
}

