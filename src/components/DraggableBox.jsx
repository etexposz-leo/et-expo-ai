import { useRef, useState } from "react";
import { Box, Html } from "@react-three/drei";

export default function DraggableBox({
  id,
  label,
  color,
  size,
  position,
  selected,
  onSelect
}) {
  const ref = useRef();

  const [hovered, setHovered] =
    useState(false);

  return (
    <>
      <Box
        ref={ref}
        args={size}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(id);
        }}
        onPointerOver={() =>
          setHovered(true)
        }
        onPointerOut={() =>
          setHovered(false)
        }
      >
        <meshStandardMaterial
          color={color}
          emissive={
            selected
              ? "#ff6600"
              : "#000000"
          }
          emissiveIntensity={
            selected ? 0.4 : 0
          }
        />
      </Box>

      {(hovered || selected) && (
        <Html
          position={[
            position[0],
            position[1] + size[1] / 2 + 0.5,
            position[2]
          ]}
        >
          <div
            style={{
              background:
                "rgba(0,0,0,0.8)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "12px",
              whiteSpace: "nowrap"
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </>
  );
}