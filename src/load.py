# -*- coding: utf-8 -*-
"""
Created on Wed Sep  2 21:03:00 2020

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

student_ref.update({
    's3' : {
            'first_name' : 'A',
            'last_name' : 'M',
            'graduating' : 2020,
            'field_of_study' : 'Computer Science',
            'university' : 'University of Southern California',
            'university_email' : 'am@usc.edu',
            'current_city' : 'Los Angeles',
            'time_zone' : 'America/Los Angeles',
            'password' : 'xRnuES6TH'
        }
    }
)

data_ref=ref.child('student-course-pairs')

data_ref.update({
    '3' : {
        'sid' : 's2',
        'course' : 'Data Structures',
        'semester' : 'Fall',
        'year' : 2019,
        'mentor_willing' : True
    },
    '4' : {
        'sid' : 's2',
        'course' : 'Object-Oriented Programming',
        'semester' : 'Spring',
        'year' : 2020,
        'mentor_willing' : False
    },
    '5' : {
        'sid' : 's2',
        'course' : 'Computer Networks',
        'semester' : 'Summer',
        'year' : 2020,
        'mentor_willing' : True
    }
})

print(data_ref.get())