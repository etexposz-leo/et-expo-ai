import { Box, Text } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function TV({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  setDraggingObject
}) {
  return (
    <DraggableObject
      object={object}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      setDraggingObject={setDraggingObject}
    >
      <Box args={object.size}>
        <meshStandardMaterial
          color={
            selectedId === object.id
              ? "orange"
              : "#111111"
          }
        />
      </Box>

      <Text
        position={[0, 0, object.size[2] / 2 + 0.02]}
        fontSize={0.45}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${object.tvSize || 32}"`}
      </Text>
    </DraggableObject>
  );
}

