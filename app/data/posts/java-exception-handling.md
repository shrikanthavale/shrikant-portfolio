---
title: "Java Handling Exceptions Summary"
date: "2024-08-06"
excerpt: "Core exception-handling notes covering constructors, checked vs unchecked exceptions, and try-with-resources behavior."

tags: "java,exceptions,error-handling"
source: "https://shrikant-havale.in/2024/08/06/java-exception-handling/"
---

A concise summary of Java exception handling fundamentals.

## Exception Constructors

`Exception` supports multiple constructor signatures including:

- no-arg
- message-only
- cause-only
- message + cause
- advanced constructor with suppression and writable stack trace flags

## `AutoCloseable`

- `AutoCloseable` defines `close()`.
- Overridden `close()` may throw narrower/no exceptions.
- In try-with-resources, resources close in reverse declaration order.
- If both try block and close throw exceptions, close exceptions are suppressed.

## Try-with-Resources

- Supports multiple resources.
- Variables in resource list must be final or effectively final.

## Checked vs Unchecked

- `RuntimeException` and subclasses are unchecked.
- `IOException` is checked.
- Custom exceptions extending `Exception` are checked unless extending `RuntimeException`.

## Catching Broad Types

- Catching `Throwable` or `Error` is generally discouraged in application code.

## Source

Original post: https://shrikant-havale.in/2024/08/06/java-exception-handling/
