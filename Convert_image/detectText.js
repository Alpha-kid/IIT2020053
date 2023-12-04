const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "credential.json",
});

// Process Identification Number
function processIdentificationNumber(arr) {
  let flag = 0;
  var i = 0;
  for (; i < arr.length; i++) {
    if (arr[i][0] >= "0" && arr[i][0] <= "9") {
      flag = 1;
      break;
    }
  }
  st = arr[i];
  if (flag) {
    return { success: true, data: st };
  } else {
    return {
      success: false,
      error: "It has no valid Thai Identification Number",
    };
  }
}

// Process Name
function processName(arr) {
  for (i = 0; i < arr.length; i++) {
    const arrayOfSubstringsName = arr[i].split(" ");
    if (arrayOfSubstringsName[0] == "Name") {
      let st = "";
      for (let ip = 1; ip < arrayOfSubstringsName.length; ip++) {
        st += arrayOfSubstringsName[ip] + " ";
      }
      return { success: true, data: st.trim() };
    }
  }

  return { success: false, error: "It has no valid Thai Name" };
}

// Process Last Name
function processLastName(arr) {
  for (i = 0; i < arr.length; i++) {
    const arrayOfSubstringsLastName = arr[i].split(" ");
    if (
      arrayOfSubstringsLastName[0] === "Last" &&
      arrayOfSubstringsLastName[1] === "name"
    ) {
      let st = "";
      for (let i = 2; i < arrayOfSubstringsLastName.length; i++) {
        st += arrayOfSubstringsLastName[i] + " ";
      }
      return { success: true, data: st.trim() };
    }
  }

  return { success: false, error: "It has no valid Thai Last Name" };
}

function isDateStringValid(inputString) {
  // Attempt to create a Date object from the input string
  const dateObject = new Date(inputString);

  // Check if the created Date object is valid and the original string is not empty
  if (!isNaN(dateObject.getTime()) && inputString.trim() !== "") {
    return true;
  } else {
    return false;
  }
}

// Process Date of Issue
function processDateOfIssue(arr) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "Date of Issue") {
      if (isDateStringValid(arr[i - 1])) {
        return { success: true, data: arr[i - 1] };
      }
    }
  }

  return { success: false, error: "It has no valid Thai Date of Issue" };
}

// Process Date of Expiry
function processDateOfExpiry(arr) {
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "Date of Expiry") {
      if (isDateStringValid(arr[i - 1])) {
        return { success: true, data: arr[i - 1] };
      }
    }
  }

  return { success: false, error: "It has no valid Thai Date of Expiry" };
}

// Process Date of Birth
function processDateOfBirth(arr) {
  for (i = 0; i < arr.length; i++) {
    const arrayOfSubstringsLastName = arr[i].split(" ");

    if (
      arrayOfSubstringsLastName.length >= 3 &&
      arrayOfSubstringsLastName[0] +
        " " +
        arrayOfSubstringsLastName[1] +
        " " +
        arrayOfSubstringsLastName[2] ===
        "Date of Birth"
    ) {
      const st =
        arrayOfSubstringsLastName[0] +
        " " +
        arrayOfSubstringsLastName[1] +
        " " +
        arrayOfSubstringsLastName[2];
      const dat =
        arrayOfSubstringsLastName[3] +
        " " +
        arrayOfSubstringsLastName[4] +
        " " +
        arrayOfSubstringsLastName[5];
      if (isDateStringValid(dat)) {
        return {
          success: true,
          data: dat,
        };
      }
    }
  }

  return { success: false, error: "It has no valid Thai Date of Birth" };
}

const detectTextByDocument = async (image) => {
  const result = await client.documentTextDetection(image);
  // console.log(result);
  const fullTextAnnotation = result[0].fullTextAnnotation;
  const data = fullTextAnnotation.text;
  let arr = [];
  let str = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i] == "\n") {
      arr.push(str);
      str = "";
      continue;
    }

    str += data[i];
  }

  // arr.map((ele, idx) => {
  //   console.log(idx, ele);
  // });

  id_num = processIdentificationNumber(arr);
  f_name = processName(arr);
  l_name = processLastName(arr);
  d_o_i = processDateOfIssue(arr);
  d_o_e = processDateOfExpiry(arr);
  d_o_b = processDateOfBirth(arr);

  if (
    !(
      id_num.success &&
      f_name.success &&
      l_name.success &&
      d_o_b.success &&
      d_o_e.success &&
      d_o_i.success
    )
  ) {
    return {success : false,data : "This is not a valid Thai Id"};
  }

  let results = {
    identification_number: id_num.data,
    name: f_name.data,
    last_name: l_name.data,
    "date-of-birth": d_o_b.data,
    "date-of-issue": d_o_i.data,
    "date-of-expiry": d_o_e.data,
  };

  // console.log(results)

  return {success : true,data : results};
};

module.exports = detectTextByDocument;
