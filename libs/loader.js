export const loadGLTF =(path) => {
	return new Promise ((resolve , reject) => {
		const loader = new GLTFLoader ();
		loader.load(path ,(gltf) => {
			resolve (gltf);
		});


	});
	
	
}
/*helper function to load video element*/

export const loadVideo = (path) => {
	return new Promise ((resolve , reject) => {
		const video = document.createElement('video');
		video.addEventListener('loadeddata', () => {
			resolve(video);
		});
		video.src = path;


	});




}