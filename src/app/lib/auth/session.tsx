var jwt = require("jsonwebtoken");

export const encrypt = async (username: string, user_id: number) => {
  var tokenString: string = "";
  var token = jwt.sign(
    { username: username, user_id: user_id },
    "Private-token"
  );

  return token;
};

export const decrypt = (token: string) => {
  var decoded = jwt.verify(token, "Private-token");
};
