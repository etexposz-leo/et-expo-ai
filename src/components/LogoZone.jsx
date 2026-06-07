import { Text, Plane, useTexture } from "@react-three/drei";
import DraggableObject from "./DraggableObject";

function LogoImage({
  object,
  selectedId
}) {
  const texture =
    useTexture(object.image);

  return (
    <>
      {selectedId === object.id && (
        <Plane
          args={[
            (object.size?.[0] || 4) + 0.25,
            (object.size?.[1] || 2) + 0.25
          ]}
          position={[0, 0, -0.03]}
        >
          <meshBasicMaterial
            color="orange"
          />
        </Plane>
      )}

      <Plane
        args={[
          object.size?.[0] || 4,
          object.size?.[1] || 2
        ]}
      >
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
        />
      </Plane>
    </>
  );
}

export default function LogoZone({
  object,
  selectedId,
  setSelectedId,
  updateObject,
  editMode,
  setDraggingObject
}) {
  return (
    <DraggableObject
      object={object}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      updateObject={updateObject}
      editMode={editMode}
      setDraggingObject={setDraggingObject}
    >
      {object.image ? (
        <LogoImage
          object={object}
          selectedId={selectedId}
        />
      ) : (
        <Text
          fontSize={
            object.size?.[1] || 2
          }
          color={
            selectedId === object.id
              ? "orange"
              : object.color
          }
        >
          LOGO
        </Text>
      )}
    </DraggableObject>
  );
}

