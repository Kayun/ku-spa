const src = 'src';
const dist = 'public';
const assets = 'assets';
const styles = 'styles';
const templates = 'templates';

const path = {
  src: `./${src}/`,
  dist: `./${dist}/`,
  assets: `./${dist}/${assets}/`,
  styles: `./${src}/${styles}/`,
  templates: `./${src}/${templates}/`
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
