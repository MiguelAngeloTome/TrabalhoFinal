import requests
import json
import sched, time
import datetime
import sys
import Adafruit_DHT as dht
import threading
from velocidade_vento import vel_vento
from folha_molhada import isWet
from pluviosidade import pluv
from radiacao import rad
from vento_dir import vento_dir
from solo_humidity import solo_hum


DHT_PIN = 4


solo = solo_hum()
vel = vel_vento()
wet = isWet()
pluv = pluv()
rad = rad()
Vdir = vento_dir()

module = 'f3716fc3-ca92-4bad-bec8-8853d1aee514'
url = 'http://193.137.5.79:1023/data'
s=sched.scheduler(time.time, time.sleep)
f= open("erros.txt","w+")
def ler_sensor(sc):
 x = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
 temp = temp()
 hum = hum()
 solo_temp = solo_temp()
 solo = solo_hum()
 vel = vel_vento()
 wet = isWet()
 pluv = pluv()
 rad = rad()
 Vdir = vento_dir()
 print ("temp",temp)
 print ("hum", hum)
 print (x)
 dados = {'date': x,
          'module_id': module ,
          'temp': temp, 
          'air_humidity': hum,
          'solo_temp' : solo_temp(), 
          'solo_humidity': solo, 
          'isWet': wet,
          'pluviosidade': pluv, 
          'vel_vento': vel, 
          'dir_vento': Vdir, 
          'radiacao': rad}
 try:
  r = requests.post(url,json = dados)
  print(r.text)
 except:
  f.write("Erro no modulo f3716fc3-ca92-4bad-bec8-8853d1aee514 "+ x + "\n" )
  print("error")
 s.enter(900,1,ler_sensor, (sc,))

s.enter(2,1,ler_sensor, (s,))
s.run()
