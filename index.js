import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';

//Merge all files of folder types and resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import "dotenv/config";
import auth from './auth';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

import models from './models'


const app = express();

app.use(auth.checkHeaders);

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const server = new ApolloServer({ 
    schema,
    context: (req)=> ({
        models,
        SECRET: process.env.SECRET,
        user: req.req.user
    }),
});
server.applyMiddleware({ app });
app.use(graphqlUploadExpress());


mongoose.connect('mongodb://localhost:27017/instagram-clone', {useNewUrlParser: true, useCreateIndex: true,}).then(() => {
    console.log("Conectado a mongo");

    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    });
});