import urllib.request as request
import urllib.parse as parse
import ssl
import json
import time
from datetime import date, timedelta

COVID_INFECTION_PERIOD = 15
BASE = "https://data.nsw.gov.au/data"
RESOURCE = '/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29'
RESOURCE_CODE = '2776dbb8-f807-4fb2-b1ed-184a6fc2c8aa'
RESOURCE_SQL = "/api/3/action/datastore_search_sql?sql="
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
    location = BASE + RESOURCE_SQL
    s_context = ssl.SSLContext()
    cases = 0
    query = f"SELECT+*+from+\"{RESOURCE_CODE}\"+WHERE+lga_code19+LIKE+\'{lga_code}\'+"
    query += f"AND+notification_date+BETWEEN+\'{past}\'+AND+\'{today}\'"
    # print(yelp)
    ulocation = location + query
    # print(ulocation)
    obj = request.urlopen(ulocation, context = s_context)
    data = json.load(obj)
    if data['success']:
        # print(data['result']['total'])
        cases += len(data["result"]["records"])
            
        # print(data)
    return cases        
    


if __name__ == "__main__":
    f = open("lga.json")
    lga = json.load(f)
    for area in lga:
        count = casesActivePerLGA(area[LGA_CODE])
        print(f"Active cases in {area[LGA_NAME]}: {count}")
