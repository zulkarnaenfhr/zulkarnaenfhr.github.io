import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/*
 * Alien invasion page background (fixed behind every section).
 * A mothership hangs over a planet horizon and deploys a fleet of saucers.
 * Saucers patrol, fire tractor beams at the surface and shoot plasma at the
 * SpaceCapt jet, which loops through the fleet and shoots back. Destroyed
 * saucers spin down, explode and are re-deployed from the mothership.
 * Scrolling the page flies the camera down toward the planet, while a
 * second, distant fleet keeps crossing the whole sky.
 */

const ALIEN = 0x8dff6a;
const LASER = 0x19f9d8;
const TAU = Math.PI * 2;
const X_AXIS = new THREE.Vector3(1, 0, 0);
const GROUND_Y = -3.5;

const rand = (min, max) => min + Math.random() * (max - min);
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const makeGlowTexture = () => {
	const canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;
	const ctx = canvas.getContext('2d');
	const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
	gradient.addColorStop(0, 'rgba(255,255,255,1)');
	gradient.addColorStop(0.25, 'rgba(255,255,255,0.55)');
	gradient.addColorStop(1, 'rgba(255,255,255,0)');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 64, 64);
	return new THREE.CanvasTexture(canvas);
};

const glowSprite = (texture, color, scale, opacity = 1) => {
	const sprite = new THREE.Sprite(
		new THREE.SpriteMaterial({ map: texture, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }),
	);
	sprite.scale.setScalar(scale);
	return sprite;
};

/* ---------- models ---------- */

const createJet = (glowTexture) => {
	const jet = new THREE.Group();
	const white = new THREE.MeshStandardMaterial({ color: 0xf2f4f2, metalness: 0.7, roughness: 0.25 });
	const navy = new THREE.MeshStandardMaterial({ color: 0x173b67, metalness: 0.55, roughness: 0.22, side: THREE.DoubleSide });
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
	jet.add(stripe);

	const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 12), glass);
	cockpit.scale.set(1.35, 0.5, 0.8);
	cockpit.position.set(0.15, 0.12, 0);
	jet.add(cockpit);

	// swept wings lie flat in the XZ plane
	const wingShape = new THREE.Shape();
	wingShape.moveTo(0.25, 0);
	wingShape.lineTo(-0.45, 0.85);
	wingShape.lineTo(-0.72, 0.78);
	wingShape.lineTo(-0.32, 0);
	wingShape.closePath();
	const wingGeometry = new THREE.ShapeGeometry(wingShape);
	[-1, 1].forEach((side) => {
		const wing = new THREE.Mesh(wingGeometry, navy);
		wing.rotation.x = side * Math.PI / 2;
		jet.add(wing);
	});

	const fin = new THREE.Mesh(new THREE.ShapeGeometry(wingShape), navy);
	fin.scale.set(0.5, 0.45, 1);
	fin.position.x = -0.42;
	jet.add(fin);

	const engine = glowSprite(glowTexture, 0x4da6ff, 0.7);
	engine.position.x = -0.78;
	jet.add(engine);
	const light = new THREE.PointLight(0x4da6ff, 1.2, 3);
	light.position.x = -0.9;
	jet.add(light);
	return { group: jet, engine };
};

const createBeamMaterial = () =>
	new THREE.ShaderMaterial({
		uniforms: {
			uTime: { value: 0 },
			uOpacity: { value: 0 },
			uColor: { value: new THREE.Color(ALIEN) },
		},
		vertexShader: `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			uniform float uTime;
			uniform float uOpacity;
			uniform vec3 uColor;
			varying vec2 vUv;
			void main() {
				float fade = 0.18 + 0.82 * vUv.y;
				float bands = 0.6 + 0.4 * sin(vUv.y * 46.0 + uTime * 7.0);
				float streaks = 0.65 + 0.35 * sin(vUv.x * 6.2831 * 7.0 - uTime * 1.6);
				gl_FragColor = vec4(uColor, uOpacity * fade * bands * streaks * 0.42);
			}
		`,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		side: THREE.DoubleSide,
	});

const createSaucer = (shared, glowTexture) => {
	const group = new THREE.Group();
	const body = new THREE.Group();
	group.add(body);

	const hull = new THREE.Mesh(shared.hullGeometry, shared.hull);
	hull.scale.set(1, 0.22, 1);
	body.add(hull);

	const rim = new THREE.Mesh(shared.rimGeometry, shared.rim);
	rim.rotation.x = Math.PI / 2;
	body.add(rim);

	const dome = new THREE.Mesh(shared.domeGeometry, shared.dome);
	dome.position.y = 0.06;
	body.add(dome);

	const belly = new THREE.Mesh(shared.bellyGeometry, shared.belly);
	belly.rotation.x = Math.PI / 2;
	belly.position.y = -0.1;
	body.add(belly);

	for (let i = 0; i < 10; i += 1) {
		const bulb = new THREE.Mesh(shared.bulbGeometry, i % 2 ? shared.bulbA : shared.bulbB);
		const angle = (i / 10) * TAU;
		bulb.position.set(Math.cos(angle) * 0.47, -0.01, Math.sin(angle) * 0.47);
		body.add(bulb);
	}

	const glow = glowSprite(glowTexture, ALIEN, 0.9, 0.5);
	glow.position.y = -0.14;
	group.add(glow);

	// tractor beam: tip sits on the saucer, base reaches the ground (scaled per frame)
	const beamMaterial = createBeamMaterial();
	const beam = new THREE.Mesh(shared.beamGeometry, beamMaterial);
	beam.position.y = -0.1;
	group.add(beam);

	// particles being pulled up the beam
	const liftCount = 18;
	const liftPositions = new Float32Array(liftCount * 3);
	const liftSeeds = Array.from({ length: liftCount }, () => ({ angle: rand(0, TAU), offset: Math.random(), speed: rand(0.25, 0.5) }));
	const liftGeometry = new THREE.BufferGeometry();
	liftGeometry.setAttribute('position', new THREE.BufferAttribute(liftPositions, 3));
	const liftMaterial = new THREE.PointsMaterial({ color: 0xd8ffcc, size: 0.05, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
	const lift = new THREE.Points(liftGeometry, liftMaterial);
	lift.position.y = -0.1;
	group.add(lift);

	return { group, body, glow, beam, beamMaterial, lift, liftSeeds, liftMaterial };
};

const createMothership = (glowTexture) => {
	const group = new THREE.Group();
	const spinner = new THREE.Group();
	group.add(spinner);

	const hullMaterial = new THREE.MeshStandardMaterial({ color: 0x1d2c36, metalness: 0.85, roughness: 0.35 });
	const hull = new THREE.Mesh(new THREE.SphereGeometry(2.4, 56, 24), hullMaterial);
	hull.scale.set(1, 0.17, 1);
	spinner.add(hull);

	const dome = new THREE.Mesh(
		new THREE.SphereGeometry(1.05, 40, 16, 0, TAU, 0, Math.PI / 2),
		new THREE.MeshStandardMaterial({ color: 0x24404a, metalness: 0.7, roughness: 0.25, emissive: 0x0c2a1a, emissiveIntensity: 0.6 }),
	);
	dome.scale.y = 0.55;
	dome.position.y = 0.22;
	spinner.add(dome);

	const ring = new THREE.Mesh(
		new THREE.TorusGeometry(2.42, 0.05, 8, 120),
		new THREE.MeshStandardMaterial({ color: 0x24392c, emissive: ALIEN, emissiveIntensity: 0.35, metalness: 0.6, roughness: 0.4 }),
	);
	ring.rotation.x = Math.PI / 2;
	spinner.add(ring);

	const lightCount = 40;
	const lights = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff }), lightCount);
	const dummy = new THREE.Object3D();
	for (let i = 0; i < lightCount; i += 1) {
		const angle = (i / lightCount) * TAU;
		dummy.position.set(Math.cos(angle) * 2.18, -0.16, Math.sin(angle) * 2.18);
		dummy.updateMatrix();
		lights.setMatrixAt(i, dummy.matrix);
		lights.setColorAt(i, new THREE.Color(ALIEN));
	}
	spinner.add(lights);

	const core = new THREE.Mesh(
		new THREE.CircleGeometry(0.75, 40),
		new THREE.MeshBasicMaterial({ color: ALIEN, transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
	);
	core.rotation.x = Math.PI / 2;
	core.position.y = -0.42;
	group.add(core);

	const coreGlow = glowSprite(glowTexture, ALIEN, 3.4, 0.55);
	coreGlow.position.y = -0.55;
	group.add(coreGlow);

	const coreLight = new THREE.PointLight(ALIEN, 6, 9, 1.6);
	coreLight.position.y = -1;
	group.add(coreLight);

	return { group, spinner, lights, lightCount, core, coreGlow, coreLight };
};

const createPlanet = () => {
	const group = new THREE.Group();
	const radius = 16;
	const planet = new THREE.Mesh(
		new THREE.SphereGeometry(radius, 96, 48),
		new THREE.MeshStandardMaterial({ color: 0x030a14, roughness: 1, metalness: 0, emissive: 0x020812, emissiveIntensity: 1 }),
	);
	group.add(planet);

	const atmosphere = new THREE.Mesh(
		new THREE.SphereGeometry(radius * 1.045, 96, 48),
		new THREE.ShaderMaterial({
			uniforms: { uColor: { value: new THREE.Color(LASER) } },
			vertexShader: `
				varying vec3 vNormal;
				varying vec3 vView;
				void main() {
					vec4 mv = modelViewMatrix * vec4(position, 1.0);
					vNormal = normalize(normalMatrix * normal);
					vView = normalize(-mv.xyz);
					gl_Position = projectionMatrix * mv;
				}
			`,
			fragmentShader: `
				uniform vec3 uColor;
				varying vec3 vNormal;
				varying vec3 vView;
				void main() {
					float rim = pow(1.0 - abs(dot(vNormal, vView)), 3.0);
					gl_FragColor = vec4(uColor, rim * 0.55);
				}
			`,
			side: THREE.BackSide,
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		}),
	);
	group.add(atmosphere);

	// city lights scattered over the visible cap
	const count = 420;
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i += 1) {
		const phi = Math.sqrt(Math.random()) * 0.55;
		const lambda = rand(0, TAU);
		const r = radius + 0.02;
		positions[i * 3] = r * Math.sin(phi) * Math.cos(lambda);
		positions[i * 3 + 1] = r * Math.cos(phi);
		positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(lambda);
	}
	const cityGeometry = new THREE.BufferGeometry();
	cityGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	const cities = new THREE.Points(
		cityGeometry,
		new THREE.PointsMaterial({ color: 0xffc56b, size: 0.06, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }),
	);
	group.add(cities);

	group.position.set(2.5, GROUND_Y - radius, -4);
	return group;
};

const createStars = () => {
	const count = 700;
	const positions = new Float32Array(count * 3);
	for (let i = 0; i < count; i += 1) {
		positions[i * 3] = rand(-30, 30);
		positions[i * 3 + 1] = rand(-6, 18);
		positions[i * 3 + 2] = rand(-30, -12);
	}
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	return new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0xbff7ef, size: 0.06, transparent: true, opacity: 0.7, depthWrite: false }));
};

/* ---------- effects pools ---------- */

const createLaserPool = (count) => {
	const geometry = new THREE.CylinderGeometry(0.022, 0.022, 0.65, 6);
	geometry.rotateZ(Math.PI / 2);
	const material = new THREE.MeshBasicMaterial({ color: LASER, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
	return Array.from({ length: count }, () => {
		const mesh = new THREE.Mesh(geometry, material);
		mesh.visible = false;
		return { mesh, velocity: new THREE.Vector3(), life: 0 };
	});
};

const createPlasmaPool = (count, glowTexture) =>
	Array.from({ length: count }, () => {
		const mesh = glowSprite(glowTexture, ALIEN, 0.32);
		mesh.visible = false;
		return { mesh, velocity: new THREE.Vector3(), life: 0 };
	});

const createExplosionPool = (count, glowTexture) =>
	Array.from({ length: count }, () => {
		const particles = 46;
		const positions = new Float32Array(particles * 3);
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const material = new THREE.PointsMaterial({ color: 0xffb347, size: 0.09, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
		const points = new THREE.Points(geometry, material);
		const flash = glowSprite(glowTexture, 0xffd27a, 0.1, 0);
		const group = new THREE.Group();
		group.add(points, flash);
		group.visible = false;
		const velocities = Array.from({ length: particles }, () => new THREE.Vector3());
		return { group, points, flash, positions, velocities, life: 0, duration: 1, size: 1 };
	});

/* ---------- component ---------- */

export default function AlienInvasionBackground() {
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return undefined;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
		camera.position.set(0, 0.4, 12);
		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		const glowTexture = makeGlowTexture();

		scene.add(new THREE.AmbientLight(0x9fc9d6, 1.1));
		scene.add(new THREE.HemisphereLight(0x9cefe5, 0x0a1426, 0.9));
		const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
		keyLight.position.set(-4, 5, 6);
		scene.add(keyLight);

		const stars = createStars();
		scene.add(stars);

		// everything in the action lives on a stage we can shift for narrow screens
		const stage = new THREE.Group();
		scene.add(stage);

		stage.add(createPlanet());

		const mother = createMothership(glowTexture);
		mother.group.position.set(3.8, 3.5, -6.5);
		mother.group.rotation.z = -0.06;
		stage.add(mother.group);
		const bay = new THREE.Vector3(3.8, 2.9, -6.5);

		const shared = {
			hullGeometry: new THREE.SphereGeometry(0.5, 36, 16),
			rimGeometry: new THREE.TorusGeometry(0.5, 0.035, 8, 48),
			domeGeometry: new THREE.SphereGeometry(0.22, 28, 12, 0, TAU, 0, Math.PI / 2),
			bellyGeometry: new THREE.CircleGeometry(0.2, 28),
			bulbGeometry: new THREE.SphereGeometry(0.03, 8, 6),
			beamGeometry: (() => {
				const geometry = new THREE.ConeGeometry(0.85, 1, 40, 1, true);
				geometry.translate(0, -0.5, 0);
				return geometry;
			})(),
			hull: new THREE.MeshStandardMaterial({ color: 0x8fa3ad, metalness: 0.9, roughness: 0.28 }),
			rim: new THREE.MeshStandardMaterial({ color: 0x2c3c36, metalness: 0.7, roughness: 0.35, emissive: ALIEN, emissiveIntensity: 0.25 }),
			dome: new THREE.MeshStandardMaterial({ color: 0x5dffb0, metalness: 0.2, roughness: 0.05, emissive: 0x1d8a4c, emissiveIntensity: 0.9, transparent: true, opacity: 0.85 }),
			belly: new THREE.MeshBasicMaterial({ color: ALIEN, side: THREE.DoubleSide }),
			bulbA: new THREE.MeshBasicMaterial({ color: ALIEN }),
			bulbB: new THREE.MeshBasicMaterial({ color: 0xffd36b }),
		};

		const slots = [
			new THREE.Vector3(1.3, 1.4, -1),
			new THREE.Vector3(3.6, 0.5, 0.4),
			new THREE.Vector3(5.6, 1.7, -2),
			new THREE.Vector3(2.4, -0.7, 1.2),
			new THREE.Vector3(5.0, -0.3, -0.4),
		];

		const saucers = slots.map((slot, index) => {
			const saucer = createSaucer(shared, glowTexture);
			stage.add(saucer.group);
			return {
				...saucer,
				slot,
				phase: 'deploy',
				t: -index * 0.9, // stagger the opening deployment
				seed: rand(0, TAU),
				beamTimer: rand(1, 4),
				beaming: false,
				beamLevel: 0,
				fireTimer: rand(2, 4),
				velocity: new THREE.Vector3(),
				fall: new THREE.Vector3(),
			};
		});

		// distant fleet crossing the whole sky, independent of the stage
		const flybys = Array.from({ length: 6 }, (_, index) => {
			const saucer = createSaucer(shared, glowTexture);
			saucer.beam.visible = false;
			saucer.lift.visible = false;
			scene.add(saucer.group);
			const flyby = { ...saucer, speed: 0, direction: 1, delay: index * 2.2, wobble: rand(0, TAU) };
			saucer.group.visible = false;
			return flyby;
		});
		const launchFlyby = (flyby) => {
			flyby.direction = Math.random() < 0.5 ? 1 : -1;
			flyby.speed = rand(1.6, 3.4);
			const depth = rand(-16, -8);
			flyby.group.position.set(-flyby.direction * 22, rand(-2, 9), depth);
			flyby.group.scale.setScalar(rand(0.55, 1));
			flyby.group.visible = true;
		};
		const updateFlybys = (dt, time) => {
			flybys.forEach((flyby) => {
				if (!flyby.group.visible) {
					flyby.delay -= dt;
					if (flyby.delay <= 0) launchFlyby(flyby);
					return;
				}
				const { group } = flyby;
				group.position.x += flyby.direction * flyby.speed * dt;
				group.position.y += Math.sin(time * 1.3 + flyby.wobble) * dt * 0.35;
				group.rotation.z = -flyby.direction * 0.18;
				flyby.body.rotation.y += dt * 3;
				flyby.glow.material.opacity = 0.45 + Math.sin(time * 5 + flyby.wobble) * 0.1;
				if (Math.abs(group.position.x) > 24) {
					group.visible = false;
					flyby.delay = rand(1.5, 6);
				}
			});
		};

		const jet = createJet(glowTexture);
		jet.group.scale.setScalar(0.6);
		stage.add(jet.group);
		const jetRoute = new THREE.CatmullRomCurve3(
			[
				new THREE.Vector3(-1.2, 0.4, 2.2),
				new THREE.Vector3(1.6, 2.5, 1),
				new THREE.Vector3(5, 2.6, -0.5),
				new THREE.Vector3(7.2, 0.6, 0.4),
				new THREE.Vector3(5.6, -1.4, 2),
				new THREE.Vector3(2.6, -1.9, 2.6),
				new THREE.Vector3(0.4, -0.6, 1.4),
				new THREE.Vector3(2.4, 1.0, -0.2),
				new THREE.Vector3(4.4, 0.2, 1.4),
				new THREE.Vector3(1.0, -1.2, 2.4),
			],
			true,
			'catmullrom',
			0.4,
		);
		const jetState = { progress: 0, fireTimer: 1.2, shield: 0, prev: new THREE.Vector3() };
		const shield = glowSprite(glowTexture, LASER, 1.1, 0);
		stage.add(shield);

		const lasers = createLaserPool(24);
		lasers.forEach((laser) => stage.add(laser.mesh));
		const plasmas = createPlasmaPool(24, glowTexture);
		plasmas.forEach((plasma) => stage.add(plasma.mesh));
		const explosions = createExplosionPool(8, glowTexture);
		explosions.forEach((explosion) => stage.add(explosion.group));

		/* ----- helpers ----- */
		const tmp = new THREE.Vector3();
		const tmp2 = new THREE.Vector3();
		const rollQuat = new THREE.Quaternion();

		const spawnExplosion = (position, color, size, duration) => {
			const explosion = explosions.find((item) => !item.group.visible) || explosions[0];
			explosion.group.visible = true;
			explosion.group.position.copy(position);
			explosion.life = 0;
			explosion.duration = duration;
			explosion.size = size;
			explosion.points.material.color.set(color);
			explosion.flash.material.color.set(color);
			for (let i = 0; i < explosion.velocities.length; i += 1) {
				explosion.velocities[i].set(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(0.6, 2.4) * size);
				explosion.positions[i * 3] = 0;
				explosion.positions[i * 3 + 1] = 0;
				explosion.positions[i * 3 + 2] = 0;
			}
			explosion.points.geometry.attributes.position.needsUpdate = true;
		};

		const fireLaser = (from, direction) => {
			const laser = lasers.find((item) => !item.mesh.visible);
			if (!laser) return;
			laser.mesh.visible = true;
			laser.mesh.position.copy(from);
			laser.velocity.copy(direction).multiplyScalar(15);
			laser.mesh.quaternion.setFromUnitVectors(X_AXIS, direction);
			laser.life = 1.1;
		};

		const firePlasma = (from, target) => {
			const plasma = plasmas.find((item) => !item.mesh.visible);
			if (!plasma) return;
			plasma.mesh.visible = true;
			plasma.mesh.position.copy(from);
			plasma.velocity.copy(target).sub(from).normalize().multiplyScalar(6.5);
			plasma.life = 2.2;
		};

		/* ----- layout ----- */
		const layout = { wide: true, x: 0, y: 0 };
		const resize = () => {
			const width = container.clientWidth;
			const height = container.clientHeight;
			if (!width || !height) return;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height, false);
			// on wide screens keep the action to the right of the hero text
			layout.wide = camera.aspect >= 1.15;
			layout.x = layout.wide ? 0 : -3.1;
			layout.y = layout.wide ? 0 : 0.6;
			stage.scale.setScalar(layout.wide ? 1 : 0.72);
			stage.position.set(layout.x, layout.y, 0);
		};
		resize();

		const pointer = { x: 0, y: 0 };
		const onPointerMove = (event) => {
			pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
			pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
		};

		/* ----- simulation ----- */
		const updateSaucer = (saucer, dt, time) => {
			const { group } = saucer;
			saucer.t += dt;

			if (saucer.phase === 'deploy') {
				if (saucer.t < 0) {
					group.visible = false;
					return;
				}
				group.visible = true;
				const k = Math.min(saucer.t / 2.4, 1);
				const e = easeInOut(k);
				group.position.lerpVectors(bay, saucer.slot, e);
				group.position.y += Math.sin(k * Math.PI) * 0.6;
				group.scale.setScalar(0.15 + 0.85 * e);
				saucer.body.rotation.y += dt * 6;
				if (k >= 1) {
					saucer.phase = 'patrol';
					saucer.t = 0;
				}
			} else if (saucer.phase === 'patrol') {
				const s = time + saucer.seed;
				tmp.set(Math.sin(s * 0.55) * 0.6, Math.sin(s * 1.1) * 0.25, Math.cos(s * 0.45) * 0.45);
				tmp.add(saucer.slot);
				saucer.velocity.copy(tmp).sub(group.position).divideScalar(Math.max(dt, 0.001));
				group.position.copy(tmp);
				group.rotation.z = THREE.MathUtils.clamp(-saucer.velocity.x * 0.12, -0.35, 0.35);
				group.rotation.x = THREE.MathUtils.clamp(saucer.velocity.z * 0.12, -0.3, 0.3);
				saucer.body.rotation.y += dt * 2.2;

				saucer.beamTimer -= dt;
				if (saucer.beamTimer <= 0) {
					saucer.beaming = !saucer.beaming;
					saucer.beamTimer = saucer.beaming ? rand(2.5, 4.5) : rand(3, 7);
				}

				saucer.fireTimer -= dt;
				if (saucer.fireTimer <= 0 && jet.group.visible) {
					saucer.fireTimer = rand(2.2, 4.2);
					// aim near the jet; most shots miss so it reads as dodging
					tmp2.copy(jet.group.position).add(tmp.set(rand(-0.9, 0.9), rand(-0.7, 0.7), rand(-0.5, 0.5)));
					firePlasma(group.position, tmp2);
				}
			} else if (saucer.phase === 'down') {
				saucer.fall.y -= 3.2 * dt;
				group.position.addScaledVector(saucer.fall, dt);
				saucer.body.rotation.y += dt * 14;
				group.rotation.z += dt * 2.4;
				group.visible = Math.floor(saucer.t * 14) % 2 === 0;
				group.scale.setScalar(Math.max(1 - saucer.t * 0.5, 0.2));
				if (saucer.t > 1.3) {
					spawnExplosion(group.position, 0xff8a3d, 0.7, 0.9);
					saucer.phase = 'deploy';
					saucer.t = -rand(1.5, 3);
					group.rotation.set(0, 0, 0);
				}
			}

			// tractor beam
			const targetBeam = saucer.phase === 'patrol' && saucer.beaming ? 1 : 0;
			saucer.beamLevel += (targetBeam - saucer.beamLevel) * Math.min(dt * 3, 1);
			const beamLength = Math.max(group.position.y - GROUND_Y, 0.5) / group.scale.y;
			saucer.beam.scale.set(1, beamLength, 1);
			saucer.beam.visible = saucer.beamLevel > 0.01;
			saucer.beamMaterial.uniforms.uOpacity.value = saucer.beamLevel;
			saucer.beamMaterial.uniforms.uTime.value = time;
			saucer.glow.material.opacity = 0.35 + saucer.beamLevel * 0.5 + Math.sin(time * 6 + saucer.seed) * 0.08;

			saucer.lift.visible = saucer.beam.visible;
			saucer.liftMaterial.opacity = saucer.beamLevel * 0.9;
			if (saucer.lift.visible) {
				const attr = saucer.lift.geometry.attributes.position;
				saucer.liftSeeds.forEach((seed, i) => {
					const k = (seed.offset + time * seed.speed) % 1; // 0 = ground, 1 = saucer
					const radius = 0.7 * (1 - k) + 0.05;
					const angle = seed.angle + time * 0.8;
					attr.setXYZ(i, Math.cos(angle) * radius, -beamLength * (1 - k), Math.sin(angle) * radius);
				});
				attr.needsUpdate = true;
			}
		};

		const updateJet = (dt) => {
			jetState.progress = (jetState.progress + dt / 22) % 1;
			const position = jetRoute.getPointAt(jetState.progress);
			const tangent = jetRoute.getTangentAt(jetState.progress).normalize();
			const ahead = jetRoute.getTangentAt((jetState.progress + 0.01) % 1).normalize();
			jetState.prev.copy(jet.group.position);
			jet.group.position.copy(position);
			jet.group.quaternion.setFromUnitVectors(X_AXIS, tangent);
			// bank into turns
			const turn = tmp.crossVectors(tangent, ahead).z;
			rollQuat.setFromAxisAngle(X_AXIS, THREE.MathUtils.clamp(-turn * 40, -0.9, 0.9));
			jet.group.quaternion.multiply(rollQuat);
			jet.engine.scale.setScalar(0.55 + Math.random() * 0.25);

			jetState.fireTimer -= dt;
			if (jetState.fireTimer <= 0) {
				jetState.fireTimer = rand(0.45, 0.9);
				// target the nearest saucer roughly in front of the jet
				let best = null;
				let bestScore = Infinity;
				saucers.forEach((saucer) => {
					if (saucer.phase !== 'patrol') return;
					tmp2.copy(saucer.group.position).sub(position);
					const distance = tmp2.length();
					const facing = tmp2.normalize().dot(tangent);
					if (facing < 0.25) return;
					const score = distance / facing;
					if (score < bestScore) {
						bestScore = score;
						best = saucer;
					}
				});
				if (best) {
					const lead = best.group.position.distanceTo(position) / 15;
					tmp2.copy(best.group.position).addScaledVector(best.velocity, lead);
					if (Math.random() < 0.3) tmp2.add(tmp.set(rand(-0.8, 0.8), rand(-0.6, 0.6), 0));
					tmp2.sub(position).normalize();
					tmp.copy(position).addScaledVector(tangent, 0.4);
					fireLaser(tmp, tmp2);
				}
			}

			jetState.shield = Math.max(jetState.shield - dt * 2.5, 0);
			shield.position.copy(position);
			shield.material.opacity = jetState.shield * 0.8;
			shield.scale.setScalar(0.9 + (1 - jetState.shield) * 0.6);
		};

		const updateProjectiles = (dt) => {
			lasers.forEach((laser) => {
				if (!laser.mesh.visible) return;
				laser.life -= dt;
				laser.mesh.position.addScaledVector(laser.velocity, dt);
				if (laser.life <= 0) {
					laser.mesh.visible = false;
					return;
				}
				for (let i = 0; i < saucers.length; i += 1) {
					const saucer = saucers[i];
					if (saucer.phase !== 'patrol') continue;
					if (laser.mesh.position.distanceTo(saucer.group.position) < 0.5) {
						laser.mesh.visible = false;
						spawnExplosion(saucer.group.position, 0xffb347, 1, 1.1);
						saucer.phase = 'down';
						saucer.t = 0;
						saucer.beaming = false;
						saucer.fall.set(rand(-0.6, 0.6), rand(0.2, 0.8), rand(-0.3, 0.3));
						break;
					}
				}
			});

			plasmas.forEach((plasma) => {
				if (!plasma.mesh.visible) return;
				plasma.life -= dt;
				plasma.mesh.position.addScaledVector(plasma.velocity, dt);
				plasma.mesh.scale.setScalar(0.28 + Math.sin(plasma.life * 30) * 0.05);
				if (plasma.life <= 0) {
					plasma.mesh.visible = false;
					return;
				}
				if (plasma.mesh.position.distanceTo(jet.group.position) < 0.45) {
					plasma.mesh.visible = false;
					jetState.shield = 1;
					spawnExplosion(plasma.mesh.position, LASER, 0.45, 0.6);
				}
			});
		};

		const updateExplosions = (dt) => {
			explosions.forEach((explosion) => {
				if (!explosion.group.visible) return;
				explosion.life += dt;
				const k = explosion.life / explosion.duration;
				if (k >= 1) {
					explosion.group.visible = false;
					return;
				}
				for (let i = 0; i < explosion.velocities.length; i += 1) {
					const v = explosion.velocities[i];
					v.multiplyScalar(1 - dt * 1.8);
					explosion.positions[i * 3] += v.x * dt;
					explosion.positions[i * 3 + 1] += v.y * dt;
					explosion.positions[i * 3 + 2] += v.z * dt;
				}
				explosion.points.geometry.attributes.position.needsUpdate = true;
				explosion.points.material.opacity = 1 - k;
				explosion.points.material.size = 0.1 * explosion.size * (1 - k * 0.5);
				explosion.flash.material.opacity = Math.max(1 - k * 3, 0);
				explosion.flash.scale.setScalar(explosion.size * (0.6 + k * 2.6));
			});
		};

		const chaseColor = new THREE.Color();
		const updateMothership = (time) => {
			mother.spinner.rotation.y = time * 0.12;
			mother.group.position.y = 3.5 + Math.sin(time * 0.4) * 0.08;
			const pulse = 0.5 + 0.5 * Math.sin(time * 2.2);
			mother.coreGlow.material.opacity = 0.35 + pulse * 0.35;
			mother.coreLight.intensity = 4 + pulse * 4;
			for (let i = 0; i < mother.lightCount; i += 1) {
				const chase = (Math.sin(time * 4 - i * 0.6) + 1) / 2;
				chaseColor.setHex(ALIEN).multiplyScalar(0.25 + chase * 0.95);
				mother.lights.setColorAt(i, chaseColor);
			}
			mother.lights.instanceColor.needsUpdate = true;
		};

		/* ----- loop ----- */
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const clock = new THREE.Clock();
		let visible = true;
		let frameId;
		const scroll = { progress: 0, opacity: '' };

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		});
		observer.observe(container);

		const renderStatic = () => {
			// a calm still frame: fleet in position, two beams on, jet mid-route
			saucers.forEach((saucer, i) => {
				saucer.phase = 'patrol';
				saucer.beaming = i % 2 === 0;
				saucer.beamLevel = saucer.beaming ? 1 : 0;
				saucer.group.visible = true;
				saucer.group.scale.setScalar(1);
				saucer.group.position.copy(saucer.slot);
				updateSaucer(saucer, 0, 0);
			});
			jetState.progress = 0.12;
			updateJet(0);
			updateMothership(0);
			renderer.render(scene, camera);
		};

		const animate = () => {
			frameId = requestAnimationFrame(animate);
			const dt = Math.min(clock.getDelta(), 0.05);
			if (!visible || document.hidden) return;
			const time = clock.elapsedTime;

			// page scroll progress: 0 at the hero, 1 at the footer
			const page = container.parentElement;
			if (page) {
				const rect = page.getBoundingClientRect();
				const travel = rect.height - window.innerHeight;
				const target = travel > 0 ? THREE.MathUtils.clamp(-rect.top / travel, 0, 1) : 0;
				scroll.progress += (target - scroll.progress) * Math.min(dt * 4, 1);
			}
			const p = scroll.progress;
			const pastHero = THREE.MathUtils.smoothstep(p, 0.02, 0.16);

			// leave the hero: recenter the battle and pull back; then sink toward the planet
			stage.position.x = layout.x + (layout.wide ? pastHero * 0.8 : 0);
			const baseY = 0.4 - p * 2.6;
			const baseZ = 12 + pastHero * 3.5;
			camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.03;
			camera.position.y += (baseY - pointer.y * 0.45 - camera.position.y) * 0.05;
			camera.position.z += (baseZ - camera.position.z) * 0.05;
			camera.lookAt(0, 0.3 + p * 1.2, 0);

			// dim behind content so text stays readable
			const opacity = (1 - pastHero * 0.5).toFixed(3);
			if (opacity !== scroll.opacity) {
				container.style.opacity = opacity;
				scroll.opacity = opacity;
			}

			stars.rotation.z = time * 0.003;
			updateMothership(time);
			saucers.forEach((saucer) => updateSaucer(saucer, dt, time));
			updateJet(dt);
			updateProjectiles(dt);
			updateExplosions(dt);
			updateFlybys(dt, time);
			shared.bulbA.color.setHex(Math.sin(time * 8) > 0 ? ALIEN : 0x2a5a24);
			shared.bulbB.color.setHex(Math.sin(time * 8) > 0 ? 0x5a4a20 : 0xffd36b);

			renderer.render(scene, camera);
		};

		const onResize = () => {
			resize();
			if (reducedMotion) renderer.render(scene, camera);
		};

		camera.lookAt(0, 0.3, 0);
		if (reducedMotion) {
			renderStatic();
		} else {
			frameId = requestAnimationFrame(animate);
			window.addEventListener('pointermove', onPointerMove);
		}
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(frameId);
			observer.disconnect();
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointermove', onPointerMove);
			scene.traverse((object) => {
				if (object.geometry) object.geometry.dispose();
				if (object.material) {
					(Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
				}
			});
			glowTexture.dispose();
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	return <div id="alienBackdrop" ref={containerRef} aria-hidden="true" />;
}
