import React from 'react';
import { Grid } from 'semantic-ui-react'; 

import queries from '../utils/queries'

//components
import Signin from './login/Signin';
import Signup from './login/Signup';
import LostPassword from './login/LostPassword';

import { graphql, compose } from 'react-apollo';

const styles={
    grid:{
        height:'100%',
        width: '900px',
        margin: '0 auto'
    },
    box:{
        backgroundColor: 'white',
        border: '1px solid #e6e6e6',
        textAlign: 'center',
        marginBottom: '1em',
        padding: '1em'
    },
    logo:{
        width:'90%'
    }
}

class Login extends React.Component{
    state={
        showLogin:true,
        showRegister:false,
        showLostPassword:false,
        argsSignup: {},
        errorSignup: [],
        argsSignin: {},
        errorSignin: []
    }

    showRegister = (e) => {
        e.preventDefault();
        this.setState({showLogin: false, showRegister: true, showLostPassword: false});
    }

    showLogin = (e) => {
        e.preventDefault();
        this.setState({showLogin: true, showRegister: false, showLostPassword: false});
    }

    handleLogin = async (e, args)=>{
        e.preventDefault();
        const response = await this.props.login({
            variables: args
        });
        
        const {errors, success, token} = response.data.login;

        if(!success){
            this.setState({errorSignin: errors})
        }else{
            localStorage.setItem("token", token);
            this.props.history.push("/");
        }
    }

    handleRegister = async (e, args)=>{
        e.preventDefault();

        const response = await this.props.createUser({
            variables: args
        });
        
        const {errors, success} = response.data.createUser;

        if(!success){
            this.setState({errorSignup: errors})
        }else{
            this.props.history.push("/");
        }
    }

    handleChangeLogin = (e, input) => {
        const argsSignin = this.state.argsSignin;
        argsSignin[input.name] = input.value;
        this.setState({argsSignin});
    }

    handleChange = (e, input) => {
        const argsSignup = this.state.argsSignup;
        argsSignup[input.name] = input.value;
        this.setState({argsSignup});
    }

    render(){
        const {showLogin, showRegister, showLostPassword, argsSignup, errorSignup, argsSignin, errorSignin} = this.state;
        return (
          <Grid columns={2} centered verticalAlign="middle" style={styles.grid}>
              <Grid.Row>
                  <Grid.Column>
                      <img src="https://cdn.pixabay.com/photo/2013/07/13/10/22/smartphone-157082_960_720.png" alt=""/>
                  </Grid.Column>
                  <Grid.Column>
                    { showLogin && <Signin styles={styles} handleClick={this.showRegister} handleSubmit={this.handleLogin} handleChange={this.handleChangeLogin} args={argsSignin} errors={errorSignin}/> }
                    { showRegister && <Signup styles={styles} handleClick={this.showLogin} handleSubmit={this.handleRegister} handleChange={this.handleChange} args={argsSignup} errors={errorSignup}/> }
                    { showLostPassword && <LostPassword styles={styles}/> }
                  </Grid.Column>
              </Grid.Row>
          </Grid>
        );
    }
}

export default compose(
    graphql(queries.mutation.createUser, {name: "createUser"}),
    graphql(queries.mutation.login, {name: "login"}),
)(Login);