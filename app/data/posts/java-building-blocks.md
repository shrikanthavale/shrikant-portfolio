---
title: "Java Building Blocks"
date: "2024-10-06"
excerpt: "A practical summary of Java fundamentals: entry points, imports, compilation, classpath, literals, wrappers, text blocks, and garbage collection."

tags: "java,language-basics,certification"
source: "https://www.shrikant-havale.in/blog/java-building-blocks"
---

This article is a compact, exam-focused set of Java fundamentals and command-line basics.

## Program Entry Point

- The `main` method accepts multiple valid parameter forms:
  - `String[] args`
  - `String args[]`
  - `String... args`
- `final` modifiers are optional in `main` signatures.

```java
public static void main(String[] args) {}
public final static void main(final String[] args) {}
```

## Launching Single-File Programs

- Standard compile/run flow:

```bash
javac Zoo.java
java Zoo
```

- Single-file launch shortcut:

```bash
java Zoo.java one two
```

## Imports and Packages

- `java.lang` is auto-imported.
- Wildcards only apply at one package level.
- Class imports take precedence over wildcard imports.
- Classes in the same package do not need explicit imports.

```java
import java.util.Random;
Random r = new Random();
int n = r.nextInt(10);
```

## `javac` and `java` Commands

### Compile

```bash
javac packagea/ClassA.java packageb/ClassB.java
javac -d classes packagea/ClassA.java packageb/ClassB.java
```

### Classpath

```bash
javac -cp "C:\\temp\\directoryWithJars\\*" myPackage/MyClass.java
java -cp classes packageb.ClassB
```

- On Windows, classpath entries are separated by `;`.
- On macOS/Linux, classpath entries are separated by `:`.

## `jar` Command Basics

```bash
jar -cvf test.jar .
jar --create --verbose --file test.jar .
jar -cvf test.jar -C dir .
```

## Initialization Order

- Fields and instance initializer blocks run in declaration order.
- Constructor runs after fields/initializers.

## Numeric Literals and Types

- `float` literals require `f`/`F`.
- `long` literals often require `L`.
- Supports octal (`017`), hex (`0xFF`), binary (`0b10`).
- Numeric underscores are allowed with placement rules.

## Wrapper Classes

```java
int primitive = Integer.parseInt("123");
Integer wrapper = Integer.valueOf("123");
Double apple = Double.valueOf("200.99");
```

Useful conversions include `intValue()`, `longValue()`, `doubleValue()`, etc.

## Text Blocks

- Require a line break after opening `"""`.
- Incidental whitespace is trimmed relative to left margin rules.

## Identifiers and `var`

- Identifiers cannot start with numbers.
- `_` alone is not a valid identifier.
- Reserved words and literals (`true`, `false`, `null`) cannot be used as variable names.
- `var` is for local variable inference only.

## Garbage Collection Notes

- `System.gc()` is only a request.
- Objects become GC-eligible when no accessible references remain.

```java
public class Bear {
    private Bear pandaBear;

    private void roar(Bear b) {
        System.out.println("Roar!");
        pandaBear = b;
    }

    public static void main(String[] args) {
        Bear brownBear = new Bear();
        Bear polarBear = new Bear();
        brownBear.roar(polarBear);
        polarBear = null;
        brownBear = null;
        System.gc();
    }
}
```

## Source

Original post: https://www.shrikant-havale.in/blog/java-building-blocks
