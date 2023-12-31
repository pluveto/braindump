---
date: 2023-11-23T08:32:51.000+08:00
aliases:
  - 左陪集
---

**左陪集（Left Coset）** 是群论中的一个重要概念。给定一个群 $G$ 和它的一个子群 $H$，对于 $G$ 中的一个元素 $g$，可以构造出由 $g$ 和 $H$ 中元素的乘积所组成的集合，即左陪集。左陪集记作 $gH$，定义为 $\{gh : h \in H\}$。

换句话说，左陪集 $gH$ 是由将 $g$ 与 $H$ 中的每个元素进行运算所得到的结果组成的集合。

左陪集具有一些特点。

1. 左陪集中的元素具有相同的个数，即与子群 $H$ 的阶相等。
2. 左陪集之间要么是相等的，要么是不相交的。这意味着群 $G$ 可以被左陪集划分为一些 [[Equivalence Class|等价类]]。

## 例子

例子 1：

考虑群 $G = (\mathbb{Z}, +)$，即整数集上的加法群，以及子群 $H = 2\mathbb{Z}$，即由所有偶数组成的子群。

左陪集 $0 + 2\mathbb{Z}$ 包含所有与 0 在模 2 下同余的整数。换句话说，它包含所有偶数。

左陪集 $1 + 2\mathbb{Z}$ 包含所有与 1 在模 2 下同余的整数。换句话说，它包含所有奇数。

左陪集$1 + 2\mathbb{Z}$和$2\mathbb{Z}$一起构成了整数群$\mathbb{Z}$的一个商群$\mathbb{Z}/2\mathbb{Z}$，这个商群只有两个元素：偶数子群$2\mathbb{Z}$本身
和左陪集$1 + 2\mathbb{Z}$。

问：为什么这里会引入加法？

我们需要使用群的运算来定义陪集。可以使用加法、乘法等诸多二元关系来构造。

当我们说 $1 + 2\mathbb{Z}$，我们实际上是在说集合 ${ 1 + z | z \in 2\mathbb{Z} }$，这是通过取 $2\mathbb{Z}$ 中的每个元素并加上 1 来构造的。这个集合包含了所有形如 $1 + 2k$ 的整数，其中 $k$ 是任意整数，因此它包含了所有奇数整数。

因此，$1 + 2\mathbb{Z}$ 是 $2\mathbb{Z}$ 的一个左陪集，因为它是通过对子群 $2\mathbb{Z}$ 的每个元素应用群的**加法运算**（在这个情况下加上 $1$）来构造的。


---

例子 2：

考虑群 $G = (\mathbb{Z}_6, +)$，即模 6 加法群，以及子群 $H = \{0, 3\}$。

左陪集 $0 + \{0, 3\}$ 包含所有与 0 在模 6 下同余的整数，即 ${0, 3}$。

左陪集 $1 + \{0, 3\}$ 包含所有与 1 在模 6 下同余的整数，即 ${1, 4}$。

左陪集 $2 + \{0, 3\}$ 包含所有与 2 在模 6 下同余的整数，即 ${2, 5}$。
