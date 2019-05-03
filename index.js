import {
  div, mult, sub, sum,
} from './calc';

const numbers = {
  a: 3, b: 5, c: 6, d: 't',
};

const { a } = numbers;
const { b, c } = numbers;

console.log(`${a} + ${b} = ${sum(a, b)}`);
console.log(`${a} - ${b} = ${sub(a, b)}`);
console.log(`${a} * ${b} = ${mult(a, b)}`);
// Div é uma promise
console.log(div(a, b));

// Modo 1 de utilizar uma promise (then)
div(a, b).then((result) => {
  console.log('Resultado (Then):', result);
}).catch((error) => {
  console.log('Erro:', error.message);
});

(async () => {
  // Modo 2 de utilizar uma promise (await)
  const result = await div(a, b);
  console.log('Resultado (await):', result);
})();
