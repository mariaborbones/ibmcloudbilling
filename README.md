My Billing
================================================================================

After so many requests from customers for improving the `Bluemix usage dashboard` experience, I decided to create "My Billing App" based on these customers requirements:


* They wanted to be able to check usage and costs by spaces and not only by organizations
* They also wanted to be able to export all the information and share it with other teams of their companies
* And they wanted to be able to do a quick usage comparison among spaces

# Content
 1. [Features](https://github.ibm.com/maria-borbones/mybilling#1-features)
 2. [Tecnhologies](https://github.ibm.com/maria-borbones/mybilling#2-technologies)
 3. [Demo](https://github.ibm.com/maria-borbones/mybilling#3-demo)
 4. [Author](https://github.ibm.com/maria-borbones/mybilling#4-author)
 5. [Screenshots](https://github.ibm.com/maria-borbones/mybilling#5-screenshots)
 6. [Files and folders in this repository](https://github.ibm.com/maria-borbones/mybilling#6-files-and-folders-in-this-repository)


# 1. Features

My Billing shows detailed bluemix account usage information:

* Users can check monthly usage for each space within an organization
* It shows information about which services have been deployed in every space and their usage.
* Monthly usage comparison data is displayed in a single chart
* Data can be exported to a CSV or EXCEL file
* The app is accessible for IBM and NON IBM users.

# 2. Tecnhologies

Server-side is based on:

* [NodeJS](https://nodejs.org/es/)
* Uses [CF REST APIs](http://apidocs.cloudfoundry.org/258/) to get Bluemix Information

Client-side is based on:

* [AngularJS](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [ChartJS](http://www.chartjs.org/) for client-side.

"My Billing App" is deployed in [Bluemix](http://bluemix.net)

# 3. Demo

You can check a **DEMO** [here](https://mybilling.mybluemix.net)

# 4. Author
María Borbonés

t: [@mariaborbones](http://twitter.com/mariaborbones)

e: <maria.borbones@es.ibm.com>


# 5. Screenshots
### 5.1 Non IBMers Authentication Form


![alt text](https://media.github.ibm.com/user/42357/files/27ff8e7c-9e2d-11e7-88ad-1afba430794f)

### 5.2 IBMers Authentication Form (IBM ID SSO)


![alt text](https://media.github.ibm.com/user/42357/files/2732f09c-9e2d-11e7-8c86-f33913766aae)

### 5.3 Choose between your organizations

![alt text](https://media.github.ibm.com/user/42357/files/27aece6a-9e2d-11e7-8e9a-780687d214dc)


### 5.4 Choose a month to display the data


![alt text](https://media.github.ibm.com/user/42357/files/28f3b4c0-9e2d-11e7-89a1-ad1a364f77b8)


### 5.5 Billing information displayed - Usage Data Comparison Chart

![alt text](https://media.github.ibm.com/user/42357/files/28746ae4-9e2d-11e7-9260-7f043f63c868)


### 5.6 Billing information displayed - Usage Data Table


![alt text](https://media.github.ibm.com/user/42357/files/296f6eb2-9e2d-11e7-8f59-21e359c773f9)


# 6. Files and folders in this repository

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
