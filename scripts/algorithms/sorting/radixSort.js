async function countingSortByDigit(ctx, exp) {
  const arr = ctx.data();
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit] += 1;
    ctx.recordWrite();
  }
  ctx.clearActive();

  for (let i = 1; i < 10; i += 1) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i -= 1) {
    ctx.highlight([i]);
    await ctx.pause();
    const digit = Math.floor(arr[i] / exp) % 10;
    const position = count[digit] - 1;
    output[position] = arr[i];
    count[digit] -= 1;
  }
  ctx.clearActive();

  for (let i = 0; i < n; i += 1) {
    ctx.highlight([i]);
    await ctx.overwrite(i, output[i]);
  }
  ctx.clearActive();
}

export const radixSort = {
  key: "radix",
  name: "Radix Sort",
  description:
    "Sorts integers digit by digit, from least significant to most significant, using a stable counting sort for each digit position.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let max = arr[0];
    for (let i = 1; i < n; i += 1) {
      ctx.highlight([i]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[i] > max) max = arr[i];
    }
    ctx.clearActive();

    let pass = 0;
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      pass += 1;
      ctx.setPass(pass);
      await countingSortByDigit(ctx, exp);
    }
  },
};
