export default function PropertyPanel({
  selectedObject,
  updateObject
}) {
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

      <label>Color</label>

      <input
        type="color"
        value={selectedObject.color}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              color:
                e.target.value
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

      <label>Width</label>

      <input
        type="number"
        value={selectedObject.size[0]}
        onChange={(e) =>
          updateObject(
            selectedObject.id,
            {
              size: [
                Number(
                  e.target.value
                ),
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
                Number(
                  e.target.value
                ),
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
                Number(
                  e.target.value
                )
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