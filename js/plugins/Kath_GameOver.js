//=============================================================================
// Custom Game Over, version 1.0.3
// by McKathlin
// Kath_GameOver.js
// Last Update: 2016.02.19
//=============================================================================

/*:
 * @plugindesc Change what happens when the party dies or Game Over is called.
 * 
 * @param Game Over Common Event ID
 * @desc The ID of the common event to run after (or instead of)
 * the Game Over scene. Leave blank for default game over behavior.
 * @default 
 * 
 * @help This plugin is designed to play well by itself and with other plugins.
 * There are no known conflicts, but conflict is possible with other plugins
 * that directly affect the Game Over scene.
 * 
 * ==============================
 * = Game Over Common Event ID  =
 * ==============================
 * Assigning a Game Over common event makes gameplay continue after
 * the party loses, instead of RPG Maker's default behavior of returning the
 * party to the title screen. Open the database to Common Events to find the
 * ID of the common event to call on game over, and enter this ID number as
 * the parameter.
 * 
 * In the content of the common event, the game designer can customize what
 * happens when the party dies or reaches an event-dictated Game Over state.
 * The Game Over common event might do some of the following things:
 * * Take away gold and/or items
 * * Return the player to a safe place
 * * Restore HP to one or more party members
 * * Have the party's rescuer say something
 * * ...anything that suits this game!
 *
 * IMPORTANT: When control flows to the Game Over common event,
 * the screen will start blacked out. This gives the event time to handle
 * transfers and other processing before showing the player the screen.
 * Once those things are ready, remember to fade in!
 * 
 * -------------
 * Release Note:
 * Previous versions of this plugin featured a Show Game Over Scene parameter.
 * However, setting this parameter to false (to skip the Game Over scene)
 * caused a fatal error on some machnes, such that gameplay would halt entirely.
 * For this reason, the Show Game Over Scene parameter has been removed until
 * it can be successfully debugged.
 */

var Imported = Imported || {};
Imported.Kath_GameOver = true;

var Kath = Kath || {};
Kath.GameOver = Kath.GameOver || {};

Kath.Parameters = PluginManager.parameters('Kath_GameOver');
Kath.Param = Kath.Param || {};

Kath.Param.GameOverCommonEventID =
	Number.parseInt(Kath.Parameters['Game Over Common Event ID']);

//----------------------------------------------------------------------------
// Scene_GameOver goto title - extended method
// If a Game Over Common Event is defined, call it instead of going to title.
Kath.GameOver.Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
Scene_Gameover.prototype.gotoTitle = function() {
	if (Kath.Param.GameOverCommonEventID > 0) {
		$gameScreen.startFadeOut(1); // instant
		$gameParty.reviveBattleMembers();
		$gameTemp.reserveCommonEvent(Kath.Param.GameOverCommonEventID);
		SceneManager.goto(Scene_Map);
	}
	else {
		Kath.GameOver.Scene_Gameover_gotoTitle.call(this);
	}
};