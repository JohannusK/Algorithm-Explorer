export const linearSearch = {
  key: "linear",
  name: "Linear Search",
  description:
    "Checks each item from left to right until it finds the target or reaches the end.",
  async run(ctx, target) {
    const arr = ctx.data();
    for (let i = 0; i < arr.length; i += 1) {
      ctx.setPass(i + 1);
      ctx.highlight([i]);
      ctx.recordComparison();
      await ctx.pause();
      if (arr[i] === target) {
        ctx.setResult(true, i);
        ctx.highlight([i]);
        await ctx.pause();
        return;
      }
      ctx.clearActive();
    }
    ctx.clearActive();
    ctx.setResult(false, -1);
  },
};
