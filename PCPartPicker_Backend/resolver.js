import * as cfg from "./config.js";
import * as dbRtns from "./dbRoutines.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export const resolvers = {
  signup: async (args) => {
    try {
      const db = await dbRtns.getDBInstance();
      /*Validation*/
      // var message = "";
      // if (args.firstname == "" || args.firstname == undefined) {
      //   message += "First name field is required.";
      // }
      // if (args.lastname == "" || args.lastname == undefined) {
      //   message += "\nLast name field is required.";
      // }
      // if (args.email == "" || args.email == undefined) {
      //   message += "\nEmail field is required.";
      // }
      // if (args.age == "" || args.age == undefined) {
      //   message += "\nDate field is required.";
      // }
      // if (args.gender == "" || args.gender == undefined) {
      //   message += "\n Gender field is required.";
      // }
      // if (args.membership == "" || args.membership == undefined) {
      //   message += "\n Membership field is required.";
      // }
      // if (args.number == "" || args.number == undefined) {
      //   message += "\n Whatsapp numbet is  required.";
      // }
      // if (args.password == "" || args.password == undefined) {
      //   message += "\nPassword field is required.";
      // } else if (
      //   args.firstname != "" &&
      //   args.lastname != "" &&
      //   args.email != "" &&
      //   args.password != "" &&
      //   args.gender != "" &&
      //   args.membership != "" &&
      //   args.number != "" &&
      //   args.age != ""
      // ) {
      //   if (!args.email.includes("@")) {
      //     message += "\nInvalid email format. Please include '@' symbol.";
      //   }

      //   if (args.password.length < 8) {
      //     message += "\n Password must be at least 8 characters long.";
      //   }
      // }

      // if (message !== "") {
      //   return {
      //     errorMessage: message,
      //   };
      // }
      // // See if a user with that email Id already exists
      // let existingUser = await dbRtns.findOne(db, `AUTH`, {
      //   email: args.email,
      // });

      // if (existingUser ?? false) {
      //   return {
      //     errorMessage: `A user with email ${args.email} already exists`,
      //   };
      // }
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const authData = {
        username: args.username,
        email: args.email,
        password: hashedPassword, // Store hashed password
      };

      let authResult = await dbRtns.addOne(db, "AUTH", authData);

      // Now, let's create a userprofile for the user
      //returns bunch of null values for now since we are not using various fields keeping it as as for now.
      const userProfileData = {
        username: args.username,
        firstname: args.firstname,
        lastname: args.lastname,
        age: args.age,
        email: args.email,
        gender: args.gender,
        number: args.number,
        membership: args.membership,
        userId: authResult.insertedId,
      };

      let userProfileResult = await dbRtns.addOne(
        db,
        "userprofile",
        userProfileData
      );

      return { user: authData };
    } catch (error) {
      // Handle any errors that occur
      console.error("Error occurred in fetching results:", error);
      return {
        errorMessage: `An error occurred when trying to signup.`,
      };
    }
  },
  login: async (args) => {
    try {
      /*Validation*/
      var message = "";
      if (args.email == "" || args.email == undefined) {
        message += "Email field is required.";
      }
      if (args.password == "" || args.password == undefined) {
        message += "\nPassword field is required.";
      }

      const db = await dbRtns.getDBInstance();
      const user = await dbRtns.findOne(db, "AUTH", { email: args.email });
      if (!user) {
        return {
          errorMessage: `User with email '${args.email}' wasn't found.`,
        };
      }
      // Compare the password provided in the arguments with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(args.password, user.password);
      if (!passwordMatch) {
        return {
          errorMessage: `Incorrect Password.`,
        };
      }

      // If password matches, generate JWT token
      const token = jwt.sign({ userId: user._id }, cfg.jwtSecret);

      // Return token and user information
      return {
        token,
        user: {
          id: user._id,
          firstname: user.firstname,
          email: user.email,
        },
        errorMessage: message,
      };
    } catch {
      console.log("Here is your error");
    }
  },
  getCpus: async () => {
    try {
      const cpuFilePath = path.resolve( "json/json/cpu.json");
      const cpuData = fs.readFileSync(cpuFilePath, "utf-8");

      // Parse the file content to JSON
      const cpus = JSON.parse(cpuData);

      // Return the parsed JSON data
      return cpus;
    } catch (error) {
      console.error("Error occurred in fetching results:", error);
      return {
        errorMessage: `An error occurred when trying to fetch CPUs.`,
      };
    }
  },
};
