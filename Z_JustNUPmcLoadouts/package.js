class Mod
{
    constructor()
    {
		Logger.info("Loading: JustNU PMC Loadouts");
		ModLoader.onLoad["JustNUPMCLoadouts"] = require("./src/justnupmcloadouts.js").onLoadMod;
    }
}

module.exports.Mod = new Mod();