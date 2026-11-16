/**
 * 初始化组件表
 * 用法：node scripts/init-widgets.js
 * 说明：把博客「组件展示」页面的 22 个组件写进数据库。
 *      已经存在的组件会跳过，可以放心重复执行。
 */
const BASE = process.env.API_BASE || 'https://qisui.asia/request'
const USER = process.env.API_USER || 'admin'
const PASS = process.env.API_PASS

const WIDGETS = [
    {
        "widget_key": "buttons",
        "title": "按钮组 Buttons",
        "desc": "主次、危险、幽灵、图标按钮",
        "category": "basics",
        "code_html": "<div class=\"demo-buttons\">\n  <button class=\"btn-demo primary\">主要按钮</button>\n  <button class=\"btn-demo secondary\">次要按钮</button>\n  <button class=\"btn-demo danger\">危险按钮</button>\n  <button class=\"btn-demo ghost\">幽灵按钮</button>\n  <button class=\"btn-demo primary\">\n    发送\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M5 12h14M12 5l7 7-7 7\"/>\n    </svg>\n  </button>\n</div>",
        "code_css": ".demo-buttons {\n  display: flex;\n    flex-wrap: wrap;\n    gap: 0.6rem;\n    align-items: center;\n    justify-content: center;\n}\n\n.btn-demo {\n  display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 0.55rem 1.1rem;\n    border: 1px solid transparent;\n    border-radius: var(--radius-sm);\n    font-family: var(--font-mono);\n    font-size: 0.85rem;\n    cursor: pointer;\n    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;\n}\n\n.btn-demo:hover {\n  transform: translateY(-1px);\n}\n\n.btn-demo.primary {\n  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-cyan-hover));\n    color: var(--bg-primary);\n    box-shadow: 0 4px 16px rgba(0, 212, 255, 0.18);\n}\n\n.btn-demo.secondary {\n  background: var(--bg-card);\n    color: var(--text-primary);\n    border-color: var(--border-color);\n}\n\n.btn-demo.secondary:hover {\n  border-color: var(--accent-cyan); color: var(--accent-cyan);\n}\n\n.btn-demo.danger {\n  background: var(--accent-pink); color: #fff;\n}\n\n.btn-demo.ghost {\n  background: transparent; color: var(--text-secondary); border-color: var(--border-color);\n}\n\n.btn-demo.ghost:hover {\n  color: var(--accent-cyan); border-color: var(--accent-cyan);\n}",
        "code_js": "// 按钮本身不需要 JS，hover 效果由 CSS 处理\n// 需要点击反馈时，在按钮上绑定事件即可\ndocument.querySelectorAll('.btn-demo').forEach((btn) => {\n  btn.addEventListener('click', () => {\n    console.log('点击了：', btn.textContent.trim());\n  });\n});",
        "sort_order": 1,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "badges",
        "title": "徽章 Badges",
        "desc": "状态标签、点状徽章",
        "category": "basics",
        "code_html": "<div class=\"demo-badges\">\n  <span class=\"badge-demo\">默认</span>\n  <span class=\"badge-demo success\">成功</span>\n  <span class=\"badge-demo warning\">警告</span>\n  <span class=\"badge-demo danger\">危险</span>\n  <span class=\"badge-demo info\">信息</span>\n  <span class=\"badge-demo success\"><span class=\"dot\"></span>在线</span>\n  <span class=\"badge-demo danger\"><span class=\"dot\"></span>离线</span>\n</div>",
        "code_css": ".demo-badges {\n  display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n    justify-content: center;\n}\n\n.badge-demo {\n  display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 0.3rem 0.7rem;\n    border: 1px solid var(--border-color);\n    border-radius: 999px;\n    background: var(--bg-card);\n    color: var(--text-secondary);\n    font-family: var(--font-mono);\n    font-size: 0.75rem;\n}\n\n.badge-demo.success {\n  color: var(--accent-green); border-color: rgba(0, 255, 136, 0.3); background: rgba(0, 255, 136, 0.06);\n}\n\n.badge-demo.warning {\n  color: var(--accent-orange); border-color: rgba(255, 107, 53, 0.3); background: rgba(255, 107, 53, 0.06);\n}\n\n.badge-demo.danger {\n  color: var(--accent-pink); border-color: rgba(255, 51, 102, 0.3); background: rgba(255, 51, 102, 0.06);\n}\n\n.badge-demo.info {\n  color: var(--accent-cyan); border-color: rgba(0, 212, 255, 0.3); background: rgba(0, 212, 255, 0.06);\n}\n\n.badge-demo .dot {\n  width: 6px; height: 6px; border-radius: 50%; background: currentColor;\n}",
        "code_js": "// 徽章是纯展示组件，不需要额外 JS\n// 需要动态状态时，修改 class 即可\n//   在线：class=\"badge-demo success\"\n//   离线：class=\"badge-demo danger\"",
        "sort_order": 2,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "avatar",
        "title": "头像组 Avatar",
        "desc": "重叠 + 展开更多",
        "category": "basics",
        "code_html": "<div class=\"avatar-group-demo\" id=\"avatarGroup\">\n  <span class=\"avatar-item\" style=\"background:#00d4ff\">Q</span>\n  <span class=\"avatar-item\" style=\"background:#a855f7\">E</span>\n  <span class=\"avatar-item\" style=\"background:#ff3366\">R</span>\n  <span class=\"avatar-item\" style=\"background:#00ff88\">M</span>\n  <span class=\"avatar-item avatar-more\">+2</span>\n</div>",
        "code_css": ".avatar-group-demo {\n  display: flex; align-items: center; padding: 1.5rem 1rem;\n    justify-content: center;\n}\n\n.avatar-item {\n  width: 44px; height: 44px;\n    display: inline-flex; align-items: center; justify-content: center;\n    border-radius: 50%; color: var(--bg-primary);\n    font: 700 0.95rem/1 var(--font-mono);\n    border: 2px solid var(--bg-primary);\n    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), margin 0.25s cubic-bezier(0.22, 1, 0.36, 1);\n    margin-left: -8px; flex-shrink: 0;\n}\n\n.avatar-group-demo .avatar-item:first-child {\n  margin-left: 0;\n}\n\n.avatar-more {\n  color: var(--text-muted);\n}\n\n.avatar-group-demo.expanded .avatar-item {\n  margin-left: 0.4rem; transform: translateY(-4px);\n}\n\n.avatar-group-demo.expanded .avatar-item:first-child {\n  margin-left: 0;\n}",
        "code_js": "// 点击展开 / 收起全部头像\nconst group = document.getElementById('avatarGroup');\nconst more = group.querySelector('.avatar-more');\n\nmore.addEventListener('click', () => {\n  const expanded = group.classList.toggle('expanded');\n  if (!expanded) {\n    // 收回时把第 4 个及之后的藏起来\n    [...group.querySelectorAll('.avatar-item')].forEach((item, i) => {\n      item.style.display = i >= 4 ? 'none' : '';\n    });\n  } else {\n    [...group.querySelectorAll('.avatar-item')].forEach((item) => {\n      item.style.display = '';\n    });\n  }\n});",
        "sort_order": 3,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "copy",
        "title": "复制按钮 Copy",
        "desc": "点击复制并提示",
        "category": "interactive",
        "code_html": "<div class=\"demo-copy\">\n  <span class=\"copy-text\" id=\"copyText\">npm install geek-blog-components</span>\n  <button class=\"copy-btn\" id=\"copyBtn\">\n    <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\"/>\n      <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/>\n    </svg>\n    复制\n  </button>\n</div>",
        "code_css": ".demo-copy {\n  display: flex; align-items: center; gap: 0.6rem; width: 100%; min-width: 0;\n}\n\n.copy-text {\n  flex: 1;\n    min-width: 0;\n    overflow: hidden;\n    padding: 0.5rem 0.8rem;\n    border: 1px solid var(--border-color);\n    border-radius: var(--radius-sm);\n    background: var(--bg-secondary);\n    color: var(--text-secondary);\n    font-family: var(--font-mono);\n    font-size: 0.85rem;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.copy-btn {\n  display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 4px;\n    padding: 0.5rem 0.85rem;\n    border: 0;\n    border-radius: var(--radius-sm);\n    background: var(--accent-cyan);\n    color: var(--bg-primary);\n    font-family: var(--font-mono);\n    font-size: 0.8rem;\n    cursor: pointer;\n    transition: transform 0.2s ease;\n}\n\n.copy-btn:hover {\n  transform: translateY(-1px);\n}",
        "code_js": "// 点击复制按钮，把旁边的文本复制走\nconst btn = document.getElementById('copyBtn');\nconst text = document.getElementById('copyText');\n\nbtn.addEventListener('click', async () => {\n  try {\n    await navigator.clipboard.writeText(text.textContent);\n    btn.lastChild.textContent = ' 已复制';\n  } catch (err) {\n    // 浏览器不允许时退回老办法\n    const ta = document.createElement('textarea');\n    ta.value = text.textContent;\n    document.body.appendChild(ta);\n    ta.select();\n    document.execCommand('copy');\n    ta.remove();\n    btn.lastChild.textContent = ' 已复制';\n  }\n  setTimeout(() => { btn.lastChild.textContent = ' 复制'; }, 1500);\n});",
        "sort_order": 4,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "ripple",
        "title": "波纹按钮 Ripple",
        "desc": "点击水波扩散",
        "category": "interactive",
        "code_html": "<div class=\"ripple-demo\" id=\"rippleDemo\">\n  <button class=\"ripple-btn primary\">波纹按钮</button>\n  <button class=\"ripple-btn success\">成功</button>\n  <button class=\"ripple-btn danger\">危险</button>\n</div>",
        "code_css": ".ripple-demo {\n  display: flex; gap: .8rem; flex-wrap: wrap; justify-content: center;\n}\n\n.ripple-btn {\n  position: relative; overflow: hidden;\n    padding: .6rem 1.4rem; border: none; border-radius: 8px;\n    font: 500 .9rem/1 ui-monospace, monospace; cursor: pointer; color: var(--bg-primary);\n    transition: transform .2s ease;\n}\n\n.ripple-btn:hover {\n  transform: translateY(-2px);\n}\n\n.ripple-btn.primary {\n  background: linear-gradient(135deg, #00d4ff, #00ff88);\n}\n\n.ripple-btn.success {\n  background: linear-gradient(135deg, #00ff88, #a855f7); color: #fff;\n}\n\n.ripple-btn.danger {\n  background: linear-gradient(135deg, #ff3366, #ff6b35); color: #fff;\n}\n\n@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }",
        "code_js": "// 点击时从点击位置扩散一个圆形波纹\nconst demo = document.getElementById('rippleDemo');\n\ndemo.addEventListener('click', (e) => {\n  const btn = e.target.closest('.ripple-btn');\n  if (!btn) return;\n\n  const rect = btn.getBoundingClientRect();\n  const size = Math.max(rect.width, rect.height);\n  const ripple = document.createElement('span');\n  ripple.style.cssText = `\n    position:absolute;\n    border-radius:50%;\n    transform:scale(0);\n    opacity:.6;\n    pointer-events:none;\n    width:${size}px;height:${size}px;\n    left:${e.clientX - rect.left - size / 2}px;\n    top:${e.clientY - rect.top - size / 2}px;\n    background:rgba(255,255,255,.55);\n    animation: ripple .6s ease-out;\n  `;\n  btn.appendChild(ripple);\n  setTimeout(() => ripple.remove(), 600);\n});",
        "sort_order": 5,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "magnetic",
        "title": "磁吸按钮 Magnetic",
        "desc": "跟随光标吸附",
        "category": "interactive",
        "code_html": "<div class=\"magnetic-demo\" id=\"magneticDemo\">\n  <button class=\"magnetic-btn\">磁吸按钮</button>\n  <button class=\"magnetic-btn accent\">强调按钮</button>\n</div>",
        "code_css": ".magnetic-demo {\n  display: flex; gap: 1.5rem; justify-content: center; align-items: center;\n    min-height: 120px; padding: 1rem;\n}\n\n.magnetic-btn {\n  padding: .9rem 1.8rem; border-radius: 999px;\n    border: 1px solid var(--accent-cyan); background: transparent;\n    color: var(--accent-cyan);\n    font: 600 .95rem/1 ui-monospace, monospace; cursor: pointer;\n    transition: transform .25s cubic-bezier(.22,1,.36,1), background .25s, box-shadow .25s, color .25s;\n}\n\n.magnetic-btn:hover {\n  background: var(--accent-cyan); color: var(--bg-primary);\n    box-shadow: 0 0 28px rgba(0,212,255,.4);\n}\n\n.magnetic-btn.accent {\n  border-color: var(--accent-pink); color: var(--accent-pink);\n}\n\n.magnetic-btn.accent:hover {\n  background: var(--accent-pink); color: #fff;\n    box-shadow: 0 0 28px rgba(255,51,102,.4);\n}",
        "code_js": "// 按钮跟随光标轻微吸附\nconst demo = document.getElementById('magneticDemo');\nconst STRENGTH = 0.35;\n\ndemo.querySelectorAll('.magnetic-btn').forEach((btn) => {\n  btn.addEventListener('mousemove', (e) => {\n    const rect = btn.getBoundingClientRect();\n    const x = (e.clientX - rect.left - rect.width / 2) * STRENGTH;\n    const y = (e.clientY - rect.top - rect.height / 2) * STRENGTH;\n    btn.style.transform = `translate(${x}px, ${y}px)`;\n  });\n\n  btn.addEventListener('mouseleave', () => {\n    btn.style.transform = 'translate(0, 0)';\n  });\n});",
        "sort_order": 6,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "star",
        "title": "5 星评分 Star",
        "desc": "半星精度 + 语义标签",
        "category": "interactive",
        "code_html": "<div class=\"star-demo\" id=\"starDemo\">\n  <div class=\"star-row\" id=\"starRow\">\n    <span class=\"star-cell\" data-v=\"1\"><span class=\"star-bg\">★</span><span class=\"star-fg\">★</span></span>\n    <span class=\"star-cell\" data-v=\"2\"><span class=\"star-bg\">★</span><span class=\"star-fg\">★</span></span>\n    <span class=\"star-cell\" data-v=\"3\"><span class=\"star-bg\">★</span><span class=\"star-fg\">★</span></span>\n    <span class=\"star-cell\" data-v=\"4\"><span class=\"star-bg\">★</span><span class=\"star-fg\">★</span></span>\n    <span class=\"star-cell\" data-v=\"5\"><span class=\"star-bg\">★</span><span class=\"star-fg\">★</span></span>\n  </div>\n  <div class=\"star-info\">\n    <span class=\"star-value\" id=\"starValue\">0.0</span>\n    <span class=\"star-label\" id=\"starLabel\">未评分</span>\n  </div>\n</div>",
        "code_css": ".star-demo {\n  display: flex; flex-direction: column; align-items: center; gap: 0.9rem; padding: 1rem;\n}\n\n.star-row {\n  display: flex; gap: 0.35rem;\n}\n\n.star-cell {\n  position: relative; width: 30px; height: 30px;\n    font: 600 1.7rem/1 ui-monospace, monospace; cursor: pointer;\n    display: inline-block;\n}\n\n.star-cell > span {\n  position: absolute; inset: 0; display: inline-block; text-align: center; line-height: 30px; user-select: none;\n}\n\n.star-bg {\n  color: var(--border-color);\n}\n\n.star-fg {\n  color: var(--accent-cyan); overflow: hidden; white-space: nowrap; pointer-events: none;\n}\n\n.star-info {\n  display: flex; gap: 0.8rem; align-items: baseline; font-family: var(--font-mono);\n}\n\n.star-value {\n  font: 700 1.05rem/1 var(--font-mono); color: var(--text-primary); font-variant-numeric: tabular-nums;\n}\n\n.star-label {\n  font: 400 0.8rem/1 var(--font-mono); color: var(--text-muted); letter-spacing: 0.15em;\n}",
        "code_js": "// 半星精度评分：按鼠标位置算出几分\nconst row = document.getElementById('starRow');\nconst valueEl = document.getElementById('starValue');\nconst labelEl = document.getElementById('starLabel');\nconst LABELS = ['未评分', '很差', '较差', '一般', '不错', '很棒'];\n\nfunction paint(score) {\n  row.querySelectorAll('.star-cell').forEach((cell) => {\n    const v = Number(cell.dataset.v);\n    const fill = cell.querySelector('.star-fg');\n    const percent = Math.max(0, Math.min(1, score - v + 1)) * 100;\n    fill.style.width = percent + '%';\n  });\n  valueEl.textContent = score.toFixed(1);\n  labelEl.textContent = LABELS[Math.round(score)];\n}\n\nrow.addEventListener('mousemove', (e) => {\n  const cell = e.target.closest('.star-cell');\n  if (!cell) return;\n  const rect = cell.getBoundingClientRect();\n  const ratio = (e.clientX - rect.left) / rect.width;\n  paint(Number(cell.dataset.v) - 1 + ratio);\n});\n\nrow.addEventListener('mouseleave', () => paint(0));\n\nrow.addEventListener('click', (e) => {\n  const cell = e.target.closest('.star-cell');\n  if (!cell) return;\n  const rect = cell.getBoundingClientRect();\n  const ratio = (e.clientX - rect.left) / rect.width;\n  const score = Number(cell.dataset.v) - 1 + ratio;\n  row.dataset.score = score;\n  paint(score);\n});",
        "sort_order": 7,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "range",
        "title": "双滑块区间 Range",
        "desc": "左右联动 + 数字输入",
        "category": "interactive",
        "code_html": "<div class=\"range-demo\" id=\"rangeDemo\">\n  <div class=\"range-values\">\n    <span id=\"rangeMin\">20</span>\n    <span class=\"range-sep\">—</span>\n    <span id=\"rangeMax\">80</span>\n  </div>\n  <div class=\"range-track\" id=\"rangeTrack\">\n    <div class=\"range-fill\" id=\"rangeFill\"></div>\n    <input type=\"range\" id=\"rangeLeft\" min=\"0\" max=\"100\" value=\"20\" class=\"range-handle\" />\n    <input type=\"range\" id=\"rangeRight\" min=\"0\" max=\"100\" value=\"80\" class=\"range-handle\" />\n  </div>\n</div>",
        "code_css": ".range-demo {\n  padding: 1.4rem 1rem 0.8rem; display: flex; flex-direction: column; gap: 1rem;\n}\n\n.range-values {\n  display: flex; gap: 0.8rem; align-items: baseline;\n    font: 700 1.1rem/1 var(--font-mono); color: var(--text-primary);\n    font-variant-numeric: tabular-nums;\n}\n\n.range-sep {\n  color: var(--text-muted); font-weight: 400;\n}\n\n.range-track {\n  position: relative; height: 4px;\n    background: var(--border-color); border-radius: 999px; margin: 28px 12px 12px;\n}\n\n.range-fill {\n  position: absolute; top: 0; height: 100%;\n    background: linear-gradient(90deg, var(--accent-cyan), var(--accent-pink));\n    border-radius: 999px;\n}\n\n.range-handle {\n  position: absolute; top: 50%; transform: translate(-50%, -50%);\n    width: 18px; height: 18px;\n    background: var(--bg-primary); border: 2px solid var(--accent-cyan);\n    border-radius: 50%; cursor: grab;\n    transition: transform 0.15s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.15s cubic-bezier(0.22, 1, 0.36, 1);\n}\n\n.range-handle:hover {\n  transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 12px rgba(0, 212, 255, 0.5);\n}\n\n.range-handle:active {\n  cursor: grabbing;\n}\n\n.range-tooltip {\n  position: absolute; bottom: calc(100% + 8px); left: 50%;\n    transform: translateX(-50%);\n    padding: 2px 8px; border-radius: 4px;\n    background: var(--bg-secondary); color: var(--text-primary);\n    font: 600 0.7rem/1.6 var(--font-mono);\n    font-variant-numeric: tabular-nums;\n    border: 1px solid var(--border-color); white-space: nowrap;\n}",
        "code_js": "// 双滑块区间：左右互相约束，不能交叉\nconst left = document.getElementById('rangeLeft');\nconst right = document.getElementById('rangeRight');\nconst fill = document.getElementById('rangeFill');\nconst minEl = document.getElementById('rangeMin');\nconst maxEl = document.getElementById('rangeMax');\n\nfunction render() {\n  const min = Number(left.value);\n  const max = Number(right.value);\n  fill.style.left = min + '%';\n  fill.style.width = max - min + '%';\n  minEl.textContent = min;\n  maxEl.textContent = max;\n}\n\nleft.addEventListener('input', () => {\n  if (Number(left.value) > Number(right.value)) left.value = right.value;\n  render();\n});\n\nright.addEventListener('input', () => {\n  if (Number(right.value) < Number(left.value)) right.value = left.value;\n  render();\n});\n\nrender();",
        "sort_order": 8,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "cascader",
        "title": "多级联动 Cascader",
        "desc": "省市区级联选择",
        "category": "interactive",
        "code_html": "<div class=\"cascade-demo\" id=\"cascadeDemo\">\n  <button class=\"cascade-trigger\" id=\"cascadeTrigger\">\n    <span class=\"cascade-label\" id=\"cascadeLabel\">请选择地区</span>\n    <svg class=\"cascade-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n      <path d=\"M6 9l6 6 6-6\"/>\n    </svg>\n  </button>\n  <div class=\"cascade-panels\" id=\"cascadePanels\"></div>\n</div>",
        "code_css": ".cascade-demo {\n  position: relative; padding: 1rem; display: flex; justify-content: center;\n}\n\n.cascade-trigger {\n  display: inline-flex; align-items: center; gap: 0.6rem;\n    padding: 0.55rem 1rem; border: 1px solid var(--border-color);\n    border-radius: 8px; background: var(--bg-secondary);\n    color: var(--text-primary); font: 500 0.85rem/1 var(--font-mono);\n    cursor: pointer; min-width: 240px; justify-content: space-between;\n    transition: border-color 0.2s ease;\n}\n\n.cascade-trigger:hover {\n  border-color: var(--accent-cyan);\n}\n\n.cascade-placeholder {\n  color: var(--text-muted);\n}\n\n.cascade-label {\n  color: var(--text-primary);\n}\n\n.cascade-icon {\n  color: var(--accent-cyan); transition: transform 0.2s ease;\n}\n\n.cascade-icon.open {\n  transform: rotate(180deg);\n}\n\n.cascade-panels {\n  position: absolute; top: calc(100% - 8px); left: 50%; transform: translateX(-50%);\n    display: flex; gap: 0.4rem; z-index: 10;\n    background: var(--bg-card); border: 1px solid var(--border-color);\n    border-radius: 8px; padding: 0.4rem;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n    animation: cascadeIn 0.2s cubic-bezier(0.22, 1, 0.36, 1);\n}\n\n.cascade-level {\n  list-style: none; margin: 0; padding: 0.3rem;\n    min-width: 130px; max-height: 220px; overflow-y: auto;\n    background: var(--bg-secondary); border-radius: 6px;\n}\n\n.cascade-item {\n  display: flex; align-items: center; justify-content: space-between;\n    padding: 0.4rem 0.6rem; border-radius: 4px;\n    font: 500 0.8rem/1 var(--font-mono); color: var(--text-primary);\n    cursor: pointer; transition: background 0.15s ease;\n}\n\n.cascade-item:hover {\n  background: rgba(0, 212, 255, 0.1);\n}\n\n.cascade-item.active {\n  background: rgba(0, 212, 255, 0.18); color: var(--accent-cyan);\n}\n\n.cascade-arrow {\n  color: var(--text-muted); font-size: 1rem;\n}\n\n@keyframes cascadeIn {\n  from { opacity: 0; transform: translateX(-50%) translateY(-6px); }\n  to { opacity: 1; transform: translateX(-50%) translateY(0); }\n}",
        "code_js": "// 多级联动：省 → 市 → 区\nconst DATA = {\n  浙江省: { 杭州市: ['西湖区', '拱墅区', '滨江区'], 宁波市: ['海曙区', '江北区', '鄞州区'] },\n  江苏省: { 南京市: ['玄武区', '鼓楼区', '建邺区'], 苏州市: ['姑苏区', '虎丘区', '吴中区'] },\n  广东省: { 广州市: ['越秀区', '海珠区', '天河区'], 深圳市: ['福田区', '罗湖区', '南山区'] }\n};\n\nconst trigger = document.getElementById('cascadeTrigger');\nconst label = document.getElementById('cascadeLabel');\nconst panels = document.getElementById('cascadePanels');\n\nlet current = ['', '', ''];\n\nfunction renderPanels(level) {\n  const names = Object.keys(DATA);\n  const list = level === 0 ? names : (DATA[current[0]] ? Object.keys(DATA[current[0]]) : []);\n  panels.innerHTML = '';\n\n  list.forEach((name) => {\n    const col = document.createElement('div');\n    col.className = 'cascade-col';\n    col.innerHTML = list.length\n      ? list.map((n) => `<div class=\"cascade-item\" data-name=\"${n}\">${n}</div>`).join('')\n      : '';\n    panels.appendChild(col);\n  });\n\n  panels.querySelectorAll('.cascade-item').forEach((item) => {\n    item.addEventListener('click', () => {\n      current[level] = item.dataset.name;\n      if (level === 0) {\n        current[1] = '';\n        current[2] = '';\n      }\n      if (level === 1) current[2] = '';\n      label.textContent = current.filter(Boolean).join(' / ') || '请选择地区';\n      renderPanels(level + 1);\n    });\n  });\n}\n\ntrigger.addEventListener('click', () => {\n  panels.classList.toggle('open');\n});\n\ndocument.addEventListener('click', (e) => {\n  if (!e.target.closest('#cascadeDemo')) panels.classList.remove('open');\n});\n\nrenderPanels(0);",
        "sort_order": 9,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "counter",
        "title": "计数器 Counter",
        "desc": "点击 +/- 步进",
        "category": "data",
        "code_html": "<div class=\"demo-counter\">\n  <div class=\"counter-number\" id=\"counterNum\">0</div>\n  <div class=\"counter-suffix\">当前数量</div>\n  <div class=\"row\" style=\"display:flex;gap:.5rem;justify-content:center;margin-top:1rem\">\n    <button class=\"anim-num-btn\" data-step=\"-1\">-</button>\n    <button class=\"anim-num-btn\" data-step=\"1\">+</button>\n  </div>\n</div>",
        "code_css": ".demo-counter {\n  text-align: center;\n}\n\n.counter-number {\n  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-green));\n    background-clip: text;\n    color: transparent;\n    font-family: var(--font-display);\n    font-size: 2.6rem;\n    font-weight: 800;\n    line-height: 1;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n}\n\n.counter-suffix {\n  margin-top: 0.4rem; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.78rem;\n}",
        "code_js": "// 简单的加减计数器\nconst num = document.getElementById('counterNum');\nlet value = 0;\n\ndocument.querySelectorAll('[data-step]').forEach((btn) => {\n  btn.addEventListener('click', () => {\n    value += Number(btn.dataset.step);\n    num.textContent = value;\n  });\n});",
        "sort_order": 10,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "progress",
        "title": "进度条 Progress",
        "desc": "线性 + 圆形",
        "category": "data",
        "code_html": "<div class=\"demo-progress\">\n  <div class=\"progress-row\">\n    <div class=\"progress-label\"><span>Vue</span><span class=\"progress-percent\">92%</span></div>\n    <div class=\"progress-track\"><div class=\"progress-fill cyan\" style=\"width:92%\"></div></div>\n  </div>\n  <div class=\"progress-row\">\n    <div class=\"progress-label\"><span>TypeScript</span><span class=\"progress-percent\">78%</span></div>\n    <div class=\"progress-track\"><div class=\"progress-fill purple\" style=\"width:78%\"></div></div>\n  </div>\n  <div class=\"progress-row\">\n    <div class=\"progress-label\"><span>Node.js</span><span class=\"progress-percent\">65%</span></div>\n    <div class=\"progress-track\"><div class=\"progress-fill green\" style=\"width:65%\"></div></div>\n  </div>\n  <div class=\"progress-row\">\n    <div class=\"progress-label\"><span>Rust</span><span class=\"progress-percent\">24%</span></div>\n    <div class=\"progress-track\"><div class=\"progress-fill orange\" style=\"width:24%\"></div></div>\n  </div>\n</div>",
        "code_css": ".demo-progress {\n  display: flex; flex-direction: column; gap: 0.75rem; width: 100%;\n}\n\n.progress-row {\n  display: flex; flex-direction: column; gap: 0.3rem;\n}\n\n.progress-label {\n  display: flex; justify-content: space-between; color: var(--text-secondary); font-family: var(--font-mono); font-size: 0.78rem;\n}\n\n.progress-percent {\n  color: var(--accent-cyan); font-weight: 600;\n}\n\n.progress-track {\n  height: 6px; overflow: hidden; border-radius: 3px; background: var(--bg-secondary);\n}\n\n.progress-fill {\n  height: 100%; border-radius: 3px; transform-origin: left; animation: widgetFillIn 1s cubic-bezier(0.22, 1, 0.36, 1);\n}\n\n.progress-fill.cyan {\n  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-green));\n}\n\n.progress-fill.purple {\n  background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink));\n}\n\n.progress-fill.green {\n  background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));\n}\n\n.progress-fill.orange {\n  background: linear-gradient(90deg, var(--accent-orange), var(--accent-pink));\n}\n\n@keyframes widgetFillIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }",
        "code_js": "// 让进度条动起来：宽度从 0 过渡到目标值\ndocument.querySelectorAll('.progress-fill').forEach((fill) => {\n  const target = fill.style.width;\n  fill.style.width = '0%';\n  requestAnimationFrame(() => {\n    fill.style.width = target;\n  });\n});\n\n// 需要实时刷新时，改写 style.width 即可，CSS 里的动画会自动补间",
        "sort_order": 11,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "typing",
        "title": "打字机 Typing",
        "desc": "逐字打印 + 光标闪烁",
        "category": "data",
        "code_html": "<div class=\"demo-typing\">\n  <span class=\"typing-text\" id=\"typingText\"></span><span class=\"typing-cursor\">_</span>\n</div>",
        "code_css": ".demo-typing {\n  color: var(--text-primary); font-family: var(--font-mono); font-size: 1.15rem;\n}\n\n.typing-text {\n  color: var(--accent-cyan);\n}\n\n.typing-cursor {\n  margin-left: 2px; color: var(--accent-green); animation: widgetBlink 1s infinite;\n}\n\n@keyframes widgetBlink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }",
        "code_js": "// 逐字打印 + 删除的循环打字机\nconst el = document.getElementById('typingText');\nconst phrases = ['Hello, World!', '前端工程师', '写代码是一件快乐的事'];\nlet pi = 0, ci = 0, deleting = false;\n\n(function type() {\n  const text = phrases[pi];\n  el.textContent = text.slice(0, ci);\n\n  if (!deleting && ci < text.length) {\n    ci++;\n    setTimeout(type, 90);\n  } else if (!deleting) {\n    deleting = true;\n    setTimeout(type, 1600);\n  } else if (ci > 0) {\n    ci--;\n    setTimeout(type, 45);\n  } else {\n    deleting = false;\n    pi = (pi + 1) % phrases.length;\n    setTimeout(type, 300);\n  }\n})();",
        "sort_order": 12,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "clock",
        "title": "实时时钟 Clock",
        "desc": "时分秒 + 圆点秒针",
        "category": "data",
        "code_html": "<div class=\"demo-clock\">\n  <div class=\"clock-time\" id=\"clockTime\">00:00:00</div>\n  <div class=\"clock-date\" id=\"clockDate\">加载中…</div>\n</div>",
        "code_css": ".demo-clock {\n  text-align: center;\n}\n\n.clock-time {\n  color: var(--accent-cyan);\n    font-family: var(--font-mono);\n    font-size: 2.2rem;\n    font-weight: 700;\n    letter-spacing: 0;\n    line-height: 1;\n    text-shadow: 0 0 20px rgba(0, 212, 255, 0.25);\n}\n\n.clock-date {\n  margin-top: 0.4rem; color: var(--text-muted); font-family: var(--font-mono); font-size: 0.8rem;\n}",
        "code_js": "// 每秒更新一次的实时时钟\nconst timeEl = document.getElementById('clockTime');\nconst dateEl = document.getElementById('clockDate');\nconst WEEK = ['日', '一', '二', '三', '四', '五', '六'];\n\nfunction pad(n) {\n  return String(n).padStart(2, '0');\n}\n\nfunction tick() {\n  const d = new Date();\n  timeEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;\n  dateEl.textContent = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日 星期${WEEK[d.getDay()]}`;\n}\n\ntick();\nsetInterval(tick, 1000);",
        "sort_order": 13,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "anim-num",
        "title": "动画数字 AnimNum",
        "desc": "缓动递增到目标值",
        "category": "data",
        "code_html": "<div class=\"anim-num-demo\">\n  <div class=\"anim-num\" id=\"animNum\">0</div>\n  <button class=\"anim-num-btn\" id=\"animBtn\">重新播放</button>\n</div>",
        "code_css": ".anim-num-demo {\n  display: flex; flex-direction: column; align-items: center; gap: 1rem;\n    padding: 1.2rem 1rem;\n}\n\n.anim-num {\n  font: 800 3rem/1 var(--font-mono); color: var(--text-primary);\n    font-variant-numeric: tabular-nums;\n    letter-spacing: 0.04em;\n    text-shadow: 0 0 24px rgba(0, 212, 255, 0.35);\n}\n\n.anim-num-btn {\n  padding: 0.4rem 1.1rem; border: 1px solid var(--border-color);\n    border-radius: 6px; background: transparent;\n    color: var(--text-muted); font: 500 0.78rem/1 var(--font-mono);\n    cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease;\n}\n\n.anim-num-btn:hover {\n  border-color: var(--accent-cyan); color: var(--accent-cyan);\n}",
        "code_js": "// 数字从 0 缓动递增到目标值\nconst el = document.getElementById('animNum');\nconst btn = document.getElementById('animBtn');\n\nfunction run(target, duration = 1400) {\n  const start = performance.now();\n  function step(now) {\n    const p = Math.min(1, (now - start) / duration);\n    const eased = 1 - Math.pow(1 - p, 3);\n    el.textContent = Math.round(target * eased);\n    if (p < 1) requestAnimationFrame(step);\n  }\n  requestAnimationFrame(step);\n}\n\nbtn.addEventListener('click', () => run(12800));\nrun(12800);",
        "sort_order": 14,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "palette",
        "title": "色板 Palette",
        "desc": "可复制 HEX",
        "category": "visual",
        "code_html": "<div class=\"demo-palette\" id=\"palette\">\n  <button class=\"palette-swatch\" data-hex=\"#00d4ff\">\n    <span class=\"swatch-color\" style=\"background:#00d4ff\"></span>\n    <span class=\"swatch-meta\">\n      <span class=\"swatch-name\">青色</span>\n      <span class=\"swatch-hex\">#00d4ff</span>\n    </span>\n  </button>\n  <button class=\"palette-swatch\" data-hex=\"#00ff88\">\n    <span class=\"swatch-color\" style=\"background:#00ff88\"></span>\n    <span class=\"swatch-meta\">\n      <span class=\"swatch-name\">绿色</span>\n      <span class=\"swatch-hex\">#00ff88</span>\n    </span>\n  </button>\n  <button class=\"palette-swatch\" data-hex=\"#a855f7\">\n    <span class=\"swatch-color\" style=\"background:#a855f7\"></span>\n    <span class=\"swatch-meta\">\n      <span class=\"swatch-name\">紫色</span>\n      <span class=\"swatch-hex\">#a855f7</span>\n    </span>\n  </button>\n  <button class=\"palette-swatch\" data-hex=\"#ff3366\">\n    <span class=\"swatch-color\" style=\"background:#ff3366\"></span>\n    <span class=\"swatch-meta\">\n      <span class=\"swatch-name\">粉色</span>\n      <span class=\"swatch-hex\">#ff3366</span>\n    </span>\n  </button>\n  <button class=\"palette-swatch\" data-hex=\"#ff6b35\">\n    <span class=\"swatch-color\" style=\"background:#ff6b35\"></span>\n    <span class=\"swatch-meta\">\n      <span class=\"swatch-name\">橙色</span>\n      <span class=\"swatch-hex\">#ff6b35</span>\n    </span>\n  </button>\n</div>",
        "code_css": ".demo-palette {\n  display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0.5rem; width: 100%;\n}\n\n.palette-swatch {\n  display: flex;\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0.4rem;\n    min-width: 0;\n    padding: 0.4rem;\n    border: 1px solid var(--border-color);\n    border-radius: var(--radius-sm);\n    background: var(--bg-card);\n    font-family: var(--font-mono);\n    text-align: left;\n    cursor: pointer;\n    transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.palette-swatch:hover {\n  border-color: var(--accent-cyan); transform: translateY(-2px);\n}\n\n.swatch-color {\n  display: block; height: 28px; border-radius: 4px;\n}\n\n.swatch-meta {\n  display: flex; flex-direction: column; gap: 1px; min-width: 0; padding: 0 2px;\n}\n\n.swatch-name, .swatch-hex {\n  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\n}\n\n.swatch-name {\n  color: var(--text-primary); font-size: 0.7rem;\n}\n\n.swatch-hex {\n  color: var(--text-muted); font-size: 0.65rem;\n}",
        "code_js": "// 点击色块复制 HEX 值\ndocument.querySelectorAll('.palette-swatch').forEach((swatch) => {\n  swatch.addEventListener('click', async () => {\n    const hex = swatch.dataset.hex;\n    try {\n      await navigator.clipboard.writeText(hex);\n      const name = swatch.querySelector('.swatch-name');\n      const old = name.textContent;\n      name.textContent = '已复制';\n      setTimeout(() => { name.textContent = old; }, 1200);\n    } catch (err) {\n      console.warn('复制失败', err);\n    }\n  });\n});",
        "sort_order": 15,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "neon",
        "title": "霓虹文字 Neon",
        "desc": "辉光 + 闪烁",
        "category": "visual",
        "code_html": "<div class=\"neon-demo\">\n  <div class=\"neon-title\" data-text=\"NEON\">NEON</div>\n  <div class=\"neon-sub\">辉光 + 闪烁</div>\n</div>",
        "code_css": ".neon-demo {\n  text-align: center; padding: 1rem;\n}\n\n.neon-title {\n  font: 800 2.6rem/1 ui-monospace, monospace;\n    color: #fff; position: relative; letter-spacing: .05em;\n    animation: neonFlicker 2.5s infinite alternate;\n}\n\n.neon-title::before, .neon-title::after {\n  content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; pointer-events: none;\n}\n\n.neon-title::before {\n  color: var(--accent-cyan);\n    text-shadow: 0 0 8px var(--accent-cyan);\n    animation: neonOffset 2s infinite alternate; z-index: -1;\n}\n\n.neon-title::after {\n  color: var(--accent-pink);\n    text-shadow: 0 0 8px var(--accent-pink);\n    animation: neonOffset 2s infinite alternate-reverse; z-index: -2;\n}\n\n.neon-sub {\n  margin-top: .8rem;\n    font: 400 .85rem/1 ui-monospace, monospace;\n    color: var(--muted); letter-spacing: .3em;\n}\n\n@keyframes neonFlicker {\n  0%, 90%, 100% { text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff; }\n  92% { text-shadow: none; }\n  95% { text-shadow: 0 0 4px #fff, 0 0 11px #fff; }\n}\n\n@keyframes neonOffset {\n  from { transform: translate(-2px, 0); }\n  to { transform: translate(2px, 0); }\n}",
        "code_js": "// 纯 CSS 实现，data-text 属性用来生成两层错位的彩色描边\n// 只要改 data-text 的内容，描边文字会跟着变\nconst title = document.querySelector('.neon-title');\n\n// 想让文字随机变化的话：\n// setInterval(() => {\n//   const text = 'NEON';\n//   title.dataset.text = text;\n//   title.textContent = text;\n// }, 3000);",
        "sort_order": 16,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "confetti",
        "title": "礼花 Confetti",
        "desc": "点击撒花粒子",
        "category": "visual",
        "code_html": "<div class=\"confetti-demo\" id=\"confettiDemo\">\n  <button class=\"confetti-btn\" id=\"confettiBtn\">点击撒花</button>\n  <span class=\"confetti-hint\">点一下试试</span>\n</div>",
        "code_css": ".confetti-demo {\n  position: relative; text-align: center; padding: 1rem;\n    min-height: 120px;\n}\n\n.confetti-btn {\n  padding: .9rem 1.8rem; border: none; border-radius: 8px;\n    background: linear-gradient(135deg, var(--accent-cyan), var(--accent-pink));\n    color: #fff;\n    font: 600 .95rem/1 ui-monospace, monospace; cursor: pointer;\n    transition: transform .2s ease, box-shadow .2s ease;\n    position: relative; z-index: 2;\n}\n\n.confetti-btn:hover {\n  transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0,212,255,.35);\n}\n\n.confetti-hint {\n  display: block; margin-top: .8rem;\n    font: 400 .78rem/1 ui-monospace, monospace; color: var(--muted);\n}\n\n@keyframes confettiFly {\n  to {\n    transform: translate(var(--dx, 0), var(--dy, 0)) rotate(var(--r, 0deg));\n    opacity: 0;\n  }\n}",
        "code_js": "// 点击按钮撒一把彩纸\nconst btn = document.getElementById('confettiBtn');\nconst demo = document.getElementById('confettiDemo');\nconst COLORS = ['#00d4ff', '#ff00e5', '#b000ff', '#00ff9f'];\n\nbtn.addEventListener('click', () => {\n  const rect = btn.getBoundingClientRect();\n  const cx = rect.left + rect.width / 2;\n  const cy = rect.top + rect.height / 2;\n\n  for (let i = 0; i < 40; i++) {\n    const p = document.createElement('span');\n    const color = COLORS[i % COLORS.length];\n    p.style.cssText = `\n      position:fixed;left:${cx}px;top:${cy}px;width:8px;height:12px;\n      background:${color};pointer-events:none;z-index:9999;border-radius:1px;\n      animation: confettiFly 1.1s ease-out forwards;\n    `;\n    p.style.setProperty('--tx', (Math.random() - 0.5) * 320 + 'px');\n    p.style.setProperty('--ty', -120 - Math.random() * 200 + 'px');\n    document.body.appendChild(p);\n    setTimeout(() => p.remove(), 1200);\n  }\n});",
        "sort_order": 17,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "tilt",
        "title": "3D 倾斜卡片 Tilt",
        "desc": "光标控制透视",
        "category": "visual",
        "code_html": "<div class=\"tilt-demo\" id=\"tiltDemo\">\n  <div class=\"tilt-card\" id=\"tiltCard\">\n    <div class=\"tilt-content\">\n      <div class=\"tilt-icon\">◆</div>\n      <div class=\"tilt-title\">3D 倾斜卡片</div>\n      <div class=\"tilt-tag\">移动光标试试</div>\n    </div>\n  </div>\n</div>",
        "code_css": ".tilt-demo {\n  display: flex; justify-content: center;\n    perspective: 800px; padding: 1rem;\n    min-height: 180px;\n}\n\n.tilt-card {\n  width: 220px; height: 140px;\n    background: linear-gradient(135deg, rgba(0,212,255,.1), rgba(255,51,102,.1));\n    border: 1px solid rgba(0,212,255,.3); border-radius: 12px;\n    padding: 1.2rem; display: flex; align-items: center; justify-content: center;\n    transition: transform .15s ease; position: relative; overflow: hidden;\n}\n\n.tilt-card::before {\n  content: ''; position: absolute; inset: 0;\n    background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,212,255,.25), transparent 50%);\n    pointer-events: none;\n}\n\n.tilt-content {\n  text-align: center; position: relative;\n}\n\n.tilt-icon {\n  display: block; font-size: 1.8rem; color: var(--accent-cyan); margin-bottom: .4rem;\n}\n\n.tilt-content h3 {\n  font: 700 1rem/1 ui-monospace, monospace; color: var(--text-primary); margin-bottom: .3rem;\n}\n\n.tilt-content p {\n  font: 400 .78rem/1.2 ui-monospace, monospace; color: var(--text-secondary); margin-bottom: .5rem;\n}\n\n.tilt-tag {\n  font: 500 .7rem/1 ui-monospace, monospace; color: var(--accent-green);\n}",
        "code_js": "// 卡片跟着光标做 3D 透视倾斜，并让高光跟随\nconst card = document.getElementById('tiltCard');\nconst MAX = 12;\n\ncard.addEventListener('mousemove', (e) => {\n  const rect = card.getBoundingClientRect();\n  const px = (e.clientX - rect.left) / rect.width;\n  const py = (e.clientY - rect.top) / rect.height;\n\n  card.style.transform = `perspective(800px) rotateY(${(px - 0.5) * MAX * 2}deg) rotateX(${(0.5 - py) * MAX * 2}deg)`;\n  card.style.setProperty('--glow-x', px * 100 + '%');\n  card.style.setProperty('--glow-y', py * 100 + '%');\n});\n\ncard.addEventListener('mouseleave', () => {\n  card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';\n});",
        "sort_order": 18,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "liquid",
        "title": "液态加载 Liquid",
        "desc": "波浪动画",
        "category": "visual",
        "code_html": "<div class=\"liquid-demo\">\n  <div class=\"liquid-blob\"></div>\n  <div class=\"liquid-text\">LOADING</div>\n</div>",
        "code_css": ".liquid-demo {\n  display: flex; flex-direction: column; align-items: center; gap: 1.2rem; padding: 1rem;\n    min-height: 140px;\n}\n\n.liquid-blob {\n  width: 80px; height: 80px;\n    background: linear-gradient(135deg, #00d4ff, #a855f7, #ff3366);\n    background-size: 200% 200%;\n    animation: liquidMove 3s ease-in-out infinite, liquidColor 4s linear infinite;\n}\n\n.liquid-text {\n  font: 500 .8rem/1 ui-monospace, monospace;\n    color: var(--muted); letter-spacing: .3em;\n    animation: liquidText 1.5s ease-in-out infinite;\n}\n\n@keyframes liquidMove {\n  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }\n  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.1); }\n  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; transform: rotate(180deg) scale(.95); }\n  75% { border-radius: 60% 40% 60% 30% / 60% 30% 40% 70%; transform: rotate(270deg) scale(1.05); }\n}\n\n@keyframes liquidColor {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes liquidText {\n  0%, 100% { opacity: .4; }\n  50% { opacity: 1; color: var(--accent-cyan); }\n}",
        "code_js": "// 纯 CSS 动画，blob 会同时做波浪形变和颜色流动\n// 想换配色就改 .liquid-blob 的 linear-gradient\nconst blob = document.querySelector('.liquid-blob');\n\n// 如果要在 JS 里控制加载进度：\n// blob.style.setProperty('--progress', '0.6');",
        "sort_order": 19,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "marquee",
        "title": "跑马灯 Marquee",
        "desc": "无缝无限滚动",
        "category": "visual",
        "code_html": "<div class=\"marquee-demo\">\n  <div class=\"marquee-track\" id=\"marqueeTrack\">\n    <span class=\"marquee-chip\">Vue</span>\n    <span class=\"marquee-chip\">React</span>\n    <span class=\"marquee-chip\">Node.js</span>\n    <span class=\"marquee-chip\">TypeScript</span>\n    <span class=\"marquee-chip\">Docker</span>\n    <span class=\"marquee-chip\">Rust</span>\n    <span class=\"marquee-chip\">GraphQL</span>\n    <span class=\"marquee-chip\">WASM</span>\n    <span class=\"marquee-chip\">CSS</span>\n  </div>\n</div>",
        "code_css": ".marquee-demo {\n  position: relative; overflow: hidden; padding: 1rem 0;\n    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);\n    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);\n}\n\n.marquee-track {\n  display: flex; gap: 1.2rem;\n    width: max-content; animation: marqueeScroll 22s linear infinite;\n}\n\n.marquee-demo:hover .marquee-track {\n  animation-play-state: paused;\n}\n\n.marquee-chip {\n  display: inline-flex; align-items: center; gap: 0.5rem;\n    padding: 0.45rem 1rem; border-radius: 999px;\n    background: var(--bg-secondary); border: 1px solid var(--border-color);\n    font: 500 0.82rem/1 var(--font-mono); color: var(--text-primary);\n    white-space: nowrap;\n}\n\n.marquee-dot {\n  width: 6px; height: 6px; border-radius: 50%; background: var(--accent-cyan); flex-shrink: 0;\n}\n\n@keyframes marqueeScroll { to { transform: translateX(-50%); } }",
        "code_js": "// 内容不够长时复制一份，保证无缝衔接\nconst track = document.getElementById('marqueeTrack');\n\nfunction fill() {\n  if (track.scrollWidth >= track.parentElement.clientWidth * 2) return;\n  track.innerHTML += track.innerHTML;\n}\n\nfill();\nwindow.addEventListener('resize', fill);",
        "sort_order": 20,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "gradient-text",
        "title": "渐变文字 Gradient",
        "desc": "background-clip:text + 动画渐变",
        "category": "visual",
        "code_html": "<div class=\"gradient-text-demo\">\n  <div class=\"gradient-text gradient-rainbow\">渐变文字</div>\n  <div class=\"gradient-text gradient-sunset\">夕阳渐变</div>\n  <div class=\"gradient-text gradient-ocean\">海洋渐变</div>\n</div>",
        "code_css": ".gradient-text-demo {\n  display: flex; flex-direction: column; gap: 0.5rem;\n    padding: 1.5rem 1rem;\n    background: transparent; border-radius: var(--radius-md);\n    align-items: center; justify-content: center; min-height: 180px;\n}\n\n.gradient-text {\n  font: 800 1.5rem/1.2 var(--font-mono);\n    background-size: 200% 100%;\n    -webkit-background-clip: text;\n    background-clip: text;\n    color: transparent;\n    -webkit-text-fill-color: transparent;\n    animation: gradientShift 4s linear infinite;\n    letter-spacing: 0.04em;\n}\n\n@keyframes gradientShift { to { background-position: 200% 0; } }",
        "code_js": "// 纯 CSS 实现，靠 background-clip:text 把背景裁到文字里\n// 改配色改 .gradient-text 的 linear-gradient 就行\n// 想做滚动渐变就调 animation 的 duration",
        "sort_order": 21,
        "status": 1,
        "remark": ""
    },
    {
        "widget_key": "glitch-text",
        "title": "故障文字 Glitch",
        "desc": "RGB 分离 + 字符解密 + clip 抖切",
        "category": "visual",
        "code_html": "<div class=\"glitch-text-demo\">\n  <div class=\"glitch-text\" data-text=\"GLITCH\">GLITCH</div>\n  <div class=\"glitch-hint\">RGB 分离 + 字符抖动</div>\n</div>",
        "code_css": ".glitch-text-demo {\n  position: relative; overflow: hidden;\n    background: transparent; border-radius: var(--radius-md);\n    padding: 2rem 1rem; min-height: 180px;\n    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem;\n}\n\n.glitch-text {\n  position: relative; font: 800 2.4rem/1 var(--font-mono);\n    color: var(--text-primary); letter-spacing: 0.12em;\n    animation: glitchShake 2.4s infinite;\n}\n\n.glitch-text::before, .glitch-text::after {\n  content: attr(data-text); position: absolute; top: 0; left: 0;\n    width: 100%; pointer-events: none;\n}\n\n.glitch-text::before {\n  color: var(--accent-cyan); animation: glitchOffset1 2.4s infinite; clip-path: inset(0 0 0 0);\n}\n\n.glitch-text::after {\n  color: var(--accent-pink); animation: glitchOffset2 2.4s infinite; clip-path: inset(0 0 0 0);\n}\n\n@keyframes glitchShake {\n  0%, 90%, 100% { transform: translate(0, 0); }\n  92% { transform: translate(-2px, 1px); }\n  94% { transform: translate(2px, -1px); }\n  96% { transform: translate(-1px, 2px); }\n  98% { transform: translate(1px, -2px); }\n}\n\n@keyframes glitchOffset1 {\n  0%, 88%, 100% { transform: translate(0, 0); clip-path: inset(100% 0 0 0); }\n  90% { transform: translate(-3px, 0); clip-path: inset(20% 0 60% 0); }\n  94% { transform: translate(3px, 0); clip-path: inset(60% 0 20% 0); }\n}\n\n@keyframes glitchOffset2 {\n  0%, 88%, 100% { transform: translate(0, 0); clip-path: inset(100% 0 0 0); }\n  92% { transform: translate(3px, 0); clip-path: inset(40% 0 40% 0); }\n  96% { transform: translate(-3px, 0); clip-path: inset(70% 0 10% 0); }\n}",
        "code_js": "// 纯 CSS 实现：::before / ::after 做红蓝错位，clip-path 切出扫描线\n// data-text 属性要和文字内容保持一致\nconst text = document.querySelector('.glitch-text');\n\n// 偶尔换一次字，加重故障感：\n// const WORDS = ['GLITCH', 'ERROR', '404', 'HACK'];\n// setInterval(() => {\n//   const w = WORDS[Math.floor(Math.random() * WORDS.length)];\n//   text.dataset.text = w;\n//   text.textContent = w;\n// }, 3000);",
        "sort_order": 22,
        "status": 1,
        "remark": ""
    }
]

async function main() {
    if (!PASS) {
        console.error('请先设置环境变量 API_PASS（管理员密码）')
        process.exit(1)
    }

    // 登录拿令牌
    const lr = await fetch(BASE + '/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name: USER, user_password: PASS })
    })
    const lj = await lr.json()
    if (Number(lj.code) !== 0) {
        console.error('登录失败:', lj.message)
        process.exit(1)
    }
    const token = lj.result.token
    console.log('登录成功，开始写入组件…')

    // 先查已有的，避免重复
    const existRes = await (await fetch(BASE + '/widget/?pageNum=1&pageSize=100', {
        headers: { Authorization: 'Bearer ' + token }
    })).json()
    const existed = new Set((existRes?.result?.list || []).map((w) => w.widget_key))

    let created = 0
    let skipped = 0
    for (const w of WIDGETS) {
        if (existed.has(w.widget_key)) {
            skipped++
            console.log('  跳过（已存在）', w.widget_key)
            continue
        }
        const r = await (await fetch(BASE + '/widget/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
            body: JSON.stringify(w)
        })).json()
        if (Number(r.code) === 0) {
            created++
            console.log('  写入成功', w.widget_key, '-', w.title)
        } else {
            console.log('  写入失败', w.widget_key, '->', r.message)
        }
    }

    console.log('\n完成：新增 ' + created + ' 个，跳过 ' + skipped + ' 个')
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
