#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import random
import string


# In[2]:


path_to_excel_file = input("Enter path to source file : ")
output_file = input("Enter output file name : ")


# In[3]:


password_object = {'country':[], 'password':[]}


# In[4]:


def randomPassword(stringLength=8):
    lettersAndDigits = string.ascii_letters + string.digits
    return ''.join(random.choice(lettersAndDigits) for i in range(stringLength))


# In[5]:


df = pd.read_excel(path_to_excel_file)


# In[6]:


for d in df.get("country"):
    password = randomPassword()
    password_object["country"].append(d.replace(" ",""))
    password_object["password"].append(password)


# In[7]:


result_df = pd.DataFrame(password_object)


# In[8]:


writer = pd.ExcelWriter(output_file)
result_df.to_excel(writer, 'Sheet1', index=False)
writer.save()

