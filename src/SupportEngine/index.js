import React, { useState, useRef, useEffect } from "react";
import SupportWindow from "./SupportWindow/SupportWindow.js";
import Avatar from './avatar.js';


const SupportEngine = () => {

    const[visible, setVisible] = useState(false)
    const ref = useRef(null);

    function handleClickOutside (event){
        if(ref.current && !ref.current.contains(event.target)){
            setVisible(false);
        }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return (
        <div ref={ref}>
            <SupportWindow visible={visible} />
            <Avatar 
                onClick={ ()=>setVisible(true) }
                style={{ position: 'fixed', bottom: '24px', right: "24px"}}
            />
        </div>
    )
}

export default SupportEngine;

