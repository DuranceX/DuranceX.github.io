---
title: MyBatis基础使用
date: 2020-11-29 17:50:16
tags: [Java, 笔记]
categories: Java
---

MyBatis的一些基础使用方法和配置。

<!--more-->

## 概要内容

### POJO类

相当于Bean类，在POJO包下创建对象类

------

### 配置文件

```
<configuration>
	<!-- 配置环境 -->
	<environments default="mysql">
		<environment id="mysql">
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver" />
				<property name="url"
					value="jdbc:mysql://localhost:3306/j2ee" />
				<property name="username" value="root" />
				<property name="password" value="" />
			</dataSource>
		</environment>
	</environments>
	<!-- 配置映射文件的位置 -->
	<mappers>
		<mapper resource="mapper/Login.xml"></mapper>
	</mappers>
</configuration>
```

`<dataSource>`元素的四个属性用于配置数据库的驱动、URL、用户名和密码

`<mapper>`元素用于指定配置映射文件的位置，这里是`mapper`包下的`Login.xml`文件，如有多个文件都应该在这里进行引入。

------

### 配置映射文件

```
<mapper namespace="login">
	<select id="findUserByID" parameterType="String"
		resultType="pojo.User">
			select * from User where id = #{id}
	</select>
</mapper>
```

即在该文件里写Sql语句，查询用`select`，插入用`insert`等，其余类似，通过标签来区分。`id`为方法名，`parameterType`为所需的参数类型，`resultType`为返回类型

------

### 调用

```
//读取配置文件
String resource = "mybatis-config.xml";
try{
	InputStream in = Resources.getResourceAsStream(resource);
	//创建SQLSessionFactory对象
	SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
	//创建SqlSession对象
	SqlSession sqlSession = factory.openSession();
    //调用SqlSession对象的方法，例如
    User user = sqlSession.selectOne("login.findUserByID",ID);
}
```

其中，`selectone`表示返回一条记录信息，两个参数，前者是调用的方法名，即`Login`文件中`login`命名空间下的`findUserByID`方法，后者是方法所需的参数。

需要返回多条信息可以使用`selectList`方法。

```
List<Student> selectList = sqlSession.selectList("student.findStudentBySname", "ZhangSan");
for (Student student : selectList) {
	System.out.println(student.toString());
}
```

------

## 配置文件详解

### properties

`<properties>`元素有两种定义方法。

一是通过其子元素`<property>`完成属性传递。

```
<properties><!--属性-->
	<property name="driver" value="com.mysql.jdbc.Driver" />
    <property name="url"
					value="jdbc:mysql://localhost:3306/j2ee" />
	<property name="username" value="root" />
	<property name="password" value="" />
</properties>
```

和之前的`<dataSource>`里的配置并无两异，只不过在这里对其进行了事先的定义，之后直接调用即可，相当于定义了变量。

```
<dataSource type="POOLED">
	<property name="driver" value= "${driver}" />
    <!-- 下略 -->
</dataSource>
```

二是通过`properties`文件实现

在`src`目录下新建一个`db.properties`文件

```
textjdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/j2ee
下略
```

然后在配置文件中进行引用

```
<properties resource="database.properties">
```

在后续代码中同样可以直接引用。

```
<dataSource type="POOLED">
	<property name="driver" value= "${jdbc.driver}" />
    <!-- 下略 -->
</dataSource>
```

------

### typeAliases

别名，通过使用别名来缩短类的完全限定名长度。

```
<typeAliases>
	<typeAlias alias="user" type="pojo.User" />
</typeAliases>
```

通过上述配置即可用`user`代替`pojo.User`

另外，MyBatis支持通过扫描包的形式设置别名。

```
<typeAliases>
	<package name="pojo" />
</typeAliases>
```

通过扫描包，包内所有类都将获得一个首字母小写的别名，例如`pojo.User`的别名即为`user`

也可以通过使用注解的方式设置别名，在`pojo`类中加入注解

```
@Alias(value="user")
public class User{
    ...
}
```

------

### environments

用于定义数据库相关信息。

```
<environments default="mysql">
    <environment id="mysql">
        <transactionManager type="JDBC" />
        <dataSource type="POOLED">
            <property name="driver" value="com.mysql.jdbc.Driver" />
            <property name="url"
                      value="jdbc:mysql://localhost:3306/j2ee" />
            <property name="username" value="root" />
            <property name="password" value="" />
        </dataSource>
    </environment>
</environments>
```

`default`用于指定默认运行环境的id值，一个`<environments>`可以有多个`<environment>`子元素，每个`<environment>`用于定义一个运行环境。

`<transactionManager>`中的`type`属性用于定义事务管理器的类型，有两种可选项`JDBC`和`MANAGED`，`JDBC`直接调用JDBC的提交和回滚设置。

MyBatis提供了三种数据源，即`POOLED`、`UNPOOLED`和`JNDI`

**UNPOOLED**

非连接池请求，该类型数据源只是在被需求时才打开、关闭连接，适用于对性能要求不高的简单应用程序。有五个配置项。

```
driver`、`url`、`username`、`password
```

**POOLED**

连接池类型，批量创建连接，使用时从池中取一，使用完释放为池中，使并发Web应用快速响应。

仍需配置上述四个选项，另有一些额外配置项，暂不提及。

**JNDI**

详见P29，暂不需使用。

------

## 映射文件详解

### select

```
<select id="findUserByID" parameterType="String"
    resultType="pojo.User">
    select * from User where id = #{id}
</select>
```

用`<select>`标签来映射一个查询语句，`id`为方法名，`parameterType`为所需的参数类型，`resultType`为返回类型。用`#{}`来表示通过占位符接收参数id。

------

### insert等元素

```
<insert id="addUser" parameterType="pojo.User" >
	insert into User(id,name,psw) values(#{id},#{name},#{psw})
</insert>

<update id="updateUser" parameterType="pojo.User" >
	update user set name = #{name}, psw = #{psw} where id = #{id}
</update>

<delete id="deleteUser" parameterType="Integer">
	delete from student where id = #{id}
</delete>
```

------

### sql

`<sql>`元素用于定义重用的Sql代码片段

```
<sql id="studentCols">
	sid,sname,age,course
</sql>
```

在后续代码中调用该代码片段

```
<select id="finbStudent" parameterType="Integer" resultType="pojo.Student">
	select <include refid="studentCols" />from student where sid = #{sid}
</select>
```

------

### resultMap

用于映射结果集，包括`<association>`、`<collection>`、`<discriminator>`等子元素，详见下一部分内容。

------

## 关联映射

### 一对一

在映射文件中添加`<resultMap>`元素的子元素`<association>`来进行一对一映射关系的配置。

```
<select id="findUserInfoByID" parameterType="Integer"
    resultMap="userInfoResultMap">
    select u.*, ui.* from User u, user_information ui where u.ID = ui.ID and u.ID = #{ID}
</select>
<resultMap type="pojo.User" id="userInfoResultMap">
    <id column="ID" property="ID" />
    <result column="name" property="name" />
    <result column="psw" property="psw" />
    <association property="user_info" javaType="pojo.user_information">
        <id column="ID" property="ID" />
        <result column="birthday" property="birthday" />
        <result column="sex" property="sex" />
        <result column="nation" property="nation" />
        <result column="hometown" property="hometown" />
    </association>
</resultMap>
```

在User类中添加user_information的对象

```
user_information user_info;
```

------

### 一对多

在一对多的情况下就不是定义一个对象类，而是定义一个对象数组\列表

```
List<StuInfo> stuInfoList;
```

在配置文件中，用`<collection>`来进行配置

```
<select id="findStuClassByCid" parameterType="Integer"
    resultMap="stuClassResultsMap">
    select c.*,s.sid,s.sname,s.age,s.course from stu_class c ,
    stu_info
    s where s.classid = c.cid and c.cid = #{cid}
</select>
<resultMap type="stuClass" id="stuClassResultsMap">
    <id column="cid" property="cid" />
    <result column="cname" property="cname" />
    <result column="sum" property="sum" />
    <collection property="stuInfoList" ofType="stuInfo">
        <id column="sid" property="sid" />
        <result column="sname" property="sname" />
        <result column="age" property="age" />
        <result column="course" property="course" />
    </collection>
</resultMap>
```

------

### 主键映射

```
<insert id="addStuClass01" parameterType="stuClass" useGeneratedKeys="true" 	       keyProperty="cid">
	insert into stu_class(cname,sum) values(#{cname}, #{sum})
</insert>
```

`useGeneratedKeys`属性用于获取数据库内部产生的主键值，`KeyProperty`属性用于指定主键。

以上适用于主键自增的情况。如果不支持自增，则需要适用`<selectKey>`子元素来获取主键值。

```
<insert id="addStuClass02" parameterType="stuClass">
		insert into stu_class(cname,sum) values (#{cname},#{sum})
		<selectKey keyColumn="cid" keyProperty="cid" resultType="Integer" order="AFTER">
			select LAST_INSERT_ID()
		</selectKey>
	</insert>
```

`keyProperty`属性用于指定数据表主键，`keyColumn`用于指定POJO对象的成员属性，`resultType`属性用于指定返回值类型，`order`属性即排序规则，视数据库而异。

------

## 动态SQL

### if

`<if>`元素用于条件判断，类似于Java中的if，示例：

```
<select id="findStudentBySnameAndCourse" parameterType="student"
    resultType="student">
    select * from student where sname = #{sname}
    <!--根据条件动态拼装SQL语句 -->
    <if test=" null!=course and ''!=course">
        and course =#{course}
    </if>
</select>
```

上述默认语句是`select * from student where sname = #{sname}`，而如果course不为空，则在后方加上`and course = #{course}`，`<if>`通常跟`test`属性一起使用。

------

### choose、when、otherwise

`<choose>`类似于switch语句，每个`<choose>`元素中至少要包含1个`<when>`子元素，0个或1个`<otherwise>`子元素。示例：

```
<select id="findStudentByChoose" parameterType="student"
        resultType="student">
    select * from student where 1=1
    <choose>
        <!--如果sid不为null或空字符串-->
        <when test="null!=sid and''!=sid">
            and sid = #{sid}
        </when>
        <!--如果sname不为null或空字符串-->
        <when test="null!=sname and ''!=sname">
            and sname like '%${sname}%'
        </when>
        <!--如果以上两个条件都不满足，则执行下列内容-->
        <otherwise>
            and course = 'Java'
        </otherwise>
    </choose>
</select>
```

### where

`<where>`元素通常跟`<if>`语句搭配使用，实现的仍是动态装配SQL语句，示例：

```
<select id="findStudentByChoose" parameterType="student"
        resultType="student">
    select * from student
    <where>
    	<if test="null!=sid and ''!=sid">
        	and sid = #{sid}
        </if>
        <if test="null!=sname and ''!=sname">
        	and sname like '% ${sname} %'
        </if>
        <if test="null==course">
        	and course = 'Java'
        </if>
    </where>
</select>
```

可以注意到，之前的案例中使用了`where 1=1`的语句，这是为了避免出现`select * from student where and course = ‘Java’`之类的错误，而使用`<where>`元素的话则可以略去，`<where>`元素会在相应的语句后面添加`and`，之后，如果where后有以`and`或`or`开头的语句，则会将其去除。

------

### set

`<set>`元素和`<where>`元素类似，不过`<set>`元素用于`<update>`，当`<set>`中的列有返回值（判断成功）时，会自动追加一个`set`语句。

```
<update id="updateStudent" parameterType="student">
    update student
    <set>
        <if test="null!=sname and ''!=sname">
            sname = #{sname},
        </if>
        <if test="null!=age and ''!=age">
            age  = #{age}, 
        </if>
    </set>
    where sid = #{sid}
</update>
```

------

### 其他

不做具体讨论，详见P67-72

`<trim>`用于删除多余关键字，可以实现`<where>`和`<set>`的功能

`<foreach>`元素用于遍历，完成批量查询

`<bind>`元素相当于设置一个变量，将SQL语句的部分内容设为变量，方便更换不同数据库时的修改维护。

------

## 注解

注解直接写在接口中，相对简单。接口文件为.java，创建在mapper包下，示例：

```
public interface StudentMapper {
    //select语句
	@Select("select * from student where sid = #{sid}")
	Student selectStudent(int sid);
    
    //insert语句
	@Insert("insert into student(sname,age,course) "
			+ " values(#{sname},#{age},#{course})")
	int insertStudent(Student student);
    
    //update语句
	@Update("update student "
    		+ "set sname = #{sname},age = #{age} where sid = #{sid}")
	int updateStudent(Student student);
    
    //delete语句
	@Delete("delete from student where sid = #{sid}")
	int deleteStudent(int sid);
	
    //通过Param传递多个参数
	@Select("select * from student where sname = #{param01} "
    		+ "and course = #{param02}")
	Student selectBySnameAndCourse(@Param("param01")String sname ,
			@Param("param02")String course);
}
```