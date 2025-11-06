export const bogoSort = {
  key: "bogo",
  name: "Bogosort",
  description:
    "Randomly shuffles the array until it happens to be sorted. Entertaining, but wildly inefficient—only use with tiny arrays.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    const maxAttempts = 100000;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      let sorted = true;
      for (let i = 0; i < n - 1; i += 1) {
        ctx.highlight([i, i + 1]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[i] > arr[i + 1]) {
          sorted = false;
          break;
        }
      }

      ctx.clearActive();

      if (sorted) {
        return;
      }

      for (let i = n - 1; i > 0; i -= 1) {
        const j = ctx.randomInt(0, i);
        if (i !== j) {
          ctx.highlight([i, j]);
          await ctx.pause();
          await ctx.swap(i, j);
        }
      }

      ctx.clearActive();
    }

    console.warn("Bogosort hit attempt limit without finishing. Try a smaller array.");
  },
};
