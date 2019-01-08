# Turbotax for common medical forms

Tech demo for a react app with Node backend to pre-fill most common medical forms with sane defaults, as a service.

Demo at [http://paperworklabs.herokuapp.com](http://paperworklabs.herokuapp.com)

Screenshots:

![](/demo.png) | ![](/demo2.png)
:-----------------------------:|:-------------------------:
							   |




## Quick Start


    # Install Node dependencies
    npm install

    # Install React dependencies
    cd client && npm install

    # Start development server
    cd .. && npm run dev



## To deploy on Heroku Dev:

Set up a new app

Push to heroku git – the postbuild script (see package.json) will take care of the rest.


-------

## dev commands:

	heroku pg:psql

	CREATE TABLE forms (
	  formhash text PRIMARY KEY,
	  patientuid text NOT NULL,
	  formname text NOT NULL,
	  data jsonb
	);
