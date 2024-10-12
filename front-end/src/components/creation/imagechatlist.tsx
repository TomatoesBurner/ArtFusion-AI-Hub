import React from "react";
import { Key, LegacyRef } from "react";
import { useVirtual } from "react-virtual";

const ImagePromptListWithScroll = ({ prompts }) => {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: prompts.length,
    parentRef,
    estimateSize: () => 100,
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.virtualItems.map(
          (virtualRow: {
            index: number;
            measureRef: LegacyRef<HTMLDivElement> | undefined;
            start: number;
          }) => (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <p>{prompts[virtualRow.index].text}</p>
              <img src={prompts[virtualRow.index].imageUrl} alt="" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImagePromptListWithScroll;
