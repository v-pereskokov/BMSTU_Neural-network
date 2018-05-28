export default function Range(start: number = 0, end: number = 10, step: number = 1): Array<string> {
    const result: Array<string> = [];

    for (let i: number = start; i <= end; i += step) {
        result.push(i.toString());
    }

    return result;
}
