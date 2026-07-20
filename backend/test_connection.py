from database.mongodb import db

print("Database Name:", db.name)

collections = db.list_collection_names()

print("Collections:", collections)