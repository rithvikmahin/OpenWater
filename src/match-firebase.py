# -*- coding: utf-8 -*-
"""
Created on Wed Sep  2 21:07:34 2020

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
snapshot=ref.get()

student_ref=ref.child('students')
data_ref=ref.child('student-course-pairs')
#mentee_ref=ref.child('mentees')
#mentor_ref=ref.child('mentors')
match_ref=ref.child('matches')

'''
snap_mentee=mentee_ref.get()
print(snap_mentee)

snap_student=student_ref.get()

for key, val in snap_mentee.items():
    
    sid_mentee=val['sid']
    course_mentee=val['course']
    uni_mentee=student_ref.get(sid_mentee)
    print(uni_mentee)
    for key2,val2 in snap_student.items():
        if key2==sid_mentee:
            uni_mentee=val2['university']
            
    snap_mentor=mentor_ref.order_by_child('course').get()
    print(snap_mentor)
    
    for val3 in snap_mentor:
        
        same_uni=False
        sid_mentor=val3['sid']
        course_mentor=val3['course']

        for key4,val4 in snap_student.items():
            if key4==sid_mentor:
                uni_mentor=val4['university']
                
        if course_mentee==course_mentor:
            if uni_mentor==uni_mentee:
                same_uni=True
            new_match=match_ref.push({
                'mentee':sid_mentee,
                'mentor':sid_mentor,
                'course':course_mentee,
                'same_uni':same_uni
            })
            '''
def findmatch(course):
    mentors=[]
    for row in data_ref.get():
        if row['course']==course:
            if not row['current']:
                if row['mentor_willing']:
                    mentors.append(row['sid'])
    return(mentors)
    
for entry in data_ref.get():
    if entry['current']:
        matchfound=False
        sid_mentee=entry['sid']
        print(sid_mentee)
        mentee_ref=student_ref.child(sid_mentee)
        print(mentee_ref.get())
        uni_mentee=mentee_ref.child('university')
        print(uni_mentee.get())
        mentors=findmatch(entry['course'])
        print(mentors)
        for mentor in mentors:
            same_uni=False
            print(mentor)
            mentor_ref=student_ref.child(mentor)
            print(mentor_ref.get())
            uni_mentor=mentor_ref.child('university')
            print(uni_mentor.get())
            if uni_mentee.get()==uni_mentor.get():
                same_uni=True
            new_match=match_ref.push({
                'mentee':entry['sid'],
                'mentor':mentor,
                'course':entry['course'],
                'same_uni':same_uni
            })
            matchfound=True
        if not matchfound:
            print('No mentor found')
            
