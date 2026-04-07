import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Timeline.module.css'

let _id = 1
function makeEvent() {
  return { id: _id++, time: '', description: '' }
}

export default function Timeline() {
  const [babyName, setBabyName]     = useState('')
  const [parents, setParents]       = useState('')
  const [birthDate, setBirthDate]   = useState('')
  const [birthTime, setBirthTime]   = useState('')
  const [weight, setWeight]         = useState('')
  const [height, setHeight]         = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [provider, setProvider]     = useState('')
  const [events, setEvents]         = useState([makeEvent(), makeEvent(), makeEvent()])

  function addEvent() {
    setEvents(prev => [...prev, makeEvent()])
  }

  function removeEvent(id) {
    setEvents(prev => prev.length > 1 ? prev.filter(e => e.id !== id) : prev)
  }

  function updateEvent(id, field, value) {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e))
  }

  function handlePreviewPDF() {
    const filled = events
      .filter(e => e.time || e.description.trim())
      .sort((a, b) => a.time.localeCompare(b.time))

    const win = window.open('', '_blank', 'width=920,height=960')
    if (!win) {
      alert('Please allow pop-ups to generate the PDF preview.')
      return
    }
    win.document.write(buildPrintHTML(filled, {
      babyName, parents, birthDate, birthTime, weight, height, birthplace, provider,
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

      {/* ── Timeline Events ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Timeline Events</h2>
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
      </section>

      <div className={styles.actions}>
        <button type="button" className={styles.addBtn} onClick={addEvent}>
          + Add moment
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

// ─────────────────────────────────────────────
// PDF HTML builder
// ─────────────────────────────────────────────

function buildPrintHTML(events, { babyName, parents, birthDate, birthTime, weight, height, birthplace, provider }) {
  const titleLine      = babyName ? `${babyName}'s Birth Timeline` : 'Birth Timeline'
  const dateStr        = fmtDate(birthDate)
  const timeStr        = fmt12(birthTime)
  const dateTimeStr    = [dateStr, timeStr].filter(Boolean).join('  |  ')
  const weightHtStr    = [weight, height].filter(Boolean).join('  |  ')
  const placeProvStr   = [birthplace, provider].filter(Boolean).join('  |  ')

  // Split events into two columns to fit on one page
  const half  = Math.ceil(events.length / 2)
  const left  = events.slice(0, half)
  const right = events.slice(half)

  const rowsHTML = Array.from({ length: Math.max(left.length, right.length) }, (_, i) => {
    const l   = left[i]
    const r   = right[i]
    const cls = i % 2 === 0 ? 'rp' : 'rs'
    return `
      <tr class="${cls}">
        <td class="tc"><span contenteditable="true">${l ? esc(fmt12(l.time) || '—') : ''}</span></td>
        <td class="ec"><span contenteditable="true">${l ? esc(l.description) : ''}</span></td>
        <td class="tc"><span contenteditable="true">${r ? esc(fmt12(r.time) || '—') : ''}</span></td>
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

    /* ── Toolbar (hidden when printing) ── */
    .toolbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      background: #fff;
      border-bottom: 1px solid #e8d5d8;
      padding: 9px 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.07);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .toolbar-hint {
      flex: 1;
      font-size: 12.5px;
      color: #9a7a7a;
    }
    .toolbar-hint strong { color: #6a5555; }
    .btn-save {
      background: #e8b4c5;
      color: #5a3040;
      border: none;
      border-radius: 50px;
      padding: 7px 20px;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.03em;
      transition: background 0.18s;
    }
    .btn-save:hover { background: #d8a0b5; }

    /* ── Editable text styles ── */
    [contenteditable] {
      outline: none;
      border-radius: 3px;
      min-width: 4px;
      display: inline-block;
    }
    [contenteditable]:hover {
      outline: 1.5px dashed #d4a0b4;
      background: rgba(232,180,197,0.10);
    }
    [contenteditable]:focus {
      outline: 1.5px solid #c88aa4;
      background: rgba(232,180,197,0.18);
    }

    .wrap { margin-top: 48px; }

    /* ── Floral header ── */
    .hdr {
      background: #f5c8d0;
      padding: 0 0 12pt;
      text-align: center;
      overflow: hidden;
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
      background: #556640;
      color: #fff;
      padding: 4pt 8pt;
      font-size: 7.5pt;
      width: 26%;
      vertical-align: middle;
    }
    .info .val {
      background: #eaf0e2;
      padding: 4pt 8pt;
      font-size: 7.5pt;
      color: #3a3530;
    }

    /* ── Timeline table ── */
    .tl { width: 100%; border-collapse: collapse; table-layout: fixed; margin-top: 2pt; }
    .tl thead th {
      background: #556640;
      color: #fff;
      padding: 4.5pt 7pt;
      font-size: 8pt;
      font-weight: normal;
      text-align: left;
    }
    .tl td {
      padding: 4pt 5pt;
      font-size: 7.5pt;
      vertical-align: top;
      line-height: 1.4;
    }
    .rp td { background: #fde8ec; }
    .rs td { background: #e8f0e6; }
    .tc { color: #556640; font-weight: bold; width: 12%; }
    .ec { width: 38%; }

    @media print {
      .toolbar { display: none !important; }
      .wrap { margin-top: 0; }
    }
  </style>
</head>
<body>

<div class="toolbar">
  <span class="toolbar-hint"><strong>Click any text to edit it.</strong> Make changes, then save when ready.</span>
  <button class="btn-save" onclick="window.print()">Save as PDF</button>
</div>

<div class="wrap">

  <!-- Floral header -->
  <div class="hdr">
    <svg viewBox="0 0 740 90" xmlns="http://www.w3.org/2000/svg">
      <!-- Left hydrangea cluster -->
      <circle cx="5"  cy="24" r="30" fill="#b0bad8" opacity="0.83"/>
      <circle cx="32" cy="8"  r="22" fill="#c0cae5" opacity="0.73"/>
      <circle cx="56" cy="30" r="18" fill="#a8b5d5" opacity="0.66"/>
      <circle cx="20" cy="48" r="13" fill="#b8c4e0" opacity="0.58"/>
      <!-- Left leaves -->
      <ellipse cx="78"  cy="54" rx="34" ry="11" fill="#8a9a6a" opacity="0.72" transform="rotate(-28 78 54)"/>
      <ellipse cx="44"  cy="68" rx="24" ry="8"  fill="#9aaa7a" opacity="0.62" transform="rotate(16 44 68)"/>
      <!-- Center-left pink flowers -->
      <circle cx="165" cy="20" r="14" fill="#d8a8c0" opacity="0.70"/>
      <circle cx="193" cy="7"  r="10" fill="#e0b8d0" opacity="0.60"/>
      <circle cx="150" cy="36" r="9"  fill="#c898b8" opacity="0.56"/>
      <!-- Center yellow rose -->
      <circle cx="355" cy="22" r="28" fill="#f0c070" opacity="0.78"/>
      <circle cx="375" cy="5"  r="17" fill="#e8b058" opacity="0.60"/>
      <circle cx="328" cy="12" r="15" fill="#f5d080" opacity="0.56"/>
      <circle cx="370" cy="44" r="11" fill="#f8dc90" opacity="0.48"/>
      <!-- Center leaves -->
      <ellipse cx="308" cy="56" rx="26" ry="9"  fill="#8a9a6a" opacity="0.65" transform="rotate(-24 308 56)"/>
      <ellipse cx="390" cy="58" rx="20" ry="7"  fill="#9aaa7a" opacity="0.58" transform="rotate(18 390 58)"/>
      <!-- Center-right blue accent -->
      <circle cx="495" cy="16" r="13" fill="#a0c8e0" opacity="0.70"/>
      <circle cx="522" cy="28" r="10" fill="#90b5d5" opacity="0.60"/>
      <circle cx="478" cy="32" r="8"  fill="#b0d0e5" opacity="0.54"/>
      <!-- Right mauve flowers -->
      <circle cx="582" cy="22" r="23" fill="#d8a0b8" opacity="0.77"/>
      <circle cx="610" cy="8"  r="16" fill="#c890a8" opacity="0.67"/>
      <circle cx="560" cy="38" r="12" fill="#e0b0c8" opacity="0.57"/>
      <!-- Far right teal cluster -->
      <circle cx="660" cy="24" r="22" fill="#80b8b5" opacity="0.73"/>
      <circle cx="684" cy="42" r="16" fill="#70a8a5" opacity="0.63"/>
      <circle cx="714" cy="18" r="20" fill="#88c0bc" opacity="0.68"/>
      <circle cx="736" cy="38" r="13" fill="#78b0ae" opacity="0.58"/>
      <!-- Right leaves -->
      <ellipse cx="668" cy="60" rx="30" ry="10" fill="#8a9a6a" opacity="0.65" transform="rotate(24 668 60)"/>
      <ellipse cx="720" cy="58" rx="20" ry="7"  fill="#9aaa7a" opacity="0.60" transform="rotate(-14 720 58)"/>
    </svg>
    <p class="hdr-parents"><span contenteditable="true">${esc(parents) || 'Family'}</span></p>
    <h1 class="hdr-title"><span contenteditable="true">${esc(titleLine.toUpperCase())}</span></h1>
  </div>

  <!-- Birth info table -->
  ${infoRowsHTML ? `<table class="info">${infoRowsHTML}</table>` : ''}

  <!-- Timeline table -->
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
</body>
</html>`
}
