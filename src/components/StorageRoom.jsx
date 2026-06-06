import { Box } from "@react-three/drei";

export default function StorageRoom({
  object,
  selectedId,
  setSelectedId
}) {
  return (
    <>
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
              : "#666"
          }
        />
      </Box>

      {/* Door */}

      <Box
        args={[2, 4, 0.2]}
        position={[
          object.position[0],
          object.position[1] - 2,
          object.position[2] + object.size[2] / 2
        ]}
      >
        <meshStandardMaterial
          color="#222"
        />
      </Box>
    </>
  );
}