export const cocktailShakerSort = {
  key: "cocktail",
  name: "Cocktail Shaker Sort",
  description:
    "A bidirectional bubble sort variant that moves items in both directions each pass for faster convergence.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let start = 0;
    let end = n - 1;
    let swapped = true;
    let pass = 0;

    while (swapped) {
      swapped = false;
      pass += 1;
      ctx.setPass(pass);

      for (let i = start; i < end; i += 1) {
        ctx.highlight([i, i + 1]);
        ctx.recordComparison();
        await ctx.pause();

        if (arr[i] > arr[i + 1]) {
          await ctx.swap(i, i + 1);
          swapped = true;
        }
      }

      if (!swapped) {
        break;
      }

      ctx.addSorted(end);
      end -= 1;

      swapped = false;
      pass += 1;
      ctx.setPass(pass);

      for (let i = end; i > start; i -= 1) {
        ctx.highlight([i - 1, i]);
        ctx.recordComparison();
        await ctx.pause();

        if (arr[i - 1] > arr[i]) {
          await ctx.swap(i - 1, i);
          swapped = true;
        }
      }

      ctx.addSorted(start);
      start += 1;

      ctx.clearActive();
    }
  },
};
