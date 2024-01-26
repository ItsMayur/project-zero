var jwt = require("jsonwebtoken");

export const encrypt = async (
  username: string,
  user_id: number,
  role: string
) => {
  var token = jwt.sign(
    { username: username, user_id: user_id, role: role },
    "Private-token"
  );
  console.log(token);

  return token;
};

export const decrypt = (token: string) => {
  var decoded = jwt.verify(token, "Private-token");
  return decoded;
};
