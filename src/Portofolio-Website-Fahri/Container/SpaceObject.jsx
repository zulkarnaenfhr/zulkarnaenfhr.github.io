import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const material = (color, emissive = 0x000000) => new THREE.MeshStandardMaterial({
	color,
	emissive,
	emissiveIntensity: emissive ? 0.7 : 0,
	metalness: 0.6,
	roughness: 0.28,
});

const buildObject = (variant) => {
	const group = new THREE.Group();
	const cyan = material(0x19f9d8, 0x064c49);
	const navy = material(0x173b67, 0x071b36);
	const white = material(0xdceceb);
	const red = material(0xd52b35, 0x35090b);

	if (variant === 'about') {
		group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 2), material(0x0d3652, 0x052034)));
		const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.018, 8, 64), cyan);
		ring.rotation.set(0.75, 0.2, -0.25);
		group.add(ring);
	} else if (variant === 'experience') {
		const body = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), white);
		group.add(body);
		[-1, 1].forEach((side) => {
			const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.38), navy);
			panel.position.x = side * 0.72;
			group.add(panel);
		});
		const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.8, 8), cyan);
		antenna.position.y = 0.62;
		group.add(antenna);
	} else if (variant === 'projects') {
		const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), cyan);
		group.add(core);
		const frame = new THREE.Mesh(new THREE.TorusGeometry(1.02, 0.018, 8, 48), navy);
		frame.rotation.x = Math.PI / 2;
		group.add(frame);
		const frame2 = frame.clone();
		frame2.rotation.y = Math.PI / 2;
		group.add(frame2);
	} else {
		const portal = new THREE.Mesh(new THREE.TorusKnotGeometry(0.62, 0.11, 96, 12), cyan);
		group.add(portal);
		const signal = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.012, 8, 64), red);
		signal.rotation.x = Math.PI / 2;
		group.add(signal);
	}

	return group;
};

export default function SpaceObject({ variant = 'about' }) {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
		camera.position.z = 4.2;
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		const object = buildObject(variant);
		scene.add(object);
		scene.add(new THREE.AmbientLight(0x9edbd5, 1.7));
		const light = new THREE.DirectionalLight(0xffffff, 2.8);
		light.position.set(-3, 4, 5);
		scene.add(light);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frameId;
		const resize = () => {
			const { clientWidth, clientHeight } = container;
			camera.aspect = clientWidth / clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(clientWidth, clientHeight, false);
		};
		resize();
		const animate = (time) => {
			if (!reducedMotion) {
				const seconds = time * 0.001;
				object.rotation.y = seconds * 0.22;
				object.rotation.x = Math.sin(seconds * 0.45) * 0.12;
			}
			renderer.render(scene, camera);
			frameId = requestAnimationFrame(animate);
		};
		frameId = requestAnimationFrame(animate);
		window.addEventListener('resize', resize);

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener('resize', resize);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, [variant]);

	return <div className={`space-object space-object-${variant}`} ref={containerRef} aria-hidden="true" />;
}
