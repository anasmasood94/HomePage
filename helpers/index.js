const AWS = require("aws-sdk");
const dbClient = new AWS.DynamoDB.DocumentClient();

const saveUserData = async (email, phone, code) => {
  var params = {
    TableName: "uncompleted_account",
    Item: {
      id: email || phone,
      info: {
        email: email || "none",
        phone: phone || "none",
        code: code,
      },
    },
  };
  await dbClient.put(params);
};

const getUserData = async (email, phone, fn) => {
  var params = {
    TableName: "uncompleted_account",
    Key: {
      id: email || phone,
    },
  };

  dbClient.get(params, function (err, data) {
    fn({ err, data });
  });
};

module.exports = {
  saveUserData,
  getUserData,
};
