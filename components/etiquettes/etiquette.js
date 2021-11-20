import React, { Component } from 'react'
import Image from 'next/image'
import style from './etiquette.module.scss'

export default class Domaines extends Component {
    render() {
        return (
            <div className={style.global} style={this.props.style}>
                <div className={style.img}>
                    <Image  src={this.props.src} width={100} height={100} alt="image"/>
                </div>
                <div className={style.textZone}>
                    <div>{this.props.title1}</div>
                </div>
            </div>
        )
    }
}
