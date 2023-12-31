---
date: 2023-11-23T06:16:40.000+08:00
aliases:
  - Diffie-Hellman 密钥交换
---

**Diffie-Hellman 密钥交换（Diffie-Hellman Key Exchange）** 是一种公钥密码学协议，用于在不安全信道上安全地交换密钥。这个协议的基本思想是利用数论中的[[Discrete Logarithm Problem|离散对数问题]]。在现代公钥密码学的发展史上，Diffie-Hellman 密钥交换协议被认为是奠基之一。

Diffie-Hellman 密钥交换协议的步骤：

1. **选择参数**：首先，需要选择一个大素数 $p$ 和一个原根 $g$。这些参数可以事先协商好或者通过安全的方式传递给通信方。这两个值称为**域参数**。
	1. 对于素数 $p$，选择原根 $g$ 的取值范围是从 2 到 $p-2$（包含 2 和 $p-2$）
	2. 我们需要排除 0 和 1，因为它们不满足原根的定义。具体来说，一个元素 $g$ 被称为模 $p$ 的[[Primitive root modulo n|原根]]，当且仅当它的幂可以取遍从 1 到 $p-1$ 的所有非零剩余类。
2. **密钥生成**：在这一步，Alice（发送方）选择一个私密的随机数 $a$，然后计算 $A = g^a \mod p$。Bob（接收方）也选择一个私密的随机数 $b$，然后计算 $B = g^b \mod p$。
3. **密钥交换**：在这一步，Alice 将计算得到的 $A$ 发送给 Bob，而 Bob 将计算得到的 $B$ 发送给 Alice。
4. **密钥计算**：最后，Alice 和 Bob 分别利用对方发送过来的信息和自己的私密数计算出相同的密钥 $K$。具体地，Alice 计算 $K = B^a \mod p$，而 Bob 计算 $K = A^b \mod p$。

通过这个协议，Alice 和 Bob 最终都会得到相同的密钥 $K$，这个密钥可以被用来加密和解密他们的通信内容。

Diffie-Hellman 密钥交换协议的安全性基于离散对数问题的困难性，即在已知 $p$、$g$、$A$ 和 $B$ 的情况下，计算出 $K$ 的值是非常困难的。即使通过监听通信渠道获取了 $A$ 和 $B$，也无法直接计算出 $K$，因为计算 $K$ 需要解决离散对数问题。

需要注意的是，Diffie-Hellman 密钥交换协议本身并不提供身份验证和消息完整性保护。为了实现完整的安全通信系统，通常需要结合其他密码学技术，如数字签名和消息认证码。

Diffie-Hellman 密钥交换协议在现代密码学中得到广泛应用，特别是在安全通信和密钥协商方面。它为双方在不安全的通信渠道上建立共享密钥提供了一种有效的方法。
