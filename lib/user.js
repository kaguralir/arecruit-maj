import axios from "axios"
import {api} from '../pages/api/api'

export async function getProfilesName() {
    
    const res = await fetch(`${api}/getAllUsers`)
    const users = await res.json()
    return users.map(user => {
      return {
        params: {
          id: (user.user_id+"@"+user.user_name+"-"+user.user_firstname).replace(/\s+/g, '-').toLowerCase(),
        }
      }
    })
}

export async function getProfileData(id) {
  
  let profile=[];
  
  await axios.post(`${api}/getUserProfileInfo`,{
    id:id,
  }).then((reponse)=>{
    profile= reponse.data
  })
  
  return {
    profile,
  }
}