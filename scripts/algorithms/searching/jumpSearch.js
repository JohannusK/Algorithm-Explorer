export const jumpSearch = {
  key: "jump",
  name: "Jump Search",
  description:
    "Skips ahead by fixed jumps then performs a linear scan inside the discovered block.",
  async run(ctx, target) {
    const arr = ctx.data();
    const n = arr.length;
    if (n === 0) {
      ctx.setResult(false, -1);
      return;
    }

    const jumpSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let step = 0;

    while (prev < n && arr[Math.min(prev, n - 1)] < target) {
      step += 1;
      ctx.setPass(step);
      const jumpIndex = Math.min(prev + jumpSize, n - 1);
      ctx.highlight([prev, jumpIndex]);
      ctx.recordComparison();
      await ctx.pause();

      if (arr[jumpIndex] === target) {
        ctx.setResult(true, jumpIndex);
        ctx.highlight([jumpIndex]);
        await ctx.pause();
        return;
      }

      prev += jumpSize;
      ctx.clearActive();
    }

    const start = Math.max(0, prev - jumpSize);
    const end = Math.min(prev, n);

    for (let i = start; i < end; i += 1) {
      step += 1;
      ctx.setPass(step);
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
