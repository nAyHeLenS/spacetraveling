import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

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
  return (
    <h1> AQui vai o post </h1>
  )
}

export const getStaticPaths = async () => {
    const prismic = getPrismicClient({});
    const posts = await prismic.getByType('page');
    // const posts = await prismic.getByType('page');


//   // TODO
    return {
      paths: [
        { params: {...posts}}
      ],
      false: true
    }
};

export const getStaticProps = async ({ params }) => {

  const { slug } = params
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('post', String(slug), {});
  // console.log(response)
    
  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    banner: RichText.asText(response.data.subtitle),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    props: {
      post
    }
  }
  
};  

/**
 return {
    props: { response }
  }

*/

/**
 <main className={commonStyles.container}>
      <article className={styles.post}>
        
        <h1> {post.data.title} </h1>
        <time> {post.first_publication_date} </time>
      </article>
    </main> 
 
*/

/** 
 const post = {
    slug: response.uid,
    title: RichText.asText(response.data.title),
    banner: RichText.asText(response.data.subtitle),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }
*/


