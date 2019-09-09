// Lab2
// Author - Datsyshyn Roman

document.getElementById("in").oninput = function() {
  let text = this.value;
  text = text.toUpperCase();

  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  ///// START "ONE SYMBOL" /////

  var data = new Array();
  // Filling array symbols
  for (let i = 0; i < alphabet.length; i++) {
    data.push({ symbol: alphabet.charAt(i), amount: 0 });
  }

  // Amount symbols
  for (i = 0; i < alphabet.length; i++) {
    for (j = 0; j < text.length; j++) {
      if (text.charAt(j) == alphabet.charAt(i)) {
        data[i].amount++;
      }
    }
  }
  console.log("Amount symbols:");
  console.log(data);

  // Copying array
  let array = new Array();
  for (i = 0; i < data.length; i++) {
    array[i] = { symbol: data[i].symbol, amount: data[i].amount };
  }

  // Bubble sort of new aray
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].amount < array[j].amount) {
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
      }
    }
  }
  console.log("Sorting array");
  console.log(array);

  ///// END "ONE SYMBOL" /////

  ///// START CAESAR /////
  let shift;

  function CaesarDecryption(encryptedString, unshiftAmount) {
    var plainText = "";
    for (var i = 0; i < encryptedString.length; i++) {
      var encryptedCharacter = encryptedString.charCodeAt(i);
      if (encryptedCharacter >= 97 && encryptedCharacter <= 122) {
        plainText += String.fromCharCode(
          ((encryptedCharacter - 97 - unshiftAmount + 26) % 26) + 97
        );
      } else if (encryptedCharacter >= 65 && encryptedCharacter <= 90) {
        plainText += String.fromCharCode(
          ((encryptedCharacter - 65 - unshiftAmount + 26) % 26) + 65
        );
      } else if (encryptedCharacter == 46) {
        plainText += String.fromCharCode(46);
      } else if (encryptedCharacter == 44) {
        plainText += String.fromCharCode(44);
      } else {
        plainText += " ";
      }
    }
    return plainText;
  }

  for (let i = 0; i < 27; i++) {
    let txt = CaesarDecryption(text, i);
    if (txt.indexOf("THE") > 0) shift = i;
  }

  //////

  function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
  }

  let newAlphabet = alphabet;
  let difference = alphabet.length - shift;

  for (let i = 0, j = difference; j < alphabet.length; i++, j++) {
    newAlphabet = setCharAt(newAlphabet, i, alphabet.charAt(j));
  }

  for (let i = 0, j = shift; j < alphabet.length; i++, j++) {
    newAlphabet = setCharAt(newAlphabet, j, alphabet.charAt(i));
  }

  console.log(newAlphabet);

  //////

  let dText = CaesarDecryption(text, shift);

  let out = document.getElementById("out");
  out.innerHTML = newAlphabet + "<br>" + alphabet + "<hr/>" + dText;

  ///// END CAESAR /////

  ///// START BIGRAM /////
  let bigramArray = new Array();
  let textArray = new Array();
  let bigramAmountArray = new Array();

  // Filling array bigram's
  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      let bigram = alphabet[i] + alphabet[j];
      bigramArray.push({ Symbol: bigram, Amount: 0 });
    }
  }

  // Filling array 2 chars form text
  for (let i = 0; i < dText.length; i++) {
    let textSymbol = dText[i] + dText[i + 1];
    textArray.push({ Symbol: textSymbol });
  }

  // Amount of symbol's repeats
  for (let i = 0; i < bigramArray.length; i++) {
    let num = 0;
    for (let j = 0; j < textArray.length; j++)
      if (bigramArray[i].Symbol == textArray[j].Symbol) num++;
    if (num > 9 && num < 16)
      bigramAmountArray.push({ Symbol: bigramArray[i].Symbol, Amount: num });
  }
  console.log("Bigrams in the text:");
  console.log(bigramAmountArray);

  ///// END BIGRAM /////

  ///// START TRIGRAM /////
  let trigramArray = new Array();
  let textArrayForTrigram = new Array();
  let trigramAmountArray = new Array();

  // Filling array trigram's
  for (let i = 0; i < alphabet.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      for (let k = 0; k < alphabet.length; k++) {
        let trigram = alphabet[i] + alphabet[j] + alphabet[k];
        trigramArray.push({ Symbol: trigram, Amount: 0 });
      }
    }
  }

  // Filling array 3 chars form text
  for (let i = 0; i < dText.length; i++) {
    let textSymbol = dText[i] + dText[i + 1] + dText[i + 2];
    textArrayForTrigram.push({ Symbol: textSymbol });
  }

  // Amount of symbol's repeats
  for (let i = 0; i < trigramArray.length; i++) {
    let num = 0;
    for (let j = 0; j < textArrayForTrigram.length; j++)
      if (trigramArray[i].Symbol == textArrayForTrigram[j].Symbol) num++;
    if (num > 9 && num < 16)
      trigramAmountArray.push({ Symbol: trigramArray[i].Symbol, Amount: num });
  }
  console.log("Trigrams in the text:");
  console.log(trigramAmountArray);

  ///// END TRIGRAM /////

  ///// START "2 REPEAT SYMBOLS" /////
  let twoRepeatCharsArray = new Array();
  let textArrayForTwoRepeat = new Array();
  let twoRepeatsAmountArray = new Array();

  // Filling array with 2 repeats
  for (let i = 0; i < alphabet.length; i++) {
    let twoRepeat = alphabet[i] + alphabet[i];
    twoRepeatCharsArray.push({ Symbol: twoRepeat, Amount: 0 });
  }

  // Filling array 2 chars form text
  for (let i = 0; i < dText.length; i++) {
    let textSymbol = dText[i] + dText[i + 1];
    textArrayForTwoRepeat.push({ Symbol: textSymbol });
  }

  // Amount of 2 chars repeats
  for (let i = 0; i < twoRepeatCharsArray.length; i++) {
    let num = 0;
    for (let j = 0; j < textArrayForTwoRepeat.length; j++)
      if (twoRepeatCharsArray[i].Symbol == textArrayForTwoRepeat[j].Symbol)
        num++;
    if (num > 1) {
      twoRepeatsAmountArray.push({
        Symbol: twoRepeatCharsArray[i].Symbol,
        Amount: num
      });
    }
  }
  console.log("2 characters are repeated:");
  console.log(twoRepeatsAmountArray);

  ///// END "2 REPEAT CHARACTERS" /////

  ///// START "3 REPEAT CHARACTERS" /////
  let threeRepeatCharsArray = new Array();
  let textArrayForThreeRepeat = new Array();
  let threeRepeatsAmountArray = new Array();

  // Filling array with 3 repeats
  for (let i = 0; i < alphabet.length; i++) {
    let threeRepeat = alphabet[i] + alphabet[i] + alphabet[i];
    threeRepeatCharsArray.push({ Symbol: threeRepeat, Amount: 0 });
  }

  // Filling array 3 chars form text
  for (let i = 0; i < dText.length; i++) {
    let textSymbol = dText[i] + dText[i + 1] + dText[i + 2];
    textArrayForThreeRepeat.push({ Symbol: textSymbol });
  }

  // Amount of 3 chars repeats
  for (let i = 0; i < threeRepeatCharsArray.length; i++) {
    let num = 0;
    for (let j = 0; j < textArrayForThreeRepeat.length; j++)
      if (threeRepeatCharsArray[i].Symbol == textArrayForThreeRepeat[j].Symbol)
        num++;
    if (num > 0) {
      threeRepeatsAmountArray.push({
        Symbol: threeRepeatCharsArray[i].Symbol,
        Amount: num
      });
    }
  }
  console.log("3 characters are repeated:");
  console.log(threeRepeatsAmountArray);

  ///// END "3 REPEAT CHARACTERS" /////

  ///// START "4 REPEAT CHARACTERS" /////
  let fourRepeatCharsArray = new Array();
  let textArrayForFourRepeat = new Array();
  let fourRepeatsAmountArray = new Array();

  // Filling array with 4 repeats
  for (let i = 0; i < alphabet.length; i++) {
    let fourRepeat = alphabet[i] + alphabet[i] + alphabet[i] + alphabet[i];
    fourRepeatCharsArray.push({ Symbol: fourRepeat, Amount: 0 });
  }

  // Filling array 4 chars form text
  for (let i = 0; i < dText.length; i++) {
    let textSymbol = dText[i] + dText[i + 1] + dText[i + 2] + dText[i + 3];
    textArrayForFourRepeat.push({ Symbol: textSymbol });
  }

  // Amount of 4 chars repeats
  for (let i = 0; i < fourRepeatCharsArray.length; i++) {
    let num = 0;
    for (let j = 0; j < textArrayForFourRepeat.length; j++)
      if (fourRepeatCharsArray[i].Symbol == textArrayForFourRepeat[j].Symbol)
        num++;
    if (num > 0) {
      fourRepeatsAmountArray.push({
        Symbol: fourRepeatCharsArray[i].Symbol,
        Amount: num
      });
    }
  }
  console.log("4 characters are repeated:");
  console.log(fourRepeatsAmountArray);

  ///// END "4 REPEAT CHARACTERS" /////

  ///// START HISTOGRAM 1 /////
  let arrChars = new Array();
  let amountArrChars = new Array();

  for (let i = 0; i < alphabet.length; i++) arrChars[i] = alphabet[i];
  for (let i = 0; i < alphabet.length; i++) amountArrChars[i] = data[i].amount;

  ZC.LICENSE = [
    "569d52cefae586f634c54f86dc99e6a9",
    "b55b025e438fa8a98e32482b5f768ff5"
  ];
  var myConfig = {
    type: "bar",
    plotarea: {
      adjustLayout: true
    },
    scaleX: {
      label: {
        text: "Гістограма повторів одного символа в тексті"
      },
      labels: arrChars, // Array
      "items-overlap": true,
      "max-items": 100
    },
    plot: {
      animation: {
        effect: "ANIMATION_EXPAND_BOTTOM",
        method: "ANIMATION_STRONG_EASE_OUT",
        sequence: "ANIMATION_BY_NODE",
        speed: 275
      }
    },
    series: [
      {
        values: amountArrChars // Array
      }
    ]
  };

  zingchart.render({
    id: "histogram",
    data: myConfig,
    height: "100%",
    width: "100%"
  });

  ///// END HISTOGRAM 1 /////

  ///// START HISTOGRAM 2 /////
  let arrChars2 = new Array();
  let amountArrChars2 = new Array();

  for (let i = 0; i < alphabet.length; i++) arrChars[i] = array[i].symbol;
  for (let i = 0; i < alphabet.length; i++) amountArrChars[i] = array[i].amount;

  ZC.LICENSE = [
    "569d52cefae586f634c54f86dc99e6a9",
    "b55b025e438fa8a98e32482b5f768ff5"
  ];
  var myConfig2 = {
    type: "bar",
    plotarea: {
      adjustLayout: true
    },
    scaleX: {
      label: {
        text: "Гістограма повторів одного символа в тексті з впорядкуванням"
      },
      labels: arrChars, // Array
      "items-overlap": true,
      "max-items": 100
    },
    plot: {
      animation: {
        effect: "ANIMATION_EXPAND_BOTTOM",
        method: "ANIMATION_STRONG_EASE_OUT",
        sequence: "ANIMATION_BY_NODE",
        speed: 275
      }
    },
    series: [
      {
        values: amountArrChars // Array
      }
    ]
  };

  zingchart.render({
    id: "histogram2",
    data: myConfig2,
    height: "100%",
    width: "100%"
  });
  ///// END HISTOGRAM 2 /////

  ///// START HISTOGRAM 3 /////
  let arrChars3 = new Array();
  let amountArrChars3 = new Array();

  for (let i = 0; i < bigramAmountArray.length; i++)
    arrChars3[i] = bigramAmountArray[i].Symbol;
  for (let i = 0; i < bigramAmountArray.length; i++)
    amountArrChars3[i] = bigramAmountArray[i].Amount;

  ZC.LICENSE = [
    "569d52cefae586f634c54f86dc99e6a9",
    "b55b025e438fa8a98e32482b5f768ff5"
  ];
  var myConfig3 = {
    type: "bar",
    plotarea: {
      adjustLayout: true
    },
    scaleX: {
      label: {
        text: "Гістограма біграмів"
      },
      labels: arrChars3, // Array
      "items-overlap": true,
      "max-items": 100
    },
    plot: {
      animation: {
        effect: "ANIMATION_EXPAND_BOTTOM",
        method: "ANIMATION_STRONG_EASE_OUT",
        sequence: "ANIMATION_BY_NODE",
        speed: 275
      }
    },
    series: [
      {
        values: amountArrChars3 // Array
      }
    ]
  };

  zingchart.render({
    id: "histogram3",
    data: myConfig3,
    height: "100%",
    width: "100%"
  });
  ///// END HISTOGRAM 3 /////

  ///// START HISTOGRAM 4 /////
  let arrChars4 = new Array();
  let amountArrChars4 = new Array();

  for (let i = 0; i < trigramAmountArray.length; i++)
    arrChars4[i] = trigramAmountArray[i].Symbol;
  for (let i = 0; i < trigramAmountArray.length; i++)
    amountArrChars4[i] = trigramAmountArray[i].Amount;

  ZC.LICENSE = [
    "569d52cefae586f634c54f86dc99e6a9",
    "b55b025e438fa8a98e32482b5f768ff5"
  ];
  var myConfig4 = {
    type: "bar",
    plotarea: {
      adjustLayout: true
    },
    scaleX: {
      label: {
        text: "Гістограма триграмів"
      },
      labels: arrChars4, // Array
      "items-overlap": true,
      "max-items": 100
    },
    plot: {
      animation: {
        effect: "ANIMATION_EXPAND_BOTTOM",
        method: "ANIMATION_STRONG_EASE_OUT",
        sequence: "ANIMATION_BY_NODE",
        speed: 275
      }
    },
    series: [
      {
        values: amountArrChars4 // Array
      }
    ]
  };

  zingchart.render({
    id: "histogram4",
    data: myConfig4,
    height: "100%",
    width: "100%"
  });
  ///// END HISTOGRAM 4 /////
};
