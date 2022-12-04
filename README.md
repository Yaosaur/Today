# Today

Today is a project management app meant to be used with the [Today API](https://github.com/Yaosaur/Today-API) to help users collaborate on projects. These projects can be broken into smaller tasks which can be updated. Within the tasks, users are able to post, edit, and delete their own comments and comments from other users. Users also have the option to upload a profile picture of themselves as well as chat with project members.

## Demo

Demo of creating a project

![Demo of creating a project](/src/images/today-project-demo.gif)

The live site is currently hosted [here](https://today-pm.onrender.com)

Click [here](https://www.youtube.com/watch?v=fFF42Xk4qY0) to see a video of all the features of this project.

## Features

Users will be able to:

- Register
- Login and stayed logged in upon page closure (for up to 8 hours)
- Logout
- Update or add a profile image
- View all projects they either created or are participating in (with the option of filter and sorting them)
- Create new projects and add members to the project
- Edit, delete, and update existing projects (This feature is only available to the creator of the project)
- Add new tasks for a project
- View all tasks they either issued or are assigned to (with the option of filter and sorting them)
- View a dashboard with pie chart summaries of their task by priority, status, and type
- Edit, delete, and update existing tasks (Edit and update are features only available to members involved with the task and not every project member while delete is only available to the task issuer)
- Comment on a task
- Edit and delete comments
- Send messages to team members in real time and view previous messages

Additional features for the future:

- Allow images to be attached to comments and a section for all images associated with a task
- Adding dark mode
- Touch up on styling

## Technologies Used

- React/Redux(Toolkit)
- Material UI/(Day/Date-Io for date picker)

The following NPM packages:

- Formik and Yup
- Devextreme(react)

## Interacting with the App Locally

For you to interact with the program on your local computer,

Please first follow the instructions from [Today API](https://github.com/Yaosaur/Today-API) on local installation before continuing.

Then clone this repository to your IDE using

```
git clone https://github.com/Yaosaur/Today.git
```

After cloning, install the required NPM packages using

```
npm install
```

Finally, create a .env file with the following environmental variables: `REACT_APP_BACKEND_URL`

## Contributing

Currently not accepting any contributors for this project as the it is still a work in progress, but if you find any bugs you can report it [here](https://github.com/Yaosaur/Today/issues)

## Credits

Background image from [here](https://www.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_8562848.htm#query=cloud%20background&position=3&from_view=keyword)
