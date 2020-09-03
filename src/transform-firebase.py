# -*- coding: utf-8 -*-
"""
Created on Wed Sep  2 21:04:51 2020

@author: Abhilasha Mandal
"""

import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://clinque-419f2.firebaseio.com/'
})

from firebase_admin import db

ref=db.reference()
student_ref=ref.child('students')
data_ref=ref.child('student-course-pairs')

snapshot=data_ref.order_by_child('year').limit_to_last(1).get()
for key, val in snapshot.items():
    keymaxyear=key
    maxyear=val['year']
print(maxyear)

sems={'Spring':0,'Summer':1,'Fall':2}
currentsem='Spring'
snapshot=data_ref.order_by_child('year').start_at(maxyear).get()

for key, val in snapshot.items():
    semester=val['semester']
    if sems[semester] > sems[currentsem]:
        currentsem=semester
print(currentsem)

def ifcur(year,sem):
    if year==maxyear:
        if sem==currentsem:
            return True
    return False

snapshot=data_ref.order_by_child('year').end_at(maxyear).get()
for key, val in snapshot.items():
    key_ref=data_ref.child(key)
    if ifcur(val['year'],val['semester']):
        key_ref.update({
            'current':True
        })
    else:
        key_ref.update({
            'current':False
        })
    
mentee_ref=ref.child('mentees')
mentor_ref=ref.child('mentors')

for key,val in snapshot.items():
    if val['current']:
        mentee_ref.update({
            key:{
                'sid':val['sid'],
                'course':val['course']
            }
        })
    elif val['mentor_willing']:
        mentor_ref.update({
            key:{
                'sid':val['sid'],
                'course':val['course']
            }
        })
        print(mentor_ref.get(key))