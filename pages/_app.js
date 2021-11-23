import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/loading.scss'
import '../styles/globals.scss'
import '../styles/index.scss'
import '../styles/formulaire.scss'
import '../styles/recruteur.scss'
import '../styles/header.scss'
import '../styles/fileExplorer.scss'
import '../styles/members.scss'
import '../styles/consultant/consultant.scss'
import '../styles/consultant/consultant_formation.scss'
import '../styles/consultant/facture.scss'
import '../styles/consultant/cv-card/main.scss'

import '@brainhubeu/react-file-input/dist/react-file-input.css';

import Loading from '../components/loader/loader'


function MyApp({ Component, pageProps }) {
  return <Loading><Component {...pageProps} /></Loading>
}

export default MyApp
