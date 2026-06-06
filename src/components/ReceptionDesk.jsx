import { Box } from "@react-three/drei";

export default function ReceptionDesk({
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
            : "#0066ff"
        }
      />
    </Box>
  );
}