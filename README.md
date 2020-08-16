# Custom flights browser

## Exercise project that is a mock up of flight browser.

It uses vanilla JS and SCSS for styling. The app dosent use any css framework.
Logic of app is created around MVC model.

To use this website you have to be logged in. Just click Log in button and provide:
login: user,
pasword: user

### Available Scripts

In the project directory, you can run:

#### npm run dev

Runs the app in the development mode.
Open http://localhost:9000 to view it in the browser.

The page will reload if you make edits.

#### npm run build

Builds the app for production to the docs folder using Babel.
The build is minified and the filenames include the hashes.

#### npm run build:dev

Builds app in development mode for better readability.

### Structure of components

Each component contains three files: html as template, scss for styling, and js to provide logic and features.
In js files usually are four classes component class, component model class, component view class and component controller class.
Model containst all the data that component needs to work properly, view has acces to component template and controller is responsible
for communicating model with view.

Component class accepts one argument: root element in which template of commponent will be rendered.
In constructor of the component its controller gets defined. It is a class which accepts model and view as argument for its
constructor.
