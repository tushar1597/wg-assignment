import Box from "./box";

function ReactGridLayout({ columns, numberOfBoxes }) {
  const widthClass = `w-${columns}`;
  const data = Array.from({ length: numberOfBoxes });

  return (
    <>
      <div className="flex row grid">
        {data.map((elem, index) => {
          return <Box key={index} count={index + 1} widthClass={widthClass} />;
        })}
      </div>
    </>
  );
}

export default ReactGridLayout;
