const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, '../data/members.json');

// 确保数据目录存在
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// 读取数据
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取数据文件错误:', error);
    return [];
  }
}

// 写入数据
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('写入数据文件错误:', error);
    return false;
  }
}

// API路由

// 获取所有成员
app.get('/api/members', (req, res) => {
  try {
    const members = readData();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败' });
  }
});

// 添加新成员
app.post('/api/members', (req, res) => {
  const { name, available_time } = req.body;
  
  if (!name || !available_time) {
    res.status(400).json({ error: '姓名和空闲时间都是必填项' });
    return;
  }

  try {
    const members = readData();
    const newMember = {
      id: Date.now(), // 使用时间戳作为ID
      name: name.trim(),
      available_time: available_time.trim(),
      created_at: new Date().toISOString()
    };
    
    members.unshift(newMember); // 添加到开头
    
    if (writeData(members)) {
      res.json(newMember);
    } else {
      res.status(500).json({ error: '保存数据失败' });
    }
  } catch (error) {
    res.status(500).json({ error: '添加成员失败' });
  }
});

// 删除成员
app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const members = readData();
    const memberIndex = members.findIndex(member => member.id == id);
    
    if (memberIndex === -1) {
      res.status(404).json({ error: '未找到该成员' });
      return;
    }
    
    members.splice(memberIndex, 1);
    
    if (writeData(members)) {
      res.json({ message: '成员已删除' });
    } else {
      res.status(500).json({ error: '删除失败' });
    }
  } catch (error) {
    res.status(500).json({ error: '删除成员失败' });
  }
});

// 处理React路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
  console.log(`访问地址: http://localhost:${PORT}`);
  console.log(`数据文件: ${DATA_FILE}`);
}); 