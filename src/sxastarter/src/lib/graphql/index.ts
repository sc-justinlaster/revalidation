/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss/graphql';
import config from '../../temp/config';

export interface RevalidationGraphQLClient {
  request(query: string): void;
}

export class RevalidationGraphQLClient {
  graphQLRequestClient: GraphQLRequestClient;

  constructor() {
    this.graphQLRequestClient = this.getGraphQLClient();
  }

  request(query: string): Promise<any> {
    return this.graphQLRequestClient.request(query);
  }

  getGraphQLClient(): GraphQLRequestClient {
    return new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });
  }
}

export const revalidationGraphQLClient = new RevalidationGraphQLClient();
