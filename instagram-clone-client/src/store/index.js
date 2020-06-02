import React, { Component, createContext } from 'react';
import ActionTypes from './ActionTypes';
import reducer from './reducers';
import { ApolloConsumer } from 'react-apollo';

const {Provider, Consumer} = createContext()


class ContextStore extends Component{
   state={
      user:{},
      posts:[],
      dispatch: async action => {
        const response = await reducer(this.state, action, this.client)
        this.setState( response ) 
      }
   }

   client = null;

   render(){
      return (
         <Provider value={this.state}>
            <ApolloConsumer>{
               client => {
                  this.client = client;
                  return this.props.comp
               }
            }
            </ApolloConsumer>
         </Provider>
      )
   }
}

const WrapperConsumer = (Component) => {
   return (props) => {
     return (
       <Consumer>
         {context => <Component {...props} context={context} />}
       </Consumer>
     );
   };
 }

export default WrapperConsumer;
export {ActionTypes}
export {ContextStore}
