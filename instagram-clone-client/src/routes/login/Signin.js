import React from 'react';
import { Divider, Form, Button, Icon, Message } from 'semantic-ui-react';

export default ({styles, handleClick, handleSubmit, handleChange, args, errors}) => {

    return(
    <div>
        <div style={styles.box}>
            <img style={styles.logo} src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" alt=""/>        
            <Form onSubmit={(e)=>handleSubmit(e, args)}>
                <Form.Field>
                    <Form.Input name="email" onChange={handleChange} placeholder="email o nombre de usuario" icon={<Icon name="check circle outline" size="large"/>}/>
                </Form.Field>
                <Form.Field>
                    <Form.Input name="password" onChange={handleChange} placeholder="Password" type="password" icon={<Icon name="times circle outline" size="large"/>}/>
                </Form.Field>
                <Button type="submit" fluid primary>Iniciar sesión</Button>
                <Divider horizontal> O </Divider>
                <Button color="facebook">
                    <Icon name="facebook"/> Iniciar sesión con facebook
                </Button>
                {
                    errors.length ? <Message negative header="Los siguientes errores:" list={errors.map(error => `[${error.path}] ${error.message}`)}/>: null
                }
            </Form>
        </div>  
        <div style={styles.box}>
            ¿No tienes una cuenta? <a href="s" onClick={handleClick}>Registrate</a>
        </div>  
    </div>
    )
}