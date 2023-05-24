# Project Name

The Yum Yum Blog

## Project Summary

A collaborative recipe blog. A registered user can view recipes, create and modify their own recipes, and add comments to other user's recipes. A non-registered user can only view recipes. 

## Developers

1. Claire Alverson

2. Callistus Nguyen

3. Marissa Fonseca

## Installation Instructions

This application will be deployed to Heroku.

To use this application locally, you must:
1. Download this repositiory to your local machine.
2. In the terminal, launch mysql by typing:

        mysql -u root -p
3. Enter your local password.
4. Input the following:

        source db/schema.sql
5. Open a new terminal and seed the database by typing:

        npm run seed
6. To download the dependencies by typing: 

        npm i  
7. Create a copy of the .env.EXAMPLE file, rename it to .env, and add your mysql user and password.
8. To run the app, type:

        npm start
9. Open the specified port on your web application of choice.

## Animated Gifs/Pictures of App

- Place various screens of your app here after they have been built

## Tech Stack

npm packages
- bcrypt
- connect-session-sequelize
- dotenv
- express
- express-handlebars
- express-session
- handlebars
- mysql2
- sequelize


## APIs

- Spoonacular https://apilayer.com/marketplace/spoonacular-api

## MVP (Minimum Viable Product)

- Create recipes
- View recipes
- Reviews

## Stretch Goals

- Favoriting recipes
- Nutritional value
