import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import { Flex } from "antd";

export default function DnDSortable({
  items,
  itemsRenderer,
  onDragEnd,
  indexKey = "id",
  draggable = true,
}) {
  // const sortableIndexes = useMemo(
  //   () => items?.map((item) => item[indexKey]),
  //   [items, indexKey]
  // );
  const sortableIndexes = useMemo(() => {
    if (!items || !Array.isArray(items) || !indexKey) {
      // Handle the case where items or indexKey are not defined or not valid
      console.error("Invalid items or indexKey");
      return [];
    }
    
    return items?.map(item => item?.[indexKey]);
  }, [items, indexKey]);

  return (
    <>
      <div className="draggableList">
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            items={sortableIndexes}
            strategy={verticalListSortingStrategy}
          >
            {items?.length > 0 && items?.map((item) => (
               item && item[indexKey] !== undefined ? (
                <SortableItem
                  draggable={draggable}
                  key={item?.[indexKey] || "id"}
                  id={item?.[indexKey] || "id"}
                >
                  {itemsRenderer(item)}
                </SortableItem>
                 ) : null
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props?.id,
      transition: {
        duration: 150,
        easing: "ease-in-out",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      onMouseDown={(e) => {
        e.target.classList.add("dragging");
      }}
      onMouseUp={(e) => {
        e.target.classList.remove("dragging");
      }}
      className="draggableList_item"
      ref={setNodeRef}
      style={style}
    >
      <Flex align="center">
        {props?.draggable && (
          <span {...attributes} {...listeners}>
            <em className="icon-drag">{}</em>
          </span>
        )}
        {props?.children}
      </Flex>
    </div>
  );
};
