import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Survey.module.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkovkojd'

const questions = [
  {
    id: 'unexpected',
    label: 'What was something that happened during your birth experience that you didn\'t expect?',
    type: 'textarea',
  },
  {
    id: 'wish_i_knew',
    label: 'What is something you wish you knew at the very beginning?',
    type: 'textarea',
  },
  {
    id: 'grateful_for',
    label: 'What is something you were grateful for during your birth experience?',
    type: 'textarea',
  },
  {
    id: 'never_forget',
    label: 'What is something you never want to forget about your experience?',
    type: 'textarea',
  },
  {
    id: 'for_the_child',
    label: 'What is something you want the child you delivered to know about their birth?',
    type: 'textarea',
  },
]

export default function Survey() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(id, value) {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        navigate('/thank-you')
      } else {
        const data = await res.json()
        setError(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Could not submit — please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Birth Reflection</h1>
        <p className={styles.subtitle}>Answer as much or as little as you like.</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={q.id} className={styles.question}>
            <label className={styles.label} htmlFor={q.id}>
              <span className={styles.questionNum}>{i + 1}</span>
              {q.label}
            </label>

            <textarea
              id={q.id}
              name={q.id}
              className={styles.textarea}

              rows={4}
              value={formData[q.id] ?? ''}
              onChange={e => handleChange(q.id, e.target.value)}
            />
          </div>
        ))}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={submitting}>
          {submitting ? 'Sending...' : 'Submit your reflection'}
        </button>
      </form>
    </div>
  )
}
