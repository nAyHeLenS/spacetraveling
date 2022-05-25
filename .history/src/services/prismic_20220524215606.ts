import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import { access } from 'fs';

import sm from '../../sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

export interface PrismicConfig {
  req?: HttpRequestLike;
}


export function linkResolver(doc){
  switch (doc.type){
    case 'posts':
      return `/${doc.uid}` // ou posts / post
    default:
      return null
  }
}



export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(endpoint,
    ...config,
    accessToken: prismic.env.PRISMIC_ACCESS_TOKEN
    );

  enableAutoPreviews({
    client,
    req: config.req,
  })

  return client;
}
