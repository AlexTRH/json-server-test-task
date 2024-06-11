import {memo} from "react";
import * as styles from './Main.module.css'

interface MainProps {
  children: React.ReactNode
}

const Main = ({ children }: MainProps) => (
  <main className={styles.main}>
    <div className={styles.container}>
      {children}
    </div>
  </main>
)


export default memo(Main)
