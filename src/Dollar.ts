import {add, subtract, lt, lte, gt, gte} from './util'

export type Processable = Dollar | string | number

export default class Dollar {
    value: number;
    
    constructor (amount: number | string, processed: boolean = false) {
        this.value = (processed && typeof amount === 'number') ? amount : process(amount);
    }

    public add (amount: Processable): Dollar {
        let value = this.perform(add, amount);
        return new Dollar(value, true);
    }

    public subtract (amount: Processable): Dollar {
        let value = this.perform(subtract, amount);
        return new Dollar(value, true);
    }

    // Multiplication and Division will most likely return floats which
    // will need to be rounded.

    public multiply (amount: number): Dollar {
        // amount is always a number
        let value = Math.round(this.value * amount);
        return new Dollar(value, true);
    }

    public divide (amount: number): Dollar {
        // amount is always a number
        let value = Math.round(this.value * amount);
        return new Dollar(value, true);
    }

    public gt (amount: Processable): boolean {
        return this.compare(gt, amount);
    }

    public gte (amount: Processable): boolean {
        return this.compare(gte, amount);
    }

    public lt (amount: Processable): boolean {
        return this.compare(lt, amount);
    }

    public lte (amount: Processable): boolean {
        return this.compare(lte, amount);
    }

    public toString (): string {
        let sign = '';
        let output = (this.value / 100).toFixed(2);
        let ch = output.charAt(0);
        if (ch === '-' || ch === '+') { // Don't think '+' is necessary.
            sign = ch;
            output = output.substring(1);
        }
        output = output.replace(/./g, function (c, i, a) {
            return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
        })
        return sign + output;
    }

    private perform (func: (a: number, b: number)=> number, amount: Processable): number {
        const processed = (amount instanceof Dollar)
            ? amount.value
            : process(amount);
        const value = func(this.value, processed);
        return value;
    }

    private compare (func: (a: number, b: number)=> boolean, amount: Processable): boolean {
        const processed = (amount instanceof Dollar)
            ? amount.value
            : process(amount);
        const value = func(this.value, processed);
        return value;
    }
}

function process (amount: number | string): number {
    // Allow dashed or comma string input for convience.
    // Example: '300_000_000.00' or '300,000,000.00'
    if (typeof amount === 'string') {
        if (!(/^[-\s0-9_,.]*$/).test(amount)) {
            throw new Error('Invalid Dollar input amount');
        }
        amount = parseFloat(amount.replace(/[_,]/g, ''));
        if (isNaN(amount)) {
            throw new Error('Invalid Dollar input amount');
        }
    }
    const negative = amount < 0;
    amount = Math.abs(amount) * 100;
    amount = negative ? -amount : amount;
    // Round down if thousands is under 5, otherwise round up
    // Math.round rounds a -0.5 to -0 and -0.6 to -1
    amount = Math.round(amount);
    return amount;
}