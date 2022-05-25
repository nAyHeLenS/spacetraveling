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
  return <h1> ola </h1>
}

export const getStaticPaths = async () => {
    const prismic = getPrismicClient({});
    const posts = await prismic.getByType('posts');

//   // TODO
    return {
      props: posts
    }
};

export const getStaticProps = async ({params }) => {

     const prismic = getPrismicClient({});
     const response = await prismic.getByUID('post', 'o-que-e-reactnative', {
       fetchLinks: 'author.author_name'
     });
     console.log(response)

//   // TODO
    return {
      props: { response }
    }
};  
