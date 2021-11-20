import Link from 'next/link'
import React, { Component } from 'react'

export default class Menu extends Component {


    render() {
        return (
            <>
                {(this.props.showHide || this.props.showHide ===undefined) && <div className="Menu_Consultant">
                    <div className="hover  orientationH">
                        {this.props.pos==="acceuil" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant">
                            <a className={this.props.pos==="acceuil"? "active" : ""}>
                                Acceuil
                            </a>
                        </Link>
                    </div>
                     <div className="hover  orientationH">
                        {this.props.pos==="moncompte" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/moncompte">
                        <a className={this.props.pos==="moncompte"? "active" : ""}>
                            Mon compte
                         </a>
                        </Link>
                    </div>
                     <div className="hover  orientationH">
                        {this.props.pos==="boite_a_outil" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/outils">
                        <a className={this.props.pos==="boite_a_outil"? "active" : ""}>
                            Boite à outil
                         </a>
                        </Link>
                    </div>
                     <div className="hover  orientationH">
                        {this.props.pos==="cv_theque" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/cv_theque">
                        <a className={this.props.pos==="cv_theque"? "active" : ""}>
                            Cv-thèque
                         </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="gestionrecrutements" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/gestionrecrutements">
                        <a className={this.props.pos==="gestionrecrutements"? "active" : ""}>
                            Gestion de mes recrutements
                         </a>
                        </Link>
                    </div>
                    
                     {/* <div className="hover  orientationH">
                        {this.props.pos==="compte_candidat" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/creer_candidat">
                        <a className={this.props.pos==="compte_candidat"? "active" : ""}>
                            Créer un compte candidat
                         </a>
                        </Link>
                    </div>
                     <div className="hover  orientationH">
                        {this.props.pos==="compte_client" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/creer_client">
                        <a className={this.props.pos==="compte_client"? "active" : ""}>
                            Créer un compte client
                         </a>
                        </Link>
                    </div> */}
                    <div className="hover  orientationH">
                        {this.props.pos==="formations" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/formations">
                        <a className={this.props.pos==="formations"? "active" : ""}>
                            Formations
                         </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="factures" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/factures">
                        <a className={this.props.pos==="factures"? "active" : ""}>
                            Factures
                         </a>
                        </Link>
                    </div>
                   
                     <div className="hover  orientationH">
                        {this.props.pos==="compte_resultat" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/compte_resultat">
                        <a className={this.props.pos==="compte_resultat"? "active" : ""}>
                            Compte résultat
                         </a>
                        </Link>
                    </div>
                    
                     <div className="hover  orientationH">
                        {this.props.pos==="reclamation" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/reclamations">
                        <a className={this.props.pos==="reclamation"? "active" : ""}>
                            Gestion Comptable
                        </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="statistiques" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/statistiques">
                        <a className={this.props.pos==="statistiques"? "active" : ""}>
                            Statistiques
                        </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="reclamation" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/reclamations">
                        <a className={this.props.pos==="reclamation"? "active" : ""}>
                            Place affaires
                        </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="reclamation" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/reclamations">
                        <a className={this.props.pos==="reclamation"? "active" : ""}>
                            Blog A Recruit
                        </a>
                        </Link>
                    </div>
                    <div className="hover  orientationH">
                        {this.props.pos==="reclamation" && <label> &rsaquo;</label>}
                        
                        <Link href="/interface/consultant/reclamations">
                        <a className={this.props.pos==="reclamation"? "active" : ""}>
                            Offres partenaires
                        </a>
                        </Link>
                    </div>
                </div>
                }
            </>
        )
    }
}

export const getServerSideProps = async ({query}) => {
    const dest = query.dest;
    return {
       props: { dest }
    }
}
