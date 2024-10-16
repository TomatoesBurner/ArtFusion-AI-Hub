import React, { useEffect, useRef, useState } from "react";
import VideoChatPrompt, {
  estimateVideoChatPromptHeight,
} from "./VideoChatPrompt";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { VideoApi } from "@/api/videoApi";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useVirtualizer } from "@tanstack/react-virtual";
import { videoSliceActions } from "@/store/slices/videosSlice";

const VideoChatList = () => {
  const dispatch = useDispatch();
  const vpsId = useSelector(
    (state: RootState) => state.user.videoPromptSpaceId
  );

  const videoPrompts =
    useSelector((state: RootState) => state.videos.prompts) || [];
  const stateCursor = videoPrompts[videoPrompts.length - 1]?.id || null;

  const [hasNextPage, setHasNextPage] = useState(true);
  const videoPromptsContainerRef: any = useRef();

  const {
    isFetching: getAllVideoPromptsLoading,
    // isLoading: getAllVideoPromptsLoading,
    data: getAllVideoPromptsData,
    refetch: getAllVideoPromptsRefetch,
  } = useQuery({
    queryKey: ["getAllVideoPrompts"],
    queryFn: () => VideoApi.getAllVideoPrompts(vpsId, stateCursor || null, 3),
    enabled: false,
  });

  const virtualizer = useVirtualizer({
    // paddingStart: 16,
    // paddingEnd: 16,
    count: hasNextPage ? videoPrompts.length + 1 : videoPrompts.length,
    getScrollElement: () => videoPromptsContainerRef?.current || null,
    // estimateSize: () => 0,
    estimateSize: () => estimateVideoChatPromptHeight,
    overscan: 0,
    // measureElement: (
    //   element: Element,
    //   entry: ResizeObserverEntry | undefined,
    //   instance: Virtualizer<Element, Element>
    // ) => {
    //   return element.clientHeight;
    // },
  });

  const fetchVideoPrompts = () => {
    if (!hasNextPage || getAllVideoPromptsLoading) return;

    getAllVideoPromptsRefetch().then((res) => {
      const inData = res.data;

      if (!inData) {
        setHasNextPage(false);
        return;
      }

      const newVideoPrompts = inData.data || [];

      setHasNextPage(inData.pagination?.hasNext || false);

      dispatch(
        videoSliceActions.addPrompts({
          prompts: newVideoPrompts,
        })
      );
      dispatch(
        videoSliceActions.setPagination({ pagination: inData.pagination || {} })
      );
    });
  };

  const [lastItem] = [...virtualizer.getVirtualItems()].reverse();
  const lastItemIndex = lastItem?.index === undefined ? -1 : lastItem?.index;

  useEffect(() => {
    if (!lastItem) return;

    if (
      lastItemIndex >= videoPrompts.length &&
      hasNextPage &&
      !getAllVideoPromptsLoading
    ) {
      fetchVideoPrompts();
    }
  }, [
    videoPrompts.length,
    lastItemIndex,
    getAllVideoPromptsLoading,
    hasNextPage,
    // lastItem,
    // fetchVideoPrompts,
  ]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLElement;

      if (currentTarget) {
        currentTarget.scrollTop -= e.deltaY;
      }
    };
    videoPromptsContainerRef.current?.addEventListener("wheel", handleScroll, {
      passive: false,
    });
    return () => {
      videoPromptsContainerRef.current?.removeEventListener(
        "wheel",
        handleScroll
      );
    };
  }, [getAllVideoPromptsLoading]);

  return (
    <Paper
      ref={videoPromptsContainerRef}
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
      {getAllVideoPromptsLoading && (
        <LinearProgress
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        />
      )}

      <Box
        height={`${virtualizer.getTotalSize()}px`}
        width={"100%"}
        position={"relative"}
      >
        {virtualizer.getVirtualItems().map((virtaulRow) => {
          const prompt = videoPrompts[virtaulRow.index];

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
              {virtaulRow.index === videoPrompts.length || !prompt ? (
                <Stack
                  pt={3}
                  width={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <CircularProgress />
                </Stack>
              ) : (
                <VideoChatPrompt prompt={prompt}></VideoChatPrompt>
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default VideoChatList;
