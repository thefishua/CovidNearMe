from covid import casesActiveNSW, casesActivePerLGA
import json
from time import time

CASES = "active_cases"

def loadTotalCases():
    data = {}
    data["total"] = casesActiveNSW()
    data["timestamp"] = time()
    with open("./data/total.json", "w") as f:
        json.dump(data, f)
    f.close()

def loadLGACases():
    f = open("./data/nsw_lga.json", "r")
    data = json.load(f)
    f.close()
    data["total"] = casesActiveNSW()
    data["timestamp"] = time()
    for i in data["list"]:
        i[CASES] = casesActivePerLGA(i["LGA_CODE19"])
    with open("./data/nsw_lga.json", "w") as f:
        json.dump(data, f)
    f.close()

def loadPostcodeCases():
    f = open("./data/nsw_postcodes.json", "r")
    data = json.load(f)
    f.close()
    data["total"] = casesActiveNSW()
    data["timestamp"] = time()
    for i in data["list"]:
        i[CASES] = casesActivePerLGA(i["postcode"])
    with open("./data/nsw_postcodes.json", "w") as f:
        json.dump(data, f)
    f.close()

if __name__ == "__main__":
    loadPostcodeCases()
