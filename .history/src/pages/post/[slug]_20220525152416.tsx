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

          <article>
            <h1> Entendendo o que um DevOps faz </h1>
            <p>
              Essa é uma <strong>carreira</strong> em constante crescimento e está presente
               na grande parte das 
               <a href='#'> empresas que utilizam da tecnologia </a>  
               na otimização de seus processos. Se você se interessa
               por tecnologia, provavelmente já ouviu falar sobre DevOps.
               <br></br>
              <br></br> 
              Com a transformação digital cada vez mais presente,
                 os consumidores se tornam mais exigentes, 
                 estão esperando cada vez mais agilidade
                 e eficiência ao adquirir produtos ou serviços.
                 A cultura DevOps surgiu nesse contexto, 
                 otimizando processos e fluxo de trabalho e 
                 oferecendo melhores experiências de usuário.

               <br></br>
               
               <br></br>
               Continue acompanhando este artigo e entenda o que é DevOps,
               para que serve um profissional dessa área e como ingressar
               da melhor maneira nessa carreira que está em alta no mercado.
            </p>
          </article>
        </div>
     </main>

    </>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
    // const prismic = getPrismicClient({});

    // nesse método usar o getByType
   /**
    const posts = await prismic.getByType('post', {
      page: 1
    });

    return {
      paths: posts,
      fallback: true
    }
  
   */
  
    return {
      paths: [],
      fallback: true
    }
};

export const getStaticProps: GetStaticProps = async context => {

  const { slug } = context.params
  const prismic = getPrismicClient({});
 
  // obrigatório usar getByUID
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


