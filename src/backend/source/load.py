from covid_testing_clinic import CovidTestingClinic
from covid import casesActiveNSW, casesActivePerLGA
from hotspots import JSONHotspotsNSW
from vaccine import VaccineNSW
from datetime import timedelta
from datetime import datetime
import json
from time import time
from os import path
CASES = "active_cases"
FILEPATH = "../../frontend/covid-near-me/src/data/"
BASEPATH = path.dirname(__file__)
AUSTRALIA_POPULATION = 25000000

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
    return data

def loadHotspots():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/hotspots.json"
    f = open(file_path, "r")
    data = json.load(f) 
    f.close()
    data = JSONHotspotsNSW()
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

def loadCovidClinics():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/covid_testing_clinic.json"
    f = open(file_path, "r")
    data = json.load(f) 
    f.close()
    data = CovidTestingClinic()
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

# loadVaccine loads all the data from vaccine.py and transfers it to a readible json
# that is later used in the frontend for the vaccine page
def loadVaccine():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/vaccine.json"
    data = VaccineNSW()
    data.to_json(file_path, orient = "records", date_format = "epoch", double_precision = 10, force_ascii = True, date_unit = "ms", default_handler = None)
    f = open(file_path, "r")
    data = json.load(f) 
    f.close()
    new_data = {"list": data}
    new_data["Australian Population"] = AUSTRALIA_POPULATION
    
    secondLastElement = new_data["list"][len(new_data["list"]) - 2]["people_fully_vaccinated"]
    lastElement = new_data["list"][len(new_data["list"]) - 1]["people_fully_vaccinated"]
    diff = lastElement - secondLastElement
    forecast = new_data["list"][len(new_data["list"]) - 1]["date"]
    forecast = datetime.strptime(forecast, '%Y-%m-%d')
    while lastElement < AUSTRALIA_POPULATION*0.8:
        forecast += timedelta(days=1)
        new_data["list"].append({"date": forecast.strftime('%Y-%m-%d')})
        lastElement += diff
    
    # new_data["list"].append({"date": forecast.strftime('%Y-%m-%d'), "people_fully_vaccinated": AUSTRALIA_POPULATION * 0.8,})
    with open(file_path, "w") as f:
        json.dump(new_data, f)
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
    loadVaccine()
    # loadPostcodeCases()
