import React, { useState, useEffect } from 'react'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Head from 'next/head'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import emailjs from 'emailjs-com'
import Link from 'next/link'
import { Doughnut } from 'react-chartjs-2';
import Consultant_layout from '../../../../components/layouts/consultant_layout'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { api } from '../../../api/api'
import { Info } from '@material-ui/icons'


export default function gestionrecrutements({ data }) {

    const [filter, setFilter] = useState("")
    const [alertPositif, setAlertPositif] = useState(false)
    const [alertNegatif, setAlertNegatif] = useState(false)
    const [largeur, setLargeur] = useState(2000);
    const [newProspect, setNewProspect] = useState(false)
    const [newCandidat, setNewCandidat] = useState(false)

    let state = {
        labels: [
            'Prospect',
            'Candidat',
            'Employeur'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [
                data.data.filter(info => info.origin.includes('Prospect')).length,
                data.data.filter(info => info.origin.includes('Candidat')).length,
                data.data.filter(info => info.origin.includes('Recruteur')).length,
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }


    useEffect(() => {

        setLargeur(window.innerWidth);

        const changeWidth = () => {

            setLargeur(window.innerWidth);

        }

        window.addEventListener('resize', changeWidth);

        //console.log(largeur)

        return () => {

            window.removeEventListener('resize', changeWidth);

        }
    })

    const filterResults = (results, query) => {

        //console.log(results)
        if (!query) {
            return [];
        }

        return results.filter((result) => {
            const postName = result.name.toLowerCase();
            return postName.includes(query.toLowerCase());
        });

    };

    const filteredResult = filterResults(data.data, filter);
    //
    const [candidat_name, setcandidatName] = useState(false);
    const [candidat_firstname, setcandidatFirstName] = useState(false);
    const [candidat_email, setcandidatEmail] = useState(false);
    const [candidatPhoneNumber, setcandidatPhoneNumber] = useState(false);
    const [candidatAddress, setCandidatAddress] = useState(false);
    const [candidatCountry, setCandidatCountry] = useState(false);
    const [candidatDepartment, setCandidatDepartment] = useState(false);
    const [candidatCity, setCandidatCity] = useState(false);
    const [candidatZipCode, setCandidatZipCode] = useState(false);
    const generatePassWord = () => {
        const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*_-+=";
        const characters = symbols + alpha + numbers;
        let password = "";
        for (let i = 0; i < 8; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;

    }
    const createNewCandidat = (e) => {

        e.preventDefault()

        const password = generatePassWord()

        axios.post(`${api}/signup`, {

            user_name: candidat_name,
            user_firstname: candidat_firstname,
            user_email: candidat_email,
            user_password: password,
            user_right: 'candidat',

        }).then((result) => {


            if (result.data.user_info) {

                axios.post(`${api}/createFullUserInfo`, {//creer une centreprise à son nom

                    user_phone_number: candidatPhoneNumber,
                    user_address: candidatAddress,
                    user_department: candidatDepartment,
                    user_city: candidatCity,
                    user_zip_code: candidatZipCode,
                    user_country: candidatCountry,
                    user_id: result.data.user_info.user_id,
                    user_consultant_id: data.user.user_id,
                });
                // emailjs.sendForm("service_iq9yk2o","template_vda6p17",{
                //     from_name: "contact@arecruit.fr",
                //     to_name: `${company_representant__email}`,
                //     message:  `Un compte vient d'être crée en votre nom .Votre mot de passe : ${password} `,
                // },"user_341JNBWw3hxXVAcVxO80v")
                // .then((result) => {
                //     console.log(result.text);
                // }, (error) => {
                //     console.log(error.text);
                // });
                setAlertPositif("Candidat crée avec succès")
                setNewCandidat(false)
                window.location.reload(true)

            } else {
                setAlertNegatif("Deja inscrit")
                setNewCandidat(false)
                window.location.reload(true)

            }
        });
    }

    const [company_representant__name, setcompany_representant_Name] = useState(false);
    const [company_representant__firstname, setcompany_representant_FirstName] = useState(false);
    const [company_representant__email, setcompany_representant_Email] = useState(false);
    const [company_representant_PhoneNumber, setcompany_representant_PhoneNumber] = useState(false);
    const [company_representant_Address, setcompany_representant_Address] = useState(false);
    const [company_representant_Country, setcompany_representant_Country] = useState(false);
    const [company_representant_Department, setcompany_representant_Department] = useState(false);
    const [company_representant_City, setcompany_representant_City] = useState(false);
    const [company_representant_ZipCode, setcompany_representant_ZipCode] = useState(false);
    const [company_name, setCompanyName] = useState("");
    const [company_address, setCompanyAddress] = useState("")
    const [company_headquarters, setCompanyHeadquarter] = useState("")
    const [company_rcs, setCompanyRcs] = useState("")
    const [company_representative_status, setCompanyRepresentativeStatut] = useState("");
    const [company_partnertype, setCompanyPartnerType] = useState("");

    const createNewProspect = (e) => {

        e.preventDefault()

        const password = generatePassWord()

        axios.post(`${api}/signup`, {

            user_name: company_representant__name,
            user_firstname: company_representant__firstname,
            user_email: company_representant__email,
            user_password: password,
            user_right: 'recruteur',

        }).then((result) => {


            if (result.data.user_info) {

                axios.post(`${api}/createFullUserInfo`, {//creer une centreprise à son nom

                    user_phone_number: company_representant_PhoneNumber,
                    user_address: company_representant_Address,
                    user_department: company_representant_Department,
                    user_city: company_representant_City,
                    user_zip_code: company_representant_ZipCode,
                    user_country: company_representant_Country,
                    user_id: result.data.user_info.user_id,
                    user_consultant_id: null,

                }).then((reponse) => {

                    axios.post(`${api}/createFullCompany`, {//creer une centreprise à son nom

                        company_name: company_name,
                        company_address: company_address,
                        company_representative_id: result.data.user_info.user_id,
                        company_representative_status: company_representative_status,
                        company_phone_number: company_representant_PhoneNumber,
                        company_headquarters: company_headquarters,
                        company_rcs: company_rcs,
                        is_partner: company_partnertype ? true : false,
                        partner_type: company_partnertype,
                        consultant_id: data.user.user_id,
                        company_contrat: 'prospect',

                    })

                    // emailjs.send("service_iq9yk2o","template_vda6p17",{
                    //     from_name: "contact@arecruit.fr",
                    //     to_name: `${company_representant__email}`,
                    //     message:  `Un compte vient d'être crée en votre nom .Votre mot de passe : ${password} `,
                    // });
                    console.log("password is", password);
                    console.log("password is", user_password);

                    setAlertPositif("Prospect crée avec succès")
                    setNewCandidat(false)
                    window.location.reload(true)

                });

            } else {

                setAlertNegatif("Deja inscrit")
                setNewCandidat(false)
                window.location.reload(true)

            }
        });
    }


    return (
        <>
            <Head>
                <title>A recruit | Consultant</title>
            </Head>
            <Consultant_layout
                position="gestion.recrutement"
            >
                <>
                    {alertPositif &&
                        <div className="alertPositif orientationH spaceBetween"><div className="alertText">{alertPositif}</div><div className="close" onClick={(e) => { setAlertPositif(false) }}>x</div></div>
                    }
                    {alertNegatif &&
                        <div className="alertNegatif orientationH spaceBetween"><div className="alertText">{alertNegatif}</div><div className="close" onClick={(e) => { setAlertNegatif(false) }}>x</div></div>
                    }

                    <p className="consultant_title">{" >"} &#160; {"ESPACE DE GESTION DE RECRUTEMENT"}</p>
                    <div className="w100 center orientationV">

                        <div className="search_bar w100">
                            <form onSubmit={(e) => { e.preventDefault(); }} role="search" className="w100">
                                <input className="w100" id="search" type="search" placeholder="Prospect, Employeur, Candidat..." autoFocus autoComplete="off" required onChange={(e) => { setFilter(e.target.value) }} />
                            </form>
                            <ul>
                                {filteredResult.map((result) => (
                                    <li key={result.id} className="result">
                                        <Link href={{ pathname: result.origin === "Candidat" ? "/interface/consultant/boiteaoutils/gestionrecrutements/candidat" : "/interface/consultant/boiteaoutils/gestionrecrutements/recruteur", query: { id: result.id, type: result.origin } }}>
                                            <a>
                                                <div className="url">
                                                    {result.name + " ( " + result.origin + " ) "}
                                                </div>
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w90 consultant_create_btn">
                            <div className="button" onClick={(e) => { setNewProspect(true) }}>Nouveau prospect  &#160;<AddIcon /> </div>
                            <div className="button" onClick={(e) => { setNewCandidat(true) }}>Nouveau candidat  &#160;<AddIcon /> </div>
                        </div>
                        <div className="stats">
                            <Doughnut
                                data={state}
                                options={{
                                    title: {
                                        display: true,
                                        text: 'Average Rainfall per month',
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />
                        </div>
                        <br></br>
                        {newProspect &&
                            <div className="ovelay">
                                <div className="container">
                                    <div className="container_title">
                                        <div>{" CRÉER UN NOUVEAU PROSPECT"}</div>
                                        <div className="close" onClick={(e) => { setNewProspect(false) }}><CloseIcon /></div>
                                    </div>
                                    <form className=" w100">
                                        <div className="orientationV">
                                            <span>Représentant : </span>
                                            <input type="text" placeholder="Statut" />
                                            <div className="orientationH w100">
                                                <input className="w100" type="text" placeholder="Nom" onChange={(e) => { setcompany_representant_Name(e.target.value) }} />
                                                <input className="w100" type="text" placeholder="Prénom" onChange={(e) => { setcompany_representant_FirstName(e.target.value) }} />
                                            </div>
                                            <input type="text" placeholder="Email" onChange={(e) => { setcompany_representant_Email(e.target.value) }} />
                                            <div className="orientationH">
                                                <input className="w100" type="text" placeholder="Téléphone" onChange={(e) => { setcompany_representant_PhoneNumber(e.target.value) }} />
                                                <input className="w100" type="text" placeholder="Adresse" onChange={(e) => { setcompany_representant_Address(e.target.value) }} />
                                            </div>
                                            <div className="orientationH">
                                                <div className="w100">
                                                    <input type="text" placeholder="Ville" list="city" autoComplete="off" onChange={(e) => { setcompany_representant_City(e.target.value) }} />
                                                    <datalist id="city">
                                                        {data.city.map((element, index) => {
                                                            return <option key={index}>{element.user_city}</option>
                                                        })}
                                                    </datalist>
                                                </div>
                                                <input className="w100" type="text" placeholder="Code Postal" onChange={(e) => { setcompany_representant_ZipCode(e.target.value) }} />
                                            </div>
                                            <div className="orientationH">
                                                <div className="w100 orientationV spaceBetween ">
                                                    <label>Pays :</label>
                                                    <select className="form_select" required onChange={(e) => { setcompany_representant_Country(e.target.value) }}>
                                                        <option>--Pays--</option>
                                                        {data.europe_country.map((element, index) => {
                                                            return <option key={index} value={element}>{element}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="w100 orientationV spaceBetween ">
                                                    <label>Departement :</label>
                                                    <select className="form_select" required onChange={(e) => { setcompany_representant_Department(e.target.value) }}>
                                                        <option>--Departement--</option>
                                                        {data.departements.map((element, index) => {
                                                            return <option key={index}>{element.nom}</option>
                                                        })}

                                                    </select>
                                                </div>
                                            </div>
                                            <br></br>
                                            <span>Entreprise : </span>
                                            <input type="text" placeholder="Entreprise" onChange={(e) => { setCompanyName(e.target.value) }} />
                                            <input type="text" placeholder="Téléphone" onChange={(e) => { setcompany_representant_PhoneNumber(e.target.value) }} />
                                            <input type="text" placeholder="Siège social" onChange={(e) => { setCompanyHeadquarter(e.target.value) }} />
                                            <input type="text" placeholder="RCS" onChange={(e) => { setCompanyRcs(e.target.value) }} />
                                            <label>&#160;&#160;<input type="checkbox" name="parteniar" onChange={(e) => { setCompanyPartnerType(e.target.value) }} />&#160; Partenaire commecial </label>
                                            <label>&#160;&#160;<input type="checkbox" name="parteniar" onChange={(e) => { setCompanyPartnerType(e.target.value) }} />&#160; Partenaire école </label>

                                            <div className="button ">
                                                <input type="submit" value="Enregistrer" onClick={(e) => { createNewProspect(e) }} />
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        }
                        {newCandidat &&
                            <div className="ovelay">
                                <div className="container">
                                    <div className="container_title">
                                        <div>{" CRÉER UN NOUVEAU CANDIDAT"}</div>
                                        <div className="close" onClick={(e) => { setNewCandidat(false) }}><CloseIcon /></div>
                                    </div>
                                    <form className=" w100" >
                                        <div className="orientationV">
                                            <input type="text" placeholder="Nom" onChange={(e) => { setcandidatName(e.target.value) }} />
                                            <input type="text" placeholder="Prénom" onChange={(e) => { setcandidatFirstName(e.target.value) }} />
                                            <input type="text" placeholder="Adresse" onChange={(e) => { setCandidatAddress(e.target.value) }} />
                                            <div className=" w100 orientationH spaceBetween ">
                                                <div className="w100 orientationV spaceBetween ">
                                                    <label>Pays :</label>
                                                    <select className="form_select" required onChange={(e) => { setCandidatCountry(e.target.value) }}>
                                                        <option>--Pays--</option>
                                                        {data.europe_country.map((element, index) => {
                                                            return <option key={index} value={element.name}>{element.name}</option>
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" w100 orientationV spaceBetween ">
                                                <div className="w100 orientationV spaceBetween ">
                                                    <label>Departement :</label>
                                                    {data.departements.length !== 0 ?
                                                        <select className="form_select" required onChange={(e) => { setCandidatDepartment(e.target.value) }}>
                                                            <option>--Departement--</option>
                                                            {data.departements.map((element, index) => {
                                                                return <option key={index}>{element.nom}</option>
                                                            })}

                                                        </select>
                                                        :
                                                        <input placeholder={data.company_department ? data.company_department : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyDepartment(e.target.value) }} />
                                                    }
                                                </div>
                                            </div>
                                            <input type="text" placeholder="Ville" list="city" autoComplete="off" onChange={(e) => { setCandidatCity(e.target.value) }} />
                                            <datalist id="city">
                                                {data.city.map((element, index) => {
                                                    return <option key={index}>{element.user_city}</option>
                                                })}
                                            </datalist>
                                            <input type="text" placeholder="Code Postal" onChange={(e) => { setCandidatZipCode(e.target.value) }} />
                                            <input type="text" placeholder="Téléphone" onChange={(e) => { setcandidatPhoneNumber(e.target.value) }} />
                                            <input type="text" placeholder="Email" onChange={(e) => { setcandidatEmail(e.target.value) }} />
                                            <div className="button ">
                                                <input type="submit" value="Enregistrer" onClick={(e) => { createNewCandidat(e) }} />
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        }

                    </div>
                </>
            </Consultant_layout>

        </>
    )

}

export async function getServerSideProps({ req }) {

    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

    if (user_cookie.me) {

        const user = jwt_decode(JSON.stringify(user_cookie))
        let data = []
        let europe_country = ["Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre (partie grecque)", "Croatie", "Danemark", "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas", "Pologne", "Portugal", "République tchèque", "Roumanie", "Royaume-Uni", "Slovaquie", "Slovénie", "Suède"]
        let departements = []
        let city = []

        await axios.post(`${api}/getConsultantAfiliate`, {
            consultant_id: user.user_id,
        }).then((reponse) => {
            data = reponse.data
        })
        // await axios.get("https://restcountries.eu/rest/v2/region/europe?fields=name", {
        //     europe : europe_country
        // }).then( (reponse)=>{
        //      europe_country = reponse.data
        // })

        await axios.get("https://geo.api.gouv.fr/departements")
            .then((reponse) => {
                departements = reponse.data
            });

        await axios.post(`${api}/getCity`)
            .then((reponse) => {
                city = reponse.data
            });

        data = await { user: user, data: data, europe_country: europe_country, departements: departements, city: city }

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
            destination: "/auth/login?dest=consultant/boiteaoutils",
        },
        props: { message: "redirect" },
    }
}
