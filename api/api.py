# -*- coding: utf-8 -*-
"""
Created on Sat Feb 13 14:29:09 2021

@author: Lina
"""

import sqlite3
import logging
from logging import Formatter, FileHandler
from flask import Flask
import pandas as pd

app = Flask(__name__)

# this is for logging ---------------------------
LOGGER = logging.getLogger('whatever')
file_handler = FileHandler('logging.log')
handler = logging.StreamHandler()
file_handler.setFormatter(Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
handler.setFormatter(Formatter(
    '%(asctime)s %(levelname)s: %(message)s '
    '[in %(pathname)s:%(lineno)d]'
))
LOGGER.addHandler(file_handler)
LOGGER.addHandler(handler)
LOGGER.setLevel(logging.INFO)
LOGGER.info('logging set')
#------------------------------------------------

@app.route('/loadPenguinData')
def loadPenguinData():
    database_file =  'penguin_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query ='''SELECT * FROM penguins'''
    c.execute(sql_query)
    fetched_data=c.fetchall()
    fetched_data = pd.DataFrame(fetched_data)
    fetched_data.columns = [
        'species',
        'island',
        'bill_length_mm',
        'bill_depth_mm',
        'flipper_length_mm',
        'body_mass_g',
        'sex' 
    ]
    fetched_data = fetched_data.to_json(orient='records')
    return {'data':fetched_data}

@app.route('/loadBarChartData')
def loadBarChartData():
    database_file =  'penguin_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query ='''SELECT species, body_mass_g FROM penguins'''
    c.execute(sql_query)
    fetched_data=c.fetchall()
    fetched_data = pd.DataFrame(fetched_data)
    fetched_data.columns = [
        'species',
        'body_mass_g'
    ]
    grouped_data = fetched_data.groupby('species').mean().round(2)
    grouped_data = grouped_data.to_json()
    return {'data':grouped_data}

@app.route('/loadLargeData')
def loadLargeData():
    database_file =  'large_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query ='''SELECT * FROM large_data'''
    c.execute(sql_query)
    fetched_data=c.fetchall()
    fetched_data = pd.DataFrame(fetched_data)
    fetched_data = fetched_data.to_json(orient='records')
    return {'data':fetched_data}


# this is for logging-------------------------
if __name__ == '__main__':
    app.run()
