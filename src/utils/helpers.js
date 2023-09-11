export function numberToWords(number) {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (number === 0) return "zero";
  if (number < 10) return units[number];
  if (number < 20) return teens[number - 10];

  const digit1 = number % 10;
  const digit2 = Math.floor(number / 10);

  return tens[digit2] + (digit1 !== 0 ? `-${units[digit1]}` : "");
}
