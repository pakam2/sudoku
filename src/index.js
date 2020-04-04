module.exports = function solveSudoku(matrix) {

  const resetValue = function (matrix, row, column) {
    matrix[row][column] = 0;
  };

  const checkRowColumn = function (matrix, row, column, k) {
    for (let i = 0; i < 9; i++) {
      if (matrix[row][i] == k || matrix[i][column] == k) {
        return false;
      }
    }
    return true;
  };

  const checkSubSudokuArr = function (matrix, row, column, value) {
    for (let i = 0; i < 9; i++) {
      const x = Math.floor(i / 3) + 3 * Math.floor(row / 3);
      const y = i % 3 + 3 * Math.floor(column / 3);
      if (matrix[x][y] == value) {
        return false;
      }
    }
    return true;
  };

  const fillSudoku = function (matrix) {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (matrix[row][column] == 0) {
          for (let value = 1; value <= 9; value++) {
            let colRowCheck = checkRowColumn(matrix, row, column, value);
            let subSudokuCheck = checkSubSudokuArr(matrix, row, column, value);

            if (colRowCheck && subSudokuCheck) {
              matrix[row][column] = value;
              if (fillSudoku(matrix)) {
                return true;
              }
              resetValue(matrix, row, column);
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  fillSudoku(matrix);

  return matrix

}