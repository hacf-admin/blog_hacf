const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./hugo_stats.json'],
    whitelist: [
        'img'
    ],
    defaultExtractor: content => {
      const els = JSON.parse(content).htmlElements;
      return [
        ...(els.tags || []),
        ...(els.classes || []),
        ...(els.ids || []),
      ];
    },
    safelist: []
  });
  
  module.exports = {
    plugins: [
      ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
    ]
  };
  
  



/*
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [ './hugo_stats.json' ],
    defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
    }
});

module.exports = {
    plugins: [
        require('autoprefixer'),
        purgecss
    ]
};
*/