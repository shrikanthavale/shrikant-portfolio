---
title: "Accessing databases using JDBC"
date: "2023-09-27"
excerpt: "A practical comparison of JDBC and JPA, and how Java applications access relational databases."

tags: "java,jdbc,jpa"
source: "https://www.shrikant-havale.in/blog/access-database-using-jdbc"
---

This post introduces Java database access with JDBC and compares it with JPA.

## JDBC vs JPA

### JDBC

- Lower-level API for database access.
- Works directly with SQL, rows, and columns.
- Requires driver support for each database vendor.

### JPA

- Higher-level persistence API based on ORM.
- Works with Java entities and object mapping.
- Relies on provider implementations and database drivers.

## Practical Takeaway

Use JDBC when you need low-level SQL control. Use JPA when productivity and object mapping are primary concerns.

## Source

Original post: https://www.shrikant-havale.in/blog/access-database-using-jdbc
