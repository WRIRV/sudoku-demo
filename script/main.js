let a = new Sudoku(3);
a.generateGrid();
let table = a.createGraphicGrid();
document.body.append(table);

console.log('Ниже правильные ответы для самопроверки v-v')
console.log(a.grid);

//демо-версия (нищинский код)
const btn = document.querySelector('.try-hard');
btn.addEventListener('click', () => {
    a = new Sudoku(4);
    a.generateGrid();
    table.remove();
    table = a.createGraphicGrid();
    document.body.append(table);

    console.log('Ниже правильные ответы для самопроверки v-v')
    console.log(a.grid);
});