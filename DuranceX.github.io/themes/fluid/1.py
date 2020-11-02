# -*- coding=utf-8 -*-
import re


def get(str):
    return re.match(r'(.*): \[(.*),(.*),(.*)\]',str)

def write_file(output,str):
    output.write("- {\n")
    output.write("  title: '" + get(str).group(1) + "',\n")
    output.write("  intro: '" + get(str).group(3) + "',\n")
    output.write("  link: '" + get(str).group(2) + "',\n")
    output.write("  image: '" + get(str).group(4) + "'\n")
    output.write("}\n")

def write_cards_file(output,str):
    output.write("- name: " + get(str).group(1) + "\n")
    #output.write("  avatar: " + get(str).group(3) + "\n")
    output.write("  url: " + get(str).group(2) + "\n")
    output.write("  avatar: " + get(str).group(4) + "\n")
    output.write("  target: _blank\n")
    output.write("  backgroundColor: '#fff'\n")
    output.write("  textColor: '#444'\n")
	
f = open("old.txt","r",encoding='utf-8')
o = open("cards.txt","a")
line = f.readline()
while line:
    print(line)
    write_cards_file(o,line)
    line = f.readline()

f.close()
o.close()
