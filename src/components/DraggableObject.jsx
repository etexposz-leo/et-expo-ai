import { useRef, useState } from "react";
import {
  Plane as ThreePlane,
  Vector3
} from "three";

export default function DraggableObject({
  object,
  setSelectedId,
  updateObject,
  setDraggingObject,
  children
}) {
  const [dragging, setDragging] =
    useState(false);

  const floorPlane =
    useRef(
      new ThreePlane(
        new Vector3(0, 1, 0),
        0
      )
    );

  const floorPoint =
    useRef(new Vector3());

  const dragOffset =
    useRef([0, 0, 0]);

  const getFloorPoint = (e) => {
    e.ray.intersectPlane(
      floorPlane.current,
      floorPoint.current
    );

    return floorPoint.current;
  };

  const beginDrag = (e) => {
    e.stopPropagation();

    setSelectedId(
      object.id
    );

    if (!updateObject) {
      return;
    }

    const point =
      getFloorPoint(e);

    dragOffset.current = [
      point.x - object.position[0],
      0,
      point.z - object.position[2]
    ];

    e.target.setPointerCapture(
      e.pointerId
    );

    setDragging(true);

    setDraggingObject?.(true);
  };

  const drag = (e) => {
    if (!dragging || !updateObject) {
      return;
    }

    e.stopPropagation();

    const point =
      getFloorPoint(e);

    updateObject(
      object.id,
      {
        position: [
          Number((point.x - dragOffset.current[0]).toFixed(2)),
          object.position[1],
          Number((point.z - dragOffset.current[2]).toFixed(2))
        ]
      }
    );
  };

  const endDrag = (e) => {
    if (dragging) {
      e.stopPropagation();
    }

    setDragging(false);

    setDraggingObject?.(false);

    if (e.target.hasPointerCapture?.(e.pointerId)) {
      e.target.releasePointerCapture(
        e.pointerId
      );
    }
  };

  return (
    <group
      position={object.position}
      rotation={object.rotation || [0,0,0]}
      onPointerDown={beginDrag}
      onPointerMove={drag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
    </group>
  );
}
