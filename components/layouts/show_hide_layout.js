import React ,{useState,useEffect} from 'react'


export default function show_hide_layout(props) {
    
    const [show_todo, set_show_todo] = useState(false);
   // console.log(  show_todo+" and "+props.show_hide )
    let show_hide = 
    useEffect(()=>{

        if(props.show_hide === true){
            set_show_todo(true)
        }else{
            set_show_todo(false)
        }

    
    },[props.show_hide])

    const show_or_hide = () => {

        set_show_todo(!show_todo)

        if(props.show_hide && props.callback){
            props.callback(!show_todo)
        }

    }


    return (
        <div>
            {/* ZONE A DEROULER #TERMINER INSCRIPTION */}

            <div className="show_hide_layout orientationV center">
                        
                {/* ENTËTE DE LA ZONE DEROULANTE */}
                <div className="head w100 orientationH spaceBetween center" onClick={()=>show_or_hide()}>
                    <div className="demandes_head text center">{props.title}</div>
                    <div className="direction_arrow_z orientationH fromRight center">
                        {props.statut && <div className={"button sh_button"+(props.statut ==="A TERMINER" ? " unfinished " : " finished ") + (!show_todo? " " : " bottom5")}>{props.statut}</div>}
                        <div><p><i className={"direction_arrow" + (!show_todo? " down" : " up")}></i></p></div>                          
                    </div>
                </div>

                {/* FORMULAIRE */}
                <form encType="multipart/form-data">

                    {(show_todo ||  props.show_hide)  && (
                        
                        <div className="w100">{props.children}</div>

                    )}
                </form>

            </div>
        </div>
    )
}
