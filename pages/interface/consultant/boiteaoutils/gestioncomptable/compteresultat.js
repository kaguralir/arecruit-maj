/* import React, {useState,useEffect} from "react"

export default function gestionComptable(){
    const [name, setName] = useState();
    const [n, setN] = useState();
    const [n_minus, setNMinus] = useState();
    const [diff, setDiff] = useState();
    const [compta,setCompta]=useState([])

    useEffect(()=>{
        setCompta([{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"}])
    },[])

    const addRow=() => {
        setCompta([...compta,{name:name,n:n,n_minus:n_minus,diff:diff}])
        console.log(compta);
    }
    return (
        <div>   
            <div>
                <div>
                    <p>Ajouter une entrée</p>
                    <input placeholder='Exercice' onChange={(e) => setName(e.target.value)}/>
                    <input placeholder='N' onChange={(e) =>setN(e.target.value)}/>
                    <input pleceholder='N-1' onChange={(e) => setNMinus(e.target.value)}/>
                    <input placeholder='diff' onChange={(e) => setDiff(e.target.value)}/>
                    <input type="submit" onClick={(e) =>{e.preventDefault(); addRow()}} value="ajouter"/>
                    </div>
                <div>
                <p>Ajouter une sortie</p>
                <input/>
                <input/>
                <button>Ajouter</button>
                </div>
                <div>
                <button>Imprimer</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Exercice</th>
                        <th>N</th>
                        <th>N-1</th>
                        <th>Progression</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {
                        compta.map((data,index)=>{
                    
                            return (
                                <tr key={index}>
                                    <td >{data.name}</td>
                                    <td >{data.n}</td>
                                    <td >{data.n_minus}</td>
                                    <td >{data.diff}</td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
            </table>
        </div>
    );
} */

import React, { createContext, useContext, useEffect, useState } from 'react';
import Head from 'next/head'
import Consultant_layout from '../../../../../components/layouts/consultant_layout'
import CompteResultat from "./CompteResultat.json";



export default function compteresultat({ month }) {


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getMonthsForLocale(locale) {
        let format = new Intl.DateTimeFormat(locale, { month: 'long' })
        let months = []
        for (let month = 0; month < 12; month++) {
            let testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
            months.push(capitalizeFirstLetter(format.format(testDate)))
        }

        return months;
    }


    const months = getMonthsForLocale('fr-FR');





    /*     const { CompteResultat, findMonth } = useContext(GlobalContext);
    
        const [month, setMonth] = useState(1);
        useEffect(() => {
            findMonth(month)
        }, [month]);
    
     */



    return (
        <div>
            <Head>
                <title>A recruit | Compte résultat</title>
            </Head>

            <Consultant_layout
                position="cvtheque"
            >
                <div className="tableContainer">
                    <p>2021</p>

                    <table>

                        <thead>
                            <tr>
                                <th>{""}</th>



                                {months.map((month) =>
                                    <th>{month}</th>
                                )}
                                <th>Exercise à ce jour</th>

                            </tr>

                        </thead>

                        <tbody>



                            <tr>
                                <td><a href="#">Revenu d’intérêts (charge)</a></td>
                                {CompteResultat.map((compteresultats) =>
                                    <td><a href="#">{compteresultats.benefits}</a></td>
                                )}
                                {/*  <td><a href="#">020</a></td> */}


                            </tr>


                            <tr>
                                <td><a href="#">Bénéfice avant impôts</a></td>
                                {CompteResultat.map((compteresultats) =>
                                    <td><a href="#">{compteresultats.benefits}</a></td>
                                )}
                                <td><a href="#">12011</a></td>
                            </tr>

                            <tr>
                                <td><a href="#">Charge d’impôts</a></td>
                                {CompteResultat.map((compteresultats) =>

                                    <td><a href="#">{compteresultats.taxes}</a></td>
                                )}
                                <td><a href="#">12011</a></td>
                            </tr>


                            <tr>
                                <td><a href="#">Revenu net</a></td>
                                {CompteResultat.map((compteresultats) =>

                                    <td><a href="#">{compteresultats.month}</a></td>
                                )}
                                <td><a href="#">12011</a></td>


                            </tr>

                        </tbody>

                    </table>

                </div>
            </Consultant_layout>
        </div>


    );

}
