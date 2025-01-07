StartupEvents.registry('item', (event) => {
	//塑胶
	event.create("plastic_chunk").displayName('Plastic Chunk')
})

StartupEvents.registry('block', (event) => {

})

StartupEvents.registry('fluid', (event) => {
	//液化石油气
	event.create('lpg')
	 .thinTexture(0x00FFFF)
	 .bucketColor(0x00FFFF)
	 .displayName('LPG')
	//润滑油
	event.create('lubricant')
	.thinTexture(0x00FFFF)
	.bucketColor(0x00FFFF)
	.displayName('Lubricant')
	//重油
	event.create('heavy_oil')
	.thinTexture(0x00FFFF)
	.bucketColor(0x00FFFF)
	.displayName('heavy_oil')
	//液态塑料
	event.create('liquid_plastic')
	.thickTexture(0x00FFFF)
	.bucketColor(0x00FFFF)
	.displayName('Liquid Plastic')
})
