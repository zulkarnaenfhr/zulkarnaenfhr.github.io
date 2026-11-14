import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const createJet = () => {
	const jet = new THREE.Group();
	const white = new THREE.MeshStandardMaterial({ color: 0xf2f4f2, metalness: 0.7, roughness: 0.25 });
	const navy = new THREE.MeshStandardMaterial({ color: 0x173b67, metalness: 0.55, roughness: 0.22 });
	const red = new THREE.MeshStandardMaterial({ color: 0xd52b35, metalness: 0.45, roughness: 0.25 });
	const glass = new THREE.MeshStandardMaterial({ color: 0x102d4d, emissive: 0x063a62, metalness: 0.5, roughness: 0.12 });

	const nose = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.82, 16), white);
	nose.rotation.z = -Math.PI / 2;
	nose.position.x = 0.56;
	jet.add(nose);

	const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.05, 16), white);
	fuselage.rotation.z = Math.PI / 2;
	fuselage.position.x = -0.12;
	jet.add(fuselage);

	const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.025, 0.22), red);
	stripe.position.set(-0.18, 0.16, 0);
	stripe.rotation.z = -0.06;
	jet.add(stripe);

	const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 12), glass);
	cockpit.scale.set(1.35, 0.5, 0.8);
	cockpit.position.set(0.15, 0.12, 0);
	jet.add(cockpit);

	const wingShape = new THREE.Shape();
	wingShape.moveTo(0.25, 0);
	wingShape.lineTo(-0.45, 0.85);
	wingShape.lineTo(-0.72, 0.78);
	wingShape.lineTo(-0.32, 0);
	wingShape.closePath();
	const wingGeometry = new THREE.ShapeGeometry(wingShape);
	[-1, 1].forEach((side) => {
		const wing = new THREE.Mesh(wingGeometry, navy);
		wing.scale.y = side;
		jet.add(wing);
	});

	const tail = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.45, 4), navy);
	tail.rotation.z = -Math.PI / 2;
	tail.position.set(-0.72, 0, 0);
	jet.add(tail);

	const engine = new THREE.PointLight(0x4da6ff, 1.4, 2.5);
	engine.position.x = -0.9;
	jet.add(engine);
	jet.rotation.set(0.1, 0.08, -0.16);
	return jet;
};

const createStars = () => {
	const positions = new Float32Array(300 * 3);
	for (let i = 0; i < positions.length; i += 3) {
		positions[i] = (Math.random() - 0.5) * 12;
		positions[i + 1] = (Math.random() - 0.5) * 7;
		positions[i + 2] = -2;
	}
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x9cefe5, size: 0.018, transparent: true, opacity: 0.48 }));
};

export default function SpaceScene() {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-4, 4, 2.5, -2.5, 0.1, 20);
		camera.position.z = 8;
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		const stars = createStars();
		scene.add(stars);
		const jet = createJet();
		jet.scale.setScalar(0.42);
		scene.add(jet);

		const route = new THREE.CatmullRomCurve3([
			new THREE.Vector3(-8.4, 0.65, 0), // A
			new THREE.Vector3(-5.8, 1.05, 0), // B
			new THREE.Vector3(-2.7, 1.28, 0), // C
			new THREE.Vector3(2.1, 0.9, 0), // D
			new THREE.Vector3(7.8, 0.15, 0), // E
			new THREE.Vector3(2.1, -0.55, 0), // D
			new THREE.Vector3(-2.7, -0.68, 0), // C
			new THREE.Vector3(-5.8, -0.25, 0), // B
			new THREE.Vector3(-8.4, 0.65, 0), // A
		], false, 'catmullrom', 0.08);
		const routeGeometry = new THREE.BufferGeometry().setFromPoints(route.getPoints(180));
		const flightPath = new THREE.Line(
			routeGeometry,
			new THREE.LineBasicMaterial({ color: 0x19f9d8, transparent: true, opacity: 0.18 }),
		);
		scene.add(flightPath);

		const glow = new THREE.Mesh(new THREE.CircleGeometry(1.1, 32), new THREE.MeshBasicMaterial({ color: 0x0b5361, transparent: true, opacity: 0.11 }));
		glow.position.set(1.5, -0.1, -1);
		scene.add(glow);
		scene.add(new THREE.AmbientLight(0xb8ffff, 1.8));
		const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
		keyLight.position.set(-3, 4, 5);
		scene.add(keyLight);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frameId;
		const resize = () => {
			const width = container.clientWidth;
			const height = container.clientHeight;
			const aspect = width / height;
			camera.left = -4 * aspect;
			camera.right = 4 * aspect;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
		};
		resize();

		const animate = (time) => {
			if (!reducedMotion) {
				const seconds = time * 0.001;
				const progress = (seconds * 0.009) % 1;
				const position = route.getPointAt(progress);
				const tangent = route.getTangentAt(progress).normalize();
				jet.position.copy(position);
				jet.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), tangent);
				stars.rotation.z = seconds * 0.004;
			} else {
				jet.position.copy(route.getPointAt(0));
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
	}, []);

	return <div className="space-scene" ref={containerRef} aria-hidden="true" />;
}
