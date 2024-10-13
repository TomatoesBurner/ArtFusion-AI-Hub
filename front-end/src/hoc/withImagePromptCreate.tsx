/* eslint-disable react/display-name */
import { ImageApi } from "@/api/imageApi";
import { PromptSubmitBoxProps } from "@/components/Common/PromptSubmitBox/PromptSubmitBox";
import { imageSliceActions } from "@/store/slices/imagesSlice";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ComponentType, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const withImagePromptCreate = <T extends PromptSubmitBoxProps>(
  WrappedComponent: ComponentType<T>
) => {
  return (props: T) => {
    const dispatch = useDispatch();
    const ipsId = useSelector(
      (state: RootState) => state.user.imagePromptSpaceId
    );
    const { model, filter } = useSelector((state: RootState) => state.images);

    const [value, setValue] = useState("");

    const {
      isPending: createImagePromptPending,
      mutate: createImagePromptMutate,
    } = useMutation({
      mutationFn: ImageApi.createImagePrompt,
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

      createImagePromptMutate(
        {
          ipsId: ipsId,
          input: {
            model: model,
            width: Math.floor(filter.width! / 8) * 8,
            height: Math.floor(filter.height! / 8) * 8,
            dpi: filter.dpi!,
            aspectRatio: filter.aspectRatio!,
            message: value,
          },
        },
        {
          onSuccess: (data) => {
            if (data.data) {
              dispatch(
                imageSliceActions.addPromptToFront({
                  prompt: data.data!,
                })
              );
              setValue("");
            }
          },
          onError: () => {
            enqueueSnackbar("Failed to create image prompt", {
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
        loading={createImagePromptPending}
        onSubmit={handleSubmit}
      />
    );
  };
};

export default withImagePromptCreate;
