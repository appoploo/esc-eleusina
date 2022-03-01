import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { useStore } from "../../store";

function H(props: { src: string }) {
  useFrame(({ mouse, camera, viewport }) => {
    if (ref.current) {
      ref.current.position.copy(camera.position);
      ref.current.rotation.copy(camera.rotation);
      ref.current.translateZ(-10);
      ref.current.translateX(viewport.width * mouse.x);
      ref.current.translateY(viewport.height * mouse.y);
      ref.current?.lookAt(camera.position);
    }
  });
  const ref = useRef<Mesh>();
  const texture = useLoader(TextureLoader, props.src);
  return (
    <sprite scale={10} ref={ref} position={[20, -5, 0]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
}

export function Hand() {
  const store = useStore();
  const found = store.inventory.find((s) => store.hand === s.id);
  return found ? <H src={found.src} /> : null;
}

Hand.getInitialProps = () => {
  const statusCode = 404;
  return { statusCode };
};

export default Hand;
