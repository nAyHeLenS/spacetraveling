import styles from './header.module.scss'
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href='/'>
      <a className={styles.headerContent}>
        <img src="../../logo.svg" alt="logo" />
      </a>
     </Link>
    </header>
  )
}

// criar um component comment 
// export default class Comments extends Component {}
// import component from react | ler a documentação