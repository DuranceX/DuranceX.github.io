---
title: Spring基础使用
date: 2020-11-29 17:50:16
tags: [Java, 笔记]
categories: Java
---

## 概述

### 容器机制

容器是Spring框架实现功能的基础，所有配置过的类都会被纳入Spring容器的管理之中。

Spring把它管理的类称为Bean，跟Java Bean相比，Spring的Bean没有什么限制，只要配置到容器中，就称为Bean

**ApplicationContext接口**

Spring主要通过ApplicationContext接口来实现容器API调用。主要通过三种接口实现类来获取ApplicationContext实例。

1. ClassPathXMLApplicationContext：从类路径加载配置文件，创建ApplicationContext实例
2. FileSystemXmlApplicationContext：从文件系统加载配置文件，创建ApplicationContext实例
3. AnnotationConfigApplicationContext：从注解中加载配置文件，创建ApplicationContext实例

### 简单应用

**1. 引用包**

将Spring依赖jar包引用到工程中。

**2. 创建Bean**

在bean包中创建两个Bean类，Student和Teacher。

```
package com.SpringTest.bean;
public class Student {
	// 无参构造
	public Student() {
		super();
		System.out.println("Student对象创建了");
	}

	// 创建一个成员变量，并给出get/set方法
	private String msg = null;

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	// study()方法中引用成员变量
	public void study() {
		System.out.println("学生在学习" + msg);
	}
}
package com.SpringTest.bean;

public class Teacher {
	public Teacher() {
		super();
		System.out.println("Teacher对象创建了");
	}

	private String msg = null;

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void teach() {
		System.out.println("老师讲解" + msg + "知识");
	}
}
```

**3. 创建配置文件**

在src目录下创建`applicationContext.xml`文件

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
	<!-- 将指定的类配置给Spring -->
	<bean id="student" class="com.SpringTest.bean.Student">
		<property name="msg">
			<value>Java</value>
		</property>
	</bean>
	<bean id="teacher" class="com.SpringTest.bean.Teacher">
		<property name="msg">
			<value>Spring</value>
		</property>
	</bean>
</beans>
```

在上述代码中，`<bean>`元素指定了一个由Spring容器管理的Bean类，`id`即为唯一标识符，`class`为该Bean类的完全限定名，`<property>`子元素用于指定属性名，`<value>`用于指定该属性的值。在这里我们定义了两个Bean类，分别是Student和Teacher。

**4. 使用Bean**

在src目录下新建test.java文件

```
package com.SpringTest.test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.SpringTest.bean.Student;
import com.SpringTest.bean.Teacher;
public class TestSpring {
	public static void main(String[] args) throws Exception  {
		//通过读取配置信息获取ApplicationContext对象
		ApplicationContext  applicationContext = new 
         	    ClassPathXmlApplicationContext("applicationContext.xml");
		//通过id值获取Student对象
		Student student = applicationContext.getBean
             ("student",Student.class);
		//调用Student对象的方法
		student.study();
		Teacher teacher = applicationContext.getBean("teacher",Teacher.class);
		teacher.teach();
	}
}
```

这里通过`ClassPathXmlApplicationContext`接口实现类来获取ApplicationContext实例，然后通过ApplicationContext实例的getBean()方法来获取Bean类。

输出结果：

[![img](http://starnight.top/img/java/Spring-test.webp)](http://starnight.top/img/java/Spring-test.webp)

由于在Spring容器中配置的类在容器创建时会全部实例化，所以这里可以看到Teacher类虽然在Student.study()后调用，但其构造函数的输出仍在study()之前，说明在容器创建时便已实例化。可以在xml文件中进行修改，添加`lazy-init`属性，这样只有在用户第一次索取Bean类的时候才会实例化该类。

```
<bean id="teacher" class="com.SpringTest.bean.Teacher" lazy-init="true">
```

## Bean的管理

### 注入方式

**1. 构造器注入**

被注入的类创建有参/无参构造函数，在ApplicationContext.xml文件中通过`<constructor-arg>`元素为类的构造方法的参数注入值。

```
<bean id = "student" class = "com.SpringTest.bean.Student">
	<constructor-arg name="sid" value="1"></constructor-arg>
    <constructor-arg name="name" value="ZhangSan"></constructor-arg>
    <constructor-arg name="age" value="20"></constructor-arg>
    <constructor-arg name="course" value="Java"></constructor-arg>
</bean>
```

**2. 属性注入**

属性注入需要被注入的类提供对应的setter函数，然后再ApplicationContext.xml文件中通过`<property>`元素进行注入。

```
<bean id="teacher" class="com.SpringTest.bean.Teacher">
	<property name="sid" value="1"></property>
    <property name="name" value="Lisi"></property>
</bean>
```

**注入集合**

设定setter函数，并配合`<property>`元素来完成集合类的注入（List,Set,Map,Array等)

如下创建一个Mix类（部分代码）

```
private List<String> mylist;
private void setMyList(List<String myList)
{
    this.mylist = myList;
}
....
```

ApplicationContext.xml文件配置

```
<bean id="mix" class="com.SpringTest.bean.Mix">
	<!--注入List-->
    <property name ="mylist">
    	<list>
        	<value>list1</value>
            <value>list2</value>
        </list>
    </property>
    
    <!--注入Map-->
    <property name="myMap">
    	<map>
        	<entry key="key01" value="map01"></entry>
            <entry key="key02" value="map02"></entry>
        </map>
    </property>
    
    <!--注入Array-->
    <property name="myArray">
    	<array>
        	<value>array01</value>
            <value>array02</value>
        </array>
    </property>
</bean>
```

**注入其他类型的Bean**

通过setter函数和`<property>`元素的`ref`属性或`ref`子元素实现

```
<bean id="school" class="com.SpringTest.bean.school">
	<!--ref子元素-->
    <property name="stu">
    	<ref bean="student"></ref>
    </property>
    
    <!--ref属性-->
    <property name="stu" ref="student"></property>
</bean>
```

**使用SpEL注入**

SpEL可以实现动态赋值，由于SpEL需要获取对象的属性值，所以需要声明getter方法。

```
<bean id="employee" class="com.SpringTest.bean.Employee">
	<property name="sid" value="1"></property>
    <property name="name" vlaue="WangWu"></property>
    <property name="department" value="研发部"></property>
</bean>
<bean id="person" class="com.SpringTest.bean.Person">
	<property name="pid" value="#{employee.sid}"></property>
    <property name="name" value="#{employee.name}"></property>
</bean>
```

### 作用域和生命周期

**作用域**

常用的作用域有两个，分别是`Singleton`和`Prototype`

- Singleton：单例模式，默认作用域，在Spring容器中只会存在一个id相同的Bean，所有调用该id得到的Bean都是同一个共享的Bean，Spring容器可以管理该Bean的生命周期
- Prototype：每次从容器中调用Bean时，都会产生一个新的Bean实例，两个实例不相同，Spring容器只负责创建Bean实例而不管理其生命周期

```
<bean id="person" class="com.SpringTest.bean.Person" scope="prototype" />
<!--singleton的话scope可以省略不写-->
```

**生命周期**

Bean的生命周期是指Bean实例被创建、初始化和销毁的过程。

主要关注两点，一点是Bean实例初始化之后执行指定方法，另一点是Bean实例销毁之前执行指定方法。

*初始化*

1. 通过`<init-method>`属性

   在Java文件中定义一个方法，例如init()

   ```
   public void init()
   {
       System.out.println("调用init()方法");
   }
   ```

   在xml文件中设置属性

   ```
   <bean id="bean1" class="com.SpringTest.bean.bean1" init-method="init">
   	<property .....></property>
   </bean>
   ```

2. 通过实现`initializingBean`接口

   通过重写该接口的`afterPropertiesSet()`方法，在实例初始化后会自动调用该方法，不需要在xml中设置

   ```
   public class Bean2 implements InitializingBean{
       ...;
       @override
       public void afterPropertiesSet() throws Exception{
           System.out.println("调用afterPropertiesSet()方法");
       }
   }
   ```

*销毁*

1. 通过`<destroy-method>`属性

   同样先在Java中创建一个方法来调用，例如close()

   ```
   public void close()
   {
       System.out.println("调用close()方法");
   }
   ```

   在xml中设置`<destroy-method>`属性

   ```
   <bean id="bean3" class="com.SpringTest.bean.Bean3" destroy-method="close">
   	...
   </bean>
   ```

2. 通过实现`DisposableBean`接口

   通过重写该接口的`destory()`方法，在实例被销毁前会自动调用该方法，同样不需要配置xml文件

   ```
   public class Bean4 implements DisposableBean{
       ...;
       @Override
       public void destroy() throws Exception{
           System.out.println("调用destroy()方法");
       }
   }
   ```

### 注解

**常用注解**

| 注解           | 描述                                             |
| -------------- | ------------------------------------------------ |
| @Component     | 指定一个普通的Bean                               |
| @Controller    | 指定一个控制器组件Bean，功能上等同于@Component   |
| @Service       | 指定一个业务逻辑组件Bean，功能上等同于@Component |
| @Repository    | 指定一个DAO组件Bean，功能上等同于@Component      |
| @Scope         | 指定作用域                                       |
| @Value         | 指定注入值                                       |
| @Autowired     | 指定要自动装配的对象                             |
| @Qualifier     | 指定要自动装配的对象名称，与@Autowired联合使用   |
| @PostConstruct | 指定初始化后调用的方法                           |
| @PreDestroy    | 指定销毁前调用的方法                             |

**使用**

1. 导入spring-aop的jar包，配置applicationContext.xml文件

2. 配置注解扫描

   在applicationContext.xml的`<beans>`元素中添加配置信息

   ```
   <context:component-scan base-package="com.SpringTest.bean" />
   ```

   即扫描bean包下所有类的注解

3. 新建类，例如Sch

   ```
   @Component("sth")
   @Scope(scopeName = "singleton")
   public class Sch{
       @Value("005")
       private int sid;
       @Autowired
       @Qualifier("stu")
       private Stu stu;
       ....;
       @PostConstruct
       public void init()
       {
           System.out.println("调用init()方法")；
   	}
       
       @PreDestroy
       public void close()
       {
           System.out.println("调用close()方法");
       }
   }
   ```

   以上代码中，@Component注解将Sch类注册为Spring容器中的Bean，@Scope注解指定Sch类的作用域，@Value注解为Sch类的sid属性注入值，@Autowired和@Qualifier注解为Sch类的stu属性注入另一个Bean实例。@PostConstruct注解指完成实例化后调用的方法，@PreDestroy注解指销毁前调用的方法。

## AOP

### 概念

AOP——面向切面编程

1. 连接点（Joinpoint）：

   程序执行过程中某个特定的节点，例如某个类的初始化完成后、某个方法执行前等。

2. 通知（Advice）：

   通知是在目标类连接点上执行的一段代码，有如下几种方式。

   | 通知类型                    | 描述                             |
   | --------------------------- | -------------------------------- |
   | 前置通知（Before）          | 在目标方法被调用之前调用通知     |
   | 后置通知（After）           | 在目标方法被调用之后调用通知     |
   | 返回通知（After-returning） | 在目标方法成功执行之后调用通知   |
   | 异常通知（After-throwing）  | 在目标方法抛出异常之后调用通知   |
   | 环绕通知（Around）          | 在目标方法调用前和调用后调用通知 |

3. 切点（Pointcut）：

   匹配连接点的断言，AOP通过切点来定位特定的连接点。通知和一个切入点表达式关联，并在满足这个切入点的连接点上运行（例如执行某个特定名称的方法）

4. 目标对象（Target）：

   通知所作用的目标类。

5. 引介（Introduction）：

   是一种特殊的通知，它可以为类添加一些属性和方法。

6. 切面（Aspect）：
   对系统中的横切关注点逻辑进行模块化封装的AOP概念实体。

7. 织入（Weaving）：
   织入是将通知添加到目标类具体连接点的过程。

8. 代理（Proxy）：
   目标类被AOP织入增强后产生的一个结果类，这个结果类融合了原类和增强的逻辑。

### 实现机制

**JDK动态代理**

在Spring中，AOP代理由IOC容器负责创建，依赖关系也由IOC容器管理，因此AOP可以直接将IOC容器中的其他类作为目标对象。在默认情况下Spring AOP使用JDK动态代理，当目标对象是一个类并且这个类没有实现接口的时候，切换到CGLib代理。

JDK动态代理涉及到两个API：InvocationHandler和Proxy。

InvocationHandler是一个接口，代理类通过实现该接口来定义横切逻辑。

Proxy利用InvocationHandler动态生成目标类的代理对象。

示例：

新建四个类。

```
public interface LoginService{
    public void login();
}
public class LoginServiceImpl implements LoginService{
    @Override
    public void login()
    {
        System.out.println("执行login()方法");
    }
}
public class PerformHandler implements InvocationHandler{
    //目标对象
    private Object target;
    public PerformHandler(Object target){
        this.target=target;
    }
    
    @Override
    //实现InvocationHandler接口
    public Object invoke(Object proxy, Method method, Object[] args) throws 
        Throwable{
        //增强的方法
        System.out.println("方法开始执行");
        //执行被代理类的原方法
        Object invoke = method.invoke(target, args);
        //增强的方法
        System.out.println("方法执行完毕");
    }
}
public class Test{
    public static void main(String[] args){
        LoginService loginService = new LoginServiceImpl();
        PerformHandler performHandler = new PerformHandler(loginService);
        //创建代理对象
        loginService = (LoginService) Proxy.newProxyInstance
			(loginService.getClass().getClassLoader(),
			LoginService.getClass().getInterfaces().performHandler);
        loginService.login();
    }
}
```

最后得到结果

> 方法开始执行
>
> 执行login()方法
>
> 方法执行完毕

**CGLib动态代理**

JDK动态代理只能为接口创建代理，而CGLib可以为类创建代理。

CGLib动态代理依赖Enhancer类创建代理实例，依靠MethodInterceptor接口织入要增强的方法。

示例：

```
public class CgLibProxy implements MethodInterceptor{
    private Enhancer enhancer = new Enhancer();
    //生成代理对象的方法
    public Object getProxy(Class clazz){
        enhancer.setSuperClass(clazz);
        enhancer.setCallback(this);
        return enhancer.create();
    }
    
    //回调方法，该方法将拦截目标类中所有方法的调用。
    @Override
    public Object intercept(Object obj, Method method, Object[] objects, MethodProxy 			methodProxy) throws Throwable{
        System.out.println("CGLib代理之前");
        Object invoke = methodProxy.invokeSuper(obj,objects);
        System.out.println("CGLib代理之后");
        return invoke;
    }
}
public class TestCGLib{
    public static void main(String[] args){
        CgLibProxy cglibProxy = new CgLibProxy();
        //创建代理对象
        LoginServiceImpl userService = (LoginServiceImpl) 											cglibProxy.getProxy(LoginServiceImpl.class);
        userService.login();
    }
}
```

得到结果：

> CGLib代理之前
>
> 执行Login()方法
>
> CGLib代理之后

### 开发方法

**基于XML开发**

XML中配置AOP的元素：

| 元素名称                                   | 描述            |
| ------------------------------------------ | --------------- |
| [aop:config](aop:config)                   | AOP配置的根元素 |
| [aop:aspect](aop:aspect)                   | 指定切面        |
| [aop:advisor](aop:advisor)                 | 指定通知器      |
| [aop:pointcut](aop:pointcut)               | 指定切点        |
| [aop:before](aop:before)                   | 指定前置通知    |
| [aop:after](aop:after)                     | 指定后置通知    |
| [aop:around](aop:around)                   | 指定环绕通知    |
| [aop:after-returning](aop:after-returning) | 指定返回通知    |
| [aop:after-throwing](aop:after-throwing)   | 指定异常通知    |

示例：

首先在applicationContext.xml中引入AOP，略

```
package com.qfedu.demo02;
public interface UserService{
    void insert();
    void delete();
    void update();
    void select();
}
package com.qfedu.demo02;
public class UserServiceImpl implements UserService{
    @Override
    public void insert(){
        System.out.println("添加用户信息");
    }
    @Override
    public void delete(){
        System.out.println("删除用户信息");
    }
    @Override
    public void update(){
        System.out.println("更新用户信息");
    }
    @Override
    public void select(){
        System.out.println("查询用户信息");
    }
}
```

创建类XmlAdvice用于定义通知

```
package com.qfedu.demo02;
public class XmlAdvice{
    //前置通知
    public void before(){
        System.out.println("这是前置通知");
    }
    
    public void after(){
        System.out.println("这是后置通知");
    }
    
    public Object around(ProceddingJoinPoint point) throws Throwable{
        System.out.println("这是环绕通知之前的部分");
        ///调用目标方法
        Object object = point.proceed();
        System.out.println("这是环绕通知之后的部分");
        return object;
    }
    
    public void afterReturning(){
        System.out.println("这是返回通知（方法不出现异常时调用）");
    }
    
    public void afterException(){
        System.out.println("这是异常通知");
    }
}
```

在applicationContext.xml的`<bean>`元素中添加配置信息

```
<!--注册Bean-->
<bean name="userService" class="com.qfedu.demo02.UserServiceImpl" />
<bean name="xmlAdvice" class="com.qfedu.demo02.XmlAdvice" />
<!--配置Spring AOP-->
<aop:config>
	<!--指定切点-->
    <aop:pointcut id="pointcut" 
                  expression="execution(* com.qfedu.demo02.UserServiceImpl. *(..))" />
    <!--指定切面-->
    <aop:aspect ref="xmlAdvice">
    	<!--指定前置通知-->
        <aop:before method="before" pointcut-ref="pointcut" />
        <aop:after-returning method="afterReturning" pointcut-ref="pointcut" />
        <aop:around mehtod="around" pointcut-ref="pointcut" />
        <aop:after-throwing method="afterException" pointcut-ref="pointcut" />
        <aop:after method="after" pointcut-ref="pointcut" />
    </aop:aspect>
</aop:config>
```

测试类

```
package com.qfdeu.demo02;
public class TestXml{
    public static void mian(String[] args){
        ApplicationContext context = new 															ClassPathXmlApplicationContext("applicationContext.xml");
    	UserService userService = context.getBean("userService",UserService.class);
        userService.delete();
    }
}
```

得到结果：

> 这是前置通知
>
> 这是环绕通知之前的部分
>
> 删除用户信息
>
> 这是后置通知
>
> 这是环绕通知之后的部分
>
> 这是返回通知（方法不出现异常时调用）

**基于注解开发**

支持的注解类型如下：

| 注解名称        | 描述         |
| --------------- | ------------ |
| @Aspect         | 指定切面     |
| @Pointcut       | 指定切点     |
| @Before         | 指定前置通知 |
| @After          | 指定后置通知 |
| @Around         | 指定环绕通知 |
| @AfterReturning | 指定返回通知 |
| @AfterThrowing  | 指定异常通知 |

示例：

```
package com.qfedu.demo02;
@Aspect
public class AnnoAdvice{
    //切点
    @Pointcut("execution(* com.qfedu.demo02.UserServiceImpl.* (..))")
    public void pointcut(){
    }
    
    //前置通知
    @Before("pointcut()")
    public void before(){
        System.out.println("这是前置通知");
    }
    //后置通知
    @After("pointcut()")
    public void after(){
        System.out.println("这是后置通知");
    }
    @Around("pointcut()")
    public Object around(ProceedingJoinPoint point) throws Throwable{
        System.out.println("这是环绕通知之前的部分");
        Object object = point.proceed();
        System.out.println("这是环绕通知之后的部分");
        return object;
    }
    @AfterReturning("pointcut()")
    public void afterReturning(){
        System.out.println("这是返回通知");
    }
    @AfterThrowing("pointcut()"){
        System.out.println("这是异常通知");
    }
}
```

配置applicationContext.xml文件

```
<!--注册Bean-->
<bean name="userService" class="com.qfedu.demo02.UserServiceImpl" />
<bean name="annoAdvice" class="com.qfedu.demo02.AnnoAdvice" />
<!--开启@aspectj的自动代理支持-->
<aop:aspectj-autoproxy />
```

测试如上

### 多个切面优先级

**基于注解配置**

只需要添加`@Order`注解即可

```
//例如两个类Aspect1和Aspect2

@Aspect
@Order(1)
public class aspect1{
}

@Aspect
@Order(0)
public class aspect2{
}
```

Order注解中的值越小，优先级越高，所以aspect2会优先于aspect1

**基于Ordered接口配置**

Ordered接口提供了一个getOrder()方法来设置优先级

```
//同样两个类Aspect1和Aspect2

public class aspect1 implements Ordered{
    ....;
    @Override
    public int getOrder(){
        return 1;
    }
}

public class aspect2 implements Ordered{
    ....;
    @Override
    public int getOrder(){
        return 0;
    }
}
```

同样，值越小，优先级越高，所有Aspect2的优先级大于Aspect1

**基于XML配置**

主要通过`<aop:aspect>`元素的`<order>`元素实现，在配置切面时添加Order属性

```
....
<!--配置切面-->
<aop:aspect ref="aspect1" order="1">
	....;
</aop:aspect>

<aop:aspect ref="aspect2" order="0">
	....;
</aop:aspect>
```

同样，这里也是Aspect2的优先级大于Aspect1

## Spring MVC基础

### 概念

**功能组件**

1. DIspatcherServlet（前端控制器）

   前端控制器负责拦截客户端请求并分发给其他组件，它是整个流程控制的中心。

2. HandlerMapping（处理器映射器）

   处理器映射器负责根据客户端请求的URL寻找处理器。

3. Handler（处理器）

   处理器负责对客户端的请求进行处理，编写的业务逻辑写在这里。

4. HandlerAdapter（处理器适配器）

   处理器适配器负责根据特定的规则对处理器进行执行。

5. ViewResolver（视图解析器）

   视图解析器负责视图解析，它将处理结果生成View并展示给用户。关于视图相关的代码在这里编写。

**工作流程**

[![图片来自https://blog.csdn.net/evankaka/article/details/45501811](https://img-blog.csdn.net/20150505141238573)](https://img-blog.csdn.net/20150505141238573)

1. 用户—>DispatcherServlet

   客户端发出一个HTTP请求，服务器接收请求，根据DispatcherServlet的映射路径，将请求交予DispatcherServlet处理

2. DIspatcherServlet—>Handler

   DispatcherServlet根据URL、方法、报文头和参数在内的请求信息以及HandlerMapping的配置解析得到Handler

3. DispatcherServlet—>HandlerAdapter

   解析出Handler后调用HandlerAdapter来调用Handler并完成业务逻辑的处理。

4. HandlerAdapter—>DispatcherServlet

   完成业务逻辑处理后，将处理结果，即ModelAndView返回给DispatcherServlet

5. DispatcherServlet—>VIewResolver

   通过ViewResolver完成逻辑视图名到真实View对象的解析，并通过View对象对数据模型进行视图渲染。

6. DispatcherServlet—>用户

   DispatcherServlet将最终的View对象返回给客户端，呈现给用户。

### 简单应用

先在web.xml中配置DispatcherServlet

```
<servlet>
    <servlet-name>springMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
             <param-name>contextConfigLocation</param-name>
              <param-value>/WEB-INF/springMVC-config.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
 <!-- 访问DispatcherServlet对应的路径 -->
 <servlet-mapping>
      <servlet-name>springMVC</servlet-name>
      <url-pattern>/</url-pattern> 
 </servlet-mapping>
```

contextConfigLocation表示引入springMVC配置文件所在位置

`<load-on-startup>`表示优先级

`<url-pattern>`元素的值为”/”，表示将所有的请求都映射到DispatcherSevelet

**XML实现**

在WebContent/WEB-INF目录下新建spring-MVC的配置文件springMVC-config.xml

```
<?xml version='1.0' encoding='UTF-8'?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
	<!-- 配置Controller类 -->
	<bean name="/controller01"
		class="com.qfedu.controller.MyController01" />
	<!-- 配置处理器映射器 -->
	<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping" />
	<!-- 配置处理器适配器 -->
	<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter" />
	<!-- 配置视图解析器 -->
	<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" />
</beans>
```

在src中新建com.qfedu.controller包，新建MyController01类

```
public class MyController01 implements Controller{
    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse 			response) throws Exception{
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","Hello World");
        mv.setViewName("/WEB-INF/page/page01/jsp");
        return mv;
    }
}
```

handlerRequest()方法用于处理客户端请求，其中先新建了一个ModelAndView对象，然后为ModelAndView对象设置模型数据和View名称，最后将该对象返回。

在WebContent/WEB-INF/page/page01.jsp中通过下述代码调用程序

```
<body>
    $ {requestScope.msg}
</body>
```

**注解实现**

新建类MyController02

```
package com.qfedu.controller;
@Controller
public class MyController02{
    @RequestMapping("/execute")
    public ModelAndView execute(){
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","Hello World");
        mv.setViewName("page01");
        return mv;
    }
}
```

@Controller注解将类作为一个Controller类配置到Spring容器中，@RequestMapping注解指定了execute()方法的映射路径。

修改springMVC-config.xml配置文件

```
<!--扫描Controller-->
<context:component-scan base-package="com.qfedu.controller" />
<!--配置视图解析器-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
	<property name="prefix" value="/WEB-INF/page/" />
    <property name="suffix" value=".jsp" />
</bean>
```

prefix用于指定View名称的前缀，suffix用于指定View名称的后缀

### 常用注解

除了上述使用到的@Controller，还有一些常用的注解

**@RequestMapping**

@RequestMapping注解用于处理请求地址映射，示例如下

```
@Controller
public class MyController03{
    //访问page02.jsp
    @RequestMapping(value="/toWelcome")
    public ModelAndView toWelcome(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("page02");
        return mv;
    }
    //访问page01.jsp
    @RequestMapping(value="/welcome", method=RequestMethod.POST)
    public ModelAndView welcome(){
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg","Hello World");
        mv.setViewName("page01");
        return mv;
    }
}
```

上述代码中，第一个@RequestMapping注解的value值为”/toWelcome”，表明访问路径为“/toWelcome”的请求将由toWelcome()方法处理，处理完成后请求被转发到page02.jsp。

第二个@RequestMapping注解的value值为”/welcome”，methdo属性值为”RequestMethod.POST“，表明访问路径为”/welcome“，并且访问方式为”POST“的请求将由welcome()方法处理，处理完成后请求被转发到page01.jsp。

**@RequestParam**

@RequestParam注解用于获取请求参数的值，将请求参数赋值给方法中的形参。

```
@RequestMapping(value="/login")
public ModelAndView login(@RequestParam(value="username", defaultValue="xiaofeng") String username, @ReqeustParam(value="password", defaultValue="123abc") String password){
    System.out.println("用户名:" + username);
    System.out.println("密码:" + password);
    return null;
}
```

上述代码中，第一个@RequestParam注解的value属性值为username，defaultValue为xiaofeng，即将请求参数username的值赋值给login()方法中的形参username，当请求参数没有提交值时，采用默认值”xiaofeng“，password同理。

**@PathVariable**

@PathVariable注解用于获取URL中的动态参数

```
package com.qfedu.comtroller;
@Controller
@RequestMapping(value="/claList/{cid}")
public class MyController05{
    @RequestMapping(value="/stuList/{sid}")
    public String findStudent(@PathVariable(value="cid") Integer cid, @PathVariable(value="sid") Integer sid){
        System.out.println("班级ID为：" + cid);
        System.out.println("学生ID为：" + sid);
        return null;
    }
}
```

@RequestMapping注解的value属性使用的为动态参数，@PathVariable注解将动态参数cid，sid映射为findStudent()方法中的形参cid，sid。