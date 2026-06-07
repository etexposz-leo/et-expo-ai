import { Box, Plane, useTexture } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

function PosterFace({
  object
}) {
  const texture =
    useTexture(object.image);

  return (
    <Plane
      args={[
        object.size?.[0] || 4,
        object.size?.[1] || 3
      ]}
      position={[0, 0, (object.size?.[2] || 0.002) / 2 + 0.001]}
    >
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
      />
    </Plane>
  );
}

export default function Poster({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  setDraggingObject
}) {
  return (
    <DraggableObject
      object={object}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      setDraggingObject={setDraggingObject}
    >
      <Box args={object.size}>
        <meshStandardMaterial
          color={
            selectedId === object.id
              ? "orange"
              : object.color || "#ffffff"
          }
        />
      </Box>

      {object.image && (
        <PosterFace object={object} />
      )}
    </DraggableObject>
  );
}
