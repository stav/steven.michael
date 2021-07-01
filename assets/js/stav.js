(()=>{
  // If day/night mode not set then set to dark mode
	if ( localStorage.getItem('dark_mode') === null ) {
		localStorage.setItem('dark_mode', 1)
		console.log('Set default to dark mode')
	}
})()
