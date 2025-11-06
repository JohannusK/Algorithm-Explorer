export const fibonacciSearch = {
  key: "fibonacci",
  name: "Fibonacci Search",
  description:
    "Uses Fibonacci numbers to divide the array into unequal parts, similar to binary search but with additions instead of divisions.",
  async run(ctx, target) {
    const arr = ctx.data();
    const n = arr.length;
    if (n === 0) {
      ctx.setResult(false, -1);
      return;
    }

    let fibM2 = 0;
    let fibM1 = 1;
    let fibM = fibM2 + fibM1;

    while (fibM < n) {
      fibM2 = fibM1;
      fibM1 = fibM;
      fibM = fibM2 + fibM1;
    }

    let offset = -1;
    let step = 0;

    while (fibM > 1) {
      step += 1;
      ctx.setPass(step);

      const i = Math.min(offset + fibM2, n - 1);

      ctx.highlight([i]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[i] === target) {
        ctx.setResult(true, i);
        ctx.highlight([i]);
        await ctx.pause();
        return;
      }

      if (arr[i] < target) {
        fibM = fibM1;
        fibM1 = fibM2;
        fibM2 = fibM - fibM1;
        offset = i;
      } else {
        fibM = fibM2;
        fibM1 = fibM1 - fibM2;
        fibM2 = fibM - fibM1;
      }

      ctx.clearActive();
    }

    if (fibM1 === 1 && offset + 1 < n) {
      step += 1;
      ctx.setPass(step);
      ctx.highlight([offset + 1]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[offset + 1] === target) {
        ctx.setResult(true, offset + 1);
        ctx.highlight([offset + 1]);
        await ctx.pause();
        return;
      }
    }

    ctx.clearActive();
    ctx.setResult(false, -1);
  },
};
