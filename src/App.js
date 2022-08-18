import { useEffect, useState } from "react";
import HotjarElement from "./HotjarElement";
import Content from "./Content";
import html2canvas from 'html2canvas';

function App() {

  const [positions, setPositions] = useState({
    top: {
      height: 0,
    },
    bottom: {
      height: 0,
    },
    left: {
      width: 0,
      height: 0,
      top: 0
    },
    right: {
      width: 0,
      height: 0,
      top: 0
    },
    center: {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  });

  const download = (canvas) => {
    var link = document.createElement('a');
    link.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    link.download = 'image.png';
    link.click();
  }

  useEffect(() => {
    const nodeList = document.querySelectorAll(".app *");

    let documentHeight = window.innerHeight;
    let documentWidth = window.innerWidth;

    document.addEventListener("click", (e) => {
      html2canvas(document.body, { allowTaint: true, useCORS: true, width: documentWidth, height: documentHeight, y: document.documentElement.scrollTop }).then(function (canvas) {
        download(canvas);
      });
    });

    window.addEventListener("resize", () => {
      documentHeight = window.innerHeight;
      documentWidth = window.innerWidth;
    });

    nodeList.forEach((node) => {

      node.addEventListener("click", function (element) {
        element.preventDefault();
      });

      node.addEventListener("mouseover", function (element) {
        const rect = element.target.getBoundingClientRect();

        setPositions({
          top: {
            height: rect.top < 0 ? 0 : rect.top,
          },
          bottom: {
            height: rect.bottom > documentHeight ? 0 : documentHeight - (rect.bottom),
          },
          left: {
            width: rect.left,
            height: rect.top < 0 ? rect.height - (rect.top * -1) : rect.height,
            top: rect.top < 0 ? 0 : rect.top
          },
          right: {
            width: (documentWidth - rect.left - rect.width) < 0 ? 0 : documentWidth - rect.left - rect.width,
            height: rect.top < 0 ? rect.height - (rect.top * -1) : rect.height,
            top: rect.top < 0 ? 0 : rect.top
          },
          center: {
            width: rect.width,
            height: rect.top < 0 ? rect.height - (rect.top * -1) : rect.height,
            top: rect.top < 0 ? 0 : rect.top,
            left: rect.left,
          }
        });
      });
    });

  }, []);

  return (
    <>
      <HotjarElement positions={positions} />
      <div className="app">
        <Content />
      </div>
    </>
  );
}

export default App;
