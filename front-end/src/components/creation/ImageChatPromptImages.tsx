import { ImagePromptDto } from "@/dtos/ImagePromptDto";
import { ImageDto, imageUtils } from "@/utils/imageUtils";
import {
  Box,
  ButtonGroup,
  Menu,
  MenuItem,
  Modal,
  Stack,
  styled,
} from "@mui/material";
import { saveAs } from "file-saver";
import Image from "next/image";
import React, { ComponentProps, SyntheticEvent } from "react";
import Carousel from "react-multi-carousel";
import { ReactPhotoEditor } from "react-photo-editor";
import ImagePhotoEditorModal from "./ImagePhotoEditorModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import "react-multi-carousel/lib/styles.css";

type TBaseImageMenuOption = "view" | "download";
type TResponseImageMenuOption = TBaseImageMenuOption | "filter";
type TArugmentResponseImageMenuOption = TBaseImageMenuOption;

const PromptImage = styled(
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

const carouselResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    // items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    // items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    // items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // items: 1,
  },
};

const ImageChatPromptImages = ({ prompt }: ImageChatPromptImagesProps) => {
  const ipsId = useSelector(
    (state: RootState) => state.user.imagePromptSpaceId
  );
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
  const { response, argumentResponses } = prompt;

  const handleResponseIMageMenuClose = () => {
    setResponseImageMenuAnchorEl(null);
  };

  const handleArgumentResponseIMageMenuClose = () => {
    setResponseImageMenuAnchorEl(null);
  };

  const handleResponseImageClick = (event: SyntheticEvent) => {
    setResponseImageMenuAnchorEl(event.target as HTMLElement);
  };

  const handleResponseImageMenuItemClick = async (
    option: TResponseImageMenuOption
  ) => {
    if (option === "view") {
      const blob = fetch(response.imageUrl!, {
        headers: {
          "Content-Type": "image/*",
          Host: "art-fusion-ai-hub-dev.s3.ap-southeast-2.amazonaws.com",
        },
      }).then((res) => res.blob());
    } else if (option === "download") {
      const blob = await imageUtils.getImageAsBlob(response.imageUrl!);
      saveAs(blob, imageUtils.getImageNameFromImageDto(response as ImageDto));
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

  const handleArgumenResponseImageClick = (event: SyntheticEvent) => {
    setArgumentResponseImageMenuAnchorEl(event.target as HTMLElement);
  };

  const handleArgumentResponseImageMenuItemClick = (
    option: TArugmentResponseImageMenuOption
  ) => {
    if (option === "view") {
    } else if (option === "download") {
    }

    handleArgumentResponseIMageMenuClose();
  };

  const handleImageFilterModalClose = () => {
    setShowImageFilterModal(false);
    setEditingImageFile(undefined);
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
        // <>
        //   <PromptImage
        //     onClick={handleResponseImageClick}
        //     src={response.imageUrl || ""}
        //   />
        //   {argumentResponses.map((argumentResponse) => (
        //     <PromptImage
        //       key={argumentResponse.id}
        //       onClick={handleArgumenResponseImageClick}
        //       src={argumentResponse.imageUrl || ""}
        //     />
        //   ))}
        // </>
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
              onClick={handleArgumenResponseImageClick}
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
    </>
  );
};

export default ImageChatPromptImages;
