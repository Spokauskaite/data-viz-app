# -*- coding: utf-8 -*-
"""
Created on Sat Feb 13 14:29:09 2021

@author: Lina
"""

import logging
from logging import Formatter, FileHandler
from flask import Flask
import sqlite3
import pandas as pd

app = Flask(__name__)

# logging ---------------------------------------------------------------------
LOGGER = logging.getLogger('')
file_handler = FileHandler('test.log')
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

# api calls -------------------------------------------------------------------
#@app.route('/loadPenguinData/<int:nutrient_id>/<int:offset>')
@app.route('/loadPenguinData')
def getAllFood(nutrient_id,offset):
    database_file =  'penguin_data.db'
    conn = sqlite3.connect(database_file)
    c = conn.cursor()
    sql_query ='''SELECT 
        species,
        island,
        bill_length_mm,
        bill_depth_mm,
        flipper_length_mm,
        body_mass_g,
        sex'''
    c.execute(sql_query)
    fetched_data=c.fetchall()
    fetched_data = pd.DataFrame(fetched_data)
    fetched_data = fetched_data.to_json(orient='index')
    return {"penguins":fetched_data}


# logging----------------------------------------------------------------------
if __name__ == '__main__':
    app.run()