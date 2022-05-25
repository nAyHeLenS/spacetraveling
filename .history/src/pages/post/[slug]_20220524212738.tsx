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

export default function Post() {
  return (
    <main className={commonStyles.container}>
      
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

export const getStaticProps = async ({params }) => {

     const prismic = getPrismicClient({});
     const response = await prismic.getByUID('posts', 'string');
     // console.log(response)

//   // TODO
    return {
      props: { response }
    }
};  
