# Project Title: **To-Do List**. A To-do List application allowing users to manage a task list.

## Description: 
### Users can naviagate through the app using the navigation buttons underneath the app title. The Todos and Profile page require the user to be logged in to be accessed. 
### Via the Todos page, tasks can be added and marked/unmarked as complete. Clicking on a task allows users to update the tasks' text or remove the task from the list.
### Also via the Todos page, the todo list can be sorted alphabetically, by creation time, or completion status. 
### The About page contains a descritpion on how the app works.
### The Profile page informs users on their authentication status, and shows their todo statistics; the number of tasks complete, incomplete, and the completion ratio.

## Live Demo Link: 
### https://ctd-to-do-list-2026.vercel.app/

## Features List: 
- Sign In.
- Logout.
- Add tasks.
- Update tasks.
- Delete tasks.
- Mark tasks complete / unmark complete.
- Filter tasks via user input and task completion status.
- Sort to-dos by creation date, alphabetically, ascending, or descending.
- Page navigationn to About Page, Profile Page, and Todos Page. 
- Show user authentication status.
- Show user task completion percentage.

## Technologies Used: 
### Vite, React, React-DOM, React-Router, JavaScript, JSX, & CSS.

## Screenshots:
### Desktop Example
![Desktop Example](src/assets/DesktopExample.png)
### iPad Example
![ipad Example](src/assets/iPadMiniExample.png)
### iPhone Example
![iPhone Example](src/assets/iPhone16Example.png)

## Getting Started (Project Prerequisites): 
### Before running this project, install the following: 
- Install React version 19.2.1 using the following command in the terminal: `npm install react@19.2.7`
- Install React-DOM, version 19.2.7, using the following commnand in the terminal: `npm install react-dom@19.2.7`
- Install React-Router version 7.19.3 using the following command in the terminal: `npm install react-router@7.19.3`
### Alternatively (using Vite framework)
- Scaffold a Vite project using its React template, which automatically includes the react-dom version included in the template: `npx create-vite@latest --template react .` 
- Run `npm run install` in the terminal to install all dependencies listed in the package.json file provided by template.
- Install React-Router version 7.19.3 using the following command in the terminal: `npm install react-router@7.19.3`.

## Available Scripts:
### `npm run dev`: Starts the application in a local development environment.
### `npm run build`: Prepares the project for deployment by bundling and translating  files into standard HTML, CSS, and JavaScript.
### `npm run lint`: Searches all project files for errors, bugs, and other inconsistencies.
### `npm run preview`: Starts a local web server to test how the application will behave when deployed. 

##  Design Decisions: 
### I chose the CSS module approach for styling to avoid potential naming conflicts as I styled my many components.  
### As tasks cannot be longer than 50 characters, I chose to make the app content centered for desktop users to draw attention to the center of the screen. 
### For the background color I settled on "efcb89", a shade of beige, that is easy on the eyes as it will encompass the overall page. 
### I chose a complimentary shade of brown for my secondary color to be used to color the navigation buttons and to fr the border of tab-focused elements.
### For the font I looked for something non-standard but still easily readable. I chose 'Crimson-Text' for header text throguhout the app and 'Neuton' for dropdown menus. 
### Sans-serif is used as a backup fro browsers that lack either of the chosen fonts. 

## Future Improvements: 
### Some things I would improve about the app in the future: 
1. A Dark mode feature
2. A Sign up feature
3. Add a Retry button for when errors occur
4. Add a feature to the Profile page that tracks how often quickly users complete their tasks on time and displays that data
5. Add a feature that allows users to set a date/time that tasks should be completed by. In addition, notify users when that limit nears. 

## License Information: 
### This project is licensed under the MIT License - see the License.txt file for details.

## Contact Information: https://github.com/PharoahEgbuna