export const insertionSort = {
  key: "insertion",
  name: "Insertion Sort",
  description:
    "Builds a sorted portion one element at a time by inserting each value into its correct position on the left.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    for (let i = 1; i < n; i += 1) {
      ctx.setPass(i);
      let j = i - 1;
      const key = arr[i];
      ctx.highlight([i]);
      await ctx.pause();

      while (j >= 0) {
        ctx.highlight([j, j + 1]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[j] > key) {
          await ctx.overwrite(j + 1, arr[j]);
          j -= 1;
        } else {
          break;
        }
      }

      await ctx.overwrite(j + 1, key);
      ctx.clearActive();
      ctx.addSorted(Array.from({ length: i + 1 }, (_, index) => index));
    }
  },
};
