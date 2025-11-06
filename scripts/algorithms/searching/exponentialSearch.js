export const exponentialSearch = {
  key: "exponential",
  name: "Exponential Search",
  description:
    "Finds a range by exponentially increasing the search bound, then performs binary search within that range.",
  async run(ctx, target) {
    const arr = ctx.data();
    const n = arr.length;
    if (n === 0) {
      ctx.setResult(false, -1);
      return;
    }

    ctx.setPass(1);
    ctx.highlight([0]);
    ctx.recordComparison();
    await ctx.pause();

    if (arr[0] === target) {
      ctx.setResult(true, 0);
      ctx.highlight([0]);
      await ctx.pause();
      return;
    }

    ctx.clearActive();

    let bound = 1;
    let step = 1;
    while (bound < n && arr[bound] < target) {
      step += 1;
      ctx.setPass(step);
      ctx.highlight([bound]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[bound] === target) {
        ctx.setResult(true, bound);
        ctx.highlight([bound]);
        await ctx.pause();
        return;
      }

      ctx.clearActive();
      bound *= 2;
    }

    let low = Math.floor(bound / 2);
    let high = Math.min(bound, n - 1);

    while (low <= high) {
      step += 1;
      const mid = Math.floor((low + high) / 2);
      ctx.setPass(step);
      ctx.highlight([low, mid, high]);
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

      ctx.clearActive();
    }

    ctx.clearActive();
    ctx.setResult(false, -1);
  },
};
