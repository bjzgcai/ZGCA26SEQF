# 千帆竞发图

一个用于展示学生成绩累计进展和项目投资得分的可视化工具。支持从 CSV 文件动态读取数据，无需修改代码即可适配不同班级/课程。

**Fork 本仓库后，只需替换 CSV 数据文件并推送，GitHub Actions 会自动构建部署。**

## 特性

- **成绩累计曲线图**：直观展示学生各阶段成绩累计情况
- **投资得分排行**：自动排序，TOP3 高亮显示
- **智能筛选**：支持学号筛选，支持通配符 `*` 和 `?`
- **数据分离**：CSV 数据与模板分离，轻松切换不同数据集
- **自动部署**：内置 GitHub Actions，推送即部署
- **主题可配置**：支持自定义主题颜色

## 快速开始

### 方式一：Fork 后自动部署（推荐）

1. **Fork 本仓库**

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 **GitHub Actions**

3. **替换数据文件**
   - 编辑 `data.csv`：粘贴学生成绩数据
   - 编辑 `invest.csv`：粘贴投资数据
   - 编辑 `config.js`：修改标题和列配置

4. **提交推送**
   - GitHub Actions 自动构建部署
   - 访问 `https://[用户名].github.io/[仓库名]/`

### 方式二：本地运行

```bash
# 克隆仓库
git clone https://github.com/[用户名]/[仓库名].git
cd [仓库名]

# 启动本地服务器
python -m http.server 8000

# 访问 http://localhost:8000
```

<details>
<summary>使用 Caddy 部署</summary>

```bash
# 安装 Caddy（macOS）
brew install caddy

# 安装 Caddy（Ubuntu/Debian）
sudo apt install -y caddy

# 在项目目录下启动
caddy file-server --listen :8000

# 或配置 Caddyfile 后台运行
echo ":8000 { root * . file_server }" > Caddyfile
caddy start
```

</details>

<details>
<summary>使用 Nginx 部署</summary>

```bash
# 安装 Nginx（Ubuntu/Debian）
sudo apt install -y nginx

# 创建配置文件
sudo tee /etc/nginx/sites-available/qfjf << 'EOF'
server {
    listen 8000;
    root /path/to/qfjf;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
EOF

# 启用并重启
sudo ln -s /etc/nginx/sites-available/qfjf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

</details>

## 文件结构

```
├── index.html          # 模板（无需修改）
├── config.js           # 配置文件
├── data.csv            # 学生成绩数据
├── invest.csv          # 投资数据
├── config.example.js   # 配置示例
└── .github/workflows/  # 自动部署配置
```

## 数据格式

### data.csv（学生成绩）

Tab 分隔，第一行为表头：

```
年级	学号	签到1	签到2	作业1	...	总分
2025	001	1	1	5	...	100
2025	002	1	0	4	...	85
```

- 默认每列都是成绩列
- 在 `config.js` 的 `excludeColumns` 中排除非成绩列（如学号、总分）

### invest.csv（投资数据）

Tab 分隔，第一列为项目名称：

```
项目名称	第一轮投资	Alpha投资	评委评价
AI量化投资	181	200	4.82
Echo项目	230	255	7.82
```

- 后续每列是一个投资轮次，列名即为模块标题
- 自动按分数降序排列

## 配置说明

编辑 `config.js`：

```javascript
const CONFIG = {
    title: "2509软件工程千帆竞发图",
    
    // 数据文件
    dataFile: "data.csv",
    investFile: "invest.csv",
    
    // 关键列名
    columns: {
        grade: "年级",
        studentId: "学号",
        total: "总分"
    },
    
    // 排除的列（不计入累计分数）
    excludeColumns: [
        "年级", "学号", "总分", "投资收益"
    ],
    
    // 列名映射
    columnNameMapping: {
        "签到": "签到1",
        "签到.1": "签到2"
    },
    
    // 投资配置
    investment: {
        nameColumn: "项目名称",
        decimalColumns: ["评委评价"]
    }
};
```

## 自定义流程

1. Fork 本仓库
2. 替换 `data.csv` 和 `invest.csv`
3. 修改 `config.js` 中的 `excludeColumns`
4. 推送到 `main` 分支
5. 等待 GitHub Actions 自动部署完成

说明文字、阶段名称、投资模块标题会根据 CSV 列名自动生成。

## 处理重复列名

CSV 中有重复列名时，系统自动处理：

| 原始列名 | 处理后 |
|---------|--------|
| 签到（第1个） | `签到` |
| 签到（第2个） | `签到.1` |
| 签到（第3个） | `签到.2` |

使用 `columnNameMapping` 可映射为更友好的名称。

## 交互功能

| 操作 | 说明 |
|-----|------|
| 鼠标悬停 | 查看学生详细成绩 |
| 点击数据点 | 快速筛选该学生 |
| 点击图例 | 隐藏/显示对应曲线 |
| 学号筛选 | 支持逗号分隔多个学号 |

筛选支持通配符：
- `2516*` - 匹配 2516 开头的学号
- `*047` - 匹配以 047 结尾的学号
- `25??03*` - `?` 匹配单个字符

## 部署说明

### GitHub Pages（自动）

本项目已配置 GitHub Actions：

1. Fork 仓库
2. Settings → Pages → Source 选择 **GitHub Actions**
3. 推送代码后自动部署
4. 访问 `https://[用户名].github.io/[仓库名]/`

每次推送到 `main` 分支都会触发自动部署。

### 自托管

将所有文件部署到任意静态文件服务器即可。

## License

MIT License
