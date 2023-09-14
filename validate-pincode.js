

const validatePinCode = (_pinCode) => {
    
  const pinCode = "" + _pinCode;

  if (isNaN(_pinCode)) {
    return false;
  }

  if (pinCode.length < 6) {
    return false;
  }

  let isValidPinCode = true;
  let countRepeatNumber = 0;

  for (let i = 0; i < pinCode.length; i++) {
    if (
      i + 2 < pinCode.length &&
      Number(pinCode.charAt(i)) == Number(pinCode.charAt(i + 1)) &&
      Number(pinCode.charAt(i)) == Number(pinCode.charAt(i + 2))
    ) {
      isValidPinCode = false;
      break;
    }

    if (
      i + 2 < pinCode.length &&
      ((Number(pinCode.charAt(i)) + 1 == Number(pinCode.charAt(i + 1)) &&
        Number(pinCode.charAt(i)) + 2 == Number(pinCode.charAt(i + 2))) ||
        (Number(pinCode.charAt(i)) - 1 == Number(pinCode.charAt(i + 1)) &&
          Number(pinCode.charAt(i)) - 2 == Number(pinCode.charAt(i + 2))))
    ) {
      isValidPinCode = false;
      break;
    }

    if (i + 1 < pinCode.length && pinCode.charAt(i) == pinCode.charAt(i + 1)) {
      countRepeatNumber = countRepeatNumber + 1;
      if (countRepeatNumber > 2) {
        isValidPinCode = false;
        break;
      }
    }
  }

  return isValidPinCode;
};

(() => {
  const testData = [
    "String",
    17283,
    "172839",
    111822,
    112762,
    123743,
    321895,
    124578,
    112233,
    882211,
    887712,
  ];
  testData.map((number) => {
    console.log(number + " ", validatePinCode(number) ? "Right" : "Wrong");
  });
})();
