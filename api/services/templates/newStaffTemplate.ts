const { CLIENT } = process.env;

const newStaffTemplate = (
  token: string,
  expiration: string
): string => `<h1 style="margin: 0; text-align: center; font-size: 26px; color: #025f6d;">
    Welcome!
  </h1>
  <h2 style="margin-bottom: 30px; font-size: 20px; text-align: center; color: #025f6d;">
    You have been invited to join the staff on the Sharks Ice Team!
  </h2>
  <p style="font-size: 16px; color: #000000;">
    To register, please click the <strong>button below</strong>, or you may visit <a href="${CLIENT}/employee/signup" target="_blank" rel="noopener noreferrer">Sharks Ice Team Registration</a> and sign up with this Authorization Token:
  </p>
  <p style="font-size:16px; margin-bottom:30px; color:#000000; padding:5px; border: 1px solid #9E9E9E; background: #ebebeb; text-align: center;">
    <strong>
      ${token}
    </strong>
  </p>
  <p style="font-size: 16px; color: #000000;">
    Please note, that you will have until <strong>${expiration}</strong> end of day to register before the authorization token expires. If the key expires, you must contact the staff supervisor to issue a new one.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px; color: #000000;">
    Thank you,
    <br />
    <span style="font-style: italic;">The Sharks Ice Team</span>
  </p>
  <div style="margin-bottom: 20px; text-align: center">
    <a style="ffont-size: 18px;text-decoration: none;line-height: 40px;width: 200px;color: #FFFFFF;background: #0d6472;border-radius: 4px;display: inline-block;border: 2px solid #04515d;" href="${CLIENT}/employee/signup?token=${token}" target="_blank" rel="noopener noreferrer">Sign Up</a>
  </div>
  <div style="color:#999999;font-size:11px;text-align:center;margin-top: 10px;">
    Or click on this link:
    <a style="color: #999999; text-decoration: underline; margin-left: 2px;" href="${CLIENT}/employee/signup?token=${token}" target="_blank" rel="noopener noreferrer">${CLIENT}/employee/signup?token=${token}</a>
  </div>`;

export default newStaffTemplate;
