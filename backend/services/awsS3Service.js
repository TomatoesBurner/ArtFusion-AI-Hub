const {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const getExpireIn = (process.env.AWS_S3_GET_EXPIRES_IN || 86400) * 1000;
const putExpiresIn = (process.env.AWS_S3_PUT_EXPIRES_IN || 600) * 1000;

const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACESS_KEY,
        secretAccessKey: process.env.AWS_S3_ACCESS_SECRET,
    },
});

const getPresignedUrlForGet = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });

    const url = await getSignedUrl(client, command, {
        expiresIn: getExpireIn,
    });
    return url;
};

const getPresignedUrlForPut = async (key) => {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });

    const url = await getSignedUrl(client, command, {
        expiresIn: putExpiresIn,
    });
    return url;
};
