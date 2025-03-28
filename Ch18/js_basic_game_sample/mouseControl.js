import { setBoxDOM } from "./module/mouseControlModule.js";

setBoxDOM({
    row: 5,
    col: 5,
    start: [0,0],
    end: [4,4],
    walls: [
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [3, 0],
        [3, 1],
        [3, 3],
        [3, 4],
    ]
});