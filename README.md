# Olympia
We built an all-in-one solution that allows gyms to manage their branches, services, equipment, and clients! We decided to call our project Olympia.
## The Front-End:
### To get started
- Download and install [node.js](https://nodejs.org/en/) (We're using v16.14.0).
### To Run
- cd into the `/web` directory
- run `npm install`
- make a file called `.env.local` in `/web` and add this line to it `NEXT_PUBLIC_BASE_URL="http://localhost:5000"` !important
- run `npm run dev`
- goto [http://localhost:3000/](http://localhost:3000/)
## The Back-End (API):
### To get started
- Download and install [python] (https://www.python.org/downloads/)
- Install Neccessary External Libraries using pip:
	- Flask
	- flask-cors
	- app
	- flask-mysql
	- PyMySQL
	- pyjwt
	- bcrypt
- Ensure the host and password in the matches your MySQL server in the config.py file.
### To run
- Simply run main.py from //BackEnd/API/
	- Note: The API runs on localhost port 5000 by default
## The Database:
### To get started
- Download and Install MySQL and MySQL-workbench (https://dev.mysql.com/downloads/)
	- You need MySQL(Server,Shell,Router,Workbench) and Connector/Python
- Preform the neccessary steps to launch a local MySQL server on your machine
- Import our Database from the //Backend/Dumps dirrectory [LATEST_DUMP_11_04_2022.sql]
	- You can do this by clicking Server -> Data Import -> from Self-Contained file
### To run
- Simply ensure that the server is running on a local port (dependant on OS).
	- Windows uses a service model, so ensure the service is running.


