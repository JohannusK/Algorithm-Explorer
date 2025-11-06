export const interpolationSearch = {
  key: "interpolation",
  name: "Interpolation Search",
  description:
    "Estimates the target position based on value distribution, similar to how humans search a phone book.",
  async run(ctx, target) {
    const arr = ctx.data();
    const n = arr.length;
    if (n === 0) {
      ctx.setResult(false, -1);
      return;
    }

    let low = 0;
    let high = n - 1;
    let step = 0;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
      step += 1;
      ctx.setPass(step);

      if (arr[low] === arr[high]) {
        ctx.highlight([low]);
        ctx.recordComparison();
        await ctx.pause();

        if (arr[low] === target) {
          ctx.setResult(true, low);
          ctx.highlight([low]);
          await ctx.pause();
          return;
        }
        break;
      }

      const pos =
        low +
        Math.floor(((target - arr[low]) / (arr[high] - arr[low])) * (high - low));

      ctx.highlight([low, pos, high]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[pos] === target) {
        ctx.setResult(true, pos);
        ctx.highlight([pos]);
        await ctx.pause();
        return;
      }

      if (arr[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }

      ctx.clearActive();
    }

    ctx.clearActive();
    ctx.setResult(false, -1);
  },
};
