export const sortingDocs = {
  bubble: {
    pseudocode: `procedure bubbleSort(A):
  n ← length(A)
  repeat
    swapped ← false
    for i from 0 to n - 2 do
      if A[i] > A[i + 1] then
        swap A[i], A[i + 1]
        swapped ← true
    n ← n - 1
  until not swapped`,
    implementations: {
      python: `def bubble_sort(arr):
    n = len(arr)
    while True:
        swapped = False
        for i in range(1, n):
            if arr[i - 1] > arr[i]:
                arr[i - 1], arr[i] = arr[i], arr[i - 1]
                swapped = True
        n -= 1
        if not swapped or n <= 1:
            break`,
      c: `void bubble_sort(int arr[], int n) {
    int swapped = 1;
    while (swapped) {
        swapped = 0;
        for (int i = 1; i < n; ++i) {
            if (arr[i - 1] > arr[i]) {
                int tmp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = tmp;
                swapped = 1;
            }
        }
        --n;
    }
}`,
      rust: `pub fn bubble_sort(arr: &mut [i32]) {
    let mut n = arr.len();
    loop {
        let mut swapped = false;
        for i in 1..n {
            if arr[i - 1] > arr[i] {
                arr.swap(i - 1, i);
                swapped = true;
            }
        }
        if !swapped || n <= 1 {
            break;
        }
        n -= 1;
    }
}`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped = true;
    while (swapped) {
        swapped = false;
        for (int i = 1; i < n; i++) {
            if (arr[i - 1] > arr[i]) {
                int tmp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = tmp;
                swapped = true;
            }
        }
        n--;
    }
}`,
    },
  },
  insertion: {
    pseudocode: `procedure insertionSort(A):
  for i from 1 to length(A) - 1 do
    key ← A[i]
    j ← i - 1
    while j ≥ 0 and A[j] > key do
      A[j + 1] ← A[j]
      j ← j - 1
    A[j + 1] ← key`,
    implementations: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
      c: `void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}`,
      rust: `pub fn insertion_sort(arr: &mut [i32]) {
    for i in 1..arr.len() {
        let key = arr[i];
        let mut j = i;
        while j > 0 && arr[j - 1] > key {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = key;
    }
}`,
      java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
  },
  selection: {
    pseudocode: `procedure selectionSort(A):
  n ← length(A)
  for i from 0 to n - 2 do
    minIndex ← i
    for j from i + 1 to n - 1 do
      if A[j] < A[minIndex] then
        minIndex ← j
    swap A[i], A[minIndex]`,
    implementations: {
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]`,
      c: `void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int min_index = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        int tmp = arr[i];
        arr[i] = arr[min_index];
        arr[min_index] = tmp;
    }
}`,
      rust: `pub fn selection_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n.saturating_sub(1) {
        let mut min = i;
        for j in (i + 1)..n {
            if arr[j] < arr[min] {
                min = j;
            }
        }
        arr.swap(i, min);
    }
}`,
      java: `public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int tmp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = tmp;
    }
}`,
    },
  },
  quick: {
    pseudocode: `procedure quickSort(A, low, high):
  if low ≥ high then return
  pivotIndex ← partition(A, low, high)
  quickSort(A, low, pivotIndex - 1)
  quickSort(A, pivotIndex + 1, high)

procedure partition(A, low, high):
  pivot ← A[high]
  i ← low
  for j from low to high - 1 do
    if A[j] ≤ pivot then
      swap A[i], A[j]
      i ← i + 1
  swap A[i], A[high]
  return i`,
    implementations: {
      python: `def quick_sort(arr):
    def _sort(lo, hi):
        if lo >= hi:
            return
        pivot = partition(lo, hi)
        _sort(lo, pivot - 1)
        _sort(pivot + 1, hi)

    def partition(lo, hi):
        pivot = arr[hi]
        i = lo
        for j in range(lo, hi):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[hi] = arr[hi], arr[i]
        return i

    _sort(0, len(arr) - 1)`,
      c: `static int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            ++i;
        }
    }
    int tmp = arr[i];
    arr[i] = arr[high];
    arr[high] = tmp;
    return i;
}

void quick_sort(int arr[], int low, int high) {
    if (low >= high) return;
    int pivot = partition(arr, low, high);
    quick_sort(arr, low, pivot - 1);
    quick_sort(arr, pivot + 1, high);
}`,
      rust: `pub fn quick_sort(arr: &mut [i32]) {
    fn partition(arr: &mut [i32]) -> usize {
        let last = arr.len() - 1;
        let pivot = arr[last];
        let mut i = 0;
        for j in 0..last {
            if arr[j] <= pivot {
                arr.swap(i, j);
                i += 1;
            }
        }
        arr.swap(i, last);
        i
    }

    if arr.len() <= 1 {
        return;
    }
    let pivot = partition(arr);
    let (left, right) = arr.split_at_mut(pivot);
    quick_sort(left);
    quick_sort(&mut right[1..]);
}`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low >= high) {
        return;
    }
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
        }
    }
    int tmp = arr[i];
    arr[i] = arr[high];
    arr[high] = tmp;
    return i;
}`,
    },
  },
  merge: {
    pseudocode: `procedure mergeSort(A):
  if length(A) ≤ 1 then return
  mid ← ⌊length(A) / 2⌋
  left ← mergeSort(A[0..mid))
  right ← mergeSort(A[mid..n))
  return merge(left, right)

procedure merge(left, right):
  result ← empty list
  while left and right are not empty do
    if left[0] ≤ right[0] then
      append left.pop_front() to result
    else
      append right.pop_front() to result
  append remaining items from left, right
  return result`,
    implementations: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      c: `static void merge(int arr[], int temp[], int left, int mid, int right) {
    int i = left, j = mid, k = left;
    while (i < mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i < mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int idx = left; idx <= right; ++idx) arr[idx] = temp[idx];
}

void merge_sort(int arr[], int temp[], int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    merge_sort(arr, temp, left, mid);
    merge_sort(arr, temp, mid + 1, right);
    merge(arr, temp, left, mid + 1, right);
}`,
      rust: `pub fn merge_sort(arr: &mut [i32]) {
    let n = arr.len();
    if n <= 1 {
        return;
    }
    let mid = n / 2;
    merge_sort(&mut arr[..mid]);
    merge_sort(&mut arr[mid..]);

    let mut merged = arr.to_vec();
    merge(&arr[..mid], &arr[mid..], &mut merged[..]);
    arr.copy_from_slice(&merged);
}

fn merge(left: &[i32], right: &[i32], out: &mut [i32]) {
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            out[k] = left[i];
            i += 1;
        } else {
            out[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    while i < left.len() {
        out[k] = left[i];
        i += 1;
        k += 1;
    }
    while j < right.len() {
        out[k] = right[j];
        j += 1;
        k += 1;
    }
}`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) {
        return;
    }
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
    },
  },
  heap: {
    pseudocode: `procedure heapSort(A):
  buildMaxHeap(A)
  for end from length(A) - 1 downto 1 do
    swap A[0], A[end]
    siftDown(A, 0, end)

procedure buildMaxHeap(A):
  for i from ⌊length(A) / 2⌋ - 1 downto 0 do
    siftDown(A, i, length(A))

procedure siftDown(A, root, size):
  largest ← root
  left ← 2·root + 1
  right ← 2·root + 2
  if left < size and A[left] > A[largest] then largest ← left
  if right < size and A[right] > A[largest] then largest ← right
  if largest ≠ root then
    swap A[root], A[largest]
    siftDown(A, largest, size)`,
    implementations: {
      python: `def heap_sort(arr):
    def sift_down(start, end):
        root = start
        while True:
            child = 2 * root + 1
            if child >= end:
                break
            if child + 1 < end and arr[child] < arr[child + 1]:
                child += 1
            if arr[root] >= arr[child]:
                break
            arr[root], arr[child] = arr[child], arr[root]
            root = child

    n = len(arr)
    for start in range(n // 2 - 1, -1, -1):
        sift_down(start, n)
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        sift_down(0, end)`,
      c: `static void sift_down(int arr[], int start, int end) {
    int root = start;
    while (true) {
        int child = 2 * root + 1;
        if (child >= end) break;
        if (child + 1 < end && arr[child] < arr[child + 1]) {
            child++;
        }
        if (arr[root] >= arr[child]) break;
        int tmp = arr[root];
        arr[root] = arr[child];
        arr[child] = tmp;
        root = child;
    }
}

void heap_sort(int arr[], int n) {
    for (int start = n / 2 - 1; start >= 0; --start) {
        sift_down(arr, start, n);
    }
    for (int end = n - 1; end > 0; --end) {
        int tmp = arr[0];
        arr[0] = arr[end];
        arr[end] = tmp;
        sift_down(arr, 0, end);
    }
}`,
      rust: `pub fn heap_sort(arr: &mut [i32]) {
    let n = arr.len();
    for start in (0..n / 2).rev() {
        sift_down(arr, start, n);
    }
    for end in (1..n).rev() {
        arr.swap(0, end);
        sift_down(arr, 0, end);
    }
}

fn sift_down(arr: &mut [i32], mut root: usize, end: usize) {
    loop {
        let mut child = 2 * root + 1;
        if child >= end {
            break;
        }
        if child + 1 < end && arr[child] < arr[child + 1] {
            child += 1;
        }
        if arr[root] >= arr[child] {
            break;
        }
        arr.swap(root, child);
        root = child;
    }
}`,
      java: `public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int start = n / 2 - 1; start >= 0; start--) {
        siftDown(arr, start, n);
    }
    for (int end = n - 1; end > 0; end--) {
        int tmp = arr[0];
        arr[0] = arr[end];
        arr[end] = tmp;
        siftDown(arr, 0, end);
    }
}

private static void siftDown(int[] arr, int root, int end) {
    while (true) {
        int child = 2 * root + 1;
        if (child >= end) break;
        if (child + 1 < end && arr[child] < arr[child + 1]) child++;
        if (arr[root] >= arr[child]) break;
        int tmp = arr[root];
        arr[root] = arr[child];
        arr[child] = tmp;
        root = child;
    }
}`,
    },
  },
  shell: {
    pseudocode: `procedure shellSort(A):
  gaps ← sequence (for example 1, 4, 13, …)
  for each gap in gaps descending do
    for i from gap to length(A) - 1 do
      temp ← A[i]
      j ← i
      while j ≥ gap and A[j - gap] > temp do
        A[j] ← A[j - gap]
        j ← j - gap
      A[j] ← temp`,
    implementations: {
      python: `def shell_sort(arr):
    gap = len(arr) // 2
    while gap > 0:
        for i in range(gap, len(arr)):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2`,
      c: `void shell_sort(int arr[], int n) {
    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; ++i) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
      rust: `pub fn shell_sort(arr: &mut [i32]) {
    let mut gap = arr.len() / 2;
    while gap > 0 {
        for i in gap..arr.len() {
            let temp = arr[i];
            let mut j = i;
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2;
    }
}`,
      java: `public static void shellSort(int[] arr) {
    for (int gap = arr.length / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < arr.length; i++) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}`,
    },
  },
  counting: {
    pseudocode: `procedure countingSort(A):
  min ← minimum value in A
  max ← maximum value in A
  count ← array of zeros with size max - min + 1
  for each value x in A do
    count[x - min] ← count[x - min] + 1
  index ← 0
  for i from 0 to length(count) - 1 do
    while count[i] > 0 do
      A[index] ← i + min
      index ← index + 1
      count[i] ← count[i] - 1`,
    implementations: {
      python: `def counting_sort(arr):
    if not arr:
        return
    min_val = min(arr)
    max_val = max(arr)
    count = [0] * (max_val - min_val + 1)
    for value in arr:
        count[value - min_val] += 1
    idx = 0
    for offset, freq in enumerate(count):
        value = offset + min_val
        for _ in range(freq):
            arr[idx] = value
            idx += 1`,
      c: `void counting_sort(int arr[], int n) {
    if (n == 0) return;
    int min = arr[0], max = arr[0];
    for (int i = 1; i < n; ++i) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    int range = max - min + 1;
    int *count = calloc(range, sizeof(int));
    for (int i = 0; i < n; ++i) count[arr[i] - min]++;
    int index = 0;
    for (int i = 0; i < range; ++i) {
        while (count[i]-- > 0) {
            arr[index++] = i + min;
        }
    }
    free(count);
}`,
      rust: `pub fn counting_sort(arr: &mut [i32]) {
    if arr.is_empty() {
        return;
    }
    let min = *arr.iter().min().unwrap();
    let max = *arr.iter().max().unwrap();
    let mut count = vec![0usize; (max - min + 1) as usize];
    for &value in arr.iter() {
        count[(value - min) as usize] += 1;
    }
    let mut idx = 0;
    for (offset, freq) in count.iter().enumerate() {
        let value = min + offset as i32;
        for _ in 0..*freq {
            arr[idx] = value;
            idx += 1;
        }
    }
}`,
      java: `public static void countingSort(int[] arr) {
    if (arr.length == 0) return;
    int min = Arrays.stream(arr).min().getAsInt();
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max - min + 1];
    for (int value : arr) {
        count[value - min]++;
    }
    int idx = 0;
    for (int i = 0; i < count.length; i++) {
        while (count[i]-- > 0) {
            arr[idx++] = i + min;
        }
    }
}`,
    },
  },
  radix: {
    pseudocode: `procedure radixSort(A):
  maxDigits ← number of digits of max(A)
  for digit from least significant to most significant do
    bucket ← array of 10 queues
    for each value x in A do
      d ← digit value of x at current position
      enqueue x into bucket[d]
    concatenate buckets back into A`,
    implementations: {
      python: `def radix_sort(arr):
    if not arr:
        return
    exp = 1
    max_val = max(arr)
    while max_val // exp > 0:
        buckets = [[] for _ in range(10)]
        for value in arr:
            digit = (value // exp) % 10
            buckets[digit].append(value)
        idx = 0
        for bucket in buckets:
            for value in bucket:
                arr[idx] = value
                idx += 1
        exp *= 10`,
      c: `static void counting_sort_exp(int arr[], int n, int exp) {
    int output[n];
    int count[10] = {0};
    for (int i = 0; i < n; ++i) {
        int digit = (arr[i] / exp) % 10;
        count[digit]++;
    }
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        int digit = (arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }
    memcpy(arr, output, sizeof(int) * n);
}

void radix_sort(int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; ++i)
        if (arr[i] > max) max = arr[i];
    for (int exp = 1; max / exp > 0; exp *= 10)
        counting_sort_exp(arr, n, exp);
}`,
      rust: `pub fn radix_sort(arr: &mut [i32]) {
    if arr.is_empty() {
        return;
    }
    let mut exp = 1;
    let max = *arr.iter().max().unwrap();
    let mut output = vec![0; arr.len()];
    while max / exp > 0 {
        let mut count = [0usize; 10];
        for &value in arr.iter() {
            let digit = ((value / exp) % 10) as usize;
            count[digit] += 1;
        }
        for i in 1..10 {
            count[i] += count[i - 1];
        }
        for &value in arr.iter().rev() {
            let digit = ((value / exp) % 10) as usize;
            count[digit] -= 1;
            output[count[digit]] = value;
        }
        arr.copy_from_slice(&output);
        exp *= 10;
    }
}`,
      java: `public static void radixSort(int[] arr) {
    if (arr.length == 0) return;
    int max = Arrays.stream(arr).max().getAsInt();
    int exp = 1;
    int[] output = new int[arr.length];
    while (max / exp > 0) {
        int[] count = new int[10];
        for (int value : arr) {
            count[(value / exp) % 10]++;
        }
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        for (int i = arr.length - 1; i >= 0; i--) {
            int digit = (arr[i] / exp) % 10;
            output[--count[digit]] = arr[i];
        }
        System.arraycopy(output, 0, arr, 0, arr.length);
        exp *= 10;
    }
}`,
    },
  },
  bucket: {
    pseudocode: `procedure bucketSort(A):
  n ← length(A)
  buckets ← array of empty lists
  for each x in A do
    index ← floor(n · x)  (assumes 0 ≤ x < 1)
    append x to buckets[index]
  for each bucket do
    sort bucket (e.g., insertion sort)
  concatenate buckets back into A`,
    implementations: {
      python: `def bucket_sort(arr):
    if not arr:
        return
    n = len(arr)
    buckets = [[] for _ in range(n)]
    min_val, max_val = min(arr), max(arr)
    span = max_val - min_val or 1
    for value in arr:
        index = int((value - min_val) / span * (n - 1))
        buckets[index].append(value)
    idx = 0
    for bucket in buckets:
        bucket.sort()
        for value in bucket:
            arr[idx] = value
            idx += 1`,
      c: `void bucket_sort(float arr[], int n) {
    if (n <= 0) return;
    float min = arr[0], max = arr[0];
    for (int i = 1; i < n; ++i) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    float span = max - min;
    if (span == 0) return;
    int bucketCount = n;
    float **buckets = calloc(bucketCount, sizeof(float *));
    int *sizes = calloc(bucketCount, sizeof(int));
    for (int i = 0; i < n; ++i) {
        int index = (int)((arr[i] - min) / span * (bucketCount - 1));
        buckets[index] = realloc(buckets[index], sizeof(float) * (sizes[index] + 1));
        buckets[index][sizes[index]++] = arr[i];
    }
    int idx = 0;
    for (int i = 0; i < bucketCount; ++i) {
        for (int j = 1; j < sizes[i]; ++j) {
            float key = buckets[i][j];
            int k = j - 1;
            while (k >= 0 && buckets[i][k] > key) {
                buckets[i][k + 1] = buckets[i][k];
                k--;
            }
            buckets[i][k + 1] = key;
        }
        for (int j = 0; j < sizes[i]; ++j) {
            arr[idx++] = buckets[i][j];
        }
        free(buckets[i]);
    }
    free(buckets);
    free(sizes);
}`,
      rust: `pub fn bucket_sort(arr: &mut [f32]) {
    if arr.is_empty() {
        return;
    }
    let min = arr.iter().cloned().fold(f32::INFINITY, f32::min);
    let max = arr.iter().cloned().fold(f32::NEG_INFINITY, f32::max);
    let span = (max - min).max(1e-6);
    let n = arr.len();
    let mut buckets: Vec<Vec<f32>> = vec![Vec::new(); n];
    for &value in arr.iter() {
        let index = ((value - min) / span * (n as f32 - 1.0)).floor() as usize;
        buckets[index].push(value);
    }
    let mut idx = 0;
    for bucket in buckets.iter_mut() {
        bucket.sort_by(|a, b| a.partial_cmp(b).unwrap());
        for &value in bucket.iter() {
            arr[idx] = value;
            idx += 1;
        }
    }
}`,
      java: `public static void bucketSort(float[] arr) {
    if (arr.length == 0) return;
    float min = arr[0], max = arr[0];
    for (float value : arr) {
        min = Math.min(min, value);
        max = Math.max(max, value);
    }
    float span = Math.max(max - min, 1e-6f);
    int bucketCount = arr.length;
    List<List<Float>> buckets = new ArrayList<>(bucketCount);
    for (int i = 0; i < bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }
    for (float value : arr) {
        int index = (int) ((value - min) / span * (bucketCount - 1));
        buckets.get(index).add(value);
    }
    int idx = 0;
    for (List<Float> bucket : buckets) {
        Collections.sort(bucket);
        for (float value : bucket) {
            arr[idx++] = value;
        }
    }
}`,
    },
  },
  tim: {
    pseudocode: `procedure timSort(A):
  run ← 32
  for i from 0 to length(A) step run do
    insertionSort(A[i .. min(i + run, n)))
  size ← run
  while size < length(A) do
    for left from 0 to length(A) step 2·size do
      mid ← left + size - 1
      right ← min(left + 2·size - 1, n - 1)
      merge(A[left..mid], A[mid+1..right])
    size ← 2·size`,
    implementations: {
      python: `def tim_sort(arr):
    RUN = 32

    def insertion(lo, hi):
        for i in range(lo + 1, hi):
            key = arr[i]
            j = i - 1
            while j >= lo and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key

    def merge(lo, mid, hi):
        left = arr[lo:mid]
        right = arr[mid:hi]
        i = j = 0
        k = lo
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                arr[k] = left[i]
                i += 1
            else:
                arr[k] = right[j]
                j += 1
            k += 1
        arr[k:hi] = left[i:] + right[j:]

    n = len(arr)
    for start in range(0, n, RUN):
        insertion(start, min(start + RUN, n))
    size = RUN
    while size < n:
        for left in range(0, n, size * 2):
            mid = min(left + size, n)
            right = min(left + 2 * size, n)
            if mid < right:
                merge(left, mid, right)
        size *= 2`,
      c: `static void insertion(int arr[], int left, int right) {
    for (int i = left + 1; i <= right; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        arr[j + 1] = key;
    }
}

static void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
    for (int i = 0; i < n1; ++i) L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void tim_sort(int arr[], int n) {
    const int RUN = 32;
    for (int i = 0; i < n; i += RUN) {
        insertion(arr, i, fmin(i + RUN - 1, n - 1));
    }
    for (int size = RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = fmin(left + size - 1, n - 1);
            int right = fmin(left + 2 * size - 1, n - 1);
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}`,
      rust: `pub fn tim_sort(arr: &mut [i32]) {
    const RUN: usize = 32;
    let n = arr.len();

    for chunk in arr.chunks_mut(RUN) {
        insertion_sort(chunk);
    }

    let mut size = RUN;
    while size < n {
        let mut left = 0;
        while left < n {
            let mid = (left + size).min(n);
            let right = (left + 2 * size).min(n);
            if mid < right {
                merge(&mut arr[left..right], mid - left);
            }
            left += 2 * size;
        }
        size *= 2;
    }
}

fn insertion_sort(arr: &mut [i32]) {
    for i in 1..arr.len() {
        let key = arr[i];
        let mut j = i;
        while j > 0 && arr[j - 1] > key {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = key;
    }
}

fn merge(arr: &mut [i32], mid: usize) {
    let mut merged = arr.to_vec();
    let (left, right) = arr.split_at(mid);
    merge_slices(left, right, &mut merged[..]);
    arr.copy_from_slice(&merged);
}

fn merge_slices(left: &[i32], right: &[i32], out: &mut [i32]) {
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            out[k] = left[i];
            i += 1;
        } else {
            out[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    out[k..(k + left.len() - i)].copy_from_slice(&left[i..]);
    k += left.len() - i;
    out[k..(k + right.len() - j)].copy_from_slice(&right[j..]);
}`,
      java: `public static void timSort(int[] arr) {
    final int RUN = 32;
    for (int i = 0; i < arr.length; i += RUN) {
        insertionSort(arr, i, Math.min(i + RUN - 1, arr.length - 1));
    }
    for (int size = RUN; size < arr.length; size *= 2) {
        for (int left = 0; left < arr.length; left += 2 * size) {
            int mid = Math.min(left + size - 1, arr.length - 1);
            int right = Math.min(left + 2 * size - 1, arr.length - 1);
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}

private static void insertionSort(int[] arr, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
    },
  },
  comb: {
    pseudocode: `procedure combSort(A):
  gap ← length(A)
  shrink ← 1.3
  swapped ← true
  while gap > 1 or swapped do
    gap ← max(1, floor(gap / shrink))
    swapped ← false
    for i from 0 to length(A) - gap - 1 do
      if A[i] > A[i + gap] then
        swap A[i], A[i + gap]
        swapped ← true`,
    implementations: {
      python: `def comb_sort(arr):
    gap = len(arr)
    shrink = 1.3
    swapped = True
    while gap > 1 or swapped:
        gap = max(1, int(gap / shrink))
        swapped = False
        for i in range(0, len(arr) - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                swapped = True`,
      c: `void comb_sort(int arr[], int n) {
    int gap = n;
    int swapped = 1;
    const float shrink = 1.3f;
    while (gap > 1 || swapped) {
        gap = (int)(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = 0;
        for (int i = 0; i + gap < n; ++i) {
            if (arr[i] > arr[i + gap]) {
                int tmp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = tmp;
                swapped = 1;
            }
        }
    }
}`,
      rust: `pub fn comb_sort(arr: &mut [i32]) {
    let mut gap = arr.len();
    let mut swapped = true;
    while gap > 1 || swapped {
        gap = (gap as f32 / 1.3).floor() as usize;
        if gap == 0 {
            gap = 1;
        }
        swapped = false;
        for i in 0..arr.len().saturating_sub(gap) {
            if arr[i] > arr[i + gap] {
                arr.swap(i, i + gap);
                swapped = true;
            }
        }
    }
}`,
      java: `public static void combSort(int[] arr) {
    int gap = arr.length;
    boolean swapped = true;
    final double shrink = 1.3;
    while (gap > 1 || swapped) {
        gap = (int) (gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;
        for (int i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                int tmp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = tmp;
                swapped = true;
            }
        }
    }
}`,
    },
  },
  cocktail: {
    pseudocode: `procedure cocktailShakerSort(A):
  start ← 0
  end ← length(A) - 1
  swapped ← true
  while swapped do
    swapped ← false
    for i from start to end - 1 do
      if A[i] > A[i + 1] then
        swap A[i], A[i + 1]
        swapped ← true
    if not swapped then break
    swapped ← false
    end ← end - 1
    for i from end - 1 downto start do
      if A[i] > A[i + 1] then
        swap A[i], A[i + 1]
        swapped ← true
    start ← start + 1`,
    implementations: {
      python: `def cocktail_shaker_sort(arr):
    start = 0
    end = len(arr) - 1
    swapped = True
    while swapped:
        swapped = False
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break
        swapped = False
        end -= 1
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        start += 1`,
      c: `void cocktail_shaker_sort(int arr[], int n) {
    int start = 0, end = n - 1;
    int swapped = 1;
    while (swapped) {
        swapped = 0;
        for (int i = start; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                int tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
        swapped = 0;
        --end;
        for (int i = end - 1; i >= start; --i) {
            if (arr[i] > arr[i + 1]) {
                int tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = 1;
            }
        }
        ++start;
    }
}`,
      rust: `pub fn cocktail_shaker_sort(arr: &mut [i32]) {
    if arr.is_empty() {
        return;
    }
    let mut start = 0usize;
    let mut end = arr.len() - 1;
    let mut swapped = true;
    while swapped {
        swapped = false;
        for i in start..end {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                swapped = true;
            }
        }
        if !swapped {
            break;
        }
        swapped = false;
        if end == 0 {
            break;
        }
        end -= 1;
        for i in (start..=end - 1).rev() {
            if arr[i] > arr[i + 1] {
                arr.swap(i, i + 1);
                swapped = true;
            }
        }
        start += 1;
    }
}`,
      java: `public static void cocktailShakerSort(int[] arr) {
    int start = 0;
    int end = arr.length - 1;
    boolean swapped = true;
    while (swapped) {
        swapped = false;
        for (int i = start; i < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (int i = end - 1; i >= start; i--) {
            if (arr[i] > arr[i + 1]) {
                int tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
                swapped = true;
            }
        }
        start++;
    }
}`,
    },
  },
  bogo: {
    pseudocode: `procedure bogoSort(A):
  while not isSorted(A) do
    shuffle(A)

function isSorted(A):
  for i from 1 to length(A) - 1 do
    if A[i - 1] > A[i] then return false
  return true`,
    implementations: {
      python: `import random

def bogo_sort(arr):
    while not is_sorted(arr):
        random.shuffle(arr)

def is_sorted(arr):
    return all(arr[i - 1] <= arr[i] for i in range(1, len(arr)))`,
      c: `int is_sorted(int arr[], int n) {
    for (int i = 1; i < n; ++i)
        if (arr[i - 1] > arr[i]) return 0;
    return 1;
}

void shuffle(int arr[], int n) {
    for (int i = n - 1; i > 0; --i) {
        int j = rand() % (i + 1);
        int tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

void bogo_sort(int arr[], int n) {
    while (!is_sorted(arr, n)) {
        shuffle(arr, n);
    }
}`,
      rust: `use rand::seq::SliceRandom;
use rand::thread_rng;

pub fn bogo_sort(arr: &mut [i32]) {
    let mut rng = thread_rng();
    while !is_sorted(arr) {
        arr.shuffle(&mut rng);
    }
}

fn is_sorted(arr: &[i32]) -> bool {
    arr.windows(2).all(|w| w[0] <= w[1])
}`,
      java: `private static boolean isSorted(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

public static void bogoSort(int[] arr) {
    ThreadLocalRandom random = ThreadLocalRandom.current();
    while (!isSorted(arr)) {
        for (int i = arr.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
}`,
    },
  },
};
