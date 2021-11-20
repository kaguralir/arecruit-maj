import React, { useState, useEffect, useRef } from 'react'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import { api } from '../../../../api/api'
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRouter } from 'next/router'
import InputTag from "../../../../../components/competences/InputTag";



export default function gestionrecrutements({ data }) {

  const router = useRouter()
  const [company_info, setCompanyInfo] = useState([])
  const [job, setJob] = useState([])
  const [tags, setTags] = React.useState(["commercial", "négociation"]);
  const [newTitle, setTitle] = useState("");


  /*   const onAddTag = tag => {
      setTags([...tags, tag]);
    };
   */


  const componentRef = useRef();
  /*   const printFunc = () => {
      alert("here comes your print function");
    }; */
  /*   const printFunc = useReactToPrint({
  
      content: () => componentRef.current,
  
  
    }); */

  console.log("component ref is ", componentRef.current);
  /*   console.log(printFunc); */



  useEffect(() => {

    axios.post(`${api}/getCompanyInfoById`, {
      id: router.query.by
    }).then((reponse) => {
      setCompanyInfo(reponse.data);

    })

    axios.post(`${api}/getJobById`, {
      id: router.query.id
    }).then((reponse) => {
      setJob(reponse.data)
    })

    axios.delete(`${api}/deleteCompetence`, {
      id: router.query.id
    }).then((reponse) => {
      return;
    })
    // axios.put(`http://localhost:3080/updatejob`, {
    //   id: router.query.id
    // }).then((reponse) => {
    //   setJob(reponse.data)
    // })



  }, [])

  async function onAddTag(tag) {
    setTags([...tags, tag]);
    await axios.post(`${api}/createCompetences`, { job_id: router.query.id, competence1: tag }).then(
      (response) => {
        console.log('reponse added skill is', response);
        return;
      }
    );
  };



  const onDeleteTag = tag => {
    alert(`deleting ${tag}`);
    let remainingTags = tags.filter(t => {
      return t !== tag;
    });
    setTags([...remainingTags]);
  };



  const updateJob = (job_id) => {
    axios.put(`${api}/updatejob`, { job_title: newTitle, job_id: router.query.id }).then(
      (response) => {

        setJob(
          job.map((val) => {
            console.log(val.job_id);

            return val.job_id == job_id
              ? {

                job_id: val.job_id,
                job_title: newTitle
              }
              : val;
          })
        );
      }
    );
  };






  return (
    <>
      <Head>
        <title>A recruit | Consultant</title>
      </Head>

      <Consultant_layout
        position="gestion.recrutement"
      >

        <br></br>
        <div className="gestion-recrutement" ref={componentRef}>
          <div className="orientationH spaceBetween">
            <div>
              <label>Référence : {router.query.id}</label>
            </div>
            <div>
              <label className={"statut-" + router.query.type}>{router.query.type}</label>
            </div>
          </div>
          <br></br>
          <div className="form">

            <div className="champs orientationV">
              <div> Raison sociale : </div>
              <input type="text" placeholder={company_info.company_name} />
            </div>
            <div className="champs orientationV">
              <div> SIRET : </div>
              <input type="text" placeholder={company_info.company_siret} />
            </div>
            <div className="champs orientationV">
              <div> RCS de : </div>
              <input type="text" placeholder={company_info.company_rcs} />
            </div>

            <div className="champs orientationV">
              <div> Siège sociale : </div>
              <input type="text" placeholder={company_info.company_headquarters} />
            </div>
            <div className="champs orientationV">
              <div> Ville : </div>
              <input type="text" placeholder={company_info.company_city} />
            </div>
            <div className="champs orientationV">
              <div>  Code postal : </div>
              <input type="text" placeholder={company_info.company_zip_code} />
            </div>

            <div className="champs orientationV">
              <div>  Représentant : </div>
              <input type="text" placeholder={company_info.user_firstname + " " + company_info.user_name} />
            </div>
            <div className="champs orientationV">
              <div>  Qualité : </div>
              <input type="text" placeholder={company_info.company_representative_status} />
            </div>
            <div className="champs orientationV">
              <div>  Téléphone : </div>
              <input type="text" placeholder={company_info.company_phone_number} />
            </div>
            <div className="champs orientationV">
              <div>  Mail : </div>
              <input type="text" placeholder={company_info.company_email} />
            </div>

            <div className="champs orientationV">
              <div>  Activité : </div>
              <input type="text" placeholder={company_info.company_activity} />
            </div>
            <div className="champs orientationV">
              <div>  Masse salarial : </div>
              <input type="text" placeholder="- 50" />
            </div>


          </div>
          <br></br>


          <div className="form recrutement">
            <div className="title">
              <label>Recrutements</label>
            </div>
            <br></br>

            <div className="champs orientationV">
              <div> 1. Intitulé du poste :</div>
              <input type="text" placeholder={job.job_title} type="text"

                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="champs orientationV">
              <div> 2. Type de poste : </div>
              <input type="text" placeholder={job.job_type} />
            </div>
            <div className="champs orientationV">
              <div> 3. Type de contrat : </div>
              <input type="text" placeholder={job.job_contract_type} />
            </div>
            <div className="champs orientationV">
              <div> 4. Type de rémunération : </div>
              <input type="text" placeholder={job.job_remuneration} />
            </div>

            <div className="champs orientationV">
              <div> 6. Pays : </div>
              <input type="text" placeholder={job.job_country} />
            </div>
            <div className="champs orientationV">
              <div> 7. Departement: </div>
              <input type="text" placeholder={job.job_department} />
            </div>

            <div className="title">
              <label>Candidat</label>
            </div>

            <div className="champs orientationV">
              <div>  1. Expérience : </div>
              <input type="text" placeholder={job.job_required_experience} />
            </div>
            <div className="champs orientationV">
              <div>  2. Formation / Diplômes : </div>
              <input type="text" placeholder={job.job_required_grad} />
            </div>
            <div className="champs orientationV">
              <div>  3. Qualifications : </div>
              <input type="text" placeholder={job.job_required_level} />
            </div>
            <div className="champs orientationV">
              <div>  4. Permis : </div>
              <input type="text" placeholder="Exigé" />
            </div>
            <div className="champs orientationV">
              <div>  5. Vehicule : </div>
              <input type="text" placeholder="Exigé" />
            </div>
            <div className="title">
              <label>Autres compétences</label>
            </div>

            <div>
              <InputTag
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                defaultTags={tags}
                placeholder="enter tags separated by comma"
              />

              <div>Séparer les compétences avec une &lt;virgule&gt;ou la touche &lt;entrée&gt;</div>
            </div>

            <div className="title">
              <label>Renseignements complémentaires</label>
            </div>

            <textarea defaultValue={job.job_description} />
            <br></br>
            <div className="pdf_view_icon w100" title="Ouvrir">Fiche de poste</div>

            <br></br>
          </div>

          <div className="gerer-btn-zone">
            <div className="orientationH">

              <input className="btn" type="submit" defaultValue="Modifier" />

              <div className="btn"><ReactToPrint
                copyStyles={true}
                trigger={() => (
                  <div

                  >
                    Imprimer
                  </div>
                )}
                content={() => componentRef.current}
              /></div>

              <div className="btn" onClick={() => {
                updateJob(router.query.id);
              }}>Mettre à jour</div>


              <div className="btn"><Link href={{ pathname: "/interface/consultant/boiteaoutils/gestionrecrutements/editiondevis", query: { id: router.query.id, by: router.query.by, type: router.query.type } }}><a>Éditer un devis</a></Link></div>

              <div className="btn">
                <Link href={{ pathname: "/interface/consultant/boiteaoutils/gestionrecrutements/editioncontrat", query: { id: router.query.id, by: router.query.by, type: router.query.type } }}>
                  <a>Éditer un contrat</a>
                </Link>

              </div>
            </div>
          </div>

          <div className={"actions desabled-" + (router.query && router.query.type)}>
            <div className="btn w100">Rapprochement candidat</div>
            <div className="orientationH spaceBetween">

              {/*               <div className="btn" onClick={printFunc}>Imprimer</div>
 */}              <div className="btn" >Publier</div>
            </div>
            <div className="orientationH  spaceBetween">
              <div className="btn">Editer facture</div>
              <div className="btn">Editer relance</div>
            </div>
          </div>
        </div>
      </Consultant_layout>

    </>
  )

}

export async function getServerSideProps({ req }) {

  const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  if (user_cookie.me) {

    const user = jwt_decode(JSON.stringify(user_cookie))
    let data = []

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
