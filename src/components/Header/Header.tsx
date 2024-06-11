import * as styles from './Header.module.css'
import {memo} from "react";
import Logo from "../ui-kit/Logo/Logo.tsx";

const Header =() => (
  <header className={styles.header}>
    <Logo />
  </header>
)

export default memo(Header);
