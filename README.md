# You And I pc/mobile

## 初始化

- Get project

- Get the project code

```bash
git clone https://github.com/SCoolUncle/yai-web.git
```

- Installation dependencies

```bash
cd yai-web

yarn install

```

- run

```bash
yarn dev
```

- build

```bash
yarn build
```

## 接口返回值约束

*** 格式 ***

```javascript
  // 必须遵守以下结构，写后端一定注意
  {
    code:200, // error:-1 success:200
    data:{
      list:[],
      ...{}
    }, // 信息相关：Object
    msg:'success', // 状态
    ...{} // 其他自定义
  }
```

## 命名规范

*** 文件命名规范 ***

- 拒绝拼音 ！
- 组件：大写字母开头驼峰命名
- ts文件：驼峰命名

- 函数,变量：
- 复杂字母禁止缩写 例：development -> dp no  pageView -> pv ok
- get~ -> 获取相关
- is~ -> 判断相关
- has~ -> 有无

## 编码规范

- 基于airbnb的编码规范，老老实实！禁止个性化！请严格遵守！！！
- [airbnb](https://github.com/libertyAlone/airbnb-javascript-style-guide-cn)

## Git 提交规范 严格遵守

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- feat 增加新功能
- fix 修复问题/BUG
- style 代码风格相关无影响运行结果的
- perf 优化/性能提升
- refactor 重构
- revert 撤销修改
- test 测试相关
- docs 文档/注释
- chore 依赖更新/脚手架配置修改等
- workflow 工作流改进
- ci 持续集成
- mod 不确定分类的修改
- wip 开发中
- types 类型修改