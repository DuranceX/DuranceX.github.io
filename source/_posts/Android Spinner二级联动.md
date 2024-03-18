---
title: Android Spinner二级联动
date: 2022-05-04 21:00:00
tags: 安卓
categories: 安卓
---
## 前言
遇到一个需求是两个Spinner的联动，第二个Spinner根据第一个Spinner选择的数据来修改内容。更常见的例子就是省市的选择，选中一个省份，再根据选中的省份显示对应的城市列表。
我这里则是名称和型号的联动选择，首先选中一个产品名称，再根据选中的产品名显示对应的型号列表。在网上看到的例子中的数据都是程序中直接定义的，而我这里的数据是从数据库中查询得到的，因此又多了一个子线程的内容。

## 1. Spinner的设置
也没啥好设置的，就是xml文件中放置两个Spinner
```xml
<TextView  
    android:id="@+id/textViewNameLabel"  
    android:layout_width="wrap_content"  
    android:layout_height="wrap_content"  
    android:text="@string/material_fragment_name"  
    android:textAppearance="@style/font_family_pingfang_black"  
    android:textSize="20sp"  
    app:layout_constraintBottom_toTopOf="@+id/guideline47"  
    app:layout_constraintStart_toStartOf="@+id/guideline60"  
    app:layout_constraintTop_toTopOf="@+id/guideline47" />  
  
<Spinner  
    android:id="@+id/spinnerName"  
    android:layout_width="0dp"  
    android:layout_height="30dp"  
    app:layout_constraintBottom_toTopOf="@+id/guideline47"  
    app:layout_constraintEnd_toStartOf="@+id/guideline61"  
    app:layout_constraintStart_toEndOf="@+id/textView2"  
    app:layout_constraintTop_toTopOf="@+id/guideline47"  
    tools:ignore="TouchTargetSizeCheck" />  
  
<TextView  
    android:id="@+id/textViewModelLabel"  
    android:layout_width="wrap_content"  
    android:layout_height="wrap_content"  
    android:text="@string/material_fragment_model"  
    android:textAppearance="@style/font_family_pingfang_black"  
    android:textSize="20sp"  
    app:layout_constraintBottom_toTopOf="@+id/guideline72"  
    app:layout_constraintStart_toStartOf="@+id/guideline60"  
    app:layout_constraintTop_toTopOf="@+id/guideline72" />  
  
<Spinner  
    android:id="@+id/spinnerModel"  
    style="@style/mySpinnerItemStyle"  
    android:layout_width="0dp"  
    android:layout_height="30dp"  
    android:theme="@style/mySpinnerItemStyle"  
    app:layout_constraintBottom_toTopOf="@+id/guideline72"  
    app:layout_constraintEnd_toStartOf="@+id/guideline61"  
    app:layout_constraintStart_toEndOf="@+id/textView11"  
    app:layout_constraintTop_toTopOf="@+id/guideline72"  
    tools:ignore="TouchTargetSizeCheck" />
```
显示效果如下
![](https://images.starnight.top/img/20220505121353.png)

## 2. 查询名称列表
因为安卓中不能在主线程中访问数据库，所以新开一个线程来进行数据的查询，首先查询名称列表
```java
new Thread(new Runnable() {  
    @Override  
    public void run() {  
        productNameList = productViewModel.getProductNameList();  
    }  
}).start();
```
在程序初始化中即查询名称列表，并赋值给提前声明的变量。

## 3. 填充名称Spinner
```java
spinnerName = v.findViewById(R.id.spinnerName);  
spinnerModel = v.findViewById(R.id.spinnerModel);  
  
ArrayAdapter<String> nameAdapter = new ArrayAdapter<String>(getContext(), com.lihang.R.layout.support_simple_spinner_dropdown_item,productNameList);  
  
spinnerName.setAdapter(nameAdapter);  
```
由于型号对应的下拉框还没有数据，所以我们只声明了其Adapter，先不进行填充

## 4. 填充型号Spinner
首先给名称Spinner添加一个选中项变化的观察者，在观察者中，每当选中项发生变化，便根据名称查询型号，并填充到型号Spinner中
```java
spinnerName.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {  
    @Override  
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {  
        materialModelList.clear();  
        new Thread(new Runnable() {  
            @Override  
            public void run() {  
                String name = spinnerName.getSelectedItem().toString();  
				productModelList =  productViewModel.getProductModelListByName(name);
                ArrayAdapter<String> modelAdapter = new ArrayAdapter<String>(getContext(), com.lihang.R.layout.support_simple_spinner_dropdown_item,modelList);  
				spinnerModel.setAdapter(modelAdapter);
            }  
        }).start();  
    }  
  
    @Override  
    public void onNothingSelected(AdapterView<?> adapterView) { }  
});
```
一开始是这么写的，但是系统报了一个错误，`Only the original thread that created a view hierarchy can touch its views.`，即不能在子线程中操作UI，这里我在子线程中使用`SpinnerModel.setAdapter()`方法直接操作了UI，所以会报错，于是就需要一个Handler，在Handler中对UI进行操作，而在子线程中则进行查询操作，查询完毕后通过Message将数据传递给Handler，由Handler重新填充型号下拉框。
```java
Handler mHandler = new Handler(Looper.myLooper()){  
    @Override  
    public void handleMessage(@NonNull Message msg) {  
        super.handleMessage(msg);  
        if(msg.what == 1){  
            List<String> modelList = msg.getData().getStringArrayList("modelList");  
            ArrayAdapter<String> modelAdapter = new ArrayAdapter<String>(getContext(), com.lihang.R.layout.support_simple_spinner_dropdown_item,modelList);  
            spinnerModel.setAdapter(modelAdapter);  
        }  
    }  
};  
spinnerName.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {  
    @Override  
    public void onItemSelected(AdapterView<?> adapterView, View view, int i, long l) {  
        productModelList.clear();  
        new Thread(new Runnable() {  
            @Override  
            public void run() {  
                String name = spinnerName.getSelectedItem().toString();  
                productModelList =  productViewModel.getProductModelListByName(name);  
                Message message = Message.obtain();  
                message.what = 1;;  
                Bundle bundle = new Bundle();  
                bundle.putStringArrayList("modelList", (ArrayList<String>) productModelList);  
                message.setData(bundle);  
                mHandler.sendMessage(message);  
            }  
        }).start();  
    }
```