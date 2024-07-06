/*
// 生成一个随机的完整数独矩阵
function fillSudoku(matrix) {
    // 初始化未填充的单元格
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            emptyCells.push([i, j]);
        }
    }

    // 随机填充数独
    while (emptyCells.length > 0) {
        let cellIndex = Math.floor(Math.random() * emptyCells.length);
        let [i, j] = emptyCells[cellIndex];
        let num = getRandomNumber(matrix, i, j);
        if (num === 0) {
            // 若无法找到有效数字，重新填充前一个单元格
            let [prevI, prevJ] = emptyCells.pop();
            matrix[prevI][prevJ] = 0;
        } else {
            matrix[i][j] = num;
            emptyCells.splice(cellIndex, 1);
        }
    }
}

// 获取一个随机且有效的数字填入数独
function getRandomNumber(matrix, row, col) {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(nums); // 随机打乱数组顺序

    for (let num of nums) {
        if (isValid(matrix, row, col, num)) {
            return num;
        }
    }
    return 0; // 若无有效数字则返回0
}

// 验证某个数字在给定位置是否有效
function isValid(matrix, row, col, num) {
    // 检查行和列
    for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === num || matrix[i][col] === num) {
            return false;
        }
    }

    // 检查3x3的小方格
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (matrix[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

// 随机打乱数组顺序的函数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 随机删除数字，直到符合条件
function removeNumbers(matrix) {
    let cells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push([i, j]);
        }
    }

    while (cells.length > 0) {
        let cellIndex = Math.floor(Math.random() * cells.length);
        let [i, j] = cells[cellIndex];
        let temp = matrix[i][j];
        matrix[i][j] = 0;

        // 检查是否唯一解
        let count = 0;
        solveSudoku(matrix, () => {
            count++;
            if (count > 1) {
                matrix[i][j] = temp; // 如果不是唯一解，恢复初始状态
            }
        });

        if (count === 1) {
            cells.splice(cellIndex, 1);
        }
    }
}

// 解数独，用于检查是否唯一解
function solveSudoku(matrix, callback) {
    let emptyCells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                emptyCells.push([i, j]);
            }
        }
    }

    let solutions = [];

    function backtrack(index) {
        if (index === emptyCells.length) {
            solutions.push(matrix.map(row => [...row]));
            return;
        }

        let [i, j] = emptyCells[index];
        for (let num = 1; num <= 9; num++) {
            if (isValid(matrix, i, j, num)) {
                matrix[i][j] = num;
                backtrack(index + 1);
                matrix[i][j] = 0;
            }
        }
    }

    backtrack(0);

    solutions.forEach(solution => {
        if (callback) callback(solution);
    });
}

// 生成数独
//初始化两个空矩阵
let sudoku_recipe = new Array(9);
for (let i = 0; i < 9; i++) {
    sudoku_recipe[i] = new Array(9);
}
let sudoku_player = new Array(9);
for (let i = 0; i < 9; i++) {
    sudoku_player[i] = new Array(9);
}


//进行填充
fillSudoku(sudoku_recipe);
sudoku_player = sudoku_recipe;

//删除数字
removeNumbers(sudoku_player);

*/