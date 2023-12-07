---
title: Lattice
date: 2023-11-19T18:19:24.000+08:00
aliases:
- 格
---

**格**（Lattice）：如果一个 [[Partially Ordered Set|偏序集合]] 中，其任意两个元素的子集都有最小上界和最大下界，那么这个偏序集合就是一个格。$a \vee b$ 表示 $\operatorname{LUB}({a,b})$，$a \wedge b$ 表示 $\operatorname{GLB}({a,b})$。

**LUB**（Least Upper Bound）：$a$ 是最小上界，即没有比 $a$ 更小的上界 $a'$。

**GLB**（Greatest Lower Bound）：$a$ 是最大下界，即没有比 $a$ 更大的下界 $a'$。

## 交和并

交（$\land$）是指在格结构中，给定两个元素 $a$ 和 $b$，找到它们的最大下界。换句话说，交是指在格中找到一个元素，它既大于等于 $a$ 又大于等于 $b$，并且没有其他元素同时满足这两个条件。交运算可以看作是取两个元素的共同特征的操作。

并（$\lor$）是指在格结构中，给定两个元素 $a$ 和 $b$，找到它们的最小上界。换句话说，并是指在格中找到一个元素，它既小于等于 $a$ 又小于等于 $b$，并且没有其他元素同时满足这两个条件。并运算可以看作是取两个元素的共同包容的操作。

在格结构中，交和并运算具有以下性质：

1. 交和并运算都是二元运算，即需要两个元素作为输入。
2. 交和并运算分别都是可结合的，即对于任意三个元素 $a$、$b$ 和 $c$，有 $(a\land b)\land c = a\land (b\land c)$ 和 $(a\lor b)\lor c = a\lor (b\lor c)$。
3. 交和并运算都是可交换的，即对于任意两个元素 $a$ 和 $b$，有 $a\land b = b\land a$ 和 $a\lor b = b\lor a$。
4. 交和并运算都满足吸收律，即对于任意元素 $a$ 和 $b$，有 $a\land (a\lor b) = a$ 和 $a\lor (a\land b) = a$。

假设我们有一个格结构，其中元素的集合为 $\{1, 2, 3, 4, 5\}$，并且给定以下关系：

- 元素 a 和 b 之间存在关系 $R$，当且仅当 a 能整除 b。

现在我们来计算一些例子：

1. 交运算（$\land$）：

    - 对于元素 2 和 4，它们的最大下界是 2，因为 2 既能整除 2 又能整除 4，并且没有其他元素同时满足这两个条件，所以 $2\land 4 = 2$。
    - 对于元素 3 和 5，它们的最大下界是 1，因为 1 既能整除 3 又能整除 5，并且没有其他元素同时满足这两个条件，所以 $3\land 5 = 1$。
2. 并运算（$\lor$）：

    - 对于元素 2 和 4，它们的最小上界是 4，因为 4 既能被 2 整除又能被 4 整除，并且没有其他元素同时满足这两个条件，所以 $2\lor 4 = 4$。
    - 对于元素 3 和 5，它们的最小上界是 15，因为 15 既能被 3 整除又能被 5 整除，并且没有其他元素同时满足这两个条件，所以 $3\lor 5 = 15$。

## 布尔代数格

布尔代数格（Boolean Algebra Lattice）：布尔代数格是一种特殊的格，它满足以下额外条件：

  - 对于任意元素 $a \in S$，存在其补元素（complement） $a'$，使得 $a \vee a' = 1$ 和 $a \wedge a' = 0$。

^boolean-algebra-lattice