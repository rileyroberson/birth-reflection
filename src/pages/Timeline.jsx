import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Timeline.module.css'

let _id = 1
function makeEvent() {
  return { id: _id++, time: '', description: '' }
}

let _dayId = 1
function makeDay() {
  return { id: _dayId++, date: '', events: [makeEvent(), makeEvent(), makeEvent()] }
}

// ─────────────────────────────────────────────
// Theme definitions
// ─────────────────────────────────────────────

const THEMES = {
  girl: {
    label: 'Girl',
    hdrBg:       '#f5c8d0',
    labelBg:     '#556640',
    labelValBg:  '#eaf0e2',
    rowA:        '#fde8ec',
    rowB:        '#e8f0e6',
    tcColor:     '#556640',
    btnBg:       '#e8b4c5',
    btnHover:    '#d8a0b5',
    btnColor:    '#5a3040',
    editDash:    '#d4a0b4',
    editSolid:   '#c88aa4',
    editHoverBg: 'rgba(232,180,197,0.10)',
    editFocusBg: 'rgba(232,180,197,0.18)',
    // SVG flower colors per cluster
    flowers: {
      left:        ['#b0bad8','#c0cae5','#a8b5d5','#b8c4e0'],
      leaves:      ['#8a9a6a','#9aaa7a'],
      centerLeft:  ['#d8a8c0','#e0b8d0','#c898b8'],
      center:      ['#f0c070','#e8b058','#f5d080','#f8dc90'],
      centerLeaves:['#8a9a6a','#9aaa7a'],
      centerRight: ['#a0c8e0','#90b5d5','#b0d0e5'],
      right:       ['#d8a0b8','#c890a8','#e0b0c8'],
      farRight:    ['#80b8b5','#70a8a5','#88c0bc','#78b0ae'],
      rightLeaves: ['#8a9a6a','#9aaa7a'],
    },
  },
  boy: {
    label: 'Boy',
    hdrBg:       '#c5d8f5',
    labelBg:     '#3a5e7a',
    labelValBg:  '#ddeef8',
    rowA:        '#d8eaf8',
    rowB:        '#dff0ea',
    tcColor:     '#3a5e7a',
    btnBg:       '#8ab4d8',
    btnHover:    '#7aa4c8',
    btnColor:    '#1a3050',
    editDash:    '#7aa4cc',
    editSolid:   '#5a90c0',
    editHoverBg: 'rgba(138,180,216,0.10)',
    editFocusBg: 'rgba(138,180,216,0.18)',
    flowers: {
      left:        ['#a8c8e8','#b8d8f5','#90b8e0','#a0c0e5'],
      leaves:      ['#6a9a78','#7aaa88'],
      centerLeft:  ['#78b8d8','#90c8e8','#68a8cc'],
      center:      ['#a0d0c8','#88c0b8','#b0d8d0','#c0e0d8'],
      centerLeaves:['#6a9a78','#7aaa88'],
      centerRight: ['#b0d0f0','#a0c0e8','#c0d8f8'],
      right:       ['#5888b8','#4878a8','#6898c8'],
      farRight:    ['#90b8d8','#80a8c8','#a0c8e0','#88b0d0'],
      rightLeaves: ['#6a9a78','#7aaa88'],
    },
  },
  neutral: {
    label: 'Neutral',
    hdrBg:       '#ede8f8',
    labelBg:     '#7a6888',
    labelValBg:  '#f0eaf8',
    rowA:        '#f0eaf8',
    rowB:        '#e8f0ea',
    tcColor:     '#7a6888',
    btnBg:       '#c5b8d4',
    btnHover:    '#b5a8c4',
    btnColor:    '#3a3050',
    editDash:    '#b8a8cc',
    editSolid:   '#a898bc',
    editHoverBg: 'rgba(197,184,212,0.10)',
    editFocusBg: 'rgba(197,184,212,0.18)',
    flowers: {
      left:        ['#c0b0d8','#d0c0e8','#b0a0d0','#c8b8e0'],
      leaves:      ['#8a9a6a','#9aaa7a'],
      centerLeft:  ['#d8c0b8','#e8d0c0','#c8b0a8'],
      center:      ['#c8d8a8','#b8c898','#d8e0b8','#e0e8c8'],
      centerLeaves:['#8a9a6a','#9aaa7a'],
      centerRight: ['#d0c0e0','#c0b0d8','#e0d0f0'],
      right:       ['#c8b0c8','#b8a0b8','#d8c0d0'],
      farRight:    ['#b0c8b8','#a0b8a8','#b8d0c0','#a8c0b0'],
      rightLeaves: ['#8a9a6a','#9aaa7a'],
    },
  },
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function Timeline() {
  const [babyName, setBabyName]     = useState('')
  const [parents, setParents]       = useState('')
  const [birthDate, setBirthDate]   = useState('')
  const [birthTime, setBirthTime]   = useState('')
  const [weight, setWeight]         = useState('')
  const [height, setHeight]         = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [provider, setProvider]     = useState('')
  const [theme, setTheme] = useState('girl')
  const [days, setDays]   = useState([makeDay()])

  function addDay() {
    setDays(prev => [...prev, makeDay()])
  }

  function removeDay(dayId) {
    setDays(prev => prev.length > 1 ? prev.filter(d => d.id !== dayId) : prev)
  }

  function updateDayDate(dayId, date) {
    setDays(prev => prev.map(d => d.id === dayId ? { ...d, date } : d))
  }

  function addEventToDay(dayId) {
    setDays(prev => prev.map(d => d.id === dayId ? { ...d, events: [...d.events, makeEvent()] } : d))
  }

  function removeEventFromDay(dayId, eventId) {
    setDays(prev => prev.map(d => {
      if (d.id !== dayId) return d
      return d.events.length > 1 ? { ...d, events: d.events.filter(e => e.id !== eventId) } : d
    }))
  }

  function updateEvent(dayId, eventId, field, value) {
    setDays(prev => prev.map(d => {
      if (d.id !== dayId) return d
      return { ...d, events: d.events.map(e => e.id === eventId ? { ...e, [field]: value } : e) }
    }))
  }

  function handlePreviewPDF() {
    const filled = days.flatMap(day =>
      day.events
        .filter(e => e.time || e.description.trim())
        .map(e => ({ ...e, date: day.date }))
    ).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

    const win = window.open('', '_blank', 'width=920,height=960')
    if (!win) {
      alert('Please allow pop-ups to generate the PDF preview.')
      return
    }
    win.document.write(buildPrintHTML(filled, {
      babyName, parents, birthDate, birthTime, weight, height, birthplace, provider, theme,
    }))
    win.document.close()
    win.focus()
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Home</Link>
        <h1 className={styles.title}>Birth Timeline</h1>
        <p className={styles.subtitle}>
          Fill in the details below. We&rsquo;ll build a keepsake timeline you can edit and save as a PDF.
        </p>
      </header>

      {/* ── Baby & Family ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Baby &amp; Family</h2>
        <div className={styles.metaGrid}>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Baby&rsquo;s name</label>
            <input
              type="text" className={styles.metaInput}
              value={babyName} onChange={e => setBabyName(e.target.value)}
              placeholder="e.g. Maya"
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Parents / family</label>
            <input
              type="text" className={styles.metaInput}
              value={parents} onChange={e => setParents(e.target.value)}
              placeholder="e.g. Krishna &amp; Krupa"
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Birth date</label>
            <input
              type="date" className={styles.metaInput}
              value={birthDate} onChange={e => setBirthDate(e.target.value)}
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Time of birth</label>
            <input
              type="time" className={styles.metaInput}
              value={birthTime} onChange={e => setBirthTime(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── Birth Details ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Birth Details</h2>
        <div className={styles.metaGrid}>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Weight</label>
            <input
              type="text" className={styles.metaInput}
              value={weight} onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 7 lbs, 4 oz"
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Height / length</label>
            <input
              type="text" className={styles.metaInput}
              value={height} onChange={e => setHeight(e.target.value)}
              placeholder="e.g. 20 inches"
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Birthplace</label>
            <input
              type="text" className={styles.metaInput}
              value={birthplace} onChange={e => setBirthplace(e.target.value)}
              placeholder="e.g. Mercy Hospital"
            />
          </div>
          <div className={styles.metaField}>
            <label className={styles.metaLabel}>Delivering provider</label>
            <input
              type="text" className={styles.metaInput}
              value={provider} onChange={e => setProvider(e.target.value)}
              placeholder="e.g. Holly Howard-Hutton, CNM"
            />
          </div>
        </div>
      </section>

      {/* ── Theme ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Color Theme</h2>
        <div className={styles.themeRow}>
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              type="button"
              className={`${styles.themeBtn} ${theme === key ? styles.themeBtnActive : ''} ${styles[`theme_${key}`]}`}
              onClick={() => setTheme(key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Timeline Events ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Timeline Events</h2>

        {days.map((day, dayIdx) => (
          <div key={day.id} className={styles.dayGroup}>
            <div className={styles.dayHeader}>
              <div className={styles.dayHeaderLeft}>
                <span className={styles.dayLabel}>Day {dayIdx + 1}</span>
                <input
                  type="date"
                  className={styles.dateInput}
                  value={day.date}
                  onChange={e => updateDayDate(day.id, e.target.value)}
                />
              </div>
              {days.length > 1 && (
                <button
                  type="button"
                  className={styles.removeDayBtn}
                  onClick={() => removeDay(day.id)}
                >
                  Remove day
                </button>
              )}
            </div>

            <div className={styles.columnLabels}>
              <span className={styles.timeLabel}>Time</span>
              <span className={styles.descLabel}>Moment</span>
            </div>

            <div className={styles.events}>
              {day.events.map(event => (
                <div key={event.id} className={styles.eventRow}>
                  <input
                    type="time"
                    className={styles.timeInput}
                    value={event.time}
                    onChange={e => updateEvent(day.id, event.id, 'time', e.target.value)}
                  />
                  <input
                    type="text"
                    className={styles.descInput}
                    value={event.description}
                    onChange={e => updateEvent(day.id, event.id, 'description', e.target.value)}
                    placeholder="What happened at this moment..."
                  />
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => removeEventFromDay(day.id, event.id)}
                    aria-label="Remove this moment"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={styles.addMomentBtn}
              onClick={() => addEventToDay(day.id)}
            >
              + Add moment
            </button>
          </div>
        ))}
      </section>

      <div className={styles.actions}>
        <button type="button" className={styles.addBtn} onClick={addDay}>
          + Add another day
        </button>
        <button type="button" className={styles.generateBtn} onClick={handlePreviewPDF}>
          Preview &amp; Edit PDF
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fmt12(time24) {
  if (!time24) return ''
  const [h, m] = time24.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`
}

function fmtDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

function fmtShortDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  })
}

// ─────────────────────────────────────────────
// SVG flowers (theme-aware)
// ─────────────────────────────────────────────

function buildSVG(f) {
  return `<svg viewBox="0 0 740 90" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5"  cy="24" r="30" fill="${f.left[0]}"        opacity="0.83"/>
    <circle cx="32" cy="8"  r="22" fill="${f.left[1]}"        opacity="0.73"/>
    <circle cx="56" cy="30" r="18" fill="${f.left[2]}"        opacity="0.66"/>
    <circle cx="20" cy="48" r="13" fill="${f.left[3]}"        opacity="0.58"/>
    <ellipse cx="78"  cy="54" rx="34" ry="11" fill="${f.leaves[0]}"       opacity="0.72" transform="rotate(-28 78 54)"/>
    <ellipse cx="44"  cy="68" rx="24" ry="8"  fill="${f.leaves[1]}"       opacity="0.62" transform="rotate(16 44 68)"/>
    <circle cx="165" cy="20" r="14" fill="${f.centerLeft[0]}" opacity="0.70"/>
    <circle cx="193" cy="7"  r="10" fill="${f.centerLeft[1]}" opacity="0.60"/>
    <circle cx="150" cy="36" r="9"  fill="${f.centerLeft[2]}" opacity="0.56"/>
    <circle cx="355" cy="22" r="28" fill="${f.center[0]}"     opacity="0.78"/>
    <circle cx="375" cy="5"  r="17" fill="${f.center[1]}"     opacity="0.60"/>
    <circle cx="328" cy="12" r="15" fill="${f.center[2]}"     opacity="0.56"/>
    <circle cx="370" cy="44" r="11" fill="${f.center[3]}"     opacity="0.48"/>
    <ellipse cx="308" cy="56" rx="26" ry="9"  fill="${f.centerLeaves[0]}" opacity="0.65" transform="rotate(-24 308 56)"/>
    <ellipse cx="390" cy="58" rx="20" ry="7"  fill="${f.centerLeaves[1]}" opacity="0.58" transform="rotate(18 390 58)"/>
    <circle cx="495" cy="16" r="13" fill="${f.centerRight[0]}" opacity="0.70"/>
    <circle cx="522" cy="28" r="10" fill="${f.centerRight[1]}" opacity="0.60"/>
    <circle cx="478" cy="32" r="8"  fill="${f.centerRight[2]}" opacity="0.54"/>
    <circle cx="582" cy="22" r="23" fill="${f.right[0]}"      opacity="0.77"/>
    <circle cx="610" cy="8"  r="16" fill="${f.right[1]}"      opacity="0.67"/>
    <circle cx="560" cy="38" r="12" fill="${f.right[2]}"      opacity="0.57"/>
    <circle cx="660" cy="24" r="22" fill="${f.farRight[0]}"   opacity="0.73"/>
    <circle cx="684" cy="42" r="16" fill="${f.farRight[1]}"   opacity="0.63"/>
    <circle cx="714" cy="18" r="20" fill="${f.farRight[2]}"   opacity="0.68"/>
    <circle cx="736" cy="38" r="13" fill="${f.farRight[3]}"   opacity="0.58"/>
    <ellipse cx="668" cy="60" rx="30" ry="10" fill="${f.rightLeaves[0]}"  opacity="0.65" transform="rotate(24 668 60)"/>
    <ellipse cx="720" cy="58" rx="20" ry="7"  fill="${f.rightLeaves[1]}"  opacity="0.60" transform="rotate(-14 720 58)"/>
  </svg>`
}

// ─────────────────────────────────────────────
// PDF HTML builder
// ─────────────────────────────────────────────

function buildPrintHTML(events, { babyName, parents, birthDate, birthTime, weight, height, birthplace, provider, theme }) {
  const t            = THEMES[theme] ?? THEMES.girl
  const titleLine    = babyName ? `${babyName}'s Birth Timeline` : 'Birth Timeline'
  const dateStr      = fmtDate(birthDate)
  const timeStr      = fmt12(birthTime)
  const dateTimeStr  = [dateStr, timeStr].filter(Boolean).join('  |  ')
  const weightHtStr  = [weight, height].filter(Boolean).join('  |  ')
  const placeProvStr = [birthplace, provider].filter(Boolean).join('  |  ')

  // Split events into two columns to fit on one page
  const half  = Math.ceil(events.length / 2)
  const left  = events.slice(0, half)
  const right = events.slice(half)

  const rowsHTML = Array.from({ length: Math.max(left.length, right.length) }, (_, i) => {
    const l   = left[i]
    const r   = right[i]
    const cls = i % 2 === 0 ? 'rp' : 'rs'
    const fmtCell = e => {
      if (!e) return ''
      const dateStr = e.date ? `<div class="tc-date">${esc(fmtShortDate(e.date))}</div>` : ''
      const timeStr = fmt12(e.time) || '—'
      return `${dateStr}<span contenteditable="true">${esc(timeStr)}</span>`
    }
    return `
      <tr class="${cls}">
        <td class="tc">${l ? fmtCell(l) : ''}</td>
        <td class="ec"><span contenteditable="true">${l ? esc(l.description) : ''}</span></td>
        <td class="tc">${r ? fmtCell(r) : ''}</td>
        <td class="ec"><span contenteditable="true">${r ? esc(r.description) : ''}</span></td>
      </tr>`
  }).join('')

  const infoRowsHTML = [
    dateTimeStr  && `<tr><td class="lbl">Date &amp; Time of Birth:</td><td class="val"><span contenteditable="true">${esc(dateTimeStr)}</span></td></tr>`,
    weightHtStr  && `<tr><td class="lbl">Weight &amp; Height</td><td class="val"><span contenteditable="true">${esc(weightHtStr)}</span></td></tr>`,
    placeProvStr && `<tr><td class="lbl">Birthplace &amp; Delivering Provider</td><td class="val"><span contenteditable="true">${esc(placeProvStr)}</span></td></tr>`,
  ].filter(Boolean).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(titleLine)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:wght@400;600&family=Libre+Baskerville:wght@400;700&family=EB+Garamond:wght@400;700&family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    @page { size: letter portrait; margin: 0.3in 0.4in; }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      font-family: Georgia, serif;
      background: #fff;
      color: #3a3530;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Toolbar ── */
    .toolbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      background: #fff;
      border-bottom: 1px solid #e8d5d8;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.07);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .toolbar-hint {
      flex: 1;
      font-size: 12px;
      color: #9a7a7a;
    }
    .toolbar-hint strong { color: #6a5555; }
    .toolbar-label {
      font-size: 12px;
      color: #6a5555;
      font-weight: 600;
    }
    .font-picker {
      font-size: 13px;
      padding: 4px 8px;
      border: 1.5px solid #ddd;
      border-radius: 6px;
      background: #fafafa;
      color: #3a3530;
      cursor: pointer;
      outline: none;
    }
    .font-picker:focus { border-color: ${t.editSolid}; }
    .btn-save {
      background: ${t.btnBg};
      color: ${t.btnColor};
      border: none;
      border-radius: 50px;
      padding: 7px 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.03em;
      transition: background 0.18s;
    }
    .btn-save:hover { background: ${t.btnHover}; }

    /* ── Editable ── */
    [contenteditable] {
      outline: none;
      border-radius: 3px;
      min-width: 4px;
      display: inline-block;
    }
    [contenteditable]:hover {
      outline: 1.5px dashed ${t.editDash};
      background: ${t.editHoverBg};
    }
    [contenteditable]:focus {
      outline: 1.5px solid ${t.editSolid};
      background: ${t.editFocusBg};
    }

    .wrap { margin-top: 48px; }

    /* ── Header ── */
    .hdr {
      background: ${t.hdrBg};
      padding: 0 0 12pt;
      text-align: center;
      overflow: hidden;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .hdr svg { width: 100%; display: block; }
    .hdr-parents {
      font-size: 7.5pt;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #6a5555;
      margin: 2pt 0 3pt;
    }
    .hdr-title {
      font-size: 21pt;
      font-weight: bold;
      letter-spacing: 0.06em;
      color: #2a2520;
      line-height: 1.1;
      margin-bottom: 10pt;
    }

    /* ── Info table ── */
    .info { width: 100%; border-collapse: collapse; }
    .info .lbl {
      background: ${t.labelBg};
      color: #fff;
      padding: 4pt 8pt;
      font-size: 7.5pt;
      width: 26%;
      vertical-align: middle;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .info .val {
      background: ${t.labelValBg};
      padding: 4pt 8pt;
      font-size: 7.5pt;
      color: #3a3530;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Timeline table ── */
    .tl { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2pt; }
    .tl thead th {
      background: ${t.labelBg};
      color: #fff;
      padding: 4.5pt 7pt;
      font-size: 8pt;
      font-weight: normal;
      text-align: left;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .tl td {
      padding: 4pt 5pt;
      font-size: 7.5pt;
      vertical-align: top;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .rp td { background: ${t.rowA}; }
    .rs td { background: ${t.rowB}; }
    .tc { color: ${t.tcColor}; font-weight: bold; width: 12%; }
    .tc-date { font-size: 6.5pt; font-weight: normal; opacity: 0.75; margin-bottom: 1pt; }
    .ec { width: 38%; }

    @media print {
      .toolbar { display: none !important; }
      .wrap { margin-top: 0; }
    }
  </style>
</head>
<body>

<div class="toolbar">
  <span class="toolbar-hint"><strong>Click any text to edit.</strong> Change font below, then save.</span>
  <span class="toolbar-label">Font:</span>
  <select class="font-picker" id="fontPicker" onchange="applyFont(this.value)">
    <option value="Georgia, serif">Georgia</option>
    <option value="'Playfair Display', serif">Playfair Display</option>
    <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
    <option value="'Libre Baskerville', serif">Libre Baskerville</option>
    <option value="'EB Garamond', serif">EB Garamond</option>
    <option value="'Nunito', sans-serif">Nunito</option>
  </select>
  <button class="btn-save" onclick="window.print()">Save as PDF</button>
</div>

<div class="wrap">
  <div class="hdr">
    ${buildSVG(t.flowers)}
    <p class="hdr-parents"><span contenteditable="true">${esc(parents) || 'Family'}</span></p>
    <h1 class="hdr-title"><span contenteditable="true">${esc(titleLine.toUpperCase())}</span></h1>
  </div>

  ${infoRowsHTML ? `<table class="info">${infoRowsHTML}</table>` : ''}

  <table class="tl">
    <thead>
      <tr>
        <th style="width:12%">Time</th>
        <th style="width:38%">Action / Event</th>
        <th style="width:12%">Time</th>
        <th style="width:38%">Action / Event</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHTML || '<tr class="rs"><td colspan="4" style="text-align:center;padding:8pt;color:#888;font-style:italic;">No events recorded yet.</td></tr>'}
    </tbody>
  </table>
</div>

<script>
  function applyFont(family) {
    document.body.style.fontFamily = family;
  }
</script>
</body>
</html>`
}
