export const binarySearch = {
  key: "binary",
  name: "Binary Search",
  description:
    "Repeatedly halves the search interval by comparing the middle element to the target.",
  async run(ctx, target) {
    const arr = ctx.data();
    let low = 0;
    let high = arr.length - 1;
    let steps = 0;

    while (low <= high) {
      steps += 1;
      ctx.setPass(steps);
      const mid = Math.floor((low + high) / 2);
      ctx.highlight([mid]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[mid] === target) {
        ctx.setResult(true, mid);
        ctx.highlight([mid]);
        await ctx.pause();
        return;
      }

      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    ctx.clearActive();
    ctx.setResult(false, -1);
  },
};
