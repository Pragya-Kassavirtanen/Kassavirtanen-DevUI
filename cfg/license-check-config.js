module.exports = {
  'allowedPackages': [
    {
      'name': 'spdx-license-ids@1.2.2',
      'reason': 'Unlicense'
    },
    {
      'name': 'spdx-expression-parse@1.0.4',
      'repo': 'https://github.com/kemitchell/spdx-expression-parse.js',
      'reason': 'MIT AND CC-BY-3.0'
    },
    {
      'name': 'component-emitter',
      'repo': 'https://github.com/component/emitter',
      'reason': 'MIT but not published'
    },
    {
      'name': 'component-inherit',
      'repo': 'https://github.com/component/inherit',
      'reason': 'MIT but not published'
    },
    {
      'name': 'debug@0.7.4',
      'repo': 'https://github.com/visionmedia/debug',
      'reason': 'MIT but not published'
    },
    {
      'name': 'humane-js@3.2.2',
      'repo': 'https://github.com/wavded/humane-js',
      'reason': 'MIT in the README'
    },
    {
      'name': 'ripemd160@0.2.0',
      'repo': 'https://github.com/crypto-browserify/ripemd160',
      'reason': 'Shows up as UNKNOWN but it is MIT in the README'
    }
  ],
  'disallowedPackages': [],
  'allowedLicenses': [
    'MIT',
    'MIT/X11',
    'ISC',
    'Apache',
    'BSD',
    'WTF',
    'Public Domain',
    'MPL',
    'Unlicense',
    'Apache-2.0',
    'CC-BY-3.0',
    'WTFPL',
    'LGPL',
    'AFL',
    'CDDL',
    'MIT AND CC-BY-3.0',
    'BSD-3-Clause',
    'BSD-2-Clause'
  ],
  strictMode: true,
  ignoreDevDependencies: true
}
