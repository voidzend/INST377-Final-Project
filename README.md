# INST377-Final-Project

Written By Duran Keefe and Nde Mbah


Title of your project: Climate Closet
# Climate Closet: Weather-Based Outfit Recommender

Description of your project: 
Climate Closet solves a simple everyday problem: this probelm is standing in front of your closet
and not knowing what to wear due to the fact that you're unsure or uncertain about what the weather may hold for the day. A lot of indivduals check the weather,
but will still will not know or have uncertaintaty about how that should translate over to an actual outfit. Instead of guessing or flipping a coin or even overdressing, this app
makes sure to check and scan for the current weather for your location and turns that information into a clear clothing suggestion that makes sense for the temperature outside.

Our app displays and showcases a quick weather snapshot that includes the current temperature, humidity, and even wind speed so that way
users can see exactly what's going on outside. Based on the temperature data, the Climate Closet recommends what type of clothing to wear, such as a light shirt, long sleeves,
or a jacket. It also includes simple charts that help users see how the weather changes over time. Overall, the ultimate endgame for this application is to make getting dressed easier,
faster/more convient, and less stressful by using real, up to date weather data instead of guesswork.


Target browsers:
Tested and support IOS 18.6.2, Android Version 16, and  Windows.

[Vercel Live Demo Link](https://inst-377-final-project-psi.vercel.app/)
[Vercel Deployment Link](https://vercel.com/duran-keefes-projects/inst-377-final-project/J6k39eRoJLvvu6UoJQfmekSPfvpS)


Link to Developer Manual

# Developer Manual: docs.google.com/document/d/1sKUK37qm-d26ypvaubSLJ3e10gmbVXwpSomVtF27Arc

Climate Closet - Developer Manual
Project: Climate Closet

Authors: Duran Keffe & Nde Mbah

Audience: Aspiring future developers/extending this system

This document will overview how the Climate Closet program is built, run, and maintained. It will also go over how the APIs work and what future developers should know before continuing development.



Project Overview
The Climate Closet web application is a site that helps and assists its users to decide on what outfit to wear based on real time weather conditions. It combines a public weather API with a simple rules engine and a Supabase database to generate and save outfit recommendations.

The system is broken down into:
The Frontend (HTML, CSS, JavaScript)
The Backend/API routes (Vercel serverless functions)
The Database (Supabase/PostgreSQL)





System Infrastructure (High Level)
The Frontend:
index.html - Home Page
planner.html - Main weather + outfit logic
saved.html - Displays and shows saved outfits
about.html - Project explanation
The Backend:
/api/outfits - Fetch outfit rules from database
/api/saved-outfits - Save outfits to database
Externals and Outside Services:
Open-Meteo API (weather data)
Supabase (PostgreSQL database)
Vercel (hosting + serverless APIs)




Installation Setup (Local Development)
Prerequisites: Please make sure the following is installed
Node.js(v18+)
Npm
A supabase account
Vercel account

Step 1: Clone Repository:
bash
[git clone <repository-url>
cd climate-closet]

Step 2: Install Dependencies:
bash
[np install]
(this will install @supabase/supabase-js) - database client

Step 3: Environment Variables:
Create .env file
Ini
[SUPABASE_URL = your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key


Running The Application
Local Development: Due to the fact that this project uses Vercel serverless functions, the easiest and most efficient way to run this locally is with Vercel CLI:
Bash
[npm install -g vercel
vercel dev]
^^^That will:
Serve the HTML files
Enable /api/* routes locally
Make sure to match the production

Production Deployment: Since the app is deployed once it's connected to a Git repository, deployments happen automatically on push.



API Documentation
GET /api/outfits

Purpose: fetch outfit recommendations based on temperature and context.

Query Parameters:
temp (number, required) - temperature in fahrenheit
context (string, optional) - casual, school, work, date, gym
Defaults to casual
Example Request:
Bash
[/api/outfits?temp=65&context=casual]

What happens:
Look in the outfit_rules table
Finds rows where:
Min_temp <= temp <= max_temp
Context matches
Returns matching outfit rules as JSON

Post /api/saved-outfits
Purpose: save an outfit recommendation for the database.

Request Body (JSON):
Json
{
“Place”: “38.99, -76.94”,
“Temp_f”: 65,
“Context”: “casual”,
“Advice”: “long sleeve or light sweater”,
“Observed_at”: “2025-12-10T18:30:00Z”
}       

What happens: Inserts a new row into the saved_outfits table and returns success or error response.


Database Tables
outfit_rules: Used for rule-based outfit suggestions

Typical fields:
Min_temp
Max_temp
Context
Description

saved_outfits: Stores outfits that are saved by users.

Typical Fields:
place
temp_f
context
advice
Observed_at



Testing
The tests are done manually in this version so due to that there are no automated test.

Manual Testing includes:
Browser testing
Insomnia for API endpoints
Console logging for debugging
Future Developers should add:
API tests
Input validation tests
Frontend unit tests









Bugs & Limitations
Big web pages and applications can end up having numerous amounts of bugs and errors that cut off the performance of the page.
Our bugs include:
No user authentication
Weather “current hour” assumes index
Saved outfit page uses a public Supabase anon key
Deleting saved outfits requires going into the supabase saved_outfits table and manually deleting rows.
No edit feature for the saved outfits
No error UI beyond alerts





Future Improvements
Planned improvements that can be worked on for the betterment of this web page can include:
User accounts and authentication
Per-user saved outfits
More advanced outfit logic, such as precipitation rules for rain jackets and umbrellas
Automated testing


Final Notes
This project makes sure to do its best to intentionally keep its logic simple and readable. The main endgame and big goal of all of this is clarity over complexity. New developers should feel comfortable extending the rules engine, improving UI/UX, or adding authentication without needing to refactor an entire system.
