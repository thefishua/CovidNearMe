import urllib.request as request
import urllib.parse as parse
import ssl
import json
import time
from datetime import date, timedelta

COVID_INFECTION_PERIOD = 15
BASE = "https://data.nsw.gov.au/data"
RESOURCE = '/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29'
LGA_FILE = "lga_dict.json"
LGA_NAME = "LGA_NAME19"
LGA_CODE = "LGA_CODE19"

# This function calculates the amount of active covid cases in NSW
# Based on the time period of COVID_INFECTION_PERIOD
# Using the NSW health API
def casesActiveNSW():
    today = date.today()
    past = today - timedelta(days=COVID_INFECTION_PERIOD)
    location = BASE + RESOURCE
    s_context = ssl.SSLContext()
    cases = 0

    while past != today:
        # print(past)
        yelp = "&filters={\"notification_date\":\"" + str(past) + "\"}"
        ulocation = location + yelp
        # print(ulocation)
        obj = request.urlopen(ulocation, context = s_context)
        data = json.load(obj)
        if data['success']:
            # print(data['result']['total'])
            cases = cases + int(data["result"]["total"])
            
        # print(data)
        past = past + timedelta(days=1)

    return cases

# This function calculates the amount of active covid cases in NSW
# Specific to an local government area
# List of LGA's and their codes can be found in lga.json
# Based on the time period of COVID_INFECTION_PERIOD
# Using the NSW health API
def casesActivePerLGA(lga_code: int) -> int:
    today = date.today()
    past = today - timedelta(days=COVID_INFECTION_PERIOD)
    iter_past = past
    location = BASE + RESOURCE
    s_context = ssl.SSLContext()
    cases = 0
    while iter_past != today:
        query = "{\"notification_date\":\"" + str(iter_past)
        query += "\",\"lga_code19\":\"" + str(lga_code) + "\"}"
        yelp = f"&filters={query}"
        # print(yelp)
        ulocation = location + yelp
        # print(ulocation)
        obj = request.urlopen(ulocation, context = s_context)
        data = json.load(obj)
        if data['success']:
            # print(data['result']['total'])
            cases += int(data["result"]["total"])
                
            # print(data)
        iter_past = iter_past + timedelta(days=1)
    return cases       

        
    


if __name__ == "__main__":
    f = open("lga.json")
    lga = json.load(f)
    for area in lga:
        count = casesActivePerLGA(area[LGA_CODE])
        print(f"Active cases in {area[LGA_NAME]}: {count}")
