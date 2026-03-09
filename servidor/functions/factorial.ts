// Implementación como función lambda y con condicionales ternarias
export const factorial = (num:number): number => num=== 0 ? 1 : num * factorial(num - 1);

// Es el equivalente a...
function classicFactorial(num:number):number {
    if (num === 0) {
        return 1;
    } else {
        return factorial(num - 1);
    }
}

export default factorial;