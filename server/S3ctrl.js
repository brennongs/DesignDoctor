//depends
const AWS=require(`aws-sdk`),
      keys=require(`./keys`);

//S3 setup
AWS.config.update({
  accessKeyId: keys.s3.access,
  secretAccessKey: keys.s3.secret,
  region: keys.s3.region
});
const S3=new AWS.S3();

const bucketName=keys.s3.bucket;
exports.sendPics=(pic, cb)=>{
  let buf=new Buffer(pic.imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  let params={
    Bucket: bucketName,
    Body: buf,
    Key: pic.imageName,
    ContentType: `image/${pic.imageExtension}`,
    ACL: `public-read`
  };
  return S3.upload(params,(err,data)=>{
    if(err) return err;
    cb(data);
  })
}
