import { Box, Cylinder } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function Sofa({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  setDraggingObject
}) {
  const seats =
    object.seats || 1;

  const width =
    seats * 2.15;

  const color =
    selectedId === object.id
      ? "orange"
      : object.color || "#5d6773";

  return (
    <DraggableObject
      object={object}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      setDraggingObject={setDraggingObject}
    >
      <Box
        args={[width, 0.55, 1.55]}
        position={[0, 0.55, 0.1]}
      >
        <meshStandardMaterial color={color} />
      </Box>

      <Box
        args={[width, 1.15, 0.35]}
        position={[0, 1.05, -0.62]}
      >
        <meshStandardMaterial color={object.color || "#5d6773"} />
      </Box>

      {Array.from({ length: seats }).map((_, index) => (
        <Box
          key={index}
          args={[1.9, 0.18, 1.35]}
          position={[
            -width / 2 + 1.075 + index * 2.15,
            0.93,
            0.16
          ]}
        >
          <meshStandardMaterial color="#75808d" />
        </Box>
      ))}

      <Box
        args={[0.32, 0.85, 1.7]}
        position={[-width / 2 - 0.18, 0.75, 0.05]}
      >
        <meshStandardMaterial color={object.color || "#5d6773"} />
      </Box>

      <Box
        args={[0.32, 0.85, 1.7]}
        position={[width / 2 + 0.18, 0.75, 0.05]}
      >
        <meshStandardMaterial color={object.color || "#5d6773"} />
      </Box>

      {[-width / 2 + 0.35, width / 2 - 0.35].map((x) =>
        [-0.48, 0.62].map((z) => (
          <Cylinder
            key={`${x}-${z}`}
            args={[0.07, 0.07, 0.3, 10]}
            position={[x, 0.15, z]}
          >
            <meshStandardMaterial color="#222222" />
          </Cylinder>
        ))
      )}
    </DraggableObject>
  );
}
