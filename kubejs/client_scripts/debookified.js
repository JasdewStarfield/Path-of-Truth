// priority: 10
//Based on https://github.com/game-design-driven/Create-Prepare-to-Dye/blob/main/kubejs/client_scripts/tooltips/botaniaDebookified.js
function detectLanguage() {
    let dirtName = Text.translate("block.minecraft.dirt").getString()
    if (dirtName == "泥土") {
        return "zh_cn"
    } else if (dirtName == "Dirt") {
        return "en_us"
    } else {
        return "other"
    }
}

function snakeToCamel(str) {
    return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
}

function grabPage(camelCasedName, num, maxDepth) {
    maxDepth = maxDepth || 2;
    if (num > maxDepth) return "...";
    let key = `botania.page.${camelCasedName}${num}`;
    let translated = Text.translate(key).getString()
    if (!translated || translated === key || translated.startsWith('$(o)')) return ''
    return " " + translated + grabPage(camelCasedName, num + 1);
}
function parseBotaniaPageSyntax(str) {
    return str
        .replace(/\$\((p|.*?)\)/g, (match, content) => {
            switch (content) {
                default:
                    return '_' // starts
                case 'p':
                    return ''
                case '':
                case '0':
                case '/l':
                    return '@' // ends
            }
        }) // clean book references and replace with bold (_)
        .replace(/(\.\s*)([A-Z])/g, '. $2') //add a space after a period if it's followed by an uppercase letter without a space
        .replace(/__/g, '_')
        .replace(/@@/g, '@')
        .replace(/@/g, '_')
}

function sortObjectByKey(obj) {
    if (!obj) return obj;
    if (typeof obj !== "object") return obj;
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj = {};
  
    sortedKeys.forEach(key => {
        sortedObj[key] = obj[key];
    });
  
    return sortedObj;
}

const inconsistentNamesMap = {
    manaPylon: "pylon",
    rosaArcana: "arcanerose",
    naturaPylon: "aIntro",
    alfheimPortal: "aIntro",
    lightRelay: "luminizerTransport",
    detectorLightRelay: "luminizerTransport",
    forkLightRelay: "luminizerTransport",
    toggleLightRelay: "luminizerTransport",
    lightLauncher: "luminizerTransport",
    manaSpreader: "spreader",
    manaPool: "pool",
    dilutedPool: "pool",
    fabulousPool: "pool",
    elvenSpreader: "dreamwoodSpreader",
    enchanter: "manaEnchanting",
    manaDistributor: "distributor",
    manaFluxfield: "rfGenerator",
    twigWand: "wand",
    pump: "poolCart",
    craftyCrate: "craftCrate",
    apothecary_: "apothecary",
    gaiaPylon: "gaiaRitual",
    dreamwoodWand: "elfResources",
    shulkMeNot: "shulk_me_not",
    bellethorn: "bellethorne",
    dreadthorn: "dreadthorne",
};
function replaceInconsistentNames(str) {
    Object.entries(inconsistentNamesMap).forEach(([key, value]) => {
        if (key.endsWith("_") && str.includes(key.replace("_", ""))) {
        str = value;
        }
        str = str.replace(key, value);
    });
    return str;
}
// gen function body
global.doCreateBotaniaTooltipGen = (event) => {
    let obj = {};
    let cachedTargets = {};
    let langType = detectLanguage()
    let addAndCache = (item, description) => {
        if (item.isEmpty()) return
        let { id, descriptionId } = item
        AddCreateTooltips(id)
        cachedTargets[id] = 1
        obj[`${descriptionId}.tooltip.summary`] = description
    }
    Ingredient.of(/^botania:/).stacks.forEach((item) => {
        let cameCaseName = snakeToCamel(item.id.split(":")[1] + "");
        cameCaseName = replaceInconsistentNames(cameCaseName);
        let key = `botania.tagline.${cameCaseName}`;
        let translated = Text.translate(key).getString();
        if (translated == key) {
            console.info(`missing description for ${item} key ${key}`);
            return;
        }
        let description = langType == 'zh_cn' ? `「_${translated}_」` : `"_${translated}_"`
        description += ` ${parseBotaniaPageSyntax(grabPage(cameCaseName, 0))}`
        // also add floating and chibi versions
        let floatingVersion = Item.of(
        item.id.split(":")[0] + ":floating_" + item.id.split(":")[1]
        );
        let chibiVersion = Item.of(item.id + "_chibi");
        let floatingChibiVersion = Item.of(floatingVersion.id + "_chibi");
        addAndCache(item, description)
        addAndCache(floatingVersion, description)
        addAndCache(chibiVersion, description)
        addAndCache(floatingChibiVersion, description)
    });

    if (Object.keys(obj).length > 0)
        if (langType == "zh_cn")
            JsonIO.write(
                "kubejs/assets/generated_tooltips/lang/zh_cn.json",
                sortObjectByKey(obj)
            );
        else if (langType == "en_us")
            JsonIO.write(
                "kubejs/assets/generated_tooltips/lang/en_us.json",
                sortObjectByKey(obj)
            );

    if (Object.keys(cachedTargets).length > 0) JsonIO.write("kubejs/assets/generated_tooltips/cached_targets.json", sortObjectByKey(cachedTargets))
}
// auto gen or manual call
// e@global.doCreateBotaniaTooltipGen()
// ClientEvents.highPriorityAssets(global.doCreateBotaniaTooltipGen);

// show tooltip with cache
ClientEvents.highPriorityAssets(()=>{
    let cachedTargets = Object.keys(JsonIO.read("kubejs/assets/generated_tooltips/cached_targets.json"))
    for (let id of cachedTargets) AddCreateTooltips(id)
})