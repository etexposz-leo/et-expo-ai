import { Box } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function StorageRoom({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  editMode,
  setDraggingObject
}) {
  let doorPosition = [
    object.doorOffsetX || 0,
    -2 + (object.doorOffsetY || 0),
    object.size[2] / 2
  ];

  let doorRotation = [
    0,
    0,
    0
  ];

  if (object.doorSide === "left") {
    doorPosition = [
      -object.size[0] / 2,
      -2 + (object.doorOffsetY || 0),
      object.doorOffsetX || 0
    ];

    doorRotation = [
      0,
      Math.PI / 2,
      0
    ];
  }

  if (object.doorSide === "right") {
    doorPosition = [
      object.size[0] / 2,
      -2 + (object.doorOffsetY || 0),
      object.doorOffsetX || 0
    ];

    doorRotation = [
      0,
      Math.PI / 2,
      0
    ];
  }

  if (object.doorSide === "back") {
    doorPosition = [
      object.doorOffsetX || 0,
      -2 + (object.doorOffsetY || 0),
      -object.size[2] / 2
    ];

    doorRotation = [
      0,
      Math.PI,
      0
    ];
  }

  return (
    <DraggableObject
      object={object}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      editMode={editMode}
      setDraggingObject={setDraggingObject}
    >
      <Box args={object.size}>
        <meshStandardMaterial
          color={
            selectedId === object.id
              ? "orange"
              : object.color || "#666"
          }
        />
      </Box>

      {Array.from({
        length:
          object.doorCount || 1
      }).map((_, index) => {
        return (
          <Box
            key={index}
            args={[
              object.doorWidth || 2,
              object.doorHeight || 4,
              0.2
            ]}
            position={[
              doorPosition[0] + index * 2,
              doorPosition[1],
              doorPosition[2]
            ]}
            rotation={doorRotation}
          >
            <meshStandardMaterial
              color="#222"
            />
          </Box>
        );
      })}
    </DraggableObject>
  );
}

