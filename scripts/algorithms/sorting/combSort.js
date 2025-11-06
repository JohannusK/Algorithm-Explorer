export const combSort = {
  key: "comb",
  name: "Comb Sort",
  description:
    "Typically faster than bubble sort; gap shrinks by factor of 1.3 each pass.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let gap = n;
    const shrinkFactor = 1.3;
    let sorted = false;
    let pass = 0;

    while (!sorted) {
      pass += 1;
      ctx.setPass(pass);

      gap = Math.floor(gap / shrinkFactor);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }

      let swapped = false;

      for (let i = 0; i + gap < n; i += 1) {
        ctx.highlight([i, i + gap]);
        ctx.recordComparison();
        await ctx.pause();

        if (arr[i] > arr[i + gap]) {
          await ctx.swap(i, i + gap);
          swapped = true;
        }
      }

      if (gap === 1 && !swapped) {
        sorted = true;
      } else if (swapped) {
        sorted = false;
      }

      ctx.clearActive();
    }
  },
};
