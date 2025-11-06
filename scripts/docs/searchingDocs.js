export const searchingDocs = {
  linear: {
    pseudocode: `procedure linearSearch(A, target):
  for i from 0 to length(A) - 1 do
    if A[i] = target then
      return i
  return -1`,
    implementations: {
      python: `def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1`,
      c: `int linear_search(const int arr[], int n, int target) {
    for (int i = 0; i < n; ++i) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
      rust: `pub fn linear_search(arr: &[i32], target: i32) -> Option<usize> {
    for (i, &value) in arr.iter().enumerate() {
        if value == target {
            return Some(i);
        }
    }
    None
}`,
      java: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    },
  },
  binary: {
    pseudocode: `procedure binarySearch(A, target):
  low ← 0
  high ← length(A) - 1
  while low ≤ high do
    mid ← ⌊(low + high) / 2⌋
    if A[mid] = target then
      return mid
    else if A[mid] < target then
      low ← mid + 1
    else
      high ← mid - 1
  return -1`,
    implementations: {
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      c: `int binary_search(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
      rust: `pub fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut low = 0;
    let mut high = arr.len().wrapping_sub(1);
    while low <= high {
        let mid = low + (high - low) / 2;
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => low = mid + 1,
            std::cmp::Ordering::Greater => {
                if mid == 0 {
                    break;
                }
                high = mid - 1;
            }
        }
    }
    None
}`,
      java: `public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}`,
    },
  },
  jump: {
    pseudocode: `procedure jumpSearch(A, target):
  n ← length(A)
  step ← ⌊√n⌋
  prev ← 0
  while A[min(step, n) - 1] < target do
    prev ← step
    step ← step + ⌊√n⌋
    if prev ≥ n then return -1
  for i from prev to min(step, n) - 1 do
    if A[i] = target then return i
  return -1`,
    implementations: {
      python: `import math

def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    return -1`,
      c: `int jump_search(const int arr[], int n, int target) {
    int step = (int)floor(sqrt(n));
    int prev = 0;
    while (prev < n && arr[min(step, n) - 1] < target) {
        prev = step;
        step += (int)floor(sqrt(n));
        if (prev >= n) return -1;
    }
    for (int i = prev; i < min(step, n); ++i) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      rust: `pub fn jump_search(arr: &[i32], target: i32) -> Option<usize> {
    let n = arr.len();
    if n == 0 {
        return None;
    }
    let step = (n as f64).sqrt().floor() as usize;
    let mut prev = 0;
    let mut next = step;
    while prev < n && arr[next.min(n) - 1] < target {
        prev = next;
        next += step;
        if prev >= n {
            return None;
        }
    }
    for idx in prev..next.min(n) {
        if arr[idx] == target {
            return Some(idx);
        }
    }
    None
}`,
      java: `public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.floor(Math.sqrt(n));
    int prev = 0;
    while (prev < n && arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    for (int i = prev; i < Math.min(step, n); i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
    },
  },
  exponential: {
    pseudocode: `procedure exponentialSearch(A, target):
  if A[0] = target then return 0
  bound ← 1
  while bound < length(A) and A[bound] < target do
    bound ← bound · 2
  return binarySearch(A, target, bound / 2, min(bound, length(A) - 1))`,
    implementations: {
      python: `def exponential_search(arr, target):
    if not arr:
        return -1
    if arr[0] == target:
        return 0
    bound = 1
    while bound < len(arr) and arr[bound] < target:
        bound *= 2
    low = bound // 2
    high = min(bound, len(arr) - 1)
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
      c: `int binary_search_range(const int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int exponential_search(const int arr[], int n, int target) {
    if (n == 0) return -1;
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] < target) {
        bound *= 2;
    }
    int low = bound / 2;
    int high = bound < n ? bound : n - 1;
    return binary_search_range(arr, low, high, target);
}`,
      rust: `pub fn exponential_search(arr: &[i32], target: i32) -> Option<usize> {
    if arr.is_empty() {
        return None;
    }
    if arr[0] == target {
        return Some(0);
    }
    let mut bound = 1usize;
    while bound < arr.len() && arr[bound] < target {
        bound *= 2;
    }
    let low = bound / 2;
    let high = bound.min(arr.len() - 1);
    binary_search_range(arr, target, low, high)
}

fn binary_search_range(arr: &[i32], target: i32, mut low: usize, mut high: usize) -> Option<usize> {
    while low <= high {
        let mid = low + (high - low) / 2;
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => low = mid + 1,
            std::cmp::Ordering::Greater => {
                if mid == 0 {
                    break;
                }
                high = mid - 1;
            }
        }
    }
    None
}`,
      java: `public static int exponentialSearch(int[] arr, int target) {
    if (arr.length == 0) return -1;
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < arr.length && arr[bound] < target) {
        bound *= 2;
    }
    int low = bound / 2;
    int high = Math.min(bound, arr.length - 1);
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    },
  },
  interpolation: {
    pseudocode: `procedure interpolationSearch(A, target):
  low ← 0
  high ← length(A) - 1
  while low ≤ high and target within A[low..high] do
    if A[low] = A[high] then
      if A[low] = target then return low else break
    pos ← low + (target - A[low]) · (high - low) / (A[high] - A[low])
    if A[pos] = target then return pos
    else if A[pos] < target then low ← pos + 1
    else high ← pos - 1
  return -1`,
    implementations: {
      python: `def interpolation_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high and target >= arr[low] and target <= arr[high]:
        if arr[low] == arr[high]:
            return low if arr[low] == target else -1
        pos = low + (target - arr[low]) * (high - low) // (arr[high] - arr[low])
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`,
      c: `int interpolation_search(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[low] == arr[high]) {
            return arr[low] == target ? low : -1;
        }
        int pos = low + (int)((double)(target - arr[low]) * (high - low) / (arr[high] - arr[low]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
      rust: `pub fn interpolation_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut low = 0usize;
    let mut high = arr.len().wrapping_sub(1);
    while low <= high && target >= arr[low] && target <= arr[high] {
        if arr[low] == arr[high] {
            return if arr[low] == target { Some(low) } else { None };
        }
        let pos = low + (((target - arr[low]) as usize * (high - low)) / (arr[high] - arr[low]) as usize);
        if arr[pos] == target {
            return Some(pos);
        }
        if arr[pos] < target {
            low = pos + 1;
        } else {
            if pos == 0 {
                break;
            }
            high = pos - 1;
        }
    }
    None
}`,
      java: `public static int interpolationSearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (arr[low] == arr[high]) {
            return arr[low] == target ? low : -1;
        }
        int pos = low + (int)((long)(target - arr[low]) * (high - low) / (arr[high] - arr[low]));
        if (arr[pos] == target) {
            return pos;
        }
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}`,
    },
  },
  fibonacci: {
    pseudocode: `procedure fibonacciSearch(A, target):
  fibM2 ← 0, fibM1 ← 1, fibM ← fibM1 + fibM2
  while fibM < length(A) do
    fibM2 ← fibM1
    fibM1 ← fibM
    fibM ← fibM1 + fibM2
  offset ← -1
  while fibM > 1 do
    i ← min(offset + fibM2, length(A) - 1)
    if A[i] < target then
      fibM ← fibM1
      fibM1 ← fibM2
      fibM2 ← fibM - fibM1
      offset ← i
    else if A[i] > target then
      fibM ← fibM2
      fibM1 ← fibM1 - fibM2
      fibM2 ← fibM - fibM1
    else
      return i
  if fibM1 = 1 and A[offset + 1] = target then return offset + 1
  return -1`,
    implementations: {
      python: `def fibonacci_search(arr, target):
    fib_m2, fib_m1 = 0, 1
    fib_m = fib_m1 + fib_m2
    while fib_m < len(arr):
        fib_m2, fib_m1 = fib_m1, fib_m
        fib_m = fib_m1 + fib_m2
    offset = -1
    while fib_m > 1:
        i = min(offset + fib_m2, len(arr) - 1)
        if arr[i] < target:
            fib_m, fib_m1, fib_m2 = fib_m1, fib_m2, fib_m1 - fib_m2
            offset = i
        elif arr[i] > target:
            fib_m, fib_m1, fib_m2 = fib_m2, fib_m1 - fib_m2, fib_m - fib_m1
        else:
            return i
    if fib_m1 and offset + 1 < len(arr) and arr[offset + 1] == target:
        return offset + 1
    return -1`,
      c: `int fibonacci_search(const int arr[], int n, int target) {
    int fibM2 = 0, fibM1 = 1;
    int fibM = fibM1 + fibM2;
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM1 + fibM2;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = min(offset + fibM2, n - 1);
        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else {
            return i;
        }
    }
    if (fibM1 && offset + 1 < n && arr[offset + 1] == target) {
        return offset + 1;
    }
    return -1;
}`,
      rust: `pub fn fibonacci_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut fib_m2 = 0usize;
    let mut fib_m1 = 1usize;
    let mut fib_m = fib_m1 + fib_m2;
    while fib_m < arr.len() {
        fib_m2 = fib_m1;
        fib_m1 = fib_m;
        fib_m = fib_m1 + fib_m2;
    }
    let mut offset: isize = -1;
    while fib_m > 1 {
        let i = ((offset + fib_m2 as isize).min((arr.len() - 1) as isize)) as usize;
        if arr[i] < target {
            fib_m = fib_m1;
            fib_m1 = fib_m2;
            fib_m2 = fib_m - fib_m1;
            offset = i as isize;
        } else if arr[i] > target {
            fib_m = fib_m2;
            fib_m1 = fib_m1 - fib_m2;
            fib_m2 = fib_m - fib_m1;
        } else {
            return Some(i);
        }
    }
    if fib_m1 == 1 && (offset + 1) < arr.len() as isize {
        let idx = (offset + 1) as usize;
        if arr[idx] == target {
            return Some(idx);
        }
    }
    None
}`,
      java: `public static int fibonacciSearch(int[] arr, int target) {
    int fibMm2 = 0;
    int fibMm1 = 1;
    int fibM = fibMm1 + fibMm2;
    while (fibM < arr.length) {
        fibMm2 = fibMm1;
        fibMm1 = fibM;
        fibM = fibMm1 + fibMm2;
    }
    int offset = -1;
    while (fibM > 1) {
        int i = Math.min(offset + fibMm2, arr.length - 1);
        if (arr[i] < target) {
            fibM = fibMm1;
            fibMm1 = fibMm2;
            fibMm2 = fibM - fibMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMm2;
            fibMm1 = fibMm1 - fibMm2;
            fibMm2 = fibM - fibMm1;
        } else {
            return i;
        }
    }
    if (fibMm1 == 1 && offset + 1 < arr.length && arr[offset + 1] == target) {
        return offset + 1;
    }
    return -1;
}`,
    },
  },
};
