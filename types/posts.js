import { gql } from 'apollo-server';

export default gql`
    type Post{
        _id: ID!
        likedBy: [UserShort],
        desc: String,
        by: UserShort
        photo: String,
        comments: [UserShort],
        createdAt: String
    }

    type Query{
        getPost(_id: ID!): Post!
    }

    input iBy{
        username: String!,
        thumbnail: String
    }

    input iPost{
        desc: String,
        photo: String,
    }

    type Mutation{
        createPost(post: iPost): Post!
    }

`;