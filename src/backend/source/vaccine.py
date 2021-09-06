from urllib import request
import pandas as pd
import json

VACCINE_URL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/country_data/Australia.csv'

# VaccineNSW gets the Our World In Data Australian csv file 
# and returns the csv file in readable code using pandas 
def VaccineNSW():
    obj = request.urlopen(VACCINE_URL)
    csv = pd.DataFrame(pd.read_csv(obj, sep = ",", header = 0, index_col = False))
    return csv


if __name__ == "__main__":
    # print(VaccineNSW())
    VaccineNSW()
