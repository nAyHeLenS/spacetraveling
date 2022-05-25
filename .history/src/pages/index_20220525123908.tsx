import { GetStaticProps } from 'next';
import { useState } from 'react';
import Header from '../components/Header';

import { FiCalendar, FiUser } from 'react-icons/fi'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import Link from 'next/link';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR/index.js';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  }
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
  // preview: boolean;
}

// ReactElement
export default function Home({ postsPagination }: HomeProps) {
  const formatedPosts = postsPagination.results.map( (post) => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
          'dd MMM yyyy', {
            locale: ptBR
          }
      )
    }
  } )

  // estado inicial dos posts | um array de post
  const [posts, setPosts] = useState<Post[]>(formatedPosts)
  const [nextPage, setNextPage] = useState(postsPagination.next_page)
  const [currentPage, setCurrentPaage] = useState(1)

  async function handleNextPage(): Promise<void>{
    if(currentPage !== 1 && nextPage ===null){
      return
    }

    const postsResults = await fetch(`${nextPage}`).then(response => response.json())
    console.log(postsResults)
    setNextPage(postsResults.next_page)
    setCurrentPaage(postsResults.page)

    const newPosts = 
  }


  return (
    <main className={commonStyles.container}>
    <Header />

      <article className={styles.posts}>

        {
          posts.map(post => (
              <Link href={`/post/${post.uid}`} key={post.uid} >
                <a className={styles.post}>
                  <h1> {post.data.title} </h1>
                  <p> {post.data.subtitle} </p>
                  <ul>
                    <li>
                      <FiCalendar />
                      {post.first_publication_date}
                    </li>
                    <li>
                      <FiUser />
                      {post.data.author}
                    </li>
                  </ul>
                </a>
            </Link>
          ))
        }

      <button
       type='button'
       onClick={handleNextPage}
       > carregar mais posts </button>
      </article>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
   const prismic = getPrismicClient({});
   const postsResponse = await prismic.getByType('posts', {
     pageSize: 1,

   });

  // console.log(postsResponse.results)

  const posts = postsResponse.results.map( (post) => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  }

   return {
     props: {
       postsPagination
     },
   }

}