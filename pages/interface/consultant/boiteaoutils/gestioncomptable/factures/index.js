import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../../../../../components/header/header'
import Footer from '../../../../../../components/footer/footer'
import Link from 'next/link'
import Consultant_layout from '../../../../../../components/layouts/consultant_layout'
import cookie from 'cookie'
import jwt_decode from 'jwt-decode'

export default function index() {

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
            destination: "/auth/login?dest=consultant/boiteaoutils",
        },
        props: { message: "redirect" },
    }
}
