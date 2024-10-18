import * as cfg from "./config.js";
import * as dbRtns from "./dbRoutines.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { readDataFromJson } from "./utilities.js";
import { ObjectId } from "mongodb";
import { authorizeAndGetUserId } from "./utilities.js";
import { userInfo } from "os";
import { error } from "console";

export const resolvers = {
  signup: async (args) => {
    try {
      const db = await dbRtns.getDBInstance();
      /*Validation*/
      var message = "";
      if (args.email == "" || args.email == undefined) {
        message += "\nEmail field is required.";
      }
      if (args.password == "" || args.password == undefined) {
        message += "\nPassword field is required.";
      }
      if (!args.email.includes("@")) {
        message += "\nInvalid email format. Please include '@' symbol.";
      }

      if (args.password.length < 8) {
        message += "\n Password must be at least 8 characters long.";
      }

      if (message !== "") {
        return {
          errorMessage: message,
        };
      }
      // // See if a user with that email Id already exists
      let existingUser = await dbRtns.findOne(db, `AUTH`, {
        email: args.email,
      });

      if (existingUser ?? false) {
        return {
          errorMessage: `A user with email ${args.email} already exists`,
        };
      }
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
          // firstname: user.firstname,
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
      return await readDataFromJson("cpu");
    } catch (error) {
      console.error("Error occurred in fetching results:", error);
    }
  },
  getCaseAccessories: async () => {
    try {
      return await readDataFromJson("case-accessory");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getCases: async () => {
    try {
      return await readDataFromJson("case");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getOS: async () => {
    try {
      return await readDataFromJson("os");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getMemory: async () => {
    try {
      return await readDataFromJson("memory");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getMonitor: async () => {
    try {
      return await readDataFromJson("monitor");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getPowerSupply: async () => {
    try {
      return await readDataFromJson("power-supply");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getInternalHardDrive: async () => {
    try {
      return await readDataFromJson("internal-hard-drive");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getThermalPaste: async () => {
    try {
      return await readDataFromJson("thermal-paste");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getWirelessNetworkCard: async () => {
    try {
      return await readDataFromJson("wireless-network-card");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  getMotherboard: async () => {
    try {
      return await readDataFromJson("motherboard");
    } catch (error) {
      console.log("Error occurred in fetching results:", error);
    }
  },
  saveBuild: async (args) => {
    try {
      const idString = await authorizeAndGetUserId();
      const userId = new ObjectId(idString);

      // Build the data object to be inserted
      const buildData = {
        userId, // Associate the build with the user
        name: args.name, // Build name
        components: {
          cpu: {
            name: args.cpuName,
            core_clock: args.cpuCoreClock,
            core_count: args.cpuCoreCount,
            price: args.cpuPrice,
          },
          motherboard: {
            name: args.motherboardName,
            price: args.motherboardPrice,
          },
          os: {
            name: args.osName,
            price: args.osPrice,
          },
          memory: {
            name: args.memoryName,
            price: args.memoryPrice,
          },
          monitor: {
            name: args.monitorName,
            price: args.monitorPrice,
          },
          powerSupply: {
            name: args.powerSupplyName,
            price: args.powerSupplyPrice,
          },
          internalHardDrive: {
            name: args.internalHardDriveName,
            price: args.internalHardDrivePrice,
          },
          caseAccessory: {
            name: args.caseAccessoryName,
            price: args.caseAccessoryPrice,
          },
          thermalPaste: {
            name: args.thermalPasteName,
            price: args.thermalPastePrice,
          },
          wirelessNetworkCard: {
            name: args.wirelessNetworkCardName,
            price: args.wirelessNetworkCardPrice,
          },
        },
        createdAt: new Date().toISOString(), // Timestamp
      };

      // Insert the build into the 'builds' collection
      const db = await dbRtns.getDBInstance();
      const result = await dbRtns.addOne(db, "builds", buildData);

      // Return the inserted build (you can modify it based on the shape you want)
      return {
        id: result.insertedId,
        user: userId, // Returning the user ID (you can return user details if required)
        ...buildData,
      };
    } catch (error) {
      console.log("Error occurred in adding build:", error);
    }
  },
  getBuildsByUser: async () => {
    try {
      const idString = await authorizeAndGetUserId();
      const userId = new ObjectId(idString);

      // Fetch user profile data using the user ID
      const db = await dbRtns.getDBInstance();
      const userBuilds = await dbRtns.findAll(db, "builds", { userId });
      console.log("User builds:", userBuilds);
      if (!userBuilds) {
        console.log("No builds found for the user");
        return [];
      }
    return userBuilds;
    } catch (error) {
      console.log("Error occurered in fetching results:", error);
    }
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> test/stylizing
