from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import modules.credentials as credentials
from passlib.apps import custom_app_context as psw_context
import secrets
from datetime import datetime

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

    # Is hashing user password before adding to database
    def hash_password(self,password):
        self.password = psw_context.encrypt(password)
        
    # Verifies user password if is correct with hash in database
    def verify_password(self,user_data):
        result = session.query(User).filter(User.email == self.email).first()
        return psw_context.verify( self.password, result.password)

Base.metadata.create_all(engine)

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


def checkTokenInBase(token, time=False):
    result = session.query(User).filter(User.token == token).first()
    session.commit()
    if time:
        print(float(result.timestamp) - datetime.now().timestamp())
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






