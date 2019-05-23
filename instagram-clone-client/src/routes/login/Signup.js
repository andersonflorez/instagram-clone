import React from 'react';
import { Divider, Form, Button, Icon, Message } from 'semantic-ui-react';
import _find from 'lodash/find'

export default ({styles, handleClick, handleSubmit, handleChange, args, errors}) => {

    return(
    <div>
        <div style={styles.box}>
            <img style={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" alt=""/>        
            <h4>Registrate para ver fotos y videos de tus amigos.</h4>
            <Form onSubmit={(e)=>handleSubmit(e, args)}>
                <Button color="facebook">
                    <Icon name="facebook"/> Iniciar sesión con facebook
                </Button>
                <Divider horizontal> O </Divider>
                <Form.Field>
                    <Form.Input name="email" onChange={handleChange} placeholder="Email" icon={!errors.length ? null : _find(errors, {path: 'email'}) ? <Icon name="times circle outline" size="large"/> : <Icon name="check circle outline" size="large"/>}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input name="fullname" onChange={handleChange} placeholder="Nombre completo" icon={!errors.length ? null : _find(errors, {path: 'fullname'}) ? <Icon name="times circle outline" size="large"/> : <Icon name="check circle outline" size="large"/>}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input name="username" onChange={handleChange} placeholder="Nombre de usuario" icon={!errors.length ? null : _find(errors, {path: 'username'}) ? <Icon name="times circle outline" size="large"/> : <Icon name="check circle outline" size="large"/>}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input name="password" onChange={handleChange} type="password" placeholder="Password" icon={!errors.length ? null : _find(errors, {path: 'password'}) ? <Icon name="times circle outline" size="large"/> : <Icon name="check circle outline" size="large"/>}/>
                </Form.Field>
                <Button 
                    type="submit" 
                    disabled={!args.email || !args.fullname || !args.username || !args.password}
                    fluid 
                    primary>
                    Registrar
                </Button>
                {
                    errors.length ? <Message negative header="Los siguientes errores:" list={errors.map(error => `[${error.path}] ${error.message}`)}/>: null
                }
            </Form>
        </div>  
        <div style={styles.box}>
            ¿Ya tienes una cuenta? <a href="a" onClick={handleClick}>Iniciar sesión</a>
        </div>  
    </div>
    )
}