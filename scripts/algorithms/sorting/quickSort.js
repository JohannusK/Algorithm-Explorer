export const quickSort = {
  key: "quick",
  name: "Quick Sort",
  description:
    "Partitions the array around a pivot so smaller values move left and larger move right, then recursively sorts each side.",
  async run(ctx) {
    const arr = ctx.data();

    async function sortRange(low, high) {
      if (low >= high) {
        if (low === high) {
          ctx.addSorted(low);
        }
        return;
      }
      ctx.incrementPass();
      const pivotIndex = await partition(low, high);
      ctx.addSorted(pivotIndex);
      await sortRange(low, pivotIndex - 1);
      await sortRange(pivotIndex + 1, high);
    }

    async function partition(low, high) {
      const pivotValue = arr[high];
      let storeIndex = low;
      for (let j = low; j < high; j += 1) {
        ctx.highlight([j, high]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[j] <= pivotValue) {
          await ctx.swap(storeIndex, j);
          storeIndex += 1;
        }
      }
      await ctx.swap(storeIndex, high);
      ctx.clearActive();
      return storeIndex;
    }

    await sortRange(0, arr.length - 1);
  },
};
