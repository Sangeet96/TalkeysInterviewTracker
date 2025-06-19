# TalkeysInterviewTracker

It is a basic CRUD application built using MERN, we have four major operations : 
1. Create Candidate
2. Update Candidate Info
3. Delete Candidate
4. Read/Fetch Candidate Info

This Project contains some of the components of the UI like buttons, icons, background from my previous projects, I used them to improve the UI considering the Time Constraint.
The Backend of this project is been coded from Scratch.

I have uploaded to Folders:
1. Client : Frontend of the project built using ReactJs and tailwindCSS.
2. Server : Backend of the project for performing the CRUD operations.

The .env for Client contains : VITE_API_URL=http://localhost:3000 
The .env for Server contains : MONGO_URI=mongodb://localhost:27017/

Procedure to Run : 
1. Download the complete folders Client and Server
2. Open the client Folder with VsCode and in the terminal run :
   'npm i'
   'npm run dev'
3. Open the Server Folder in another VsCode window and again in the terminal run :
   'npm i'
   'npm i nodemon'
   'nodemon server.js'
4. I have not used mongoose here to define the schema of the database here, so we need to do it manually :
   Just open the MongoDBCompass and connect a localhost
   Next create a new database named TalkeysInterviewTracker with a collection name candidates

Thanks!!
