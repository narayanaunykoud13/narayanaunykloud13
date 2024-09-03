/* eslint-disable no-bitwise */
import fs from "fs";
import dataFile from "../Themes/ConfigurationData.json";

export const saveFile = async (data) => {
  return new Promise((resolve, reject) => {
    const myFile = JSON.parse(fs.readFile(dataFile).toString());
    fs.writeFile(dataFile, JSON.stringify(myFile, null, 2));
    const jsonContent = JSON.stringify(data);
    fs.writeFile(
      "../Themes/ConfigurationData.json",
      jsonContent,
      "utf8",
      function (error) {
        if (error) {
          console.log("error");
          reject(false);
        }
        resolve(true);
        console.log("updated");
      }
    );
  });
};

export const getFieldTypeNumber = (type) => {
  if (type === "List/Recod") {
  } else if (
    type === "Currency" ||
    type === "Decimal Number" ||
    type === "Time of Day"
  ) {
  } else if (type === "Date") {
  } else if (type === "Box") {
  } else if (
    type === "Email Address" ||
    type === "Phone Number" ||
    type === "Free-Form Text" ||
    type === "Long Text" ||
    type === "Password Percent" ||
    type === "Text Area" ||
    type === "Rich Text"
  ) {
  } else if (type === "Multi Select") {
  }
};

export const hexToRgb = (hex) => {
  // Remove the '#' if it exists
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};