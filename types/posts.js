import { gql } from 'apollo-server';

export default gql`
    scalar Upload

    type Post{
        _id: ID!
        likedBy: [User],
        effect: String,
        by: User
        photo: String,
        comments: [Comment],
        createdAt: String
    }

    type Comment{
        user: User
        text: String
    }

    type Query{
        getPost(_id: ID!): Post!
    }

    type File{
        id: ID!
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input iBy{
        username: String!,
        thumbnail: String
    }

    input iPost{
        desc: String
        photo: String
        effect: String
    }

    type Mutation{
        createPost(post: iPost): Response!
        singleUpload (file: Upload!) : File!
    }

`;