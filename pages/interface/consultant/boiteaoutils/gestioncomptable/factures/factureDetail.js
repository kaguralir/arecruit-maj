
import axios from 'axios'
import React, { useState } from 'react'
import Head from 'next/head'
import Header from "../../../../../../components/header/header"
import Consultant_layout from "../../../../../../components/layouts/consultant_layout"
import { api } from "../../../../../api/api"

export default function factureDetail({ data }) {




    console.log("data facture is", data);


    return (
        <div>
            <Head>
                <title>A recruit | Facture</title>
            </Head>

            <Consultant_layout
                position="factures"

            >


                <div >

                    <h1>Facture Détail</h1>

                    <div className="facture-container">
                        <div className="facture-left">
                            <div className="facture-info-box">
                                <div className="facture-receipt">
                                    Facture pour l'entreprise <br /><span></span>
                                </div>
                                <div className="facture-entry">
                                    <i className="facture-icon-wallet" aria-hidden="true" />
                                    <p>Amount:<br /><span>$20.00 USD</span></p>
                                </div>
                                <div className="facture-entry">
                                    <i className="facture-icon-calendar" aria-hidden="true" />
                                    <p>Date:<br /><span>Nov 5</span></p>
                                </div>
                                <div className="facture-entry">
                                    <i className="facture-icon-star" aria-hidden="true" />
                                    <p>Issuer:<br /><span>Dribbble</span></p>
                                </div>
                                <div className="facture-entry">
                                    <i className="facture-icon-notebook" aria-hidden="true" />
                                    <p>Confirmation Nr:<br /><span>0YX123580219G</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="facture-right">
                            <div className="facture-content">
                                <div className="facture-header">
                                    <img src="https://i.ibb.co/HCtqnTM/O-wave-logo-vector.jpg" />
                                    <h4>Oct 18, 2015   08:30:57   PDT</h4>
                                </div>
                                <div className="facture-main">
                                    <h3>Dribbble Pro Account (1 year)</h3>
                                    <h5>Total: $20.00 USD</h5>
                                </div>
                                <div className="facture-message">
                                    <p>Hello Ennio,<br />You sent a payment of $20.00 USD to Dribbble (<a href="mailto:paypal@dribbble.com">paypal@dribbble.com</a>)</p>
                                    <h6>It may take a few moments for this<br />transaction to appear in your account.</h6>
                                </div>
                                <div className="facture-footer">
                                    <a href="#">www.paypal.com/help</a>
                                    <h6>Facture n°: 108165</h6>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </Consultant_layout>

        </div>
    )
}

export async function getServerSideProps({ query }) {

    let data = []
    console.log("query is", query.id);
    try {
        await axios.get(`${api}/getFactureById/${query.id}`
        ).then((reponse) => {
            console.log("data facture is", reponse.data);
            data = reponse.data
        })
    }
    catch (err) {
        console.log("eror data facture id is", err);
    }



    data = await { ...data }


    return {
        props: {
            data
        }
    }
}


