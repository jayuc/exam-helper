#
# exam

CREATE database if NOT EXISTS `exam` default character set utf8mb4 collate utf8mb4_unicode_ci;
use `exam`;

SET NAMES utf8mb4;

CREATE TABLE `t_code_type` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `code_type` int(8) NOT NULL COMMENT '代码类型',
  `code_type_name` varchar(32) NOT NULL COMMENT '类型名称',
  `enable_flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否启用：0-不启用，1-启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `t_code` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `code_type` int(8) NOT NULL COMMENT '代码类型',
  `code_no` int(8) NOT NULL COMMENT '代码编号',
  `code_name` varchar(32) NOT NULL COMMENT '代码名称',
  `sort_index` tinyint(4) COMMENT '排序索引',
  `enable_flag` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否启用：0-不启用，1-启用',
  `remark` varchar(128) COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `t_question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(1024) NOT NULL COMMENT '问题描述',
  `answer` varchar(2048) NOT NULL COMMENT '答案描述',
  `question_type` int(8) NOT NULL COMMENT '题型,代码类型：1',
  `section_type` int(8) DEFAULT NULL COMMENT '问题主题,代码类型：2',
  `subject_type` int(8) DEFAULT NULL COMMENT '问题类型,代码类型：3',
  `language_type` int(8) DEFAULT NULL COMMENT '编程语言,代码类型：4',
  `create_time` datetime DEFAULT NULL COMMENT '录入时间',
  `ower` varchar(64) DEFAULT NULL COMMENT '所有者',
  `tag` varchar(256) DEFAULT NULL COMMENT '标签',
  `remark` varchar(128) COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `t_code_type`(`code_type`, `code_type_name`) VALUES (1, '题型');
INSERT INTO `t_code_type`(`code_type`, `code_type_name`) VALUES (2, '问题主题');
INSERT INTO `t_code_type`(`code_type`, `code_type_name`) VALUES (3, '问题类型');
INSERT INTO `t_code_type`(`code_type`, `code_type_name`) VALUES (4, '编程语言');
INSERT INTO `t_code_type`(`code_type`, `code_type_name`) VALUES (5, '练习类型');

INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (1, 1, '单选', 1);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (1, 2, '多选', 2);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (1, 3, '填空', 3);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (1, 4, '简答', 4);

INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 1, 'Java基础', 1);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 2, '并发编程', 2);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 3, 'JVM', 3);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 4, 'Sring', 4);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 5, 'SringBoot', 5);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 6, 'Mybatis', 6);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 7, 'Redis', 7);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 8, 'RabbitMq', 8);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 9, 'Nginx', 9);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (2, 10, 'Mysql', 10);

INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (3, 1, 'Web后台', 1);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (3, 2, 'Web前端', 2);

INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (4, 1, 'java', 1);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (4, 2, 'javaScript', 2);

INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (5, 1, '专项练习', 1);
INSERT INTO `t_code`(`code_type`, `code_no`, `code_name`, `sort_index`) VALUES (5, 2, '顺序练习', 2);

commit;

