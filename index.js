import qr from "qr-image";
import inquirer from "inquirer";
import { createWriteStream, write, writeFile } from "node:fs";
import generateName from "sillyname";

inquirer
  .prompt([{ message: "Type in your URL:", name: "URL" }])

  .then((answer) => {
    const URL = answer.URL;
    const qr_png = qr.image(URL);
    const generateFn = generateName();
    const fileName = generateFn.replace(/\s/g, "");

    qr_png.pipe(createWriteStream(`${fileName}.png`));

    writeFile(
      `${fileName}.txt`,
      `The QR of ${URL} has been generated.`,
      "utf8",
      (err) => {
        if (err) throw err;
        console.log(err);
      }
    );
  })
  .catch((err) => {
    if (err.isTtyError) throw err;
    console.log("End");
  });
