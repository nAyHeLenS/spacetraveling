import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser } from 'react-icons/fi';
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
//  const content = post.data.content.reduce
//  buscar a quantidade de palavras de cada seção heading e body
  return (
    <>
      <Header />
      <img src='../../../public/logo.svg' alt="banner" />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <section className={styles.postContent}>
            <h1> O que é DevOps ? </h1>
            <p> Entenda o que faz o profissional e o que é preciso para se destacar na carreira. </p>
            <ul>
              <li>
                <FiCalendar />
                24 My 2022
              </li>
              <li>
                <FiUser />
                Digital House
              </li>
              <li>
                <FiUser />
                10 min
              </li>
            </ul>
          </section>

          <article>
            <h1> Entendendo o que um DevOps faz </h1>
            <p>
              Essa é uma <strong>carreira</strong> em constante crescimento e está presente
               na grande parte das 
               <a href='#'>empresas que utilizam da tecnologia</a> 
               na otimização de seus processos. Se você se interessa
                por tecnologia, provavelmente já ouviu falar sobre DevOps.
            </p>
          </article>
        </div>
     </main>
    </>
  )
}

/** 

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
    data: {
      title: RichText.asText(response.data.title),
    }
    
    
  }

  return {
    props: {
      post
    }
  }
  
};  
*/

/**
 title: RichText.asText(response.data.title),
 banner: RichText.asText(response.data.subtitle),
*/