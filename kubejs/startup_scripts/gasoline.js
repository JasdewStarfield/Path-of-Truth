StartupEvents.registry('item', (event) => {
	//塑胶
	event.create("plastic_chunk").displayName('Plastic Chunk')
})

StartupEvents.registry('block', (event) => {

})

StartupEvents.registry('fluid', (event) => {
	//液化石油气
	event.create('lpg')
	 .thinTexture(0xE3FFFE)
	 .bucketColor(0xE3FFFE)
	 .displayName('LPG')
	//润滑油
	event.create('lubricant')
	.thinTexture(0xF6FFDD)
	.bucketColor(0xF6FFDD)
	.displayName('Lubricant')
	//重油
	event.create('heavy_oil')
	.thinTexture(0x30322B)
	.bucketColor(0x30322B)
	.displayName('heavy_oil')
	//液态塑料
	event.create('liquid_plastic')
	.thickTexture(0xFBFFFE)
	.bucketColor(0xFBFFFE)
	.displayName('Liquid Plastic')
})
