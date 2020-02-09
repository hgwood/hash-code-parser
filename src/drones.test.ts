import { parseAsObject, parseAsArray, parseAsNumber } from "./parser";
import test from "tape";

const parse = parseAsObject([
  { name: "nrows", parser: parseAsNumber },
  { name: "ncols", parser: parseAsNumber },
  { name: "ndrones", parser: parseAsNumber },
  { name: "nturns", parser: parseAsNumber },
  { name: "maxLoad", parser: parseAsNumber },
  { name: "nitemTypes", parser: parseAsNumber },
  {
    name: "weights",
    parser: parseAsArray({ length: "nitemTypes", parser: parseAsNumber })
  },
  { name: "nwarehouses", parser: parseAsNumber },
  {
    name: "warehouses",
    parser: parseAsArray({
      length: "nwarehouses",
      parser: parseAsObject([
        { name: "x", parser: parseAsNumber },
        { name: "y", parser: parseAsNumber },
        {
          name: "items",
          parser: parseAsArray({ length: "nitemTypes", parser: parseAsNumber })
        }
      ])
    })
  },
  { name: "norders", parser: parseAsNumber },
  {
    name: "orders",
    parser: parseAsArray({
      length: "norders",
      parser: parseAsObject([
        { name: "x", parser: parseAsNumber },
        { name: "y", parser: parseAsNumber },
        { name: "nitems", parser: parseAsNumber },
        {
          name: "items",
          parser: parseAsArray({ length: "nitems", parser: parseAsNumber })
        }
      ])
    })
  }
]);

const input = `
  100 100 3 50 500
  3
  100 5 450
  2
  0 0
  5 1 0
  5 5
  0 10 2
  3
  1 1
  2
  2 0
  3 3
  3
  0 0 0
  5 6
  1
  2
`;

const expected = {
  nrows: 100,
  ncols: 100,
  ndrones: 3,
  nturns: 50,
  maxLoad: 500,
  nitemTypes: 3,
  weights: [100, 5, 450],
  nwarehouses: 2,
  warehouses: [
    { x: 0, y: 0, items: [5, 1, 0] },
    { x: 5, y: 5, items: [0, 10, 2] }
  ],
  norders: 3,
  orders: [
    { x: 1, y: 1, nitems: 2, items: [2, 0] },
    { x: 3, y: 3, nitems: 3, items: [0, 0, 0] },
    { x: 5, y: 6, nitems: 1, items: [2] }
  ]
};

test("parses the drone example correctly", t => {
  const { value: actual } = parse(input);
  t.deepEqual(actual, expected);
  t.end();
});