export const shellSort = {
  key: "shell",
  name: "Shell Sort",
  description:
    "Improves insertion sort by comparing elements at larger gaps, gradually reducing the gap until the array is sorted.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let gap = 1;
    while (gap < Math.floor(n / 3)) {
      gap = 3 * gap + 1;
    }

    let pass = 0;
    while (gap >= 1) {
      pass += 1;
      ctx.setPass(pass);

      for (let i = gap; i < n; i += 1) {
        const temp = arr[i];
        let j = i;

        while (j >= gap) {
          ctx.highlight([j, j - gap]);
          ctx.recordComparison();
          await ctx.pause();

          if (arr[j - gap] > temp) {
            await ctx.overwrite(j, arr[j - gap]);
            j -= gap;
          } else {
            break;
          }
        }

        if (j !== i) {
          await ctx.overwrite(j, temp);
        }
        ctx.clearActive();
      }

      gap = Math.floor(gap / 3);
    }
  },
};
