import Role from "../models/role.models";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const createRoles = async () => {
  try {
    const elements = await Role.estimatedDocumentCount();
    if (elements > 0) return;

    await Promise.all([
      new Role({ title: "regular" }).save(),
      new Role({ title: "moderator" }).save(),
      new Role({ title: "admin" }).save(),
    ]);
    console.log("regular, moderator and admin roles created successfully");
  } catch (error) {
    console.log(error);
  }
};

export const createAdminProfile = async () => {
  try {
    const adminRole = await Role.findOne({ title: "admin" });
    if (!adminRole) {
      return console.log("Admin role not found");
    }
    const adminFound = await User.findOne({ role: adminRole._id });
    if (adminFound) return;

    const username = "admin";
    const email = "admin@potato.com";
    const password = "adminpassword";
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newAdmin = new User({
      username,
      email,
      password: hashedPassword,
      role: adminRole._id,
      verified: true,
    });
    await newAdmin.save();

    console.log("\n");
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Admin profile created successfully!");
<<<<<<< HEAD:src/libs/initialSetup.js
    console.log(
      "Login with this credentials and go to this endpoint to change it using PUT method: http://localhost:3000/api/profile"
    );
=======
    console.log(`Login with this credentials`);
>>>>>>> ts:src/libs/initialSetup.ts
  } catch (error) {
    console.error(error);
  }
};
