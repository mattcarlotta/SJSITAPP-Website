// Success Messages //

const resentEventEmail =
  "Email notifications for that event will be resent within 24 hours of the event date.";

const passwordResetSuccess = (email: string): string =>
  `The password has been reset for ${email}. Please sign into your account with your new password.`;

const passwordResetToken = (email: string): string =>
  `The password reset request has been accepted. Your request is being processed. Please check ${email} for a confirmation link to set up a new password.`;

const thanksForReg = (firstName: string, lastName: string): string =>
  `Thank you for registering, ${firstName} ${lastName}. Your account is ready to go! Feel free to sign in with your email and password in the login form below.`;

export {
  resentEventEmail,
  passwordResetSuccess,
  passwordResetToken,
  thanksForReg
};
