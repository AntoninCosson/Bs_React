import React from 'react';
import { useState } from 'react';
import loginStyles from '../styles/Login.module.css'
import { useDispatch, useSelector } from 'react-redux'; 
import { connect, logout } from '../reducers/user'; 
import { useRouter } from "next/router";


const Sign = ({onClose, type, onLoginSuccess}) => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 

    const sign = async () => {
        const bodyObj = type
        ? { username: userName, password }
        : { username: userName, password, name };
    
        const resp = await fetch(`http://localhost:3000/users/${type ? 'signin' : 'signup'}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
        });
    
        const data = await resp.json();
    
        if (data.result) {
        dispatch(connect({
            username: data.username,
            token: data.token,
            bestScore: data.bestScore,
            connected: true 
        }));
        close(false);
        router.push('/');
        if (onLoginSuccess) onLoginSuccess();
        console.log(data.bestScore);
        } else {
        alert(data.error);
        }
        console.log(data);
}

    

    return (
    <div className={loginStyles.body}>
        <div className={loginStyles.overlay}>
            <button className={loginStyles.close} onClick={onClose}>X</button>
            <div className={loginStyles.container}>

                <div className={loginStyles.ThisChairsign}>
                <img src="/EcrisIcon/chair.svg" alt="" height={40} style={loginStyles.ChairSign}/>
                </div>

                {type ? null : <input type="text" placeholder='name' value={name} className={loginStyles.input} onChange={(e) => setName(e.target.value) }/>}

                <input type="text" placeholder='userName' value={userName} className={loginStyles.input} onChange={(e) => setUserName(e.target.value) }/>
                <input type="password" placeholder='password' value={password} className={loginStyles.input} onChange={(e) => setPassword(e.target.value) }/>

                <button className={loginStyles.signin} onClick={() => sign()}>Sign {type ? 'in' : 'up'}</button>
            </div>
        </div>
    </div>
    );
};

export default Sign;