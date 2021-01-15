/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import  Container  from "./src/OpcionA/container/index";
// import  Container  from "./src/OpcionB/container/index";
import Container from './src/Picker/index';
import {ApolloProvider, InMemoryCache, ApolloClient} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';

const App: () => React$Node = () => {
  const client = new ApolloClient({
    link: createUploadLink({
      uri: 'http://localhost:3000/',
    }),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Container />
        </SafeAreaView>
      </ApolloProvider>
    </>
  );
};
export default App;
