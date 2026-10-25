// Solu product demo — one continuous composition keyed to OM_SCENES cues.
const C = {
  g25: '#FCFCFD', g50: '#F9FAFB', g100: '#F2F4F7', g200: '#EAECF0', g300: '#D0D5DD', g400: '#98A2B3',
  g500: '#667085', g600: '#475467', g700: '#344054', g800: '#1D2939', g900: '#101828',
  b25: '#F6FEF9', b50: '#EDFCF2', b100: '#D3F8DF', b200: '#AAF0C4', b300: '#73E2A3', b400: '#3CCB7F',
  b500: '#16B364', b600: '#099250', b700: '#087443', b800: '#095C37', b900: '#073B2D',
  e50: '#FEF3F2', e200: '#FECDCA', e700: '#B42318',
};
const FONT = '"IBM Plex Sans", system-ui, sans-serif';
const MONO = FONT;

// ── Motion: the only three easings used anywhere ──
const clp = (v, a, b) => Math.max(a, Math.min(b, v));
const prog = (T, s, d, e) => e(clp((T - s) / d, 0, 1));
const MOTION = {
  enter: (T, s, d = 0.7) => prog(T, s, d, Easing.easeOutCubic),
  draw: (T, s, d = 1) => prog(T, s, d, Easing.easeInOutCubic),
  pop: (T, s, d = 0.5) => prog(T, s, d, Easing.easeOutBack),
};
const lerp = (a, b, p) => a + (b - a) * p;
const win = (T, a, b, d = 0.45) => MOTION.enter(T, a, d) * (1 - MOTION.enter(T, b - d, d));
const press = (T, c) => Math.max(0, 1 - Math.abs(T - c) / 0.14);
function track(T, keys) {
  if (T <= keys[0].t) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T < b.t) {
      const p = MOTION.draw(T, a.t, b.t - a.t);
      const o = {};
      for (const k in b) if (k !== 't') o[k] = lerp(a[k], b[k], p);
      return o;
    }
  }
  return keys[keys.length - 1];
}
const k = (t, o) => Object.assign({ t }, o);
const vis = (o) => (o <= 0.001 ? 'hidden' : 'visible');

// ── Icons (UI glyphs) ──
const IC = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5'],
  flask: ['M9 3h6', 'M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3', 'M7 15h10'],
  folder: ['M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z'],
  cluster: ['M12 6m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0', 'M6 17m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0', 'M18 17m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0'],
  report: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M9 13h7', 'M9 17h5'],
  settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z'],
  help: ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3', 'M12 17h.01'],
  upload: ['M12 15V4', 'M7.5 8.5 12 4l4.5 4.5', 'M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4'],
  file: ['M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M14 3v5h5'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  building: ['M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16', 'M15 9h4a1 1 0 0 1 1 1v11', 'M3 21h18', 'M8 8h3', 'M8 12h3', 'M8 16h3'],
  share: ['M12 3v12', 'M7.5 7.5 12 3l4.5 4.5', 'M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6'],
  chevron: ['M7 10l5 5 5-5'],
  plus: ['M12 5v14', 'M5 12h14'],
};
function Icon({ d, size = 18, color = 'currentColor', sw = 1.7 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none', display: 'block' }}>
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}
const LOGO_D = [
  'M 6.846 20 C 5.563 20 4.413 19.786 3.395 19.359 C 2.376 18.914 1.565 18.318 0.962 17.57 C 0.377 16.822 0.057 15.995 0 15.087 L 3.989 15.087 C 4.064 15.656 4.356 16.128 4.866 16.502 C 5.394 16.876 6.044 17.063 6.817 17.063 C 7.572 17.063 8.156 16.92 8.571 16.636 C 9.005 16.351 9.222 15.986 9.222 15.541 C 9.222 15.06 8.958 14.704 8.43 14.473 C 7.921 14.223 7.1 13.956 5.969 13.672 C 4.8 13.405 3.838 13.129 3.083 12.844 C 2.348 12.559 1.707 12.123 1.16 11.535 C 0.632 10.948 0.368 10.156 0.368 9.159 C 0.368 8.34 0.613 7.592 1.103 6.916 C 1.612 6.239 2.329 5.705 3.253 5.314 C 4.196 4.922 5.299 4.726 6.563 4.726 C 8.43 4.726 9.92 5.171 11.032 6.061 C 12.145 6.934 12.758 8.117 12.871 9.613 L 9.08 9.613 C 9.024 9.025 8.76 8.563 8.288 8.224 C 7.836 7.868 7.223 7.69 6.45 7.69 C 5.733 7.69 5.177 7.815 4.781 8.064 C 4.403 8.313 4.215 8.66 4.215 9.105 C 4.215 9.604 4.479 9.987 5.007 10.254 C 5.535 10.503 6.355 10.761 7.468 11.028 C 8.6 11.295 9.533 11.571 10.269 11.856 C 11.004 12.141 11.636 12.586 12.164 13.191 C 12.711 13.778 12.994 14.562 13.012 15.541 C 13.012 16.395 12.758 17.161 12.249 17.837 C 11.758 18.514 11.042 19.048 10.099 19.439 C 9.175 19.813 8.09 20 6.846 20 Z',
  'M 22.232 20 C 20.723 20 19.366 19.688 18.159 19.065 C 16.952 18.425 15.999 17.526 15.302 16.368 C 14.623 15.211 14.283 13.876 14.283 12.363 C 14.283 10.85 14.632 9.515 15.33 8.358 C 16.047 7.201 17.018 6.311 18.244 5.688 C 19.469 5.047 20.837 4.726 22.345 4.726 C 23.854 4.726 25.221 5.047 26.447 5.688 C 27.673 6.311 28.635 7.201 29.332 8.358 C 30.049 9.515 30.407 10.85 30.407 12.363 C 30.407 13.876 30.04 15.211 29.304 16.368 C 28.588 17.526 27.607 18.425 26.362 19.065 C 25.136 19.688 23.76 20 22.232 20 Z M 22.232 16.742 C 22.949 16.742 23.618 16.582 24.241 16.262 C 24.882 15.923 25.391 15.425 25.768 14.766 C 26.145 14.108 26.334 13.307 26.334 12.363 C 26.334 10.957 25.938 9.88 25.146 9.132 C 24.373 8.367 23.42 7.984 22.289 7.984 C 21.157 7.984 20.205 8.367 19.432 9.132 C 18.677 9.88 18.3 10.957 18.3 12.363 C 18.3 13.769 18.668 14.855 19.403 15.621 C 20.158 16.368 21.101 16.742 22.232 16.742 Z',
  'M 36.283 0 L 36.283 19.76 L 32.322 19.76 L 32.322 0 L 36.283 0 Z',
  'M 54 4.967 L 54 19.76 L 50.011 19.76 L 50.011 17.891 C 49.502 18.531 48.833 19.039 48.003 19.413 C 47.192 19.769 46.306 19.947 45.344 19.947 C 44.118 19.947 43.034 19.706 42.091 19.226 C 41.148 18.727 40.403 18.006 39.856 17.063 C 39.328 16.101 39.064 14.962 39.064 13.645 L 39.064 4.967 L 43.024 4.967 L 43.024 13.111 C 43.024 14.286 43.335 15.194 43.958 15.834 C 44.58 16.457 45.429 16.769 46.504 16.769 C 47.597 16.769 48.456 16.457 49.078 15.834 C 49.7 15.194 50.011 14.286 50.011 13.111 L 50.011 4.967 L 54 4.967 Z',
];
function Logo({ width = 54, fill = '#fff', style }) {
  return (
    <svg width={width} height={width * 20 / 54} viewBox="0 0 54 20" style={Object.assign({ display: 'block' }, style)}>
      {LOGO_D.map((d, i) => <path key={i} d={d} fill={fill} />)}
    </svg>
  );
}

// ── Shared UI bits (matched to Solu product mockups) ──
const abs = (l, t, w, h, extra) => Object.assign({ position: 'absolute', left: l, top: t, width: w, height: h }, extra);
Object.assign(IC, {
  pulse: ['M3 12h4l3-8 4 16 3-8h4'],
  chevR: ['M9 6l6 6-6 6'],
  info: ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 11v5', 'M12 8h.01'],
  download: ['M12 4v11', 'M7.5 10.5 12 15l4.5-4.5', 'M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2'],
  sliders: ['M4 7h10', 'M18 7h2', 'M16 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0', 'M4 17h2', 'M10 17h10', 'M8 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0'],
  edit: ['M4 20h4L19 9l-4-4L4 16z', 'M13.5 6.5l4 4'],
  minus: ['M5 12h14'],
  expand: ['M4 9V4h5', 'M20 9V4h-5', 'M4 15v5h5', 'M20 15v5h-5'],
  arrowUR: ['M7 17L17 7', 'M8 7h9v9'],
  userPlus: ['M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M2 21v-1a6 6 0 0 1 10.5-4', 'M19 14v6', 'M16 17h6'],
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  message: ['M4 5h16v11H9l-5 4z'],
  type: ['M5 6V4h14v2', 'M12 4v16', 'M9 20h6'],
  pen: ['M4 20l1-4L16 5l3 3L8 19z'],
  shield: ['M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z'],
  nodes: ['M6 12m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M18 6m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M18 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0', 'M8.2 10.8l7.6-3.6', 'M8.2 13.2l7.6 3.6'],
  chart: ['M4 4v16h16', 'M8 16v-4', 'M12 16V8', 'M16 16v-6'],
  dna: ['M7 3c0 7 10 6 10 18', 'M17 3c0 7-10 6-10 18', 'M8.5 7h7', 'M8.5 17h7'],
  reportPlus: ['M6 3h8l5 5v13H6z', 'M14 3v5h5', 'M12.5 12v6', 'M9.5 15h6'],
  exportUp: ['M12 15V4', 'M7.5 8.5 12 4l4.5 4.5', 'M4 14v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5'],
});
const BLUE = { 50: '#F0F9FF', 200: '#B9E6FE', 600: '#0086C9', 700: '#026AA2' };
const TONE = {
  green: [C.b50, C.b200, C.b700], gray: [C.g50, C.g200, C.g700], orange: ['#FFFAEB', '#FEDF89', '#B54708'],
  pink: ['#FDF2FA', '#FCCEEE', '#C11574'], blue: [BLUE[50], BLUE[200], BLUE[700]],
};
function Badge({ tone = 'gray', children, mono, style }) {
  const [bg, bd, fg] = TONE[tone];
  return (
    <span style={Object.assign({ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 8px', borderRadius: 6, background: bg, border: `1px solid ${bd}`, color: fg, font: mono ? `600 12.5px ${MONO}` : `500 13px ${FONT}`, whiteSpace: 'nowrap', boxSizing: 'border-box' }, style)}>{children}</span>
  );
}
function Btn({ children, icon, primary = true, style }) {
  return (
    <div style={Object.assign({
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 40, padding: '0 16px', borderRadius: 8,
      background: primary ? C.b600 : '#fff', color: primary ? '#fff' : C.g700,
      border: primary ? `1px solid ${C.b600}` : `1px solid ${C.g300}`, font: `600 15px ${FONT}`, boxSizing: 'border-box', whiteSpace: 'nowrap',
      boxShadow: '0 1px 2px rgba(16,24,40,0.05)',
    }, style)}>
      {icon && <Icon d={icon} size={18} />}{children}
    </div>
  );
}
function Topbar({ crumbs, home, right }) {
  return (
    <div style={abs(0, 0, 1232, 56, { background: '#fff' })}>
      <div style={abs(28, 0, 900, 56, { display: 'flex', alignItems: 'center', gap: 12 })}>
        {home && <Icon d={IC.home} size={20} color={C.g500} />}
        {crumbs.map((p, i) => {
          const last = i === crumbs.length - 1, pill = last && crumbs.length > 1;
          return (
            <React.Fragment key={i}>
              {(i > 0 || home) && <Icon d={IC.chevR} size={15} color={C.g400} />}
              <span style={{ font: `${pill ? 600 : 400} 15px ${FONT}`, color: pill ? C.g800 : C.g600, background: pill ? C.g100 : 'transparent', padding: pill ? '5px 10px' : 0, borderRadius: 6 }}>{p}</span>
            </React.Fragment>
          );
        })}
      </div>
      {right || <Btn icon={IC.plus} style={abs(1046, 8, 158, 40)}>Add samples</Btn>}
    </div>
  );
}
function Skel({ w, h = 10 }) {
  return <div style={{ width: w, height: h, borderRadius: h / 2, background: C.g100 }} />;
}
function Spinner({ T }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 6, height: 20 }}>
      {[0, 1, 2].map((i) => {
        const a = 0.5 + 0.5 * Math.sin((T * 2.2 - i * 0.16) * Math.PI * 2);
        return <span key={i} style={{ width: 7, height: 7, borderRadius: 4, background: C.b600, opacity: 0.25 + 0.75 * a, transform: `translateY(${-3 * a}px)` }} />;
      })}
    </span>
  );
}
function Reveal({ x, w, rv, sk, children, top = 0, h = 56, spin }) {
  return (
    <div style={abs(x, top, w, h)}>
      <div style={abs(0, 0, w, h, { display: 'flex', alignItems: 'center', opacity: 1 - rv })}>{spin || <Skel w={sk} />}</div>
      <div style={abs(0, 0, w, h, { display: 'flex', alignItems: 'center', gap: 12, opacity: rv, transform: `translateY(${(1 - rv) * 6}px)` })}>{children}</div>
    </div>
  );
}
function Check({ x, y, p = 0 }) {
  const on = p > 0.5;
  return (
    <div style={abs(x, y, 18, 18, { borderRadius: 5, border: `1px solid ${on ? C.b600 : C.g300}`, background: on ? C.b600 : '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
      <div style={{ transform: `scale(${clp(p, 0, 1.2)})`, color: '#fff' }}><Icon d={IC.check} size={13} sw={2.6} /></div>
    </div>
  );
}
function Segmented({ labels, active = 0, style }) {
  return (
    <div style={Object.assign({ display: 'flex', padding: 3, gap: 2, borderRadius: 9, background: C.g100, border: `1px solid ${C.g200}`, boxSizing: 'border-box' }, style)}>
      {labels.map((l, i) => (
        <div key={l} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, background: i === active ? '#fff' : 'transparent', boxShadow: i === active ? '0 1px 2px rgba(16,24,40,0.08)' : 'none', font: `${i === active ? 600 : 500} 14px ${FONT}`, color: i === active ? C.g800 : C.g500 }}>{l}</div>
      ))}
    </div>
  );
}

// ── Data ──
const UPLOADS = [
  { n: 'BC-2026-04182-001.fastq.gz', s: '212 MB' },
  { n: 'UR-2026-04112-007.fastq.gz', s: '198 MB' },
  { n: 'BC-2026-04082-006.fastq.gz', s: '231 MB' },
];
const ROWS = [
  { id: 'BC-2026-04182-001', sp: 'Escherichia coli', ty: 'ST131', g: ['blaCTX-M-15', "aac(6')-Ib-cr"], cl: 'Ec1' },
  { id: 'UR-2026-04112-007', sp: 'Escherichia coli', ty: 'ST131', g: ['blaCTX-M-15'], cl: 'Ec1' },
  { id: 'BC-2026-04082-006', sp: 'Candida auris', ty: 'Clade I', g: ['ERG11 Y132F'], cl: 'Ca1' },
  { id: 'BC-2026-04152-014', sp: 'Klebsiella pneumoniae', ty: 'ST258', g: ['blaKPC-3'], cl: 'Kp1' },
  { id: 'WC-2026-04102-003', sp: 'Staphylococcus aureus', ty: 'ST22', g: ['mecA'], cl: null },
  { id: 'UR-2026-04062-004', sp: 'Escherichia coli', ty: 'ST131', g: ['blaCTX-M-15'], cl: 'Ec1' },
  { id: 'RC-2026-04052-005', sp: 'Klebsiella pneumoniae', ty: 'ST307', g: ['blaOXA-48'], cl: null },
  { id: 'BC-2026-04022-002', sp: 'Escherichia coli', ty: 'ST69', g: [], cl: null },
];
const LEAVES = [
  'BC-2026-04182-001', 'UR-2026-04112-007', 'UR-2026-04062-004', 'BC-2026-04112-009', 'UR-2026-04102-003',
  'BC-2026-04152-014', 'WC-2026-04052-005', 'RC-2026-03282-011', 'BC-2026-03192-006', 'UR-2026-03142-002',
];
const TREE = { len: 0, ch: [
  { len: 1, ch: [
    { len: 3, ch: [
      { len: 4, cl: true, ch: [{ leaf: 0, len: 0.6 }, { leaf: 1, len: 0.9 }, { len: 0.4, ch: [{ leaf: 2, len: 0.5 }, { leaf: 3, len: 0.8 }] }] },
      { leaf: 4, len: 5 }] },
    { len: 4, ch: [{ leaf: 5, len: 3 }, { leaf: 6, len: 3.6 }] }] },
  { len: 2.5, ch: [{ leaf: 7, len: 7 }, { len: 3, ch: [{ leaf: 8, len: 4 }, { leaf: 9, len: 4.5 }] }] },
] };
const TX0 = 40, TSC = 56, LY0 = 100, LG = 44;
const TREE_EDGES = (() => {
  const edges = [];
  let clusterNode = null;
  function lay(n, x0, depth, inCl) {
    n.x = x0 + n.len * TSC;
    const cl = inCl || !!n.cl;
    if (n.cl) clusterNode = n;
    if (n.ch) {
      n.ch.forEach((c) => lay(c, n.x, depth + 1, cl));
      n.y = (n.ch[0].y + n.ch[n.ch.length - 1].y) / 2;
      n.ch.forEach((c) => edges.push({ px: n.x, py: n.y, x: c.x, y: c.y, depth: depth + 1, cl: cl || !!c.cl, leaf: c.leaf }));
    } else n.y = LY0 + n.leaf * LG;
  }
  lay(TREE, TX0, 0, false);
  edges.root = TREE; edges.cluster = clusterNode;
  return edges;
})();
const FEAT = [
  ['repA', 2, 9, 'cds', 1], ['psiB', 14, 21, 'cds', 1], ['ccdAB', 25, 33, 'cds', 1], ['parM', 40, 50, 'cds', 1], ['stbA', 53, 61, 'cds', 1],
  ['ISEcp1', 66, 76, 'mob', 1], ['blaCTX-M-15', 78, 92, 'amr', 1], ['IS26', 99, 106, 'mob', -1], ["aac(6')-Ib-cr", 110, 118, 'amr', -1],
  ['intI1', 122, 131, 'mob', -1], ['umuD', 137, 144, 'cds', 1], ['traX', 151, 166, 'cds', -1], ['traI', 169, 197, 'cds', -1], ['traD', 200, 215, 'cds', -1],
  ['traG', 218, 238, 'cds', -1], ['traH', 241, 252, 'cds', -1], ['traB', 256, 276, 'cds', -1], ['finO', 288, 297, 'cds', 1], ['hok/sok', 304, 310, 'cds', 1],
  ['senB', 318, 327, 'vir', 1], ['', 334, 337, 'rna', 1], ['pemK', 342, 351, 'cds', 1],
];
const FCOL = { cds: '#C5CBD3', amr: '#DD2590', mob: '#EAAA08', vir: '#155EEF', rna: '#0BA5EC' };
const FTXT = { cds: C.g500, amr: '#C11574', mob: '#B54708', vir: '#155EEF', rna: BLUE[700] };

// ── Timing anchors ──
const flyStart = (U, i) => U + 2.3 + i * 0.35;
const flyEnd = (U, i) => flyStart(U, i) + 0.66;
const FLY = [{ fx: 1640, fy: 250, rot: -7 }, { fx: 1690, fy: 520, rot: 5 }, { fx: 1630, fy: 700, rot: -4 }];

// ── Camera + cursor (content coords of the 1480×800 app; main area starts at x=248) ──
function cameraAt(T, K) {
  if (!window.SOLU_ZOOM) return { tx: 0, ty: 0, s: 1 };
  const { U, S, P, L, R, G } = K;
  const H0 = { x: 740, y: 400, s: 1 }, H1 = { x: 740, y: 400, s: 1.02 };
  const c = track(T, [
    k(0, H0), k(U + 1.7, H0),
    k(U + 2.5, { x: 740, y: 340, s: 1.22 }), k(U + 5.3, { x: 740, y: 350, s: 1.25 }),
    k(U + 6.3, H0), k(S + 4.3, H1),
    k(S + 5.4, { x: 800, y: 256, s: 1.3 }), k(S + 7.5, { x: 800, y: 256, s: 1.33 }),
    k(S + 8.3, H0), k(P + 4.3, H1),
    k(P + 5.4, { x: 980, y: 350, s: 1.28 }), k(P + 7.8, { x: 980, y: 350, s: 1.31 }),
    k(P + 8.6, H0), k(L + 2.9, H1),
    k(L + 4.0, { x: 1020, y: 520, s: 1.3 }), k(L + 6.4, { x: 1020, y: 520, s: 1.33 }),
    k(L + 7.2, H0), k(R + 3.2, H1),
    k(R + 4.3, { x: 680, y: 380, s: 1.12 }), k(R + 5.6, { x: 680, y: 380, s: 1.14 }),
    k(R + 6.3, H0), k(G + 1, H0),
  ]);
  const tx = clp(740 - c.x * c.s, 1480 - 1480 * c.s, 0);
  const ty = clp(400 - c.y * c.s, 800 - 800 * c.s, 0);
  return { tx, ty, s: c.s };
}
function cursorAt(T, K) {
  const { U, S, P, L, R } = K;
  return track(T, [
    k(U + 0.8, { x: 1500, y: 900 }), k(U + 1.5, { x: 1373, y: 28 }), k(U + 1.8, { x: 1373, y: 30 }), k(U + 2.4, { x: 1150, y: 620 }),
    k(U + 4.3, { x: 1160, y: 625 }), k(U + 5.1, { x: 971, y: 488 }), k(U + 5.6, { x: 975, y: 490 }), k(U + 6.4, { x: 1200, y: 700 }),
    k(S + 3.3, { x: 1210, y: 705 }),
    k(S + 4.3, { x: 384, y: 146 }), k(P + 0.4, { x: 384, y: 146 }), k(P + 1.4, { x: 1250, y: 720 }),
    k(P + 7.8, { x: 1260, y: 724 }), k(P + 8.8, { x: 889, y: 284 }), k(L + 0.3, { x: 889, y: 284 }), k(L + 1.3, { x: 1180, y: 700 }), k(L + 2.1, { x: 1182, y: 702 }), k(L + 2.9, { x: 1035, y: 568 }),
    k(L + 6.6, { x: 1038, y: 570 }), k(R - 0.5, { x: 1374, y: 96 }), k(R + 0.5, { x: 1374, y: 96 }), k(R + 1.5, { x: 1250, y: 420 }),
    k(R + 5.8, { x: 1256, y: 424 }), k(R + 6.7, { x: 1391, y: 30 }),
  ]);
}

// ── Sections ──
function Opening({ T }) {
  const out = MOTION.draw(T, 4.0, 0.9);
  const drift = lerp(1, 1.03, MOTION.draw(T, 0, 5.4));
  const line = (words, base, color) => (
    <div style={{ display: 'flex', gap: '0.26em' }}>
      {words.map((w, i) => {
        const p = MOTION.enter(T, base + i * 0.13, 0.9);
        return <span key={i} style={{ display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 30}px)`, color }}>{w}</span>;
      })}
    </div>
  );
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
      font: `500 92px/1.12 ${FONT}`, letterSpacing: '-0.02em', color: '#fff', opacity: 1 - out, visibility: vis(1 - out),
      transform: `translateY(${-80 * out}px) scale(${drift})` }}>
      {line(['From', 'raw', 'sequences', 'to', 'answers,'], 0.4, '#fff')}
      {line(['in', 'minutes'], 1.45, '#fff')}
    </div>
  );
}

function Sidebar({ T, K }) {
  const wRep = MOTION.enter(T, K.R + 0.2, 0.4);
  const wSam = 1 - wRep;
  const ready = T >= K.U + 6.0 ? 3 : 0;
  const items = [
    ['Home', IC.home, null, 0], ['Samples', IC.flask, 21 + ready, wSam], ['Plasmids', ['M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0', 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M5.6 5.6l3.6 3.6'], 52 + (ready ? 7 : 0), 0], ['Collections', IC.folder, 3, 0],
    ['Clusters', IC.cluster, 4, 0], ['Reports', IC.report, T >= K.R + 0.6 ? 3 : 2, wRep],
  ];
  const row = (label, icon, count, w, top, isNew) => (
    <div key={label} style={abs(12, top, 224, 38, { borderRadius: 7 })}>
      <div style={abs(0, 0, 224, 38, { borderRadius: 7, background: C.b50, opacity: w })} />
      <div style={abs(10, 0, 202, 38, { display: 'flex', alignItems: 'center', gap: 12, color: w > 0.5 ? C.b700 : C.g700, font: `500 15px ${FONT}` })}>
        <Icon d={icon} size={18} />
        <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>{label}{isNew && <span style={{ height: 20, padding: '0 7px', borderRadius: 10, background: C.b700, color: '#fff', font: `600 11px ${FONT}`, letterSpacing: '0.04em', display: 'flex', alignItems: 'center' }}>New</span>}</span>
        {count != null && <span style={{ font: `400 14px ${FONT}`, color: w > 0.5 ? C.b700 : C.g500 }}>{count}</span>}
      </div>
    </div>
  );
  return (
    <div style={abs(0, 0, 248, 800, { background: '#fff', borderRight: `1px solid ${C.g200}`, boxSizing: 'border-box' })}>
      <div style={abs(20, 0, 208, 56, { display: 'flex', alignItems: 'center', gap: 12, color: C.g800, font: `500 15px ${FONT}` })}>
        <Icon d={IC.building} size={19} color={C.g600} /><span style={{ flex: 1 }}>Solu lab · St. Agnes</span><Icon d={IC.chevron} size={18} color={C.g500} />
      </div>
      <div style={abs(0, 56, 248, 1, { background: C.g200 })} />
      {items.map((it, i) => row(it[0], it[1], it[2], it[3], 72 + i * 42, it[4]))}
      <div style={abs(0, 748, 248, 1, { background: C.g200 })} />
      {row('Help & feedback', IC.help, null, 0, 756)}
    </div>
  );
}

function Tabs({ T, labels, at, from = 0, to = 1, positions }) {
  const p = at == null ? 0 : MOTION.draw(T, at, 0.35);
  const a = positions[from], b = positions[to];
  return (
    <React.Fragment>
      <div style={abs(lerp(a[0], b[0], p), 0, lerp(a[1], b[1], p), 36, { borderRadius: 8, background: '#fff', border: `1px solid ${C.g200}`, boxShadow: '0 1px 2px rgba(16,24,40,0.06)', boxSizing: 'border-box' })} />
      {labels.map((l, i) => {
        const active = (p < 0.5 ? from : to) === i;
        return <div key={l} style={abs(positions[i][0], 0, positions[i][1], 36, { display: 'flex', alignItems: 'center', justifyContent: 'center', font: `${active ? 600 : 500} 15px ${FONT}`, color: active ? C.g900 : C.g500 })}>{l}</div>;
      })}
    </React.Fragment>
  );
}

function SamplesView({ T, K }) {
  const { U, S, L } = K;
  const o = 1 - MOTION.enter(T, L - 0.4, 0.4);
  const ins = MOTION.draw(T, U + 5.9, 0.7);
  const tableO = 1 - MOTION.enter(T, S + 4.75, 0.4);
  const treeO = MOTION.enter(T, S + 4.9, 0.5);
  const COLS = [['Sample', 64], ['QC', 290], ['Species', 380], ['MLST', 610], ['Resistance genes', 730], ['Cluster', 1050]];
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.g50, opacity: o, visibility: vis(o) }}>
      <Topbar crumbs={['Samples']} />
      <div style={abs(32, 80, 400, 36, { font: `600 24px ${FONT}`, color: C.g900 })}>Samples</div>
      <Btn primary={false} icon={IC.download} style={abs(1032, 78, 168, 40)}>Export .xlsx</Btn>
      <div style={abs(32, 128, 320, 36)}>
        <Tabs T={T} labels={['Table', 'Tree', 'Resistome']} at={S + 4.6} positions={[[0, 70], [74, 60], [138, 104]]} />
      </div>
      <div style={abs(32, 184, 1168, 44 + 56 * (5 + 3 * ins), { borderRadius: 12, border: `1px solid ${C.g200}`, background: '#fff', boxSizing: 'border-box', overflow: 'hidden', opacity: tableO, visibility: vis(tableO) })}>
        <Check x={20} y={13} />
        {COLS.map(([c, x]) => <div key={c} style={abs(x, 0, 300, 44, { display: 'flex', alignItems: 'center', font: `500 12px ${FONT}`, letterSpacing: '0.06em', color: C.g500 })}>{c}</div>)}
        <div style={abs(0, 43, 1168, 1, { background: C.g200 })} />
        {ROWS.map((r, i) => {
          const isNew = i < 3;
          const pos = isNew ? i : i - 3 + 3 * ins;
          const ro = isNew ? MOTION.enter(T, U + 6.1 + i * 0.12, 0.5) : 1;
          const rt = S + 0.4 + i * 0.35;
          const rv = isNew ? MOTION.enter(T, rt, 0.5) : 1;
          const fl = isNew ? win(T, rt, rt + 1.0, 0.3) : 0;
          const h = fl;
          return (
            <div key={r.id} style={abs(0, 44 + pos * 56, 1168, 56, { opacity: ro, visibility: vis(ro), transform: `translateY(${(1 - ro) * -10}px)` })}>
              {pos > 0.01 && <div style={abs(0, 0, 1168, 1, { background: C.g100 })} />}
              <div style={abs(0, 0, 1168, 56, { background: C.b50, opacity: h })} />
              <Check x={20} y={19} />
              <div style={abs(64, 0, 220, 56, { display: 'flex', alignItems: 'center', font: `400 14.5px ${MONO}`, color: C.g800 })}>{r.id}</div>
              <Reveal x={290} w={80} rv={rv} sk={34}><div style={{ width: 34, height: 5, borderRadius: 3, background: C.b500 }} /></Reveal>
              <Reveal x={380} w={220} rv={rv} sk={140} spin={<Spinner T={T} />}><span style={{ font: `italic 400 15px ${FONT}`, color: C.g800 }}>{r.sp}</span></Reveal>
              <Reveal x={610} w={110} rv={rv} sk={52}><span style={{ font: `400 15px ${FONT}`, color: C.g800 }}>{r.ty}</span></Reveal>
              <Reveal x={730} w={310} rv={rv} sk={120}>
                {r.g.length ? r.g.map((g) => <span key={g} style={{ font: `400 14px ${MONO}`, color: C.g700 }}>{g}</span>) : <span style={{ font: `400 14px ${FONT}`, color: C.g400 }}>None detected</span>}
              </Reveal>
              <Reveal x={1050} w={110} rv={rv} sk={40}>
                {r.cl ? <Badge tone="green" mono>{r.cl}</Badge> : <span style={{ font: `400 14px ${FONT}`, color: C.g400 }}>Not computed</span>}
              </Reveal>
            </div>
          );
        })}
      </div>
      <TreeCard T={T} K={K} o={treeO} />
    </div>
  );
}

function TreeCard({ T, K, o }) {
  const { P } = K;
  const c = MOTION.enter(T, P + 4.0, 0.8);
  const band = MOTION.draw(T, P + 4.0, 0.9);
  const pill = MOTION.pop(T, P + 4.6, 0.55);
  const cn = TREE_EDGES.cluster;
  const yA = LY0, yD = LY0 + 3 * LG;
  const bx = TREE_EDGES.find((e) => e.x === cn.x && e.y === cn.y).px - 14;
  const edgeStart = (e) => P + 0.4 + (e.depth - 1) * 0.34;
  const ctl = (icon, top) => (
    <div key={top} style={abs(1106, top, 38, 38, { borderRadius: 8, border: `1px solid ${C.g300}`, background: '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.g700 })}><Icon d={icon} size={18} /></div>
  );
  return (
    <div style={abs(32, 184, 1168, 596, { borderRadius: 12, border: `1px solid ${C.g200}`, background: '#fff', boxSizing: 'border-box', overflow: 'hidden', opacity: o, visibility: vis(o) })}>
      <div style={abs(24, 0, 800, 60, { display: 'flex', alignItems: 'center', gap: 10 })}>
        <span style={{ font: `600 17px ${FONT}`, color: C.g900 }}>Phylogeny</span>
        <span style={{ font: `italic 400 15px ${FONT}`, color: C.g500 }}>Escherichia coli</span>
        <span style={{ font: `400 15px ${FONT}`, color: C.g500 }}>· 10 samples · core-genome SNPs</span>
      </div>
      <div style={abs(1014, 0, 130, 60, { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18, color: C.g600 })}>
        <Icon d={IC.info} size={21} /><Icon d={IC.download} size={21} /><Icon d={IC.sliders} size={21} />
      </div>
      <div style={abs(0, 60, 1168, 1, { background: C.g200 })} />
      <svg width="1168" height="596" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <rect x={bx} y={yA - 20} width={Math.max(0, (836 - bx) * band)} height={yD - yA + 40} rx="10" fill={BLUE[50]} stroke={BLUE[200]} strokeWidth="1" opacity={band > 0 ? 1 : 0} />
        <path d={`M${TX0 - 14} ${TREE.y}H${TX0}`} stroke={C.g400} strokeWidth="1.4" fill="none" opacity={MOTION.enter(T, P + 0.2, 0.3)} />
        {TREE_EDGES.map((e, i) => {
          const p = MOTION.draw(T, edgeStart(e), 0.5);
          const d = `M${e.px} ${e.py}V${e.y}H${e.x}`;
          return (
            <g key={i}>
              <path d={d} pathLength="1" stroke={C.g400} strokeWidth="1.4" fill="none" strokeDasharray="1" strokeDashoffset={1 - p} />
              {e.cl && <path d={d} stroke={BLUE[600]} strokeWidth="2" fill="none" opacity={c} />}
            </g>
          );
        })}
      </svg>
      {TREE_EDGES.filter((e) => e.leaf != null).map((e) => {
        const lp = MOTION.enter(T, edgeStart(e) + 0.4, 0.5);
        const inC = e.cl && c > 0.5;
        return (
          <div key={e.leaf} style={abs(e.x + 12, e.y - 15, 220, 30, { display: 'flex', alignItems: 'center', font: `${inC ? 500 : 400} 15px ${FONT}`, color: inC ? BLUE[700] : C.g700, opacity: lp, transform: `translateX(${(1 - lp) * 10}px)` })}>{LEAVES[e.leaf]}</div>
        );
      })}
      <div style={abs(856, (yA + yD) / 2 - 32, 196, 64, { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '0 16px', boxSizing: 'border-box', borderRadius: 10, background: '#fff', border: `1px solid ${BLUE[200]}`, boxShadow: '0 4px 10px -4px rgba(2,106,162,0.25)', opacity: clp(pill, 0, 1), transform: `scale(${lerp(0.8, 1, pill)})`, transformOrigin: 'left center' })}>
        <span style={{ font: `600 15px ${FONT}`, color: C.g900 }}>Cluster Ec1</span>
        <span style={{ font: `400 13px ${FONT}`, color: BLUE[700] }}>4 samples · ≤ 5 SNPs</span>
      </div>
      {ctl(IC.plus, 444)}{ctl(IC.minus, 490)}{ctl(IC.expand, 536)}
    </div>
  );
}

const pol = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
function featPath(cx, cy, r1, r2, a0, a1, dir) {
  if (a1 - a0 < 0.2) return '';
  const tip = Math.min(3, (a1 - a0) * 0.45), rm = (r1 + r2) / 2;
  const f = (r, a) => pol(cx, cy, r, a).map((v) => v.toFixed(2)).join(' ');
  if (dir > 0) {
    const b = a1 - tip;
    return `M${f(r2, a0)}A${r2} ${r2} 0 0 1 ${f(r2, b)}L${f(rm, a1)}L${f(r1, b)}A${r1} ${r1} 0 0 0 ${f(r1, a0)}Z`;
  }
  const b = a0 + tip;
  return `M${f(rm, a0)}L${f(r2, b)}A${r2} ${r2} 0 0 1 ${f(r2, a1)}L${f(r1, a1)}A${r1} ${r1} 0 0 0 ${f(r1, b)}Z`;
}
const nz = (a) => { const r = a * Math.PI / 180; return 0.5 * Math.sin(3 * r + 1) + 0.3 * Math.sin(7 * r + 2) + 0.2 * Math.sin(13 * r + 0.5); };
function bandPath(cx, cy, fo, fi, a0, sweep) {
  if (sweep < 1) return '';
  const out = [], inn = [];
  for (let a = a0; a <= a0 + sweep + 0.001; a += 2) { out.push(pol(cx, cy, fo(a), a)); inn.push(pol(cx, cy, fi(a), a)); }
  return 'M' + out.concat(inn.reverse()).map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
}
function Chip({ color, children, strike }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 8px', borderRadius: 6, border: `1px solid ${C.g200}`, font: `400 12.5px ${FONT}`, color: C.g700, whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: color }} />{children}
    </span>
  );
}
function PlasmidView({ T, K }) {
  const { L, R } = K;
  const o = MOTION.enter(T, L - 0.3, 0.5) * (1 - MOTION.enter(T, R + 0.2, 0.4));
  const card = MOTION.enter(T, L - 0.1, 0.8);
  const gc = MOTION.draw(T, L + 0.6, 1.6);
  const sk = MOTION.draw(T, L + 0.8, 1.6);
  const hl = MOTION.enter(T, L + 3.0, 0.6);
  const btn = press(T, R - 0.1);
  const cx = 344, cy = 204, r1 = 142, r2 = 158;
  const skv = (a) => Math.pow(Math.abs(Math.sin(a * Math.PI / 180)), 0.5) * (0.7 + 0.3 * nz(a * 2));
  const tabs = [['Overview'], ['QC Stats'], ['Phylogeny'], ['AMR', 3], ['Plasmids', 2, true], ['Virulence', 1]];
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.g50, opacity: o, visibility: vis(o) }}>
      <Topbar crumbs={['Samples', 'BC-2026-04182-001']} />
      <div style={abs(32, 78, 800, 34, { font: `600 24px ${FONT}`, color: C.g900 })}>BC-2026-04182-001</div>
      <div style={abs(32, 112, 900, 24, { display: 'flex', gap: 6, font: `400 15px ${FONT}`, color: C.g500 })}>
        <span style={{ fontStyle: 'italic' }}>Escherichia coli</span><span>· ST131 · Uploaded 2 mins ago by Olivia Rhye</span>
      </div>
      <Btn primary={false} icon={IC.edit} style={abs(940, 76, 100, 40)}>Edit</Btn>
      <Btn primary={false} icon={IC.reportPlus} style={abs(1052, 76, 148, 40, { transform: `scale(${1 - 0.05 * btn})`, background: btn > 0 ? C.g50 : '#fff' })}>Create report</Btn>
      <div style={abs(32, 146, 1168, 44)}>
        <div style={abs(0, 43, 1168, 1, { background: C.g200 })} />
        <div style={abs(0, 0, 1168, 44, { display: 'flex', gap: 28 })}>
          {tabs.map(([l, n, a]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 4px', boxSizing: 'border-box', borderBottom: `2px solid ${a ? C.b700 : 'transparent'}`, font: `${a ? 600 : 500} 15px ${FONT}`, color: a ? C.b700 : C.g500 }}>
              {l}{n != null && <span style={{ minWidth: 22, height: 22, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: a ? C.b50 : C.g100, border: `1px solid ${a ? C.b200 : C.g200}`, font: `500 12px ${FONT}`, color: a ? C.b700 : C.g700, boxSizing: 'border-box' }}>{n}</span>}
            </div>
          ))}
        </div>
      </div>
      <div style={abs(32, 208, 400, 32, { font: `600 20px ${FONT}`, color: C.g900 })}>Plasmids</div>
      <div style={abs(940, 202, 260, 40, { borderRadius: 8, border: `1px solid ${C.g300}`, background: '#fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', font: `400 15px ${FONT}`, color: C.g500 })}>
        All plasmids<Icon d={IC.chevron} size={18} />
      </div>
      <div style={abs(32, 256, 1168, 528, { borderRadius: 12, border: `1px solid ${C.g200}`, background: '#fff', boxSizing: 'border-box', overflow: 'hidden', opacity: card, transform: `translateY(${(1 - card) * 24}px)` })}>
        {/* plasmid list */}
        <div style={abs(0, 0, 260, 528, { borderRight: `1px solid ${C.g200}`, boxSizing: 'border-box' })}>
          <div style={abs(0, 0, 259, 116, { background: C.b25, borderLeft: `3px solid ${C.b700}`, borderBottom: `1px solid ${C.g200}`, boxSizing: 'border-box', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ font: `600 16px ${FONT}`, color: C.g900 }}>pEC-04182-1</span><span style={{ font: `400 14px ${FONT}`, color: C.g500, whiteSpace: 'nowrap' }}>92 kb</span></div>
            <div style={{ display: 'flex', gap: 6 }}><Badge tone="orange">Conjugative</Badge><Badge tone="pink">2 AMR</Badge></div>
            <span style={{ font: `400 14px ${FONT}`, color: C.g600 }}>IncFII</span>
          </div>
          <div style={abs(0, 116, 259, 116, { borderBottom: `1px solid ${C.g200}`, boxSizing: 'border-box', padding: '16px 18px 16px 21px', display: 'flex', flexDirection: 'column', gap: 10 })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ font: `600 16px ${FONT}`, color: C.g900 }}>pEC-04182-2</span><span style={{ font: `400 14px ${FONT}`, color: C.g500, whiteSpace: 'nowrap' }}>4.1 kb</span></div>
            <div style={{ display: 'flex', gap: 6 }}><Badge tone="orange">Mobilizable</Badge></div>
            <span style={{ font: `400 14px ${FONT}`, color: C.g600 }}>Col440I</span>
          </div>
        </div>
        {/* map header */}
        <div style={abs(284, 12, 500, 24, { font: `600 17px ${FONT}`, color: C.g900 })}>Plasmid map</div>
        <div style={abs(284, 36, 500, 20, { font: `400 14px ${FONT}`, color: C.g500 })}>pEC-04182-1 · 92,418 bp</div>
        <Segmented labels={['Circular', 'Linear']} style={abs(880, 14, 160, 38)} />
        <Btn primary={false} icon={IC.download} style={abs(1052, 13, 100, 40, { padding: '0 12px' })}>Export</Btn>
        <div style={abs(260, 64, 908, 1, { background: C.g200 })} />
        {[['Replicon', 'IncFII'], ['Mobility', 'Conjugative'], ['Relaxase', 'MOBF'], ['Closest match', 'LC556384', '(99.8%)']].map((c, i) => (
          <div key={c[0]} style={abs(260 + i * 227, 65, 227, 56, { borderLeft: i ? `1px solid ${C.g200}` : 'none', boxSizing: 'border-box', padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 3 })}>
            <span style={{ font: `400 13px ${FONT}`, color: C.g500 }}>{c[0]}</span>
            <span style={{ font: `600 14px ${FONT}`, color: c[2] ? C.b700 : C.g900 }}>{c[1]}{c[2] && <span style={{ fontWeight: 400, color: C.g600 }}> {c[2]}</span>}</span>
          </div>
        ))}
        <div style={abs(260, 120, 908, 1, { background: C.g200 })} />
        {/* map */}
        <svg width="688" height="408" style={{ position: 'absolute', left: 260, top: 120, overflow: 'visible' }}>
          <circle cx={cx} cy={cy} r={(r1 + r2) / 2} fill="none" stroke={C.g100} strokeWidth="22" opacity={card} />
          <path d={bandPath(cx, cy, (a) => 118 + 8 * nz(a), (a) => 104 - 5 * nz(a * 1.7 + 40), 0, 360 * gc)} fill="#2F4A40" />
          <path d={bandPath(cx, cy, (a) => 84 + 14 * skv(a), () => 84, 0, Math.min(180, 360 * sk))} fill="#17B26A" />
          <path d={bandPath(cx, cy, () => 84, (a) => 84 - 14 * skv(a), 180, Math.max(0, 360 * sk - 180))} fill="#7A5AF8" />
          <circle cx={cx} cy={cy} r="62" fill="none" stroke={C.g300} strokeWidth="1" opacity={gc} />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = i * 30, p0 = pol(cx, cy, 62, a), p1 = pol(cx, cy, 56, a);
            return <line key={i} x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} stroke={C.g400} strokeWidth="1" opacity={gc} />;
          })}
          <text x={cx} y={cy - 2} textAnchor="middle" style={{ font: `600 14px ${FONT}`, fill: C.g900 }} opacity={gc}>pEC-04182-1</text>
          <text x={cx} y={cy + 18} textAnchor="middle" style={{ font: `400 12.5px ${FONT}`, fill: C.g500 }} opacity={gc}>92,418 bp</text>
          {FEAT.map((f, i) => {
            const [name, a0, a1, kind, dir] = f;
            const hi = name === 'blaCTX-M-15';
            const p = MOTION.draw(T, L + 0.4 + i * 0.06, 0.4);
            const end = lerp(a0, a1, p);
            const dim = hi ? 1 : lerp(1, 0.35, hl);
            const R1 = hi ? r1 - 3 * hl : r1, R2 = hi ? r2 + 7 * hl : r2;
            const am = (a0 + a1) / 2, s = Math.sin(am * Math.PI / 180);
            const lp = pol(cx, cy, hi ? 176 + 6 * hl : 174, am);
            return (
              <g key={i} opacity={dim}>
                <path d={featPath(cx, cy, R1, R2, a0, end, dir)} fill={FCOL[kind]} />
                {name && <text x={lp[0]} y={lp[1] + 4} textAnchor={s > 0.15 ? 'start' : s < -0.15 ? 'end' : 'middle'} opacity={clp(p * 2 - 1, 0, 1)}
                  style={{ font: `${hi ? `${hl > 0.5 ? 600 : 400} ${lerp(12, 15, hl)}px` : '400 12px'} ${FONT}`, fill: FTXT[kind] }}>{name}</text>}
              </g>
            );
          })}
        </svg>
        {/* legend */}
        <div style={abs(948, 120, 220, 408, { borderLeft: `1px solid ${C.g200}`, boxSizing: 'border-box', padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 10, opacity: MOTION.enter(T, L + 0.6, 0.6) })}>
          <span style={{ font: `600 14px ${FONT}`, color: C.g800 }}>Display</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}><Chip color="#17B26A">GC skew +</Chip><Chip color="#7A5AF8">GC skew −</Chip><Chip color="#2F4A40">GC content</Chip></div>
          <div style={{ height: 1, background: C.g200, margin: '4px -14px' }} />
          <span style={{ font: `600 14px ${FONT}`, color: C.g800 }}>Feature types</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}><Chip color={FCOL.amr}>AMR</Chip><Chip color={FCOL.mob}>Mobile</Chip><Chip color={FCOL.cds}>CDS</Chip><Chip color={FCOL.vir}>Virulence</Chip><Chip color={FCOL.rna}>tRNA</Chip></div>
          <div style={{ height: 1, background: C.g200, margin: '4px -14px' }} />
          <span style={{ font: `600 14px ${FONT}`, color: C.g800 }}>AMR and virulence</span>
          {[['blaCTX-M-15', FCOL.amr, true], ["aac(6')-Ib-cr", FCOL.amr], ['senB', FCOL.vir]].map(([g, col, hi]) => (
            <div key={g} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, height: 28, padding: '0 8px', margin: '-2px -8px', borderRadius: 6 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: 6, background: '#FDF2FA', border: '1px solid #FCCEEE', opacity: hi ? hl : 0 }} />
              <span style={{ position: 'relative', width: 10, height: 10, borderRadius: 2, background: col }} />
              <span style={{ position: 'relative', font: `${hi && hl > 0.5 ? 600 : 400} 13.5px ${FONT}`, color: hi && hl > 0.5 ? '#C11574' : C.g700 }}>{g}</span>
            </div>
          ))}
        </div>
      </div>
      {(() => {
        const tp = win(T, L + 3.05, L + 6.7, 0.25);
        const row = (k2, v) => (
          <div key={k2} style={{ display: 'flex', justifyContent: 'space-between', font: `400 14px ${FONT}` }}>
            <span style={{ color: C.g400 }}>{k2}</span><span style={{ color: '#fff' }}>{v}</span>
          </div>
        );
        return (
          <div style={abs(520, 545, 250, undefined, { borderRadius: 10, background: '#1F2023', boxShadow: '0 16px 32px -8px rgba(16,24,40,0.35)', padding: '14px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 7, opacity: tp, visibility: vis(tp), transform: `translateY(${(1 - tp) * 8}px)`, zIndex: 3 })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ width: 11, height: 11, borderRadius: 2, background: FCOL.amr }} />
              <span style={{ font: `600 16px ${FONT}`, color: '#fff' }}>blaCTX-M-15</span>
            </div>
            {row('type', 'AMR gene')}{row('position', '20,024–20,899')}{row('length', '876 bp')}{row('strand', '+ forward')}
            <div style={{ height: 1, background: '#3A3D42', margin: '3px 0' }} />
            <span style={{ font: `400 13px ${FONT}`, color: C.g400 }}>Click to pin this section</span>
          </div>
        );
      })()}
    </div>
  );
}

function ReportView({ T, K }) {
  const { R } = K;
  const o = MOTION.enter(T, R + 0.35, 0.5);
  const paper = MOTION.enter(T, R + 0.35, 0.8);
  const bt = (i) => R + 0.7 + i * 0.42;
  const blk = (i) => MOTION.enter(T, bt(i), 0.7);
  const bs = (i) => ({ opacity: blk(i), transform: `translateY(${(1 - blk(i)) * 22}px)` });
  const exp = press(T, R + 6.95);
  const H = (t) => <div style={{ font: `600 16px ${FONT}`, color: C.b700, marginBottom: 8 }}>{t}</div>;
  const cards = [
    ['Subject details', 'Additional information', IC.grid, 1], ['Summary', 'Auto-generated, editable', IC.message, 2],
    ['Free text', 'Title + paragraph', IC.type, -1], ['Signature', 'Signed by and date', IC.pen, -1],
    ['Typing', 'MLST + specific typing', IC.dna, 4], ['AMR', 'By antimicrobial or gene', IC.shield, 3],
    ['Phylogenetic tree', 'Distance context', IC.nodes, -1], ['Quality control', 'Sequencing + assembly', IC.chart, -1],
  ];
  const cardPos = (i) => [24 + (i % 2) * 181, (i < 4 ? 108 : 370) + Math.floor((i % 4) / 2) * 110];
  const amr = [['Beta-lactam', ['blaCTX-M-15']], ['Aminoglycoside', ["aac(6')-Ib-cr"]], ['Quinolone', ['gyrA_S83L', 'parC_S80I']]];
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.g50, opacity: o, visibility: vis(o) }}>
      <Topbar home crumbs={['Reports', 'BC-2026-04182-001']} right={(
        <React.Fragment>
          <Segmented labels={['Edit', 'Preview']} style={abs(910, 10, 156, 36)} />
          <Btn icon={IC.exportUp} style={abs(1080, 8, 124, 40, { transform: `scale(${1 - 0.05 * exp})`, background: exp > 0 ? C.b700 : C.b600 })}>Export</Btn>
        </React.Fragment>
      )} />
      <div style={abs(40, 76, 752, 740, { background: '#fff', border: `1px solid ${C.g200}`, borderRadius: 4, boxShadow: '0 12px 24px -8px rgba(16,24,40,0.10), 0 4px 8px -4px rgba(16,24,40,0.04)', boxSizing: 'border-box', padding: '36px 44px', opacity: paper, transform: `translateY(${(1 - paper) * 24}px) scale(${lerp(0.97, 1, paper)})` })}>
        <div style={bs(0)}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ font: `500 28px ${FONT}`, color: C.g900 }}>BC-2026-04182-001</span>
            <span style={{ font: `400 14px ${FONT}`, color: C.g500 }}>Report date: 18 Apr 2026</span>
          </div>
          <div style={{ font: `400 15px ${FONT}`, color: C.g500, marginTop: 6 }}>Microbial Whole Genome Sequencing (WGS) Analysis</div>
          <div style={{ height: 1, background: C.g200, margin: '20px 0' }} />
        </div>
        <div style={Object.assign({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24, background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 10, padding: '14px 18px', marginBottom: 22 }, bs(1))}>
          {[['Isolates', 'Escherichia coli', true], ['Ordered by', 'Infection Prevention']].map(([l, v, it]) => (
            <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ font: `500 12px ${FONT}`, letterSpacing: '0.06em', color: C.g500 }}>{l}</span>
              <span style={{ font: `${it ? 'italic ' : ''}400 15px ${FONT}`, color: C.g800, borderBottom: `1px dashed ${C.g300}`, paddingBottom: 3 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={Object.assign({ marginBottom: 22 }, bs(2))}>
          {H('Summary')}
          <div style={{ font: `400 15px/1.55 ${FONT}`, color: C.g700, textWrap: 'pretty' }}>This isolate was identified as <i>Escherichia coli</i> (ST131). The extended-spectrum β-lactamase gene blaCTX-M-15 was detected on a conjugative IncFII plasmid. All quality control checks passed.</div>
        </div>
        <div style={Object.assign({ marginBottom: 22 }, bs(3))}>
          {H('Antimicrobial resistance')}
          <div style={{ font: `500 14px ${FONT}`, color: C.g800, marginBottom: 8 }}>Full resistome</div>
          <div style={{ border: `1px solid ${C.g200}`, borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', alignItems: 'center', height: 36, padding: '0 14px', font: `400 13px ${FONT}`, color: C.g500 }}><span>Antimicrobial</span><span>Resistance genes</span></div>
            {amr.map(([a, gs]) => (
              <div key={a} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', alignItems: 'center', height: 40, padding: '0 14px', borderTop: `1px solid ${C.g200}` }}>
                <span style={{ font: `400 15px ${FONT}`, color: C.g800 }}>{a}</span>
                <div style={{ display: 'flex', gap: 14 }}>
                  {gs.map((g) => <span key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, font: `400 13.5px ${MONO}`, color: C.g700 }}>{g}<Icon d={IC.check} size={14} color={C.b600} sw={2.2} /></span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={bs(4)}>
          {H('Typing')}
          <div style={{ width: 340, border: `1px solid ${C.g200}`, borderRadius: 8, padding: '14px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ font: `400 13px ${FONT}`, color: C.g500 }}>MLST</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ font: `600 22px ${FONT}`, color: C.g900 }}>ST-131</span><Badge tone="green">Exact match</Badge></div>
          </div>
        </div>
      </div>
      <div style={abs(832, 57, 400, 743, { background: '#fff', borderLeft: `1px solid ${C.g200}`, boxSizing: 'border-box' })}>
        <div style={abs(24, 0, 352, 52, { display: 'flex', gap: 22, borderBottom: `1px solid ${C.g200}`, boxSizing: 'border-box' })}>
          <span style={{ display: 'flex', alignItems: 'center', font: `600 15px ${FONT}`, color: C.b700, borderBottom: `2px solid ${C.b700}`, padding: '0 4px', marginBottom: -1 }}>Blocks</span>
          <span style={{ display: 'flex', alignItems: 'center', font: `500 15px ${FONT}`, color: C.g500 }}>Properties</span>
        </div>
        <div style={abs(24, 74, 352, 22, { font: `500 15px ${FONT}`, color: C.g800 })}>About this report</div>
        <div style={abs(24, 338, 352, 22, { font: `500 15px ${FONT}`, color: C.g800 })}>Findings</div>
        {cards.map(([t, s, ic, b], i) => {
          const [x, y] = cardPos(i);
          const f = b >= 0 ? win(T, bt(b) - 0.1, bt(b) + 0.9, 0.25) : 0;
          return (
            <div key={t} style={abs(x, y, 171, 100, { borderRadius: 8, border: `1px solid ${C.g200}`, background: '#fff', boxSizing: 'border-box', overflow: 'hidden' })}>
              <div style={abs(-1, -1, 171, 100, { borderRadius: 8, border: `1px solid ${C.b300}`, background: C.b25, boxSizing: 'border-box', opacity: f })} />
              <div style={abs(12, 12, 32, 32, { borderRadius: 8, background: C.b50, border: `1px solid ${C.b100}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.b700 })}><Icon d={ic} size={17} /></div>
              <div style={abs(12, 54, 150, 20, { font: `600 14px ${FONT}`, color: C.g900, whiteSpace: 'nowrap' })}>{t}</div>
              <div style={abs(12, 75, 150, 18, { font: `400 12px ${FONT}`, color: C.g500, whiteSpace: 'nowrap' })}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AddSamplesModal({ T, K }) {
  const U = K.U;
  const open = MOTION.enter(T, U + 1.7, 0.4) * (1 - MOTION.draw(T, U + 5.5, 0.4));
  const landed = [0, 1, 2].filter((i) => T >= flyEnd(K.U, i) - 0.05).length;
  const active = T >= flyStart(U, 0) + 0.25 && landed < 3;
  const done = landed === 3;
  const mb = [212, 198, 231].slice(0, landed).reduce((a, b) => a + b, 0);
  const btn = press(T, U + 5.3);
  const lit = active || done;
  return (
    <div style={abs(-6, -6, 1492, 812, { background: `rgba(16,24,40,${(0.42 * open).toFixed(3)})`, visibility: vis(open), zIndex: 5 })}>
      <div style={abs(6, 6, 0, 0)}>
      <div style={abs(410, 150, 660, 372, { background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 32px 90px rgba(16,24,40,.34)', opacity: open, transform: `scale(${0.965 + 0.035 * open}) translateY(${(1 - open) * 10}px)` })}>
        <div style={abs(24, 0, 612, 64, { display: 'flex', alignItems: 'center', justifyContent: 'space-between' })}>
          <span style={{ font: `600 19px ${FONT}`, color: C.g900 }}>Add samples</span>
          <Icon d={['M6 6l12 12', 'M18 6L6 18']} size={20} color={C.g400} sw={2} />
        </div>
        <div style={abs(24, 64, 612, 220, { borderRadius: 10, border: `2px dashed ${active ? C.b600 : done ? C.b400 : C.g300}`, background: active ? C.b50 : done ? C.b25 : C.g25, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 })}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: lit ? C.b600 : C.g100, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${done ? lerp(0.8, 1, MOTION.pop(T, flyEnd(U, 2), 0.45)) : 1})` }}>
            <Icon d={done ? IC.check : IC.upload} size={26} color={lit ? '#fff' : C.g600} sw={2} />
          </div>
          <span style={{ font: `600 17px ${FONT}`, color: lit ? C.b800 : C.g700 }}>{active ? 'Drop to add' : done ? '3 files ready' : 'Drag sequencing files here'}</span>
          <span style={{ font: `400 14px ${FONT}`, color: C.g500 }}>{landed ? `${mb} MB` : 'FASTQ, FASTA or BAM'}</span>
        </div>
        <div style={abs(0, 304, 660, 68, { borderTop: `1px solid ${C.g100}`, background: C.g25, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, padding: '0 24px' })}>
          <span style={{ font: `600 15px ${FONT}`, color: C.g600, padding: '0 12px' }}>Cancel</span>
          <Btn style={{ width: 150, background: done ? (btn > 0 ? C.b700 : C.b600) : C.b200, borderColor: done ? C.b600 : C.b200, transform: `scale(${1 - 0.05 * btn})` }}>{done ? 'Add 3 samples' : 'Add samples'}</Btn>
        </div>
      </div>
      </div>
    </div>
  );
}
function FlyFiles({ T, K }) {
  return (
    <React.Fragment>
      {UPLOADS.map((f, i) => {
        const s0 = flyStart(K.U, i), e = flyEnd(K.U, i);
        if (T < s0 - 0.05 || T > e + 0.4) return null;
        const fl = FLY[i];
        const x = lerp(fl.fx, 740 + (i - 1) * 14, MOTION.enter(T, s0, e - s0));
        const y = lerp(fl.fy, 330 + (i % 2 ? 9 : -7), MOTION.enter(T, s0, e - s0 + 0.08));
        const op = clp((T - s0) / 0.3, 0, 1) * (1 - MOTION.draw(T, e - 0.04, 0.38));
        const sc = lerp(1, 0.72, MOTION.draw(T, e - 0.24, 0.54));
        const rot = lerp(fl.rot, 0, MOTION.enter(T, s0, e - s0 + 0.05));
        return (
          <div key={i} style={abs(x, y, 0, 0, { zIndex: 6 })}>
            <div style={{ position: 'absolute', left: 0, top: 0, opacity: op, transform: `translate(-50%,-50%) scale(${sc}) rotate(${rot}deg)`, background: '#fff', border: `1px solid ${C.g200}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', boxShadow: '0 14px 34px rgba(16,24,40,.16)' }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: C.b50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={IC.file} size={17} color={C.b600} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ font: `600 14px ${FONT}`, color: C.g900 }}>{f.n}</span>
                <span style={{ font: `400 12.5px ${FONT}`, color: C.g400 }}>{f.s}</span>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}
function Cursor({ T, K, cur }) {
  const clicks = [K.U + 1.6, K.U + 5.3, K.S + 4.6, K.P + 9.1, K.L + 3.0, K.R - 0.1, K.R + 6.95];
  const o = win(T, K.U + 0.8, K.G - 0.2, 0.3);
  const pr = Math.max(...clicks.map((c) => press(T, c)));
  return (
    <div style={abs(cur.x, cur.y, 0, 0, { opacity: o, visibility: vis(o), zIndex: 7 })}>
      {clicks.map((c, i) => {
        const p = MOTION.enter(T, c, 0.6);
        const on = T >= c && p < 1;
        return <div key={i} style={abs(-24 * p - 6, -24 * p - 6, 12 + 48 * p, 12 + 48 * p, { borderRadius: '50%', border: `2px solid ${C.b500}`, opacity: on ? (1 - p) : 0 })} />;
      })}
      <svg width="30" height="30" viewBox="0 0 24 24" style={{ position: 'absolute', left: -3, top: -2, transform: `scale(${1 - 0.15 * pr})`, transformOrigin: '3px 2px', filter: 'drop-shadow(0 2px 3px rgba(16,24,40,0.3))' }}>
        <path d="M3 2 L3 19.5 L7.6 15.4 L10.7 22.2 L13.8 20.9 L10.8 14.2 L17 14.2 Z" fill={C.g900} stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function AppWindow({ T, K }) {
  const inP = MOTION.enter(T, 4.65, 1.45);
  const outP = MOTION.draw(T, K.G - 0.6, 1.0);
  const o = Math.min(inP, 1 - outP);
  const cam = cameraAt(T, K);
  const cur = cursorAt(T, K);
  return (
    <div style={abs(220, 228, 1480, 800, {
      borderRadius: 14, overflow: 'hidden', background: C.g50, opacity: o, visibility: vis(o),
      transform: `translateY(${lerp(140, 0, inP) - 24 * outP}px) scale(${lerp(0.94, 1, inP) * lerp(1, 0.92, outP)})`,
      boxShadow: '0 40px 90px -30px rgba(7,59,45,0.75), 0 10px 30px -10px rgba(7,59,45,0.45)',
    })}>
      <div style={abs(0, 0, 1480, 800, { transformOrigin: '0 0', transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})` })}>
        <Sidebar T={T} K={K} />
        <div style={abs(248, 0, 1232, 800, { overflow: 'hidden', background: C.g50, isolation: 'isolate' })}>
          <div style={abs(0, 56, 1232, 1, { background: C.g200, zIndex: 2 })} />
          <SamplesView T={T} K={K} />
          <PlasmidView T={T} K={K} />
          <ReportView T={T} K={K} />
        </div>
        <AddSamplesModal T={T} K={K} />
        <FlyFiles T={T} K={K} />
        <Cursor T={T} K={K} cur={cur} />
      </div>
    </div>
  );
}

const CUSTOMERS = [
  ['stanford.svg', 300, 104], ['cedars-sinai.svg', 512, 163], ['karolinska.svg', 259, 59], ['va.svg', 500, 111],
  ['uz-leuven.jpg', 1320, 427], ['akershus.svg', 531, 58], ['phf-science.svg', 135, 44],
];
const LABS = [
  [60.17, 24.94], [51.51, -0.13], [42.36, -71.06], [33.75, -84.39], [-23.55, -46.63], [-33.92, 18.42], [-1.29, 36.82],
  [19.08, 72.88], [1.35, 103.82], [25.03, 121.57], [35.68, 139.65], [55.68, 12.57], [52.52, 13.40], [43.65, -79.38],
  [47.61, -122.33], [25.20, 55.27], [48.86, 2.35], [40.42, -3.70], [41.90, 12.50], [52.23, 21.01], [59.33, 18.07],
  [59.91, 10.75], [52.37, 4.90], [48.21, 16.37], [37.98, 23.73], [41.01, 28.98], [55.76, 37.62], [32.08, 34.78],
  [30.04, 31.24], [6.52, 3.38], [5.60, -0.19], [9.03, 38.74], [28.61, 77.21], [41.88, -87.63], [40.71, -74.01],
  [29.76, -95.37], [19.43, -99.13], [4.71, -74.07], [64.15, -21.94], [50.88, 4.70], [38.90, -77.04], [34.08, -118.38],
  [53.35, -6.26], [57.71, 11.97], [45.50, -73.57], [39.95, -75.17], [42.70, 23.32], [45.76, 4.84], [50.08, 14.44],
  [60.39, 5.32], [63.43, 10.39], [35.23, -80.84], [44.98, -93.27], [32.78, -96.80],
];
function gproj(lat, lon, rot, G) {
  const p = lat * Math.PI / 180, l = lon * Math.PI / 180 + rot;
  const cp = Math.cos(p), sp = Math.sin(p), cl = Math.cos(l), sl = Math.sin(l);
  const st = Math.sin(G.tilt), ct = Math.cos(G.tilt);
  return { x: G.cx + G.r * (cp * sl), y: G.cy - G.r * (ct * sp - st * cp * cl), z: st * sp + ct * cp * cl };
}
function GlobeHorizon({ T, K }) {
  const rise = MOTION.draw(T, K.G - 0.5, 1.6);
  const sink = MOTION.draw(T, K.N - 0.6, 0.8);
  const o = rise * (1 - sink);
  if (o <= 0.001) return null;
  const G = { cx: 960, cy: 1640 + 260 * (1 - rise) + 200 * sink, r: 820, tilt: -15 * Math.PI / 180 };
  const rot = 0.52 + (T - K.G) * 0.04;
  const lines = [];
  const run = (pts) => { if (pts.length > 1) lines.push(pts.join(' ')); };
  for (let m = -180; m < 180; m += 15) {
    let pts = [];
    for (let la = -20; la <= 90; la += 3) {
      const p = gproj(la, m, rot, G);
      if (p.z > 0 && p.y < 1100) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1)); else { run(pts); pts = []; }
    }
    run(pts);
  }
  for (let q = 0; q <= 75; q += 15) {
    let pts = [];
    for (let lo = -180; lo <= 180; lo += 3) {
      const p = gproj(q, lo, rot, G);
      if (p.z > 0 && p.y < 1100) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1)); else { run(pts); pts = []; }
    }
    run(pts);
  }
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0, opacity: o }}>
      <circle cx={G.cx} cy={G.cy} r={G.r} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none">
        {lines.map((pl, k2) => <polyline key={k2} points={pl} />)}
      </g>
      {LABS.map((c, n) => {
        const p = gproj(c[0], c[1], rot, G);
        if (p.z <= 0.02 || p.y > 1090) return null;
        const t0 = K.G + 0.15 + n * 0.022;
        const pp = MOTION.pop(T, t0, 0.4);
        const ring = MOTION.enter(T, t0, 1.3);
        const edge = clp(p.z * 4, 0, 1);
        return (
          <g key={n} opacity={edge}>
            <circle cx={p.x} cy={p.y} r={6 + 22 * ring} fill="none" stroke={C.b200} strokeWidth="1.5" opacity={T >= t0 ? (1 - ring) * 0.7 : 0} />
            <circle cx={p.x} cy={p.y} r={Math.max(0, 5 * pp)} fill={n % 4 === 0 ? C.b300 : '#fff'} />
          </g>
        );
      })}
    </svg>
  );
}
function CustomerLogos({ T, K, white }) {
  const out = 1 - MOTION.draw(T, K.N - 0.1, 0.2);
  const TW = 390, TH = 172, GAP = 26;
  return (
    <React.Fragment>
      <GlobeHorizon T={T} K={K} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 320, maxWidth: 4 * TW + 3 * GAP, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: GAP, opacity: out, visibility: vis(out) }}>
        {CUSTOMERS.map(([f, w, h], i) => {
          const ord = [3, 0, 5, 2, 6, 1, 4][i];
          const p = MOTION.pop(T, K.G + 0.45 + ord * 0.07, 0.4);
          const q = MOTION.draw(T, K.N - 0.55 + ord * 0.035, 0.3);
          const rot = [-8, 6, -5, 7, -6, 5, -7][i];
          const sc = Math.min(3.6, 340 / w, Math.sqrt(22000 / (w * h)));
          return (
            <div key={f} style={{ width: TW, height: TH, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: white ? 'none' : '0 18px 40px -20px rgba(7,59,45,0.6)', opacity: clp(p * 2.2, 0, 1) * (1 - q), transform: `translateY(${(1 - p) * 70 - q * 30}px) scale(${lerp(0.5, 1, p) * lerp(1, 0.85, q)}) rotate(${rot * (1 - p)}deg)` }}>
              <img src={`assets/logos/${f}`} alt="" style={{ width: w * sc, height: h * sc, display: 'block' }} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

const LOGO_FULL = ["M229.685 84.4928C249.462 65.1638 249.462 33.8256 229.685 14.4966C209.91 -4.83221 177.848 -4.83221 158.071 14.4966C138.297 33.8256 138.297 65.1638 158.071 84.4928C177.848 103.822 209.91 103.822 229.685 84.4928Z","M86.4561 14.4966C106.231 33.8256 106.231 65.1637 86.4561 84.4929C67.1817 103.333 66.6911 133.713 84.989 153.129C85.4829 153.576 85.9752 153.893 86.4561 154.362C106.231 173.696 138.289 173.836 158.063 154.503C177.84 135.174 209.902 135.174 229.677 154.503C249.454 173.83 249.454 205.168 229.677 224.497C210.403 243.339 209.914 273.719 228.212 293.134C228.704 293.58 229.191 294.038 229.672 294.507C249.447 313.836 249.447 345.174 229.672 364.503C209.896 383.832 177.833 383.832 158.058 364.503C138.282 345.174 138.282 313.836 158.058 294.507C158.552 294.023 159.054 293.553 159.563 293.093C177.824 273.676 177.325 243.324 158.063 224.497C157.504 223.951 156.961 223.397 156.435 222.831C137.099 205.536 107.33 205.557 88.0194 222.895C87.5108 223.436 86.9875 223.972 86.4496 224.497C66.6731 243.826 34.6106 243.826 14.8356 224.497C-4.94 205.168 -4.94 173.83 14.8356 154.501C15.33 154.018 15.8321 153.547 16.3415 153.088C34.6008 133.67 34.102 103.32 14.8415 84.4929C-4.93412 65.1637 -4.93412 33.8256 14.8415 14.4966C34.6171 -4.83221 66.6797 -4.83221 86.4561 14.4966Z","M86.4462 294.507C106.221 313.836 106.221 345.174 86.4462 364.503C66.6697 383.832 34.6072 383.832 14.8317 364.503C-4.94391 345.174 -4.94391 313.836 14.8317 294.507C34.6072 275.178 66.6697 275.178 86.4462 294.507Z","M518.336 335.922C497.432 335.922 478.679 332.549 462.08 325.801C445.479 318.774 432.26 309.357 422.422 297.55C412.893 285.742 407.667 272.671 406.744 258.334H471.763C472.992 267.329 477.758 274.78 486.057 280.682C494.666 286.585 505.271 289.537 517.875 289.537C530.173 289.537 539.702 287.288 546.465 282.791C553.535 278.293 557.071 272.531 557.071 265.502C557.071 257.912 552.767 252.289 544.159 248.635C535.858 244.7 522.487 240.483 504.042 235.986C484.981 231.768 469.303 227.411 457.007 222.913C445.017 218.416 434.565 211.528 425.65 202.252C417.043 192.974 412.738 180.465 412.738 164.723C412.738 151.791 416.735 139.984 424.727 129.302C433.028 118.619 444.709 110.186 459.773 104.002C475.145 97.8166 493.128 94.7246 513.725 94.7246C544.159 94.7246 568.446 101.752 586.582 115.808C604.72 129.583 614.711 148.277 616.555 171.891H554.764C553.843 162.615 549.538 155.305 541.854 149.964C534.476 144.342 524.485 141.531 511.881 141.531C500.198 141.531 491.13 143.499 484.675 147.434C478.526 151.369 475.451 156.851 475.451 163.879C475.451 171.75 479.755 177.793 488.364 182.011C496.97 185.947 510.344 190.023 528.48 194.239C546.925 198.457 562.144 202.814 574.132 207.311C586.121 211.809 596.42 218.838 605.027 228.395C613.942 237.672 618.554 250.04 618.862 265.502C618.862 278.996 614.711 291.084 606.411 301.766C598.418 312.449 586.736 320.882 571.365 327.067C556.301 332.97 538.626 335.922 518.336 335.922Z","M769.153 335.922C744.56 335.922 722.425 331.003 702.751 321.163C683.076 311.043 667.552 296.847 656.177 278.574C645.11 260.302 639.576 239.218 639.576 215.324C639.576 191.428 645.264 170.345 656.638 152.072C668.32 133.799 684.151 119.743 704.133 109.905C724.117 99.7843 746.404 94.7246 770.997 94.7246C795.59 94.7246 817.877 99.7843 837.861 109.905C857.842 119.743 873.521 133.799 884.894 152.072C896.577 170.345 902.418 191.428 902.418 215.324C902.418 239.218 896.422 260.302 884.433 278.574C872.751 296.847 856.767 311.043 836.477 321.163C816.495 331.003 794.053 335.922 769.153 335.922ZM769.153 284.477C780.835 284.477 791.748 281.947 801.892 276.888C812.345 271.547 820.645 263.675 826.794 253.274C832.941 242.872 836.015 230.222 836.015 215.324C836.015 193.115 829.56 176.107 816.648 164.301C804.044 152.213 788.519 146.169 770.074 146.169C751.63 146.169 736.104 152.213 723.501 164.301C711.205 176.107 705.056 193.115 705.056 215.324C705.056 237.532 711.051 254.68 723.041 266.767C735.337 278.574 750.707 284.477 769.153 284.477Z","M998.191 20.0859V332.125H933.633V20.0859H998.191Z","M1287 98.5195V332.127H1221.98V302.609C1213.68 312.73 1202.77 320.741 1189.24 326.644C1176.02 332.268 1161.57 335.079 1145.9 335.079C1125.91 335.079 1108.24 331.284 1092.87 323.693C1077.5 315.822 1065.35 304.437 1056.44 289.537C1047.83 274.358 1043.53 256.367 1043.53 235.564V98.5195H1108.08V227.13C1108.08 245.684 1113.16 260.021 1123.3 270.14C1133.45 279.98 1147.28 284.899 1164.8 284.899C1182.63 284.899 1196.62 279.98 1206.76 270.14C1216.91 260.021 1221.98 245.684 1221.98 227.13V98.5195H1287Z"];
function LogoFull({ width = 300, fill = '#fff' }) {
  return (
    <svg width={width} height={width * 379 / 1287} viewBox="0 0 1287 379" style={{ display: 'block' }}>
      {LOGO_FULL.map((d, i) => <path key={i} d={d} fill={fill} />)}
    </svg>
  );
}

function Ending({ T, K, white }) {
  const p = MOTION.enter(T, K.N + 0.4, 1.1);
  const out = MOTION.draw(T, K.N + 4.4, 0.6);
  const o = p * (1 - out);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 110, opacity: o, visibility: vis(o), transform: `translateY(${(1 - p) * 26}px)` }}>
      <LogoFull width={760} fill={white ? C.g900 : '#fff'} />
      <div style={{ font: `400 80px ${FONT}`, color: white ? C.g900 : '#fff', letterSpacing: '0.01em' }}>solugenomics.com</div>
    </div>
  );
}

function Piece({ tw }) {
  const { T, CUES, time } = useComposition();
  const K = { U: CUES.Upload, S: CUES.Table, P: CUES.Tree, L: CUES.Plasmid, R: CUES.Report, G: CUES.Globe, N: CUES.Ending };
  const caps = [
    { at: K.U + 1.0, until: K.U + 8.6, text: 'Drop in your samples' },
    { at: K.S + 0.6, until: K.S + 4.5, text: 'Everything in one view' },
    { at: K.P + 0.8, until: K.P + 9.6, text: 'Spot related cases fast' },
    { at: K.L + 0.8, until: K.L + 7.6, text: 'See what\u2019s on the plasmids' },
    { at: K.R + 0.8, until: K.R + 7.6, text: 'Reports, ready to share' },
    { at: K.G + 0.6, until: K.G + 4.8, text: 'Used by labs around the world' },
  ];
  const white = tw.whiteEnd === true;
  const wP = MOTION.draw(T, K.G - 0.6, 0.8);
  return (
    <div data-screen-label={`t=${Math.floor(time)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: FONT, color: C.g900, background: tw.bg }}>
      <Opening T={T} />
      {white && <div style={{ position: 'absolute', inset: 0, background: '#fff', opacity: wP }} />}
      <CustomerLogos T={T} K={K} white={white} />
      <AppWindow T={T} K={K} />
      <Ending T={T} K={K} white={white} />
      {tw.captions !== false && (
        <React.Fragment>
          <Captions items={white ? caps.slice(0, -1) : caps} style={{ font: `500 84px ${FONT}`, color: '#fff', textShadow: 'none', top: 0, bottom: 'auto', height: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '-0.015em' }} />
          {white && <Captions items={caps.slice(-1)} style={{ font: `500 84px ${FONT}`, color: C.g900, textShadow: 'none', top: 0, bottom: 'auto', height: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: '-0.015em' }} />}
        </React.Fragment>
      )}
    </div>
  );
}

function SoluDemo() {
  const [tw, setTweak] = useTweaks(window.SOLU_TWEAKS || { motionEditor: true, bg: '#087443', captions: true, whiteEnd: false });
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={tw.bg}>
        <Piece tw={tw} />
      </CompositionStage>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Video" />
        <TweakToggle label="Motion editor" value={tw.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Captions" value={tw.captions} onChange={(v) => setTweak('captions', v)} />
        <TweakToggle label="White ending" value={tw.whiteEnd === true} onChange={(v) => setTweak('whiteEnd', v)} />
        <TweakColor label="Background" value={tw.bg} options={['#087443', '#099250', '#095C37']} onChange={(v) => setTweak('bg', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.SoluDemo = SoluDemo;
