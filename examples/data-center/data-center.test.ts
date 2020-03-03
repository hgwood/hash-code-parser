import test from "tape";
import jolicitron from "../../src";
import { readTestData } from "../../test/test-utils";

test(`data center example`, async t => {
  const [input, parser, expected] = await readTestData(__dirname, [
    "data-center-input.txt",
    "data-center-parser.json",
    "data-center-output.json"
  ]);
  const actual = jolicitron(parser, input);
  t.deepEqual(actual, expected);
  t.end();
});
