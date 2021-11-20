import React, { Component } from 'react'

export default class popup_layout extends Component {
    render() {
        return (
            <>
                <div className="popup-container">
                    snlknl:
                </div>
                <style jsx>
                    {`
                        .popup-container{
                            height: 100%;
                            min-height: 100vh;
                            width: 100%;
                            position: absolute;
                            top: 0;
                            right: 0;
                            left: 0;
                            background-color: rgba(24, 24, 24, 0.323);
                            z-index:400000;
                        }
                    `}
                </style>
            </>
        )
    }
}
