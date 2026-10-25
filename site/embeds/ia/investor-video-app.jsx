/* global React, CompositionStage, useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakColor, TweakSlider */

var TWEAK_DEFAULTS_FALLBACK = { motionEditor: true, showCursor: true, accent: '#12B76A', density: 54 };

function VideoApp() {
  var defs = window.TWEAK_DEFAULTS || TWEAK_DEFAULTS_FALLBACK;
  var tw = useTweaks(defs);
  var t = tw[0], setTweak = tw[1];

  window.VID_OPTS = { showCursor: t.showCursor !== false, accent: t.accent, density: t.density };

  return React.createElement('div', { style: { position: 'absolute', inset: 0 } }, [
    React.createElement(CompositionStage, {
      key: 'stage',
      width: 1600, height: 900, bg: '#FFFFFF',
      scenes: window.OM_SCENES, playback: window.OM_PLAYBACK
    }, React.createElement(window.Piece, { key: 'piece' })),
    React.createElement(TweaksPanel, { key: 'tweaks' }, [
      React.createElement(TweakSection, { key: 's1', label: 'Playback' }),
      React.createElement(TweakToggle, {
        key: 'me', label: 'Motion editor', value: t.motionEditor !== false,
        onChange: function (v) { setTweak('motionEditor', v); }
      }),
      React.createElement(TweakToggle, {
        key: 'cur', label: 'Show pointer', value: t.showCursor !== false,
        onChange: function (v) { setTweak('showCursor', v); }
      }),
      React.createElement(TweakSection, { key: 's2', label: 'Look' }),
      React.createElement(TweakColor, {
        key: 'ac', label: 'Accent', value: t.accent,
        options: ['#12B76A', '#157639', '#0BA5EC', '#7A5AF8'],
        onChange: function (v) { setTweak('accent', v); }
      }),
      React.createElement(TweakSlider, {
        key: 'dn', label: 'Samples on globe', value: t.density, min: 24, max: 54, step: 6,
        onChange: function (v) { setTweak('density', v); }
      })
    ])
  ]);
}

window.VideoApp = VideoApp;
