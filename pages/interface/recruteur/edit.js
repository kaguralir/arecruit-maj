import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../../../components/header/header'
import axios from 'axios'
import { api } from '../../api/api'
import Image from 'next/image'
import AWS from 'aws-sdk'
import { useEffect } from 'react/cjs/react.development'

export default function edit({ data }) {
    //DECLARATION
    const [company_name, setCompanyName] = useState(data.company_name);
    const [company_logo, setCompanyLogo] = useState(data.company_logo);
    const [company_nationality, setCompanyNationality] = useState(data.company_nationality);
    const [company_representative_status, setCompanyRepresentativeStatus] = useState(data.company_representative_status);
    const [company_rcs, setCompanyRcs] = useState(data.company_rcs);
    const [company_headquarters, setCompanyHeadquarters] = useState(data.company_headquarters);
    const [company_zip_code, setCompanyZipCode] = useState(data.company_zip_code);
    const [company_address, setCompanyAddress] = useState(data.company_address);
    const [company_department, setCompanyDepartment] = useState(data.company_department);
    const [company_phone_number, setCompanyPhoneNumber] = useState(data.company_phone_number);
    const [company_city, setCompanyCity] = useState(data.company_city);
    const [company_country, setCompanyCountry] = useState(data.company_country);
    const [is_partner, setIsPartner] = useState(data.is_partner);
    const [partner_type, setPartnerType] = useState(data.partner_type);
    const [consultant_id, setConsultantId] = useState(data.consultant_id);
    //Fichiers
    const [company_presentation_pdf, setCompanyPresentationPdf] = useState(data.company_presentation_pdf)
    const [company_presentation_video, setCompanyPresentationVideo] = useState(data.company_presentation_pdf)
    //Variables de changement 
    const [alterCompanyPresentationPdf, setAlterCompanyPresentationPdf] = useState(false)
    const [alterCompanyPresentationVideo, setAlterCompanyPresentationVideo] = useState(false)


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

    const [changeLogo, setChangeLogo] = useState(false)
    const customImgLoader = ({ src }) => {
        return `${src}`
    }
    const changerLogo = async (e) => {

        e.preventDefault();

        if (!company_logo) {
            alert("Veuillez spécifier d'abord un fichier")

        } else {
            const fichier = await loaded_file(company_logo)

            axios.post(`${api}/uploadCompanyLogo`, {

                file: fichier,
                id: data.company_id

            }).then((result) => {

                if (result.data) {
                    window.location.reload(true)

                } else {
                    alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
                }
            });
        }
    }

    const uploadCompanyPresentationPdf = async (e) => {
        e.preventDefault();
        if (!company_presentation_pdf) {

            alert("Veuillez spécifier d'abord un fichier")

        } else {

            const fichier = await loaded_file(company_presentation_pdf)

            axios.post(`${api}/uploadCompanyPresentationPdf`, {

                file: fichier,
                id: data.company_id

            }).then((result) => {

                if (result.data) {
                    window.location.reload(true)
                } else {
                    alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
                }
            });
        }
    }


    const uploadCompanyPresentationVideo = async (e) => {

        e.preventDefault();

        if (!company_presentation_video) {

            alert("Veuillez spécifier d'abord un fichier")

        } else {

            const fichier = await loaded_file(company_presentation_video)

            axios.post(`${api}/uploadCompanyPresentationVideo`, {

                file: fichier,
                id: data.company_id

            }).then((result) => {

                if (result.data) {
                    window.location.reload(true)
                } else {
                    alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
                }
            });
        }
    }


    const finalization = (e) => {

        e.preventDefault();

        axios.post(`${api}/updateCompanyInfo`, {
            company_id: data.company_id,
            company_name: company_name,
            company_nationality: company_nationality,
            company_representative_status: company_representative_status,
            company_rcs: company_rcs,
            company_address: company_address,
            company_department: company_department,
            company_phone_number: company_phone_number,
            company_headquarters: company_headquarters,
            company_zip_code: company_zip_code,
            company_city: company_city,
            company_country: company_country,
            is_partner: is_partner,
            partner_type: partner_type,
            consultant_id: consultant_id,
            company_presentation_pdf: company_presentation_pdf,
            company_presentation_video: company_presentation_video

        }).then((resutlt) => {

            if (resutlt.data) {
                console.log(resutlt.data)
                window.location.reload(true)
            } else {
                alert("Une erreur s'est produite veuillez revérier tout les champs et réessayez")
            }
        });


    }

    return (
        <div className="recruteur">

            <div className="interface-layout">
                <Head>
                    <title>A recruit | Recruteur</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header
                />

                <main className="body w100 ">
                    <div className="beauty_top w100 center title orientationV">
                        {!data.company_logo ?
                            <div className="defaultLogo"><div>{data.company_name.charAt(0)}</div></div>
                            :
                            <div className="defaultLogo">
                                <Image alt="logo" loader={customImgLoader} src={data.company_logo} width={100} height={100} />
                            </div>
                        }
                        {!changeLogo ?
                            <div className="logo_edit" onClick={(e) => { setChangeLogo(true) }}>
                                Modifier mon logo
                            </div>
                            :
                            <form className="logoModification">
                                <input type="file" onChange={(e) => { setCompanyLogo(e) }} />
                                <div className="button" onClick={(e) => { changerLogo(e) }}>
                                    Changer
                                </div>
                                <div className="button" onClick={(e) => { setChangeLogo(false) }}>
                                    Annuler
                                </div>
                            </form>
                        }
                        <div style={{ color: '#fff' }}> {data.company_name}</div>
                        <br></br>

                    </div>
                    <div className="w90 register_todo_container">
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Nom de l'entreprise :</label>
                                <input placeholder={data.company_name ? data.company_name : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyName(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Pays :</label>
                                <select className="form_select" onChange={(e) => { setCompanyCountry(e.target.value); loadDepartment(e.target.value) }}>
                                    {data.europe_country.map((element, index) => {
                                        if (data.company_country && element.name === data.company_country) {
                                            return <option className="option-selected" defaultValue key={index} value={element.name}>{element.name}</option>
                                        } else {
                                            return <option key={index} value={element.name}>{element.name}</option>
                                        }
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Département :</label>
                                {(data.departements.length !== 0 || data.company_department) ?
                                    <select className="form_select" onChange={(e) => { setCompanyDepartment(e.target.value); loadConsultant(e.target.value) }}>
                                        <option>Selectionnez un departement</option>

                                        {data.departements.map((element, index) => {
                                            if (data.company_department && element.nom === data.company_department) {
                                                return <option className="option-defaultValue" defaultValue key={index}>{element.nom}</option>
                                            } else {
                                                return <option key={index}>{element.nom}</option>
                                            }
                                        })}

                                    </select>
                                    :
                                    <input placeholder={data.company_department ? data.company_department : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyDepartment(e.target.value) }} />
                                }

                            </div>

                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Adresse :</label><input placeholder={data.company_address ? data.company_address : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyAddress(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Ville :</label><input placeholder={data.company_city ? data.company_city : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyCity(e.target.value) }} />
                            </div>

                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Code postal :</label><input placeholder={data.company_zip_code ? data.company_zip_code : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyZipCode(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Nationalité de l'entreprise :</label>
                                <input placeholder={data.company_nationality ? data.company_nationality : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyNationality(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Siège social :</label><input placeholder={data.company_headquarters ? data.company_headquarters : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyHeadquarters(e.target.value) }} />
                            </div>

                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>RCS + Ville :</label><input placeholder={data.company_rcs ? data.company_rcs : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyRcs(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Qualité du signataire :</label>
                                <input placeholder={data.company_representative_status ? data.company_representative_status : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyRepresentativeStatus(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Tel :</label><input placeholder={data.company_phone_number ? data.company_phone_number : "..."} type="text" name="ent_name" onChange={(e) => { setCompanyPhoneNumber(e.target.value) }} />
                            </div>
                        </div>
                        <div className="register_todo w100 orientationH spaceBetween center">
                            <div className="w100 orientationH spaceBetween center">
                                <label>Consultant :</label>
                                <select className="form_select" required onChange={(e) => { setConsultantId(e.target.value) }}>
                                    <option>Choisir mon consultant</option>

                                    {data.consultants.map((element, index) => {
                                        if (data.consultant_id && element.user_id === data.consultant_id) {
                                            return <option className="option-selected" value={element.user_id} defaultValue key={index}>{element.user_name}</option>
                                        } else {
                                            return <option key={index} value={element.user_id}>{element.user_name}</option>
                                        }
                                    })}

                                </select>

                            </div>

                        </div>
                        <br></br>
                        <div className="register_todo file w100 orientationH spaceBetween ">
                            <label>Présentation de l'entreprise en pdf :</label>
                            {(data && data.company_presentation_pdf && !alterCompanyPresentationPdf) ?

                                <div className="file_preview orientationH center spaceBetween">
                                    <div className="pdf_view_icon" title="Ouvrir">Présentation PDF</div>
                                    <div className="simpleButton center" onClick={() => { setAlterCompanyPresentationPdf(true) }}>Modifier</div>
                                </div>
                                :
                                <div className="  orientationH center">
                                    <input className="file_input" type="file" name="avatar" accept="application/pdf,application/vnd.ms-excel" onChange={(e) => { setCompanyPresentationPdf(e) }} />
                                    <div>
                                        <div className="input" onClick={(e) => { uploadCompanyPresentationPdf(e) }}>Envoyer</div>
                                        {data && data.company_presentation_pdf &&
                                            <div className="input" onClick={(e) => { setAlterCompanyPresentationPdf(false) }}>Annuler</div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="register_todo  file w100 orientationH  spaceBetween  ">
                            <label>Présentation de l'entreprise en video :</label>
                            {(data && data.company_presentation_video && !alterCompanyPresentationVideo) ?

                                <div className="file_preview orientationH center spaceBetween">
                                    <div className="video_view_icon" title="Ouvrir">Présentation VIDEO</div>
                                    <div className="simpleButton center" onClick={() => { setAlterCompanyPresentationVideo(true) }}>Modifier</div>
                                </div>
                                :
                                <div className=" orientationH">
                                    <input className="file_input" type="file" name="avatar" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => { setCompanyPresentationVideo(e) }} />
                                    <div className="input" onClick={(e) => { uploadCompanyPresentationVideo(e) }}>Envoyer</div>
                                    {(data && data.company_presentation_video) &&
                                        <div className="simpleButton center" onClick={(e) => { setAlterCompanyPresentationVideo(false) }}>Annuler</div>
                                    }
                                </div>
                            }
                        </div>


                        <div className="submitButton  center" onClick={(e) => { finalization(e) }}>MODIFIER</div>

                    </div>
                </main>
            </div>
        </div>
    )


}



export async function getServerSideProps({ query }) {

    let data = []
    let europe_country = ["Allemagne", "Autriche", "Belgique", "Bulgarie", "Chypre (partie grecque)", "Croatie", "Danemark", "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg", "Malte", "Pays-Bas", "Pologne", "Portugal", "République tchèque", "Roumanie", "Royaume-Uni", "Slovaquie", "Slovénie", "Suède"]
    let consultants = []
    let departements = []

    await axios.post(`${api}/getCompanyInfo`, {
        user_id: query.companyInfo,
    }).then((reponse) => {
        data = reponse.data
    })

    // await axios.get("https://restcountries.eu/rest/v2/region/europe?fields=name", {
    //     europe : europe_country
    // }).then( (reponse)=>{
    //     europe_country = reponse.data
    // })

    await axios.get("https://geo.api.gouv.fr/departements")
        .then((reponse) => {
            departements = reponse.data
        });

    await axios.post(`${api}/getConsultantByDepartment`, {
        company_department: data.company_department
    }).then((reponse) => {
        consultants = reponse.data
    })


    data = await { ...data, europe_country: europe_country, departements: departements, consultants: consultants }



    return {
        props: {
            data
        }
    }
}

