---
title: MySQL中JSON数据的查找和更新
date: 2024-02-17 22:42:25
tags: mysql
categories: mysql
---
设MySQL中JSON字段`info`的格式如下：
```json
{
	"name":"小明",
	"age":15,
	"height":163
}
```
建表
```sql
create table 't1' (
	'id' int(11) NOT NULL AUTO_INCREMENT,
	'info' json DEFAULT NULL,
	PRIMARY KEY ('id')
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```
## 查找
### 1. 查找JSON中的某个字段
```sql
select info->'$.name' from t1 where id = 1;
-- 或者
select JSON_EXTRACT(info,'$.name') from t1 where id = 1;
```

### 2. 根据JSON中的字段进行查找
```sql
select * from t1 where info->'$.name' = '小明';
-- 或者
select * from t1 where JSON_EXTRACT(info,'$.name') = '小明';
```

## 更新
### 1. 修改JSON中某个字段的值
`JSON_REPLACE(JSON列名，JSON字段名，修改值)`
`JSON_SET(JSON列名，JSON字段名，修改值)`
```sql
update t1 set info = JSON_REPLACE(info,'$.age',16) where info->'$.name' = '小明';
-- 或者
update t1 set info = JSON_SET(info,'$.age',16) where id = 1;
```

### 2. 向JSON中添加一个字段
`JSON_INSERT(JSON列名，添加的JSON字段名，值)`
`JSON_SET(JSON列名，添加的JSON字段名，值)`
```sql
update t1 set info = JSON_INSERT(info,'$.weight',34) where id = 1;
-- 或者
update t1 set info = JSON_SET(info,'$.weight',34) where id = 1;
```

即，`JSON_SET`函数既可以更新也可以添加，当所给字段存在时就是更新，当所给字段不存在时就是添加