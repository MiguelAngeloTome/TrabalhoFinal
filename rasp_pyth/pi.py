import requests
import json
from velocidade_vento import vel_vento
from folha_molhada import isWet
from pluviosidade import pluv
from radiacao import rad
from vento_dir import vento_dir
from solo_humidity import solo_hum

url = 'http://localhost:5000/data'

a=1

solo = solo_hum()
vel = vel_vento()
wet = isWet()
pluv = pluv()
rad = rad()
Vdir = vento_dir()
 

dados = {'date': '2020-09-20 11:08:59','module_id':'b7a99d83-4168-4223-ab61-ac13bcc7245d' ,'temp': a, 'air_humidity': a, 'solo_humidity': solo, 'isWet': wet,'pluviosidade': pluv, 'vel_vento': vel, 'dir_vento': Vdir, 'radiacao': rad }

r = requests.post(url,json = dados)

print(r.text)