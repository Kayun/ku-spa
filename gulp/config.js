const src = 'src';
const dist = 'public_html';
const assets = 'assets';
const styles = 'styles';
const scripts = 'scripts';
const templates = 'templates';
const images = 'templates';

const path = {
  src: `./${src}/`,
  dist: `./${dist}/`,
  assets: `./${dist}/${assets}/`,
  styles: `./${src}/${styles}/`,
  scripts: `./${src}/${scripts}/`,
  templates: `./${src}/${templates}/`,
  images: `./${src}/${images}/`
};

module.exports = {
  path,

  styles: {
    entry: [
      'common.sass'
    ],
    srcDir: path.styles,
    distDir: path.assets + styles,
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    },
    ext: '.min.css'
  },

  templates: {
    srcDir: path.templates,
    distDir: path.dist,
    prettify: {
      braceStyle: 'expand',
      indentWithTabs: true,
      indentInnerHtml: true,
      preserveNewlines: true,
      endWithNewline: true,
      wrapLineLength: 120,
      maxPreserveNewlines: 50,
      wrapAttributesIndentSize: 1,
      unformatted: ['use']
    }
  }
};
