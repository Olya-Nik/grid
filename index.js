const input = document.getElementById("number");
let number = "";
input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        resize(number);
    } else if (e.code.includes("Digit")) {
        number += e.key;
    } else {
        input.value = "";
        alert("Enter digits");
    }

})
window.addEventListener("resize", () => {
    resize(number);
});

function resize(number) {
    let pageWidth = document.documentElement.clientWidth - document.documentElement.clientWidth * 0.05;
    let pageHeight = document.documentElement.clientHeight - document.documentElement.clientHeight * 0.05;
    const rowsInSingleCol = Math.floor(pageHeight * 4 / 3 / pageWidth) || 1;
    const gridDimensions = createGrid(rowsInSingleCol);
    const { itemWidth, itemHeight, rows, columns, lastColumnItems } = gridDimensions;
    const singleColumnItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-bottom: 0px;"></div>`;
    const singleColumnBottomItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;"></div>`;
    const item = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-right: 0px;border-bottom: 0px;"></div>`;
    const bottomItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-right: 0px;"></div>`;
    const secondLastColumnItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-bottom: 0px;"></div>`;
    const secondLastColumnBottomItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;"></div>`;
    const lastColumnItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-left: 0px;border-bottom: 0px;"></div>`;
    const lastColumnBottomItem = `<div style="width: ${itemWidth}px;height: ${itemHeight}px;border: 1px;border-color: black; border-style: solid;border-left: 0px;"></div>`;
    const column = new Array(rows - 1).fill(item);
    column.push(bottomItem);
    const secondLastColumn = new Array(rows - 1).fill(secondLastColumnItem);
    secondLastColumn.push(secondLastColumnBottomItem);
    const lastColumn = new Array(rows).fill(lastColumnItem, 0, lastColumnItems - 1);
    lastColumn.push(lastColumnBottomItem);
    const singleColumn = new Array(rows - 1).fill(singleColumnItem);
    singleColumn.push(singleColumnBottomItem)
    const grid = new Array(columns).fill(`<div style="float: left;">${column.join("\n")}</div>`);
    if (columns == 1) {
        grid[columns - 1] = `<div style="float: left;">${singleColumn.join("\n")}</div>`;
    } else {
        grid[columns - 2] = `<div style="float: left;">${secondLastColumn.join("\n")}</div>`;
        grid[columns - 1] = `<div style="float: left;">${lastColumn.join("\n")}</div>`;
    }

    document.body.innerHTML = grid.join("\n");

    function createGrid(rows, columnsIncreased) {
        let itemHeight, itemWidth, columns, lastColumnItems;
        if (!columnsIncreased) {
            itemHeight = pageHeight / rows;
            itemWidth = itemHeight / 3 * 4;
            if (itemWidth > pageWidth) {
                itemWidth = pageWidth;
                itemHeight = itemWidth / 4 * 3;
            }
            columns = Math.floor(pageWidth / itemWidth);
            if (columns > number) {
                columns = number;
            }
        } else {
            columns = columnsIncreased;
            itemWidth = pageWidth / columns;
            itemHeight = itemWidth / 4 * 3;
            rows = Math.floor(pageHeight / itemHeight);
        }
        if (columns * rows >= number) {
            lastColumnItems = rows - (columns * rows - number);
            return { rows, columns, itemHeight: itemHeight.toFixed(2), itemWidth: itemWidth.toFixed(2), lastColumnItems };
        } else {
            if (pageWidth / columns !== itemWidth) {
                return createGrid(rows, columns + 1);
            }
            return createGrid(rows + 1);
        }
    }
}
