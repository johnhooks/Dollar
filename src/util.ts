export function lt (a: number, b: number): boolean {
    return a < b;
}

export function lte (a: number, b: number): boolean {
    return a <= b;
}

export function gt (a: number, b: number): boolean {
    return a > b;
}

export function gte (a: number, b: number): boolean {
    return a >= b;
}

// Addition and Subtraction of integers should return integers
export function add (a: number, b: number): number {
    return a + b;
}

export function subtract (a: number, b: number): number {
    return a - b;
}

// Multiplication and Division will most likely return floats which
// will need to be rounded.
export function multiply (a: number, b: number): number {
    return Math.round(a * b);
}

export function divide (a: number, b: number): number {
    return Math.round(a / b);
}