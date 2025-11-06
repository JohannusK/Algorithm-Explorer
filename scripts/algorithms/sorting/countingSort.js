export const countingSort = {
  key: "counting",
  name: "Counting Sort",
  description:
    "Counts occurrences of each value and uses that count to place elements in sorted order. Works best for integers with limited range.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < n; i += 1) {
      ctx.highlight([i]);
      ctx.recordComparison(2);
      await ctx.pause();
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
    }
    ctx.clearActive();

    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n);

    ctx.setPass(1);
    for (let i = 0; i < n; i += 1) {
      ctx.highlight([i]);
      await ctx.pause();
      count[arr[i] - min] += 1;
      ctx.recordWrite();
    }
    ctx.clearActive();

    ctx.setPass(2);
    for (let i = 1; i < range; i += 1) {
      count[i] += count[i - 1];
    }

    ctx.setPass(3);
    for (let i = n - 1; i >= 0; i -= 1) {
      ctx.highlight([i]);
      await ctx.pause();
      const value = arr[i];
      const position = count[value - min] - 1;
      output[position] = value;
      count[value - min] -= 1;
    }
    ctx.clearActive();

    ctx.setPass(4);
    for (let i = 0; i < n; i += 1) {
      ctx.highlight([i]);
      await ctx.overwrite(i, output[i]);
    }
    ctx.clearActive();
  },
};
