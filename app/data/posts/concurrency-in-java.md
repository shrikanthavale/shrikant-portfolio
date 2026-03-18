---
title: "Concurrency in Java explained"
date: "2023-08-12"
excerpt: "A practical example of race conditions in bank-account updates and how synchronization prevents overdraw scenarios."

tags: "java,concurrency,threads"
source: "https://shrikant-havale.in/2023/08/12/concurrency-in-java/"
---

When a Java program runs on a single thread, behavior is usually predictable. With multiple threads, race conditions can produce inconsistent outcomes.

## Problem Scenario

Two threads attempt to withdraw from the same account concurrently:

- Both check available balance.
- Both pass validation.
- Both withdraw.
- Balance can become overdrawn.

## Example

```java
public class ConcurrencyInJava {

    public static void main(String[] args) {
        final BankAccount bankAccount = new BankAccount(100);
        final WithdrawMoney withdrawMoney1 = new WithdrawMoney(bankAccount, 10);
        final WithdrawMoney withdrawMoney2 = new WithdrawMoney(bankAccount, 100);

        // Run concurrently (example setup omitted for brevity)
    }

    static class WithdrawMoney implements Runnable {
        private final BankAccount bankAccount;
        private final int amountToWithdraw;

        WithdrawMoney(final BankAccount bankAccount, final int amountToWithdraw) {
            this.bankAccount = bankAccount;
            this.amountToWithdraw = amountToWithdraw;
        }

        @Override
        public void run() {
            synchronized (bankAccount) {
                if (bankAccount.balance > amountToWithdraw) {
                    bankAccount.spendAmount(amountToWithdraw);
                }
            }
        }
    }

    static class BankAccount {
        private int balance;

        BankAccount(int balance) {
            this.balance = balance;
        }

        public void spendAmount(int amountToSpend) {
            balance = balance - amountToSpend;
        }
    }
}
```

## Why `synchronized` Works

The critical operation is a two-step transaction:

1. Check balance
2. Withdraw amount

Locking ensures both steps execute atomically for a given account object.

## Source

Original post: https://shrikant-havale.in/2023/08/12/concurrency-in-java/
