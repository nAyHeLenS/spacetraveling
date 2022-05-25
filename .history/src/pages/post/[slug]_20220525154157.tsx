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
//  const content = post.data.content.reduce
//  buscar a quantidade de palavras de cada seção heading e body
  return (
    <>
      <Header />
      <img
       src='https://blog.4linux.com.br/wp-content/uploads/2018/04/Os-estudiosos-consideram-o-DevOps-como-um-termo-em-evolu%C3%A7%C3%A3o-e-que-n%C3%A3o-deve-ser-limitado.-e1523467724436.png'
       className={styles.banner} />
      
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <section className={styles.postContent}>
            <h2> O que é DevOps ? </h2>
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

          {
            post.data.content.map( content => {
              return (
                <article key={content.heading}>
                  <h2> {content.heading} </h2> 
                  <div className={styles.postContainer}
                  />
                </article>
              )
            })
          }

        </div>
     </main>

    </>
  )
}


export const getStaticPaths = async () => {
    // const prismic = getPrismicClient({});

    // nesse método usar o getByType
   
  /**
     const posts = await prismic.getByType('post', {
      page: 1
    });
 
  */
    return {
      paths: [],
      fallback: true
    }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient({});

  const { slug } = context.params

 
  // obrigatório usar getByUID
  const response = await prismic.getByUID('post', String(slug), {});
  // console.log(response)
    
  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body]
        }
      })
    },
  }

  console.log(post)

  return {
    props: {
      post, 
    }
  }
  
};  


