from urllib import request
import pandas as pd
import json
import ssl

VACCINE_URL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Australia.csv'

# VaccineNSW gets the Our World In Data Australian csv file 
# and returns the csv file in readable code using pandas 
def VaccineNSW():
    s_context = ssl.SSLContext()
    obj = request.urlopen(VACCINE_URL, context = s_context)
    csv = pd.DataFrame(pd.read_csv(obj, sep = ",", header = 0, index_col = False))
    # Loop through all dates of the vaccination data until 
    # Recordings of fully vaccinated and partially vaccinated people was recorded
    i = 0
    for date in csv["date"]:
        if(date == "2021-05-24"): 
            break
        csv = csv.drop(index=i)
        i+=1
    return csv

if __name__ == "__main__":
    # print(VaccineNSW())
    VaccineNSW()
