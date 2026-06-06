import { Box } from "@react-three/drei";

export default function Booth({
  boothWidth,
  boothDepth,
  floorType
}) {
  return (
    <Box
      args={[
        boothWidth,
        floorType === "raised"
          ? 0.5
          : 0.1,
        boothDepth
      ]}
      position={[0, 0, 0]}
    >
      <meshStandardMaterial
        color={
          floorType === "carpet"
            ? "#777"
            : "#d2b48c"
        }
      />
    </Box>
  );
}