import React, { useState } from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import Header from '../../../../../components/header/header'
import Link from 'next/link'

import Consultant_layout from '../../../../../components/layouts/consultant_layout'


export default function index() {




    const submitForm = (data) => {
        console.log(data);
    };
    return (
        <div>
            <Head>
                <title>A recruit | CV Thèque</title>
            </Head>

            <Consultant_layout
                position="gestionrecrutements"
            >
                <div >
                    <div>
                        <h1>Edition de facture</h1>
                    </div>

                    <form>
                        <label>Entreprise : </label><input type="text" />
                        <label>Consultant : </label><input type="text" />
                        <label>Facturé à:</label><input type="text" />
                        <label>Attn : </label><input type="text" />
                        <label>Téléphone : </label><input type="number" />
                        <label>Courriel : </label><input type="text" />
                        <label>Description de service : </label><input type="text" />
                        <label>Date de début : </label><input type="date" />
                        <label>Date de fin : </label><input type="date" />
                        <label>Description :</label><input type="text" />
                        <label>Heures : </label><input type="text" />
                        <label>Taux : </label><input type="text" />
                        <label>Montant total : </label><input type="date" />

                    </form>
                    <button>Envoyer</button>
                </div>
            </Consultant_layout>
        </div >
    )
}


export async function getServerSideProps({ req }) {

    const user_cookie = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

    if (user_cookie.me) {

        let data = []

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
            destination: "/auth/login?dest=consultant/",
        },
        props: { message: "redirect" },
    }
}
