# 🗒️ Offer Manager
Manager for affiliation marketing offers.

<!-- ABOUT -->
## :page_with_curl:	About the project
Private project, requested by an e-commerce affiliate marketer, with their authorization to publish the source code.

The system is structured with a REST API in Node.js with a layered architecture of responsibility.
Using MySQL to store data created by the user.
A simple html/javascript frontend, which consumes the Bootstrap library and the Bootstrap Table table generator with a minimalist style.
All aiming at good usability, ensuring efficiency and simplicity for hosting on low-cost shared servers.

### :construction:	Built with
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en/JavaScript)
* [Bootstrap](https://getbootstrap.com)
* [Bootstrap Table](https://bootstrap-table.com/)
* [MySQL](https://www.mysql.com/)
* [Node.js](https://nodejs.org/)
#### Node libraries
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Express](https://www.npmjs.com/package/express)
* [Cors](https://www.npmjs.com/package/cors)
* [Node MySQL 2](https://www.npmjs.com/package/mysql2)

<!-- USAGE -->
## :desktop_computer:	Basic usage
These are basic usage information.
* The user opens url and is asked about a password. No user needed, it's a private single-user system for now.
* Password is saved in browser's local storage and will be used every time a request is sent by javascript code.
* A basic data list is sent from database.
* User can work with data populated to table, with many filters and ordering options.
* User can add new offer using a button that opens a popup window.
* User can edit offers already stored by clicking on them, editing and saving changes.
* Every time user edit and save an offer, its utilization time is changed and content text is copied to clipboard, to use with external publish software.
* Default sort order is by utilization date from older to most recent, because the point is priority to older offers.

<!-- NOTES FOR DEVELOPERS -->
## :keyboard:	Notes for developers
#### :man_technologist:	Node
The backend is served by Node version 16, structured in layers, currently serving only GET requests using Express library.
#### :man_technologist:	Bootstrap
The direct use is minimal, just because the page is mainly dinamically filled by Bootstrap Table with their own style options.
#### :iphone: Responsiveness
It's intended to be used exclusively as a datasheet with a desktop computer, but can be used with Android devices.
#### :earth_americas:	Language
User interface is all in Brazilian Portuguese. On the other hand, all code is in English.
#### 🔒:	Sensitive data
All sensitive data is stored in server only, mainly as environment variables, including API key for all requests.

<!-- FINAL CONSIDERATIONS -->
## Final considerations
This project was released to end-user in April/2022.
