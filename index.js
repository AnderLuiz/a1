import {
  div, mult, sub, sum,
} from '@gamatec/g-calc';

(async () => {
  // (3 / 5) * (6 + 7)
  console.time('Em paralelo');
  const promise1 = div(3, 5);
  const promise2 = sum(6, 7);
  const [r1, r2] = await Promise.all([promise1, promise2]); // Espera aqui (await)
  let result = await mult(r1, r2); // Espera aqui (await)
  // Total 2 segundos
  console.timeEnd('Em paralelo');

  console.time('Sequencial');
  const r3 = await div(3, 5); // Espera aqui (await)
  const r4 = await sum(6, 7); // Espera aqui (await)
  result = await mult(r3, r4); // Espera aqui (await)
  // Total 3 segundos
  console.timeEnd('Sequencial');

  console.log(result);
})();
