---
title: Android读取相册图片并显示
date: 2022-05-03 21:00:00
tags: 安卓
---
## Android根据Uri访问图片
在新的Android版本中，`startActivityForResult`方法被启用了，取而代之的是`registerForActivityResult`方法，`registerForActivityResult`方法需要在Activity中注册。
**注册**
```java
@Override  
public void onCreate(Bundle savedInstanceState) {  
    super.onCreate(savedInstanceState);  
    intentActivityResultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),new ActivityResultCallback<ActivityResult>(){  
        @Override  
        public void onActivityResult(ActivityResult result) {  
            if(result.getResultCode() == Activity.RESULT_OK) {  
                Uri uri = result.getData().getData();  
                if(imageProduct!=null && editTextImagePath!= null){  
                    Picasso.with(getContext()).load(uri).into(imageProduct);  
                    editTextImagePath.setText(uri.toString());  
                }  
                adapter.setImage(uri);  
            }  
        }  
    });  
}
```
其中intentActivityResultLauncher变量是`ActivityResultLauncher<Intent>`，这里在之前进行了声明，所以直接使用了。
**给按钮添加点击事件进行访问**

```java
imageProduct.setOnClickListener(imageView->{  
    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT, null);  
    intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");  
    intentActivityResultLauncher.launch(intent);  
});
```

## 修改，改进
这种方式可以正确的读取相册图片，并显示在imageView上，但是有一个问题，在通过这一方式打开相册并选取文件后，照片能够正常显示，但是当第一次打开软件时，这些图片并不能正常显示，只有当执行“打开相册，并选择照片”这一操作后才能正常显示。

不过问题并不出现在这里，而是读取的链接问题，通过log输出日志可以发现，读取到的Uri地址为`content://com.android.providers.downloads.documents/document/raw%3A%2Fstorage%2Femulated%2F0%2FDownload%2Ftest.jpg`，这种content Uri无法直接通过Picasso或setImageUri方法来设置图片，需要转化为文件路径，代码如下：
**获取文件路径**
```java
private String getImagePath(Uri uri, String selection) {  
    String path = null;  
    // 通过Uri和selection来获取真实的图片路径  
    Cursor cursor = getContext().getContentResolver().query(uri, null, selection, null, null);  
    if (cursor != null) {  
        if (cursor.moveToFirst()) {  
            path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA));  
        }  
        cursor.close();  
    }    
    return path;  
}
```

**使用**
```java
@Override  
protected void convert(@NonNull MyProductViewHolder holder, Product product) {  
    //填充数值  
    String TAG = "Test: file";  
    try{  
        if(!product.getImage().equals("")){  
            if(DocumentsContract.isDocumentUri(getContext(),Uri.parse(product.getImage()))){  
                Uri uri = Uri.parse(product.getImage());  
                String imagePath = "";  
                String docId = DocumentsContract.getDocumentId(uri);  
                Log.d(TAG, "docId: " + docId);  
                if ("com.android.providers.downloads.documents".equals(uri.getAuthority())) {  
                    if (docId.startsWith("raw:")) {  
                        imagePath = docId.replaceFirst("raw:", "");  
                    } else {  
                        Uri contentUri = ContentUris.withAppendedId(Uri.parse("content://downloads/public_downloads"), Long.parseLong(docId));  
                        imagePath = getImagePath(contentUri, null);  
                    }  
                    Log.d(TAG, imagePath);  
                }  
                //Picasso.with(getContext()).load(Uri.parse(imagePath)).into(holder.imageView);  
                holder.imageView.setImageURI(Uri.parse(imagePath));  
            }  
            else {  
                Picasso.with(getContext()).load(product.getImage()).into(holder.imageView);  
            }  
        }  
        else  
            throw new Exception();  
    }catch (Exception exception){  
        holder.imageView.setImageDrawable(getContext().getDrawable(R.drawable.product_placeholder));  
    }  
    holder.name.setText(product.getName());  
    holder.model.setText(product.getModel());  
    holder.material.setText(product.getUsedMaterial());  
    holder.price.setText("￥"+ String.valueOf(product.getPrice()));  
}
```
最后得到的，可以通过setImageURI方法设置，并直接访问的文件路径格式为`/storage/emulated/0/Download/wallhaven-wyzd56.png`

----
> [Android 调用相册返回路径以及返回Uri的总结 - carry莫奈 - 博客园 (cnblogs.com)](https://www.cnblogs.com/MrChen-/p/14607523.html)
> [Android uri转真实路径。_androidzmm的博客-CSDN博客_android uri转路径](https://blog.csdn.net/androidzmm/article/details/82886392)