---
title: "Working with Streams and Lambda Expression"
date: "2024-09-14"
excerpt: "High-density notes on Java functional interfaces, stream pipelines, Optionals, reductions, collectors, and parallel processing rules."

tags: "java,streams,lambda"
source: "https://shrikant-havale.in/2024/09/14/working-with-streams-and-lambda-expression/"
---

A practical checklist for Java functional programming and stream APIs.

## Standard Functional Interfaces

- `Consumer<T>`: accepts input, returns nothing.
- `Supplier<T>`: accepts nothing, returns a value.
- `Function<T, R>`: transforms input to output.
- `Predicate<T>`: tests and returns `boolean`.
- Primitive specializations reduce boxing (`IntFunction`, `ToIntFunction`, `DoubleSupplier`, etc.).

## Streams Basics

- Streams are single-use; reusing a consumed stream throws `IllegalStateException`.
- Infinite sources (`generate`, `iterate`) typically require `limit()`.
- `peek()` does nothing unless a terminal operation exists.
- `sorted(...)` is valid; `sort(...)` is not a `Stream` method.

## Finding Elements

- `findAny()` may return any element.
- `findFirst()` respects encounter order on ordered streams.

## Primitive Streams and Optionals

- `DoubleStream.average()` returns `OptionalDouble`.
- Empty optional values throw on direct `get...()` calls.

```java
IntStream.empty().average().getAsDouble(); // throws NoSuchElementException
```

## `map()` vs `flatMap()`

- `map()` => one output per input.
- `flatMap()` => zero or more outputs per input (must return streams).

## Reduction

- Reductions combine values into one result.
- `sum`, `min`, `max`, `count` are common reductions.
- Accumulators should be associative and stateless, especially in parallel streams.

## Grouping and Partitioning

- `groupingBy(...)` groups by a classifier and returns a `Map`.
- `partitioningBy(...)` groups by boolean predicate.
- For parallel collection scenarios, use concurrent collectors when appropriate.

## Lambdas and Method References

- Lambdas are compact implementations of functional interfaces.
- Avoid stateful lambdas in stream pipelines.
- Method references use type inference and can target constructors and methods.

## Parallel Stream Notes

- `parallel()` is for streams; `parallelStream()` is for collections.
- Some operations (`limit`, `skip`, `forEachOrdered`) can reduce parallel gains.
- Parallel behavior requires careful collector and ordering choices.

## Source

Original post: https://shrikant-havale.in/2024/09/14/working-with-streams-and-lambda-expression/
