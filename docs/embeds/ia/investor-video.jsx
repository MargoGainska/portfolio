/* global React, useComposition, Easing, interpolate, animate, clamp, Shot */

var h = React.createElement;

// ---------------------------------------------------------------- palette
var C = {
  bg: '#FFFFFF', ink: '#101828', white: '#FFFFFF', app: '#F9FAFB', line: '#EAECF0',
  soft: '#F2F4F7', grey: '#667085', mute: '#98A2B3', faint: '#C0C6CE',
  green: '#157639', deep: '#11612E', lite: '#EDFCF2', mint: '#12B76A',
  amber: '#B54708', red: '#B42318'
};
var FONT = "'IBM Plex Sans', system-ui, sans-serif";

var MOTION = {
  enter: function (from, to, start, end) {
    return animate({ from: from, to: to, start: start, end: end, ease: Easing.easeOutCubic });
  },
  draw: function (from, to, start, end) {
    return animate({ from: from, to: to, start: start, end: end, ease: Easing.easeInOutQuart });
  },
  pop: function (from, to, start, end) {
    return animate({ from: from, to: to, start: start, end: end, ease: Easing.easeOutBack });
  }
};

// ---------------------------------------------------------------- stage
var W = 1600, HH = 900;
var CARD = { x: 100, y: 42, w: 1400, h: 817 };
var K = 1440 / CARD.w;
var IH = CARD.h * K;
function S(ix, iy) { return { x: CARD.x + ix / K, y: CARD.y + iy / K }; }

var GLOBE = { cx: 800, cy: 434, r: 312, tilt: 20 * Math.PI / 180 };
function OPT() { return window.VID_OPTS || {}; }
function NN() { var d = +OPT().density; return d >= 24 ? d : 54; }
function ACC() { return OPT().accent || C.mint; }

var COORD = [
  [60.17, 24.94], [51.51, -0.13], [42.36, -71.06], [33.75, -84.39], [-23.55, -46.63],
  [-33.92, 18.42], [-1.29, 36.82], [19.08, 72.88], [1.35, 103.82], [25.03, 121.57],
  [35.68, 139.65], [-33.87, 151.21], [55.68, 12.57], [52.52, 13.40], [43.65, -79.38],
  [-12.05, -77.04], [47.61, -122.33], [25.20, 55.27],
  [48.86, 2.35], [40.42, -3.70], [41.90, 12.50], [52.23, 21.01], [59.33, 18.07],
  [59.91, 10.75], [52.37, 4.90], [48.21, 16.37], [37.98, 23.73], [41.01, 28.98],
  [55.76, 37.62], [32.08, 34.78], [30.04, 31.24], [6.52, 3.38], [5.60, -0.19],
  [9.03, 38.74], [-26.20, 28.05], [28.61, 77.21], [13.76, 100.50], [-6.21, 106.85],
  [14.60, 120.98], [37.57, 126.98], [39.90, 116.41], [31.23, 121.47], [22.32, 114.17],
  [-37.81, 144.96], [-36.85, 174.76], [49.28, -123.12], [41.88, -87.63], [40.71, -74.01],
  [29.76, -95.37], [19.43, -99.13], [4.71, -74.07], [-33.45, -70.67], [-34.60, -58.38],
  [64.15, -21.94]
];
function dotTone(i) {
  if (i % 13 === 4) return '#D92D20';
  if (i % 7 === 2) return '#DC6803';
  if (i % 3 === 0) return C.green;
  return '#2E9E68';
}
function project(lat, lon, rot, G) {
  G = G || GLOBE;
  var p = lat * Math.PI / 180, l = lon * Math.PI / 180 + rot;
  var cp = Math.cos(p), sp = Math.sin(p), cl = Math.cos(l), sl = Math.sin(l);
  var st = Math.sin(G.tilt), ct = Math.cos(G.tilt);
  return {
    x: G.cx + G.r * (cp * sl),
    y: G.cy - G.r * (ct * sp - st * cp * cl),
    z: st * sp + ct * cp * cl
  };
}

// ------------------------------------------------------- sample content
var TY = {
  bac: { l: 'Bacteria', bg: '#EDFCF2', fg: '#11612E' },
  vir: { l: 'Virus', bg: '#FDF2FA', fg: '#C11574' },
  fun: { l: 'Fungus', bg: '#FFF6ED', fg: '#B93815' },
  mgx: { l: 'Metagenome', bg: '#F4F3FF', fg: '#5925DC' },
  s16: { l: '16S', bg: '#EFF8FF', fg: '#175CD3' }
};
var FILES = [
  { f: 'SX-2291_S1_L001_R1.fastq.gz', sz: '412 MB', t: 'bac', sp: 'Escherichia coli' },
  { f: 'NB-0044_ont_pass.fastq.gz', sz: '1.2 GB', t: 'bac', sp: 'Klebsiella pneumoniae' },
  { f: 'MG-0142_sink4A_R1.fastq.gz', sz: '2.1 GB', t: 'mgx', sp: 'Mixed community \u00b7 74 taxa' },
  { f: 'VX-0107_SARSCoV2.fasta', sz: '31 KB', t: 'vir', sp: 'SARS-CoV-2 \u00b7 BA.2.86' },
  { f: 'FX-0021_Cauris.fastq.gz', sz: '624 MB', t: 'fun', sp: 'Candida auris \u00b7 Clade I' },
  { f: 'AM-0356_16S_gut.fastq.gz', sz: '86 MB', t: 's16', sp: 'Gut community \u00b7 16S' }
];
var FLY = [
  { fx: 1720, fy: 210, rot: -7 }, { fx: 1760, fy: 470, rot: 5 },
  { fx: 1700, fy: 700, rot: -4 }, { fx: 1780, fy: 120, rot: 8 },
  { fx: 1740, fy: 560, rot: -6 }, { fx: 1710, fy: 330, rot: 3 }
];
function fileT(i) { var s = 0.85 + i * 0.17; return { s: s, e: s + 0.66 }; }

var OLD_ROWS = [
  { id: 'SX-2263', t: 'bac', sp: 'E. coli', qc: 94, amr: 'Carbapenem', hot: true },
  { id: 'MG-0121', t: 'mgx', sp: 'Sink 2B community', qc: 86, amr: 'Carbapenem', hot: true },
  { id: 'SX-2258', t: 'bac', sp: 'E. cloacae', qc: 71, amr: 'Carbapenem', hot: true },
  { id: 'VX-0098', t: 'vir', sp: 'Influenza A H3N2', qc: 99, amr: '' },
  { id: 'FX-0018', t: 'fun', sp: 'Candida auris', qc: 93, amr: 'Antifungal' }
];
var NEW_ROWS = [
  { id: 'SX-2291', t: 'bac', sp: 'E. coli', qc: 96, amr: 'Carbapenem', hot: true },
  { id: 'NB-0044', t: 'bac', sp: 'K. pneumoniae', qc: 92, amr: 'ESBL' },
  { id: 'MG-0142', t: 'mgx', sp: 'Sink 4A community', qc: 88, amr: 'Carbapenem', hot: true },
  { id: 'VX-0107', t: 'vir', sp: 'SARS-CoV-2', qc: 100, amr: '' },
  { id: 'FX-0021', t: 'fun', sp: 'C. auris', qc: 95, amr: 'Antifungal' },
  { id: 'AM-0356', t: 's16', sp: 'Gut community', qc: 91, amr: '' }
];

// ------------------------------------------------------------- ui atoms
function badge(txt, bg, fg, extra) {
  var st = { fontSize: 11.5, fontWeight: 600, color: fg, background: bg, borderRadius: 4, padding: '3px 8px', whiteSpace: 'nowrap' };
  if (extra) for (var k in extra) st[k] = extra[k];
  return h('span', { style: st }, txt);
}
function ic(d, size, stroke, sw, extra) {
  var kids = d ? [h('path', { key: 'p', d: d })] : [];
  if (extra) extra.forEach(function (c, i) {
    kids.push(h('circle', {
      key: 'c' + i, cx: c[0], cy: c[1], r: c[2],
      fill: c[3] ? stroke : 'none', stroke: c[3] ? 'none' : undefined
    }));
  });
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: stroke, strokeWidth: sw || 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flex: 'none' }
  }, kids);
}
function qcBar(v, w, width) {
  return h('div', {
    style: { width: width || 96, height: 6, borderRadius: 999, background: '#EAECF0', overflow: 'hidden', display: 'flex' }
  }, h('span', {
    style: { width: (v * w) + '%', background: v >= 85 ? '#12B76A' : (v >= 75 ? '#F79009' : '#F04438') }
  }));
}

var COLS = '1.1fr 1.15fr 1.6fr 1fr 1.3fr';
var HEAD = ['Sample', 'Type', 'Species', 'Quality', 'Resistance'];

function SampleRow(props) {
  var r = props.r, o = props.o, flash = props.flash, w = props.w;
  var ty = TY[r.t];
  var load = props.load || 0;                       // 1 = still being identified
  var dash = h('span', { style: { fontSize: 13, color: C.faint } }, '\u2013');
  var spin = h('span', { style: { display: 'flex', alignItems: 'center', gap: 9, color: C.grey } }, [
    h('svg', { key: 's', width: 14, height: 14, viewBox: '0 0 24 24', style: { transform: 'rotate(' + (props.spin * 360) + 'deg)' } },
      h('path', { d: 'M12 3a9 9 0 1 1-6.4 2.7', fill: 'none', stroke: C.green, strokeWidth: 2.4, strokeLinecap: 'round' })),
    h('span', { key: 'l', style: { fontSize: 12.5 } }, 'Identifying')
  ]);
  return h('div', {
    style: {
      gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: COLS,
      alignItems: 'center', borderTop: '1px solid #F2F4F7', opacity: o,
      background: props.sel ? C.lite : (flash > 0.01 ? 'rgba(209,250,229,' + (0.3 * flash).toFixed(3) + ')' : 'transparent'),
      transform: 'translateY(' + ((1 - o) * 8).toFixed(2) + 'px)'
    }
  }, [
    h('div', { key: 'a', style: { padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 } }, [
      props.sel
        ? h('span', {
          key: 'x',
          style: { width: 15, height: 15, borderRadius: 3, flex: 'none', background: C.green, display: 'grid', placeItems: 'center' }
        }, ic('M5 12l5 5L20 6', 11, '#fff', 3))
        : h('span', { key: 'x', style: { width: 15, height: 15, border: '1.5px solid #D0D5DD', borderRadius: 3, flex: 'none' } }),
      h('span', { key: 'i', style: { fontSize: 13, fontWeight: 600, color: C.ink } }, r.id)
    ]),
    h('div', { key: 't', style: { padding: '12px 16px' } }, load ? spin : badge(ty.l, ty.bg, ty.fg)),
    h('div', {
      key: 's',
      style: { padding: '12px 16px', fontSize: 13, fontStyle: r.t === 'mgx' ? 'normal' : 'italic', color: '#475467', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
    }, load ? '' : r.sp),
    h('div', { key: 'q', style: { padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 9 } },
      load
        ? [h('div', { key: 'ph', style: { width: 96, height: 6, borderRadius: 999, background: '#EEF1F4' } })]
        : [qcBar(r.qc, w), h('span', { key: 'v', style: { fontSize: 12, color: C.grey } }, Math.round(r.qc * w) + '%')]),
    h('div', { key: 'm', style: { padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 } },
      load ? dash : (r.amr ? badge(r.amr, r.hot ? '#FEF3F2' : '#FFFAEB', r.hot ? C.red : C.amber) : dash))
  ]);
}

var ASKQ = 'Are any of my new samples part of a global outbreak?';

function sparkle(size, fill, solo) {
  var kids = [h('path', {
    key: 'a',
    d: solo
      ? 'M12 2.4l2.6 6.4 6.4 2.6-6.4 2.6L12 20.4l-2.6-6.4L3 11.4l6.4-2.6z'
      : 'M12 2.6l2.1 5.5 5.5 2.1-5.5 2.1L12 17.8l-2.1-5.5L4.4 10.2l5.5-2.1z',
    fill: fill
  })];
  if (!solo) kids.push(h('path', {
    key: 'b', d: 'M18.8 15l1.05 2.65 2.65 1.05-2.65 1.05L18.8 22.4l-1.05-2.65L15.1 18.7l2.65-1.05z', fill: fill
  }));
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', style: { flex: 'none' } }, kids);
}

// ---------------------------------------------------------- home screen
function sampleList(T, Q, compact) {
  var rows = [];
  NEW_ROWS.forEach(function (r, k) {
    var at = Q.Load + 0.05 + k * 0.07;
    var o = MOTION.enter(0, 1, at, at + 0.4)(T);
    if (o < 0.01) return;
    var done = at + 0.55 + k * 0.1;
    rows.push(h(SampleRow, {
      key: 'n' + k, r: r, o: o, load: T < done ? 1 : 0, spin: (T * 3.2) % 1, sel: false,
      flash: MOTION.draw(1, 0, done, done + 0.5)(T),
      w: MOTION.draw(0, 1, done, done + 0.7)(T)
    }));
  });
  return h('div', {
    style: { background: C.white, border: '1px solid ' + C.line, borderRadius: 6, overflow: 'hidden' }
  }, [
    h('div', {
      key: 'h',
      style: { display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: '1px solid ' + C.line }
    }, [
      h('span', { key: 'a', style: { flex: 1, fontSize: 14, fontWeight: 600, color: C.ink } }, 'Latest samples'),
      h('span', { key: 'b', style: { fontSize: 12.5, color: C.grey } }, '3,842 in total')
    ]),
    h('div', { key: 'r', style: { display: 'grid', gridTemplateColumns: COLS } },
      HEAD.map(function (t) {
        return h('div', {
          key: 'h' + t,
          style: {
            fontSize: 10.5, fontWeight: 600, color: C.mute, letterSpacing: '.05em',
            textTransform: 'uppercase', padding: '10px 16px', background: '#FCFCFD'
          }
        }, t);
      }).concat(rows))
  ]);
}

function composer(T, Q, typed, sent, caret) {
  var A = Q.Ask;
  var live = typed > 0 && !sent;
  return h('div', {
    style: {
      background: C.white, border: '1px solid ' + (live ? '#A6F4C5' : C.line),
      borderRadius: 8, padding: '13px 15px', display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: live ? '0 0 0 3px rgba(18,183,106,.12)' : 'none'
    }
  }, [
    sparkle(20, C.deep),
    h('div', { key: 't', style: { flex: 1, fontSize: 15, color: live ? C.ink : C.mute } },
      live
        ? h('span', null, [
          h('span', { key: 'a' }, ASKQ.slice(0, typed)),
          h('span', { key: 'c', style: { opacity: caret ? 1 : 0, color: C.green, fontWeight: 300 } }, '|')
        ])
        : 'Ask anything about your samples'),
    h('div', {
      key: 'b',
      style: {
        width: 30, height: 30, borderRadius: 4, display: 'grid', placeItems: 'center',
        background: live ? ((T > A + 1.16 && T < A + 1.32) ? C.deep : C.green) : C.soft,
        color: live ? '#fff' : C.faint
      }
    }, ic('M5 12h13M12 5.5l6.5 6.5L12 18.5', 16, 'currentColor', 2))
  ]);
}

function HomeScreen(props) {
  var T = props.T, Q = props.CUES, A = Q.Ask;
  var typed = Math.round(clamp((T - (A + 0.15)) / 1.0, 0, 1) * ASKQ.length);
  var sent = T > A + 1.32;
  var caret = (T % 0.8) < 0.45 && typed > 0;

  return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } }, [
    h('div', { key: 'c' }, composer(T, Q, typed, sent, caret)),
    h('div', { key: 'l' }, sampleList(T, Q))
  ]);
}

// -------------------------------------------------------- the ai thread
function ChatThread(props) {
  var T = props.T, Q = props.CUES, A = Q.Ask;
  var work = MOTION.enter(0, 1, A + 1.7, A + 2.0)(T) * MOTION.draw(1, 0, A + 2.85, A + 3.05)(T);
  var step2 = MOTION.enter(0, 1, A + 2.25, A + 2.5)(T);
  var ans = MOTION.enter(0, 1, A + 2.95, A + 3.25)(T);
  var art = MOTION.enter(0, 1, Q.Global - 0.5, Q.Global - 0.05)(T);
  var artRise = MOTION.enter(16, 0, Q.Global - 0.5, Q.Global + 0.15)(T);

  return h('div', { style: { height: 726, display: 'flex', flexDirection: 'column', gap: 10 } }, [
    h('div', { key: 'q', style: { display: 'flex', justifyContent: 'flex-end' } },
      h('div', {
        style: {
          background: C.lite, border: '1px solid #A6F4C5', color: C.deep, fontSize: 14,
          borderRadius: '8px 8px 2px 8px', padding: '10px 15px', maxWidth 
: 640
        }
      }, ASKQ)),
    h('div', { key: 'a', style: { display: 'flex', gap: 11, alignItems: 'flex-start' } }, [
      h('div', { key: 'av', style: { flex: 'none', marginTop: 4 } }, sparkle(18, C.green)),
      h('div', { key: 'b', style: { flex: 1, position: 'relative', minHeight: 30 } }, [
        work > 0.01 ? h('div', {
          key: 'w',
          style: { position: 'absolute', left: 0, top: 0, right: 0, opacity: work, display: 'flex', flexDirection: 'column', gap: 6 }
        }, [
          h('div', { key: 'a', style: { fontSize: 15, color: C.ink, display: 'flex', alignItems: 'center', gap: 9 } }, [
            h('span', { key: 't' }, 'Comparing your samples against 1,284,502 genomes'),
            h('span', {
              key: 'd',
              style: { width: 7, height: 7, borderRadius: 999, background: C.green, opacity: 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(T * 7)) }
            })
          ]),
          step2 > 0.01 ? h('div', { key: 'b', style: { fontSize: 13.5, color: C.grey, opacity: step2 } },
            'Building a global watch for drug-resistant E. coli') : null
        ]) : null,
        ans > 0.01 ? h('div', {
          key: 'an',
          style: { opacity: ans, fontSize: 17, color: C.ink, lineHeight: 1.45, letterSpacing: '-.01em', maxWidth: 900 }
        }, h('span', null, [
          h('span', { key: 'a', style: { fontWeight: 600 } }, 'Yes. '),
          h('span', { key: 'b' }, '3 of your 6 new samples are closely related to samples sequenced in 9 other countries.')
        ])) : null
      ])
    ]),
    art > 0.01 ? h('div', {
      key: 'art',
      style: { opacity: art, transform: 'translateY(' + artRise.toFixed(1) + 'px)' }
    }, h(WatchArtifact, { T: T, CUES: Q, rot: props.rot })) : null,
    h('div', { key: 'sp', style: { flex: 1, minHeight: 0 } }),
    h('div', { key: 'c', style: { opacity: 0.85 } }, composer(T, Q, 0, true, false))
  ]);
}

// ------------------------------------------------------- samples screen
function SamplesScreen(props) {
  var T = props.T, Q = props.CUES;
  var sel = false;
  var rows = [];
  NEW_ROWS.forEach(function (r, k) {
    var at = Q.Load + 0.05 + k * 0.07;
    var o = MOTION.enter(0, 1, at, at + 0.4)(T);
    if (o < 0.01) return;
    var done = at + 0.55 + k * 0.1;
    rows.push(h(SampleRow, {
      key: 'n' + k, r: r, o: o, load: T < done ? 1 : 0, spin: (T * 3.2) % 1,
      sel: false,
      flash: MOTION.draw(1, 0, done, done + 0.5)(T),
      w: MOTION.draw(0, 1, done, done + 0.7)(T)
    }));
  });
  OLD_ROWS.forEach(function (r, k) {
    rows.push(h(SampleRow, { key: 'o' + k, r: r, o: 1, flash: 0, w: 1, load: 0, spin: 0 }));
  });

  return h('div', null, [
    h('div', { key: 'hd', style: { display: 'flex', alignItems: 'flex-end', gap: 14 } }, [
      h('div', { key: 'l', style: { flex: 1 } }, [
        h('div', { key: 't', style: { fontSize: 24, fontWeight: 600, letterSpacing: '-.02em', color: C.ink } }, 'Samples'),
        h('div', { key: 's', style: { fontSize: 13.5, color: C.grey, marginTop: 5 } }, '3,842 samples')
      ]),
      sel
        ? h('div', { key: 'selbar', style: { display: 'flex', alignItems: 'center', gap: 12 } }, [
          h('span', { key: 'n', style: { fontSize: 13, fontWeight: 600, color: C.deep } }, '1 sample selected'),
          h('div', {
            key: 'b',
            style: {
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#fff',
              background: C.green,
              borderRadius: 4, padding: '9px 15px'
            }
          }, [ic('M12 5v14M5 12h14', 15, 'currentColor', 2), h('span', { key: 't' }, 'Build a view')])
        ])
        : h('div', { key: 'seg', style: { display: 'flex', gap: 7 } },
          ['All types', 'Bacteria', 'Virus', 'Fungus', 'Metagenome', '16S'].map(function (t, k) {
            return h('span', {
              key: t,
              style: {
                fontSize: 12.5, fontWeight: k === 0 ? 600 : 500,
                color: k === 0 ? C.deep : C.grey, background: k === 0 ? C.lite : C.white,
                border: '1px solid ' + (k === 0 ? '#A6F4C5' : '#E4E7EC'),
                borderRadius: 4, padding: '6px 12px'
              }
            }, t);
          }))
    ]),
    h('div', {
      key: 'tbl',
      style: { marginTop: 20, background: C.white, border: '1px solid ' + C.line, borderRadius: 6, overflow: 'hidden' }
    }, h('div', { style: { display: 'grid', gridTemplateColumns: COLS } },
      HEAD.map(function (t) {
        return h('div', {
          key: 'h' + t,
          style: {
            fontSize: 10.5, fontWeight: 600, color: C.mute, letterSpacing: '.05em',
            textTransform: 'uppercase', padding: '11px 16px', background: '#FCFCFD'
          }
        }, t === 'Sample'
          ? h('span', { style: { display: 'flex', alignItems: 'center', gap: 10 } }, [
            h('span', { key: 'x', style: { width: 15, height: 15, border: '1.5px solid #D0D5DD', borderRadius: 3, flex: 'none' } }),
            h('span', { key: 't' }, t)
          ])
          : t);
      }).concat(rows)))
  ]);
}

// ---------------------------------------------------------- add samples
function AddSamplesModal(props) {
  var T = props.T, Q = props.CUES;
  var open = MOTION.enter(0, 1, Q.Collect + 0.6, Q.Collect + 0.9)(T)
    * MOTION.draw(1, 0, Q.Load - 0.4, Q.Load - 0.05)(T);
  if (open < 0.01) return null;

  var landed = 0, bytes = 0;
  FILES.forEach(function (f, i) {
    var t = fileT(i);
    if (T > Q.Collect + t.e - 0.05) {
      landed++;
      bytes += parseFloat(f.sz) * (f.sz.indexOf('GB') > 0 ? 1000 : (f.sz.indexOf('KB') > 0 ? 0.001 : 1));
    }
  });
  var sizeLabel = bytes >= 1000 ? (bytes / 1000).toFixed(1) + ' GB' : Math.round(bytes) + ' MB';
  var active = landed < FILES.length;

  return h('div', {
    style: {
      position: 'absolute', inset: 0, background: 'rgba(16,24,40,' + (0.42 * open).toFixed(3) + ')',
      backdropFilter: 'blur(2px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'
    }
  }, h('div', {
    style: {
      marginTop: 168, width: 660, background: C.white, borderRadius: 8, overflow: 'hidden',
      boxShadow: '0 32px 90px rgba(16,24,40,.34)', opacity: open,
      transform: 'scale(' + (0.965 + 0.035 * open).toFixed(3) + ') translateY(' + ((1 - open) * 10).toFixed(1) + 'px)'
    }
  }, [
    h('div', { key: 'h', style: { padding: '20px 24px 16px', display: 'flex', alignItems: 'center', gap: 12 } }, [
      h('div', { key: 't', style: { flex: 1 } }, [
        h('div', { key: 'a', style: { fontSize: 17, fontWeight: 600, color: C.ink, letterSpacing: '-.01em' } }, 'Add samples'),
      ]),
      h('div', { key: 'x', style: { color: C.mute } }, ic('M6 6l12 12M18 6L6 18', 17, 'currentColor', 2))
    ]),
    h('div', { key: 'b', style: { padding: '0 24px 20px' } },
      h('div', {
        style: {
          border: '1.5px dashed ' + (active ? C.green : (landed ? '#6CC492' : '#D0D5DD')), borderRadius: 6,
          background: active ? 'rgba(209,250,229,.42)' : (landed ? '#FCFEFD' : '#FCFCFD'),
          height: 208, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12
        }
      }, [
        h('div', {
          key: 'i',
          style: {
            width: 52, height: 52, borderRadius: 999, display: 'grid', placeItems: 'center',
            background: (active || landed) ? C.green : C.soft
          }
        }, ic(landed && !active ? 'M5 12l5 5L20 6' : 'M12 19V6M6 12l6-6 6 6', 26, (active || landed) ? '#fff' : C.grey, 2)),
        h('div', {
          key: 't',
          style: { fontSize: 16, fontWeight: 600, color: (active || landed) ? C.deep : '#344054' }
        }, active ? 'Drop to add' : (landed ? landed + ' files ready' : 'Drag sequencing files here')),
        h('div', { key: 's', style: { fontSize: 13, color: C.grey } }, landed ? sizeLabel : 'FASTQ, FASTA or BAM')
      ])),
    h('div', {
      key: 'f',
      style: { padding: '15px 24px', borderTop: '1px solid #F2F4F7', display: 'flex', alignItems: 'center', gap: 12, background: '#FCFCFD' }
    }, [
      h('div', { key: 'c', style: { flex: 1 } }),
      h('div', { key: 'x', style: { fontSize: 13, fontWeight: 600, color: C.grey, padding: '9px 14px' } }, 'Cancel'),
      h('div', {
        key: 'a',
        style: {
          fontSize: 13, fontWeight: 600, color: '#fff', borderRadius: 4, padding: '10px 18px',
          background: landed ? ((T > Q.Load - 0.58 && T < Q.Load - 0.36) ? C.deep : C.green) : '#C7D3CB'
        }
      }, landed ? ('Add ' + landed + ' samples') : 'Add samples')
    ])
  ]));
}

// ------------------------------------------------- global surveillance
var LG = { cx: 252, cy: 103, r: 90, tilt: GLOBE.tilt };           // in app pixels
var MINI = { cx: 647, cy: 470, r: 87.5, tilt: GLOBE.tilt };       // the same sphere in stage pixels

var GBUB = [
  { i: 1, n: 'United Kingdom', c: 412 }, { i: 47, n: 'United States', c: 388 },
  { i: 20, n: 'Italy', c: 176 }, { i: 35, n: 'India', c: 154 },
  { i: 4, n: 'Brazil', c: 96 }, { i: 10, n: 'Japan', c: 74 },
  { i: 6, n: 'Kenya', c: 41 }, { i: 8, n: 'Singapore', c: 33 },
  { i: 34, n: 'South Africa', c: 28 }, { i: 17, n: 'United Arab Emirates', c: 22 }
];
var GSTATS = [
  { k: '1,284,502', l: 'genomes compared' },
  { k: '9', l: 'countries' },
  { k: '38', l: 'closely related to yours' }
];
var GLIST = [
  { n: "St Mary's Hospital", c: 23, d: '+6', mine: true },
  { n: 'United Kingdom', c: 412, d: '+34' },
  { n: 'United States', c: 388, d: '+21' },
  { n: 'Italy', c: 176, d: '+12' },
  { n: 'India', c: 154, d: '+18' },
  { n: 'Brazil', c: 96, d: '+7' },
  { n: 'Japan', c: 74, d: '+4' }
];
var CURVE = [
  [3, 0], [4, 1], [3, 0], [5, 1], [4, 0], [6, 1], [5, 1], [7, 0], [6, 1], [8, 2],
  [7, 1], [10, 2], [9, 1], [13, 3], [12, 2], [18, 4], [22, 3], [29, 6], [36, 5], [45, 9],
  [54, 11], [63, 14], [76, 18], [92, 23]
];
var FCAST = [138, 164, 195, 230];   // if nothing changes

function MiniGlobe(props) {
  var T = props.T, Q = props.CUES, rot = props.rot;
  var g = MOTION.draw(0, 1, Q.Global + 0.2, Q.Global + 1.7)(T);
  var mer = [], par = [], pts, la, lo, p;
  for (var m = 0; m < 12; m++) {
    pts = [];
    for (la = -80; la <= 80; la += 6) {
      p = project(la, m * 30 - 180, rot, LG);
      if (p.z > 0) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1));
      else if (pts.length) { mer.push(pts.join(' ')); pts = []; }
    }
    if (pts.length) mer.push(pts.join(' '));
  }
  for (var q = -60; q <= 60; q += 30) {
    pts = [];
    for (lo = -180; lo <= 180; lo += 6) {
      p = project(q, lo, rot, LG);
      if (p.z > 0) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1));
      else if (pts.length) { par.push(pts.join(' ')); pts = []; }
    }
    if (pts.length) par.push(pts.join(' '));
  }
  var links = [[0, 1], [0, 2], [1, 4], [2, 3], [0, 6], [3, 7], [1, 5], [2, 9], [0, 8]];

  return h('svg', { width: 505, height: 210, viewBox: '0 0 505 210' }, [
    h('circle', { key: 'sea', cx: LG.cx, cy: LG.cy, r: LG.r, fill: '#F4F8F6', stroke: '#9FB3A9', strokeWidth: 1.2 }),
    h('g', { key: 'wire', stroke: '#BECDC5', strokeWidth: 0.9, fill: 'none' },
      mer.concat(par).map(function (pl, k) { return h('polyline', { key: 'w' + k, points: pl }); })),
    h('g', { key: 'links' }, links.map(function (l, k) {
      var A = GBUB[l[0]], B = GBUB[l[1]];
      var pa = project(COORD[A.i][0], COORD[A.i][1], rot, LG);
      var pb = project(COORD[B.i][0], COORD[B.i][1], rot, LG);
      if (pa.z <= 0.03 || pb.z <= 0.03) return null;
      var mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
      var dx = mx - LG.cx, dy = my - LG.cy;
      var d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      var lift = 1 + 20 / d;
      var st = clamp((g - k * 0.06) / 0.5, 0, 1);
      if (st <= 0) return null;
      return h('path', {
        key: 'l' + k,
        d: 'M' + pa.x + ' ' + pa.y + ' Q' + (LG.cx + dx * lift) + ' ' + (LG.cy + dy * lift) + ' ' + pb.x + ' ' + pb.y,
        fill: 'none', stroke: '#2E9E68', strokeWidth: 1.3, opacity: 0.85 * st,
        pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - st
      });
    })),
    h('g', { key: 'bub' }, GBUB.map(function (bb, k) {
      var c = COORD[bb.i];
      var pp = project(c[0], c[1], rot, LG);
      var st = clamp((g - k * 0.05) / 0.4, 0, 1);
      if (st <= 0) return null;
      var front = pp.z > 0;
      var rr = (4 + Math.sqrt(bb.c) * 0.5) * st;
      var crowded = false;
      for (var j = 0; j < GBUB.length; j++) {
        if (j === k) continue;
        var oc = COORD[GBUB[j].i];
        var op = project(oc[0], oc[1], rot, LG);
        if (op.z <= 0) continue;
        var dd = Math.sqrt((op.x - pp.x) * (op.x - pp.x) + (op.y - pp.y) * (op.y - pp.y));
        if (dd < 18 && GBUB[j].c > bb.c) crowded = true;
      }
      return h('g', { key: 'b' + k, opacity: front ? 1 : 0.28 }, [
        h('circle', { key: 'c', cx: pp.x, cy: pp.y, r: rr, fill: k === 0 ? C.green : '#2E9E68', opacity: 0.95 }),
        front && bb.c > 90 && !crowded
          ? h('text', {
            key: 't', x: pp.x, y: pp.y + 4, textAnchor: 'middle',
            style: { fontSize: 10.5, fontWeight: 700, fill: '#FFFFFF', fontFamily: FONT }
          }, bb.c)
          : null
      ]);
    })),
    (function () {
      var pm = project(51.51, -0.13, rot, LG);
      if (pm.z <= 0) return null;
      var pulse = ((T - Q.Global) * 0.8) % 1;
      return h('g', { key: 'mine' }, [
        h('circle', { key: 'r', cx: pm.x, cy: pm.y, r: 10 + 13 * pulse, fill: 'none', stroke: C.green, strokeWidth: 1.3, opacity: 0.5 * (1 - pulse) }),
        h('circle', { key: 'd', cx: pm.x, cy: pm.y, r: 5, fill: C.green, stroke: '#fff', strokeWidth: 1.6 }),
        h('text', { key: 't', x: pm.x + 11, y: pm.y - 8, style: { fontSize: 10.5, fontWeight: 600, fill: C.ink, fontFamily: FONT } }, 'Your lab')
      ]);
    })()
  ]);
}

function WatchArtifact(props) {
  var T = props.T, Q = props.CUES, rot = props.rot;
  var g = MOTION.draw(0, 1, Q.Global + 0.25, Q.Global + 2.0)(T);
  var maxC = 412;

  return h('div', {
    style: {
      position: 'relative', height: 526, background: '#FCFCFD',
      border: '1px solid ' + C.line, borderRadius: 8, overflow: 'hidden'
    }
  }, [
    h('div', {
      key: 'hd',
      style: {
        height: 44, borderBottom: '1px solid ' + C.line, background: C.white,
        display: 'flex', alignItems: 'center', gap: 10, padding: '0 15px'
      }
    }, [
      ic('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18', 17, C.green, 1.6),
      h('span', { key: 't', style: { fontSize: 13.5, fontWeight: 600, color: C.ink } }, 'Global watch: drug-resistant E. coli'),
      h('div', { key: 'sp', style: { flex: 1 } }),
      h('div', {
        key: 'th',
        style: {
          display: 'flex', alignItems: 'center', gap: 9, borderRadius: 999, padding: '4px 12px 4px 9px',
          background: '#FEF3F2', border: '1px solid #FECDCA'
        }
      }, [
        h('span', { key: 'm', style: { display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 } },
          [0, 1, 2, 3].map(function (i) {
            return h('span', {
              key: 'b' + i,
              style: { width: 3, height: 5 + i * 2.3, borderRadius: 1, background: '#D92D20' }
            });
          })),
        h('span', {
          key: 't',
          style: { fontSize: 11.5, fontWeight: 600, color: C.red, letterSpacing: '.01em' }
        }, 'Threat level: High')
      ])
    ]),
    h('div', { key: 'st', style: { position: 'absolute', left: 15, top: 54, display: 'flex', alignItems: 'baseline', gap: 34 } },
      GSTATS.map(function (st, k) {
        var o = MOTION.enter(0, 1, Q.Global + 0.15 + k * 0.08, Q.Global + 0.45 + k * 0.08)(T);
        return h('div', { key: 's' + k, style: { opacity: o, display: 'flex', alignItems: 'baseline', gap: 7 } }, [
          h('span', { key: 'a', style: { fontSize: 19, fontWeight: 600, color: C.ink, letterSpacing: '-.02em' } }, st.k),
          h('span', { key: 'b', style: { fontSize: 12, color: C.grey } }, st.l)
        ]);
      })),
    h('div', {
      key: 'map',
      style: {
        position: 'absolute', left: 14, top: 96, width: 505, height: 262,
        background: C.white, border: '1px solid ' + C.line, borderRadius: 6, overflow: 'hidden'
      }
    }, [
      h('div', {
        key: 'cap',
        style: { height: 38, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 12, color: C.grey }
      }, [
        h('span', { key: 'a', style: { flex: 1 } }, 'Where related samples were sequenced'),
        h('span', { key: 'b', style: { fontSize: 11.5, fontWeight: 600, color: C.green } }, 'Last 90 days')
      ]),
      h(MiniGlobe, { key: 'gl', T: T, CUES: Q, rot: rot })
    ]),
    h('div', {
      key: 'list',
      style: {
        position: 'absolute', left: 531, top: 96, width: 545, height: 262,
        background: C.white, border: '1px solid ' + C.line, borderRadius: 6, overflow: 'hidden'
      }
    }, [
      h('div', {
        key: 'h',
        style: {
          height: 38, borderBottom: '1px solid ' + C.line, display: 'grid',
          gridTemplateColumns: '1.5fr 1fr .5fr', alignItems: 'center', padding: '0 14px',
          fontSize: 10, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase',
          color: C.mute, background: '#FCFCFD'
        }
      }, ['Where', 'Genomes', 'This month'].map(function (t) { return h('div', { key: t }, t); })),
      h('div', { key: 'r' }, GLIST.map(function (r, k) {
        var o = MOTION.enter(0, 1, Q.Global + 0.3 + k * 0.07, Q.Global + 0.6 + k * 0.07)(T);
        var w = clamp((g - k * 0.05) / 0.5, 0, 1) * (r.c / maxC) * 100;
        return h('div', {
          key: 'g' + k,
          style: {
            display: 'grid', gridTemplateColumns: '1.5fr 1fr .5fr', alignItems: 'center',
            padding: '6px 14px', borderBottom: '1px solid #F2F4F7', opacity: o,
            background: r.mine ? C.lite : 'transparent'
          }
        }, [
          h('div', {
            key: 'n',
            style: { fontSize: 12.5, fontWeight: r.mine ? 600 : 500, color: r.mine ? C.deep : C.ink, display: 'flex', alignItems: 'center', gap: 8 }
          }, [
            h('span', { key: 'd', style: { width: 7, height: 7, borderRadius: 999, background: r.mine ? C.green : '#4FAE7C', flex: 'none' } }),
            h('span', { key: 't' }, r.n)
          ]),
          h('div', { key: 'b', style: { display: 'flex', alignItems: 'center', gap: 10 } }, [
            h('div', { key: 'bar', style: { flex: 1, height: 6, borderRadius: 999, background: C.soft, overflow: 'hidden' } },
              h('div', { style: { height: '100%', width: w + '%', background: r.mine ? C.green : '#3FA672', borderRadius: 999 } })),
            h('span', { key: 'v', style: { fontSize: 12, fontWeight: 600, color: C.ink, width: 30, textAlign: 'right' } }, r.c)
          ]),
          h('div', { key: 'd', style: { fontSize: 12, fontWeight: 600, color: C.amber, textAlign: 'right' } }, r.d)
        ]);
      }))
    ]),
    h('div', {
      key: 'curve',
      style: {
        position: 'absolute', left: 14, top: 370, width: 1062, height: 142,
        background: C.white, border: '1px solid ' + C.line, borderRadius: 6, overflow: 'hidden'
      }
    }, [
      h('div', {
        key: 'h',
        style: { height: 40, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px' }
      }, [
        h('span', { key: 'a', style: { fontSize: 12, color: C.grey } }, 'New cases per week'),
        h('div', { key: 'sp', style: { flex: 1 } }),
        (function () {
          var fo = clamp((g - 0.88) / 0.1, 0, 1);
          return h('div', {
            key: 'f',
            style: {
              display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontWeight: 600, color: C.deep,
              borderRadius: 999, padding: '5px 13px 5px 10px', opacity: fo,
              background: C.lite, border: '1px solid #A6F4C5',
              transform: 'scale(' + MOTION.pop(0.8, 1, Q.Global + 1.9, Q.Global + 2.4)(T).toFixed(3) + ')'
            }
          }, [
            sparkle(14, C.deep),
            h('span', { key: 't' }, 'AI threat detection'),
            h('span', { key: 'd', style: { color: '#6CC492' } }, '\u00b7'),
            h('span', { key: 'v', style: { fontWeight: 500, color: C.green } }, 'predicted to double within a month')
          ]);
        })()
      ]),
      h('svg', { key: 's', width: 1060, height: 100, viewBox: '0 0 1060 100' }, [
        h('defs', { key: 'df' }, [
          h('linearGradient', { key: 'fg', id: 'fgrad', x1: '0', y1: '0', x2: '0', y2: '1' }, [
            h('stop', { key: 'a', offset: '0%', stopColor: '#157639', stopOpacity: 0.5 }),
            h('stop', { key: 'b', offset: '100%', stopColor: '#157639', stopOpacity: 0.09 })
          ]),
          h('linearGradient', { key: 'bg', id: 'fband', x1: '0', y1: '0', x2: '1', y2: '0' }, [
            h('stop', { key: 'a', offset: '0%', stopColor: '#12B76A', stopOpacity: 0.03 }),
            h('stop', { key: 'b', offset: '100%', stopColor: '#12B76A', stopOpacity: 0.11 })
          ])
        ]),
        (function () {
          var fo = clamp((g - 0.84) / 0.14, 0, 1);
          if (fo < 0.01) return null;
          var x0 = 14 + CURVE.length * 36.4 - 7;
          return h('rect', {
            key: 'band', x: x0, y: 2, width: 1046 - x0, height: 78, rx: 3,
            fill: 'url(#fband)', opacity: fo
          });
        })()
      ].concat(CURVE.map(function (v, k) {
        var st = clamp((g - k * 0.024) / 0.4, 0, 1);
        var hg = v[0] * 0.31 * st, hm = v[1] * 0.31 * st;
        var x = 14 + k * 36.4;
        return h('g', { key: 'b' + k }, [
          h('rect', { key: 'a', x: x, y: 80 - hg - hm, width: 25, height: hg, rx: 2, fill: '#8ACFA9' }),
          h('rect', { key: 'b', x: x, y: 80 - hm, width: 25, height: hm, rx: 2, fill: C.green })
        ]);
      })).concat([
        h('line', { key: 'ax', x1: 10, y1: 80.5, x2: 1048, y2: 80.5, stroke: C.line, strokeWidth: 1 }),
        h('line', {
          key: 'dv', x1: 14 + CURVE.length * 36.4 - 6, y1: 4, x2: 14 + CURVE.length * 36.4 - 6, y2: 80,
          stroke: '#D0D5DD', strokeWidth: 1, strokeDasharray: '3 3',
          opacity: clamp((g - 0.84) / 0.12, 0, 1)
        }),
        h('text', { key: 't1', x: 14, y: 95, style: { fontSize: 10, fill: C.mute, fontFamily: FONT } }, '6 months ago'),
        h('text', {
          key: 't2', x: 14 + CURVE.length * 36.4 - 12, y: 95, textAnchor: 'end',
          style: { fontSize: 10, fill: C.mute, fontFamily: FONT }
        }, 'now'),
        (function () {
          var fo = clamp((g - 0.8) / 0.18, 0, 1);
          if (fo < 0.01) return null;
          var last = CURVE[CURVE.length - 1];
          var pts = [[14 + (CURVE.length - 1) * 36.4 + 12.5, 80 - (last[0] + last[1]) * 0.31]];
          FCAST.forEach(function (v, k) {
            pts.push([14 + (CURVE.length + k) * 36.4 + 12.5, 80 - v * 0.31]);
          });
          var head = pts[pts.length - 1];
          var pulse = ((T - (Q.Global + 2.1)) * 0.75) % 1;
          return h('g', { key: 'traj', opacity: fo }, [
            h('polyline', {
              key: 'l', points: pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '),
              fill: 'none', stroke: C.green, strokeWidth: 2, strokeLinecap: 'round',
              strokeDasharray: '1', pathLength: 1, strokeDashoffset: 1 - fo
            }),
            h('circle', {
              key: 'g', cx: head[0], cy: head[1], r: 4 + 7 * pulse,
              fill: 'none', stroke: C.mint, strokeWidth: 1.2, opacity: 0.55 * (1 - pulse)
            }),
            h('circle', { key: 'd', cx: head[0], cy: head[1], r: 3.4, fill: C.green, stroke: '#fff', strokeWidth: 1.4 })
          ]);
        })(),
        h('text', {
          key: 't3', x: 1044, y: 95, textAnchor: 'end',
          style: { fontSize: 10, fill: C.green, fontFamily: FONT, fontWeight: 600 },
          opacity: clamp((g - 0.86) / 0.12, 0, 1)
        }, 'Predicted')
      ]))
    ])
  ]);
}

// ------------------------------------------------------------- app shell
var VIEWS = [
  { t: 'CRE surveillance', d: '#F04438' },
  { t: 'QC monitoring', d: '#12B76A' },
  { t: 'MRSA, ICU', d: '#7A5AF8' }
];

function AppCard(props) {
  var T = props.T, Q = props.CUES, total = props.total;
  var appIn = MOTION.enter(0, 1, Q.Collect, Q.Collect + 0.6)(T);
  var appOut = MOTION.draw(1, 0, Q.Network + 0.35, Q.Network + 1.3)(T);
  var o = appIn * appOut;
  if (o < 0.01) return null;

  var rise = MOTION.enter(38, 0, Q.Collect, Q.Collect + 0.75)(T);
  var sink = MOTION.draw(0, 90, Q.Network + 0.2, Q.Network + 1.3)(T);
  var sc = MOTION.enter(0.96, 1, Q.Collect, Q.Collect + 0.75)(T)
    * MOTION.draw(1, 0.74, Q.Network + 0.2, Q.Network + 1.3)(T);

  var oChat = MOTION.enter(0, 1, Q.Ask + 1.32, Q.Ask + 1.62)(T);
  var oSam = clamp(1 - oChat, 0, 1);

  var ICX = {
    clus: [[6.6, 7.4, 2.4], [17.4, 6.8, 2.4], [12, 16.6, 2.4]],
    plas: [[12, 12, 7]],
    ask: [[12, 12, 9], [12, 16.4, 1, 1]]
  };
  // matches the app: gap 10, 8/10 padding, radius 4, 13.5px, 18px icons
  var navRow = function (key, icon, label, count, badge, on) {
    return h('div', {
      key: key,
      style: {
        display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 4,
        fontSize: 13.5, fontWeight: on ? 600 : 500,
        color: on ? C.deep : '#344054', background: on ? '#F5FBF7' : 'transparent'
      }
    }, [
      ic(icon, 18, 'currentColor', 1.7, ICX[key]),
      h('span', { key: 't', style: { flex: 1 } }, label),
      count
        ? h('span', {
          key: 'n',
          style: badge
            ? { fontSize: 10.5, fontWeight: 700, color: '#fff', background: C.green, padding: '1px 7px', borderRadius: 999 }
            : { fontSize: 11, color: C.mute }
        }, count)
        : null
    ]);
  };
  var viewRow = function (v, k) {
    return h('div', {
      key: 'v' + k,
      style: {
        display: 'flex', alignItems: 'center', gap: 10, padding: '5px 10px', borderRadius: 4,
        fontSize: 13, fontWeight: 500, color: '#475467'
      }
    }, [
      h('span', { key: 'sp', style: { width: 16, flex: 'none' } }),
      h('span', { key: 'd', style: { width: 9, height: 9, borderRadius: 999, background: v.d, flex: 'none' } }),
      h('span', { key: 't', style: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, v.t)
    ]);
  };

  return h('div', {
    style: {
      position: 'absolute', left: CARD.x, top: CARD.y, width: CARD.w, height: CARD.h,
      background: C.app, borderRadius: 12, opacity: o, overflow: 'hidden', fontFamily: FONT,
      transform: 'translateY(' + (rise + sink) + 'px) scale(' + sc.toFixed(4) + ')',
      transformOrigin: '50% 46%',
      boxShadow: '0 30px 90px rgba(16,24,40,.13), 0 0 0 1px rgba(16,24,40,.06)'
    }
  }, h('div', {
    style: {
      width: 1440, height: IH, display: 'grid', gridTemplateColumns: '244px 1fr',
      transform: 'scale(' + (1 / K) + ')', transformOrigin: '0 0', background: C.app, position: 'relative'
    }
  }, [
    h('div', {
      key: 'side',
      style: {
        background: C.white, borderRight: '1px solid ' + C.line, display: 'flex',
        flexDirection: 'column', padding: '14px 12px', gap: 1
      }
    }, [
      h('div', {
        key: 'ws',
        style: { marginBottom: 4, borderBottom: '1px solid ' + C.line }
      }, h('div', {
        style: { display: 'flex', alignItems: 'center', gap: 9, padding: '5px 6px', marginBottom: 8, borderRadius: 4 }
      }, [
        h('div', {
          key: 'a',
          style: { width: 24, height: 24, borderRadius: 5, background: '#EAECF0', color: '#475467', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12, flex: 'none' }
        }, 'S'),
        h('div', {
          key: 'n',
          style: { flex: 1, fontSize: 13, fontWeight: 600, color: '#40544C', letterSpacing: '-.01em' }
        }, "St. Mary's Hospital"),
        ic('M6 9l6 6 6-6', 16, C.mute, 2)
      ])),
      navRow('home', 'M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10', 'Home', '', false, true),
      navRow('act', 'M22 12h-4l-3 9L9 3l-3 9H2', 'Activity', '2', false, false),
      navRow('views', 'M3 5.5h18M3 12h18M3 18.5h12', 'Views', '8', false, false),
      navRow('gw', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18', 'Global watch', '9', false, false),
      h('div', {
        key: 'lib',
        style: { fontSize: 10.5, fontWeight: 600, color: C.mute, padding: '12px 10px 4px' }
      }, 'Library'),
      navRow('samp', 'M9 3h6M10 3v5.5L5.2 17a2 2 0 0 0 1.8 3h10a2 2 0 0 0 1.8-3L14 8.5V3', 'Samples', '3,842', false, false),
      navRow('clus', 'M7.7 9.6l3 4.8M16.3 9l-2.8 5.4', 'Clusters', '5', false, false),
      navRow('plas', 'M12 5v2.2', 'Plasmids', '37', false, false),
      navRow('rep', 'M7 3h7l4 4v14H7zM14 3v5h4', 'Reports', '18', false, false),
      h('div', { key: 'sp', style: { marginTop: 'auto' } },
        h('div', {
          style: {
            display: 'flex', alignItems: 'center', gap: 9, padding: '6px 10px', borderRadius: 4,
            fontSize: 13, fontWeight: 500, color: C.grey
          }
        }, [
          ic('M9.7 9.5a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.1 1-1.1 1.7', 18, 'currentColor', 1.7, ICX.ask),
          h('span', { key: 't' }, 'Ask us anything')
        ]))
    ]),

    h('div', { key: 'main', style: { minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }, [
      h('div', {
        key: 'top',
        style: {
          flex: 'none', height: 58, borderBottom: '1px solid ' + C.line, background: C.white,
          display: 'flex', alignItems: 'center', gap: 9, padding: '0 26px'
        }
      }, [
        h('span', { key: 'c1', style: { fontSize: 13.5, color: C.grey } }, 'Home'),
        oChat > 0.5 ? h('span', { key: 's1', style: { fontSize: 13, color: C.faint } }, '/') : null,
        oChat > 0.5 ? h('span', { key: 'c2', style: { fontSize: 13.5, fontWeight: 600, color: C.ink } }, 'Ask Solu') : null,
        h('div', { key: 'sp', style: { flex: 1 } }),
        h('div', {
          key: 'srch',
          style: {
            display: 'flex', alignItems: 'center', gap: 9, border: '1px solid #E4E7EC', borderRadius: 4,
            padding: '7px 12px', width: 240, color: C.mute, background: '#FCFCFD'
          }
        }, [ic('M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3', 15, 'currentColor', 1.8),
          h('span', { key: 't', style: { fontSize: 13 } }, 'Search samples')]),
        h('div', {
          key: 'btn',
          style: {
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#fff',
            background: (T > Q.Collect + 0.42 && T < Q.Collect + 0.68) ? C.deep : C.green,
            padding: '9px 15px', borderRadius: 4
          }
        }, [ic('M12 5v14M5 12h14', 15, 'currentColor', 2), h('span', { key: 't' }, 'Add samples')])
      ]),
      h('div', { key: 'body', style: { flex: 1, minHeight: 0, overflow: 'hidden', padding: '28px 34px', position: 'relative' } },
        h('div', { style: { maxWidth: 1090, margin: '0 auto', position: 'relative' } }, [
          h('div', { key: 'sam', style: { opacity: oSam, display: oSam < 0.02 ? 'none' : 'block' } },
            h(HomeScreen, { T: T, CUES: Q })),
          h('div', { key: 'ch', style: { position: 'absolute', inset: 0, opacity: oChat, display: oChat < 0.02 ? 'none' : 'block' } },
            h(ChatThread, { T: T, CUES: Q, rot: props.rot }))
        ]))
    ]),

    h(AddSamplesModal, { key: 'm1', T: T, CUES: Q })
  ]));
}

// -------------------------------------------------------- dragged files
function DragLayer(props) {
  var T = props.T, Q = props.CUES;
  var target = { x: 800, y: 361 };
  return h('div', { style: { position: 'absolute', inset: 0, pointerEvents: 'none' } }, FILES.map(function (f, i) {
    var t = fileT(i), s = Q.Collect + t.s, e = Q.Collect + t.e;
    if (T < s - 0.05 || T > e + 0.4) return null;
    var fl = FLY[i];
    var x = MOTION.enter(fl.fx, target.x + ((i % 3) - 1) * 14, s, e)(T);
    var y = MOTION.enter(fl.fy, target.y + ((i % 2) ? 9 : -7), s, e + 0.08)(T);
    var op = clamp((T - s) / 0.3, 0, 1) * MOTION.draw(1, 0, e - 0.04, e + 0.34)(T);
    var scl = MOTION.draw(1, 0.72, e - 0.24, e + 0.3)(T);
    var rot = MOTION.enter(fl.rot, 0, s, e + 0.05)(T);
    return h('div', {
      key: 'f' + i,
      style: {
        position: 'absolute', left: x, top: y, opacity: op, fontFamily: FONT,
        transform: 'translate(-50%,-50%) scale(' + scl.toFixed(3) + ') rotate(' + rot.toFixed(2) + 'deg)',
        background: C.white, border: '1px solid ' + C.line, borderRadius: 7, padding: '9px 13px',
        display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap',
        boxShadow: '0 14px 34px rgba(16,24,40,.16)'
      }
    }, [
      h('div', {
        key: 'i',
        style: { width: 24, height: 24, borderRadius: 4, background: C.lite, display: 'grid', placeItems: 'center' }
      }, ic('M8 3h6l4 4v14H6V3zM14 3v5h4', 13, C.green, 1.6)),
      h('div', { key: 'm' }, [
        h('div', { key: 'a', style: { fontSize: 12, fontWeight: 600, color: C.ink } }, f.f),
        h('div', { key: 'b', style: { fontSize: 10.5, color: C.mute, marginTop: 1 } }, f.sz)
      ])
    ]);
  }));
}

// -------------------------------------------------------------- pointer
function Cursor(props) {
  var T = props.T, Q = props.CUES;
  var path = [
    { t: Q.Collect + 0.05, x: 860, y: 700 },
    { t: Q.Collect + 0.45, x: 1415, y: 69 },
    { t: Q.Collect + 1.2, x: 1210, y: 315 },
    { t: Q.Load - 0.62, x: 1036, y: 522 },
    { t: Q.Ask + 0.05, x: 893, y: 147 },
    { t: Q.Ask + 1.1, x: 1433, y: 147 },
    { t: Q.Ask + 2.4, x: 1243, y: 271 },
    { t: Q.Global + 0.5, x: 1243, y: 271 },
    { t: Q.Network + 0.1, x: 1127, y: 691 }
  ];
  var clicks = [Q.Collect + 0.5, Q.Load - 0.5, Q.Ask + 1.2];
  var o = MOTION.enter(0, 1, Q.Collect, Q.Collect + 0.3)(T) * MOTION.draw(1, 0, Q.Network - 0.1, Q.Network + 0.3)(T);
  if (o < 0.01 || OPT().showCursor === false) return null;

  var x = path[0].x, y = path[0].y;
  for (var i = 0; i < path.length - 1; i++) {
    var a = path[i], b = path[i + 1];
    if (T >= b.t) { x = b.x; y = b.y; continue; }
    if (T >= a.t) {
      var p = Easing.easeInOutCubic ? Easing.easeInOutCubic(clamp((T - a.t) / (b.t - a.t), 0, 1)) : clamp((T - a.t) / (b.t - a.t), 0, 1);
      x = a.x + (b.x - a.x) * p; y = a.y + (b.y - a.y) * p;
      break;
    }
  }
  var rings = clicks.map(function (ct, k) {
    var p = clamp((T - ct) / 0.5, 0, 1);
    if (p <= 0 || p >= 1) return null;
    return h('span', {
      key: 'r' + k,
      style: {
        position: 'absolute', left: x, top: y, width: 8 + 44 * p, height: 8 + 44 * p,
        marginLeft: -(4 + 22 * p), marginTop: -(4 + 22 * p), borderRadius: 999,
        border: '2px solid ' + ACC(), opacity: 0.6 * (1 - p)
      }
    });
  });
  return h('div', { style: { position: 'absolute', inset: 0, pointerEvents: 'none', opacity: o } }, rings.concat([
    h('svg', {
      key: 'c', width: 26, height: 30, viewBox: '0 0 26 30',
      style: { position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 3px 8px rgba(16,24,40,.28))' }
    }, h('path', {
      d: 'M3 1.5 L3 22 L8.6 16.6 L12.4 25.5 L16.6 23.7 L12.9 15 L21 15 Z',
      fill: '#101828', stroke: '#FFFFFF', strokeWidth: 1.4, strokeLinejoin: 'round'
    }))
  ]));
}

// ------------------------------------------------------------ dot field
function layMap(i, rot) {
  var c = COORD[i % COORD.length];
  var p = project(c[0], c[1], rot, MINI);
  var front = p.z > 0;
  return { x: p.x, y: p.y, r: front ? 3.6 : 2.4, o: front ? 1 : 0.22 };
}
function layGlobe(i, rot) {
  var c = COORD[i % COORD.length];
  var p = project(c[0], c[1], rot);
  var front = p.z > 0;
  return { x: p.x, y: p.y, r: front ? (i < 20 ? 7 : 5.2) : 3.6, o: front ? 1 : 0.32 };
}
function SampleField(props) {
  var T = props.T, Q = props.CUES, rot = props.rot;
  var n = NN();

  var globeO = MOTION.enter(0, 1, Q.Network + 0.05, Q.Network + 0.6)(T);
  if (globeO < 0.01) return null;

  var p0 = Q.Network + 0.3, p1 = Q.Network + 1.9;
  var p = clamp((T - p0) / (p1 - p0), 0, 1);

  var out = [];
  for (var i = 0; i < n; i++) {
    var a = layMap(i, rot), b = layGlobe(i, rot);
    var lead = (i / n) * 0.4;
    var pi = clamp((p - lead) / (1 - 0.4), 0, 1);
    var e = Easing.easeInOutCubic ? Easing.easeInOutCubic(pi) : pi;
    var pos = {
      x: a.x + (b.x - a.x) * e,
      y: a.y + (b.y - a.y) * e - Math.sin(e * Math.PI) * 26,
      r: a.r + (b.r - a.r) * e
    };
    var op = (a.o + (b.o - a.o) * e) * globeO;
    if (pos.r < 0.4 || op < 0.02) continue;
    var tone = dotTone(i);
    out.push(h('circle', { key: 'd' + i, cx: pos.x, cy: pos.y, r: pos.r, fill: tone, opacity: op }));
  }
  return h('g', null, out);
}

// --------------------------------------------------------- globe + arcs
function GlobeLayer(props) {
  var T = props.T, Q = props.CUES, rot = props.rot;
  var o = MOTION.enter(0, 1, Q.Network + 0.25, Q.Network + 1.2)(T);
  if (o < 0.01) return null;
  var sc = MOTION.enter(0.86, 1, Q.Network + 0.25, Q.Network + 2.2)(T);

  var mer = [], par = [], pts, la, lo, p;
  for (var m = 0; m < 14; m++) {
    pts = [];
    for (la = -80; la <= 80; la += 5) {
      p = project(la, m * 180 / 7 - 180, rot);
      if (p.z > 0) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1));
      else if (pts.length) { mer.push(pts.join(' ')); pts = []; }
    }
    if (pts.length) mer.push(pts.join(' '));
  }
  for (var q = -60; q <= 60; q += 20) {
    pts = [];
    for (lo = -180; lo <= 180; lo += 5) {
      p = project(q, lo, rot);
      if (p.z > 0) pts.push(p.x.toFixed(1) + ',' + p.y.toFixed(1));
      else if (pts.length) { par.push(pts.join(' ')); pts = []; }
    }
    if (pts.length) par.push(pts.join(' '));
  }

  var pairs = [[0, 1], [1, 2], [2, 3], [3, 15], [1, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [10, 11], [0, 12], [13, 14], [14, 16], [4, 15], [17, 7], [12, 1], [10, 8], [18, 19], [20, 21],
    [22, 23], [24, 25], [26, 27], [28, 29], [30, 31], [32, 33], [34, 5], [35, 36], [37, 38],
    [39, 40], [41, 42], [43, 44], [45, 46], [47, 48], [49, 50], [51, 52], [53, 0], [1, 18], [2, 47], [10, 39]];
  var arcs = MOTION.draw(0, 1, Q.Network + 0.5, Q.Network + 2.1)(T);
  var pulse = ((T - Q.Network) * 0.42) % 1;

  return h('g', {
    opacity: o,
    transform: 'translate(' + GLOBE.cx + ' ' + GLOBE.cy + ') scale(' + sc.toFixed(4) + ') translate(' + (-GLOBE.cx) + ' ' + (-GLOBE.cy) + ')'
  }, [
    h('circle', { key: 'sphere', cx: GLOBE.cx, cy: GLOBE.cy, r: GLOBE.r, fill: '#F8FAF9' }),
    h('circle', { key: 'rim', cx: GLOBE.cx, cy: GLOBE.cy, r: GLOBE.r, fill: 'none', stroke: '#B6C7BF', strokeWidth: 1.2 }),
    h('g', { key: 'wire', stroke: '#BECDC5', strokeWidth: 0.9, fill: 'none' },
      mer.concat(par).map(function (pl, k) { return h('polyline', { key: 'w' + k, points: pl }); })),
    h('g', { key: 'arcs' }, pairs.map(function (pr, k) {
      var A = project(COORD[pr[0]][0], COORD[pr[0]][1], rot);
      var B = project(COORD[pr[1]][0], COORD[pr[1]][1], rot);
      if (A.z <= 0.03 || B.z <= 0.03) return null;
      var mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      var dx = mx - GLOBE.cx, dy = my - GLOBE.cy;
      var d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      var lift = 1 + 52 / d;
      var step = clamp((arcs - (k / pairs.length) * 0.7) / 0.3, 0, 1);
      if (step <= 0) return null;
      return h('path', {
        key: 'a' + k,
        d: 'M' + A.x + ' ' + A.y + ' Q' + (GLOBE.cx + dx * lift) + ' ' + (GLOBE.cy + dy * lift) + ' ' + B.x + ' ' + B.y,
        fill: 'none', stroke: C.green, strokeWidth: 1.6, opacity: 0.9 * step, strokeLinecap: 'round',
        pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - step
      });
    })),
    h('circle', {
      key: 'sweep', cx: GLOBE.cx, cy: GLOBE.cy, r: GLOBE.r * (0.55 + pulse * 0.55),
      fill: 'none', stroke: C.green, strokeWidth: 0.9, opacity: 0.2 * (1 - pulse)
    })
  ]);
}

// -------------------------------------------------------- opening line
var LINE_A = 'Solu connects genomic data from labs worldwide,';
var LINE_B = 'so outbreaks surface early.';

function IntroLine(props) {
  var T = props.T, Q = props.CUES;
  var out = MOTION.draw(1, 0, Q.Collect - 0.45, Q.Collect + 0.02)(T);
  if (out < 0.01) return null;
  var lift = MOTION.draw(0, -26, Q.Collect - 0.45, Q.Collect + 0.02)(T);

  var words = [];
  LINE_A.split(' ').forEach(function (w) { words.push({ w: w, tone: C.ink }); });
  words.push({ br: true });
  LINE_B.split(' ').forEach(function (w) { words.push({ w: w, tone: C.green }); });

  return h('div', {
    style: {
      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 30, opacity: out,
      transform: 'translateY(' + lift.toFixed(1) + 'px)', fontFamily: FONT, pointerEvents: 'none'
    }
  }, [
    h('div', {
      key: 't',
      style: {
        maxWidth: 1120, textAlign: 'center', fontSize: 47, fontWeight: 400, lineHeight: 1.24,
        letterSpacing: '-.03em', display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        columnGap: 13, rowGap: 4
      }
    }, words.map(function (it, k) {
      if (it.br) return h('span', { key: 'br', style: { flexBasis: '100%', height: 0 } });
      var at = Q.Intro + 0.22 + k * 0.075;
      var o = MOTION.enter(0, 1, at, at + 0.45)(T);
      var y = MOTION.enter(14, 0, at, at + 0.55)(T);
      return h('span', {
        key: 'w' + k,
        style: { color: it.tone, opacity: o, transform: 'translateY(' + y.toFixed(2) + 'px)', display: 'inline-block' }
      }, it.w);
    }))
  ]);
}

// ------------------------------------------------------------- the close
function TitleLayer(props) {
  var T = props.T, Q = props.CUES;
  var o = MOTION.enter(0, 1, Q.Network + 1.5, Q.Network + 2.1)(T);
  if (o < 0.01) return null;
  var rise = MOTION.enter(22, 0, Q.Network + 1.5, Q.Network + 2.3)(T);
  return h('div', {
    style: {
      position: 'absolute', left: 0, right: 0, bottom: 66, textAlign: 'center',
      transform: 'translateY(' + rise + 'px)', opacity: o, fontFamily: FONT, pointerEvents: 'none'
    }
  }, [
    h('svg', {
      key: 'lg', width: 118, height: 44, viewBox: '0 0 54 20',
      style: { color: C.ink, display: 'block', margin: '0 auto 16px' }
    }, [
      h('path', { key: 'p1', fill: 'currentColor', d: 'M 6.846 20 C 5.563 20 4.413 19.786 3.395 19.359 C 2.376 18.914 1.565 18.318 0.962 17.57 C 0.377 16.822 0.057 15.995 0 15.087 L 3.989 15.087 C 4.064 15.656 4.356 16.128 4.866 16.502 C 5.394 16.876 6.044 17.063 6.817 17.063 C 7.572 17.063 8.156 16.92 8.571 16.636 C 9.005 16.351 9.222 15.986 9.222 15.541 C 9.222 15.06 8.958 14.704 8.43 14.473 C 7.921 14.223 7.1 13.956 5.969 13.672 C 4.8 13.405 3.838 13.129 3.083 12.844 C 2.348 12.559 1.707 12.123 1.16 11.535 C 0.632 10.948 0.368 10.156 0.368 9.159 C 0.368 8.34 0.613 7.592 1.103 6.916 C 1.612 6.239 2.329 5.705 3.253 5.314 C 4.196 4.922 5.299 4.726 6.563 4.726 C 8.43 4.726 9.92 5.171 11.032 6.061 C 12.145 6.934 12.758 8.117 12.871 9.613 L 9.08 9.613 C 9.024 9.025 8.76 8.563 8.288 8.224 C 7.836 7.868 7.223 7.69 6.45 7.69 C 5.733 7.69 5.177 7.815 4.781 8.064 C 4.403 8.313 4.215 8.66 4.215 9.105 C 4.215 9.604 4.479 9.987 5.007 10.254 C 5.535 10.503 6.355 10.761 7.468 11.028 C 8.6 11.295 9.533 11.571 10.269 11.856 C 11.004 12.141 11.636 12.586 12.164 13.191 C 12.711 13.778 12.994 14.562 13.012 15.541 C 13.012 16.395 12.758 17.161 12.249 17.837 C 11.758 18.514 11.042 19.048 10.099 19.439 C 9.175 19.813 8.09 20 6.846 20 Z' }),
      h('path', { key: 'p2', fill: 'currentColor', d: 'M 22.232 20 C 20.723 20 19.366 19.688 18.159 19.065 C 16.952 18.425 15.999 17.526 15.302 16.368 C 14.623 15.211 14.283 13.876 14.283 12.363 C 14.283 10.85 14.632 9.515 15.33 8.358 C 16.047 7.201 17.018 6.311 18.244 5.688 C 19.469 5.047 20.837 4.726 22.345 4.726 C 23.854 4.726 25.221 5.047 26.447 5.688 C 27.673 6.311 28.635 7.201 29.332 8.358 C 30.049 9.515 30.407 10.85 30.407 12.363 C 30.407 13.876 30.04 15.211 29.304 16.368 C 28.588 17.526 27.607 18.425 26.362 19.065 C 25.136 19.688 23.76 20 22.232 20 Z M 22.232 16.742 C 22.949 16.742 23.618 16.582 24.241 16.262 C 24.882 15.923 25.391 15.425 25.768 14.766 C 26.145 14.108 26.334 13.307 26.334 12.363 C 26.334 10.957 25.938 9.88 25.146 9.132 C 24.373 8.367 23.42 7.984 22.289 7.984 C 21.157 7.984 20.205 8.367 19.432 9.132 C 18.677 9.88 18.3 10.957 18.3 12.363 C 18.3 13.769 18.668 14.855 19.403 15.621 C 20.158 16.368 21.101 16.742 22.232 16.742 Z' }),
      h('path', { key: 'p3', fill: 'currentColor', d: 'M 36.283 0 L 36.283 19.76 L 32.322 19.76 L 32.322 0 L 36.283 0 Z' }),
      h('path', { key: 'p4', fill: 'currentColor', d: 'M 54 4.967 L 54 19.76 L 50.011 19.76 L 50.011 17.891 C 49.502 18.531 48.833 19.039 48.003 19.413 C 47.192 19.769 46.306 19.947 45.344 19.947 C 44.118 19.947 43.034 19.706 42.091 19.226 C 41.148 18.727 40.403 18.006 39.856 17.063 C 39.328 16.101 39.064 14.962 39.064 13.645 L 39.064 4.967 L 43.024 4.967 L 43.024 13.111 C 43.024 14.286 43.335 15.194 43.958 15.834 C 44.58 16.457 45.429 16.769 46.504 16.769 C 47.597 16.769 48.456 16.457 49.078 15.834 C 49.7 15.194 50.011 14.286 50.011 13.111 L 50.011 4.967 L 54 4.967 Z' })
    ]),
    h('div', {
      key: 'tag',
      style: { fontSize: 42, fontWeight: 400, color: C.ink, letterSpacing: '-.03em' }
    }, 'Preventing epidemics with genomics')
  ]);
}

// ---------------------------------------------------------------- piece
function Piece() {
  var c = useComposition();
  var T = c.T, Q = c.CUES, total = c.authoredTotal;
  var rot = -0.55 - Math.max(0, T - Q.Network) * 0.055;

  var camScale = 1
    + MOTION.enter(0, 0.035, Q.Collect + 0.4, Q.Collect + 1.6)(T)
    - MOTION.draw(0, 0.035, Q.Load - 0.6, Q.Load + 0.3)(T)
    + MOTION.draw(0, 0.03, Q.Ask + 0.2, Q.Ask + 1.2)(T)
    - MOTION.draw(0, 0.03, Q.Global - 0.6, Q.Global + 0.2)(T)
    + MOTION.draw(0, 0.03, Q.Global + 0.8, Q.Global + 2.6)(T)
    - MOTION.draw(0, 0.03, Q.Network, Q.Network + 1.2)(T)
    + MOTION.draw(0, 0.04, Q.Network + 1.4, total)(T);


  var fadeOut = MOTION.draw(1, 0, total - 0.4, total - 0.03)(T);

  return h('div', {
    'data-screen-label': String(Math.floor(c.time)) + 's',
    style: { position: 'absolute', inset: 0, background: C.bg, overflow: 'hidden', fontFamily: FONT }
  }, h('div', { style: { position: 'absolute', inset: 0, opacity: fadeOut } }, [
    h('div', {
      key: 'cam',
      style: {
        position: 'absolute', inset: 0,
        transform: 'scale(' + camScale.toFixed(4) + ')', transformOrigin: '50% 50%'
      }
    }, [
      h('svg', {
        key: 'back', width: W, height: HH, viewBox: '0 0 ' + W + ' ' + HH,
        style: { position: 'absolute', inset: 0, overflow: 'visible' }
      }, [
        h(GlobeLayer, { key: 'globe', T: T, CUES: Q, rot: rot })
      ]),
      h(AppCard, { key: 'app', T: T, CUES: Q, total: total, rot: rot }),
      h('svg', {
        key: 'front', width: W, height: HH, viewBox: '0 0 ' + W + ' ' + HH,
        style: { position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }
      }, h(SampleField, { key: 'field', T: T, CUES: Q, rot: rot })),
      h(DragLayer, { key: 'drag', T: T, CUES: Q }),
      h(Cursor, { key: 'cur', T: T, CUES: Q })
    ]),
    h(IntroLine, { key: 'intro', T: T, CUES: Q }),
    h(TitleLayer, { key: 'title', T: T, CUES: Q })
  ]));
}

window.Piece = Piece;
