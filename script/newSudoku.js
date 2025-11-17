class Sudoku{
    constructor(areaSide){
        this.area = areaSide;
        this.size = Math.pow(areaSide, 2);
        this.grid = this.#initGrid();
    }

    #initGrid(){
        return Array(this.size).fill().map(() => Array(this.size).fill(0));
    }

    #getRow(rowIndex){
        return this.grid[rowIndex];
    }

    #getCol(colIndex){
        return this.grid.map(row => row[colIndex]);
    }

    #getBox(row, col){
        const startRow = Math.floor(row / this.area) * this.area;
        const startCol = Math.floor(col / this.area) * this.area;

        const box = [];
        for(let rw = 0; rw < this.area; rw++){
            for(let cl = 0; cl < this.area; cl++){
                box.push(this.grid[startRow + rw][startCol + cl]);
            }
        }
        return box;
    }

    #isValid(row, col, num){
        if(this.#getRow(row).includes(num)) return false;
        if(this.#getCol(col).includes(num)) return false;
        if(this.#getBox(row, col).includes(num)) return false;
        return true;
    }

    generateGrid(cell = 0){
        if(cell === this.size * this.size) return true;

        const row = Math.floor(cell / this.size);
        const col = cell % this.size;

        if(this.grid[row][col] !== 0) return this.generateGrid(cell + 1);

        const numbers = Array.from({length: this.size}).map((_, i) => i+1).sort(() => Math.random() - 0.5);
        for(let num of numbers){
            if(this.#isValid(row, col, num)){
                this.grid[row][col] = num;

                if(this.generateGrid(cell + 1)) return true;

                this.grid[row][col] = 0;
            }
            
        }

        return false;
    }

    createGraphicGrid(){
        const table = document.createElement('table');
        table.classList.add('sudoku-level');

        for(let row of this.grid){
            const tr = document.createElement('tr');

            for(let num of row){
                const td = document.createElement('td');
                const p = document.createElement('p');
                p.classList.add('number-element');
                //нищинский код ниже
                if(Math.random() <= 0.7){
                    p.textContent = num;
                }
                else{
                    p.textContent = ' ';
                }
                td.append(p);
                tr.append(td);
            }

            table.append(tr);
        }

        return table;
    }
}