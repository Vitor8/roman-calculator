const fromRomanToNormal = (romanNumber) => {
  const dictRoman = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

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

  const dictRoman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let romanNumber = '';

  for (const romanKey in dictRoman) {
    while (normalNumber >= dictRoman[romanKey]) {
      romanNumber += romanKey;
      normalNumber -= dictRoman[romanKey];
    }
  }

  if (isNormalNumberNegative) return `-${romanNumber}`;

  return romanNumber;
};

const getRomanSum = (integerArray, romanArray) => {
  let sum = integerArray[0];
  let sumString = `${romanArray[0]}`;

  for (let i = 1; i < romanArray.length; i += 1) {
    sum += integerArray[i];
    sumString += ` + ${romanArray[i]}`;
  }

  const romanSum = fromNormalToRoman(sum);

  return { romanSum, sumString };
};

const getRomanSub = (integerArray, romanArray) => {
  let sub = integerArray[0];
  let subString = `${romanArray[0]}`;

  for (let i = 1; i < romanArray.length; i += 1) {
    sub -= integerArray[i];
    subString += ` - ${romanArray[i]}`;
  }

  const romanSub = fromNormalToRoman(sub);

  return { romanSub, subString };
};

const subArray = (romanArray) => {
  const integerArray = [];

  for (let i = 0; i < romanArray.length; i += 1) {
    const integerValue = fromRomanToNormal(romanArray[i]);
    integerArray.push(integerValue);
  }

  const { romanSub, subString } = getRomanSub(integerArray, romanArray);

  return { romanSub, subString };
};

const sumArray = (romanArray) => {
  const integerArray = [];

  for (let i = 0; i < romanArray.length; i += 1) {
    const integerValue = fromRomanToNormal(romanArray[i]);
    integerArray.push(integerValue);
  }

  const { romanSum, sumString } = getRomanSum(integerArray, romanArray);

  return { romanSum, sumString };
};

const calculateRomanController = async (req, res) => {
  const { numbersToSum, numbersToSub } = req.body;
  
  const { romanSum, sumString } = sumArray(numbersToSum);
  const { romanSub, subString } = subArray(numbersToSub);

  return res.status(200).json({
    'Numbers Sum': `${sumString} = ${romanSum}`,
    'Numbers Subtraction': `${subString} = ${romanSub}`,
  });
};

module.exports = {
  calculateRomanController,
};