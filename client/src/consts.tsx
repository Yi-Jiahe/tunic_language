// (0, 0) is the centre of the separator line
const X = Math.sqrt(2);
const Y = 1;
const Points = [
    // Top Diamond (0-3)
    [X, -Y],
    [0, -1.5 * Y],
    [-X, -Y],
    [0, -0.5* Y],
    // Bottom Diamond (4-7)
    [X, 1 * Y],
    [0, 0.5 * Y],
    [-X, 1 * Y],
    [0, 1.5 * Y],
    // Middle Line (8-10)
    [X, 0],
    [0, 0],
    [-X, 0],
    // Points for segment 3 (11)
    [-X, 0.5 * Y],
    // Segment 12 (12)
    [0, 2 * Y]
];

// Keys are sorted to discard order
// Only points 0-7 and 12 are avaliable.
const PointPairsToSegments: {[key: string]: number} = {
    //Vowels
    "0,1": 1,
    "1,2": 2,
    "2,6": 3,
    "6,7": 4,
    "4,7": 5,
    //Consonants
    "0,3": 6,
    "1,3": 7,
    "2,3": 8,
    "5,6": 9,
    "5,7": 10,
    "4,5": 11,
};

export { X, Y, Points, PointPairsToSegments};