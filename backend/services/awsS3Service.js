const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const mime = require("mime-types");

const getExpireIn = process.env.AWS_S3_GET_EXPIRES_IN || 86400;
const putExpiresIn = process.env.AWS_S3_PUT_EXPIRES_IN || 600;
const bucketName = process.env.AWS_S3_BUCKET || "art-fusion-ai-hub-dev";

const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_ACCESS_SECRET,
    },
});

const createObjectKeyFromImage = (imageName, extension) => {
    return "images/" + imageName + "." + extension;
};

const getPresignedUrlForGet = async (key) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    const url = await getSignedUrl(client, command, {
        expiresIn: getExpireIn,
    });
    return url;
};

const getPresignedUrlForPut = async (key) => {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    const url = await getSignedUrl(client, command, {
        expiresIn: putExpiresIn,
    });
    return url;
};

const uploadFileToS3 = async (buffer, fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: mime.lookup(fileName) || "application/octet-stream",
    };

    try {
        const command = new PutObjectCommand(params);
        const data = await client.send(command);
        console.log("files uploaded successfully:", data);
        return data;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw err;
    }
};

module.exports = {
    getPresignedUrlForGet,
    getPresignedUrlForPut,
    createObjectKeyFromImage,
    uploadFileToS3,
};
