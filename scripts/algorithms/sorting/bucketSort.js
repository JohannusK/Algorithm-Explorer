export const bucketSort = {
  key: "bucket",
  name: "Bucket Sort",
  description:
    "Distributes elements into buckets based on their value range, sorts each bucket individually, then concatenates them.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < n; i += 1) {
      ctx.highlight([i]);
      ctx.recordComparison(2);
      await ctx.pause();
      if (arr[i] < min) min = arr[i];
      if (arr[i] > max) max = arr[i];
    }
    ctx.clearActive();

    const bucketCount = Math.max(5, Math.floor(Math.sqrt(n)));
    const buckets = Array.from({ length: bucketCount }, () => []);
    const range = max - min + 1;

    ctx.setPass(1);
    for (let i = 0; i < n; i += 1) {
      ctx.highlight([i]);
      await ctx.pause();
      const bucketIndex = Math.min(
        bucketCount - 1,
        Math.floor(((arr[i] - min) / range) * bucketCount),
      );
      buckets[bucketIndex].push(arr[i]);
      ctx.recordWrite();
    }
    ctx.clearActive();

    ctx.setPass(2);
    for (let i = 0; i < bucketCount; i += 1) {
      const bucket = buckets[i];
      for (let j = 1; j < bucket.length; j += 1) {
        const key = bucket[j];
        let k = j - 1;
        ctx.recordComparison();
        while (k >= 0 && bucket[k] > key) {
          bucket[k + 1] = bucket[k];
          k -= 1;
          ctx.recordComparison();
          ctx.recordWrite();
        }
        bucket[k + 1] = key;
      }
    }

    ctx.setPass(3);
    let index = 0;
    for (let i = 0; i < bucketCount; i += 1) {
      for (let j = 0; j < buckets[i].length; j += 1) {
        ctx.highlight([index]);
        await ctx.overwrite(index, buckets[i][j]);
        index += 1;
      }
    }
    ctx.clearActive();
  },
};
