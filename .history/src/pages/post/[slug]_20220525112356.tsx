import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string | null;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post( { post }: PostProps) {
  const content = post.data.content.reduce
  return (
    <main className={commonStyles.container}>
      <Header />

      <h1> AQui vai o post </h1>
        
    </main>
  )
}

export const getStaticPaths = async () => {
    const prismic = getPrismicClient({});
    // nesse método usar o getByType
    const posts = await prismic.getByType('post', {
      page: 1
    });


//   // TODO
    return {
      paths: posts,
      fallback: true
    }
};

export const getStaticProps = async ({ params }) => {

  const { slug } = params
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});
  // console.log(response)
    
  const post = {
    first_publication_date: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    slug: response.uid,
    
    
  }

  return {
    props: {
      post
    }
  }
  
};  

/**
 title: RichText.asText(response.data.title),
    banner: RichText.asText(response.data.subtitle),
*/