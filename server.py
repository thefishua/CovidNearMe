import sys
import json
from flask import Flask, request
from os import path
from time import time
from flask_cors import CORS, cross_origin

import backend.source.load as load


FILEPATH = "backend/data/"
FILEPATH_RUN = "/covid-near-me/build"
BASEPATH = path.dirname(__file__)
LGA_FILE = path.abspath(path.join(BASEPATH, FILEPATH)) + "/nsw_lga.json"
HOTSPOT_FILE = path.abspath(path.join(BASEPATH, FILEPATH)) + "/hotspots.json"
CLINIC_FILE = path.abspath(path.join(BASEPATH, FILEPATH)) + "/covid_testing_clinic.json"
VACCINE_FILE = path.abspath(path.join(BASEPATH, FILEPATH)) + "/vaccine.json"


RUN = path.abspath(path.join(BASEPATH, FILEPATH_RUN))

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

APP = Flask(__name__,static_folder="/build", static_url_path = '/')
APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)
CORS(APP)

@APP.route('/')
@cross_origin()
def index():
    return APP.send_static_file('index.html')

@APP.route("/<path:path>")
@cross_origin()
def static_file(path):
    return APP.send_static_file(path)


@APP.route("/echo", methods=['GET'])
@cross_origin()
def echo():
    data = request.args.get('data')
    return json.dumps({
        'data': data
    })

@APP.route("/api/active", methods=["GET"])
@cross_origin()
def get_json():
    f = open(LGA_FILE, "r")
    data = json.load(f)
    if abs(data["timestamp"] - time()) > 3600:
        data = load.loadLGACases()
    return json.dumps(data)

@APP.route("/api/hotspots", methods=["GET"])
@cross_origin()
def get_hotspots():
    f = open(HOTSPOT_FILE, "r")
    data = json.load(f)
    if abs(data["timestamp"] - time()) > 3600:
        data = load.loadHotspots()
    return json.dumps(data)

@APP.route("/api/clinics", methods=["GET"])
@cross_origin()
def get_clinics():
    f = open(CLINIC_FILE, "r")
    data = json.load(f)
    if abs(data["timestamp"] - time()) > 3600:
        data = load.loadCovidClinics()
    return json.dumps(data)

@APP.route("/api/vaccination", methods=["GET"])
@cross_origin()
def get_vaccine():
    f = open(VACCINE_FILE, "r")
    data = json.load(f)
    if abs(data["timestamp"] - time()) > 3600:
        data = load.loadVaccine()
    return json.dumps(data)

@APP.route("/api/update", methods=["GET"])
@cross_origin()
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
