export const heapSort = {
  key: "heap",
  name: "Heap Sort",
  description:
    "Builds a max heap from the array, then repeatedly extracts the maximum element to build the sorted portion from the end.",
  async run(ctx) {
    const arr = ctx.data();
    const n = arr.length;
    if (n <= 1) {
      return;
    }

    async function heapify(heapSize, rootIndex) {
      let largest = rootIndex;
      const left = 2 * rootIndex + 1;
      const right = 2 * rootIndex + 2;

      if (left < heapSize) {
        ctx.highlight([largest, left]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }

      if (right < heapSize) {
        ctx.highlight([largest, right]);
        ctx.recordComparison();
        await ctx.pause();
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }

      if (largest !== rootIndex) {
        await ctx.swap(rootIndex, largest);
        await heapify(heapSize, largest);
      }
    }

    ctx.setPass(1);
    for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i -= 1) {
      ctx.setPass(n - i + 1);
      await ctx.swap(0, i);
      ctx.addSorted(i);
      await heapify(i, 0);
    }
    ctx.clearActive();
  },
};
