import { Box } from "@react-three/drei";

function BackWall({ boothWidth, boothDepth }) {
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

function SideWall({ boothWidth, boothDepth, side }) {
  return (
    <Box
      args={[
        0.2,
        12,
        boothDepth
      ]}
      position={[
        side === "left"
          ? -boothWidth / 2
          : boothWidth / 2,
        6,
        0
      ]}
    >
      <meshStandardMaterial
        color="white"
      />
    </Box>
  );
}

export default function Walls({
  boothWidth,
  boothDepth,
  wallType
}) {
  if (wallType === "island") {
    return null;
  }

  return (
    <>
      <BackWall
        boothWidth={boothWidth}
        boothDepth={boothDepth}
      />

      {(wallType === "lshape" ||
        wallType === "ushape") && (
        <SideWall
          boothWidth={boothWidth}
          boothDepth={boothDepth}
          side="left"
        />
      )}

      {wallType === "ushape" && (
        <SideWall
          boothWidth={boothWidth}
          boothDepth={boothDepth}
          side="right"
        />
      )}
    </>
  );
}
