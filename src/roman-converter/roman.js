const {
  dictRoman,
  dictRomanExtended
} = require('./dictionary');

const fromRomanToNormal = (romanNumber) => {

  let normalNumber = 0;
  let prevNumber = 0;

  for (let i = 0; i < romanNumber.length; i += 1) {
    const currentRomanNumber = dictRoman[romanNumber[i]];
    if (currentRomanNumber > prevNumber) {
      normalNumber += currentRomanNumber - (2 * prevNumber);
    } else {
      normalNumber += currentRomanNumber;
    }
    prevNumber = currentRomanNumber;
  }

  return normalNumber;
};

const fromNormalToRoman = (normalNumber) => {
  let isNormalNumberNegative = false;

  if (normalNumber < 0) { 
    isNormalNumberNegative = true;
    normalNumber *= -1;
  }

  let romanNumber = '';

  for (const romanKey in dictRomanExtended) {
    while (normalNumber >= dictRomanExtended[romanKey]) {
      romanNumber += romanKey;
      normalNumber -= dictRomanExtended[romanKey];
    }
  }

  if (isNormalNumberNegative) return `-${romanNumber}`;

  return romanNumber;
};

module.exports = { fromRomanToNormal, fromNormalToRoman }