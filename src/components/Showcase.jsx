import { Box } from "@react-three/drei";

export default function Showcase({
  object,
  selectedId,
  setSelectedId
}) {
  return (
    <Box
      args={object.size}
      position={object.position}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(object.id);
      }}
    >
      <meshStandardMaterial
        color={
          selectedId === object.id
            ? "orange"
            : object.color || "white"
        }
      />
    </Box>
  );
}