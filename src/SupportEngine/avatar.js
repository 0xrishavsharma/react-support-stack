import React, { useState } from 'react';
import { styles } from './styles';
import "./../index.scss";

const Avatar = (props) => {

  const[hovered, setHovered] = useState(false)
  return (
    <div style={props.style}>
        <div
            className='transition-3'
            style={{
              ...styles.avatarHello,
              ...{opacity: hovered ? '1' : '0'}
            }}
        > 
          Hi, it's Rishav
        </div>
        <div className='transition-3'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => props.onClick && props.onClick()}
          style={{ 
            ...styles.chatWithMeButton,
            ...{border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0'}
            }}
        />
    </div>
  )
}

export default Avatar;