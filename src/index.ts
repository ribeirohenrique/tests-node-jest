export function double(x: number): number {
    return x * 2;
}

export function concat(...args: string[]): string {
    return args.reduce((result, param) => result + param, '');
}

export function waitSeconds(seconds: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`waited ${seconds} seconds`);
        }, seconds * 1000);
    });
}
