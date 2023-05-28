import React,{useState, useContext} from 'react'
import './popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import PetifyContext from '../../context/petifyContextApi/petifyContext'

export default function Popup(props) {

    const context = useContext(PetifyContext);

    if(context.Popup.show){
        setTimeout(() => {
            context.setPopupValue({show:false, message: "", type: "" });
        }, 2000);
    }

    return (
    
        context.Popup.show &&
        <div className={'popup_container'}>
            <div className={`content_box ${context.Popup.type}`} >
                <span>{context.Popup.message} </span>
            </div>
        </div>
    
  )
}
