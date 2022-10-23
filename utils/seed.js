const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { seedUser, seedThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add users to the collection and await the results
  await User.collection.insertMany(seedUser);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(seedThought);

  // Log out the seed data to indicate what should appear in the database
  console.table(seedUser);
  console.table(seedThought);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});