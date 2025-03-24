// 스프레드 시트를 직접 셀을 구현하기 위한 상수 및 변수 선언
const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector('#export-btn');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [  
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

// 각 셀이 데이터를 가지고 있기 때문에 이를 위한 클래스
class Cell {
    constructor(isHeader, disabled, data, row, column, rowName, columnName, active = false) {
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.column = column;
        this.rowName = rowName;
        this.columnName = columnName;
        this.active = active;
    }
}

exportBtn.onclick = function (e) {
    // export하기 위해서 cell 데이터답게 spreadsheet 데이터 재가공
    let csv = "";
    for (let i = 0; i < spreadsheet.length; i++) {
        // header를 인식하고 줄바꿈을 하기에 이를 방지하기 위해서
        if (i === 0) continue;
        csv += spreadsheet[i]
                .filter(item => !item.isHeader)
                .map(item => item.data)
                .join(',') + "\r\n";
    }

    // csv 파일로 다운로드하는 로직
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);

    const a = document.createElement("a");
    a.href = csvUrl;
    a.download = 'spreadsheet name.csv';
    a.click();
}

initSpreadsheet();

function initSpreadsheet() {
    for (let i = 0; i < ROWS; i++) {
        let spreadsheetRow = [];
        for (let j = 0; j < COLS; j++) {
            // 스프레드 시트의 ROW의 숫자를 초기화
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            // 모든 row 첫 번째 컬럼에 숫자 넣기
            if (j === 0) {
                cellData = i;
                isHeader = true; // 첫번째 row는 header
                disabled = true; // 마찬가지로 disable도
            }

            // 첫 번째 column은 header, disable도 마찬가지로
            if (i == 0) {
                isHeader = true;
                disabled = true;
                cellData = alphabets[j - 1];
            }

            // 첫 번째 row의 컬럼은 ""
            // cellData가 undefined면 ""로 만듬
            if (!cellData) {
                cellData = "";
            }

            const rowName = i;
            const columnName = alphabets[j - 1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, columnName, false);
            spreadsheetRow.push(cell);
        }
        spreadsheet.push(spreadsheetRow);
    }
    drawSheet();
}

// input 태그로 cell 요소를 만드는 함수
function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.className = 'cell';
    cellEl.id = 'cell_' + cell.row + cell.column;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled;

    if (cell.isHeader) {
        cellEl.classList.add("header");
    }

    cellEl.onclick = () => handleCellClick(cell);

    // cell 값이 data에 들어가도록 처리
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

    return cellEl;
}

function handleOnChange(data, cell) {
    cell.data = data;
}

// 셀 클릭시 이벤트가 발생해서 데이터를 처리하는 함수
function handleCellClick(cell) {
    // 클릭시 이전의 하이라이트 삭제
    clearHeaderActiveStates();
    const columnHeader = spreadsheet[0][cell.column];
    const rowHeader = spreadsheet[cell.row][0];
    const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
    columnHeaderEl.classList.add("active");
    rowHeaderEl.classList.add("active");
    document.querySelector("#cell-status").innerHTML = cell.columnName + cell.rowName;
}

// 이전의 하이라이트를 지우는 함수
function clearHeaderActiveStates() {
    const headers = document.querySelectorAll('.header');

    headers.forEach((header) => {
        header.classList.remove('active');
    })
}

// id를 cell명을 넣었기에 그에 맞는 element를 불러오는 함수
function getElFromRowCol(row, col) {
    return document.querySelector("#cell_" + row + col);
}

// 스프레드 시트를 그리는 함수
function drawSheet() {
    for (let i = 0; i < spreadsheet.length; i++) {
        const rowContainerEl = document.createElement('div');
        rowContainerEl.className = "cell-row";

        for (let j = 0; j < spreadsheet[i].length; j++) {
            const cell = spreadsheet[i][j];
            rowContainerEl.append(createCellEl(cell))
        }
        spreadSheetContainer.append(rowContainerEl);
    }
}