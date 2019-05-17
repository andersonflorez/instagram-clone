import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schemas';
import resolvers from './resolvers';

const PORT = 3000;

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
});