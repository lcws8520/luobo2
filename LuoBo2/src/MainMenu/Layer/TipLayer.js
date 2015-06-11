/**
 * Created by lingjianfeng on 15/5/13.
 */

var MMTipLayer = cc.LayerColor.extend({
	target : null,		// 携带对象[这里是父节点]
    ctor : function (target) {
        this._super(cc.color(0, 0, 0, 128));
        // 加载[配置]
        this.loadConfig(target);
        // 加载[初始化]
        this.loadInit();
        // 加载[面板]
        this.loadPanel();
        // 加载[提示]
        this.loadTip();
        // 加载[菜单]
        this.loadMenu();
        return true;
    },
    onExit : function(){
        this.target.setAllButtonEnabled(true);
    	this._super();
    },
    loadConfig : function(target){
    	this.target =  target;
    },
    loadInit : function(sender){
        this.target.setAllButtonEnabled(false);
    },
    loadPanel : function(){
    	var node = new cc.Sprite("res/Common/bg/woodbg_notice.png");
    	this.addChild(node);
    	node.setPosition(V.w2, V.h2);
    },
    loadTip : function(){
    	var node = new cc.Sprite("res/MainMenu/unlock_floor.png");
    	this.addChild(node);
    	node.setPosition(V.w2, V.h2 + 100);
    },
    loadMenu : function(){
    	var confirmNormal    = new cc.Sprite("res/Common/btn_blue_m.png");
        var confirmSelected  = new cc.Sprite("res/Common/btn_blue_m_pressed.png");
        var confirmDisabled  = new cc.Sprite("res/Common/btn_blue_m.png");
        var confirm = new cc.MenuItemSprite(
            confirmNormal,
            confirmSelected,
            confirmDisabled,
            function(){
                cc.log("点击确定");
            }.bind(this));
        var confirmTip = new cc.Sprite("res/Common/zh/btn_blue_m_ok.png");
        confirm.addChild(confirmTip);
        confirmTip.setPosition(confirm.width / 2, confirm.height / 2);

        var cancelNormal    = new cc.Sprite("res/Common/btn_green_m.png");
        var cancelSelected  = new cc.Sprite("res/Common/btn_green_m_pressed.png");
        var cancelDisabled  = new cc.Sprite("res/Common/btn_green_m.png");
        var cancel = new cc.MenuItemSprite(
            cancelNormal,
            cancelSelected,
            cancelDisabled,
            function(){
            	this.removeFromParent();
            }.bind(this));
        var cancelTip = new cc.Sprite("res/Common/zh/btn_green_m_cancel.png");
        cancel.addChild(cancelTip);
        cancelTip.setPosition(cancel.width / 2, cancel.height / 2);

        var menu = new cc.Menu(confirm, cancel);
        this.addChild(menu);
        menu.alignItemsHorizontally();
        menu.setPositionY(V.h2 - 100);
    }
});