from covid import casesActiveNSW, casesActivePerLGA
from hotspots import JSONHotspotsNSW
import json
from time import time
from os import path
CASES = "active_cases"
FILEPATH = "../../frontend/covid-near-me/src/data/"
BASEPATH = path.dirname(__file__)

def loadTotalCases():
    data = {}
    data["total"] = casesActiveNSW()
    data["timestamp"] = time()
    data["cunt"] = "cunt"
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/total.json"
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

def loadLGACases():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/nsw_lga.json"
    
    f = open(file_path, "r")
    data = json.load(f)
    f.close()
    data["total"] = casesActiveNSW()
    data["timestamp"] = time()
    for i in data["list"]:
        i[CASES] = casesActivePerLGA(i["LGA_CODE19"])
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

def loadHotspots():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/hotspots.json"
    f = open(file_path, "r")
    data = json.load(f) 
    f.close()
    data = JSONHotspotsNSW()
    print(data)
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

# def loadPostcodeCases():
#     file_path = path.abspath(path.join(BASEPATH, FILEPATH))
#     file_path += "/nsw_postcodes.json"
    
#     f = open(file_path, "r")
#     data = json.load(f)
#     f.close()
#     data["total"] = casesActiveNSW()
#     data["timestamp"] = time()
#     for i in data["list"]:
#         i[CASES] = casesActivePerLGA(i["postcode"])
#     with open("./data/nsw_postcodes.json", "w") as f:
#         json.dump(data, f)
#     f.close()

if __name__ == "__main__":
    loadHotspots()
    # loadPostcodeCases()
