import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { yellowImg } from "../utils";
import { useRef, useState, useEffect } from "react";
import * as THREE from 'three';
import { models, sizes } from "../constants";

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  // camera controls
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to('#heading', { opacity: 1, y: 0 });
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.eventSource = document.getElementById('root');
    }
  }, []);
  

  return (
    <>
      <section className="common-padding">
        <div className="screen-max-width">
          <h2 id="heading" className="section-heading">
            Take a closer look.
          </h2>
          <div className="flex flex-col items-center mt-5">
            <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
              <ModelView 
                index={1}
                groupRef={small}
                gaspType="view1"
                controlRef={cameraControlSmall}
                setRotation={setSmallRotation}
                item={model}
                size={size}
              />
              <ModelView 
                index={2}
                groupRef={large}
                gaspType="view2"
                controlRef={cameraControlLarge}
                setRotation={setLargeRotation}
                item={model}
                size={size}
              />
              <canvas className="w-full h-full"
                style={{
                  position: 'fixed',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  overflow: 'hidden'
                }}
              >
              </canvas>
            </div>
            <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center ">
              <ul className="color-container gap-3">
                {models.map((item, i) => (
                  <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value}) => (
                  <p key={label}  onClick={() => setSize(value)} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}}>
                    {label}
                  </p>
                ))}
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Model;