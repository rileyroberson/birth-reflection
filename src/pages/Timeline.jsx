import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Timeline.module.css'

let _id = 1
function makeEvent() {
  return { id: _id++, time: '', description: '' }
}

export default function Timeline() {
  const [babyName, setBabyName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [events, setEvents] = useState([makeEvent(), makeEvent(), makeEvent()])

  function addEvent() {
    setEvents(prev => [...prev, makeEvent()])
  }

  function removeEvent(id) {
    setEvents(prev => prev.length > 1 ? prev.filter(e => e.id !== id) : prev)
  }

  function updateEvent(id, field, value) {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  function handleGeneratePDF() {
    const filled = events
      .filter(e => e.time || e.description.trim())
      .sort((a, b) => a.time.localeCompare(b.time))

    const win = window.open('', '_blank', 'width=800,height=900')
    if (!win) {
      alert('Please allow pop-ups to generate the PDF.')
      return
    }
    win.document.write(buildPrintHTML(filled, babyName, birthDate))
    win.document.close()
    win.focus()
    win.print()
    win.onafterprint = () => win.close()
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Home</Link>
        <h1 className={styles.title}>Birth Timeline</h1>
        <p className={styles.subtitle}>
          Add each moment of your birth story. We'll arrange them into a keepsake timeline you can save as a PDF.
        </p>
      </header>

      <div className={styles.metaRow}>
        <div className={styles.metaField}>
          <label className={styles.metaLabel}>Baby's name</label>
          <input
            type="text"
            className={styles.metaInput}
            value={babyName}
            onChange={e => setBabyName(e.target.value)}
            placeholder="optional"
          />
        </div>
        <div className={styles.metaField}>
          <label className={styles.metaLabel}>Birth date</label>
          <input
            type="date"
            className={styles.metaInput}
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.columnLabels}>
        <span className={styles.timeLabel}>Time</span>
        <span className={styles.descLabel}>Moment</span>
      </div>

      <div className={styles.events}>
        {events.map(event => (
          <div key={event.id} className={styles.eventRow}>
            <input
              type="time"
              className={styles.timeInput}
              value={event.time}
              onChange={e => updateEvent(event.id, 'time', e.target.value)}
            />
            <input
              type="text"
              className={styles.descInput}
              value={event.description}
              onChange={e => updateEvent(event.id, 'description', e.target.value)}
              placeholder="What happened at this moment..."
            />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeEvent(event.id)}
              aria-label="Remove this moment"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.addBtn} onClick={addEvent}>
          + Add moment
        </button>
        <button type="button" className={styles.generateBtn} onClick={handleGeneratePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  )
}

function fmt12(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function buildPrintHTML(events, babyName, birthDate) {
  const titleLine = babyName ? `${babyName}'s Birth Timeline` : 'Birth Timeline'
  const dateStr = birthDate
    ? new Date(birthDate + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : ''

  // Cycle through the site's three pastel accent colors
  const colors = ['#e8b4c5', '#b8d4c8', '#c5b8d4']

  const eventsHTML = events.length === 0
    ? `<p style="color:#9a7a7a;font-style:italic;text-align:center;padding:2rem 0;">No moments recorded yet.</p>`
    : events.map((e, i) => {
        const color = colors[i % colors.length]
        const badgeLeft = i % 2 === 0  // even: badge on left, content on right

        const badge = `<div style="display:inline-block;background:${color};color:#fff;border-radius:50px;padding:0.45rem 1.2rem;font-size:0.85rem;font-family:Georgia,serif;letter-spacing:0.03em;white-space:nowrap;">${fmt12(e.time) || '—'}</div>`

        const content = `<p style="color:#5a4040;font-size:0.95rem;line-height:1.65;margin:0;font-family:Georgia,serif;">${e.description}</p>`

        return `
          <div style="display:flex;align-items:center;min-height:100px;">
            <div style="flex:1;text-align:right;padding-right:1.75rem;">
              ${badgeLeft ? badge : content}
            </div>
            <div style="flex-shrink:0;width:15px;height:15px;border-radius:50%;background:${color};border:3px solid #fdf6f0;position:relative;z-index:1;"></div>
            <div style="flex:1;text-align:left;padding-left:1.75rem;">
              ${badgeLeft ? content : badge}
            </div>
          </div>`
      }).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${titleLine}</title>
  <style>
    *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: #fdf6f0;
      color: #5a4040;
      font-family: Georgia, serif;
      line-height: 1.7;
    }
    .page {
      max-width: 620px;
      margin: 0 auto;
      padding: 4rem 2rem 5rem;
    }
    .timeline {
      position: relative;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(to bottom, #f5dce5, #e4dff0, #f5dce5);
      transform: translateX(-50%);
      z-index: 0;
    }
    @media print {
      html, body { background: #fff; }
      .page { padding: 2rem 1.5rem 3rem; }
      .timeline::before { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="page">
    <div style="text-align:center;margin-bottom:3.5rem;padding-bottom:2.5rem;border-bottom:1.5px solid #f0dce8;">
      <p style="color:#c5b8d4;font-size:0.7rem;letter-spacing:0.22em;text-transform:uppercase;margin-bottom:1rem;">a record of arrival</p>
      <h1 style="font-weight:normal;font-size:2.2rem;color:#5a4040;letter-spacing:0.02em;margin-bottom:0.5rem;">${titleLine}</h1>
      ${dateStr ? `<p style="color:#9a7a7a;font-size:0.9rem;">${dateStr}</p>` : ''}
    </div>
    <div class="timeline">
      ${eventsHTML}
    </div>
  </div>
</body>
</html>`
}
