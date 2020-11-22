from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker,relationship
from sqlalchemy.ext.declarative import declarative_base
import modules.credentials as credentials
from passlib.apps import custom_app_context as psw_context
import secrets
from datetime import datetime
import json 

engine = create_engine("postgresql://postgres:"+credentials.PASSWORD + "@localhost/" + credentials.DBNAME)
conn = engine.connect()
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()



class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    password = Column(String)
    email = Column(String)
    token = Column(String)
    timestamp = Column(String)
    children = relationship("Contact")

    # Is hashing user password before adding to database
    def hash_password(self,password):
        self.password = psw_context.encrypt(password)
        
    # Verifies user password if is correct with hash in database
    def verify_password(self,user_data):
        result = session.query(User).filter(User.email == self.email).first()
        return psw_context.verify( self.password, result.password)

Base.metadata.create_all(engine)

class Contact(Base):
    __tablename__ = 'contacts'
    contact_id = Column(Integer, primary_key=True)
    id = Column(Integer, ForeignKey('users.id'))
    name = Column(String)
    vorname = Column(String)
    company = Column(String)
    address = Column(String)
    email = Column(String)
    phone = Column(String)
    mobile = Column(String)
    fax = Column(String)
    other = Column(String)
    group = Column(String)
    edit = Column(String)
Base.metadata.create_all(engine)

class ContactsOperations(Contact):
        #Class initialization data
    def __init__(self, contact):
        self.contact_id = contact.contact_id
        self.id = contact.id
        self.name = contact.name
        self.vorname = contact.vorname
        self.address = contact.address
        self.email = contact.email
        self.phone = contact.phone
        self.mobile - contact.mobile
        self.fax = contact.fax
        self.other = contact.other
        self.group = contact.group
        self.edit = contact.edit

    def addContact(self, token):
        user_id = getUserIdFromToken(token)
        result = session.query(Contact).filter(Contact.contact_id == self.contact_id).first()
        if result:
            print("Contact name exist in database")
        else:
            newContact = Contact( id = user_id, name = self.name, vorname = self.vorname, company = self.company,  address = self.address,  email = self.email,  
                                    phone = self.phone, mobile = self.mobile,  fax = self.fax,  other = self.other,  group = self.group, edit = self.edit )
            session.add(newContact)
            session.commit()
            print("Contact succesfuly added ")


class Operations(User):

    #Class initialization data
    def __init__(self, user):
        self.name = user.name
        self.password = user.password
        self.email = user.email
        self.token = user.token
        self.timestamp = user.timestamp
    
    #Adds user to databse
    def addUser(self):
        result = session.query(User).filter(User.email == self.email).first()
        if result:
            print("Contact name exist in database")
        else:
            self.hash_password(self.password)
            newUser = User(name=self.name, password = self.password, email = self.email)
            session.add(newUser)
            session.commit()
            print("User succesfuly added ")
    
    #Is searching for user email in database
    def checkUser(self):
        result = session.query(User).filter(User.email == self.email).first()
        session.commit()
        if result:
            return True
        else:
            return False

    #Deletes user from database
    def deleteUser(self):
        result = session.query(User).filter(User.email == self.email).first()
        if result:
            session.delete(result)
            session.commit()
            print("User  succesfuly deleted")
        else:
            print("User delete failed")
    
    def updateUser(self, token, timestamp):
        try:
            result = session.query(User).filter(User.email == self.email).first()
            result.token = token
            result.timestamp = timestamp
            session.commit()
            print("User data updated succesfuly")
            return True
        except:
            print("User data update faild")
            return False


#Generates token with expiration date
def generateToken(length):
    token = secrets.token_urlsafe(length)
    expiration_time = datetime.now().timestamp() + 600
    return token , expiration_time

#Checks if token is valid 
def checkTokenInBase(token, time=False):
    result = session.query(User).filter(User.token == token).first()
    session.commit()
    if time:
        if float(result.timestamp) > (datetime.now().timestamp()):
            return True
        else:
            return False
    else:
        if result.token == token:
            return True
        else:
            print("Token verification failed")
            return False

#Returns user id based on token
def getUserIdFromToken(token):
        result = session.query(User).filter(User.token == token).first()
        session.commit()
        return result.id

#Returns contact form database based on user token. Contacts are already in json format.
def getUserContacts(token):
        result = session.query(Contact).filter(Contact.id == getUserIdFromToken(token))
        session.commit()
        values = []
        fields = ["vorname", "name" ,"contact_id" ,"user_id", "company", "address", "email" ,"phone" ,"mobile" ,"fax" ,"other", "group", "edit"]
        for v in result:
            values.append(dict(zip(fields,(v.vorname, v.name, v.contact_id, v.id, v.company, v.address, v.email, v.phone, v.mobile, v.fax, v.other, v.group, v.edit ))))
        return json.dumps(values)


def getUserGroups(token):
        result = session.query(Contact).filter(Contact.id == getUserIdFromToken(token))
        session.commit()
        group_names = []
        values = []
        values.append({"group_members": [], "group_name":"Default" , "group_edit":"false"})
        for v in result:
            if v.group not in group_names:
                group_names.append(v.group)
                values.append({"group_members": [v.contact_id], "group_name":v.group , "group_edit":"false"})
            else:
                for item in values:
                    if item["group_name"] == v.group:
                        item["group_members"].append(v.contact_id)
        return json.dumps(values)





