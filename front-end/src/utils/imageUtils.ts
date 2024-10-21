export type ImageDto = {
  id: string | null;
  extension: string | null;
};

const getImageAsBlob = async (url: string) => {
  return fetch(url, {
    headers: {
      "Content-Type": "image/*",
    },
  }).then((res) => res.blob());
};

const getImageNameFromImageDto = (imageDto: ImageDto) => {
  return imageDto.id + "." + imageDto.extension;
};

export const imageUtils = {
  getImageAsBlob,
  getImageNameFromImageDto,
};
