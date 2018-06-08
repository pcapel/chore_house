"""
Primary API interface for the creation, and manipulation of chores.

I'm thinking that the tree structure of chores lends themselves to a
graphQL API.  So flask-graphql will be the goto.

User data relating to chores will be primarily relational and will just
live in little sqlite.
"""
import datetime
import time

from flask import Flask, jsonify


app = Flask(__name__)

@app.route('/index')
def index():
    data = {
        'greeting': "Hello, world!"
    }
    return jsonify(data)