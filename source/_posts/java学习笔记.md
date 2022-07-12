---
title: java学习笔记
tags:
  - java
  - 笔记
categories: java
index_img: /img/java/header.png
date: 2020-03-05 14:38:37
---


java课程的学习笔记，部分和c++重合的内容不做描述

<!-- more -->

# 一、安装java

## 下载java

去[Oracle](https://www.oracle.com/java/technologies/javase-downloads.html)官网下载。

## 添加环境变量

在"系统变量"中进行添加
1. 添加JAVA_HOME
   选择“新建”，变量名为`JAVA_HOME`，变量值为jdk的路径，例如`C:\Program Files\Java\jdk-12.0.2`
2. 添加CLASSPATH
   选择“新建”，变量名为`CLASSPATH`，变量值为`.;%JAVA_HOME%\lib;`
3. 添加Path
   找到`Path`项，双击打开（win7等直接在变量值最前面加），选择“新建”，变量值为jdk目录下bin文件夹的路径，例如`C:\Program Files\Java\jdk-12.0.2\bin`

## 测试是否安装成功
打开`CMD`窗口，输入`java -version`，有输出则说明安装完成。

# 二、基本数据类型

## 分类和长度
与c++一致，其中注意char型
| 类型  |  长度   |  初始值  |      范围       |
| :---: | :-----: | :------: | :-------------: |
| char  | 16 bits | '\u0000' | '\u0000~\uffff' |

## 浮点数

默认为double型

- 十进制数形式
  由数字和小数点组成，且必须有小数点。
  如：0.123,  1.23, 123.0
- 科学计数法形式　　　 
  如：123e3或123E3，其中e或E之前必须有数字，且e或E后面的指数必须为整数。
- float型的值,必须在数字后加f或F,如1.23f。
- double型的值,可以在数字后加d或D,如1.23D。

## 转义符

转义字符|含义|
:-|:-|
\n|回车(\u000a)
\t|Tab(\u0009)
\b|空格(\u0008)
\r|换行(\u000d)
\f|换页(\u000c)
\\'|单引号(\u0027)
\\"|双引号(\u0022)
\ddd|三位八进制
\udddd|四位16进制
\\\\|反斜杠(\u005c)

# 三、输入输出

## 输出

使用`System.out.print`进行输出
``` java
System.out.print();  \\输出内容
System.out.println();  \\输出内容，并换行
System.out.printf();   \*支持占位符
%d: 输出int型数据
%c: 输出char型数据
%f: 输出浮点型数据，小数部分最多保留6位     
%s: 输出字符串数据
%md: 输出的int型数据占m列   
%m.nf:输出的浮点型数据占m列，小数点保留n位。
*/
```

## 输入

使用输入需要先导入文件，` import java.utli.*;`或`import java.utli.Scanner;`

进行使用时，需要先创建Scanner对象
``` java
Scanner input = new Scanner(System.in);
```
在使用时使用`input.next类型()`来读取输入内容，例：
``` java
int x = input.nextInt();
float y = input.nextFloat();
```

# 四、函数、类格式差异

## main函数

java main函数格式为
``` java
public static void main(String[] args)
{

}
```

## 类
类为
``` java
public class balabala()
{
    
}
```

# 五、数组
``` java
//创建
arrayType arrayName[];  
//或
arrayType []arrayName;

//静态初始化
arrayType arrayName[] = {elem1, elem2, elem3, ...};
//或
arrayType []arrayName = {elem1, elem2, elem3, ...};

//动态初始化
arrayTyoe arrayName[] = new arrayType[x];
//或
arrayTyoe []arrayName = new arrayType[x];

//复合数据类型动态初始化
arrayType arrayName[] = new arrayTyppe[x];
//然后依次为数据元素开辟空间，相当于二维数组
arrayName[i] = new arrayType[paramList]; //i=0,1,2,...,paramList-1
//例如
String stringArray[] = new String[4];
stringArray[0] = new String("Welcome");
stringArray[1] = new String("To");
stringArray[2] = new String("My");
stringArray[3] = new String("Blog");
```
数组的复制操作，java提供`System.arraycopy`函数来进行操作，格式为
`System.arraycopy(SourceArray,sourcePositon,DestinationArray,DestinationPositon,number)`
`SourceArray`表示被复制的数组，`DestinationArray`表示复制的数组，即Source->Destination
`SourcePosition`表示从下标几开始复制，`DestinationPosition`表示从下标几开始粘贴，`number`表示复制几位。
示例：
``` java
int array1[ ]={2,3,5,7,11,13,17};
int[] array2={101,102,103,104,105,106,107,108};
System.arraycopy(array1,2,array2,3,4);   //表示从array1[2]开始复制，即5，从array2[3]开始粘贴，即104，复制4位
System.out.println("After copy, array2:");
for(int i=0;i< array2.length;i++)
  System.out.println("array2["+i+"]="+array2[i]);
//最后结果为
After copy, array2:
array2[0]=101
array2[1]=102
array2[2]=103
array2[3]=5
array2[4]=7
array2[5]=11
array2[6]=13
array2[7]=108
```

# 六、向量

向量是java.util包中的一个类，实现了类似 ==动态数组== 的功能，跟数组的区别是向量的容量是 ==可变== 的

- 向量的容量——向量的存储空间大小（最大下标）
- 向量的长度——向量的实际元素个数
- 向量的容量增量——当向量长度达到了容量时，容量的增加量
  - 当容量增量为0时，当向量长度达到容量时，容量变为原来两倍
  - 当容量增量不等于0时，当向量长度达到容量时，新容量=原容量+容量增量


``` java
//声明格式：
Vector <data Type> VariableName = new Vector <data Type>(parameter)

//三种形式
public Vector()   
//创建空向量，初始容量为10，容量增量为0
public Vector(int x)
//创建空向量，初始容量为x，容量增量为0
public Vector(int x, int y)
//创建空向量，初始容量为x，容量增量为y
```
示例：
``` java
Vector<String> v1 = new Vector<String>(5); 
v1.addElement(new String("one"));   //添加元素"one"，下同
v1.addElement("three");
v1.addElement("four");
v1.insertElementAt("zero",0);     //在下标0位置添加元素"zero"，后续元素自动右移，下同
v1.insertElementAt("two",2);
v1.insertElementAt("five",5); 
System.out.println("v1:"+v1); 
System.out.println("v1的容量为：" + v1.capacity( ));   
Vector<String> v2 = new Vector<String>(5,1); 
v2.addElement("one");
v2.addElement("three");
v2.addElement("four");
v2.insertElementAt("zero",0); 
v2.insertElementAt("two",2);
v2.insertElementAt("five",5); 
System.out.println("v2:"+v2);
System.out.println("v2的容量为：" + v2.capacity( ));

//输出为：
v1:[zero, one, two, three, four, five]
v1的容量为：10
v2:[zero, one, two, three, four, five]
v2的容量为：6

/*
首先看第一个例子，创建方式是Vector(int x)，说明初始容量为5，容量增量为0。因此当向量的长度达到容量(5)时，向量的容量翻倍，所以输出出来的V1的容量是10。
第二个例子，创建方式是Vector(int x, int y)，说明初始容量为5，容量增量为0，因此当向量的长度达到容量(5)时，向量的新容量等于原容量+容量增量，即5+1=6，所以输出的V2的容量为6.
*/
```
