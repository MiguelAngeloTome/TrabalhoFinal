import requests
import json
import Adafruit_DHT as dht
import threading
import sched, time
import datetime
import sys
from velocidade_vento import vel_vento
from folha_molhada import isWet
from pluviosidade import pluv
from radiacao import rad
from vento_dir import vento_dir
from solo_humidity import solo_hum

url = 'http://193.137.5.79:1023/data'
DHT_PIN = 4


solo = solo_hum()
vel = vel_vento()
wet = isWet()
pluv = pluv()
rad = rad()
Vdir = vento_dir()
s=sched.scheduler(time.time, time.sleep)
f= open("erros.txt","w+")
def ler_sensor(sc):
 x = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
 h,t = dht.read_retry(dht.DHT22,4)
 temp = "%.1f" %t
 hum = "%.1f" %h
 print ("temp",temp)
 print ("hum", hum)
 print (x)
 dados = {'date': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),'module_id':'f3716fc3-ca92-4bad-bec8-8853d1aee514' ,'temp': temp, 'air_humidity': hum, 'solo_hu$
 try:
  r = requests.post(url,json = dados)
  print(r.text)
 except:
  f.write("Erro no modulo f3716fc3-ca92-4bad-bec8-8853d1aee514 "+ x + "\n" )
  print("error")
 s.enter(900,1,ler_sensor, (sc,))

s.enter(2,1,ler_sensor, (s,))
s.run()
