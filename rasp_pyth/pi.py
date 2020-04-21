import requests
import json

url = 'http://localhost:3000/data'

dados = {'date': '100', 'temp': '10', 'air_humidity': '20', 'solo_humidity': '15', 'isWet': 'true','pluviosidade': '15', 'vel_vento': '12', 'dir_vento': 'w', 'radiacao': '23' }

r = requests.post(url,json = dados)

print(r.text)