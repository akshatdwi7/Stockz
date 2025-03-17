import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://kirganik.us-east-a.ibm.stepzen.net/api/loopy-gerbil/__graphql',
    cache: new InMemoryCache(),
    headers:{
        Authorization: 'Apikey kirganik::local.net+1000::2483a4ffc222653be73aca88548f328d00cbc0a082914b9c3fb415d5399a7536'
    }
    
  });
  export default client;