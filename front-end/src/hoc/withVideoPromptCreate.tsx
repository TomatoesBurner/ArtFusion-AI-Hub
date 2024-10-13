/* eslint-disable react/display-name */
import { VideoApi } from "@/api/videoApi";
import { PromptSubmitBoxProps } from "@/components/Common/PromptSubmitBox/PromptSubmitBox";
import { videoSliceActions } from "@/store/slices/videosSlice";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ComponentType, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const withVideoPromptCreate = <T extends PromptSubmitBoxProps>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const dispatch = useDispatch();
    const ipsId = useSelector(
      (state: RootState) => state.user.videoPromptSpaceId
    );
    const { model, filter } = useSelector((state: RootState) => state.videos);

    const [value, setValue] = useState("");

    const {
      isPending: createVideoPromptPending,
      mutate: createVideoPromptMutate,
    } = useMutation({
      mutationFn: VideoApi.createVideoPrompt,
    });

    const handleValueChange = (value: string) => {
      setValue(value);
    };

    const handleSubmit = (value: string) => {
      if (!value || value.length < 10) {
        enqueueSnackbar("Please enter at least 10 characters", {
          variant: "error",
        });
        return;
      }

      createVideoPromptMutate(
        {
          ipsId: ipsId,
          input: {
            model: model,
            eta: Math.floor(filter.eta! / 8) * 8,
            fps: Math.floor(filter.fps! / 8) * 8,
            samplingSteps: filter.samplingSteps!,
            cfgScale: filter.cfgScale!,
            message: value,
          },
        },
        {
          onSuccess: (data) => {
            if (data.data) {
              dispatch(
                videoSliceActions.addPromptToFront({
                  prompt: data.data!,
                })
              );
              setValue("");
            }
          },
          onError: () => {
            enqueueSnackbar("Failed to create video prompt", {
              variant: "error",
            });
          },
        }
      );
    };

    return (
      <WrappedComponent
        {...props}
        value={value}
        onValueChange={handleValueChange}
        loading={createVideoPromptPending}
        onSubmit={handleSubmit}
      />
    );
  };
};

export default withVideoPromptCreate;
