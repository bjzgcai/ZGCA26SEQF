/**
 * 千帆竞发图 - 配置文件
 * 
 * 使用说明：
 * 1. 学生成绩 → data.csv（Tab分隔）
 * 2. 投资数据 → invest.csv（Tab分隔，第一列项目名，后续列各轮得分）
 * 3. 通过HTTP服务器访问 index.html（如 python -m http.server）
 */

const CONFIG = {
    // ========== 基础配置 ==========
    title: "2609现代软件工程千帆竞发图",
    chartTitle: "学生成绩累计进展",
    
    // 数据文件路径
    dataFile: "data.csv",
    investFile: "invest.csv",  // 投资数据文件
    
    // ========== 学生成绩列配置 ==========
    columns: {
        grade: "年级",
        studentId: "学号",
        name: "姓名",
        total: "总分",
        investProfit: "投资收益"
    },
    
    // 排除的列（不计入阶段累计成绩）
    excludeColumns: [
        "年级", "学号", "姓名", "投资收益", "总分"
    ],
    
    // 列名映射
    columnNameMapping: {},
    
    // ========== 投资配置 ==========
    investment: {
        // 第一列的列名（项目名称列）
        nameColumn: "项目名称",
        
        // 小数列（这些列的分数显示保留2位小数）
        decimalColumns: ["Beta阶段评委评价"]
    },
    
    // ========== 主题配置 ==========
    theme: {
        primaryColor: '#26c6da',
        primaryHover: '#00acc1',
        goldColor: '#ffd700',
        silverColor: '#c0c0c0',
        bronzeColor: '#cd7f32'
    }
};

if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
