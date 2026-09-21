# Project Title: **To-Do List**. A To-do List application allowing users to list and manage tasks. 

## Live Demo Link: 
### https://ctd-to-do-list-2026.vercel.app/

## Features: 
1. Sign In.
2. Logout.
3. Add To-dos.
4. Update To-dos.
5. Delete To-dos.
6. Mark and Undo Complete.
8. Filter to-dos via user input or task completion status.
9. Sort to-dos by creation date, alphabetically, ascending, or descending.
11. Navigate to About Page.
12. Navigate to Profile Page.
13. Show user authentication status.
14. Show user task completion rate.

## Technologies Used: 
### Vite, React, React-DOM, React-Router, JavaScript, JSX, & CSS.

## Screenshots:
### Desktop Example
![Desktop Example](src/assets/DesktopExample.png)
### iPad Example
![ipad Example](src/assets/iPadMiniExample.png)
### iPhone Example
![iPhone Example](src/assets/iPhone16Example.png)

## Getting Started: 
### The editor used for this project was Visual Studio Code. 
### Begin by scaffolding a Vite project with a React template by running the following command in the terminal: `npx create-vite@latest --template react .`
### Install dependencies by running the command  `npm install`.
### Next, use the command  `npm install react-router` to install version 7 of React Router. 
### Lastly, run the development server by entering the following command in the terminal: `npm run dev`. Hold control while clicking the localhost link provided in the terminal to interact with the application. 

## Available Scripts:
### `npm run dev`: Starts the application in a local development environment.
### `npm run build`: Prepares the project for deployment by bundling and translating  files into standard HTML, CSS, and JavaScript.
### `npm run lint`: Searches all project files for errors, bugs, and other inconsistencies.
### `npm run preview`: Starts a local web server to test how the application will behave when deployed. 

##  Design Decisions: 
### I chose the CSS module approach for styling to avoid potential naming conflicts as I styled my many components.  
### As the current state of my app doesn't permit tasks to be longer than 50 characters, I chose to center my content on the screen for desktop users for better visual appeal.
### I chose a background color that would be easy on the eyes seeing as it would be the most prominent color on the screen. I settled on "efcb89", a shade of beige. 
### I chose a complimentary shade of brown for my secondary color to be used to color the navigation buttons and to fr the border of tab-focused elements.
### For the font I looked for something non-standard but still easily readable. I chose 'Crimson-Text' for header text throguhout the app and 'Neuton' for dropdown menus. 
### Sans-serif is used as a backup fro browsers that lack either of the chosen fonts. 

## Future Improvement: 
### Some things I would improve about the app in the future include: 
1. A Dark mode feature
2. A Sign up feature
3. Add a Retry button for when errors occur
4. Add a feature to the Profile page that tracks how often quickly users complete their tasks on time and displays that data
5. Add a feature that allows users to set a date/time that tasks should be completed by. In addition, notify users when that limit nears. 

## License: 
### This project is licensed under the MIT License - see the License.txt file for details.

## Contact Information: https://github.com/PharoahEgbuna