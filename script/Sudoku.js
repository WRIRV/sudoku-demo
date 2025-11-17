class NumberElement{
    #value;

    constructor(value){
        this.#value = value;
        this.isVisible = true;
    }

    createElement(){
        const p = document.createElement('p');
        p.classList.add('number-element');
        if(this.isVisible) p.textContent = this.#value;
        return p;
    }
}

class NumberArea{
    static square = 9;
    static numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //for(let i = 1; i <= square; i++) return i
    static side = Math.sqrt(NumberArea.square);

    constructor(){
        this.elements = [];
        for(let i = NumberArea.numbers[0]; i <= NumberArea.numbers[NumberArea.numbers.length-1]; i++){
            let number = this.#randomNumber();
            if(this.elements.includes(number)){ //проверка и обработка того, что одинаковых чисел нет
                while(this.elements.includes(number)){
                    number = this.#randomNumber();
                }
            }
            this.elements.push(number);
        }
    }

    #randomNumber(){return NumberArea.numbers[Math.floor(Math.random() * NumberArea.numbers.length)]};

    createElement(){
        const div = document.createElement('div');
        div.classList.add('number-area');
        for(let number of this.elements){
            const numberElement = new NumberElement(number);
            div.append(numberElement.createElement());
        }
        return div;
    }

    getRows(){
        const rows = [];
        let row = [];
        let i = 0;
        for(let number of this.elements){
            row.push(number);
            i++;
            if(i == NumberArea.side){
                rows.push(row);
                row = [];
                i = 0;
            }
        }
        return rows;
    }

    getColumns(){
        const columns = [];
        let column = [];
        for(let i = 0; i < NumberArea.side; i++){
            for(let j = 0; j < this.elements.length; j+=NumberArea.side){
                column.push(this.elements[j + i]);
            }
            columns.push(column);
            column = [];
        }
        return columns;
    }
}

class SudokuLevel{
    static square = 9;
    static side = Math.sqrt(NumberArea.square);

    constructor(){
        this.rows = this.#initSides();
        this.columns = this.#initSides();
        this.areas = [];

        let rowOffset = 0;
        for(let i = 0; i < SudokuLevel.side; i++){ //итерация по строкам
            let columnOffset = 0;

            for(let j = 0; j < SudokuLevel.side; j++){ //итерация по колонкам
                let area = new NumberArea();

                for(let k = 0; k < NumberArea.side; k++){
                    //----------------------------------------------------
                    let isRepeated = false;
                    for(let l = 0; l < NumberArea.side; l++){
                        for(let elRow of area.getRows()[l]){
                            if(this.rows[l+rowOffset].includes(elRow)) isRepeated = true;
                        }
                        for(let elColumn of area.getColumns()[l]){
                            if(this.columns[l+columnOffset].includes(elColumn)) isRepeated = true;
                        }
                    }
                    if(isRepeated){
                        area = new NumberArea();
                        k = -1;

                        for(let resetK = 0; resetK <= k; resetK++) {
                            this.rows[resetK + rowOffset] = []; // очищаем
                            this.columns[resetK + columnOffset] = [];
                        }

                        continue;
                    }
                    //------------------------------------------------------

                    //заполнение строк уровня
                    this.rows[k+rowOffset] = this.rows[k+rowOffset].concat(area.getRows()[k]);

                    //заполнение колонок уровня
                    this.columns[k+columnOffset] = this.columns[k+columnOffset].concat(area.getColumns()[k]);
                }

                this.areas.push(area);
                columnOffset += SudokuLevel.side;
            }
            
            rowOffset += SudokuLevel.side;
        }
    }
    
    #initSides(){
        const sides = [];
        for(let i = 0; i < SudokuLevel.square; i++){
            sides.push([]);
        }
        return sides;
    }
    
    createArea(){
        const div = document.createElement('div');
        div.classList.add('sudoku-area');
        
        for(let area of this.areas){
            const el = area.createElement();
            div.append(el);
        }
        return div;
    }
}