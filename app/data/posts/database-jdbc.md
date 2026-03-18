---
title: "Database & JDBC"
date: "2024-09-28"
excerpt: "JDBC fundamentals: core interfaces, connection APIs, prepared/callable statements, bind variables, and ResultSet behavior."

tags: "java,jdbc,database"
source: "https://shrikant-havale.in/2024/09/28/database-jdbc/"
---

A concise reference for JDBC basics and common interview/exam details.

## JDBC Core Concepts

- JDBC drivers provide concrete implementations for each database vendor.
- Core interfaces live under `java.sql`:
  - `Driver`
  - `Connection`
  - `PreparedStatement`
  - `CallableStatement`
  - `ResultSet`

## JDBC URL

JDBC URLs follow:

```text
protocol:subprotocol:subname
```

- Protocol is always `jdbc`.
- Subprotocol is typically the database name.
- Subname format depends on vendor.

## Connections

`DriverManager.getConnection(...)` throws checked `SQLException`.

```java
DriverManager.getConnection("connection-string");
DriverManager.getConnection("connection-string", "username", "password");
```

## Statements

- `PreparedStatement` extends `Statement` and supports bind parameters.
- `CallableStatement` extends `Statement` and is used for stored procedures.

```java
PreparedStatement ps = conn.prepareStatement("update ...");
int updated = ps.executeUpdate();
```

```java
PreparedStatement ps = conn.prepareStatement("select ...");
ResultSet rs = ps.executeQuery();
```

`execute()` returns a boolean:

- `true` => result is a `ResultSet`
- `false` => use update count

## Bind Variables

- Indexing starts at `1` (not `0`).
- Missing or extra bind variables cause `SQLException`.

## ResultSet Safety

`SQLException` can occur when:

- Accessing a non-existing column name/index.
- Reading when cursor is not on a valid row.

## Source

Original post: https://shrikant-havale.in/2024/09/28/database-jdbc/
