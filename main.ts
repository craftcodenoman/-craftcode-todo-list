#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todolist: string[] = [];
let condition = true;

console.log(
  chalk.bold.rgb(
    204,
    204,
    204
  )(`\n  \t \t<<<=============================>>> \n`)
);
console.log(
  chalk.whiteBright.bold(
    "<<<=========>>> Wellcome to craftcode-noman - TO-DO list  <<<========>>>\n"
  )
);
console.log(
  chalk.bold.rgb(
    204,
    204,
    204
  )(`\t  \t  <<<==============================>>>  \n`)
);

// Function to add new task to the list
let addTask = async () => {
  let newtask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.blue("Enter your new task :"),
    },
  ]);
  todolist.push(newtask.task);
  console.log(
    chalk.green(` ${newtask.task} task added Successfully in Todo-list`)
  );
};

// Function to view all TODO-LIST tasks
let viewTask = async () => {
  console.log(chalk.yellow(" \n Your Todo-list: \n"));
  todolist.forEach((task, index) => {
    console.log(chalk.yellow(`${index}: ${task} `));
  });
};

let main = async () => {
  while (condition) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Select an option you want to do",
        choices: [
          "Add Task",
          "Delete task",
          "Update task",
          "View Todo-list",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "View Todo-list") {
      await viewTask();
    } else if (option.choice === "Exit") {
      condition = false;
    }
  }
};

let deleteTask = async () => {
  await viewTask(); // Display the current todo list before prompting for the index
  let taskIndexResponse = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the index number of the task you want to delete:",
    },
  ]);
  let taskIndex = taskIndexResponse.index; // Extract the index value from the response object
  if (taskIndex >= 0 && taskIndex < todolist.length) {
    let deletedTask = todolist.splice(taskIndex, 1); // Delete the task at the specified index
    console.log(
      `\n Task '${deletedTask[0]}' has been deleted successfully from your TODO-LIST.\n`
    );
  } else {
    console.log(
      "\n Invalid index provided. Please enter a valid index from the list.\n"
    );
  }
};

main();
deleteTask();

// function to delete a task from the list
let deletedTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the 'index no.' of the task you want to delete :",
    },
  ]);
  let deletedTask = todolist.splice(taskIndex.index, 1);
  console.log(
    ` \n ${deletedTask} this task has been deleted Succesfully from your TODO-LIST \n`
  );
};
