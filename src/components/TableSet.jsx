import { Box, Cylinder } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

export default function TableSet({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  setDraggingObject
}) {
  const chairCount =
    object.chairCount || 4;

  const radius = 2.35;
  const selected =
    selectedId === object.id;

  return (
    <DraggableObject
      object={object}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      setDraggingObject={setDraggingObject}
    >
      <Cylinder
        args={[1.25, 1.25, 0.22, 48]}
        position={[0, 1.45, 0]}
      >
        <meshStandardMaterial
          color={selected ? "orange" : object.color || "#f5f5f5"}
        />
      </Cylinder>

      <Cylinder
        args={[0.14, 0.14, 1.35, 20]}
        position={[0, 0.74, 0]}
      >
        <meshStandardMaterial color="#8a8a8a" />
      </Cylinder>

      <Cylinder
        args={[0.75, 0.75, 0.08, 32]}
        position={[0, 0.06, 0]}
      >
        <meshStandardMaterial color="#6f6f6f" />
      </Cylinder>

      {Array.from({ length: chairCount }).map((_, index) => {
        const angle =
          (Math.PI * 2 * index) / chairCount;

        const x =
          Math.cos(angle) * radius;

        const z =
          Math.sin(angle) * radius;

        return (
          <group
            key={index}
            position={[x, 0.55, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <Box
              args={[0.85, 0.22, 0.85]}
              position={[0, 0.35, 0]}
            >
              <meshStandardMaterial color="#3f4650" />
            </Box>
            <Box
              args={[0.85, 0.95, 0.16]}
              position={[0, 0.95, -0.42]}
            >
              <meshStandardMaterial color="#2f3742" />
            </Box>
            {[-0.32, 0.32].map((lx) =>
              [-0.32, 0.32].map((lz) => (
                <Cylinder
                  key={`${lx}-${lz}`}
                  args={[0.04, 0.04, 0.7, 8]}
                  position={[lx, 0, lz]}
                >
                  <meshStandardMaterial color="#777777" />
                </Cylinder>
              ))
            )}
          </group>
        );
      })}
    </DraggableObject>
  );
}
