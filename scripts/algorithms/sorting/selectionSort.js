export const selectionSort = {
  key: "selection",
  name: "Selection Sort",
  description:
    "Selects the smallest remaining element and swaps it into place, shrinking the unsorted portion each pass.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    for (let i = 0; i < n - 1; i += 1) {
      let minIndex = i;
      ctx.setPass(i + 1);
      for (let j = i + 1; j < n; j += 1) {
        ctx.highlight([minIndex, j]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        await ctx.swap(i, minIndex);
      }
      ctx.clearActive();
      ctx.addSorted(i);
    }
  },
};
