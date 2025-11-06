export const mergeSort = {
  key: "merge",
  name: "Merge Sort",
  description:
    "Splits the array into halves, sorts them, and merges the halves back together while keeping the numbers ordered.",
  async run(ctx) {
    const arr = ctx.data();
    const aux = Array.from(arr);

    async function merge(low, mid, high) {
      let i = low;
      let j = mid + 1;
      let k = low;

      while (i <= mid && j <= high) {
        ctx.highlight([i, j]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[i] <= arr[j]) {
          aux[k] = arr[i];
          i += 1;
        } else {
          aux[k] = arr[j];
          j += 1;
        }
        k += 1;
      }

      while (i <= mid) {
        aux[k] = arr[i];
        i += 1;
        k += 1;
      }
      while (j <= high) {
        aux[k] = arr[j];
        j += 1;
        k += 1;
      }

      for (let index = low; index <= high; index += 1) {
        await ctx.overwrite(index, aux[index]);
      }
      ctx.clearActive();
    }

    async function sortRange(low, high) {
      if (low >= high) {
        return;
      }
      const mid = Math.floor((low + high) / 2);
      await sortRange(low, mid);
      await sortRange(mid + 1, high);
      await merge(low, mid, high);
    }

    await sortRange(0, arr.length - 1);
    ctx.markAllSorted();
  },
};
