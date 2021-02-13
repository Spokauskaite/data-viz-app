# -*- coding: utf-8 -*-
"""
Created on Sat Feb 13 14:55:45 2021

@author: Lina
"""

import os
import sqlite3
import seaborn as sns

# change dir
db_path = 'C:/Users/Lina/Desktop/data-viz-app'
os.chdir(db_path)

# create DB
db_file = 'penguin_data.db'
db_file_path = f"{db_path}/{db_file}"
with open(db_file_path, 'w'): 
    pass

# connect to DB
conn = sqlite3.connect(db_file_path)
c = conn.cursor()

# ----------- CREATE FOOD TABLE -----------------------------------------------

# Load as a dataframe
df = sns.load_dataset('penguins')
df = df.dropna()
value_list = df.values.tolist()

#create penguin DB table
sql_query = '''CREATE TABLE penguins
    (species text,
     island text,
     bill_length_mm float,
     bill_depth_mm float,
     flipper_length_mm float,
     body_mass_g float,
     sex text)'''
c.execute(sql_query)

# store penguin data
c.executemany('INSERT INTO penguins VALUES (?,?,?,?,?,?,?)', value_list)

# test
c.execute('SELECT * FROM penguins ')
print (c.fetchone())
