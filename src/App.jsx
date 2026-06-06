import { useState } from "react";

import PropertyPanel from "./components/PropertyPanel";
import Booth from "./components/Booth";
import Walls from "./components/Walls";
import Showcase from "./components/Showcase";
import StorageRoom from "./components/StorageRoom";
import ReceptionDesk from "./components/ReceptionDesk";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

export default function App() {

  const [editMode, setEditMode] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [boothWidth, setBoothWidth] =
    useState(20);

  const [boothDepth, setBoothDepth] =
    useState(20);

  const [floorType, setFloorType] =
    useState("carpet");

  const [objects, setObjects] =
    useState([
      {
        id: 1,
        type: "showcase",
        position: [-4, 1.5, 0],
        size: [1, 3, 1],
        color: "#ffffff"
      },
      {
        id: 2,
        type: "showcase",
        position: [4, 1.5, 0],
        size: [1, 3, 1],
        color: "#ffffff"
      }
    ]);

  const selectedObject =
    objects.find(
      (obj) => obj.id === selectedId
    );

  const updateObject = (
    id,
    updates
  ) => {

    setObjects(
      objects.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              ...updates
            }
          : obj
      )
    );

  };  const addShowcase = () => {

    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "showcase",
        position: [0, 1.5, 0],
        size: [1, 3, 1],
        color: "#ffffff"
      }
    ]);

  };

  const addStorage = () => {

    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "storage",
        position: [0, 4, -5],
        size: [8, 8, 8],
        color: "#666666"
      }
    ]);

  };

  const addReception = () => {

    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "reception",
        position: [0, 0.5, 3],
        size: [2, 1, 1],
        color: "#0066ff"
      }
    ]);

  };

  const addLED = () => {

    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "led",
        position: [0, 4, -8],
        size: [8, 4, 0.2],
        color: "#000000"
      }
    ]);

  };

  const deleteSelected = () => {

    if (!selectedId) return;

    setObjects(
      objects.filter(
        (obj) =>
          obj.id !== selectedId
      )
    );

    setSelectedId(null);

  };  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex"
      }}
    >

      <div
        style={{
          width: "340px",
          background: "#111",
          color: "white",
          padding: "20px",
          overflowY: "auto"
        }}
      >

        <h2>
          ET Expo AI V6.5
        </h2>

        <label>
          <input
            type="checkbox"
            checked={editMode}
            onChange={() =>
              setEditMode(!editMode)
            }
          />
          Edit Mode
        </label>

        <hr />

        <h3>
          Booth Size
        </h3>

        <input
          type="number"
          value={boothWidth}
          onChange={(e) =>
            setBoothWidth(
              Number(e.target.value)
            )
          }
          style={{
            width: "100%"
          }}
        />

        <br />
        <br />

        <input
          type="number"
          value={boothDepth}
          onChange={(e) =>
            setBoothDepth(
              Number(e.target.value)
            )
          }
          style={{
            width: "100%"
          }}
        />

        <hr />

        <h3>
          Floor Type
        </h3>

        <select
          value={floorType}
          onChange={(e) =>
            setFloorType(
              e.target.value
            )
          }
          style={{
            width: "100%"
          }}
        >
          <option value="carpet">
            Carpet
          </option>

          <option value="raised">
            Raised Floor
          </option>
        </select>

        <hr />

        <button
          onClick={addShowcase}
        >
          Add Showcase
        </button>

        <br />
        <br />

        <button
          onClick={addStorage}
        >
          Add Storage
        </button>

        <br />
        <br />

        <button
          onClick={addReception}
        >
          Add Reception
        </button>

        <br />
        <br />

        <button
          onClick={addLED}
        >
          Add LED Screen
        </button>

        <br />
        <br />

        <button
          onClick={deleteSelected}
        >
          Delete Selected
        </button>

        <PropertyPanel
          selectedObject={
            selectedObject
          }
          updateObject={
            updateObject
          }
        />

      </div>      <div style={{ flex: 1 }}>

        <Canvas
          camera={{
            position: [20, 15, 20],
            fov: 50
          }}
        >

          <ambientLight intensity={2} />

          <OrbitControls
            enabled={!editMode}
          />

          <Booth
            boothWidth={boothWidth}
            boothDepth={boothDepth}
            floorType={floorType}
          />

          <Walls
            boothWidth={boothWidth}
            boothDepth={boothDepth}
          />

          {objects.map((obj) => {

            if (
              obj.type === "showcase"
            ) {
              return (
                <Showcase
                  key={obj.id}
                  object={obj}
                  selectedId={selectedId}
                  setSelectedId={
                    setSelectedId
                  }
                />
              );
            }

            if (
              obj.type === "storage"
            ) {
              return (
                <StorageRoom
                  key={obj.id}
                  object={obj}
                  selectedId={selectedId}
                  setSelectedId={
                    setSelectedId
                  }
                />
              );
            }

            if (
              obj.type === "reception"
            ) {
              return (
                <ReceptionDesk
                  key={obj.id}
                  object={obj}
                  selectedId={selectedId}
                  setSelectedId={
                    setSelectedId
                  }
                />
              );
            }

            if (
              obj.type === "led"
            ) {
              return (
                <Box
                  key={obj.id}
                  args={obj.size}
                  position={obj.position}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(
                      obj.id
                    );
                  }}
                >
                  <meshStandardMaterial
                    color={
                      selectedId === obj.id
                        ? "orange"
                        : obj.color
                    }
                  />
                </Box>
              );
            }

            return null;

          })}

        </Canvas>

      </div>

    </div>

  );

}