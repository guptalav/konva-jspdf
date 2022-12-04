import './App.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { jsPDF } from "jspdf";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src, 'anonymous');
  return (
    <Image
      image={img}
      x='40'
      y='50'
    />
  );
};

function App() {
  const stageRef = React.useRef(null);
  const [image, setImage] = React.useState(false);

  const handleExport = () => {
    var pdf = new jsPDF('l', 'px', [stageRef.current.width(), stageRef.current.height()]);
        pdf.setTextColor('#000000');
        console.log(stageRef.current.toDataURL({ pixelRatio: 2 }))
        // then put image on top of texts (so texts are not visible)
        pdf.addImage(
          stageRef.current.toDataURL({ pixelRatio: 2 }),
          0,
          0,
          stageRef.current.width(),
          stageRef.current.height()
        );

        pdf.save('canvas.pdf');
  };
  return (
    <div style={{margin: '10px'}}>
      Click on image:
      <br />
      <img
        className='image-logo'
        alt="1"
        src="https://picsum.photos/id/10/500/500"
        onClick={(e) => {
          console.log(e.target)
          setImage(e.target);
        }}
      />
      <img
        className='image-logo'
        alt="2"
        src="https://picsum.photos/id/11/500/500"
        onClick={(e) => {
          console.log(e.target)
          setImage(e.target);
        }}
      />
      <img
        className='image-logo'
        alt="3"
        src="https://picsum.photos/id/12/500/500"
        onClick={(e) => {
          console.log(e.target)
          setImage(e.target);
        }}
      />
      <img
        className='image-logo'
        alt="4"
        src="https://picsum.photos/id/13/500/500"
        onClick={(e) => {
          console.log(e.target)
          setImage(e.target);
        }}
      />
      <button onClick={handleExport}>Export</button>
      <div style={{
          width: "600px",
          height: "600px",
          border: "1px solid grey"
        }}>
        <Stage
          width="600"
          height="600"
          ref={stageRef}
        >
          <Layer>
            {image && <URLImage image={image} />}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
