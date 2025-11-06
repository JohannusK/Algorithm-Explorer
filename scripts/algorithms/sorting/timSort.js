export const timSort = {
  key: "tim",
  name: "Tim Sort",
  description:
    "Adapts to patterns in data; excels with partially sorted inputs.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    const MIN_MERGE = 32;

    async function insertionSortRange(left, right) {
      for (let i = left + 1; i <= right; i += 1) {
        const key = arr[i];
        let j = i - 1;
        ctx.highlight([i]);
        await ctx.pause();

        while (j >= left) {
          ctx.highlight([j, j + 1]);
          ctx.recordComparison();
          await ctx.pause();
          if (arr[j] > key) {
            await ctx.overwrite(j + 1, arr[j]);
            j -= 1;
          } else {
            break;
          }
        }

        if (j + 1 !== i) {
          await ctx.overwrite(j + 1, key);
        }
        ctx.clearActive();
      }
    }

    async function merge(left, mid, right) {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0;
      let j = 0;
      let k = left;

      while (i < leftArr.length && j < rightArr.length) {
        ctx.highlight([left + i, mid + 1 + j, k]);
        ctx.recordComparison();
        await ctx.pause();

        if (leftArr[i] <= rightArr[j]) {
          await ctx.overwrite(k, leftArr[i]);
          i += 1;
        } else {
          await ctx.overwrite(k, rightArr[j]);
          j += 1;
        }
        k += 1;
      }

      while (i < leftArr.length) {
        ctx.highlight([k]);
        await ctx.pause();
        await ctx.overwrite(k, leftArr[i]);
        i += 1;
        k += 1;
      }

      while (j < rightArr.length) {
        ctx.highlight([k]);
        await ctx.pause();
        await ctx.overwrite(k, rightArr[j]);
        j += 1;
        k += 1;
      }

      ctx.clearActive();
    }

    ctx.setPass(1);
    for (let start = 0; start < n; start += MIN_MERGE) {
      const end = Math.min(start + MIN_MERGE - 1, n - 1);
      await insertionSortRange(start, end);
    }

    let size = MIN_MERGE;
    let pass = 2;
    while (size < n) {
      ctx.setPass(pass);
      pass += 1;

      for (let start = 0; start < n; start += 2 * size) {
        const mid = start + size - 1;
        const end = Math.min(start + 2 * size - 1, n - 1);

        if (mid < end) {
          await merge(start, mid, end);
        }
      }

      size *= 2;
    }
    ctx.clearActive();
  },
};
