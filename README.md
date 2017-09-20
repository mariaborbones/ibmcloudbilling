My Billing
================================================================================

After so many requests from customers for improving the `Bluemix usage dashboard` experience, I decided to create "My Billing App".

"My Billin App" is based on NodeJS technology and uses CF REST APIs to get Bluemix Information.
You can check a demo [here](https://mybilling.mybluemix.net)



Install the code for the sample program
--------------------------------------------------------------------------------

Click the magical button below to deploy the app.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy)


files in this repository
--------------------------------------------------------------------------------

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
