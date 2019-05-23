import React, { Fragment, Component } from 'react';

import Toolbar from '../components/toolbar'
import Dropzone from '../components/dropzone'
import WrapperConsumer, { ActionTypes } from '../store';


class Home extends Component{
    componentDidMount() {
        const {user, dispatch } = this.props.context;
        if(!user || !user._id){
           dispatch({type: ActionTypes.GET_USER})
        }
     }

    render(){
        return (
            <Fragment>
                <Toolbar />
                <Dropzone/>
            </Fragment>
        );
    }
}

//export default graphql(query)(Home)
export default WrapperConsumer(Home)