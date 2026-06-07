import { Box } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function Wall({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  editMode,
  setDraggingObject
}) {
  const height =
    object.size?.[1] || 0;

  const safeObject = {
    ...object,
    position: [
      object.position?.[0] || 0,
      Math.max(
        object.position?.[1] || 0,
        height / 2
      ),
      object.position?.[2] || 0
    ]
  };

  return (
    <DraggableObject
      object={safeObject}
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
              : object.color
          }
        />
      </Box>
    </DraggableObject>
  );
}

