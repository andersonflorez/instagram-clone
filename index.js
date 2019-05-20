import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';

import mongoose from 'mongoose';

//Merge all files of folder types and resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

import models from './models'
const PORT = 3001;

const app = express();
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({ 
    schema,
    context: {
        models,
        user:{
            _id:1, username: "Anderson"
        }
    }
});
server.applyMiddleware({ app });


mongoose.connect('mongodb://localhost:27017/instagram-clone', {useNewUrlParser: true, useCreateIndex: true,}).then(() => {
    console.log("Conectado a mongo");

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`)
    });
});