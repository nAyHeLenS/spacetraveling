import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
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
    <main className={commonStyles.container}>
      <h1> {post.data.title}</h1>
    </main>
  )
}

export const getStaticPaths = async () => {
    const prismic = getPrismicClient({});
    const posts = await prismic.getByType('page');

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
  const response = await prismic.getByUID<any>('post', String(slug), {});
  // console.log(response)
    
  return {
    props: { response }
  }
};  
