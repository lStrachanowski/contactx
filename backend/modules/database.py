from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import modules.credentials as credentials
from passlib.apps import custom_app_context as psw_context

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
            print("added succesfuly")
    
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
            print("deleted succesfuly")
        else:
            print("delete failed")






