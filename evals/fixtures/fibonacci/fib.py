def fib(n):
    """Return the nth Fibonacci number (0-indexed).

    Raises ValueError for negative n.
    Uses iterative approach — O(n) time, O(1) space.
    """
    if n < 0:
        raise ValueError(f"n must be non-negative, got {n}")
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b


def fib_sequence(count):
    """Return a list of the first `count` Fibonacci numbers."""
    if count < 0:
        raise ValueError(f"count must be non-negative, got {count}")
    return [fib(i) for i in range(count)]


if __name__ == "__main__":
    print(fib_sequence(10))  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
