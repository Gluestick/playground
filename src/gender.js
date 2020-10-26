module.exports.isoGenderToString = gender => {
  switch (gender) {
    case 1:
      return "MALE";
    case 2:
      return "FEMALE";
  }
};

module.exports.stringToIsoGender = string => {
  switch (string) {
    case "MALE":
      return 1;
    case "FEMALE":
      return 2;
  }
};
