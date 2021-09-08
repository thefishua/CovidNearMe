import sys
import json
from flask import Flask, request
from os import path
from time import time
from flask_cors import CORS

import load


FILEPATH = "../../frontend/covid-near-me/src/data/"
BASEPATH = path.dirname(__file__)
LGA_FILE = path.abspath(path.join(BASEPATH, FILEPATH)) + "/nsw_lga.json"
PORT = "8080"
SERVER_URL = f"https://localhost:{PORT}"

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = json.dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__, static_url_path='', static_folder='build/')
APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)
CORS(APP)

@APP.route("/echo", methods=['GET'])
def echo():
    data = request.args.get('data')
    return json.dumps({
        'data': data
    })

@APP.route("/active", methods=["GET"])
def get_json():
    f = open(LGA_FILE, "r")
    data = json.load(f)
    if abs(data["timestamp"] - time()) > 3600:
        data = load.loadLGACases()
    return json.dumps(data)

@APP.route("/update-active", methods=["GET"])
def update():
    ret = {}
    ret["success"] = False
    data = load.loadLGACases()
    load.loadTotalCases()
    load.loadHotspots()
    load.loadCovidClinics()
    load.loadVaccine()
    if abs(data["timestamp"] - time()) < 180:
        ret["success"] = True
    return json.dumps(ret)

if __name__ == "__main__":
    APP.run(port=PORT)
