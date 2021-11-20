import React,{useState,useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useRouter} from 'next/router'
import { api } from '../../pages/api/api'
import {useCookies} from 'react-cookie';
import Image from 'next/image'
import Fileinput from '@brainhubeu/react-file-input'
export default function MissionAgility() {

    const router = useRouter()
    const [cookie, setCookie] = useCookies(["me"])
    const [consultant,setConsultant]=useState("")
    const [consultant_company_info,setConsultantCompanyInfo]=useState([])
    const [company_info,setCompanyInfo]=useState([])
    const [company_representative,setCompanyRepresentative]=useState([])
    const [signature,setSignature]=useState([])
  
    useEffect(()=>{
        let data=cookie
        if(data.me){

            let user = jwt_decode(JSON.stringify(data))
            setConsultant(user)
            axios.post(`${api}/getCompanyInfoById`,{
              id:user.user_id
            }).then((reponse)=>{
                setConsultantCompanyInfo(reponse.data)
            })
            axios.post(`${api}/getCompanyInfoById`,{
                id:router.query.by
            }).then((reponse)=>{
                setCompanyInfo(reponse.data)
                axios.post(`${api}/getUserInfoById`,{
                    user_id:reponse.data.company_representative_id
                }).then((reponse2)=>{
                    setCompanyRepresentative(reponse2.data)
                })
            })
        }
  
    },[])

    return (
        <div className="consultant">
            <div className="pages">

                <div className="page orientationV spaceBetween">
                    <div >

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement signé hors établissement</div>
                        <br></br> 
                        Numéro de Mandat : XXXXXXXXXX
                        <br></br> 
                        <br></br> 
                        <div className="orientationH parties-prenantes">
                            <div>
                                <span className="bold">Le Mandant</span><br></br>
                                L’employeur :<br></br> 
                                Nom et prénom du représentant légale :<br></br>  {company_info.company_president}<br></br> 
                                Dénomination sociale : {company_info.company_name}<br></br> 
                                N° RCS et Lieu :  {company_info.company_rcs}<br></br> 
                                Code APE:  {company_info.company_ape}<br></br> 
                                N° TVA : {company_info.company_tva}<br></br> 
                                Siège social: {company_info.company_headquarters} <br></br> 
                                Code postale et ville : {company_info.company_zip_code+" "+company_info.company_city}<br></br> 
                                Tél :  {company_info.company_phone_number}<br></br> 
                                Courriel :  {company_info.company_email}<br></br> 
                                Nom du chargé de recrutement :<br></br> {company_representative.user_name+ " "+company_representative.user_firstname}
                                <br></br> 
                            </div>
                            <div>
                                <span className="bold"> Le Mandataire<br></br> Le Cabinet de Recrutement A RECRUIT :</span>
                                <br></br> Nom et prénom du consultant A RECRUIT:<br></br> 
                                {consultant.user_name+ " "+consultant.user_firstname}<br></br>
                                Dénomination sociale:  {consultant_company_info.company_rcs}<br></br> 
                                N° RCS et Lieu : {consultant_company_info.company_rcs}<br></br> 
                                Code APE : {consultant_company_info.company_ape}<br></br> 
                                N° TVA : {consultant_company_info.company_tva}<br></br> 
                                Siège social : {consultant_company_info.company_headquarters} <br></br> 
                                Code postale et ville :{consultant_company_info.company_zip_code+" "+consultant_company_info.company_city} <br></br> 
                                Tél :  {consultant_company_info.company_phone_number}<br></br> 
                                Courriel :  {consultant_company_info.company_email}<br></br> 
                                Nom du chargé d’affaire (exemple Mandataire ou salarié du cabinet)<br></br> 

                            </div>

                        </div>

                        <br></br>                     

                        <span className="bold"> Il a été arrêté et convenu ce qui suis :</span>
                        Aux termes du présent mandat, établi conformément à la règlementation en vigueur, le Mandant confère au Mandataire, qui l’accepte, 
                        <span className="bold"> MANDAT SEMIS EXCLUSIF DE RECHERCHE DE CANDIDAT</span> « Recrutement », correspondant à la description figurant ci-après.
                        Il est expressément précisé que le présent mandat étant un<span className="bold"> MANDAT SEMIS EXCLUSIF</span>, le Mandant s’interdit de recruté par l’intermédiaire de tout autres professionnels, le candidat, sujet du présent mandat Il est précisé que le présent Mandat étant un Mandat semis-exclusif, Le mandant conserve la faculté de rechercher par lui-même un acquéreur, s’engageant à diriger sur le mandataire les demandes qui lui seront adressées personnellement. 
                        <br></br>
                        <br></br>
                        <div>
                            <span className="bold">1.Description :
                            <br></br>
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Poste à pourvoir:</span>
                            <br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.1. Titre du poste :</span> <br></br>       
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.2. Type de contrat :</span>     CDD, CDI, CPE, Freelance, …<br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.3. Lieu d’exécution : </span>    Département d’exercice<br></br>

                        </div>
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 1/4</div>

                    </div>
                </div>
                <div className="page orientationV spaceBetween">
                    <div >
                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement signé hors établissement</div>
                        <br></br>
                        <div>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a.4. Rémunération :</span>                                                                                Fourchette de remunération annuele
                                        15KE à 20KE, 20KE à 25KE, 25KE à 30KE, … <br></br>   
                            <span className="bold">&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;Candidat recherché </span><br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;b.1. Niveau d’étude :</span>     Sans, CAP,BEP, BP, BAC, BTS, …<br></br>
                            <span className="bold"> &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;b.2. Expérience : </span>    0à3, 3à5, 5à8, 8à10…<br></br>
                            <br></br>      
                        </div>
                        <div className="italic"> Descriptif détaillé du poste à pourvoir et du candidat recherché en annexe des présentes, voir « cahier des charges de recrutement »</div>

                        Le Mandant déclare et certifie avoir la capacité de financer le dit poste, il certifie sur l’honneur que rien dans sa situation juridique ou fiscale ne s’oppose au recrutement du futur candidat, ni à l’exécution du présent <span className="bold">MANDAT SEMIS EXCLUSIF </span> et que les informations ci-dessus sont exactes et correspondent bien à sa recherche.
                        <br></br>En cas de défaillance caché volontairement ou fausse déclaration le Mandant s'engage à verser, à titre de clause pénale, une indemnité forfaitaire de cinq mille euros (5 000 euros).

                        <br></br><br></br>2.Durée du Mandat :
                        Le présent mandat exclusif est donné à compter de ce jour pour une durée irrévocable de six mois. A l'issue de ce délai, il sera tacitement prorogé pour une durée maximale de six mois soit jusqu'au    XX / XX / XXXX, date à laquelle il prendra automatiquement fin.
                        En outre, passé le délai de six mois, le présent mandat pourra être dénoncé à tout moment par chacune des parties, à charge pour celle qui entend y mettre fin d'en aviser l'autre partie 15 jours au moins à l'avance par lettre recommandée avec demande d'avis de réception.

                        <br></br><br></br>3.Conditions du Mandat Semis Exclusif de Recrutement « AGILITY A RECRUTE » : <br></br><br></br>
                        <div className="orientationH spaceBetween contrat-two-collumn">
                            <div>
                                Conformément au présent mandat, le Mandant donne tous pouvoirs au Mandataire pour accomplir, pour son compte et en son nom, toutes les démarches que le Mandataire jugera utiles pour la recherche du candidat adéquat, notamment insertion d'annonces publicitaire dans des site internet spécialisés.
                                Le Mandant déclare ne pas avoir consenti, par ailleurs, de mandat de recrutement en cours et s'interdit de le faire sans avoir préalablement dénoncé le présent Mandat Semis Exclusif.
                                En outre, le mandant conserve la faculté de rechercher par lui-même un candidat, s’engageant à diriger sur le mandataire les demandes qui lui seront adressées personnellement. Dans le cas où le recrutement se réaliserait avec   un candidat
                            </div>
                            <div>
                                présenté par le mandant, la rémunération du mandataire serait automatiquement réduite dans les proportions indiquées, au paragraphe « Rémunération du Mandataire ».
                                Toutefois, le mandataire reste tenu de mener à bien sa mission consécutive au présent mandat telle qu’elle résulte des obligations et des pouvoir stipulés ci-dessus.
                                Le Mandant s'oblige à valider tout candidat présenté par le Mandataire,                            
                                sans discrimination d’aucune sorte, ni privilèges ou préférences (qu’elle soit de race, de sexe, de religions, …), correspondant précisément à la description, charges et conditions du présent mandat.
                                A défaut, après une mise en demeure restée infructueuse, il s'engage à indemniser le Mandataire. 
                            </div>
                        </div>
                    
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 2/4</div>

                    </div>
                </div>
                <div className="page orientationV spaceBetween">
                    <div>

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement signé hors établissement</div>
                        <br></br>
                        <div className="orientationH spaceBetween contrat-two-collumn">
                            <div>
                                Le montant de l'indemnité ; à titre de clause pénale, une indemnité forfaitaire de cinq mille euros (5 000 euros).
                                Le présent mandat étant semis-exclusif, pendant toute la durée du présent mandat et de sa prorogation, le Mandant s’interdit de traiter par l’intermédiaire d’un autre mandataire la recherche de candidat correspondant à la description figurant ci-dessus. 
                                Il s'interdit également, après l’expiration  
                            </div>
                            <div>
                                du mandat et pendant une durée d'un an, de recruter un candidat qui lui aurais été présenté par le mandataire sans passer par son intermédiaire.
                                A défaut, le Mandant s'engage à verser, à titre de clause pénale,une indemnité forfaitaire de cinq mille euros (5 000 euros) qui s’ajoutera à la valeur des honoraires que le Mandataire aurait dû percevoir pour le recrutement du dit candidat. 
                            </div>
                        </div>
                        <br></br>

                        4.Rémunération du mandataire :
                        Dans l'hypothèse du recrutement du candidat proposé par le Mandataire, ledit Mandataire aura droit à une rémunération couvrant les frais de dossiers, de déplacement ainsi que les frais de sélection et présentation du/des candidat(s), fixée à :
                                            (De 14 à 23%) TTC de la rémunération brute annuel que percevra le candidat, devenant exigible le jour de la signature du contrat de travail du dit candidat.
                        Sauf s’il est fait application de la clause « semi-exclusif » prévue au présent Mandat de recrutement. « Clause semi-exclusif », auquel cas, la rémunération du mandataire sera réduite de 30%, le cas échéant ou le Mandant aurait apporté le candidat.
                        Il est précisé que si le Mandataire ne propose pas de candidat ou aucun candidat correspondant aux besoins du mandant, ce dernier ne percevra aucune rémunération et restera tenu des frais engagés pour la recherche.

                        <br></br><br></br>5.Droit de rétractation - Le cas échéant ou le présent Mandat serait signé en dehors des locaux du Mandataire
                        Le mandant étant professionnel les parties devront se conformer aux dispositions de l’article L121-16-1 du code de la consommation.
                        Le droit de rétractation de 14 jours à compter de la réception du bien ou de la date de conclusion du contrat de service s’applique aux professionnels qui (article L121-16-1 du Code de la consommation) ont moins de 5 salariés dans l’entreprise, si le contrat est conclu hors établissement et si l’objet du contrat n’est pas dans le champ d’activité principale de l’entreprise.
                        Si ces trois conditions sont réunies, l'entreprise bénéficie d'un droit de rétractation de 14 jours de même que les consommateurs particuliers.
                        Pour faire valoir ce droit, le client devra répondre aux exigences légales et faire parvenir sa volonté de se rétracter par lettre recommandé avec avis de réception dans le délai de 14 jours, au cabinet de recrutement A RECRUIT en charge de son dossier
                        <br></br>Article L.121-21-2 – extrait : « le consommateur informe le professionnel de sa décision de rétractation en lui adressant, avant l’expiration du délai prévu à l’article L.121-21, le formulaire de rétractation mentionné au 2 du 1 de l’article L.121-17 ou toute autre déclaration, dénuée d’ambigüité, exprimant sa volonté de se rétracter ».

                        <br></br> <br></br>6.Election de domicile :
                        Pour l’exécution du présent contrat les parties font élection de domicile aux adresses indiquées en tête des présentes Mandat simple de recrutement et s'engagent à informer l'autre partie de tout changement d'adresse.

                        
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 3/4</div>

                    </div>

                </div>
                <div className="page orientationV spaceBetween">
                    <div>

                        <div className="orientationH center spaceBetween">
                            <Image src="/images/logo.png" alt="logo" width={150} height={60}/>
                            <div >
                                <span > AGILITY A RECRUIT</span>
                            </div>
                        </div>
                        <div className="center">Mandat de recrutement signé hors établissement</div>
                        <br></br>
                        Le Mandant reconnait expressément, avoir pris connaissance des CGV et les acceptes 
                        <br></br>Le Mandant reconnait expressément, avoir reçu et pris connaissance de la note d’information précontractuelle. 

                        <br></br><br></br>Fait en deux exemplaires originaux à : Ville du siège sociale du client employeur                    
                        <br></br>Le : date de signature 
                        <br></br><br></br>
                        <div className="orientationH spaceBetween signatures">
                            <div className="un">
                                Le Mandant<br></br>
                                Cachet, Prénom, Nom du/des signataire(s)
                                Précédée de la mention manuscrite
                                « Bon pour pouvoir »
                            </div>
                            <div className="deux">
                                Le Mandataire<br></br>
                                Signature, Cachet précédée de la mention manuscrite
                                « Bon pour acceptation »
                                <label className="signature-upload">
                                    <Fileinput
                                        label='Awesome Uploader'
                                        onChangeCallback={(e)=>{setSignature(e)}}
                                       
                                    />

                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="pied_page orientationH spaceBetween">
                        <div className="parafe"></div>
                        <div>Page 4/4</div>

                    </div>
                </div>
            </div>

        </div>
    )
}
