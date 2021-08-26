import urllib.request as url
import ssl
import json
import time
from datetime import date, timedelta

COVID_INFECTION_PERIOD = 17
BASE = "https://data.nsw.gov.au/data"
RESOURCE = '/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29'
LGA_FILE = "lga_dict.json"
LGA_NAME = "LGA_NAME19"
LGA_CODE = "LGA_CODE19"

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
        obj = url.urlopen(ulocation, context = s_context)
        data = json.load(obj)
        if data['success']:
            # print(data['result']['total'])
            cases = cases + int(data["result"]["total"])
            
        # print(data)
        past = past + timedelta(days=1)

    return cases


def covidActivePerLGA():
    f = open(LGA_FILE, "r")
    lga_list = json.load(f)
    today = date.today()
    past = today - timedelta(days=COVID_INFECTION_PERIOD)
    location = BASE + RESOURCE
    s_context = ssl.SSLContext()
    cases = 0
    for i in lga_list:
        while past != today:
            # print(past)
            yelp = "&filters={\"notification_date\":\"" + str(past) + "\","
            yelp += "\"lga_code19:" + str(i[LGA_CODE]) + "\"}"
            ulocation = location + yelp
            # print(ulocation)
            obj = url.urlopen(ulocation, context = s_context)
            data = json.load(obj)
            if data['success']:
                # print(data['result']['total'])
                cases = cases + int(data["result"]["total"])
                
            # print(data)
            past = past + timedelta(days=1)
        print("Current Active Cases in " + i[LGA_NAME] + ": " + str(cases))

        
    


if __name__ == "__main__":
    print(casesActiveNSW())
    covidActivePerLGA()