from urllib import request
import ssl
import json

COVID_CLINIC_URL = "https://data.nsw.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%2285da884f-a9f5-4cb3-95e8-d6b81b0d2e3a%22"

def CovidTestingClinic():
    s_context = ssl.SSLContext()
    obj = request.urlopen(COVID_CLINIC_URL, context = s_context)
    data = json.load(obj)
    return data

if __name__ == "__main__":
    print(CovidTestingClinic())