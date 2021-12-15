from time import sleep
from json import dumps
from kafka import KafkaProducer
import random

def getProcessData():
    data = {}
    data['COAGULANT_TANK_SIDE_B'] = random.uniform(31.0260725,300.82855797)
    data['LATEX_TANK_1_SIDE_A'] = random.uniform(23.15741158,36.60877991)
    data['PRE_LEACH_TANK_07'] = random.uniform(29.77372074,65.86917114)
    data['PRE_LEACH_TANK_09'] = random.uniform(29.5914507,63.30137634)
    data['PRE_LEACH_OVEN'] = random.uniform(29.13932324,86.51698304)
    data['WET_OVEN_1'] = random.uniform(31.15319348,111.2534752)
    data['Meter_1'] = random.randint(0,100)
    data['Meter_2'] = random.randint(0,100)
    data['Meter_3'] = random.randint(0,100)
    data['Meter_4'] = random.randint(0,100)
    return data

producer = KafkaProducer(
   bootstrap_servers=['cell-1.streaming.us-ashburn-1.oci.oraclecloud.com:9092'],
   value_serializer=lambda x: dumps(x).encode('utf-8'),
   security_protocol="SASL_SSL",
   sasl_mechanism="PLAIN", 
   sasl_plain_username="ebiwocidev/bhaswati@ebiw.com/ocid1.streampool.oc1.iad.amaaaaaafcron3aai4sgpesswehlslv3724v677q777u4bq5kkukxnqg7yya", 
   sasl_plain_password="h5oGJ1DIn3[hN#zl2wsW")  
   
while True:
    event_str = getProcessData()
    producer.send('ebiw123', value=event_str)
    print("message sent: ", event_str)
    sleep(3)