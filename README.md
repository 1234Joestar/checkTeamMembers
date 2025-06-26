# Singularity Academy 团队合影登记系统

这是一个为Singularity Academy团队设计的合影登记系统，允许团队成员输入姓名和空闲时间段，方便安排合影时间。

## 功能特点

- ✅ 无需登录，直接填写信息
- ✅ 数据持久化存储（SQLite数据库）
- ✅ 实时查看所有成员的登记信息
- ✅ 支持删除登记信息
- ✅ 响应式设计，支持移动端
- ✅ 现代化UI界面

## 技术栈

- **前端**: React + TypeScript + Tailwind CSS
- **后端**: Node.js + Express
- **数据库**: SQLite
- **部署**: 支持Vercel、Railway等平台

## 快速开始

### 1. 安装依赖

```bash
# 安装所有依赖（包括前端和后端）
npm run install-all
```

### 2. 开发模式运行

```bash
# 同时启动前端和后端
npm run dev
```

或者分别启动：

```bash
# 启动后端服务器
npm run server

# 启动前端开发服务器
npm run client
```

### 3. 访问应用

- 前端: http://localhost:3000
- 后端API: http://localhost:3001

## 部署说明

### 本地部署

1. 构建前端：
```bash
npm run build
```

2. 启动生产服务器：
```bash
npm start
```

### 云端部署

推荐使用以下平台进行部署：

#### Vercel部署
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 设置环境变量（如需要）
4. 部署完成

#### Railway部署
1. 在Railway中创建新项目
2. 连接GitHub仓库
3. 设置启动命令：`npm start`
4. 部署完成

## API接口

### 获取所有成员
```
GET /api/members
```

### 添加新成员
```
POST /api/members
Content-Type: application/json

{
  "name": "张三",
  "available_time": "工作日晚上7点后，周末全天"
}
```

### 删除成员
```
DELETE /api/members/:id
```

## 项目结构

```
singularity-academy-registration/
├── client/                 # React前端
│   ├── public/
│   │   ├── components/     # React组件
│   │   ├── types.ts        # TypeScript类型定义
│   │   ├── App.tsx         # 主应用组件
│   │   └── index.tsx       # 入口文件
│   └── package.json
├── server/                 # Node.js后端
│   └── index.js           # Express服务器
├── database.sqlite        # SQLite数据库文件
├── package.json           # 根目录package.json
└── README.md
```

## 使用说明

1. **登记信息**: 在表单中填写姓名和空闲时间段
2. **查看列表**: 实时查看所有已登记的成员信息
3. **删除信息**: 点击成员卡片右侧的"删除"按钮可以删除登记信息
4. **刷新数据**: 点击"刷新列表"按钮可以重新加载数据

## 注意事项

- 数据存储在本地SQLite数据库中
- 部署时需要确保数据库文件有写入权限
- 建议定期备份数据库文件

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**Singularity Academy** - 让团队协作更简单 