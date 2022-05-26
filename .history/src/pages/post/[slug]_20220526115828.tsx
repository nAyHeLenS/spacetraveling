import { PrismicRichText } from '@prismicio/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic, { predicate } from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

// usar referencias do ignews

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

export default function Post( { post }: PostProps): JSX.Element {
//  const content = post.data.content.reduce
//  buscar a quantidade de palavras de cada seção heading e body
  console.log(post)
  return (
    <>
      <Header />
      <img
       src={post?.data.banner.url}
       className={styles.banner} />
      
     
    </>
  )
}


export const getStaticPaths = async () => {
   const prismic = getPrismicClient({});

   // nesse método usar o getByType
   
     const posts = await prismic.getByType('document.type.posts')
     console.log(posts)

     const paths = posts.results.map(post => {
       return {
         params: {
           slug: post.uid
         }
       }
     })
 
    return {
      paths: paths,
      fallback: true
    }
};

export const getStaticProps: GetStaticProps = async context => {
// export const getStacticProps; GetStaticProps = async context =>{} 
  const prismic = getPrismicClient({});

  const { slug } = context.params

  const response = await prismic.getByUID('uid', String(slug), {});
  //const response = await prismic.getByUID('post', String(slug), {});

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
      content: response.data.content.map((content: { heading: any; body: any; }) => {
        return {
          heading: content.heading,
          body: [...content.body]
        }
      })
    },
  }

  return {
    props: {
      post, 
    },
    revalidate: 5
  }
  
};  


/**
 const posts = await prismic.getByType('post', {
    page: 1
 });
*/

/**
  <main className={commonStyles.container}>
        <div className={styles.post}>
          <section className={styles.postContent}>
            <h1> {post.data.title} </h1>
            <ul>
              <li>
                <FiCalendar />
                24 My 2022
              </li>
              <li>
                <FiUser />
                {post.data.author}
              </li>
              <li>
                <FiUser />
                10 min
              </li>
            </ul>
          </section>

          {
            post?.data.content.map( (content) => {
              return (
                <article key={content?.heading}>
                  <h2> {content?.heading} </h2> 
                  <div className={styles.postContainer}
                   dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body),}}
                  />
                </article>
              )
            })
          }

        </div>
     </main>

*/