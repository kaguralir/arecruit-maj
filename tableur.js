import React, {useState} from "react"

export default function gestionComptable(){
    const [name, setName] = useState();
    const [n, setN] = useState();
    const [n_minus, setNMinus] = useState();
    const [diff, setDiff] = useState();

    var compta =[{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"},{name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"l1-C4"}]
    const setCompta=() => {compta = [...compta, {name:"L1-C1",n:"L1-C2",n_minus:"L1-C3",diff:"new"}];console.log(compta);}
    return (
        <div>   
                <div>
                <div>
                <p>Ajouter une entrée</p>
                <input placeholder='Exercice' onChange={(e) => setName(e.target.value)}></input>
                <input placeholder='N' onChange={(e) =>setN(e.target.value)}></input>
                <input pleceholder='N-1' onChange={(e) => setNMinus(e.target.value)}></input>
                <input placeholder='diff' onChange={(e) => setDiff(e.target.value)}></input>
                <button onclick={() => setCompta()}>Ajouter</button>
                </div>
                <div>
                <p>Ajouter une sortie</p>
                <input></input>
                <input></input>
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
                                <tr >
                                    <td key={index}>{data.name}</td>
                                    <td key={index}>{data.n}</td>
                                    <td key={index}>{data.n_minus}</td>
                                    <td key={index}>{data.diff}</td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
            </table>
        </div>
    );
}