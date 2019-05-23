import {ActionTypes} from './'
import _orderBy from 'lodash/orderBy'
import queries from '../utils/queries'


export default async (state, action, client) => {
   console.log('Reducing:', action, client);
   switch(action.type){
      case ActionTypes.GET_USER:
         const {data: {me}} = await client.query({
            query: queries.query.me
         });


         return {user : me}
      
      case ActionTypes.CREATE_POST:
         const { desc, file, effect } = action.payload
         console.log(file);
            const { data } = await client.mutate({
               mutate: queries.mutation.singleUpload,
               variables: { file }
            });
            console.log(data);

            const URL = data.singleUpload.path;

         /*const responsePost = await client.mutate({
               mutate: queries.mutation.createPost,
               variables: {post: {desc, photo: URL, effect}}
            });

            console.log(responsePost);*/
         return {post: null}
      
      case ActionTypes.ADD_POST:
         return {posts: [...state.posts, {id:6, title:'Post 6'} ] } 
      
      case ActionTypes.GET_POSTS:
         const responseFilms = await fetch('https://swapi.co/api/films/?format=json')
         const films = await responseFilms.json()

         return {posts: _orderBy(films.results, ['episode_id'], ['asc']) }
      
     default:
       {}
   }
 }