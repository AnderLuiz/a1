import plus, {
  sum, sub, mult, div,
} from './calc';

const numbers = {
  a: 3, b: 5, c: 6, d: 't',
};
const { a } = numbers;
const { b, c } = numbers;

console.log(plus(a, b));

console.log(sum(a, b));

console.log(`${a} + ${b} = ${sum(a, b)}`);

console.log(`${a} - ${b} = ${sub(a, b)}`);

console.log(`${a} * ${b} = ${mult(a, b)}`);


console.log(div(a, b));


div(a, b).then((result) => {
  console.log('Resultado (Then):', result);
}).catch((error) => {
  console.log('Erro:', error.message);
});

console.log('----');

(async () => {
  const result = await div(a, b);
  console.log('Resultado (await):', result);
})();

console.log('----');
