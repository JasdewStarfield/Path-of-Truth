

# 真理之路 - Path of Truth

A Minecraft 1.20.1 Forge tech & magic modpack

<!-- PROJECT SHIELDS -->

![Version][version-shield]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
![Community1][qq-shield1]
![Community2][qq-shield2]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  
  <a href="https://www.curseforge.com/minecraft/modpacks/path-of-truth">
    <img src="config/fancymenu/assets/logo_new.png" alt="Logo" width="560" height="80">
  </a>
  <br />
  <a href="https://github.com/JasdewStarfield">
    <img src="kubejs/assets/kubejs/textures/item/buran.png" alt="Logo" width="80" height="80">
  </a>
  <a href="https://github.com/MidnightPigeon">
    <img src="kubejs/assets/kubejs/textures/item/midnight.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">综合向1.20.1Forge整合包</h3>
  <p align="center">
    整合包反馈交流群：631894460，798699096
    <br />
    <a href="https://www.curseforge.com/minecraft/modpacks/path-of-truth"><strong>在Curseforge上下载整合包正式版 »</strong></a>
    <br />
    <br />
    <a href="https://b23.tv/BzX9RtL">观看宣传视频</a>
    ·
    <a href="https://github.com/JasdewStarfield/Path-of-Truth/issues">报告Bug</a>
    ·
    <a href="https://github.com/JasdewStarfield/Path-of-Truth/issues">提出新特性</a>
  </p>

</p>

> [!IMPORTANT]
> 整合包仍在**积极维护**！如果你遇到任何问题，请为我们提交issue！感激不尽！
> 另：主分支为正式版，提交PR建议提交至 **dev-client** 分支。

欢迎来到“真理之路”整合包。


本整合包由狂野工程师JasdewStarfield与抽象魔法师MidnightPigeon联合创作。


在这个世界，你将进行持续的探索发现，直至终末。


如果你的知识不够，有一些真相你会没有能力发现；


如果你的探索不充分，有一些事物你将无从了解。


唯有全面发展，以科学和魔法为左右手，走到虚空的尽头——并看破世界的真实。

---
 
## 目录

- [特色简介](#特色简介)
  - [主要模组](#主要模组)
  - [独特挑战](#独特挑战)
  - [详尽的任务指引](#详尽的任务指引)
  - [视听体验](#视听体验)
- [上手指南](#上手指南)
  - [运行前的配置要求](#运行前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [版本控制](#版本控制)
- [作者及贡献者](#作者及贡献者)
  - [如何参与开源项目](#如何参与开源项目)
- [鸣谢](#鸣谢)

---

### 简介

#### 主要模组

##### 科技模组
- [机械动力](https://www.curseforge.com/minecraft/mc-mods/create)及其附属
- [沉浸工程](https://www.curseforge.com/minecraft/mc-mods/immersive-engineering)

##### 魔法模组
- [植物魔法](https://www.curseforge.com/minecraft/mc-mods/botania)
- [诡厄巫法](https://www.curseforge.com/minecraft/mc-mods/goety)
- [铁魔法](https://www.curseforge.com/minecraft/mc-mods/irons-spells-n-spellbooks)

##### 探索模组
- [蔚蓝浩空](https://www.curseforge.com/minecraft/mc-mods/blue-skies)
- [深暗之园](https://www.curseforge.com/minecraft/mc-mods/the-undergarden)
- [Alex的生物](https://www.curseforge.com/minecraft/mc-mods/alexs-mobs)
- [Jaden的下界拓展](https://www.curseforge.com/minecraft/mc-mods/jadens-nether-expansion)

##### 农业美食模组
- [农夫乐事](https://www.curseforge.com/minecraft/mc-mods/farmers-delight)及其附属
- [潮汐](https://www.curseforge.com/minecraft/mc-mods/tide)
- [均衡饮食](https://www.curseforge.com/minecraft/mc-mods/diet)

熟悉这些模组的玩家可以快速上手，但请注意，这是一个**高度魔改**的整合包（使用[KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs)），不仅更改了**半数以上**关键配方，还添加了数十种**原创**材料，已有的机制也进行了**大幅修改**。你熟悉的玩法可能需要重新适应。不要依赖惯性思维，迎接新的挑战吧！

#### 独特挑战

为了增加难度和丰富体验，加入了[节气](https://www.curseforge.com/minecraft/mc-mods/ecliptic-seasons)机制。这也意味着你还需要注意体温管理，因为我们加入了[冷汗](https://www.curseforge.com/minecraft/mc-mods/cold-sweat)模组，这会给你的生存带来**额外的挑战**！

#### 详尽的任务指引

即使你对这些模组不熟悉，也不用担心。本整合包提供了**详尽的任务指引系统**（使用[FTB任务](https://www.curseforge.com/minecraft/mc-mods/ftb-quests-forge)）。配合模组自带的说明教程，它们会引导你从茹毛饮血的青铜时代，跨越铁器时代、精密仪器时代、电气时代等，在万象轮转中展开工业与魔法革命，最终接近世界的真相。

#### 视听体验

此外，本整合包还加入了丰富的视听体验模组（如[Oculus光影](https://www.curseforge.com/minecraft/mc-mods/oculus)、[氛围音效](https://www.curseforge.com/minecraft/mc-mods/ambientsounds)等）。这些模组不会影响正常游戏内容，但会增加**沉浸感**和**放松度**。不喜欢这些内容的玩家可以自由开关，不会影响游戏流程的完整性。

#### 性能优化

在**保证流程和美学风味满足的前提下**，本着不影响玩家体验为目标，本整合包尽力优化了性能，可以满足在大多数PC设备上正常流畅运行。

希望你喜欢这个充满挑战和惊喜的整合包，开启一段探索与发现的精彩旅程吧！

---

### 上手指南

#### 运行前的配置要求

1. Java17（或更高）
2. Hello Minecraft Launcher（HMCL，推荐使用）或其他支持安装Curseforge格式整合包的启动器
3. 建议为游戏分配4G以上的内存，多人服务器则建议8G以上（视游玩人数提高）

#### **安装步骤**
标准版安装：


1. 下载本整合包的Release版zip文件（在Github上直接下载，或在[官方Curseforge页面](https://www.curseforge.com/minecraft/modpacks/path-of-truth)上下载,亦可加群或者使用[备用网盘链接](https://pan.baidu.com/s/1wFJ450MmU-GP9tkHtEHAtw?pwd=1145)获取）。
2. 使用支持Curseforge整合包格式的启动器（例如HMCL）安装该文件。


如果您希望体验开发版本，则:


1. 先安装原版Minecraft，版本1.20.1（如果启动器支持，建议启用版本独立文件夹）。
2. 安装Forge，版本47.4.0。
3. 克隆本仓库的dev-client分支到你安装版本的目录下（版本独立时通常为versions文件夹的一子文件夹）。

---

### 文件目录说明

```
filetree 
├── README.md
├── LICENSE
├── config  //模组本地配置
├── defaultconfigs  //模组默认服务端配置
├── hotai  //邪恶的模组Class覆盖（）
├── kubejs  //魔改内容
│  ├── assests
│  ├── data
│  ├── config
│  ├── client_scripts
│  ├── server_scripts
│  └── startup_scripts
├── resourcepacks  //内置资源包
├── schematics  //内置蓝图
└── mods  //模组

```

---

### 版本控制

该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

---

### 作者及贡献者

<a href="https://github.com/JasdewStarfield/Path-of-Truth/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=JasdewStarfield/Path-of-Truth" />
</a>

- 茉露星圃 | Jasdew Starfield

- 深夜鸽子 | MidnightPigeon

- 同时感谢为我们提供了代码、建筑、配乐支持的JackyBlackson

- 感谢为我们主动提供材质/模型支持的美工大佬KEYboradManDesu

- 感谢为项目提交有效PR的YukkuriC、sakurayang大佬。

 *请参阅[贡献者页面](https://github.com/JasdewStarfield/Path-of-Truth/graphs/contributors) 查阅为该项目做出贡献的开发者。*

#### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

### 版权说明

该项目签署了 MIT* 授权许可，详情请参阅 [LICENSE.txt](https://github.com/JasdewStarfield/Path-of-Truth/blob/master/LICENSE.txt)

*本项目使用 MIT 协议的范围不包含 /mods 目录中的所有文件，以及 /resourcepacks 目录内的所有未声明由Yourscraft制作的 .zip 文件。这些文件的协议解释权归其原作者所有。部分内置的开源项目有不同的协议要求，具体以其协议内容为准。

---

### 鸣谢

- [Curseforge](https://www.curseforge.com)
- [Blockbench](https://www.blockbench.net/)
- [Img Shields](https://shields.io)
- [Star History](https://www.star-history.com/)
- [🌩最好的中文README模板⚡️Best README template](https://github.com/shaojintian/Best_README_template)
- 及一众Mod、资源包、数据包作者们！

---

[![Star History](https://api.star-history.com/svg?repos=JasdewStarfield/Path-of-Truth&type=Timeline)](https://star-history.com/#JasdewStarfield/Path-of-Truth)

<!-- links -->
[your-project-path]:JasdewStarfield/Path-of-Truth
[contributors-shield]: https://img.shields.io/github/contributors/JasdewStarfield/Path-of-Truth.svg?style=flat-square
[contributors-url]: https://github.com/JasdewStarfield/Path-of-Truth/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/JasdewStarfield/Path-of-Truth.svg?style=flat-square
[forks-url]: https://github.com/JasdewStarfield/Path-of-Truth/network/members
[stars-shield]: https://img.shields.io/github/stars/JasdewStarfield/Path-of-Truth.svg?style=flat-square
[stars-url]: https://github.com/JasdewStarfield/Path-of-Truth/stargazers
[issues-shield]: https://img.shields.io/github/issues/JasdewStarfield/Path-of-Truth.svg?style=flat-square
[issues-url]: https://img.shields.io/github/issues/JasdewStarfield/Path-of-Truth.svg
[qq-shield1]:https://img.shields.io/badge/QQ1群-631894460-12B7F3?style=flat-square
[qq-shield2]:https://img.shields.io/badge/QQ2群-798699096-16B3A3?style=flat-square
[version-shield]:https://img.shields.io/badge/当前版本-V3.0.2-2CB3A8?style=flat-square
[license-shield]: https://img.shields.io/github/license/JasdewStarfield/Path-of-Truth.svg?style=flat-square
[license-url]: https://github.com/JasdewStarfield/Path-of-Truth/blob/master/LICENSE.txt




