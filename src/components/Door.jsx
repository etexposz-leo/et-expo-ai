import { Box } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function Door({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  editMode,
  setDraggingObject
}) {
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
              : object.color
          }
        />
      </Box>
    </DraggableObject>
  );
}

