export const sum = (a, b) => a + b;

export function sub(a, b) {
  return a - b;
}

export const mult = function mult(a, b) {
  return a * b;
};

// export const div = (a, b) => new Promise((resolve, reject) => {
//   if (b === 0) {
//     reject(new Error('O denominador não pode ser 0'));
//   }
//   setTimeout(() => { resolve(a / b); }, 3000);
// });

export const div = async (a, b) => {
  if (b === 0) {
    throw new Error('O denominador não pode ser 0');
  }
  await setTimeout(() => { }, 1000);
  return a / b;
};

export default sum;
