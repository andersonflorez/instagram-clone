import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
   likedBy: {
       type: [],
       default: []
   },
   by:{
       type: {},
       required: true
   },
   desc: String,
   photo: String,
   comments: {
       type: [],
       default: []
   },
   createdAt: {
       type: String,
       default: new Date
   }

});

const postModel = mongoose.model('Post', postSchema);

export default postModel;