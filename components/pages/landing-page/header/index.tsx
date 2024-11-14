import { Container } from '~/components/ui'
import styles from './header.module.css'
import { SearchInput } from '../searchinput'

export const Header = () => {
  return <div className={styles.header}>
    <Container>
       <SearchInput/>
    </Container>
  </div>
}