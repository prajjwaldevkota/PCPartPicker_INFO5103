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
        //  firstname: args.firstname,
        //lastname: args.lastname,
        age: args.age,
        email: args.email,
        gender: args.gender,
        number: args.number,
        membership: args.isPremium,
        userId: authResult.insertedId,
      };


      let userProfileResult = await dbRtns.addOne(
        db,
        "userprofile",
        userProfileData
      );

      return { user: authData, errorMessage:null };
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

      if (!userBuilds) {
        console.log("No builds found for the user");
        return [];
      }
      const buildsWithCost = userBuilds.map((build) => {
        // Calculate the total cost of the build's components
        const totalCost = Object.values(build.components).reduce(
          (acc, component) => {
            return acc + (component.price || 0); // Sum the price of each component
          },
          0
        );

        // Return the build with the added totalCost field
        return { ...build, totalCost };
      });

      return buildsWithCost;
    } catch (error) {
      console.log("Error occurered in fetching results:", error);
    }
  },
  createReview: async (args) => {
    try {
      const idString = await authorizeAndGetUserId();
      const userId = new ObjectId(idString);

      const db = await dbRtns.getDBInstance();
      const componentData = await readDataFromJson(
        args.componentType.toLowerCase()
      );
      const componentExists = componentData.some(
        (component) => component.name === args.componentName
      );

      if (!componentExists) {
        throw new Error("Component not found");
      }
      const existingReview = await dbRtns.findOne(db, "reviews", {
        userId: userId,
        componentName: args.componentName,
        componentType: args.componentType,
      });

      if (existingReview) {
        throw new Error("You have already reviewed this component");
      }

      const reviewData = {
        userId: new ObjectId(userId),
        componentName: args.componentName,
        componentType: args.componentType,
        rating: args.rating,
        comment: args.comment,
        createdAt: new Date().toISOString(),
      };

      const result = await dbRtns.addOne(db, "reviews", reviewData);
      return {
        id: result.insertedId,
        ...reviewData,
      };
    } catch (error) {
      console.log("Error occurered in fetching results:", error);
    }
  },
  getReviews: async () => {
    try {
      const idString = await authorizeAndGetUserId();
      const userId = new ObjectId(idString);
      const db = await dbRtns.getDBInstance();
      const userReviews = await dbRtns.findAll(db, "reviews", { userId });
      return userReviews;
    } catch (error) {
      console.error("Error occurred in fetching reviews:", error);
      throw error;
    }
  },
  AdminSignup: async (args) => {
    try {
      const db = await dbRtns.getDBInstance();
      /*Validation*/
      var message = "";
      if (args.adminName == "" || args.adminName == undefined) {
        message += "First name field is required.";
      }

      if (args.password == "" || args.password == undefined) {
        message += "\nPassword field is required.";
      } else if (args.adminName != "") {
        if (args.password.length < 8) {
          message += "\n Password must be at least 8 characters long.";
        }
      }

      if (message !== "") {
        return {
          errorMessage: message,
        };
      }
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const authData = {
        adminName: args.adminName,
        password: hashedPassword, // Store hashed password
      };

      const token = jwt.sign({ email: args.email }, cfg.jwtSecret, {
        expiresIn: "1h",
      });

      let authResult = await dbRtns.addOne(db, "ADMINAUTH", authData);

      return { token, admin: authData };
    } catch (error) {
      // Handle any errors that occur
      console.error("Error occurred in fetching results:", error);
      return {
        errorMessage: `An error occurred when trying to signup.`,
      };
    }
  },
  AdminLogin: async (args) => {
    try {
      /*Validation*/

      var message = "";
      if (args.adminName == "" || args.adminName == undefined) {
        message += "username field is required.";
      }
      if (args.password == "" || args.password == undefined) {
        message += "\nPassword field is required.";
      }
      if (message !== "") {
        return {
          errorMessage: message,
        };
      }
      const db = await dbRtns.getDBInstance();
      const admin = await dbRtns.findOne(db, "ADMINAUTH", {
        adminName: args.adminName,
      });
      if (!admin) {
        return {
          errorMessage: `Admin with name '${args.adminName}' wasn't found.`,
        };
      }
      // Compare the password provided in the arguments with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(args.password, admin.password);
      if (!passwordMatch) {
        return {
          errorMessage: `Admin exists, but incorrect password.`,
        };
      }

      // If password matches, generate JWT token
      //   const token = jwt.sign({ userId: user._id }, cfg.jwtSecret);
      const token = jwt.sign({ adminId: admin._id }, cfg.jwtSecret);

      // Return token and user information
      return {
        token,
        admin: {
          adminName: admin.adminName,
          password: admin.password,
        },
      };
    } catch {
      console.log("Here is your error");
    }
  },
  getUserSurvey: async () => {
    try {
      // Fetch user profile data using the user ID
      const db = await dbRtns.getDBInstance();
      const feedback = await dbRtns.findAll(db, "Feedback"); // Get all feedback

      if (!feedback) {
        throw new Error(
          "Error in getUserSurver: Feedback could not be fetched."
        );
      }

      // Create a Feedback object, like in the Schema
      let stats = {
        numTotalFeedback: feedback.length,
        numAmazing: feedback.filter((u) => u.Label === "Amazing").length,
        numGood: feedback.filter((u) => u.Label === "Good").length,
        numOk: feedback.filter((u) => u.Label === "Ok").length,
        numBad: feedback.filter((u) => u.Label === "Bad").length,
        numAweful: feedback.filter((u) => u.Label === "Aweful").length,
      };
      return stats;
    } catch (error) {
      // Handle any errors that occur
      console.error("Error occurred in calculating stats:", error);
      throw new Error("Failed to calculate stats.");
    }
  },
  addFeedback: async (args) => {
    try {
      // Get the database instance
      const db = await dbRtns.getDBInstance();

      const addFeedbackLabel = await dbRtns.addOne(db, "Feedback", {
        Label: args.label,
      });

      if (!addFeedbackLabel) {
        throw new Error("Failed to add Label");
      }

      return addFeedbackLabel.value;
    } catch (error) {
      console.error("Error occurred while updating profile picture", error);
    }
  },
};
