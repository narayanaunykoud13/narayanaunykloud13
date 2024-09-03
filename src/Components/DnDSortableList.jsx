import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";
import { Flex } from "antd";
import { HolderOutlined } from "@ant-design/icons";

export default function DnDSortableList({
  items,
  itemsRenderer,
  onDragEnd,
  indexKey = "id",
  draggable = true,
}) {
  const sortableIndexes = useMemo(
    () => items?.map((item) => item[indexKey]),
    [items, indexKey]
  );

  return (
    <>
      <div className="draggableList">
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            items={sortableIndexes}
            strategy={verticalListSortingStrategy}
          >
            {items?.map((item) => (
              <SortableItem
                draggable={draggable}
                key={item[indexKey]}
                id={item[indexKey]}
              >
                {itemsRenderer(item)}
              </SortableItem>
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
      id: props.id,
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
          <em {...attributes} {...listeners}>
            <HolderOutlined />
          </em>
        )}
        {props?.children}
      </Flex>
    </div>
  );
};
