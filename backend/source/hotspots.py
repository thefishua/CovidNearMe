from urllib import request
import json
import ssl

HOTSPOTS_URL = 'https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210831-1307.json'

def JSONHotspotsNSW():
    s_context = ssl.SSLContext()
    obj = request.urlopen(HOTSPOTS_URL, context = s_context)
    data = json.load(obj)
    return data


if __name__ == "__main__":
    JSONHotspotsNSW()
