-- ============================================================
-- 组件表 widgets
-- ------------------------------------------------------------
-- 这段 SQL 是在本地 MySQL 8.4 上用 Sequelize 的 sync() 实测出来的，
-- 跟 blog-server 启动时自动建出来的表完全一致。
--
-- 两种建表方式，选一个就行：
--   方式一：把后端代码传上去 + 重启服务，表会自动建好（推荐）
--   方式二：直接在 Navicat / mysql 客户端里执行下面这段
-- ============================================================

CREATE TABLE IF NOT EXISTS `widgets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `widget_key` varchar(255) NOT NULL COMMENT '组件标识，前端用它匹配渲染组件',
  `title` varchar(255) NOT NULL COMMENT '组件标题，例如「按钮组 Buttons」',
  `desc` varchar(255) DEFAULT NULL COMMENT '一句话描述',
  `category` varchar(255) NOT NULL DEFAULT 'visual' COMMENT '分类',
  `code_html` text COMMENT '可复制的 HTML 代码',
  `code_css` text COMMENT '可复制的 CSS 代码',
  `code_js` text COMMENT '可复制的 JS 代码',
  `sort_order` int DEFAULT '0' COMMENT '排序顺序',
  `status` int DEFAULT '1' COMMENT '状态（1启用 0禁用）',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `widgets_widget_key` (`widget_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 说明：
--   widget_key  唯一索引，跟前端的渲染器一一对应，改了就对不上
--   deletedAt   软删除字段，删掉的组件还在表里，只是不显示了
--   status      1 启用（前台能看到）  0 禁用（前台跳过）
