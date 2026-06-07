import { Box, Text } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function Slogan({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  setDraggingObject
}) {
  const width =
    object.size?.[0] || 8;

  const height =
    object.size?.[1] || 1.5;

  const thickness =
    object.size?.[2] || 0.01;

  return (
    <DraggableObject
      object={object}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      setDraggingObject={setDraggingObject}
    >
      {selectedId === object.id && (
        <Box
          args={[
            width + 0.3,
            height + 0.3,
            thickness
          ]}
          position={[0, 0, -thickness / 2]}
        >
          <meshStandardMaterial
            color="orange"
          />
        </Box>
      )}

      <Text
        maxWidth={width}
        fontSize={height}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={object.color || "#ffffff"}
      >
        {object.text || "SLOGAN"}
      </Text>

      <Box
        args={[
          width,
          height,
          thickness
        ]}
        position={[0, 0, -thickness]}
      >
        <meshStandardMaterial
          color={object.color || "#ffffff"}
          transparent
          opacity={0.18}
        />
      </Box>
    </DraggableObject>
  );
}
