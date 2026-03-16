import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  return (
    <div className={styles.page}>
      <div className={styles.petals}>
        <span className={styles.petal} />
        <span className={styles.petal} />
        <span className={styles.petal} />
      </div>

      <main className={styles.content}>
        <p className={styles.eyebrow}>a space to reflect</p>
        <h1 className={styles.title}>Birth Reflection</h1>
        <p className={styles.subtitle}>
          Your birth story matters. This short survey is an invitation to pause,
          look back, and honor the experience you went through — in your own words,
          at your own pace.
        </p>
        <Link to="/survey" className={styles.button}>
          Begin the survey
        </Link>
        <Link to="/timeline" className={styles.secondaryLink}>
          or create a birth timeline →
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>Take your time. There are no right answers.</p>
      </footer>
    </div>
  )
}
