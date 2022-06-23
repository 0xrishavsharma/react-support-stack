import React, { useState } from 'react';
import { styles } from "../styles";
import { LoadingOutlined } from '@ant-design/icons';
import Avatar from "../avatar";
import axios from 'axios';

const EmailForm = (props) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    function getOrCreateUser(callback){
        axios.put(
            "https://api.chatengine.io/users/",
            {
                    "username": email,
                    "secret": email,
                    "email": email,
            },
            {
                headers: {"Private-key": process.env.REACT_APP_CE_PRIVATE_KEY}
            }
            .then( r => callback(r.data))
            
            )
    }
    
    function getOrCreateChat(callback){
        axios.put(
            "https://api.chatengine.io/chats/",
            {
                "usernames": ["adam_la_morre", email],
                "is_direct_chat": true
            },
            {
                headers: {"Private-key": process.env.REACT_APP_CE_PRIVATE_KEY}
            }
            .then( r => callback(r.data))
            )
    }

    function handleSubmit(event){
        event.preventDefault();
        setLoading(true);
        console.log("Sending email", email)

        getOrCreateUser(
            user => {
                getOrCreateChat(
                    chat => console.log('Success', chat)
                )
            }
        )
    }


  return (
    <div
        style={{
            ...styles.emailFormWindow,
            ...{
                height: "100%",
                opacity: "1",
            }
        }}
    >
    <div style={{ height: '0px' }}>
        <div style={ styles.stripe }/>
    </div>

    <div className='transition-5'
        style={{ 
            ...styles.loadingDiv,
            ...{
                zIndex: loading ? '10' : '-1',
                opacity: loading ? "0.33" : "0"
            }
         }}
    />

    <LoadingOutlined 
        className='transition-5'
        style={{
            ...styles.loadingIcon,
            ...{
                zIndex: loading ? '10' : '-1',
                opacity: loading ? '1' : '0',
                fontSize: '82px',
                top: 'calc(50% - 41px)',
                left: 'calc(50% - 41px)',
            }
        }}
    />

    <div
        style={{
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            textAlign: 'center'}}
    >
        <Avatar 
            style={{
                position: 'relative',
                top: '10%',
                left: 'calc(50% - 41px)'
            }}
        />

        <div style={styles.topText}>
            Welcome to Raffle Stack <br/> Support
        </div>

        <form onSubmit={(e) => handleSubmit(e)}
            style={{ 
                position: 'relative', 
                width: '100%',
                top: '19.75%'
                }}
        >
            <input 
                style={styles.emailInput}
                type="email" 
                onChange={ e => setEmail(e.target.value)}
                placeholder="Your email"
                />
        </form>
        <div style={styles.bottomText}>
            Enter your email <br /> to get started
        </div>

    </div>

    </div>
  )
}

export default EmailForm;