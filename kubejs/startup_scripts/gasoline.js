StartupEvents.registry('block', (event) => {

})

StartupEvents.registry('fluid', (event) => {
	//液化石油气
	event.create('lpg')
		.thinTexture(0xE3FFFE)
		.bucketColor(0xE3FFFE)
		.displayName('LPG')
		.createAttributes().dropOff(2).tickDelay(40)
	//润滑油
	event.create('lubricant')
		.thinTexture(0xF6FFDD)
		.bucketColor(0xF6FFDD)
		.displayName('Lubricant')
		.createAttributes().dropOff(2).tickDelay(40)
	//重油
	event.create('heavy_oil')
		.thinTexture(0x30322B)
		.bucketColor(0x30322B)
		.displayName('heavy_oil')
		.createAttributes().dropOff(2).tickDelay(40)
	//液态塑料
	event.create('liquid_plastic')
		.thickTexture(0xFBFFFE)
		.bucketColor(0xFBFFFE)
		.displayName('Liquid Plastic')
		.createAttributes().dropOff(2).tickDelay(40)
})
