import axios from "axios"
import {api} from '../pages/api/api'

export async function getProfilesName() {
    
  const res = await fetch(`${api}/getAllCompany`)
  const companies = await res.json()
  return companies.map(company => {
    //console.log(company.company_name.replace(/\s+/g, '-').toLowerCase())
    return {
      params: {
        id: company.company_name.replace(/\s+/g, '-').toLowerCase(),
      }
    }
  })
}

export async function getCompanyData(id) {
  
  let profile=[];
  
  await axios.post(`${api}/getCompanyInfoByName`,{
    company_name:id,
  }).then((reponse)=>{
    profile= reponse.data
  })
  
  return {
    profile,
  }
}