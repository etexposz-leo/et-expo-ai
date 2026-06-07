export default function PropertyPanel({
  selectedObject,
  updateObject
}) {

  const readImageFile = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      updateObject(
        selectedObject.id,
        {
          image: reader.result
        }
      );
    };

    reader.readAsDataURL(file);
  };


  const pantoneColors = {
    "BLACK C": "#2D2926",
    "COOL GRAY 1 C": "#D9D9D6",
    "COOL GRAY 5 C": "#B1B3B3",
    "COOL GRAY 11 C": "#53565A",
    "WHITE": "#FFFFFF",
    "YELLOW C": "#FEDD00",
    "ORANGE 021 C": "#FE5000",
    "RED 032 C": "#EF3340",
    "RUBINE RED C": "#CE0058",
    "RHODAMINE RED C": "#E10098",
    "PURPLE C": "#BB29BB",
    "VIOLET C": "#440099",
    "BLUE 072 C": "#10069F",
    "REFLEX BLUE C": "#001489",
    "PROCESS BLUE C": "#0085CA",
    "GREEN C": "#00AB84",
    "354 C": "#00B140",
    "186 C": "#C8102E",
    "185 C": "#E4002B",
    "199 C": "#D50032",
    "286 C": "#0033A0",
    "293 C": "#003DA5",
    "300 C": "#005EB8",
    "306 C": "#00B5E2",
    "347 C": "#009A44",
    "355 C": "#009639",
    "368 C": "#78BE20",
    "485 C": "#DA291C",
    "021 C": "#FE5000",
    "123 C": "#FFC72C",
    "151 C": "#FF8200",
    "165 C": "#FF671F",
    "2685 C": "#330072",
    "2995 C": "#00A3E0",
    "3272 C": "#00A499",
    "375 C": "#97D700",
    "431 C": "#5B6770"
  };

  const getPantoneColor = (value) => {
    const normalized =
      value
        .trim()
        .toUpperCase()
        .replace(/^PANTONE\s+/, "")
        .replace(/\s+/g, " ");

    if (/^#[0-9A-F]{6}$/.test(normalized)) {
      return normalized;
    }

    return pantoneColors[normalized] ||
      pantoneColors[`${normalized} C`] ||
      null;
  };

  const updatePantoneColor = (value) => {
    const color =
      getPantoneColor(value);

    updateObject(
      selectedObject.id,
      {
        pantone: value,
        ...(color ? { color } : {})
      }
    );
  };
  if (!selectedObject) {
    return (
      <>
        <hr />
        <h3>Properties</h3>
        <div>No Object Selected</div>
      </>
    );
  }

  return (
    <>
      <hr />

      <h3>Properties</h3>

      <div>
        <strong>
          {selectedObject.type}
        </strong>
      </div>

      <br />

      {selectedObject.type === "logo" && (
        <>
          <label>
            Logo Thickness (mm)
          </label>

          <input
            type="number"
            min="3"
            max="100"
            value={
              selectedObject.size[2] * 1000
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  size: [
                    selectedObject.size[0],
                    selectedObject.size[1],
                    Number(e.target.value) / 1000
                  ]
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />
        </>
      )}


      {selectedObject.type === "poster" && (
        <>
          <label>
            Poster Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={readImageFile}
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />

          <label>
            Poster Thickness (mm)
          </label>

          <input
            type="number"
            min="1"
            max="3"
            value={
              Number(
                ((selectedObject.size[2] || 0.002) * 1000).toFixed(3)
              )
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  size: [
                    selectedObject.size[0],
                    selectedObject.size[1],
                    Math.min(
                      0.003,
                      Math.max(
                        0.001,
                        Number(e.target.value) / 1000
                      )
                    )
                  ]
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />
        </>
      )}

      {selectedObject.type === "slogan" && (
        <>
          <label>
            Slogan Text
          </label>

          <textarea
            maxLength="100"
            value={selectedObject.text || ""}
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  text: e.target.value.slice(0, 100)
                }
              )
            }
            style={{
              width: "100%",
              minHeight: "80px"
            }}
          />

          <br />
          <br />

          <label>
            Slogan Thickness (mm)
          </label>

          <input
            type="number"
            min="1"
            max="30"
            value={
              Number(
                ((selectedObject.size[2] || 0.01) * 1000).toFixed(3)
              )
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  size: [
                    selectedObject.size[0],
                    selectedObject.size[1],
                    Math.min(
                      0.03,
                      Math.max(
                        0.001,
                        Number(e.target.value) / 1000
                      )
                    )
                  ]
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />
        </>
      )}
      <label>Color</label>

      <input
        type="color"
        value={selectedObject.color}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              color: e.target.value
            }
          )
        }
        style={{
          width: "100%",
          height: "40px"
        }}
      />

      <br />
      <br />


      <label>
        Pantone Color
      </label>

      <input
        type="text"
        placeholder="Pantone 186 C or #C8102E"
        value={selectedObject.pantone || ""}
        onChange={(e) =>
          updatePantoneColor(
            e.target.value
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />
      <label>Width</label>

      <input
        type="number"
        value={selectedObject.size[0]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              size: [
                Number(e.target.value),
                selectedObject.size[1],
                selectedObject.size[2]
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      <label>Height</label>

      <input
        type="number"
        value={selectedObject.size[1]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              size: [
                selectedObject.size[0],
                Number(e.target.value),
                selectedObject.size[2]
              ],
              position:
                selectedObject.type === "wall" ||
                selectedObject.type === "boothWall"
                  ? [
                      selectedObject.position[0],
                      Number(e.target.value) / 2,
                      selectedObject.position[2]
                    ]
                  : selectedObject.position
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      <label>Depth</label>

      <input
        type="number"
        value={selectedObject.size[2]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              size: [
                selectedObject.size[0],
                selectedObject.size[1],
                Number(e.target.value)
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      {selectedObject.type === "storage" && (
        <>
          <label>
            Door Count
          </label>

          <input
            type="number"
            min="1"
            max="4"
            value={
              selectedObject.doorCount || 1
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorCount: Number(
                    e.target.value
                  )
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />

          <label>
            Door Width
          </label>

          <input
            type="number"
            value={
              selectedObject.doorWidth || 2
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorWidth: Number(
                    e.target.value
                  )
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />

          <label>
            Door Height
          </label>

          <input
            type="number"
            value={
              selectedObject.doorHeight || 4
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorHeight: Number(
                    e.target.value
                  )
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />

          <label>
            Door Side
          </label>

          <select
            value={
              selectedObject.doorSide ||
              "front"
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorSide:
                    e.target.value
                }
              )
            }
            style={{
              width: "100%"
            }}
          >
            <option value="front">
              Front
            </option>

            <option value="left">
              Left
            </option>

            <option value="right">
              Right
            </option>

            <option value="back">
              Back
            </option>
          </select>

          <br />
          <br />

          <label>
            Door X
          </label>

          <input
            type="number"
            value={
              selectedObject.doorOffsetX || 0
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorOffsetX: Number(
                    e.target.value
                  )
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />

          <label>
            Door Y
          </label>

          <input
            type="number"
            value={
              selectedObject.doorOffsetY || 0
            }
            onChange={(e) =>
              updateObject(
                selectedObject.id,
                {
                  doorOffsetY: Number(
                    e.target.value
                  )
                }
              )
            }
            style={{
              width: "100%"
            }}
          />

          <br />
          <br />
        </>
      )}

      <label>
        Position X
      </label>

      <input
        type="number"
        value={selectedObject.position[0]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              position: [
                Number(e.target.value),
                selectedObject.position[1],
                selectedObject.position[2]
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      <label>
        Position Y
      </label>

      <input
        type="number"
        value={selectedObject.position[1]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              position: [
                selectedObject.position[0],
                Number(e.target.value),
                selectedObject.position[2]
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      <label>
        Position Z
      </label>

      <input
        type="number"
        value={selectedObject.position[2]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              position: [
                selectedObject.position[0],
                selectedObject.position[1],
                Number(e.target.value)
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />

      <br />
      <br />

      <label>
        Rotation Y
      </label>

      <input
        type="number"
        value={
          selectedObject.rotation
            ? selectedObject.rotation[1]
            : 0
        }
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              rotation: [
                0,
                Number(e.target.value),
                0
              ]
            }
          )
        }
        style={{
          width: "100%"
        }}
      />
    </>
  );
}




