const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "credential.json",
});


const detectTextByDocument = async (image) => {
  const [result] = await client.documentTextDetection(image);
  const fullTextAnnotation = result.fullTextAnnotation;
  const data = fullTextAnnotation.text;
  let arr = [];
  let str = "";
  
  for(let i=0;i<data.length;i++){
    if(data[i] == '\n'){
        arr.push(str);
        str = "";
        continue;
    }

    str += data[i];
  }

  return arr;
};

module.exports =  detectTextByDocument;
