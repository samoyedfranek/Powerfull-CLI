import inquirer from "inquirer";
import { spawn, exec } from "child_process";
import art from "ascii-art";
import chalk from "chalk";
import gradient from "gradient-string";
import wait from "wait";
import pressAnyKey from "press-any-key";
import ora from "ora";

const press = ora("Press any key to go back");
const check = ora("Checking");

async function home() {
    await console.clear();
    await art.font("DNS changer", "doom", (err, rendered) => {
        console.log(gradient.pastel.multiline(rendered));
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "theme",
                    message: "What do you want to do?",
                    choices: ["Check DNS", "Change DNS", "Exit"],
                },
            ])
            .then(async (answers) => {
                if (answers.theme === "Check DNS") {
                    checkdns();
                }
                if (answers.theme === "Change DNS") {
                    build();
                }
                if (answers.theme === "Exit") {
                    process.exit(0);
                }
            });
    });
}

async function back() {
    await wait(50);
    await pressAnyKey(press.start()).then(async () => {
        await press.stop();
        await home();
    });
}

async function build() {
    await console.log("In build");
    back();
}

async function checkdns() {
    await check.start();
    await wait(1500);
    await check.succeed("Done, your DNS: \n");
    await exec(
        `ipconfig /all | find "DNS Servers"`,
        async (error, stdout, stderr) => {
            await console.log(`${stdout}`.slice(39));
        }
    );
    back();
}

home();
