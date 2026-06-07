import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import PropertyPanel from "./components/PropertyPanel";
import Booth from "./components/Booth";
import Showcase from "./components/Showcase";
import StorageRoom from "./components/StorageRoom";
import ReceptionDesk from "./components/ReceptionDesk";
import LogoZone from "./components/LogoZone";
import Wall from "./components/Wall";
import Header from "./components/Header";
import Pillar from "./components/Pillar";
import Door from "./components/Door";
import Poster from "./components/Poster";
import Slogan from "./components/Slogan";
import TableSet from "./components/TableSet";
import Sofa from "./components/Sofa";
import TV from "./components/TV";
import BoothWall from "./components/BoothWall";
import DraggableObject from "./components/DraggableObject";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

export default function App() {

  const [editMode, setEditMode] =
    useState(false);

  const [shiftPressed, setShiftPressed] =
    useState(false);

  const [draggingObject, setDraggingObject] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [boothWidth, setBoothWidth] =
    useState(20);

  const [boothDepth, setBoothDepth] =
    useState(20);

  const [floorType, setFloorType] =
    useState("carpet");

  const [logoImage, setLogoImage] =
    useState(null);

  const [posterImage, setPosterImage] =
    useState(null);

  const [sloganText, setSloganText] =
    useState("SLOGAN");
  const [wallType, setWallType] =
  useState("single");

  const [tvSize, setTvSize] =
    useState(32);

  const [boothWallOverrides, setBoothWallOverrides] =
    useState({});

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

  const getBoothWallObject = (
    side
  ) => {
    const id =
      `booth-wall-${side}`;

    const base =
      side === "back"
        ? {
            id,
            type: "boothWall",
            label: "Back Wall",
            position: [0, 6, -boothDepth / 2],
            size: [boothWidth, 12, 0.2],
            color: "#ffffff",
            rotation: [0,0,0]
          }
        : {
            id,
            type: "boothWall",
            label:
              side === "left"
                ? "Left Wall"
                : "Right Wall",
            position: [
              side === "left"
                ? -boothWidth / 2
                : boothWidth / 2,
              6,
              0
            ],
            size: [0.2, 12, boothDepth],
            color: "#ffffff",
            rotation: [0,0,0]
          };

    return {
      ...base,
      ...(boothWallOverrides[id] || {})
    };
  };

  const boothWalls =
    wallType === "island"
      ? []
      : [
          getBoothWallObject("back"),
          ...(wallType === "lshape" || wallType === "ushape"
            ? [getBoothWallObject("left")]
            : []),
          ...(wallType === "ushape"
            ? [getBoothWallObject("right")]
            : [])
        ];
  const selectedObject =
    objects.find(
      (obj) => obj.id === selectedId
    );
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Shift") {
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setShiftPressed(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, []);
    const showcaseCount =
  objects.filter(
    obj => obj.type === "showcase"
  ).length;

const storageCount =
  objects.filter(
    obj => obj.type === "storage"
  ).length;

const receptionCount =
  objects.filter(
    obj => obj.type === "reception"
  ).length;

const ledCount =
  objects.filter(
    obj => obj.type === "led"
  ).length;

const headerCount =
  objects.filter(
    obj => obj.type === "header"
  ).length;

const pillarCount =
  objects.filter(
    obj => obj.type === "pillar"
  ).length; 
  const getNextPosition = (
    type,
    basePosition
  ) => {
    const sameTypeCount =
      objects.filter(
        obj => obj.type === type
      ).length;

    const step =
      type === "storage"
        ? 5
        : type === "wall"
          ? 3
          : 2;

    return [
      basePosition[0] + sameTypeCount * step,
      basePosition[1],
      basePosition[2] + sameTypeCount * step
    ];
  };

  const handleLogoUpload = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setLogoImage(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const handlePosterUpload = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setPosterImage(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };
  const updateObject = (
    id,
    updates
  ) => {

    if (String(id).startsWith("booth-wall-")) {
      setBoothWallOverrides({
        ...boothWallOverrides,
        [id]: {
          ...(boothWallOverrides[id] || {}),
          ...updates
        }
      });
      return;
    }

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
        position: getNextPosition("showcase", [0, 1.5, 0]),
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

      position: getNextPosition("storage", [0, 4, -5]),

      size: [8, 8, 8],

      color: "#666666",

      doors: [
        {
          id: 1,

          side: "front",

          offsetX: 0,

          offsetY: 0,

          width: 2,

          height: 4
        }
      ]
    }
  ]);

};  
  const addReception = () => {

    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: "reception",
        position: getNextPosition("reception", [0, 0.5, 3]),
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
        position: getNextPosition("led", [0, 4, -8]),
        size: [8, 4, 0.2],
        color: "#000000"
      }
    ]);

  };
  const addHeader = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type: "header",

      position: getNextPosition("header", [0, 9, 5]),

      size: [10, 1, 0.5],

      color: "#0066ff"
    }
  ]);

};
    const addPillar = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type: "pillar",

      position: getNextPosition("pillar", [0, 4, 0]),

      size: [1, 8, 1],

      color: "#888888"
    }
  ]);

};
  const addLogo = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type:"logo",

      position: getNextPosition("logo", [0,6,-8]),

      size:[4,2,0.1],

      color:"#ffffff",

      image: logoImage
    }
  ]);

};
const addWall = () => {

  setObjects([
    ...objects,

    {
      id: Date.now(),

      type: "wall",

      position: getNextPosition("wall", [0,4,-8]),

      size: [10,8,0.5],

      color: "#ffffff",

      rotation: [0,0,0]
    }
  ]);

};
const addPoster = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type: "poster",

      position: getNextPosition("poster", [0,5,-7.8]),

      size: [4,3,0.002],

      color: "#ffffff",

      image: posterImage,

      rotation: [0,0,0]
    }
  ]);

};

const addSlogan = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type: "slogan",

      position: getNextPosition("slogan", [0,7,-7.7]),

      size: [8,1.2,0.01],

      color: "#ffffff",

      text: sloganText || "SLOGAN",

      rotation: [0,0,0]
    }
  ]);

};
const addTableSet = (chairCount) => {

  setObjects([
    ...objects,
    {
      id: Date.now(),
      type: "tableSet",
      position: getNextPosition("tableSet", [0, 1, 0]),
      size: [5, 2, 5],
      color: "#ffffff",
      chairCount,
      rotation: [0,0,0]
    }
  ]);

};

const addSofa = (seats) => {

  setObjects([
    ...objects,
    {
      id: Date.now(),
      type: "sofa",
      position: getNextPosition("sofa", [0, 1, 4]),
      size: [seats * 2.2, 1.4, 1.6],
      color: "#555555",
      seats,
      rotation: [0,0,0]
    }
  ]);

};

const addTV = () => {
  const diagonal =
    tvSize / 12;

  const width =
    diagonal * 16 / Math.sqrt(337);

  const height =
    diagonal * 9 / Math.sqrt(337);

  setObjects([
    ...objects,
    {
      id: Date.now(),
      type: "tv",
      position: getNextPosition("tv", [0, 5, -7.6]),
      size: [
        Number(width.toFixed(2)),
        Number(height.toFixed(2)),
        0.18
      ],
      color: "#111111",
      tvSize,
      rotation: [0,0,0]
    }
  ]);

};
    const addDoor = () => {

  setObjects([
    ...objects,
    {
      id: Date.now(),

      type: "door",

      position: getNextPosition("door", [0, 2, 0]),

      size: [2, 4, 0.2],

      color: "#222222",

      rotation: [0, 0, 0]
    }
  ]);

};
   const removeObjectType = (
  type
) => {

  const target =
    [...objects]
      .reverse()
      .find(
        obj =>
          obj.type === type
      );

  if (!target)
    return;

  setObjects(
    objects.filter(
      obj =>
        obj.id !== target.id
    )
  );

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

  };

  const downloadFile = (
    blob,
    filename
  ) => {
    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(
      () => URL.revokeObjectURL(url),
      1000
    );
  };

  const getProjectData = () => ({
    version: "6.5",
    name: "ET Expo Booth Design AI Assistance",
    savedAt: new Date().toISOString(),
    booth: {
      width: boothWidth,
      depth: boothDepth,
      floorType: floorType,
      wallType: wallType,
      boothWalls: boothWalls
    },
    objects: objects
  });

  const saveProject = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          getProjectData(),
          null,
          2
        )
      ],
      { type: "application/json;charset=utf-8" }
    );

    downloadFile(
      blob,
      "ET-Expo-Booth-Design.project.json"
    );
  };

  const exportPDF = () => {
    const projectData =
      getProjectData();

    const pdf =
      new jsPDF();

    let y = 18;

    pdf.setFontSize(16);
    pdf.text(
      "ET Expo Booth Design AI Assistance",
      14,
      y
    );

    y += 10;

    pdf.setFontSize(11);
    pdf.text(
      `Booth: ${boothWidth}ft W x ${boothDepth}ft D`,
      14,
      y
    );

    y += 7;
    pdf.text(
      `Floor: ${floorType}    Back Wall: ${wallType}`,
      14,
      y
    );

    y += 10;
    pdf.setFontSize(13);
    pdf.text(
      "Objects",
      14,
      y
    );

    y += 8;
    pdf.setFontSize(9);

    const lines = [
      ...projectData.booth.boothWalls.map((wall) =>
        `${wall.label || wall.id}: ${wall.size.join(" x ")} at ${wall.position.join(", ")}`
      ),
      ...objects.map((obj, index) =>
        `${index + 1}. ${obj.type}: size ${obj.size?.join(" x ") || "n/a"}, position ${obj.position?.join(", ") || "n/a"}`
      )
    ];

    lines.forEach((line) => {
      if (y > 280) {
        pdf.addPage();
        y = 18;
      }

      pdf.text(
        line.slice(0, 105),
        14,
        y
      );

      y += 6;
    });

    const blob =
      pdf.output("blob");

    downloadFile(
      blob,
      "ET-Expo-Booth-Design-Proposal.pdf"
    );
  };
return (

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
          ET Expo Booth Design AI Assistance
        </h2>
          <hr />

<h3>
Quantity Control
</h3>
    <div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

<button
  onClick={() =>
    removeObjectType(
      "storage"
    )
  }
>
-
</button>

<span>
Storage {storageCount}
</span>

<button
  onClick={addStorage}
>
+
</button>

</div>

<br />
<div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

<button
  onClick={() =>
    removeObjectType(
      "reception"
    )
  }
>
-
</button>

<span>
Reception {receptionCount}
</span>

<button
  onClick={addReception}
>
+
</button>
<div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

<button
  onClick={() =>
    removeObjectType(
      "led"
    )
  }
>
-
</button>

<span>
LED {ledCount}
</span>

<button
  onClick={addLED}
>
+
</button>

</div>

<br />
<div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

<button
  onClick={() =>
    removeObjectType(
      "header"
    )
  }
>
-
</button>

<span>
Header {headerCount}
</span>

<button
  onClick={addHeader}
>
+
</button>

</div>

<br />
<div
  style={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center"
  }}
>

<button
  onClick={() =>
    removeObjectType(
      "pillar"
    )
  }
>
-
</button>

<span>
Pillar {pillarCount}
</span>

<button
  onClick={addPillar}
>
+
</button>

</div>

<hr />
</div>

<br />
<hr />

<h3>
  Add Items
</h3>

<div
  style={{
    display: "grid",
    gap: "12px"
  }}
>
  <section
    style={{
      border: "1px solid #333",
      padding: "10px",
      borderRadius: "6px"
    }}
  >
    <strong>Logo</strong>
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      style={{ width: "100%", marginTop: "8px" }}
    />
    <button
      onClick={addLogo}
      style={{ width: "100%", marginTop: "8px" }}
    >
      Add Logo
    </button>
  </section>

  <section
    style={{
      border: "1px solid #333",
      padding: "10px",
      borderRadius: "6px"
    }}
  >
    <strong>Walls & Graphics</strong>
    <button
      onClick={addWall}
      style={{ width: "100%", marginTop: "8px" }}
    >
      Add Wall
    </button>
    <input
      type="file"
      accept="image/*"
      onChange={handlePosterUpload}
      style={{ width: "100%", marginTop: "8px" }}
    />
    <button
      onClick={addPoster}
      style={{ width: "100%", marginTop: "8px" }}
    >
      Add Poster
    </button>
  </section>

  <section
    style={{
      border: "1px solid #333",
      padding: "10px",
      borderRadius: "6px"
    }}
  >
    <strong>Slogan</strong>
    <textarea
      maxLength="100"
      placeholder="Type slogan text"
      value={sloganText}
      onChange={(e) =>
        setSloganText(
          e.target.value.slice(0, 100)
        )
      }
      style={{
        width: "100%",
        minHeight: "70px",
        marginTop: "8px",
        boxSizing: "border-box"
      }}
    />
    <button
      onClick={addSlogan}
      style={{ width: "100%", marginTop: "8px" }}
    >
      Add Slogan
    </button>
  </section>

  <section
    style={{
      border: "1px solid #333",
      padding: "10px",
      borderRadius: "6px"
    }}
  >
    <strong>Showcase</strong>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "40px 1fr 40px",
        gap: "8px",
        alignItems: "center",
        marginTop: "8px"
      }}
    >
      <button
        onClick={() =>
          removeObjectType(
            "showcase"
          )
        }
      >
        -
      </button>
      <span>
        Showcase {showcaseCount}
      </span>
      <button
        onClick={addShowcase}
      >
        +
      </button>
    </div>
  </section>
</div>
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
        <hr />

<h3>
  Wall Type
</h3>

<select
  value={wallType}
  onChange={(e) =>
    setWallType(
      e.target.value
    )
  }
  style={{
    width: "100%"
  }}
>
  <option value="single">
    Single Wall
  </option>

  <option value="lshape">
    L Shape
  </option>

  <option value="ushape">
    U Shape
  </option>

  <option value="island">
    Island
  </option>
</select>

<br />
<hr />

<button
  onClick={addShowcase}
>          Add Showcase
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
  onClick={addHeader}
>
  Add Header
</button>

<br />
<br />
      <button
  onClick={addPillar}
>
  Add Pillar
</button>
<button
  onClick={addDoor}
>
  Add Door
</button>
        <br />
<br />
<hr />
<h3>
  Furniture Area
</h3>

<button
  onClick={() => addTableSet(4)}
>
  Round Table + 4 Chairs
</button>

<button
  onClick={() => addTableSet(3)}
>
  Round Table + 3 Chairs
</button>

<br />
<br />

<button
  onClick={() => addSofa(1)}
>
  Single Sofa
</button>

<button
  onClick={() => addSofa(2)}
>
  Two Seat Sofa
</button>

<button
  onClick={() => addSofa(3)}
>
  Three Seat Sofa
</button>

<br />
<br />

<select
  value={tvSize}
  onChange={(e) =>
    setTvSize(
      Number(e.target.value)
    )
  }
  style={{
    width: "100%"
  }}
>
  {[32,40,50,60,70,80,98].map((size) => (
    <option
      key={size}
      value={size}
    >
      {size} inch TV
    </option>
  ))}
</select>

<button
  onClick={addTV}
>
  Add TV
</button>

<br />
<br /><button
  onClick={saveProject}
>
  Save Project
</button>
       <button
  onClick={exportPDF}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px"
  }}
>
  Export PDF
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
            enabled={
              !shiftPressed &&
              !draggingObject
            }
          />

          <Booth
            boothWidth={boothWidth}
            boothDepth={boothDepth}
            floorType={floorType}
          />
          {boothWalls.map((wall) => (
            <BoothWall
              key={wall.id}
              object={wall}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
  
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
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
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
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
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
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
              );
            }

            if (
              obj.type === "led"
            ) {
              return (
                <DraggableObject
                  key={obj.id}
                  object={obj}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  updateObject={updateObject}
                  editMode={editMode}
                  setDraggingObject={setDraggingObject}
                >
                  <Box args={obj.size}>
                    <meshStandardMaterial
                      color={
                        selectedId === obj.id
                          ? "orange"
                          : obj.color
                      }
                    />
                  </Box>
                </DraggableObject>
              );
            }
               if (
  obj.type === "header"
) {
  return (
    <Header
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}
          if (
  obj.type === "pillar"
) {
  return (
    <Pillar
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}
      if (
  obj.type === "logo"
)
{
  return (
    <LogoZone
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}
if (
  obj.type === "wall"
)
{
  return (
    <Wall
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}if (
  obj.type === "tableSet"
)
{
  return (
    <TableSet
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}

if (
  obj.type === "sofa"
)
{
  return (
    <Sofa
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}

if (
  obj.type === "tv"
)
{
  return (
    <TV
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}
if (
  obj.type === "poster"
)
{
  return (
    <Poster
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}

if (
  obj.type === "slogan"
)
{
  return (
    <Slogan
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}

if (
  obj.type === "door"
) {
  return (
    <Door
      key={obj.id}
      object={obj}
      selectedId={selectedId}
      setSelectedId={
        setSelectedId
      }
      updateObject={
        updateObject
      }
      editMode={
        editMode
      }
      setDraggingObject={
        setDraggingObject
      }
    />
  );
}
            return null;

          })}

        </Canvas>

      </div>

    </div>

  );

}



















