import { Box } from "@react-three/drei";

export default function BoothWall({
  object,
  selectedId,
  setSelectedId
}) {
  return (
    <Box
      args={object.size}
      position={object.position}
      rotation={object.rotation || [0,0,0]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(object.id);
      }}
    >
      <meshStandardMaterial
        color={
          selectedId === object.id
            ? "orange"
            : object.color || "#ffffff"
        }
      />
    </Box>
  );
}
