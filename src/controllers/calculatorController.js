const arraySum = (numbersToAdd) => {
  let sum = numbersToAdd[0];
  let sumString = `${numbersToAdd[0]}`;

  for (let i = 1; i < numbersToAdd.length; i += 1) {
    sum += numbersToAdd[i];
    sumString += ` + ${numbersToAdd[i]}`;
  }

  return { sum, sumString };
};

const arraySub = (numbersToSub) => {
  let sub = numbersToSub[0];
  let subString = `${numbersToSub[0]}`;
  
  for (let j = 1; j < numbersToSub.length; j += 1) {
    sub -= numbersToSub[j];
    subString += ` - ${numbersToSub[j]}`;
  }

  return { sub, subString };
};

const calculateRomanController = async (req, res) => {
  const { numbersToAdd, numbersToSub } = req.body;
  
  const { sum, sumString } = arraySum(numbersToAdd);
  const { sub, subString } = arraySub(numbersToSub);

  return res.status(200).json({
    'Numbers Sum': `${sumString} = ${sum}`,
    'Numbers Subtraction': `${subString} = ${sub}`,
  });
};

module.exports = {
  calculateRomanController,
};