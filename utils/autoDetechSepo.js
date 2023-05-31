const autoDetechSepo = (string = '') => {
    if (string.includes(','))  return ','
    if (string.includes('\t'))  return '\t'
    return ','
};

module.exports = autoDetechSepo;