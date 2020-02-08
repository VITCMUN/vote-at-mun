import React, { useState } from 'react';
import '../../styling/login.css';

const LoginForm = () => {
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('')
    const handleSubmit = e => {
        e.preventDefault();
        setTitle('');
        setPassword('');
    }
    return (
    <div className="login-page">
        <div className="form">
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" value={title} placeholder="username" required onChange={ e => setTitle(e.target.value)}/>
                <input type="password" value={password} placeholder="password" required onChange={e => setPassword(e.target.value)}/>
                <button>login</button>
            </form>
        </div>
    </div>
    );
}

export default LoginForm;