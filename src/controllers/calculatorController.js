const {
  fromRomanToNormal,
  fromNormalToRoman
} = require('../roman-converter/roman');

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
    numbersSum: `${sumString} = ${romanSum}`,
    numbersSubtraction: `${subString} = ${romanSub}`,
  });
};

module.exports = {
  calculateRomanController,
};