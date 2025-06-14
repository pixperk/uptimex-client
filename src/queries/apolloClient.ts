"use client"
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import { toast } from 'react-toastify';

const httpUrl: string = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:5000/graphql' :`${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/graphql`;
const wsUrl: string =  process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'ws://localhost:5000/graphql' :  `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/graphql`;

const httpLink: ApolloLink = createHttpLink({
  uri: httpUrl,
  credentials: 'include',
});

var noWebSocket : boolean = false
const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUrl,
    retryAttempts: 20,
    shouldRetry: () => true,
    on: {
      closed: () => {
        noWebSocket = true;
      },
      connected: () => {
        console.log('Client connected');
      },
    },
  })
);

if (noWebSocket) toast.error('WebSocket connection failed. Auto-Refresh will not work.');

const cache: InMemoryCache = new InMemoryCache();

let apolloPersistor: CachePersistor<NormalizedCacheObject> | null = null;

const initPersistorCache = async (): Promise<void> => {
  apolloPersistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
    debug: false,
    trigger: 'write',
  });
  await apolloPersistor.restore();
};

initPersistorCache();

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: split(isSubscription, wsLink, httpLink),
  cache,
  connectToDevTools: true, //false for production
});

function isSubscription({ query }: { query: any }): boolean {
  const definition = getMainDefinition(query);
  return (
    definition.kind === Kind.OPERATION_DEFINITION &&
    definition.operation === OperationTypeNode.SUBSCRIPTION
  );
}

export { apolloClient, apolloPersistor };
