import {loadGLTF , loadVideo} from "../libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;


document.addEventListener('DOMContentLoaded', () => {
	let video = null;
	const init = async() => {
		video = await loadVideo("../../assets/videos/sintel/goat.mp4");
		video.play();
		video,pause();
	}
	const start = async () => {
		//mockWithVideo("../../assets/mock-videos/musicband1.mp4");
		 //mockWithImage("../assets/mock-videos/musicband-bear.png");

		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container:  document.body,
			imageTargetSrc:'../assets/targets/goat.mind',
			uiLoading: "no",
		});
		const {renderer, scene, camera} = mindarThree;

		const video = await loadVideo("../../assets/videos/sintel/goat.mp4");
		const texture = new THREE.VideoTexture(video);

		const geometry = new THREE.PlaneGeometry(1, 700/848); // video aspect ratio 1 = width of video ,204/480 is the  height 
		const material = new THREE.MeshBasicMaterial({map: texture});
		const plane = new THREE.Mesh(geometry, material); //overlays the target image
		

		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(plane);

		anchor.onTargetFound = () => {
			video.play();
		} 
		anchor.onTargetLost = () => {
			video.pause();
		}
		

		await mindarThree.start();

		renderer.setAnimationLoop(() =>{ 
			renderer.render(scene, camera);
		});
	};
	const startButton = document.createElement("button");
  	startButton.textContent = "Please press here to access augmented reality camera";
	startButton.style.background = '#ADD8E6';
	startButton.style.color = 'white';
	startButton.style.width = '200px';
	startButton.style.height = '40px';
	startButton.style.borderRadius = '8px';
  	startButton.addEventListener("click", start);
	
  	document.body.appendChild(startButton);
	startButton.addEventListener("click", () => startButton.remove());
	//startButton.style.display = "none";
	//start();
	

});