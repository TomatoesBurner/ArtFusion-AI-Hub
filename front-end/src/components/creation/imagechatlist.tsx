import React, { useEffect, useRef, useState } from "react";
import ImageChatPrompt, {
  estimateImageChatPromptHeight,
} from "./ImageChatPrompt";
import { Box, CircularProgress, Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ImageApi } from "@/api/imageApi";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useVirtualizer } from "@tanstack/react-virtual";
import { imageSliceActions } from "@/store/slices/imagesSlice";

const ImageChatList = () => {
  const dispatch = useDispatch();
  const ipsId = useSelector(
    (state: RootState) => state.user.imagePromptSpaceId
  );

  const imagePrompts =
    useSelector((state: RootState) => state.images.prompts) || [];
  const stateCursor = imagePrompts[imagePrompts.length - 1]?.id || null;

  const [hasNextPage, setHasNextPage] = useState(true);
  const imagePromptsContainerRef: any = useRef();

  const {
    isFetching: getAllImagePromptsLoading,
    // isLoading: getAllImagePromptsLoading,
    data: getAllImagePromptsData,
    refetch: getAllImagePromptsRefetch,
  } = useQuery({
    queryKey: ["getAllImagePrompts"],
    queryFn: () =>
      ImageApi.getAllImagePrompts({ ipsId, cursor: stateCursor, limit: 3 }),
    enabled: false,
  });

  const virtualizer = useVirtualizer({
    count: hasNextPage ? imagePrompts.length + 1 : imagePrompts.length,
    getScrollElement: () => imagePromptsContainerRef?.current || null,
    estimateSize: () => estimateImageChatPromptHeight,
    overscan: 0,
  });

  const fetchImagePrompts = () => {
    if (!hasNextPage || getAllImagePromptsLoading) return;

    getAllImagePromptsRefetch().then((res) => {
      const inData = res.data;

      if (!inData) {
        setHasNextPage(false);
        return;
      }

      const newImagePrompts = inData.data || [];

      setHasNextPage(inData.pagination?.hasNext || false);

      dispatch(
        imageSliceActions.addPrompts({
          prompts: newImagePrompts,
        })
      );
      dispatch(
        imageSliceActions.setPagination({ pagination: inData.pagination || {} })
      );
    });
  };

  const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
  const lastItemIndex = lastItem?.index === undefined ? -1 : lastItem?.index;

  useEffect(() => {
    if (!lastItem) return;

    if (
      lastItemIndex >= imagePrompts.length &&
      hasNextPage &&
      !getAllImagePromptsLoading
    ) {
      fetchImagePrompts();
    }
  }, [
    imagePrompts.length,
    lastItemIndex,
    getAllImagePromptsLoading,
    hasNextPage,
  ]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLElement;

      if (currentTarget) {
        currentTarget.scrollTop -= e.deltaY;
      }
    };
    imagePromptsContainerRef.current?.addEventListener("wheel", handleScroll, {
      passive: false,
    });
    return () => {
      imagePromptsContainerRef.current?.removeEventListener(
        "wheel",
        handleScroll
      );
    };
  }, [getAllImagePromptsLoading]);

  return (
    <Paper
      ref={imagePromptsContainerRef}
      component={Box}
      p={2}
      width={"100%"}
      height={"100%"}
      position={"relative"}
      sx={{
        overflowY: "auto",
        transform: "scaleY(-1)",
      }}
    >
      <Box
        height={`${virtualizer.getTotalSize()}px`}
        width={"100%"}
        position={"relative"}
      >
        {virtualizer.getVirtualItems().map((virtaulRow) => {
          const prompt = imagePrompts[virtaulRow.index];

          return (
            <Box
              key={virtaulRow.index}
              data-index={virtaulRow.index}
              ref={virtualizer.measureElement}
              position={"absolute"}
              top={0}
              left={0}
              width={"100%"}
              sx={{
                transform: `translateY(${virtaulRow.start}px) scaleY(-1)`,
              }}
            >
              {virtaulRow.index === imagePrompts.length || !prompt ? (
                <Stack
                  pt={3}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CircularProgress />
                </Stack>
              ) : (
                <ImageChatPrompt
                  prompt={prompt}
                  ipsId={ipsId}
                ></ImageChatPrompt>
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ImageChatList;
