import { Link } from 'react-router-dom'
import styles from './ThankYou.module.css'

export default function ThankYou() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✦</div>
        <h1 className={styles.title}>Thank you</h1>
        <p className={styles.message}>
          Your reflection has been received. Taking the time to revisit your birth
          experience is a meaningful act of care — for yourself and your story.
        </p>
        <Link to="/" className={styles.link}>← Back to home</Link>
      </div>
    </div>
  )
}
