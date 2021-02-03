import User from "../../models/user";
import { createDate, createRandomToken } from "../../helpers";
import type { IUserDocument } from "../../models/user";

const { EMAIL } = process.env;

export const admin = {
  email: EMAIL as string,
  firstName: "Matt",
  lastName: "Carlotta",
  password: "password"
};

/**
 * Function to seed the testing Mongo database with users.
 *
 * @function
 * @returns {Promise} IUserDocument
 */
export const seedUsers = async (): Promise<IUserDocument> => {
  const registered = createDate().toDate();

  const adminPassword = await User.createPassword(admin.password);

  const administrator = {
    ...admin,
    password: adminPassword,
    role: "admin",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const memberPassword = await User.createPassword(admin.password);

  const staffMember = {
    email: "staffmember@example.com",
    password: memberPassword,
    firstName: "Staff",
    lastName: "Member",
    role: "staff",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const realMember = {
    email: "carlotta.matthew@gmail.com",
    password: memberPassword,
    firstName: "Matthew",
    lastName: "Carlotta",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const scheduledMember = {
    email: "scheduledmember@test.com",
    password: memberPassword,
    firstName: "Scheduled",
    lastName: "Member",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const member = {
    email: "member@example.com",
    password: memberPassword,
    firstName: "Member",
    lastName: "Member",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const member2 = {
    email: "member2@example.com",
    password: memberPassword,
    firstName: "Member2",
    lastName: "Member2",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const member3 = {
    email: "member3@example.com",
    password: memberPassword,
    firstName: "Member3",
    lastName: "Member3",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered
  };

  const member4 = {
    email: "member4@example.com",
    password: memberPassword,
    firstName: "Member4",
    lastName: "Member4",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "suspended"
  };

  const member5 = {
    email: "member5@example.com",
    password: memberPassword,
    firstName: "Member5",
    lastName: "Member5",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "suspended"
  };

  const member6 = {
    email: "member6@example.com",
    password: memberPassword,
    firstName: "Member6",
    lastName: "Member6",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member7 = {
    email: "member7@example.com",
    password: memberPassword,
    firstName: "Member7",
    lastName: "Member7",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member8 = {
    email: "member8@example.com",
    password: memberPassword,
    firstName: "Member8",
    lastName: "Member8",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member9 = {
    email: "member9@example.com",
    password: memberPassword,
    firstName: "Member9",
    lastName: "Member9",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member299 = {
    email: "member299@example.com",
    password: memberPassword,
    firstName: "Member299",
    lastName: "Member299",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member399 = {
    email: "member399@example.com",
    password: memberPassword,
    firstName: "Member399",
    lastName: "Member399",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const member499 = {
    email: "member499@example.com",
    password: memberPassword,
    firstName: "Member499",
    lastName: "Member499",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const suspendedEmployee = {
    email: "suspended.employee@example.com",
    password: memberPassword,
    firstName: "Suspended",
    lastName: "Employee",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "suspended"
  };

  const deletedEmployee = {
    email: "deleted.employee@delete.com",
    password: memberPassword,
    firstName: "Delete",
    lastName: "Me",
    role: "employee",
    token: createRandomToken(),
    emailReminders: true,
    registered,
    status: "active"
  };

  const turnedOffReminders = {
    email: "turned.off@reminders.com",
    password: memberPassword,
    firstName: "Turned Off",
    lastName: "Reminders",
    role: "employee",
    token: createRandomToken(),
    emailReminders: false,
    registered,
    status: "active"
  };

  await User.insertMany([
    administrator,
    realMember,
    staffMember,
    scheduledMember,
    member,
    member2,
    member3,
    member4,
    member5,
    member6,
    member7,
    member8,
    member9,
    member299,
    member399,
    member499,
    suspendedEmployee,
    deletedEmployee,
    turnedOffReminders
  ]);

  const scheduledUser = await User.findOne({
    email: scheduledMember.email
  });

  return scheduledUser;
};

export default seedUsers;
