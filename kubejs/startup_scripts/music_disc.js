let music_list = {
  pluto_nocturnus: 426,   // duration in seconds
  quam_admirabile_mundi: 482,
  yggdrasil_original_mix: 447
};

// put sound to .minecraft\kubejs\assets\kubejs\sounds (sound must be .ogg mono otherwise it will not be 3-dimensional)
// also you need to add sound to sounds.json (.minecraft\kubejs\assets\kubejs) 
StartupEvents.registry('sound_event', e => {
    Object.keys(music_list).forEach(key => {
      e.create(`music.${key}`) 
  })
})


StartupEvents.registry('item', e => {
  Object.keys(music_list).forEach((key) => {
    let value = music_list[key]  
      e.create(`music_disc_${key}`, "music_disc")
        .song(`kubejs:music.${key}`, value)
        .displayName("Music Disc")
        .texture(`kubejs:item/disc/music_disc_${key}`) // put textures file to .minecraft\kubejs\assets\kubejs\textures\item
        .tag("music_discs") // 1.20+ music discs require special tag to enable jukebox functionality (if you want music discs to be obtainable from creepers then use "creeper_drop_music_discs" tag insted)
        .translationKey(`item.kubejs.music_disc_${key}`) //To set disc description add lang file (en_us.json, ru_ru.json, etc.) to the .minecraft\kubejs\assets\kubejs\lang and add entry for every translation key
  })
  e.create("incomplete_music_disc_pluto_nocturnus", 'create:sequenced_assembly').displayName('Incomplete Music Disc').tooltip('Jacky Blackson - Pluto Nocturnus - (Unreleased)')
  e.create("disc_fragment_yggdrasil").displayName('Mysterious Disc Fragment').tooltip('You can only see a faint line of text: Yggdrasil...')
})