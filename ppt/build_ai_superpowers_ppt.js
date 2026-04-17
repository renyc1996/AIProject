const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Claude Code';
pptx.company = 'Claude Code';
pptx.subject = 'AI 辅助开发分享';
pptx.title = 'AI 辅助开发：利用 Superpowers 与 自定义 Skills 提升开发效能';
pptx.lang = 'zh-CN';
pptx.theme = {
  headFontFace: 'Microsoft YaHei',
  bodyFontFace: 'Microsoft YaHei',
  lang: 'zh-CN'
};
pptx.defineLayout({ name: 'CUSTOM_WIDE', width: 10, height: 5.625 });

const C = {
  navy: '0F2747',
  teal: '0E7490',
  cyan: '22C7D6',
  mint: 'C7F3F7',
  light: 'F7FBFC',
  soft: 'EAF4F6',
  text: '15314B',
  muted: '5B7083',
  white: 'FFFFFF',
  coral: 'FF7A59',
  gold: 'F5B700',
  red: 'D64545',
  green: '1E9E63',
  border: 'D9E6EA'
};

function addSlideBase(slide, opts = {}) {
  slide.background = { color: opts.bg || C.light };
  if (opts.dark) {
    slide.background = { color: opts.bg || C.navy };
  }
}

function addTopLabel(slide, text, color = C.teal) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.55, y: 0.35, w: 1.5, h: 0.34,
    rectRadius: 0.06,
    line: { color, transparency: 100 },
    fill: { color, transparency: 8 }
  });
  slide.addText(text, {
    x: 0.7, y: 0.415, w: 1.2, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 10, bold: true, color,
    margin: 0, align: 'center'
  });
}

function addTitle(slide, title, opts = {}) {
  slide.addText(title, {
    x: opts.x ?? 0.65,
    y: opts.y ?? 0.72,
    w: opts.w ?? 8.7,
    h: opts.h ?? 0.68,
    fontFace: 'Microsoft YaHei',
    fontSize: opts.size ?? 26,
    bold: true,
    color: opts.color || C.text,
    margin: 0,
    fit: 'shrink'
  });
}

function addFooter(slide, n, dark = false) {
  slide.addText(String(n).padStart(2, '0'), {
    x: 9.05, y: 5.08, w: 0.42, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 9, color: dark ? 'D7E6F2' : '89A1B2',
    margin: 0, align: 'right'
  });
}

function addChip(slide, x, y, w, text, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.34, rectRadius: 0.06,
    line: { color: opts.color || C.teal, transparency: 100 },
    fill: { color: opts.fill || C.soft }
  });
  slide.addText(text, {
    x: x + 0.08, y: y + 0.08, w: w - 0.16, h: 0.14,
    fontFace: 'Microsoft YaHei', fontSize: 10, bold: !!opts.bold, color: opts.color || C.teal,
    margin: 0, align: 'center'
  });
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    line: { color: opts.line || C.border, width: 1 },
    fill: { color: opts.fill || C.white },
    shadow: { type: 'outer', color: '000000', blur: 2, offset: 1, angle: 45, opacity: 0.08 }
  });
  if (opts.accent) {
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.11, h,
      line: { color: opts.accent, transparency: 100 },
      fill: { color: opts.accent }
    });
  }
}

function addBulletList(slide, items, box, opts = {}) {
  const runs = [];
  items.forEach((item, i) => {
    runs.push({
      text: item,
      options: {
        bullet: { indent: opts.indent || 14 },
        breakLine: i < items.length - 1,
        color: opts.color || C.text,
        fontFace: 'Microsoft YaHei'
      }
    });
  });
  slide.addText(runs, {
    x: box.x, y: box.y, w: box.w, h: box.h,
    fontFace: 'Microsoft YaHei', fontSize: opts.fontSize || 16,
    color: opts.color || C.text,
    breakLine: true,
    margin: opts.margin ?? 0.05,
    paraSpaceAfterPt: opts.paraSpaceAfterPt || 10,
    valign: opts.valign || 'top',
    fit: 'shrink'
  });
}

function addSectionText(slide, x, y, label, body, w = 4.0) {
  slide.addText(label, {
    x, y, w, h: 0.24, fontFace: 'Microsoft YaHei', fontSize: 11,
    color: C.teal, bold: true, margin: 0
  });
  slide.addText(body, {
    x, y: y + 0.28, w, h: 0.42, fontFace: 'Microsoft YaHei', fontSize: 16,
    color: C.text, bold: false, margin: 0, fit: 'shrink'
  });
}

// Slide 1
{
  const slide = pptx.addSlide();
  addSlideBase(slide, { bg: C.navy, dark: true });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 5.625,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.75, y: 0, w: 3.25, h: 5.625,
    line: { color: '17395F', transparency: 100 },
    fill: { color: '17395F' }
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.45, y: 0, w: 0.12, h: 5.625,
    line: { color: C.cyan, transparency: 100 },
    fill: { color: C.cyan }
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.15, y: 1.0, w: 1.55, h: 1.55,
    rectRadius: 0.12,
    line: { color: C.cyan, transparency: 100 },
    fill: { color: '204E72' }
  });
  slide.addText('</>', {
    x: 7.55, y: 1.4, w: 0.8, h: 0.35,
    fontFace: 'Consolas', fontSize: 26, bold: true, color: C.cyan,
    align: 'center', margin: 0
  });
  slide.addText('AI 辅助开发', {
    x: 0.75, y: 1.18, w: 3.3, h: 0.45,
    fontFace: 'Microsoft YaHei', fontSize: 28, bold: true, color: C.cyan, margin: 0
  });
  slide.addText('利用 Superpowers 与\n自定义 Skills 提升开发效能', {
    x: 0.75, y: 1.72, w: 5.35, h: 1.2,
    fontFace: 'Microsoft YaHei', fontSize: 24, bold: true, color: C.white,
    margin: 0, breakLine: false, fit: 'shrink'
  });
  slide.addText('从“陪聊机器人”到“标准化工程助手”的重构实践', {
    x: 0.78, y: 3.05, w: 5.0, h: 0.34,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: 'D2E6F5', italic: true, margin: 0
  });
  slide.addText('演讲者  [你的名字]', {
    x: 0.78, y: 3.72, w: 2.4, h: 0.28,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: C.white, margin: 0
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.75, y: 4.22, w: 3.55, h: 0.56,
    rectRadius: 0.08,
    line: { color: '547A98', width: 1 },
    fill: { color: '122E4A' }
  });
  slide.addText('> run share_session --topic "AI_PowerUp"', {
    x: 0.96, y: 4.39, w: 3.15, h: 0.2,
    fontFace: 'Consolas', fontSize: 11, color: 'B5DDF5', margin: 0
  });
  addFooter(slide, 1, true);
}

// Slide 2
{
  const slide = pptx.addSlide();
  addSlideBase(slide);
  addTopLabel(slide, 'PAIN POINTS');
  addTitle(slide, '现状：AI 编程的常见痛点');

  const cards = [
    { x: 0.7, y: 1.55, title: 'Context Loss', sub: '上下文丢失', body: '聊着聊着就忘了项目原有的架构约束。', accent: C.red },
    { x: 5.15, y: 1.55, title: 'AI Hallucination', sub: 'AI 幻觉', body: '一本正经地胡说八道，生成不存在的 API。', accent: C.coral },
    { x: 0.7, y: 3.05, title: 'Scope Creep', sub: '逻辑发散', body: '任务边界模糊，导致 AI 擅自修改无关逻辑。', accent: C.gold },
    { x: 5.15, y: 3.05, title: 'Prompt Fatigue', sub: '重复劳动', body: '每次都要复读命名规范、DAO 转换、日志格式……', accent: C.teal }
  ];
  cards.forEach((c) => {
    addCard(slide, c.x, c.y, 4.05, 1.15, { accent: c.accent });
    slide.addText(c.title, {
      x: c.x + 0.22, y: c.y + 0.14, w: 2.5, h: 0.22,
      fontFace: 'Calibri', fontSize: 15, bold: true, color: C.text, margin: 0
    });
    slide.addText(c.sub, {
      x: c.x + 2.7, y: c.y + 0.15, w: 1.0, h: 0.2,
      fontFace: 'Microsoft YaHei', fontSize: 11, color: c.accent, bold: true, margin: 0, align: 'right'
    });
    slide.addText(c.body, {
      x: c.x + 0.22, y: c.y + 0.48, w: 3.58, h: 0.4,
      fontFace: 'Microsoft YaHei', fontSize: 13, color: C.muted, margin: 0, fit: 'shrink'
    });
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 4.55, w: 8.55, h: 0.52,
    rectRadius: 0.06,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy }
  });
  slide.addText('我们需要的是能真正落地、懂工程规矩的工程师，而不是只负责陪聊的机器人。', {
    x: 0.95, y: 4.72, w: 8.0, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 14, bold: true, color: C.white, margin: 0, align: 'center'
  });
  addFooter(slide, 2, false);
}

// Slide 3
{
  const slide = pptx.addSlide();
  addSlideBase(slide, { bg: 'F6FBFC' });
  addTopLabel(slide, 'SUPERPOWERS');
  addTitle(slide, 'Superpowers：AI 开发的“标准化工作流引擎”');

  addCard(slide, 0.65, 1.45, 4.15, 1.2, { accent: C.teal, fill: 'FFFFFF' });
  slide.addText('核心定义', {
    x: 0.9, y: 1.67, w: 1.0, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 12, color: C.teal, bold: true, margin: 0
  });
  slide.addText('一个能够调度 AI Agent、深度集成终端权限、实现“流程化编码”的工程内核。', {
    x: 0.9, y: 1.98, w: 3.5, h: 0.38,
    fontFace: 'Microsoft YaHei', fontSize: 15, color: C.text, bold: true, margin: 0, fit: 'shrink'
  });

  slide.addText('适用场景', {
    x: 0.78, y: 3.0, w: 1.2, h: 0.24,
    fontFace: 'Microsoft YaHei', fontSize: 13, color: C.text, bold: true, margin: 0
  });
  addBulletList(slide, [
    '新业务开发：从零构建复杂工程，确保符合团队架构规范。',
    '系统重构：高效处理老代码逻辑拆解与归档，降低风险。',
    '批量自动化：编写复杂运维脚本，利用 AI 规划处理批量操作。'
  ], { x: 0.78, y: 3.28, w: 4.1, h: 1.45 }, { fontSize: 15, color: C.text, paraSpaceAfterPt: 11 });

  addCard(slide, 5.15, 1.45, 4.15, 3.3, { fill: 'EAF8FA', line: 'CBE9EE' });
  slide.addText('设计哲学', {
    x: 5.45, y: 1.72, w: 1.2, h: 0.24,
    fontFace: 'Microsoft YaHei', fontSize: 12, color: C.teal, bold: true, margin: 0
  });
  addCard(slide, 5.45, 2.08, 3.45, 0.96, { fill: 'FFFFFF', accent: C.navy });
  slide.addText('理性执行', {
    x: 5.68, y: 2.26, w: 0.9, h: 0.22, fontFace: 'Microsoft YaHei', fontSize: 14, bold: true, color: C.text, margin: 0
  });
  slide.addText('从“方案设计 → 任务拆解 → 循序执行”出发，不再直接跳到代码。', {
    x: 5.68, y: 2.5, w: 2.95, h: 0.28, fontFace: 'Microsoft YaHei', fontSize: 12.5, color: C.muted, margin: 0, fit: 'shrink'
  });
  addCard(slide, 5.45, 3.22, 3.45, 0.96, { fill: 'FFFFFF', accent: C.coral });
  slide.addText('透明可控', {
    x: 5.68, y: 3.4, w: 0.9, h: 0.22, fontFace: 'Microsoft YaHei', fontSize: 14, bold: true, color: C.text, margin: 0
  });
  slide.addText('所有步骤人可见、可审、可控，拒绝黑盒。', {
    x: 5.68, y: 3.65, w: 2.9, h: 0.22, fontFace: 'Microsoft YaHei', fontSize: 12.5, color: C.muted, margin: 0
  });
  addFooter(slide, 3, false);
}

// Slide 4
{
  const slide = pptx.addSlide();
  addSlideBase(slide);
  addTopLabel(slide, 'CORE CAPABILITIES');
  addTitle(slide, '核心能力详解（四大杀手锏）');

  const headers = ['核心能力', '中文深度解释', '给开发带来的收益'];
  const rows = [
    ['/brainstorm', '头脑风暴与方案对齐', '规避方向性错误，降低逻辑偏差'],
    ['Task Decomposition', '任务自动拆解', '防止 AI 断片，确保每一步准确'],
    ['Subagent Mechanism', '子代理调度机制', '环境隔离，任务执行更专注'],
    ['TDD Guard', '测试驱动开发的守护者', '代码质量有底线，锁定重构风险']
  ];
  slide.addTable([headers, ...rows], {
    x: 0.72, y: 1.55, w: 8.55, h: 2.6,
    colW: [2.35, 2.75, 3.45],
    rowH: [0.44, 0.53, 0.53, 0.53, 0.53],
    border: { type: 'solid', pt: 1, color: C.border },
    fill: C.white,
    color: C.text,
    fontFace: 'Microsoft YaHei',
    fontSize: 12,
    margin: 0.08,
    valign: 'mid',
    bold: false,
    autoFit: false,
    cellProps: [
      { row: 0, fill: { color: C.navy }, color: C.white, bold: true, align: 'center', fontSize: 12.5 },
      { row: 1, col: 0, fill: { color: 'F4FAFB' }, bold: true, color: C.teal },
      { row: 2, col: 0, fill: { color: 'F4FAFB' }, bold: true, color: C.teal },
      { row: 3, col: 0, fill: { color: 'F4FAFB' }, bold: true, color: C.teal },
      { row: 4, col: 0, fill: { color: 'F4FAFB' }, bold: true, color: C.teal }
    ]
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.75, y: 4.48, w: 8.5, h: 0.42,
    rectRadius: 0.06,
    line: { color: C.soft, transparency: 100 },
    fill: { color: C.soft }
  });
  slide.addText('用流程、拆解、隔离、测试四层护栏，把 AI 从“聪明”变成“稳定”。', {
    x: 0.98, y: 4.61, w: 8.0, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 13.5, color: C.text, bold: true, margin: 0, align: 'center'
  });
  addFooter(slide, 4, false);
}

// Slide 5
{
  const slide = pptx.addSlide();
  addSlideBase(slide, { bg: 'FBFCFD' });
  addTopLabel(slide, 'COMPARISON');
  addTitle(slide, '工具对比：为何选择 Superpowers 而非原生 Plan？');

  addCard(slide, 0.72, 1.62, 3.9, 2.52, { fill: 'FFF8F7', line: 'F2D7D1', accent: C.coral });
  slide.addText('Claude Code 原生 Plan', {
    x: 1.0, y: 1.87, w: 2.1, h: 0.25,
    fontFace: 'Microsoft YaHei', fontSize: 17, bold: true, color: C.text, margin: 0
  });
  slide.addText('更偏线性思维', {
    x: 1.0, y: 2.26, w: 2.2, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 13, color: C.coral, bold: true, margin: 0
  });
  slide.addText('在大型代码库中逻辑易发散，缺乏对细节的强制约束。', {
    x: 1.0, y: 2.56, w: 3.1, h: 0.5,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: C.muted, margin: 0, fit: 'shrink'
  });

  addCard(slide, 5.0, 1.62, 4.1, 2.52, { fill: 'F2FBFC', line: 'CDECEE', accent: C.teal });
  slide.addText('Superpowers 优势', {
    x: 5.3, y: 1.87, w: 1.8, h: 0.25,
    fontFace: 'Microsoft YaHei', fontSize: 17, bold: true, color: C.text, margin: 0
  });
  const advantages = [
    '任务护栏：通过子代理调度，防止 AI 越界或迷路。',
    '状态保持：即使任务中断，基于 Checkpoint 可无缝接续。',
    '高度可扩展：配合自定义 Skills，实现开发规范的“硬编码”。'
  ];
  addBulletList(slide, advantages, { x: 5.28, y: 2.22, w: 3.42, h: 1.45 }, { fontSize: 14, color: C.text, paraSpaceAfterPt: 9 });
  addChip(slide, 7.18, 3.55, 1.2, 'Guardrails', { color: C.teal, fill: 'DDF5F8', bold: true });

  slide.addShape(pptx.ShapeType.chevron, {
    x: 4.35, y: 2.35, w: 0.42, h: 0.78,
    line: { color: C.gold, transparency: 100 },
    fill: { color: C.gold }
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72, y: 4.45, w: 8.38, h: 0.46,
    rectRadius: 0.06,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy }
  });
  slide.addText('[演示 1] Superpowers 自动任务拆解与执行录屏', {
    x: 0.96, y: 4.59, w: 7.9, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 13.5, color: C.white, bold: true, margin: 0, align: 'center'
  });
  addFooter(slide, 5, false);
}

// Slide 6
{
  const slide = pptx.addSlide();
  addSlideBase(slide);
  addTopLabel(slide, 'SKILLS');
  addTitle(slide, 'Skills：沉淀你的个人开发资产');

  addCard(slide, 0.72, 1.55, 3.1, 2.9, { fill: C.navy, line: C.navy });
  slide.addText('指令资产化', {
    x: 1.02, y: 1.92, w: 1.6, h: 0.26,
    fontFace: 'Microsoft YaHei', fontSize: 19, bold: true, color: C.white, margin: 0
  });
  slide.addText('Custom Skills', {
    x: 1.02, y: 2.26, w: 1.8, h: 0.2,
    fontFace: 'Calibri', fontSize: 15, color: 'A8E7EE', bold: true, margin: 0
  });
  slide.addText('把个人经验沉淀为项目可复用的“技能集”，让 AI 获得长期稳定的工程习惯。', {
    x: 1.02, y: 2.7, w: 2.35, h: 0.76,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: 'D8EAF5', margin: 0, fit: 'shrink'
  });
  addChip(slide, 1.02, 3.72, 1.5, 'skill-creator', { color: C.cyan, fill: '1B456B', bold: true });

  addCard(slide, 4.15, 1.55, 5.0, 1.22, { fill: 'FFFFFF', accent: C.teal });
  slide.addText('编写原则', {
    x: 4.45, y: 1.77, w: 1.0, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 13, color: C.teal, bold: true, margin: 0
  });
  slide.addText('Must / Must not：严格规定边界    ·    Always / Avoid：强制编码习惯', {
    x: 4.45, y: 2.12, w: 4.2, h: 0.24,
    fontFace: 'Microsoft YaHei', fontSize: 14.5, color: C.text, bold: true, margin: 0, fit: 'shrink'
  });

  addCard(slide, 4.15, 3.0, 5.0, 1.45, { fill: 'F8FCFD', line: C.border });
  slide.addText('演讲重点', {
    x: 4.45, y: 3.22, w: 1.0, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 13, color: C.coral, bold: true, margin: 0
  });
  slide.addText('这相当于给 AI 插了个“经验 U 盘”，把个人编码经验转化为可复用、可传承的工程资产。', {
    x: 4.45, y: 3.55, w: 4.15, h: 0.46,
    fontFace: 'Microsoft YaHei', fontSize: 14.5, color: C.text, margin: 0, fit: 'shrink'
  });
  addFooter(slide, 6, false);
}

// Slide 7
{
  const slide = pptx.addSlide();
  addSlideBase(slide, { bg: 'F6FBFC' });
  addTopLabel(slide, 'WORKFLOW');
  addTitle(slide, '实操演示：Superpowers + Skills 组合拳');

  const steps = [
    ['01', 'Load Skill', '瞬间注入项目规范'],
    ['02', 'Invoke Superpowers', '下达模糊指令'],
    ['03', 'Review Plan', '确认 AI 基于规范拆解的步骤'],
    ['04', 'Execute & Verify', '自动编码、交付标准代码']
  ];
  let x = 0.72;
  steps.forEach((s, idx) => {
    addCard(slide, x, 1.95, 2.05, 1.85, { fill: 'FFFFFF', line: 'DCEBED', accent: idx % 2 === 0 ? C.teal : C.coral });
    slide.addText(s[0], {
      x: x + 0.22, y: 2.16, w: 0.42, h: 0.26,
      fontFace: 'Calibri', fontSize: 20, bold: true, color: idx % 2 === 0 ? C.teal : C.coral, margin: 0
    });
    slide.addText(s[1], {
      x: x + 0.22, y: 2.56, w: 1.55, h: 0.24,
      fontFace: 'Calibri', fontSize: 15, bold: true, color: C.text, margin: 0, fit: 'shrink'
    });
    slide.addText(s[2], {
      x: x + 0.22, y: 2.95, w: 1.55, h: 0.5,
      fontFace: 'Microsoft YaHei', fontSize: 12.5, color: C.muted, margin: 0, fit: 'shrink'
    });
    if (idx < steps.length - 1) {
      slide.addShape(pptx.ShapeType.chevron, {
        x: x + 2.15, y: 2.62, w: 0.25, h: 0.42,
        line: { color: 'B6CAD4', transparency: 100 },
        fill: { color: 'B6CAD4' }
      });
    }
    x += 2.25;
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.1, y: 4.35, w: 7.8, h: 0.52,
    rectRadius: 0.06,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy }
  });
  slide.addText('[演示 2] 加载 Skill 后精准执行任务的实操录屏', {
    x: 1.35, y: 4.51, w: 7.3, h: 0.18,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: C.white, bold: true, margin: 0, align: 'center'
  });
  addFooter(slide, 7, false);
}

// Slide 8
{
  const slide = pptx.addSlide();
  addSlideBase(slide);
  addTopLabel(slide, 'ECOSYSTEM');
  addTitle(slide, '拓展视野与结尾');

  addCard(slide, 0.72, 1.55, 3.9, 2.35, { fill: 'FFFFFF', accent: C.teal });
  slide.addText('生态工具', {
    x: 1.0, y: 1.8, w: 1.0, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: C.teal, bold: true, margin: 0
  });
  addBulletList(slide, [
    'Claude Code + Codex 插件：代码补全与 Agent 的完美协同。',
    '更多应用：PPTX 自动化生成、文档自动归档等。'
  ], { x: 0.98, y: 2.15, w: 3.25, h: 1.0 }, { fontSize: 15, color: C.text, paraSpaceAfterPt: 10 });

  addCard(slide, 5.0, 1.55, 4.12, 2.35, { fill: C.navy, line: C.navy });
  slide.addText('总结', {
    x: 5.3, y: 1.8, w: 0.8, h: 0.22,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: '9EE8EE', bold: true, margin: 0
  });
  slide.addText('Superpowers = 流程骨架\nSkills = 经验灵魂', {
    x: 5.28, y: 2.15, w: 2.9, h: 0.75,
    fontFace: 'Microsoft YaHei', fontSize: 21, bold: true, color: C.white, margin: 0, fit: 'shrink'
  });
  slide.addText('建议把最常用的“保姆指令”固化成 Skill，让开发过程真正可控。', {
    x: 5.28, y: 3.12, w: 3.2, h: 0.44,
    fontFace: 'Microsoft YaHei', fontSize: 14, color: 'D8EAF5', italic: true, margin: 0, fit: 'shrink'
  });
  addFooter(slide, 8, false);
}

// Slide 9
{
  const slide = pptx.addSlide();
  addSlideBase(slide, { bg: C.navy, dark: true });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 10, h: 5.625,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy }
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.05, y: 0.9, w: 7.9, h: 3.75,
    rectRadius: 0.12,
    line: { color: C.cyan, transparency: 80, width: 1 },
    fill: { color: '163654' }
  });
  slide.addText('Q&A', {
    x: 1.3, y: 1.35, w: 7.3, h: 0.65,
    fontFace: 'Calibri', fontSize: 30, bold: true, color: C.white,
    margin: 0, align: 'center'
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.25, y: 2.2, w: 5.5, h: 0.78,
    rectRadius: 0.07,
    line: { color: '567C98', width: 1 },
    fill: { color: '102A43' }
  });
  slide.addText('Process finished with exit code 0', {
    x: 2.58, y: 2.48, w: 4.85, h: 0.2,
    fontFace: 'Consolas', fontSize: 14, color: 'A7E3F1', margin: 0, align: 'center'
  });
  slide.addText('欢迎随时交流你的 Skills 总结心得！', {
    x: 1.55, y: 3.45, w: 6.9, h: 0.3,
    fontFace: 'Microsoft YaHei', fontSize: 18, bold: true, color: C.white, margin: 0, align: 'center'
  });
  addFooter(slide, 9, true);
}

pptx.writeFile({ fileName: 'E:/AIProject/ppt/AI辅助开发_Superpowers与Skills_分享稿.pptx' });
