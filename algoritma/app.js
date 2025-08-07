// Soal 1: Reverse Alphabet with Number:
function reverseAlphabetWithNumber(str) {
  const letters = str.match(/[A-Za-z]+/)[0];
  const numbers = str.match(/\d+/) ? str.match(/\d+/)[0] : "";

  const reversedLetters = letters.split("").reverse().join("");
  return reversedLetters + numbers;
}
const input1 = "NEGIE1";
const eigenResult = reverseAlphabetWithNumber(input1);
console.log(eigenResult);

// Soal 2: Longest Word in a Sentence:
function longestWord(sentence) {
  if (typeof sentence !== "string") return "Input harus string";

  const result = sentence.split(" ").reduce((acc, word) => {
    return word.length > acc.length ? word : acc;
  });

  return `${result}: ${result.length} character`;
}
const sentence = "Saya sangat senang mengerjakan soal algoritma";
const longestResult = longestWord(sentence);
console.log(longestResult);

// Soal 3: Count Query in Input:
function countQueryInInput(INPUT, QUERY) {
  return QUERY.map((query) => {
    return INPUT.filter((input) => input === query).length;
  });
}
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];
const countResult = countQueryInInput(INPUT, QUERY);
console.log(countResult);

// Soal 4: Diagonal Difference in a Matrix:
function diagonalDifference(matrix) {
  if (!matrix.every((row) => row.length === matrix.length)) {
    throw new Error("Matriks harus persegi (n x n)");
  }

  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;
  const n = matrix.length;

  console.log(n);

  for (let i = 0; i < n; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][n - 1 - i];
  }

  return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const Matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const diagonalDiffResult = diagonalDifference(Matrix);
console.log(diagonalDiffResult);
