import React from 'react'
import Link from 'next/dist/client/link'

export default function wrap_list_layout(props) {
    /*
        @props : les paramêtres passés au composant
        @props.title : le titre à passer au composant comme proprité
        @props.linkForMore : lien de redirection vers une liste plus complête

        pour l'implémentation voir showçhide_layout dans components layouts
    */
    return (
        <div className="wrap_list_layout orientationV spaceBetween">
           {props.title && <div className="demandes_head">{props.title }</div>}
            <div className="demande_list w100 orientationH  wrap">
               {props.children}
            </div>
            {props.linkForMore && <div className="w100 orientationH fromRight">
                <Link href={props.linkForMore}><a>voir plus »</a></Link>
            </div>}
        </div>

    )
}
