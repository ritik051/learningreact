import { sum } from "../components/sum";

test(
    "testing the sum function that sum 2 numbers",
    () => {
        expect(sum(2,3)).toBe(5);
    }

);