---
title: One-hot、Multi-hot
date: 2023-11-07 15:44:47
tags: 深度学习
categories: 深度学习
---
one-hot 表示特征只能有一个1，无论最后编码的向量维度的维度多少，比如幼年，青年，中年，老年；

*eg，小明是青年人。[0,1,0,0]*

而multihot表示特征可以多选，多个1出现；比如性格特征：平和，严谨，乐观……；

*eg：小明：是一个平和，乐观但粗心的人；[1,0,1]；*

```python
# 使用sklearn自带的编码器
import numpy as np
from sklearn.preprocessing import LabelBinarizer,MultiLabelBinarizer
x = np.array([["A"],["B"],["C"],["D"],["A"]])
y = [[2,3,4],[2],[0,1,3],[0,1,2,3,4],[0,1,2]]

LabelBinarizer().fit_transform(x)
# 输出
array([[1, 0, 0, 0],
       [0, 1, 0, 0],
       [0, 0, 1, 0],
       [0, 0, 0, 1],
       [1, 0, 0, 0]])

MultiLabelBinarizer().fit_transform(y)
# 输出
array([[0, 0, 1, 1, 1],
       [0, 0, 1, 0, 0],
       [1, 1, 0, 1, 0],
       [1, 1, 1, 1, 1],
       [1, 1, 1, 0, 0]])
```
