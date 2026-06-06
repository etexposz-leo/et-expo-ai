import { Box } from "@react-three/drei";

export default function Walls({
  boothWidth,
  boothDepth
}) {
  return (
    <Box
      args={[
        boothWidth,
        12,
        0.2
      ]}
      position={[
        0,
        6,
        -boothDepth / 2
      ]}
    >
      <meshStandardMaterial
        color="white"
      />
    </Box>
  );
}