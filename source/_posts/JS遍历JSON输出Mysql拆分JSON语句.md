---
title: JS遍历JSON输出Mysql拆分JSON语句
date: 2023-11-10 17:33:24
tags: [前端,mysql,js]
categories: [前端,js]
---
### 背景
数据库存储有这类JSON数据，希望在输出时将每个子项都单独输出并根据key值重命名
```json
softtissue:{
	nasalBase:{
		Col_Sn_Ls:null,
		N_Prn_Sn:null,
		ZyR_Prn_ZyL:null,
		Sn_N_Pg:null,
		A_NPg:null,
		Col_Sn:null,
		Prn_Sn:null,
		AIR_AIL:null,
		AcR_AcL:null,
		other:""
	},
	upperLipAndOralnasalRegion:{
		Ls_E:null,
		A_A:null,
		Ls_U1:null,
		Chr_Ls_ChL:null,
		division:null,
		N_Pg_H:null,
		other:""
	},
	frontalProfile:"",
	lateralProfile:"",
	facialSymmetry:"",
	chinDeviation:"",
	verbalLine:""
}
```

这样就会用到一个MySQL命令
```mysql
JSON_UNQUOTE(JSON_EXTRACT(softtissue.nasalBase, '$.Col_Sn_Ls')) AS 'nasalBase_Col_Sn_Ls',
```
但是如果针对每一个属性都手写这个代码的话过于麻烦，因此考虑通过js遍历JSON，自动拼接生成此类语句

### 代码
```js
str = "";

//驼峰转下划线
function camelToUnderscore(str) { return str.replace(/[A-Z]/g, match => '_' + match.toLowerCase()); }

//遍历最外层json的key值
for(let key in softtissue){
	//进入子json，遍历其key值
    for(let subkey in softtissue[key]){
	    //拼接文本，其中‘softtissue’为数据表名称
        str = str + "JSON_UNQUOTE(JSON_EXTRACT(softtissue." + camelToUnderscore(key) + ", '$." + subkey + "')) AS '" + camelToUnderscore(key) + "_" + subkey + "',\n";
    }
}
//格式化输出拼接后的文本
console.log(str);
//得到的部分输出
//JSON_UNQUOTE(JSON_EXTRACT(softtissue.nasalBase, '$.Col_Sn_Ls')) AS 'nasalBase_Col_Sn_Ls',
//JSON_UNQUOTE(JSON_EXTRACT(softtissue.nasalBase, '$.N_Prn_Sn')) AS 'nasalBase_N_Prn_Sn',
//JSON_UNQUOTE(JSON_EXTRACT(softtissue.nasalBase, '$.ZyR_Prn_ZyL')) AS 'nasalBase_ZyR_Prn_ZyL',
//JSON_UNQUOTE(JSON_EXTRACT(softtissue.nasalBase, '$.Sn_N_Pg')) AS 'nasalBase_Sn_N_Pg',
//....
```