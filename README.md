# PRITECH React Native Task App

A simple React Native mobile app built for the PRITECH React Native technical task.
The app allows users to manage a small list of personal tasks with local storage, navigation, search, filtering, and public API data fetching.

## Features

* View a list of tasks
* Add a new task
* Mark a task as completed or pending
* Delete a task
* View task details
* Basic input validation
* Empty state handling
* Clean and simple UI
* Fetch and display a quote from a public API

## Bonus Features Implemented

* Search tasks by title
* Filter tasks by status:
  * All
  * Completed
  * Pending

* Store tasks locally on the device using AsyncStorage
* Navigation between screens

## Task Fields

Each task contains:

* Title
* Description
* Status
* Created date

## Tech Stack

* React Native
* Expo
* TypeScript
* React Navigation
* AsyncStorage
* ZenQuotes API

## Public API Used

The app fetches a random motivational quote from:

```txt
https://zenquotes.io/api/random
```

The quote is displayed on the task list screen. If the request fails, the app shows a fallback message.

## Project Structure

```txt
src/
  components/
    EmptyState.tsx
    TaskItem.tsx
  screens/
    AddTaskScreen.tsx
    TaskDetailsScreen.tsx
    TaskListScreen.tsx
  storage/
    taskStorage.ts
  types/
    navigation.ts
    Quote.ts
    task.ts
```

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/diarxharavina/pritech-task-app.git
```

2. Navigate into the project folder:

```bash
cd pritech-task-app
```

3. Install dependencies:

```bash
npm install
```

4. Start the Expo development server:

```bash
npx expo start
```

5. Open the app using one of the following:

* Expo Go on a physical device
* Android Emulator
* iOS Simulator

## Available Scripts

Start the app:

```bash
npm start
```

Start with Expo directly:

```bash
npx expo start
```

## Screenshots

Added screenshots inside the `screenshots` folder:

```txt
screenshots/
  task_list.png
  add_task.png
  task_details.png
  empty_state.png
```

## Implementation Summary

The app uses functional components and React hooks to manage state and screen behavior. Tasks are stored in the main app state and persisted locally using AsyncStorage, so they remain available after closing and reopening the app.

React Navigation is used to move between the task list, add task, and task details screens. The task list supports searching by title and filtering by completion status. A public API request is used to display a motivational quote on the main screen.

The UI is kept simple and consistent, using reusable components such as `TaskItem` and `EmptyState`.
