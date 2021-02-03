import Token from "../../models/token";
import { createSignupToken, expirationDate } from "../../helpers";

/**
 * Function to seed the testing Mongo database with tokens.
 *
 * @function
 * @returns
 */
export const seedTokens = async (): Promise<void> => {
  const newHire = {
    authorizedEmail: "carlotta.matt2@gmail.com",
    email: "carlotta.matt2@gmail.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire1 = {
    authorizedEmail: "member@example.com",
    email: "member@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire2 = {
    authorizedEmail: "member55@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire3 = {
    authorizedEmail: "member66@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire4 = {
    authorizedEmail: "member667@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire5 = {
    authorizedEmail: "member77@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire6 = {
    authorizedEmail: "member888@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire7 = {
    authorizedEmail: "member999@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire8 = {
    authorizedEmail: "member1000@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire9 = {
    authorizedEmail: "member1001@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire10 = {
    authorizedEmail: "member1002@example.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire11 = {
    authorizedEmail: "csusi@sapcenter.com",
    email: "csusi@sapcenter.com",
    role: "staff",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const newHire12 = {
    authorizedEmail: "deleteme@delete.com",
    email: "deleteme@delete.com",
    role: "employee",
    token: createSignupToken(),
    expiration: expirationDate().toDate()
  };

  const staticTestHire = {
    authorizedEmail: "static@member.com",
    email: "",
    role: "employee",
    token: "0123456789",
    expiration: expirationDate().toDate()
  };

  await Token.insertMany([
    newHire,
    newHire1,
    newHire2,
    newHire3,
    newHire4,
    newHire5,
    newHire6,
    newHire7,
    newHire8,
    newHire9,
    newHire10,
    newHire11,
    newHire12,
    staticTestHire
  ]);
};

export default seedTokens;
