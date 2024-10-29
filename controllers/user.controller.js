import { userModel } from "../models/model.model.js";
import { randomBytes } from 'crypto';


export const createUser = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        age,
        email,
        gender,
        address,
        pinCode,
        phoneNumber,
      } = req.body;
  
      // Check if any fields are missing
      if (!firstName || !lastName || !age || !email || !gender || !address || !pinCode || !phoneNumber) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
  
      // Check if user already exists (by email or phone number)
      const userExists = await userModel.findOne({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
      });
  
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user
      const user = await userModel.create({
        user_id: randomBytes(6).toString("hex"),
        firstName,
        lastName,
        age,
        address,
        email,
        pinCode,
        gender,
        phoneNumber,
      });
  
      // Save the new user to the database
      await user.save();
  
      // Return success response
      return res.status(201).json({ message: "User created successfully", user });
  
    } catch (error) {
      // Catch and return any errors that occur during the process
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

export const getAllUser = async (req, res) => {
    try {
      const users = await userModel.find();
      if (users.length === 0){
        res.status(404);
      }
      res.status(200).json(users);
    } catch (error) {
      console.error("error fetching users", error);
      return res.status(500).json({message: "internal server error"});
    }
  };

export const getUser = async (req, res)=> {
  const {userId} = req.params;
  try {
    const user = await userModel.findOne({user_id: userId});
    if (!user){
      res.status(404);
      throw new Error (`User ${userId} not found`);
    }
    return res.status(200).json(user); 
    
  } catch (error) {
    console.error("error fetching user", error);
    return res.status(500).json({message: "internal server error"});    
  }
};

export const updateUser = async (req, res) => {
  const {userId} = req.params;
  try {
    const user = await userModel.findOne({user_id: userId});
    if (!user){
      res.status(404);
      throw new Error (`User ${userId} not found`);
    }
    if (!req.body){
      res.status(404);
      throw new Error ("please fill what to edit");
    }

    const id = user._id;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body,{
      new: true,
    });

   return res.status(200).json({message: `user ${userId} updated successfully`, updatedUser});
  } catch (error) {

    console.error("error fetching user", error);
    return res.status(500).json({message: "internal server error"});    
    
  }
}

export const deleteUser = async (req, res) =>{
  const {userId}= req.params;
  try{
    const user = await userModel.findOne({user_id: userId});
    if (!user){
      res.status(404);
      throw new Error(`User ${userId} not found`);

    }
    const id = user._id;
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({message: `User ${userId} deleted successfully`})
  } catch(error){

  }

}



