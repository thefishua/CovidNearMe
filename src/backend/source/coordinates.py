import json
import ssl 
import requests
from requests.structures import CaseInsensitiveDict
from os import path

BASE_URL = "https://api.geoapify.com/v1/geocode/search?"
API_KEY = "apiKey=c342b1b8b692417298c139f004e9ea52"

FILEPATH = "../../frontend/covid-near-me/src/data/"
BASEPATH = path.dirname(__file__)

def search(lga_name: str) -> dict:
    ret = {}
    parts = lga_name.split()
    name = ""
    
    for i in parts:
        if i[0] != "(":
            if i != parts[0]:
                name = name + " " + i
            else:
                name += i
    saved_name = name
    name += " NSW"
    url = BASE_URL + API_KEY
    url += "&city=" + name
    url += "&state=New+South+Wales"
    url += "&country=Australia"

    headers = CaseInsensitiveDict()
    headers["Accept"] = "application/json"
    resp = requests.get(url, headers=headers)
    data = resp.json()
    # with open("test.json", "w") as f:
    #     json.dump(data, f, indent = 4, sort_keys=True)
    # print(f"===NAME== {saved_name}")
    for i in data["features"]:
        # print(i["properties"]["address_line1"])
        if i["properties"]["address_line1"] == saved_name:
            ret["latitude"] = i["properties"]["lat"]
            ret["longitude"] = i["properties"]["lon"]
            break

    return ret

def load():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/nsw_lga.json"
    f = open(file_path, "r")
    data = json.load(f)
    f.close()
    for i in data["list"]:
        ret = search(i["LGA_NAME19"])
        print("LGA_NAME " + i["LGA_NAME19"])
        if ret == {}:
            i["latitude"] = 0
            i["longitude"] = 0
        else:
            i["latitude"] = ret["latitude"]
            i["longitude"] = ret["longitude"]

        print("long = " + str(i["latitude"]))
        print("long = " + str(i["longitude"]))

    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()

def remain():
    file_path = path.abspath(path.join(BASEPATH, FILEPATH))
    file_path += "/nsw_lga.json"
    f = open(file_path, "r")
    data = json.load(f)
    f.close()
    for i in data["list"]:
        if i["latitude"] == 0 and i["longitude"] == 0:
            print(i["LGA_NAME19"])
            i["latitude"] = float(input("latitude ="))
            i["longitude"] = float(input("longitude ="))
        print("LGA_NAME " + i["LGA_NAME19"])
        print("long = " + str(i["latitude"]))
        print("long = " + str(i["longitude"]))
    with open(file_path, "w") as f:
        json.dump(data, f)
    f.close()




if __name__ == "__main__":
    remain()
    # search("Warrumbungle Shire (A)")