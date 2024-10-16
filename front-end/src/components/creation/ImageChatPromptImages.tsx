import {
  ArgumentImagePromptResponseDto,
  ImagePromptDto,
} from "@/dtos/ImagePromptDto";
import { ImageDto, imageUtils } from "@/utils/imageUtils";
import { Menu, MenuItem, Stack, styled } from "@mui/material";
import { saveAs } from "file-saver";
import Image from "next/image";
import React, { ComponentProps, SyntheticEvent, useState } from "react";
import ImagePhotoEditorModal from "./ImagePhotoEditorModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "react-multi-carousel/lib/styles.css";
import { useQuery } from "@tanstack/react-query";
import ImageViewModal from "./ImageViewModal";

type TBaseImageMenuOption = "view" | "download";
type TResponseImageMenuOption = TBaseImageMenuOption | "filter";
type TArugmentResponseImageMenuOption = TBaseImageMenuOption;

export const PromptImage = styled(
  ({
    alt = ".",
    ...others
  }: Omit<ComponentProps<typeof Image>, "alt"> & { alt?: string }) => (
    <Image width={0} height={0} alt={alt} unoptimized {...others} />
  )
)(({ theme }) => ({
  height: "100%",
  width: "auto",
  cursor: "pointer",
}));

export type ImageChatPromptImagesProps = {
  prompt: ImagePromptDto;
};

const ImageChatPromptImages = ({ prompt }: ImageChatPromptImagesProps) => {
  const ipsId = useSelector(
    (state: RootState) => state.user.imagePromptSpaceId
  );
  const [selectedArgumentImage, setSelectedArgumentImage] =
    useState<ArgumentImagePromptResponseDto | null>(null);
  const [showImageFilterModal, setShowImageFilterModal] = React.useState(false);
  const [editingImageFile, setEditingImageFile] = React.useState<
    File | undefined
  >(undefined);
  const [responseImageMenuAnchorEl, setResponseImageMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [
    argumentResponseImageMenuAnchorEl,
    setArgumentResponseImageMenuAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [showViewImageModal, setShowViewImageModal] = useState(false);

  const { response, argumentResponses } = prompt;

  const {
    isFetching: getPromptImageBlobFetching,
    refetch: getPromptImageBlobRefetch,
  } = useQuery({
    queryKey: ["getPromptImageBlob"],
    queryFn: () => imageUtils.getImageAsBlob(prompt.response.imageUrl!),
    enabled: false,
    retry: false,
  });

  const {
    isFetching: getArgumentImageBlobFetching,
    refetch: getArgumentImageBlobRefetch,
  } = useQuery({
    queryKey: ["getArgumentImageBlob"],
    queryFn: () => imageUtils.getImageAsBlob(selectedArgumentImage?.imageUrl!),
    enabled: false,
    retry: false,
  });

  const handleResponseIMageMenuClose = () => {
    setResponseImageMenuAnchorEl(null);
  };

  const handleArgumentResponseIMageMenuClose = () => {
    setArgumentResponseImageMenuAnchorEl(null);
  };

  const handleResponseImageClick = (event: SyntheticEvent) => {
    setResponseImageMenuAnchorEl(event.target as HTMLElement);
  };

  const handleResponseImageMenuItemClick = async (
    option: TResponseImageMenuOption
  ) => {
    if (option === "view") {
      setShowViewImageModal(true);
    } else if (option === "download") {
      const blob = await getPromptImageBlobRefetch();
      if (blob.data) {
        saveAs(
          blob.data,
          imageUtils.getImageNameFromImageDto(response as ImageDto)
        );
      }
    } else if (option === "filter") {
      const blob = await imageUtils.getImageAsBlob(response.imageUrl!);
      setEditingImageFile(
        new File(
          [blob],
          imageUtils.getImageNameFromImageDto(response as ImageDto)
        )
      );
      setShowImageFilterModal(true);
    }

    handleResponseIMageMenuClose();
  };

  const handleArgumenResponseImageClick = (
    event: SyntheticEvent,
    selected: ArgumentImagePromptResponseDto
  ) => {
    setArgumentResponseImageMenuAnchorEl(event.target as HTMLElement);
    setSelectedArgumentImage(selected);
  };

  const handleArgumentResponseImageMenuItemClick = async (
    option: TArugmentResponseImageMenuOption
  ) => {
    if (option === "view") {
      setShowViewImageModal(true);
    } else if (option === "download") {
      if (selectedArgumentImage) {
        // const blob = await imageUtils.getImageAsBlob(
        //   selectedArgumentImage.imageUrl!
        // );
        const blob = await getArgumentImageBlobRefetch();
        if (blob.data) {
          saveAs(
            blob.data,
            imageUtils.getImageNameFromImageDto(response as ImageDto)
          );
        }
      }
    }

    handleArgumentResponseIMageMenuClose();
  };

  const handleImageFilterModalClose = () => {
    setShowImageFilterModal(false);
    setEditingImageFile(undefined);
    setSelectedArgumentImage(null);
  };

  const handleViewImageModalClose = () => {
    setShowViewImageModal(false);
    setSelectedArgumentImage(null);
  };

  return (
    <>
      {(!argumentResponses || argumentResponses.length == 0) && (
        <PromptImage
          onClick={handleResponseImageClick}
          src={response.imageUrl || ""}
        />
      )}

      {argumentResponses && argumentResponses.length > 0 && (
        <Stack
          height={"100%"}
          direction={"row"}
          gap={2}
          sx={{
            overflow: "hidden",
            overflowX: "scroll",
          }}
        >
          <PromptImage
            onClick={handleResponseImageClick}
            src={response.imageUrl || ""}
          />
          {argumentResponses.map((argumentResponse) => (
            <PromptImage
              key={argumentResponse.id}
              onClick={(e) =>
                handleArgumenResponseImageClick(e, argumentResponse)
              }
              src={argumentResponse.imageUrl || ""}
            />
          ))}
        </Stack>
      )}

      {/* Main Response image menu */}
      <Menu
        anchorEl={responseImageMenuAnchorEl}
        open={Boolean(responseImageMenuAnchorEl)}
        onClose={handleResponseIMageMenuClose}
      >
        <MenuItem onClick={() => handleResponseImageMenuItemClick("view")}>
          View
        </MenuItem>
        <MenuItem onClick={() => handleResponseImageMenuItemClick("filter")}>
          Filter
        </MenuItem>
        <MenuItem
          role="none"
          onClick={() => handleResponseImageMenuItemClick("download")}
        >
          Download
        </MenuItem>
      </Menu>

      {/* Argument Response image menu */}
      <Menu
        anchorEl={argumentResponseImageMenuAnchorEl}
        open={Boolean(argumentResponseImageMenuAnchorEl)}
        onClose={handleArgumentResponseIMageMenuClose}
      >
        <MenuItem
          onClick={() => handleArgumentResponseImageMenuItemClick("view")}
        >
          View
        </MenuItem>
        <MenuItem
          role="none"
          onClick={() => handleArgumentResponseImageMenuItemClick("download")}
        >
          Download
        </MenuItem>
      </Menu>

      {showImageFilterModal && (
        <ImagePhotoEditorModal
          ipsId={ipsId}
          ipId={prompt.id!}
          open={showImageFilterModal}
          image={editingImageFile}
          onClose={handleImageFilterModalClose}
        />
      )}

      {showViewImageModal && (
        <ImageViewModal
          open={showViewImageModal}
          imageUrl={
            selectedArgumentImage
              ? selectedArgumentImage.imageUrl!
              : prompt.response.imageUrl!
          }
          imagePrompt={prompt}
          argumentImage={selectedArgumentImage}
          onClose={handleViewImageModalClose}
        />
      )}
    </>
  );
};

export default ImageChatPromptImages;
