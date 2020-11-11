import React from 'react';
// import {axiosWithAuth} from '../utils/axiosWithAuth';
import axios from 'axios';

class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: ''
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials, 
                [e.target.name]: e.target.value
            },
            error:''
        })
    }

    login = e => {
        e.preventDefault();
        axios.post('/api/login', this.state.credentials)
            .then(req => {
                window.localStorage.setItem('token', req.data.payload);
                this.props.history.push('/protected')
                this.props.setLoggedIn(true);
            })
            .catch((err) => {
               console.log(err)
              });
          };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <label>UserName</label>
                    <input 
                        type='text'
                        name='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input 
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log In</button>
                </form>
                
            </div> 
        )
    }
}
export default Login;