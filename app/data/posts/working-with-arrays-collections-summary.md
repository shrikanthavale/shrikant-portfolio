---
title: "Working with Arrays & Collections Summary"
date: "2024-08-16"
excerpt: "A quick-reference summary for arrays, collections, generics, sorting/searching, null behavior, and comparators in Java."

tags: "java,collections,arrays"
source: "https://shrikant-havale.in/2024/08/16/working-with-arrays-collections-summary/"
---

This is a focused summary of practical Java collection and array behavior.

## Deque Notes

- `ArrayDeque` is a `Deque` implementation.
- Useful operations:
  - Add to tail: `offer`, `offerLast`
  - Read head: `peek`, `peekFirst`
  - Push front: `push`, `offerFirst`, `addFirst`
  - Remove head: `poll`, `pop`, `removeFirst`
  - Remove tail: `removeLast`

## Arrays

- With `{...}` initializer, size is inferred.
- Without initializer, size is required.
- `Arrays.sort(...)` and `Arrays.binarySearch(...)` are standard methods.
- `binarySearch` expects correctly sorted input.
- `Arrays.mismatch(a, b)` returns first differing index, or `-1` if equal.

## Generics and Wildcards

- `?` wildcard is valid in declarations but not when instantiating concrete types on RHS.
- Always prefer explicit type parameters on declarations.
- Diamond operator `<>` helps avoid duplicate type declarations.

## Collections

- `Map` is part of the Collections Framework but does not implement `Collection`.
- `Collections.binarySearch(...)` requires matching sort order and comparator.

## Null Handling

- `TreeSet` rejects `null` due to comparison requirements.
- `HashSet` allows one `null`.
- `ArrayList` and `LinkedList` allow multiple `null` values.

## Comparable vs Comparator

- `Comparable<T>` => implement `compareTo(T)`.
- `Comparator<T>` => implement `compare(T, T)`.
- Comparator chains and reversals (`reversed()`) are useful for custom sort logic.

## Immutable Factories

- `List.of(...)`, `Set.of(...)` => immutable collections from values.
- `List.copyOf(...)`, `Set.copyOf(...)` => immutable copies.

## Source

Original post: https://shrikant-havale.in/2024/08/16/working-with-arrays-collections-summary/
