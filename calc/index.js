export const sum = async (a, b) => {
  const timeout = parseInt((Math.random() * 5000) + 1000, 10);
  await new Promise(done => setTimeout(() => done(), timeout));
  return a + b;
};

export async function sub(a, b) {
  await setTimeout(() => { }, 1000);
  return a - b;
}

export const mult = async function mult(a, b) {
  const timeout = parseInt((Math.random() * 5000) + 1000, 10);
  await new Promise(done => setTimeout(() => done(), timeout));
  return a * b;
};

export const div = async (a, b) => {
  if (b === 0) {
    throw new Error('O denominador não pode ser 0');
  }
  const timeout = parseInt((Math.random() * 5000) + 1000, 10);
  await new Promise(done => setTimeout(() => done(), timeout));
  return a / b;
};

// export const div = (a, b) => new Promise((resolve, reject) => {
//   if (b === 0) {
//     reject(new Error('O denominador não pode ser 0'));
//   }
//   setTimeout(() => { resolve(a / b); }, 3000);
// });

export default sum;
