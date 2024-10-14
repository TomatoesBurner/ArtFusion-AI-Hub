import { ImagePromptDto } from "@/dtos/ImagePromptDto";
import { ButtonGroup, Menu, MenuItem, styled } from "@mui/material";
import Image from "next/image";
import React, { ComponentProps, SyntheticEvent } from "react";
import Carousel from "react-multi-carousel";

type TBaseImageMenuOption = "view" | "download";
type TResponseImageMenuOption = TBaseImageMenuOption | "filter";
type TArugmentResponseImageMenuOption = TBaseImageMenuOption;

const PromptImage = styled(
  ({
    alt = "",
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
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ImageChatPromptImages = ({ prompt }: ImageChatPromptImagesProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const { response, argumentResponses } = prompt;

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleResponseImageClick = (event: SyntheticEvent) => {
    setMenuAnchorEl(event.target as HTMLElement);
  };

  const handleResponseImageMenuItemClick = (
    option: TResponseImageMenuOption
  ) => {
    if (option === "view") {
    } else if (option === "download") {
    } else if (option === "filter") {
    }
  };

  const handleArgumenResponseImageClick = (event: SyntheticEvent) => {
    setMenuAnchorEl(event.target as HTMLElement);
  };

  const handleArgumentResponseImageMenuItemClick = (
    option: TArugmentResponseImageMenuOption
  ) => {
    if (option === "view") {
    } else if (option === "download") {
    }
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
        <Carousel
          arrows={true}
          renderButtonGroupOutside={true}
          customButtonGroup={<ButtonGroup />}
          responsive={carouselResponsive}
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
        </Carousel>
      )}

      {/* Main Response image menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleResponseImageMenuItemClick("view")}>
          View
        </MenuItem>
        <MenuItem onClick={() => handleResponseImageMenuItemClick("filter")}>
          Filter
        </MenuItem>
        <MenuItem onClick={() => handleResponseImageMenuItemClick("download")}>
          Download
        </MenuItem>
      </Menu>

      {/* Argument Response image menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handleArgumentResponseImageMenuItemClick("view")}
        >
          View
        </MenuItem>
        <MenuItem
          onClick={() => () =>
            handleArgumentResponseImageMenuItemClick("download")
          }
        >
          Download
        </MenuItem>
      </Menu>
    </>
  );
};

export default ImageChatPromptImages;
