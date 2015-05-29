var _ = require('lodash');

exports.removeStopwords = function(text, options) {
  var defaults = {
    'stopwords': require('./stopwords_en.js').words,
    'inputSeparator': /[\\., ]+/,
    'outputSeparator': ' '
  }
  options = _.defaults(options || {}, defaults);
  var tokens = text.split(options.inputSeparator);
  tokens = _.compact(tokens.map(function(value) {
    if (options.stopwords.indexOf(value.toLowerCase()) != -1) return '';
    return value.toLowerCase();
  }));
  return tokens.join(options.outputSeparator);
}

exports.getStopwords = function(languageCode) {
  try {
    return require('./stopwords_' + languageCode + '.js').words;
  }
  catch(e) {
    throw new Error('no list for ' + languageCode +
                    ' getStopwords has lists for en, es, fa, fr, it, ja, nl, no, pl, pt, ru, zh');
  }
}