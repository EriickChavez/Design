const {ApolloServer, gql, GraphQLUpload} = require('apollo-server-express');
const express = require('express')
const multer = require('multer');
const path = require('path')
const fs = require('fs');
const console = require('console');
const fetch = require('node-fetch');
const _FormData = require('formdata-node')
const typeDefs = gql`
  scalar Uploads

  type Query {
    _empty: String
    hello: String
  }
  type Mutation {
    uploadImage( file: Uploads ): String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "HOLA"
    },
  },
  Mutation: {
    uploadImage: async (_, {file},) => {
      // const f = file._parts[0][1]

      // file = {
      //   uri: 'file:///Users/eriickchavez/Library/Developer/CoreSimulator/Devices/03C6EC21-5F7E-42FB-832D-9F2DF2B63B49/data/Media/DCIM/100APPLE/IMG_0005.JPG',
      //   type: 'image/jpeg',
      //   name: 'picture-1610992012840'
      // }
      console.log(file)

      try {
        const response = await fetch('http://localhost:4000/uploadfile/', {
          method: 'post',
          headers:{
            contentType:false
          },
          body: JSON.stringify(file),
        });
        const json = await response.json();
        console.log(json);
      } catch (e) {
        console.log("error c", e.message)
      }

    },
  },
};
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination")
    cb(null, '/image');
  },
  filename: (req, file, cb) => {

    cb(null, file.name);
  }
});
let upload = multer({storage: storage});



const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const app = express()
server.applyMiddleware({app});
app.use(express.static('public'))

app.post('/uploadfile', upload.single('file'), (req, res, next) => {
  
  console.log("[body]", req.body)

  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error);
  }
  res.send(file);
});



app.listen({port: 4000}, () => {
  console.log(`🚀 Server ready at http://localhost/4000`);
});

