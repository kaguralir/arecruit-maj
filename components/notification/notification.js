import React, { Component } from 'react'

export default class notification extends Component {
    render() {
        return (
            <>
                <div className="orientationV notification center">
                    <div className="w100 not_text_zone">
                        <div className="not_text orientationH">
                            <div className="not_icon"></div>
                            <div>
                                <div>{this.props.text}</div>
                                <div>{this.props.date}</div>       
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`

                        .not_head{
                            cursor:pointer;
                            width: 95%;
                            display: flex;
                            justify-content: flex-end;
                        }
                        .notification{
                            cursor: pointer;
                            margin: 1em auto;
                            width: 100%;
                            border-bottom: 1px solid #ccc;
                            min-height: 50px;
                            text-align: left;
                            padding-bottom: 1em;
                        }

                        .not_text_zone{
                            padding: 1em;
                        }
                        .not_icon{
                            background-image: url('/images/icon_info.png');
                            background-position: top;
                            background-repeat: no-repeat;
                            background-size: 10px;
                            padding-left: 20px;
                            margin-top: 5px;
                        }
                        .not_text{
                            

                        }
                    
                    `}
                </style>
            </>
        )
    }
}
