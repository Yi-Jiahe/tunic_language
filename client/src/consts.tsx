const X = Math.sqrt(2);
const Y = 1;
const marginTop = 0.1;
const marginLeft = 0.1;
const Points = [
    // Top Diamond
    [2 * X, marginTop + 0.5 * Y],
    [X, marginTop],
    [0, marginTop + 0.5 * Y],
    [X, marginTop + Y],
    // Bottom Diamond
    [2 * X, marginTop + 2.5 * Y],
    [X, marginTop + 2 * Y],
    [0, marginTop + 2.5 * Y],
    [X, marginTop + 3 * Y],
    // Middle Line
    [2 * X, marginTop + 1.5 * Y],
    [X, marginTop + 1.5 * Y],
    [0, marginTop + 1.5 * Y],
    // Points for segment 3
    [marginLeft, marginTop + 0.5 * Y],
    [marginLeft, marginTop + 1.5 * Y],
    [marginLeft, marginTop + 2 * Y],
    [marginLeft, marginTop + 2.5 * Y],
]

export { X, Y, marginTop, marginLeft, Points };