import React, { Component } from 'react'
import Head from 'next/head'
import Header from '../../../../components/header/header'
import Footer from '../../../../components/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const key = "AIzaSyBeM-wkqt3uIlMXGxnCHAvlsI8EBqXLOQI"

export function index() {
        
    const mapStyles = {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position:'relative'
    };

    var state = {
        consultant: {
            id:3,
            name:"Gherici DRISSI",
            email:"contact@gcdconseil.com"
        },
        company:{
            company_name:"GCD Conseil",
            img:"/images/partner/partner_audi.svg",
            rcs:"RCS de BESANCON",
            siret:"N° de SIRET 493 543 433 00061",
            ape:"Code APE 7022Z Conseil pour les Affaires",
            headquarter_adresse:"7 rue Albrecht DURER",
            headquarter_zip_code:"25000",
            headquarter_city:"Besançon",
            phone_number:"06 32 61 59 75",
            stats:{
                lastCa:18250,
                in_progress:2,
                closed:24,
                all:26,
                prospect:14,
                cvs:25987
            },
            location : {
                address: '1600 Amphitheatre Parkway, Mountain View, california.',
                pos:{
                    lat: 37.42216,
                    lng: -122.08427,
                }
            }
        }

    }

    const onMarkerClick = (props, marker, e) =>{
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        });
    }



    return (
        <>
            <Head>
                <title>A recruit | Consultant</title>
            </Head>

            <div className="consultant">
                <Header>
                    <li>
                        <Link href="/interface/consultant">
                            <a className="locate">
                                Dashboard
                            </a>
                        </Link>
                    </li>
                </Header>
                <div className="body ">
                    <div className="title center orientationV">
                        <span className="bold">{state.consultant.name}</span>
                        <div>Bienvenu sur votre compte collaborateur</div>
                    </div>

                    <div className="infos">
                        <div className="flex">
                            <Image className="info_img" src ={state.company.img} width={200} height={200}/>
                            <div className= "info">
                                <div><span>{state.company.company_name}</span></div>
                                <div><span>{state.consultant.name}</span></div>
                                <div>{state.company.rcs}</div>
                                <div>{state.company.siret}</div>
                                <div>{state.company.ape}</div>
                                <div>
                                    Siège social :
                                </div>
                                <div>{state.company.headquarter_adresse}</div>
                                <div>{state.company.headquarter_zip_code}</div>
                                <div>{state.company.headquarter_city}</div>
                                <div>Tel : {state.company.phone_number}</div> 
                                <div>Mail : {state.consultant.email}</div> 
                            </div>
                        </div>
                        <div className="maps">
                            <Map
                                style={mapStyles}
                                google={google}
                                zoom={14}
                                initialCenter={state.company.location.pos}
                            >
                                <Marker
                                    position={state.company.location.pos}
                                    onClick={onMarkerClick}
                                    name={'Kenyatta International Convention Centre'}
                                />
                               
                            </Map>
                        </div>

                    </div>
                    <div className="auto border">
                        <span>Fondé en 2010 par M. DRISSI Gherici Christophe</span>, le cabinet GCD Conseil était au départ, un cabinet spécialisé dans le conseil en affaire pour les professionnels, intervenant
                        principalement dans le cadre de : la création, la mise en place et le développement réseau, franchise, licence, concession, mandataires, …
                        En 2013, M. DRISSI décide d’enregistrer son cabinet en tant que centre de formation professionnel, intervenant dans les branches métier de : l’immobilier, la vente, la création
                        d’entreprises, le courtage.

                    </div>
                    <div className="w90 orientationH  spaceBetween">
                        <div className="btn">Publier</div>
                        <div className="btn">Éditer</div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )    
}
export default GoogleApiWrapper({
    apiKey: key
})(index);
