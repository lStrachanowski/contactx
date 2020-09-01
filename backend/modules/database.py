from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import modules.credentials as credentials

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
    

Base.metadata.create_all(engine)

class Operations(User):

    #Class initialization data
    def __init__(self, user):
        self.name = user.name
        self.password = user.password
        self.email = user.email
    
    #Adds user to databse
    def addUser(self):
        result = session.query(User).filter(User.name == self.name).first()
        if result:
            print("Contact name exist in database")
        else:
            newUser = User(name=self.name, password = self.password, email = self.email)
            session.add(newUser)
            session.commit()
            print("added succesfuly")
    
    #Is searching for user in database
    def getUserData(self):
        result = session.query(User).filter(User.name == self.name).first()
        session.commit()
        if result:
            print(result.id)
        else:
            print("No such user")

    #Deletes user from database
    def deleteUser(self):
        result = session.query(User).filter(User.name == self.name).first()
        if result:
            session.delete(result)
            session.commit()
            print("deleted succesfuly")
        else:
            print("delete failed")





