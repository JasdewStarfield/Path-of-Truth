ServerEvents.recipes(event => {
  //两种终极锭
  event.recipes.create.mechanical_crafting('createchromaticreturn:multiplite_ingot', [
    'AIHGFEDCB',
    'BAIHGFEDC',
    'CBAIHGFED',
    'DCBAIHGFE',
    'EDCBAIHGF',
    'FEDCBAIHG',
    'GFEDCBAIH',
    'HGFEDCBAI',
    'IHGFEDCBA'
  ], {
    A:'createchromaticreturn:glowing_ingot',
    B:'createchromaticreturn:refined_radiance',
    C:'createchromaticreturn:silkstrum',
    D:'createchromaticreturn:silkstrum_book',
    E:'createchromaticreturn:industrium_book',
    F:'createchromaticreturn:durasteel_book',
    G:'createchromaticreturn:shadow_steel',
    H:'createchromaticreturn:industrium_ingot',
    I:'createchromaticreturn:durasteel_ingot'
  })
  event.recipes.create.mechanical_crafting('createchromaticreturn:antiplite_ingot', [
    'AIHGFEDCB',
    'BAIHGFEDC',
    'CBAIHGFED',
    'DCBAIHGFE',
    'EDCBAIHGF',
    'FEDCBAIHG',
    'GFEDCBAIH',
    'HGFEDCBAI',
    'IHGFEDCBA'
  ], {
    I:'createchromaticreturn:glowing_ingot',
    H:'createchromaticreturn:refined_radiance',
    G:'createchromaticreturn:silkstrum',
    F:'createchromaticreturn:silkstrum_book',
    E:'createchromaticreturn:industrium_book',
    D:'createchromaticreturn:durasteel_book',
    C:'createchromaticreturn:shadow_steel',
    B:'createchromaticreturn:industrium_ingot',
    A:'createchromaticreturn:durasteel_ingot'
  })
})