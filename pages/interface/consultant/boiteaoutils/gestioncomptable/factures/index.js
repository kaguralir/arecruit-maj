import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../../../../../components/header/header'
import Footer from '../../../../../../components/footer/footer'
import Link from 'next/link'
import Consultant_layout from '../../../../../../components/layouts/consultant_layout'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { api } from '../../../../../api/api'
import router, { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

/* export default function index() {

    const [factures, setOffers] = useState([])

    useEffect(() => {

        setOffers([{ id: 1, entreprise: "GCD Conseil", poste: "Attaché commercial (H/F)" }, { id: 2, entreprise: "GCD Conseil", poste: "Attaché commercial (H/F)" }])

    }, [])


    return (
        <>
            <Head>
                <title>A recruit | Factures</title>
            </Head>

            <Consultant_layout
                position="factures"
            >
                <div className="Table">
                    <table>
                        <thead>
                            <tr>
                                <th>Entreprise</th>
                                <th>Poste</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factures.length !== 0 ? factures.map((element, index) => {
                                return (

                                    <tr key={index}>
                                        <td>{element.entreprise}</td>
                                        <td>{element.poste}</td>
                                        <td>
                                            <Link href={{ pathname: "/interface/consultant/boiteaoutils/gestioncomptable/factures/facture", query: { id: element.id } }}>
                                                <a>Gérer</a>
                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })
                                :
                                <tr>
                                    <td colSpan="3" className="empty_table">Aucune donnée disponible</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="row expanded">
                        <main className="columns">
                            <div className="inner-container">

                                <section className="row">
                                    <div className="callout large invoice-container">
                                        <table className="invoice">
                                            <tbody><tr className="header">
                                                <td className>
                                                    <img src="http://www.travelerie.com/wp-content/uploads/2014/04/PlaceholderLogoBlue.jpg" alt="Company Name" />
                                                </td>
                                                <td className="align-right">
                                                    <h2>Invoice</h2>
                                                </td>
                                            </tr>
                                                <tr className="intro">
                                                    <td className>
                                                        Hello, Philip Brooks.<br />
                                                        Thank you for your order.
                                                    </td>
                                                    <td className="text-right">
                                                        <span className="num">Order #00302</span><br />
                                                        October 18, 2017
                                                    </td>
                                                </tr>
                                                <tr className="details">
                                                    <td colSpan={2}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th className="desc">Item Description</th>
                                                                    <th className="id">Item ID</th>
                                                                    <th className="qty">Quantity</th>
                                                                    <th className="amt">Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="item">
                                                                    <td className="desc">Name or Description of item</td>
                                                                    <td className="id num">MH792AM</td>
                                                                    <td className="qty">1</td>
                                                                    <td className="amt">$100.00</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className="totals">
                                                    <td />
                                                    <td>
                                                        <table>
                                                            <tbody><tr className="subtotal">
                                                                <td className="num">Subtotal</td>
                                                                <td className="num">$100.00</td>
                                                            </tr>
                                                                <tr className="fees">
                                                                    <td className="num">Shipping &amp; Handling</td>
                                                                    <td className="num">$0.00</td>
                                                                </tr>
                                                                <tr className="tax">
                                                                    <td className="num">Tax (7%)</td>
                                                                    <td className="num">$7.00</td>
                                                                </tr>
                                                                <tr className="total">
                                                                    <td>Total</td>
                                                                    <td>$107.00</td>
                                                                </tr>
                                                            </tbody></table>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                        <section className="additional-info">
                                            <div className="row">
                                                <div className="columns">
                                                    <h5>Billing Information</h5>
                                                    <p>Philip Brooks<br />
                                                        134 Madison Ave.<br />
                                                        New York NY 00102<br />
                                                        United States</p>
                                                </div>
                                                <div className="columns">
                                                    <h5>Payment Information</h5>
                                                    <p>Credit Card<br />
                                                        Card Type: Visa<br />
                                                        •••• •••• •••• 1234
                                                    </p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>
                </div>
            </Consultant_layout>


        </>
    )
} */



const allfacture = ({ factures }) => {
    const router = useRouter()
    const [cookie, setCookie] = useCookies(["me"])
    const [facture, setFacture] = useState([])
    const [searchTerm, setSearchTerm] = useState("")



    const [user, setUser] = useState("");

    useEffect(() => {
        let data = cookie
        if (data.me) {

            let user = jwt_decode(JSON.stringify(data))
            console.log("user is", user);
            console.log("user id is", user.user_id);
            try {
                axios.get(`${api}/getFacturePerConsultant/${user.user_id}`).then((reponse) => {
                    setFacture(reponse.data);
                    console.log("data respons is", reponse.data);

                })

            }
            catch (err) {
                console.log("err is", err);
            }
        }
    }, [user.user_id])






    return (
        <div>
            <Head>
                <title>A recruit | Facture Thèque</title>
            </Head>

            <Consultant_layout
                position="factures"
            >
                <div className="cvtheque-container">
                    <div>
                        <h1>Liste de facture</h1>
                    </div>

                    <div className="App">
                        <input type="text" placeholder="Search..." onChange={(event) => { setSearchTerm(event.target.value) }} />
                        {facture.filter((val) => {
                            if (searchTerm == '') {
                                return (
                                    <div className="cvCards-container">

                                        <div id="card">
                                            <div id="content">
                                                <div id="title">
                                                    Candidat nom: {val.company_id}
                                                </div>
                                                <div id="title">
                                                    Candidat prénom: {val.consultant_id}
                                                </div>
                                                <div id="desc">
                                                    Travail recherché: {val.description}
                                                </div>

                                                <div id="info-box">

                                                    <button className="btn--pay"><Link href={"/interface/consultant/boiteaoutils/gestioncomptable/factures/" + val.facture_id} className="link-cv">Voir la facture</Link></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>)
                            }
                            else if (val.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || val.user_firstname.toLowerCase().includes(searchTerm.toLowerCase()) || val.searched_job1.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return (
                                    <div className="cvCards-container">

                                        <div id="card">
                                            <div id="content">
                                                <div id="title">
                                                    Candidat nom: {val.company_id}
                                                </div>
                                                <div id="title">
                                                    Candidat prénom: {val.consultant_id}
                                                </div>
                                                <div id="desc">
                                                    Travail recherché: {val.description}
                                                </div>


                                                <div id="info-box">

                                                    <button className="btn--pay"><Link href={"/interface/consultant/boiteaoutils/gestioncomptable/factures/" + val.facture_id} className="link-cv">Voir la facture</Link></button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>)
                            }
                        }).map((val, key) => {
                            return (
                                <div className="cvCards-container">

                                    <div id="card">
                                        <div id="content">
                                            <div id="title">
                                                Candidat nom: {val.company_id}
                                            </div>
                                            <div id="title">
                                                Candidat prénom: {val.consultant_id}
                                            </div>
                                            <div id="desc">
                                                Travail recherché: {val.description}
                                            </div>


                                            <div id="info-box">

                                                <button className="btn--pay"><Link href={"/interface/consultant/boiteaoutils/gestioncomptable/factures/" + val.facture_id} className="link-cv">Voir le CV en détail</Link></button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>
            </Consultant_layout>
        </div >
    )
}

export default allfacture;

export const getServerSideProps = async ({ req }) => {

    const user_cookie = cookie?.parse(req ? req.headers.cookie || "" : document.cookie)
    const user = jwt_decode(JSON.stringify(user_cookie))
    const response = await axios.get(`${api}/getFacturePerConsultant/${user.user_id}`);

    /*     console.log("response data is", response.data);
     */
    return {
        props: {
            factures: response.data

        }
    }
}

export async function getInitialProps({ query }) {
    return { query }
}