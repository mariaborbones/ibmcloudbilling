My Billing
================================================================================

After so many requests from customers for improving the `Bluemix usage dashboard` experience, I decided to create "My Billing App".

My Billing shows detailed bluemix account usage information:

* Users can check monthly usage for each space within an organization
* It shows information about which services have been deployed in every space and their usage.
* Monthly usage comparison data is displayed in a single chart
* Data can be exported to a CSV or EXCEL file
* The app is accessible for IBM and NON IBM users.

"My Billing App" is based on NodeJS technology and uses CF REST APIs to get Bluemix Information.

You can check a **DEMO** [here](https://mybilling.mybluemix.net)

**Author:** María Borbonés

![alt text](https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/062012/twitter-bird-light-bgs.png?itok=n5tiDiLM) 

Non IBMers Authentication Form
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/27ff8e7c-9e2d-11e7-88ad-1afba430794f)

IBMers Authentication Form (IBM ID SSO)
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/2732f09c-9e2d-11e7-8c86-f33913766aae)

Choose between your organizations
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/27aece6a-9e2d-11e7-8e9a-780687d214dc)


Choose a month to display the data
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/28f3b4c0-9e2d-11e7-89a1-ad1a364f77b8)


Billing information displayed - Usage Data Comparison Chart
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/28746ae4-9e2d-11e7-9260-7f043f63c868)


Billing information displayed - Usage Data Table
--------------------------------------------------------------------------------

![alt text](https://media.github.ibm.com/user/42357/files/296f6eb2-9e2d-11e7-8f59-21e359c773f9)


Files and folders in this repository
--------------------------------------------------------------------------------

`public folder`

Contains the web application that has been developed using **AngularJS** and **Bootstrap**.

---

`server.js`

The server written with node.js. It exposes REST services to consume `Bluemix Usage Data`.

---

`.gitignore`

List of file patterns that should **NOT** be stored in git.  If you aren't using
git, you don't need this file.  And the contents are personal preference.

---

`LICENSE`

The open source license for this sample; in this case, it's licensed under
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

---

`manifest.yml`

This file contains information that's used when you `cf push` the application.

---

`package.json`

Standard package.json file for node packages.  You will need this file for two
reasons:

* identify your node package dependencies during `npm install`
* identify to Bluemix that this directory contains a node.js application

---

`Procfile`

Used to indicate the command to start the server.

In this case, the file has a single line:

    web: node server

This indicates that the command `node server` should be run when the app is
started.

---

`README.md`

This file!
