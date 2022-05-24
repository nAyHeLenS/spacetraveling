import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import Header from '../components/Header';

import { FiCalendar, FiUser } from 'react-icons/fi'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
    readTime: number;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

export default function Home({ postsPagination, preview}: HomeProps): ReactElement {
  return (
    <main className={styles.container}>
    <Header />

      <article className={styles.posts}>
        <h1>Como manter o foco nos estudos ?</h1>
        <p> Técnicas de estudo para se manter focado.</p>
        <ul>
          <li>
            <FiCalendar />
            24 My 2022
          </li>
          <li>
            <FiUser />
            Nayara Helen
          </li>
        </ul>


      </article>
    </main>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };



/**
 - git switch -c -> cria uma nova branch
 - git switch <nome da brancch> ->var para a branch escolhida
*/

/**
 return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
          readTime,
        },
      };
    });
 
*/