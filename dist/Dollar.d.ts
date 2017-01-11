export declare type Processable = Dollar | string | number;
export default class Dollar {
    value: number;
    constructor(amount: number | string, processed?: boolean);
    add(amount: Processable): Dollar;
    subtract(amount: Processable): Dollar;
    multiply(amount: number): Dollar;
    divide(amount: number): Dollar;
    gt(amount: Processable): boolean;
    gte(amount: Processable): boolean;
    lt(amount: Processable): boolean;
    lte(amount: Processable): boolean;
    toString(): string;
    private perform(func, amount);
    private compare(func, amount);
}
