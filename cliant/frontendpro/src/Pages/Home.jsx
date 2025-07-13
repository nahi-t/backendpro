import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { appprovide } from "../App";
import AskQ from '../Qustion/AskQ';
import styles from './Home.module.css';

function Home() {
  const { user } = useContext(appprovide)
  
  return (
    <div className={styles.container}>
  <div className={styles.wrapper}>
    <div className={styles.header}>
      <Link to={"/seeq"} className={styles.button}>
        Ask a Question
      </Link>
      <h1 className={styles.title}>
        Welcome: <span className={styles.username}>{user.username}</span>
      </h1>
    </div>
    <div className={styles.card}>
    <AskQ />
    </div>
  </div>
</div>
  )
}

export default Home