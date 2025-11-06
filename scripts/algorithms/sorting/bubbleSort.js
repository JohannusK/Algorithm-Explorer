export const bubbleSort = {
  key: "bubble",
  name: "Bubble Sort",
  description:
    "Repeatedly steps through the list, swapping adjacent elements that are out of order so larger values bubble to the end.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }
    for (let pass = 0; pass < n - 1; pass += 1) {
      let swapped = false;
      ctx.setPass(pass + 1);
      for (let i = 0; i < n - pass - 1; i += 1) {
        ctx.highlight([i, i + 1]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[i] > arr[i + 1]) {
          await ctx.swap(i, i + 1);
          swapped = true;
        }
      }
      ctx.clearActive();
      ctx.addSorted(n - pass - 1);
      if (!swapped) {
        break;
      }
    }
  },
};
