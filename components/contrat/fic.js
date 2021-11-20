import React,{useState,useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useRouter} from 'next/router'
import { api } from '../../pages/api/api'
import {useCookies} from 'react-cookie';


export default function fic() {

    const router = useRouter()
    const [cookie, setCookie] = useCookies(["me"])
    const [company_info,setCompanyInfo]=useState([])
  
    useEffect(()=>{
        let data=cookie
        if(data.me){

            let user = jwt_decode(JSON.stringify(data))
           
            axios.post(`${api}/getCompanyInfoById`,{
              id:user.user_id
            }).then((reponse)=>{
              setCompanyInfo(reponse.data)
            })
        }
  
    },[])

    return (
        <div className="consultant">
            <div className="pages">

                <div className="page">

                    <div className="title">
                        COMMUNICATION DES INFORMATIONS PRECONTRACTUELLES AU CONTRAT DE RECRUTEMENT – « A RECRUIT »
                    </div>
                    <br></br>
                    <p className="italic">
                        <p className="center">Conformément à l’article L441-6 du Code de Commerce et aux articles L111-1 et L111-2 du Code de la consommation. </p>
                        <br></br>
                        <span className="bold"> Pour rappelle l’article L441-6 du Code de Commerce,</span> « Tout producteur, prestataire de services, grossiste ou importateur est tenu de communiquer ses conditions générales de vente à tout acheteur de produits ou tout demandeur de prestations de services qui en fait la demande pour une activité professionnelle. Elles comprennent: les CGV, le barème des prix unitaires, les réductions de prix et les conditions de règlement »
                    </p>
                    <span className="bold">
                        En applications des articles L.221-5 et L.221-7 du code de la consommation, le professionnel prestataire de services, « le consultant en recrutement » avec lequel vous entrez en relation vous informe.
                        <br></br>
                        <br></br>
                        LE/LA CONSULTANT(E) EN RECRUTEMENT :
                    </span>
                    <br></br>
                    Dénomination sociale : {company_info.company_name}
                    <br></br>
                    Dirigeant : {company_info.company_consultant_name+" "+company_info.company_consultant_firstname}
                    <br></br>
                    RCS : {company_info.company_rcs}
                    <br></br>
                    TVA : {company_info.company_tva}
                    <br></br>
                    Siège social :{company_info.company_headquarters}
                    <br></br>
                    Téléphone : {company_info.company_phone_number}
                    <br></br>
                    Email : {company_info.company_email}
                    <br></br>
                    <br></br>
                    <span className="bold">
                        Le consultant en recrutement est membre du réseau de consultant en recrutement indépendant « A RECRUIT ». « A RECRUIT » est une marque française déposée à l’INPI sous le numéro 4741270.
                        <br></br>
                        <br></br>
                        SOCIETE DE GESTION ET CONTROLE DU RESEAU ET DE LA MARQUE « A RECRUIT » :
                    </span>
                    <br></br>
                    Dénomination sociale : SAS A RECRUIT
                    <br></br>
                    Président : M. PIRO
                    <br></br>
                    Directeur général : M. DRISSI
                    <br></br>
                    RCS :
                    <br></br>
                    Siège social :
                    <br></br>
                    Service médiation : mediation@arecruit.com
                    <br></br>
                    Service communication : servicom@arecruit.com
                    <br></br>
                    Contact général : contact@arecruit.com
                    <br></br>
                    <br></br>
                    <span className="bold">
                        CARACTERISTIQUES ESSENTIELLES DU SERVICE ET MODALITES D’EXECUTION.
                        <br></br>
                        LE CONTRAT 
                    </span>
                     : Le/la consultante en recrutement s’engage à procéder à la diffusion de l’annonce de recrutement sur les sites web et supports de communication externe professionnel et adapté, à l’étude des dossiers et sélection préalables des candidats, a assisté la présentation du candidat, à suivre le candidat jusqu’à validation dans l’entreprise, à établir des comptes rendus des différentes actions entreprises et réalisées pendant toute la durée du contrat.
                    <br></br>
                    <span className="bold">CONDITIONS GENERALES </span>: Le consommateur déclare avoir pris connaissance des conditions générales situées au verso du contrat et sur la page CGV du site « A RECRUIT » www.arecruit.com avant signature des présentes.
                </div>
                <div className="page">
                    <span className="bold"> DUREE DU CONTRAT ET CONDITION DE RESILIATION </span>: La mission est conclue pour une durée indéterminée qui prendra fin automatiquement par l’embauche du salarié recherché.
                    <br></br>
                    Le client s’oblige à prévenir le consultant en recrutement dans les 2 jours de l’embauche d’un salarié afin de mettre fin aux recherches entreprises p. 
                    <br></br>
                    <span className="bold"> PRIX DU SERVICE ET MODALITE DE PAIEMENT </span>: Le montant de la prestation pour le recrutement est de : 
                    14% du salaire annuel brut : Correspond aux critères pour du sourcing/entretient de candidat.
                    <br></br>
                    23 % du salaire annuel brut : Correspond aux critères comprenant le chasse tête et le recrutement à l’international (démarchage de salariés d’entreprises concurrentes et/ou dans d’autre pays)
                    Date de facturation : à la signature de la promesse d’embauche ou du contrat de travail du candidat retenu par le client. Les factures sont émises en euros avec un montant de TVA, en vigueur à la date de facturation, applicable en sus. 
                    Mode de paiement par le client : comptant à réception de la facture.
                    <br></br>
                    <span className="bold"> DROIT DE RETRACTATION </span>: Le droit de rétractation de 14 jours à compter de la réception du bien ou de la date de conclusion du contrat de service s’applique aux professionnels qui (article L121-16-1 du Code de la consommation) ont moins de 5 salariés dans l’entreprise, si le contrat est conclu hors établissement et si l’objet du contrat n’est pas dans le champ d’activité principale de l’entreprise.
                    Si ces trois conditions sont réunies, l'entreprise bénéficie d'un droit de rétractation de 14 jours de même que les consommateurs particuliers.
                    Pour faire valoir ce droit, le client devra répondre aux exigences légales et faire parvenir sa volonté de se rétracter par lettre recommandé avec avis de réception dans le délai de 14 jours, au cabinet de recrutement A RECRUIT en charge de son dossier.
                    <br></br>
                    <span className="bold"> INFORMATIQUE ET LIBERTES </span>: Les informations nécessaires à notre société pour traiter votre demande sont enregistrés dans notre fichier de gestion de la clientèle.
                    Vous pouvez exercer votre droit d’accès et de rectification auprès de notre service clientèle, contact@arecruit.com. 
                    Si vous ne souhaitez pas que ces données vous concernant soient transmises à nos partenaires à des fins de prospection commerciales merci de cocher cette case.

                    <br></br>
                    <span className="bold"> MEDIATION </span>: Pour tout litige afférent à l’exécution du présent contrat, le client, s’il est un « consommateur » au sens de l’article préliminaire du code de la consommation, est informé qu’il peut saisir le service médiation du réseau « A RECRUIT » soit par voie électronique, mediation@arecruit.com, soit par voie postal SAS A RECRUIT adresse {company_info.company_address+ ", "+ company_info.company_zip_code+" "+company_info.company_city+", "+company_info.company_country+". "}
                    En cas de litige, la législation applicable sera la loi Française, et la juridiction compétente sera celle où se situe le bureau du consultant en recrutement.

                </div>
            </div>

        </div>
    )
}
