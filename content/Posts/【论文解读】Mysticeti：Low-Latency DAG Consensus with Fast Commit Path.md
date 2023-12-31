---
date: 2023-11-25T09:59:52.000+08:00
draft: true
---

## 摘要

引入了一种名为 Mysticeti-C 的拜占庭共识协议，它具有**低延迟**和**高资源效率**。它利用基于 Threshold Clocks 的**有向无环图（DAG）**，并结合了**流水线技术**和**多个领导节点**的创新，以在稳定状态和崩溃失效下减少延迟。Mysticeti-FPC 包括一个具有更低延迟的快速提交路径。我们在拜占庭环境中证明了这些协议的安全性和活性。我们评估了 Mysticeti，并将其与最先进的共识和快速路径协议进行了比较，以展示其低延迟和资源效率，以及在崩溃失效下的更优雅退化。Mysticeti 是第一个在达到每秒 50,000 个交易的吞吐量的同时，实现共识提交的 WAN 延迟为 0.5 秒的拜占庭协议，与最先进的技术相匹配。

## 介绍

最近的一些区块链，例如 Sui，采用了基于认证有向无环图（DAG）的区块共识协议，例如 Narwhal-Tusk、Bullshark 以及最近的提案如 Shoal。这些共识协议的设计使得其在吞吐量方面具有良好的可扩展性，可以实现每秒 100,000 个原始交易的性能。值得注意的是，Sui 使用 Bullshark 结合 MoveVM，在 2023 年 7 月 27 日处理了 6500 万个可编程交易块，在整个日子内持续的吞吐量超过 700 个交易每秒，只使用了单个共识工作者。

然而，认证 DAG 共识也存在两个缺点：（1）认证 DAG 需要多次往返：在验证者之间广播每个区块、获取签名并重新广播证书。这导致比传统共识协议更高的延迟；（2）由于所有区块都需要所有验证者签名，签名的生成和验证会消耗大量的 CPU 资源，并且随着验证者数量的增加而增加。当崩溃恢复的验证者同步到 DAG 并被签名验证所淹没时，这个负担尤为沉重。

另一方面，还有一些工作探索在达成共识之前或之外处理交易的方法，例如 FastPay、Zef 和 Astro。这些系统使用可靠广播而不是共识来提交只访问由单个参与方控制的状态的交易，并将这种机制称为“快速路径”。Sui 区块链的机制（称为 Sui Lutris）将快速路径与黑盒认证 DAG 共识相结合。这种组合是通用的，并且可以实现非常低的延迟（在 2023 年 7 月 27 日的高峰交易日中，绝大多数交易都是通过快速路径完成的）。但是，它也导致了以下问题：（1）需要共识路径的其他交易的延迟增加，以及由于独立的后共识检查点机制而导致的整体同步延迟增加；（2）由于每个交易需要单独认证，会产生额外的签名生成和验证。这意味着验证者的 CPU 主要用于执行加密操作而不是处理交易。将有效证书顺序化到共识中还会降低其容量，并将 CPU 密集的证书验证负担加到共识的关键路径上。

在这项工作中，我们提出了 Mysticeti，一系列专注于低延迟和低 CPU 占用的协议，用于在拜占庭环境中安全提交分布式交易。Mysticeti-C 是一种基于阈值逻辑时钟的 DAG 共识协议，它在不需要显式认证每个区块的情况下进行提交。我们扩展了该协议，引入了 Mysticeti-FPC，实现了非常低的延迟提交，而无需为每个交易生成显式证书。这两种设计都具有较低的延迟和较低的 CPU 利用率。这两个协议都可以通过多个工作者进行扩展，以支持更高的吞吐量，但我们的实验表明，当前所有区块链的活动峰值都可以轻松由单个工作者处理。

我们的实验结果表明，当前所有区块链的活动峰值都可以由单个工作者轻松处理。因此，我们的 Mysticeti 协议提供了一种高效的解决方案，既具有低延迟，又具有较低的 CPU 占用。这使得 Mysticeti 成为在拜占庭环境中安全提交分布式交易的理想选择。

**贡献**：我们的工作具有以下贡献：

- 我们提出了 Mysticeti-C，一种基于 DAG 的拜占庭共识算法，并给出了其安全性和活性的证明。该算法实现了通用的流水线和多领导者的提交规则，使得每个区块都可以直接提交，从而大大降低了延迟，即使出现故障。我们展示了它具有较低的提交延迟，并且在吞吐量上超过了基于 Narwhal 共识的单个工作者。
- 我们还提出了 Mysticeti-FPC，它与 Sui Lutris 具有相同的功能，即快速路径和共识路径，以及安全的检查点和时期关闭机制。我们展示了 Mysticeti-FPC 具有与 Zef 和 Fastpay 相媲美的快速路径延迟，但由于较低的 CPU 利用率和批处理，吞吐量更高。
- 我们完全实现了这两个协议，并在广域网上进行了实验评估。我们展示了它们在共识模式下的延迟 - 吞吐量特性优于认证 DAG 设计，而在快速路径上具有竞争力，同时由于较低的 CPU 开销，它们的吞吐量要远远优于其他方法。

## 背景

我们考虑一个消息传递系统，在这个系统中，每个时期 $n=3f+1$ 的验证者使用 Mysticeti 协议处理交易。

在每个时期中，一个计算有限的对网络具有控制权的对手可以静态地损坏最多 $f$ 个验证者。我们称这些验证者为\emph{拜占庭}验证者，它们可以任意偏离协议。

其余的验证者（至少 $2f+1$）是\emph{正确}或\emph{诚实}的验证者，并忠实地遵循协议。

对于协议的描述，我们假设诚实参与方之间的链接是可靠且经过身份验证的。也就是说，所有诚实参与方之间的消息最终都会到达，并且接收者可以验证发送者的身份。对手受到计算上的限制，并且常规的加密哈希函数、数字签名和其他加密基元的安全属性成立。

在这些假设下，\Cref{sec:security}表明 Mysticeti 协议是安全的，即没有两个正确的验证者会提交不一致的交易。

验证者们通过一个部分同步的网络进行通信。存在一个被称为全局稳定时间（GST）的时间点和一个已知的有限时间界限 $\Delta$，使得任何在时间 $x$ 发送的消息都保证在时间 $\Delta + \max\{\text{GST}, x\}$ 之前到达。在同步期间（GST 之后），Mysticeti 协议也是活跃的，也就是说它们保证从正确的验证者那里提交交易。

根据之前的工作，我们专注于 Mysticeti 的拜占庭原子广播。此外，对于 Mysticeti-FPC，我们展示了快速路径交易子协议在一个时期内满足可靠广播~\cite{blackshear2023sui}，但允许在时期之间恢复两段论对象而不会在时期边界处失去安全性。更正式地说：

### 可靠广播

每个验证者 $v_k$ 通过调用 $\text{r\_bcast}_k(m,q)$ 进行广播，其中 $m$ 是消息，$q \in \mathbb{N}$ 是一个序列号。

每个验证者 $v_i$ 都有一个输出 $\text{r\_deliver}_i(m,q,v_k)$，其中 $m$ 是消息，$q$ 是序列号，$v_k$ 是调用相应的 $\text{r\_bcast}_k(m,q)$ 的验证者的标识。

可靠广播抽象保证以下属性：

- 一致性（Agreement）：如果一个诚实的验证者 $v_i$ 输出 $\text{r\_deliver}_i(m,q,v_k)$，那么每个其他诚实的验证者 $v_j$ 最终会输出 $\text{r\_deliver}_j(m,q,v_k)$。
- 完整性（Integrity）：对于每个序列号 $q \in \mathbb{N}$ 和验证者 $v_k$，一个诚实的验证者 $v_i$ 无论 $m$ 是什么，最多只输出一次 $\text{r\_deliver}_i(m,q,v_k)$。
- 有效性（Validity）：如果一个诚实的验证者 $v_k$ 调用了 $\text{r\_bcast}_k(m,q)$，那么每个诚实的验证者 $v_i$ 最终会输出 $\text{r\_deliver}_i(m,q,v_k)$。

此外，对于拜占庭原子广播，每个诚实的验证者 $v_i$ 可以调用 $\text{a\_bcast}_i(m,q)$ 并输出 $\text{a\_deliver}_i(m,q,v_k)$。
拜占庭原子广播协议满足可靠广播（一致性、完整性和有效性），以及以下特性：
%

- **Total order（全序性）：** 如果一个诚实的验证者 $v_i$ 在 $\text{a\_deliver}_i(m,q,v_k)$ 之前输出了 $\text{a\_deliver}_i(m',q',v_k')$，则没有诚实方 $v_j$ 会在 $\text{a\_deliver}_j(m',q',v_k')$ 之前输出 $\text{a\_deliver}_j(m,q,v_k)$。

最后，大多数之前的工作将属性定义为协议在单个时期内运行的情况。然而，这是不现实的，因为验证者会变动。为此，我们将所有协议扩展为将时期编号作为参数，并且所有属性应在单个时期内成立。
幸运的是，可靠广播的定义允许在一个时期内恢复由于两段论而被阻塞的序列号的活跃性。更具体地说，我们定义了如下的两段论容忍度：

- **两段论容忍度（Equivocation tolerance）：** 如果一个拜占庭验证者 $v_k$ 同时调用 $\text{r\_bcast}_k(m,q,e)$ 和 $\text{r\_bcast}_k(m',q,e)$，其中 $m \neq m'$，那么其他验证者要么 $\text{r\_deliver}_i(m,q,v_k,e)$，要么 $\text{r\_deliver}_i(m',q,v_k,e)$，要么存在一个后续时期 $e'>e$，在该时期中 $v_k$ 是诚实的，并调用 $\text{r\_bcast}_k(m'',q,e')$，并且所有诚实验证者都会 $\text{r\_deliver}_i(m'',q,v_k,e')$。

## Mysticeti-C 协议

我们描述 Mysticeti-C 共识协议。design-fpc 章节 描述了 Mysticeti-FPC，这是一种包含快速路径的变种。

### Mysticeti-C 概述

Mysticeti-C 允许一个验证者委员会在一个“时期”内打开一个共识通道，其中可以顺序发送多个消息，并在时期结束时关闭通道。

Mysticeti-C 协议按照一系列“轮次”进行。在每个轮次结束时，每个诚实的验证者都会广播该轮次的一个“唯一签名块”。

在一个轮次中，验证者从用户接收交易，以及其他验证者发送的块。他们构建自己的块，包含了来自过去轮次的块的“引用”，始终从自己的最新块开始；

以及未在过去的块中间接包含的“新交易”。一旦一个块包含了至少 $2f+1$ 个上一轮次的验证者块的引用，并经过一段延迟后，验证者可以对该块进行签名并传播给其他验证者。

为了提交交易，在 Mysticeti-C 的基本变种中，依赖于在特定的“领导者轮次”上提交一系列“共同的领导者块”。轮次的结构是一个领导者轮次，后面是一个或多个支持轮次，最后是一个决策轮次。

在每个领导者轮次中，所有正确的验证者根据轮次号使用确定性方法确定一个领导者。在随后的支持轮次中，块间接地支持其块中包含的第一个领导者块（以防止等价错误）。当一个块间接地包含了支持领导者块的 $2f+1$ 个验证者块时，我们说该块证明了领导者块。

如果一个领导者块在决策轮次中被 $2f+1$ 个块证明，我们就开始扩展领导者的提交序列。首先，在提交最终的领导者块之前，任何之前未提交的领导者块都必须被至少一个位于领导者的因果历史中的块证明。

提交的领导者序列在所有正确的验证者中是一致的。每个领导者块提交了块的完整因果历史和包含的交易，其中这些交易在之前的提交中还不包含。将领导者提交序列转换并扩展为交易提交的算法可以是任意的，只要块中的新交易以确定性方式包含在序列中即可。基本变种扩展到我们所称的通用提交规则（\Cref{sec:universal-commit}）。通用提交规则同时运行多个虚拟的 Mysticeti-C，有效地复用了每个块虚拟地充当潜在的领导者的提交序列。这样可以在常见情况下以及在发生故障时减少提交延迟。
